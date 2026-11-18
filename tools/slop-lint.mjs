#!/usr/bin/env node
/*
  slop-lint.mjs — a deterministic "does this look AI-generated?" check for SarniaSites drafts.

  It reads the rendered page (computed styles + DOM), not the source, so it catches what the
  visitor actually sees. Inspired by Adrian Krebs's Show HN design-slop scan, Pixelslop and
  Impeccable (see research/avoiding-ai-slop-report.md).

  Usage (from the site folder, with a local server running):
    python3 -m http.server 8080 &
    node /tmp/benchmarks/design-references/tools/slop-lint.mjs http://localhost:8080/ \
         --avoid-fonts "Fraunces,Bricolage Grotesque"      # fonts used by recent studio builds

  Exit code 1 if any FAIL. WARNs are things to look at, not automatic failures.
  Needs Playwright (already installed in the build environment). Design checks only: it never
  changes files.
*/
import { createRequire } from 'module';
import { execSync } from 'child_process';

// Find Playwright wherever it is installed (NODE_PATH, the site folder, or the global npm root).
function loadPlaywright() {
  const bases = [import.meta.url, process.cwd() + '/x.js'];
  try { bases.push(execSync('npm root -g').toString().trim() + '/x.js'); } catch {}
  for (const b of bases) { try { return createRequire(b)('playwright'); } catch {} }
  console.error('Playwright not found. It is normally pre-installed; otherwise: npm i -D playwright');
  process.exit(2);
}
const { chromium } = loadPlaywright();

const url = process.argv[2] || 'http://localhost:8080/';
const avoidArg = process.argv.indexOf('--avoid-fonts');
const AVOID = avoidArg > -1 ? process.argv[avoidArg + 1].split(',').map(s => s.trim().toLowerCase()).filter(Boolean) : [];

// Fonts that read as AI / template defaults, plus faces the studio has already used for display.
const HARD_BAN = ['inter', 'roboto', 'poppins', 'montserrat', 'open sans', 'lato', 'geist', 'space grotesk',
  'plus jakarta sans', 'syne', 'dm sans', 'playfair display', 'playfair', 'archivo black', 'barlow condensed',
  'gloock', 'outfit', 'nunito', 'raleway'];
// Over-used by the studio itself (house convergence) or now on public slop lists: never as the display face.
const HOUSE_OVERUSED = ['fraunces', 'bricolage grotesque', 'figtree', 'young serif', 'instrument serif',
  'hanken grotesk', 'manrope', 'archivo', 'public sans', 'josefin sans'];
const BANNED_WORDS = ['seamless', 'elevate', 'unlock', 'empower', 'cutting-edge', 'delve', 'look no further',
  'we pride ourselves', 'one-stop', 'unparalleled', 'passionate', 'tailored solutions', 'your trusted partner',
  'not your average', 'more than just', "in today's", 'nestled', 'vibrant', 'testament', 'world-class',
  'state-of-the-art', 'excellence', 'quality you can trust', 'your vision', 'your journey', 'transform your', 'crafted with'];

const results = [];
const fail = (msg) => results.push(['FAIL', msg]);
const warn = (msg) => results.push(['WARN', msg]);
const pass = (msg) => results.push(['ok  ', msg]);

