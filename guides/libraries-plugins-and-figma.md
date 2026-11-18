# Libraries, plugins and Figma

House rule: plain HTML + Tailwind v3 + vanilla JS; no frameworks, no runtime CDNs. Libraries are **vendored** files in `assets/vendor/` with their licence files, loaded with relative script tags, lazy where heavy, and the page must still work if they fail.

## Vendorable libraries (gzip sizes measured from npm, Nov 2026)

| Library | Licence | Size | Use it for |
|---|---|---|---|
| GSAP 3.x core | GSAP Standard "No Charge" licence (free for any website since 3.13, Apr 2025; not open source — pin the version, keep headers) | 27.7 KB | Choreographed hero timeline, staggers |
| ScrollTrigger | same | 17.6 KB | Pinning, scrubbed scroll timelines, the motif that follows the page |
| SplitText / DrawSVG / MotionPath / Flip | same | 3.6 / 2.2 / 9.5 / 9.5 KB | Headline splits, line drawing, a van/cab moving along a route, layout morphs in the explorer |
| Lenis | MIT | 5.3 KB | Optional smooth scroll; respects reduced motion; don't combine with CSS scroll-snap |
| Splitting.js | MIT | 1.7 KB | Character/word staggers with CSS variables, no GSAP |
| Rough Notation | MIT | 3.9 KB | Hand-drawn underline/circle/box annotations |
| Embla Carousel | MIT | 7 KB | An unstyled carousel (Swiper's default look reads as template) |
| img-comparison-slider | MIT | 3.5 KB | Before/after (or build it in vanilla JS) |
| PhotoSwipe | MIT | 4.4 KB + 16 KB lazy | Gallery lightbox with swipe (or vanilla) |
| Three.js (trimmed, as in WAW) | MIT | large | Only when 3D carries the story (WAW's island). Copy from tobygregg/WAW/assets/vendor |
| Lottie / dotLottie / Rive | MIT | 45 KB / 30 KB + 481 KB wasm / 121 KB + 358 KB wasm | Only if the client already owns such an animation |

Without a bundler, Motion (motion.dev) and anime.js v4 are *not* smaller than GSAP core (63 KB / 40 KB UMD). Default rich stack = GSAP core + ScrollTrigger (+ one plugin) ≈ 50 KB. Most drafts need none of it: CSS + IntersectionObserver + scroll-driven animations cover a lot.

## Build-time helpers (not shipped)

- `sharp` — WebP sizes, OG image (SVG → JPG).
- `vtracer` (MIT) / `potrace` (GPL, build-time only) — logo tracing. `svgo` — clean SVGs.
- `culori` / `colorjs.io` — OKLCH scales and contrast checks.
- `tools/slop-lint.mjs` in this repo — the deterministic AI-tell check.

## Figma

- **Useful:** designing one or two key frames by hand with the client's real photos and livery, then pulling them into code via the **Figma MCP server** (`get_variable_defs` for tokens, `get_screenshot` for the visual, `get_design_context` asked explicitly for "plain HTML and Tailwind v3 classes, no React", `get_motion_context` for prototyped motion). Plugins worth having: Tokens Studio or Design Tokens (W3C) export → `tailwind.config.js`; Iconify and Phosphor; Stark, axe for Designers and Contrast for accessibility; Rename It and Cleaner for housekeeping; Unsplash/Content Reel only for wireframing, never for final imagery.
- **Not useful for final layouts:** Figma First Draft, Make and Sites, UX Pilot, Relume, Uizard. Reviews (NN/g 2025, UX Planet) found their output generic and repetitive — the same convergence problem.
- Figma Community and Dribbble shots are full of the high-risk archetypes (card collages, arch masks, curved panels). Treat them as raw ideas that must be re-rooted in the client's trade.

## Inspiration sources (for humans; WebFetch is blocked on most)

Awwwards (search by trade: `/inspiration_search/plumbing/`, `/landscaping/`, `/bakery/`; each site page has a "Visit" link), Godly/Recent.design, SiteInspire, One Page Love, Land-book, Httpster, Commerce Cream (small shops), Minimal Gallery. Mainstream "best hero sections" and "best plumber websites" round-ups are mostly SaaS or templates — use them as anti-examples.
