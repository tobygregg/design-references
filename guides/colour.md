# Colour

**Every colour comes from something real in the business** — the logo, the van wrap, the shop sign, the flyer, the uniform — so the model never picks a hue. That one rule escapes both waves of AI colour slop.

## Bans

- **First wave:** indigo/violet/purple-to-blue gradients, gradient text, glow blobs, neon on dark, Tailwind `indigo-500` buttons, pure `#000`/`#fff` grounds, grey text on coloured backgrounds.
- **Second wave** (what models drift to once purple is banned): *warm editorial* — cream ~#F4F1EA + high-contrast serif + terracotta ~#D97757; *dark signal* — near-black + one acid-green/vermilion accent (that's sarnia.site's own look); *broadsheet cosplay* — hairline rules, zero radius, newspaper columns on a non-editorial business.
- **Dark-and-gold "premium"** unless the client's livery genuinely is black and gold, and then done with tinted darks, one accent and no glow.

## Recipe

1. **Sample** 2–4 colours from the client's assets (logo SVG/PNG, van photo, banner). Write each hex in `tailwind.config.js` with a comment saying where it came from (Pure Reflections does this well).
2. **Assign roles** (name them by role, not by colour):
   - `action` — the one "click me" colour (Call, Quote, links). Nothing else uses it.
   - `ink` — text; a very dark version of the brand hue, never pure black.
   - `surface` — grounds; the brand hue at very low chroma (OKLCH chroma ~0.005–0.02), never Tailwind's slate/gray.
   - `highlight` / `accent` — markers, illustrations, the motif, the one highlighted word; roughly 10% of the page.
   - optional `support` — a second brand colour for footers, photo overlays and alternating section grounds.
3. **Build scales in OKLCH** (perceptually even): keep the brand hue, step L from ~0.97 (50) to ~0.25 (950), taper chroma at both ends, keep chroma under ~0.37. Derive hover/pressed states from one token (`oklch(from var(--action) calc(l - 0.06) c h)`) or a fixed darker shade.
4. **Dominant + sharp accent beats evenly spread colour.** One colour owns the page; the accent is rare and meaningful.
5. **Check contrast twice:** WCAG AA 4.5:1 for body text (lint-checked), and APCA as the perceptual check (Lc 75+ body, Lc 60 medium text, Lc 45 large headings). The usual failure in trade palettes is white text on mid blues, greens and oranges: put text on the 700–800 shade, and dark text on yellows/ambers.
6. **Gradients**, if any, are single-hue tonal ramps (`linear-gradient(in oklch, …)`) or a grain-textured solid, doing a job (a sky, water, a photo scrim). Never gradient text.
7. **Light or dark is decided by the brand and trade**, not by "premium" vibes. Alternate section grounds (surface, white-ish, a brand-colour band, a photo band) to give the page rhythm.

## Trade starting points (adjust to the real livery)

| Trade | Dominant | Accent | Ground |
|---|---|---|---|
| Window cleaning | sky or sea blue | squeegee yellow | cool tinted white |
| Plumbing & heating | deep navy or teal | copper/brass orange | blue-tinted grey |
| Gardening & tree work | moss or bottle green | gorse yellow or berry | warm stone |
| Painting & decorating | charcoal | one paint-chip hue (ochre, sage, oxblood) | warm off-white |
| Roofing | slate blue-grey | safety orange or brick | granite grey |
| Taxis & electricians | charcoal/black | cab or high-voltage yellow (dark text on it) | tinted off-white |
| Bakers & cake makers | the icing/box colour | a contrasting sprinkle hue | flour white |
| Pet services | the collar/lead colour | a playful second hue | soft tinted white |
| Guernsey motifs | Channel-sea teal, granite grey | gorse yellow | Guernsey-cow fawn/cream (use sparingly; cream + serif = second-wave tell) |

## Tools

Image-to-palette and Tailwind export: Coolors. Palette previews on real layouts: Realtime Colors, Huemint. 50–950 scale from one hex: uicolors.app. OKLCH and gamut: oklch.com, Huetone. In code (build time): `culori` or `colorjs.io` (MIT), Adobe Leonardo (Apache-2.0). Radix Colors' 12-step scale is a ready role map (1–2 grounds, 3–5 states, 6–8 borders, 9–10 solids, 11–12 text).