async function audit(page, label) {
  return page.evaluate(({ HARD_BAN, HOUSE_OVERUSED, AVOID, BANNED_WORDS, label }) => {
    const out = [];
    const F = (m) => out.push(['FAIL', `[${label}] ${m}`]);
    const W = (m) => out.push(['WARN', `[${label}] ${m}`]);
    const P = (m) => out.push(['ok  ', `[${label}] ${m}`]);
    const vis = (el) => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none'; };
    const first = (ff) => ff.split(',')[0].replace(/["']/g, '').replace(/ Variable$/i, '').trim().toLowerCase();

    // ---- Fonts ---------------------------------------------------------------
    const display = new Set(), body = new Set();
    document.querySelectorAll('h1,h2,h3').forEach(e => vis(e) && display.add(first(getComputedStyle(e).fontFamily)));
    document.querySelectorAll('p,li,a,button,label,input').forEach(e => vis(e) && body.add(first(getComputedStyle(e).fontFamily)));
    const all = new Set([...display, ...body]);
    const hard = [...all].filter(f => HARD_BAN.includes(f));
    hard.length ? F(`banned/default font in use: ${hard.join(', ')}`) : P(`fonts: display=${[...display].join('/')} body=${[...body].join('/')}`);
    const house = [...display].filter(f => HOUSE_OVERUSED.includes(f));
    if (house.length) F(`display face is over-used by the studio or on public slop lists: ${house.join(', ')}`);
    const avoided = [...display].filter(f => AVOID.includes(f));
    if (avoided.length) F(`display face repeats a recent studio build: ${avoided.join(', ')}`);
    if (all.size > 4) W(`${all.size} font families rendered (aim for 2, plus at most one accent)`);

    // ---- Centred text ratio -------------------------------------------------
    const textEls = [...document.querySelectorAll('h1,h2,h3,p')].filter(vis).filter(e => e.innerText.trim().length > 20);
    const centred = textEls.filter(e => getComputedStyle(e).textAlign === 'center').length;
    const ratio = textEls.length ? centred / textEls.length : 0;
    ratio > 0.6 ? F(`${Math.round(ratio * 100)}% of headings/paragraphs are centred (template tell; centre heroes and CTAs only)`) : P(`centred text ${Math.round(ratio * 100)}%`);

    // ---- Glass, gradient text, glow -----------------------------------------
    let glass = 0, gradText = 0, glow = 0;
    document.querySelectorAll('body *').forEach(e => {
      const s = getComputedStyle(e);
      if (s.backdropFilter && s.backdropFilter !== 'none') glass++;
      if ((s.webkitBackgroundClip === 'text' || s.backgroundClip === 'text') && s.backgroundImage.includes('gradient')) gradText++;
      if (/blur\((3[0-9]|[4-9]\d|\d{3,})px\)/.test(s.filter) && e.offsetWidth > 150) glow++;
    });
    glass >= 3 ? F(`${glass} elements use backdrop-filter (glassmorphism)`) : P(`glass elements: ${glass}`);
    gradText ? F(`${gradText} element(s) with gradient text`) : P('no gradient text');
    glow ? F(`${glow} large blurred blob/glow element(s)`) : P('no glow blobs');

    // ---- Card uniformity + identical grids ------------------------------------
    let softCards = 0;
    const groups = new Map();
    document.querySelectorAll('body *').forEach(e => {
      if (!vis(e)) return;
      const s = getComputedStyle(e);
      const r = parseFloat(s.borderTopLeftRadius);
      if (r >= 8 && r <= 28 && s.boxShadow !== 'none' && e.offsetWidth > 160 && e.offsetHeight > 120) softCards++;
    });
    document.querySelectorAll('section, main > div').forEach(sec => {
      sec.querySelectorAll('*').forEach(parent => {
        const kids = [...parent.children].filter(vis).filter(k => k.offsetWidth > 160 && k.offsetHeight > 140);
        if (kids.length < 3) return;
        const sig = (k) => k.tagName + '|' + k.className.toString().split(/\s+/).sort().join('.') + '|' + k.children.length;
        const counts = {}; kids.forEach(k => counts[sig(k)] = (counts[sig(k)] || 0) + 1);
        Object.entries(counts).forEach(([s, n]) => { if (n >= 3) groups.set(sec, Math.max(groups.get(sec) || 0, n)); });
      });
    });
    const gridSections = groups.size;
    softCards >= 8 ? W(`${softCards} boxes share the radius + soft-shadow card look (vary radius/elevation by hierarchy)`) : P(`soft-shadow cards: ${softCards}`);
    gridSections > 1 ? F(`${gridSections} sections contain a grid of 3+ identical cards (max 1 on the page)`) : P(`identical card grids: ${gridSections}`);

    // consecutive sections with the same skeleton
    const secs = [...document.querySelectorAll('main section, body > section')].filter(vis);
    const skel = secs.map(s => { const g = groups.get(s) ? 'grid' : 'nogrid'; const h = s.querySelector('h2'); const align = h ? getComputedStyle(h).textAlign : '-'; return g + ':' + align; });
    let run = 1, maxRun = 1; for (let i = 1; i < skel.length; i++) { run = skel[i] === skel[i - 1] && skel[i].startsWith('grid') ? run + 1 : 1; maxRun = Math.max(maxRun, run); }
    maxRun >= 3 ? F(`${maxRun} consecutive sections share the same heading + card-grid skeleton`) : P('section rhythm varies');

    // ---- Eyebrow labels --------------------------------------------------------
    let eyebrows = 0;
    document.querySelectorAll('h2').forEach(h => {
      let p = h.previousElementSibling; if (!p) p = h.parentElement?.previousElementSibling;
      if (!p || !vis(p)) return;
      const s = getComputedStyle(p);
      if (parseFloat(s.fontSize) <= 15 && (s.textTransform === 'uppercase' || parseFloat(s.letterSpacing) > 1) && p.innerText.trim().length < 40) eyebrows++;
    });
    eyebrows > 2 ? F(`${eyebrows} small uppercase eyebrow labels above headings (max 2 on the page)`) : P(`eyebrow labels: ${eyebrows}`);

    // ---- Motion tells ------------------------------------------------------------
    const html = document.documentElement.outerHTML;
    const tells = ['transition-all', 'animate-bounce', 'animate-pulse', 'animate-ping'].filter(t => html.includes(t));
    tells.length ? F(`default Tailwind motion utilities in markup: ${tells.join(', ')}`) : P('no default bounce/pulse/transition-all');

    // ---- Colour ---------------------------------------------------------------------
    const toHsl = (rgb) => { const m = rgb.match(/\d+(\.\d+)?/g); if (!m) return null; let [r, g, b] = m.slice(0, 3).map(Number).map(v => v / 255); const mx = Math.max(r, g, b), mn = Math.min(r, g, b); let h = 0, s = 0; const l = (mx + mn) / 2; if (mx !== mn) { const d = mx - mn; s = l > .5 ? d / (2 - mx - mn) : d / (mx + mn); h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h *= 60; } return { h, s, l }; };
    let purple = 0;
    document.querySelectorAll('a,button').forEach(e => { if (!vis(e)) return; const c = toHsl(getComputedStyle(e).backgroundColor); if (c && c.s > .35 && c.h >= 245 && c.h <= 290 && c.l > .2 && c.l < .8) purple++; });
    purple ? W(`${purple} button/link(s) with an indigo/violet fill — only OK if it is genuinely the client's brand colour`) : P('no default indigo/violet CTAs');
    const bodyBg = getComputedStyle(document.body).backgroundColor;
    if (/rgb\(255, 255, 255\)|rgb\(0, 0, 0\)/.test(bodyBg)) W(`page ground is pure ${bodyBg} — tint neutrals toward the brand hue`);

    // ---- Copy ------------------------------------------------------------------------
    const text = document.body.innerText;
    const words = text.split(/\s+/).filter(Boolean).length;
    const low = text.toLowerCase();
    const hits = BANNED_WORDS.filter(w => low.includes(w));
    hits.length ? F(`banned/vague phrases: ${hits.join(', ')}`) : P('no banned phrases');
    const dashes = (text.match(/—/g) || []).length;
    dashes > Math.max(2, words / 150) ? F(`${dashes} em dashes in ${words} words (AI-writing tell; aim ≤ 1 per 150 words)`) : P(`em dashes: ${dashes}`);
    const bangs = (text.match(/!/g) || []).length; bangs ? W(`${bangs} exclamation mark(s) — allowed only inside a real customer quote`) : P('no exclamation marks');
    const q = [...document.querySelectorAll('h1,h2')].filter(h => h.innerText.trim().endsWith('?')).length;
    q ? F(`${q} heading(s) phrased as a question`) : P('no rhetorical-question headings');
    if (/not (just|only) [^.]{1,40}, but/i.test(text)) F('"not just X, but Y" construction');
    if (/\b\d+ ?%|\b\d+\+? (reviews|recommendations|customers|followers|likes|happy)\b/i.test(text)) F('review/customer counts or percentages in visible copy');
    const fb = [...document.querySelectorAll('body *')].filter(e => e.children.length === 0 && vis(e) && /facebook/i.test(e.textContent) && !e.closest('footer,#contact,[id*=contact]')).length;
    fb ? F(`"Facebook" mentioned outside the contact/footer (${fb}x)`) : P('Facebook only in contact/footer (or not at all)');
    if (/\bcolor\b|\bcenter\b|\bspecialize|\borganize/i.test(text)) W('American spelling spotted in visible copy (use British English)');

    // ---- Images ------------------------------------------------------------------------
    const imgs = [...document.images];
    const badAlt = imgs.filter(i => !i.hasAttribute('alt') || /^(image|photo|picture|img)\b/i.test(i.alt)).length;
    badAlt ? W(`${badAlt} image(s) without meaningful alt text`) : P(`${imgs.length} images, alt text present`);

    // ---- Hero ----------------------------------------------------------------------------
    const h1 = document.querySelector('h1');
    if (h1) {
      const hero = h1.closest('section, header') || h1.parentElement;
      const hr = hero.getBoundingClientRect();
      hr.height < innerHeight * 0.85 ? W(`hero is ${Math.round(hr.height)}px tall in a ${innerHeight}px viewport (should fill the screen)`) : P('hero fills the screen');
      const hs = getComputedStyle(h1);
      const ratioHero = parseFloat(hs.fontSize) / parseFloat(getComputedStyle(document.querySelector('p') || document.body).fontSize);
      ratioHero < (label === '390' ? 2.1 : 3) ? W(`hero headline is only ${ratioHero.toFixed(1)}x body size (aim for strong scale contrast: 3x+ on desktop, 2.2x+ on phones)`) : P(`hero/body scale ${ratioHero.toFixed(1)}x`);
      if (hs.textAlign === 'center' && hero.querySelector('[class*=rounded-full]')?.innerText?.length < 40) W('centred hero with a pill badge above the headline (classic AI hero)');
    }
    return out;
  }, { HARD_BAN, HOUSE_OVERUSED, AVOID, BANNED_WORDS, label });
}

const browser = await chromium.launch();
for (const [label, vp] of [['1440', { width: 1440, height: 900 }], ['390', { width: 390, height: 844 }]]) {
  const page = await browser.newPage({ viewport: vp, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  // horizontal scroll check (mobile)
  if (label === '390') {
    const sw = await page.evaluate(() => document.documentElement.scrollWidth);
    sw > 392 ? fail(`[390] horizontal scroll: page is ${sw}px wide`) : pass('[390] no horizontal scroll');
  }
  results.push(...(await audit(page, label)));
  await page.close();
}
await browser.close();

// de-duplicate identical messages across viewports
const seen = new Set();
const final = results.filter(([lvl, m]) => { const k = lvl + m.replace(/^\[\d+\] /, ''); if (seen.has(k)) return false; seen.add(k); return true; });
for (const [lvl, m] of final) console.log(`${lvl}  ${m}`);
const fails = final.filter(r => r[0] === 'FAIL').length;
const warns = final.filter(r => r[0] === 'WARN').length;
console.log(`\n${fails} fail, ${warns} warn — ${fails ? 'fix the FAILs, then look at the WARNs' : 'no automatic fails; still do the human review'}`);
process.exit(fails ? 1 : 0);
