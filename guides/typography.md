# Typography

Changing the type is the fastest single upgrade, and the easiest place to slip into a default. Choose **one characterful display face** and **one quiet, readable body face**, plus at most one accent voice (handwriting for captions, mono for prices/phone numbers). All self-hosted from @fontsource with the OFL licence kept.

## Never (lint fails these)

- **AI/template defaults:** Inter, Roboto, Poppins, Montserrat, Open Sans, Lato, Nunito, Raleway, Geist, Space Grotesk, Plus Jakarta Sans, Syne, DM Sans, Playfair Display.
- **Already used by the studio for display / over-used:** Fraunces, Bricolage Grotesque, Young Serif, Instrument Serif, Figtree, Hanken Grotesk, Manrope, Archivo / Archivo Black, Barlow Condensed, Gloock, Outfit, Public Sans, Josefin Sans. (See `house-fingerprint.md`; this list grows.)
- Any face a widely shared prompt recommends becomes the next tell. Treat Crimson Pro, Newsreader, IBM Plex and Literata as **amber**: fine as body/utility, not as the face that defines the brand.

## The verified pool (all on npm as `@fontsource/<id>`, OFL unless noted; V = variable version too)

- **Warm / friendly sans:** parkinsans V, gabarito V, rethink-sans V, onest V, albert-sans V, golos-text V, reddit-sans V, winky-sans V, funnel-display V, funnel-sans V, host-grotesk V, tilt-warp V, grandstander V, dynapuff V, sour-gummy V, google-sans-flex V (ROND axis), atkinson-hyperlegible-next V, inclusive-sans V
- **Precise / technical:** chivo V, chivo-mono V, schibsted-grotesk V, familjen-grotesk V, red-hat-display V, red-hat-text V, instrument-sans V, geologica V, suse V, zalando-sans V, zalando-sans-expanded V, hubot-sans V (wdth), mona-sans V (wdth), overpass V, martian-mono V (wdth), azeret-mono V, sometype-mono V, kode-mono V, recursive V (CASL, MONO)
- **Heritage / craft:** bitter V, zilla-slab, arvo, rokkitt V, crete-round, bree-serif, solway, hepta-slab V, epunda-slab V, josefin-slab V, alfa-slab-one, bevan, holtwood-one-sc, graduate, vollkorn V, alegreya V, brygada-1918 V, besley V, castoro, libre-caslon-display, caprasimo, corben, courier-prime, bagnard
- **Bold / industrial / signage:** big-shoulders-display V, big-shoulders-stencil-display V, anybody V (wdth 50–150), league-gothic V, league-spartan V, antonio V, anton, fjalla-one, six-caps, staatliches, teko V, mohave V, sofia-sans-condensed V, sofia-sans-extra-condensed V, saira-stencil-one, stardos-stencil, unbounded V, dela-gothic-one, rubik-mono-one, bowlby-one, boldonse, gasoek-one, bungee, climate-crisis V, oxanium V
- **Editorial / elegant:** source-serif-4 V, roboto-serif V (opsz/wdth/GRAD), petrona V, piazzolla V, imbue V, faustina V, ibarra-real-nova V, spectral, cormorant V, eb-garamond V, libre-baskerville V, bodoni-moda V, dm-serif-display, gelasio V, cardo, rufina, yeseva-one, abril-fatface, tenor-sans
- **Playful / hand-made:** shantell-sans V (BNCE, INFM axes), caveat V, caveat-brush, kalam, patrick-hand, gochi-hand, gaegu, mali, itim, pangolin, delius, playpen-sans V, winky-rough V, gluten V, sniglet, londrina-solid, mouse-memoirs, shrikhand, chango, titan-one, lilita-one, paytone-one, passion-one, rammetto-one, bagel-fat-one, borel, sansita-swashed V, ojuju V. (Apache-2.0: permanent-marker, rock-salt, luckiest-guy, chewy, special-elite, ultra, roboto-slab — fine, keep the licence file.)
- **Not on Fontsource** (don't plan around them): Satoshi, General Sans, Clash Display, Cabinet Grotesk, Gambetta, Erode, Boska (Fontshare), and most Velvetyne/Open Foundry faces.

## Pairings by feel (starting points, rotate them)

| Feel | Display | Body / utility |
|---|---|---|
| Van livery (taxis, electricians, couriers) | anybody at wdth 125–150, wght 800, caps | schibsted-grotesk or reddit-sans |
| Industrial signage (roofing, scaffolding, plant hire) | big-shoulders-display 800–900 caps | geologica + martian-mono for numbers |
| Stencil / site kit (builders, groundworks) | big-shoulders-stencil-display or stardos-stencil | chivo + chivo-mono |
| Friendly local shop (bakers, cafés, cake makers) | caprasimo, corben or bagel-fat-one | albert-sans or rethink-sans |
| Signwriter heritage (joiners, family firms, butchers) | alfa-slab-one, bevan or holtwood-one-sc | bitter V |
| Hand-made but legible (groomers, dog walkers, childminders) | shantell-sans INFM 60–100, BNCE 20–50 | shantell-sans INFM 0, or atkinson-hyperlegible-next |
| Tech-leaning (solar, EV chargers, smart-home) | recursive CASL 1 | recursive CASL 0 / MONO 1 |
| Clean and energetic (valeting, new cleaning firms) | unbounded or tilt-warp | onest or golos-text |
| Editorial premium (interiors, high-end decorators, garden design) | bodoni-moda at opsz max, or ibarra-real-nova | instrument-sans or red-hat-text |
| Trustworthy "island paper" (heritage builders, surveyors) | brygada-1918, besley or imbue | source-serif-4 or overpass |
| Heavy grotesk rotation | bowlby-one, dela-gothic-one, boldonse, league-gothic, gasoek-one | parkinsans, gabarito, host-grotesk |
| Annotation accent only | caveat, kalam, gochi-hand | — (captions, notes; never body) |

## Making a face look designed, not installed

- **Scale contrast:** the hero headline is 3×+ body size on desktop (5–9× is common in our best work), ~2.2×+ on phones. Within the rest of the page use a modest ratio (~1.2–1.25). Use `clamp()`.
- **Weight contrast:** extremes (300 vs 800/900), not 400 vs 600.
- **Leading and tracking:** display leading 0.9–1.05, tracking −0.01 to −0.03em; small caps/labels +0.06–0.12em; body 17–19px, leading ~1.55, measure 60–70ch.
- **Push the variable axes** — this is what makes one family feel bespoke per client: Anybody's width, Shantell's bounce/informality, Recursive's casual axis, Roboto Serif / Bodoni Moda optical size, Google Sans Flex roundness. Load the axis CSS (`opsz.css`, `wdth.css`, `full.css`), and set `font-variation-settings` on the hero only.
- Variable packages register `"<Name> Variable"` as the family (e.g. `"Anybody Variable"`); use that exact name in `tailwind.config.js`.
- **One recurring typographic device** per site, used consistently (an outlined numeral, a stencil break, a highlighted word in the action colour, a mono price tag, a small hand-written caption). Not an italic-serif word in a sans headline (studio device + public slop tell).
- Not every heading in giant caps. Mix case and size with intent; centre only the hero and the final CTA, if anything.
- Load latin + latin-ext only; two families plus one accent maximum.
