# AI-slop tells and their fixes

AI-built sites converge on the statistical middle of the web ("distributional convergence", Anthropic, Nov 2025). The look is now **measurable**: a Playwright scan of 1,590 Show HN sites found 22% with four or more of these patterns (Krebs, Apr 2026). Banning the first wave creates a second; any escape route written into a prompt becomes the next default — including our own (see `house-fingerprint.md`). You need both a **direction** (decisions sourced from the client) and a **filter** (this list + `tools/slop-lint.mjs`).

The test for every element: *did someone choose this for this business, or is it a default?*

| Area | Tell | Fix |
|---|---|---|
| Hero | Centred headline, pill badge above, gradient text, two buttons, logo row; or eyebrow + 3-line headline (last line coloured) + tick-list + boxed photo right | Choose an archetype from the client's strongest real asset (`heroes/README.md`); compose several layered pieces; one dominant action |
| Layout | Three identical icon-title-blurb cards; the same section skeleton 3+ times; >60% centred text; every section the same height and padding | Each section its own structure (split, list, table, explorer, photo band, timeline); vary component sizes; left-align body copy |
| Surfaces | `rounded-2xl` + one soft shadow on everything; `backdrop-blur` glass; coloured accent stripe on card edges | Vary radius and elevation by hierarchy; flat with borders, offset outlines or colour blocks; glass only where depth means something (a header over a photo) |
| Typography | Inter/Geist/Space Grotesk; Fraunces/Instrument Serif "escape" fonts; serif-italic accent word in a sans hero; tracked uppercase eyebrow on every heading; weak scale contrast | One characterful display face from the verified pool, pushed via its axes; extreme size/weight contrast; eyebrows max twice |
| Colour | Purple/indigo gradients; pure black/white; glowing dark mode; cream + terracotta + serif; near-black + acid green; dark-and-gold "premium" | Palette sampled from the van/logo, roles named, tinted neutrals, one action colour |
| Proof | Stat strips, count-ups, "500+ happy customers", "100% recommend", logo "trusted by" rows | Delete any number the pack can't support; numbers only inside sentences; one real testimonials section if earned |
| Imagery | Stock people, AI illustrations, 3D blobs, "person pointing at screen" art, uniform hover-zoom on every image, alt="image" | The client's real photos with one consistent treatment; drawn trade motif; specific captions and alt text |
| Icons | Lucide/Heroicons in tinted circles above every heading; sparkles; emoji bullets | Custom sprite in the illustration stroke; icons inline where they carry meaning |
| Motion | Fade-up on every section; bounce/elastic easing; `animate-pulse`; `transition-all`; number tickers; auto carousels | One orchestrated hero moment; motion tied to the signature and to user actions; varied easing; reduced motion respected |
| Copy | "Professional X services you can trust"; "Build faster. Ship smarter." weightless lines; triads; "not just X, but Y"; em-dash density; seamless/elevate/unlock/empower; title-case headings; questions as headlines; identical CTA labels everywhere | Write as the owner on the phone: services, parishes, frequency, the owner's name; British English; specific verbs ("Call Darren", "Book a gutter clean") |
| Functional quality | Missing hover/focus states, 390px layout just scaled down, tiny tap targets | Every interactive element gives feedback; recompose for phones; ≥44px targets |

## Second-wave and house-wave tells (new in 2026)

- Fraunces, Space Grotesk, Instrument Serif, Bricolage Grotesque and Syne are now on public slop lists; Fraunces/Bricolage/Figtree are also *our* most repeated faces.
- Warm editorial (cream/serif/terracotta), dark signal (black + acid green), broadsheet cosplay (hairlines, zero radius, columns).
- Our own: wavy underline on one word, last headline line in accent colour, rounded photo with a small overlapping card, arch masks with dashed route line, numbered hotspots on every build.

## Copy lint (the routine's greps cover most; also check by eye)

Banned: seamless, elevate, unlock, empower, cutting-edge, delve, nestled, vibrant, testament, look no further, we pride ourselves, one-stop, your trusted partner, tailored solutions, world-class, state-of-the-art, excellence, "your journey", "transform your". Flag: more than one em dash per ~150 words, "not just … but", three-adjective triads, a subhead repeating the heading's words, American spellings, any number not in the pack, any section with no concrete detail (a place, a service, a material, a frequency).

## Where these come from

Anthropic's frontend-design skill and "prompting for frontend aesthetics" cookbook (Oct–Nov 2025); Adrian Krebs's design-slop scan (Apr 2026); Pixelslop and Impeccable pattern catalogues; Capital & Compute and CodeMySpec essays; NN/g on AI design tools and animation; Wikipedia's "Signs of AI writing". Full citations: `../research/avoiding-ai-slop-report.md`.
