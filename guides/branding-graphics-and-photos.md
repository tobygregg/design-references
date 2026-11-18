# Branding, graphics and photos

## A one-page brand system per client (decide before coding)

Mark (full, compact, mono) · colour roles · type pair + axis values · **one motif** · **one photo treatment** · illustration rules (stroke width, corner style, fill colours) · three voice words. Write it as the design plan; it becomes `tailwind.config.js` and the SVG sprite.

## Logo

- Ask for the original vector first (signwriter, van-wrap printer). If the pack only has a small or blurry logo, trace it: **VTracer** (MIT) for colour logos — `vtracer --input logo.png --output logo.svg --mode spline --hierarchical stacked --filter-speckle 6 --color-precision 6` — or Potrace (GPL, build-time only) for one-colour marks. Then snap fills to the palette, run SVGO, and re-set lettering in the real font if you can identify it. Faithful, never reinvented.

## The motif — where hand-made character lives

One trade-specific graphic idea, drawn once as inline SVG (`currentColor`), reused as divider, bullet, background detail, loading/submit state and 404 art. It should have a **story arc** the way WAW's footprints do (they start in the hero, snake through the page, and end at the finish-line arch).

| Trade | Motif ideas |
|---|---|
| Window cleaning | squeegee arc that wipes a haze away; water-fed pole spray; reflections and shine glints |
| Plumbing & heating | flow-and-return pipe runs with elbows linking sections (Datum); steam; a pressure gauge needle |
| Electrical | a cable run that "powers up" sections as you scroll; a consumer-unit row of switches |
| Gardening & tree work | a hedge line edge; drifting leaves; growth rings; a mower stripe pattern |
| Roofing | slate overlap pattern; roof-pitch chevrons cutting photos (Klindworth); a ridge line divider |
| Painting & decorating | a brush stroke reveal; paint-chip cards; a masking-tape edge; a roller wipe |
| Taxis & couriers | a route line with stops drawn across the island; a meter/clock; headlight sweep |
| Building & plastering | a spirit-level bubble; a trowel swipe; a blueprint grid (subtle) |
| Cleaning & pressure washing | a clean stripe through grime (before/after in one graphic); bubbles |
| Bakers & cake makers | piping lines; sprinkles; a rolling-pin divider; tier stacks |
| Pet services | paw-print trail (once, done well); a lead line connecting sections; a wagging tail loop |
| Guernsey identity | the coastline outline; parish map; granite sea-wall texture; the harbour's water lines; a Guernsey-cow pattern used sparingly |

## Illustration style (copy the approach of BR's line-art, EasyReach's hero, Pure Reflections' house)

Flat, simple shapes · 2–3 brand colours · one consistent stroke (~2px at display size) · rounded joins · white or tinted fills · light hatching instead of gradients · maybe one soft gradient for sky or water. Animate the story (dirty → clean, cold → warm, empty → built), not random floating. If you can't draw something well, draw something simpler.

**Never:** glossy/3D/skeuomorphic clip-art, metallic gradients, stacked drop shadows, glass stat badges, generic "person pointing at a screen" library art (unDraw's licence also forbids redistribution and AI training), emoji, sparkle icons.

## Icons

Custom SVG icons for each service in one `<symbol>` sprite, drawn in the same stroke as the illustrations. If a base set helps, Phosphor (MIT, 6 weights incl. duotone tinted with the accent), Tabler (MIT), Iconoir (MIT) are fine starting points — redraw or adjust so they match. Icons sit inline where they carry meaning; avoid the "icon in a tinted circle above a heading" card. Hand-drawn Iconify sets (Streamline Freehand, Pepicons Pencil) are CC BY: they need a visible credit.

## Texture and hand-drawn accents

- Texture only if it belongs to the trade (blueprint grid, water lines, paper grain for a baker) and stays subtle. Grain: an SVG `feTurbulence` (baseFrequency ~0.65, 3 octaves) layer at low opacity.
- **Rough Notation** (MIT, ~4KB) for one or two animated hand-drawn marks per page (circle "same day", underline the parish names, box the price) — `animate:false` under reduced motion.
- Hand-written captions next to real photos ("this is Darren", "St Martin, March") in a handwriting accent font.

## Photos — the strongest authenticity signal

- Use the client's real photos of people, vans, equipment and jobs in every major section that has them. Pick the strongest 8–12. Never stock, never AI-generated.
- **One treatment per site**, consistently: e.g. a brand-900 multiply overlay at 20–40% on photo bands (also fixes text contrast), or a light global grade, or an SVG duotone (`feColorMatrix` → `feComponentTransfer`) in two brand colours for decorative bands. **Never duotone before/after photos** — true colour is the proof.
- Fixed aspect ratios, considered `object-position` per image, matching crops for before/after pairs, specific captions ("Gutters and fascias, St Sampson's").
- Frames are designed when used: a mask taken from the brand/trade, an offset outline (Datum), a slight tilt with a white border (Pure Reflections), a label breaking the edge — not a plain rounded rectangle with a shadow.
- Strip EXIF location data from customer photos.
