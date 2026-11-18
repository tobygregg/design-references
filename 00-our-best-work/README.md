# Our own best work — the bar

These are the studio's strongest builds. Toby rates **sarnia.site**, **World Aid Walk (WAW)** and **Pure Reflections** highest; **Datum (rebuilt)** is the best trade example. Study *why* they work, then do something different for the next client.

| File | Site | Repo |
|---|---|---|
| sarnia-site-desktop.jpg | sarnia.site (the studio's own site) | Next.js build, not one of the public benchmark repos |
| waw-hero-desktop.jpg, waw-3d-island-signature.jpg | World Aid Walk | tobygregg/WAW |
| pure-reflections-hero-desktop.jpg, pure-reflections-house-explorer-signature.jpg | Pure Reflections | tobygregg/pure-reflections-window-cleaning |
| datum-hero-desktop.jpg | Datum Plumbing & Heating (rebuilt) | tobygregg/datum-plumbing-heating |

The anti-examples (generic first-pass Datum draft, a Webflow trade template, a cluttered real trade site) are in `../anti-examples/`. Copies of these screenshots also sit in the matching `heroes/` folders.

## What they have in common

1. **The signature tells the business's story; it isn't decoration.**
   - WAW: footprints walk across the hero, snake down the charities section as you scroll, and *end at an illustrated finish-line arch*. The motif has a start, a middle and a payoff. The 3D island shows the actual walk routes.
   - Pure Reflections: the hero house has hazy upper windows that a water-fed pole clears one by one, then shine streaks sweep across. It's a before→after told in a 6-second loop. The water reflection (feTurbulence ripple) says "Guernsey harbour" without a word.
   - sarnia.site: soft 3D blocks float in the hero, then assemble into a website as you scroll through a 260vh sticky "How it works" section. Blocks = building a site.
   - Datum: the plant-room photo with numbered tap-to-explain markers, and a flow-and-return pipe line along the hero's bottom edge.
2. **Type with a second voice.** One heavy, confident display face plus a contrasting accent voice used sparingly:
   - sarnia.site: Sora (display) + *Instrument Serif italic* for one word per heading ("properly", "you.", "feel.", "show you.", "island.") + DM Mono for tiny technical labels + Figtree body. The italic word is the recurring brand device.
   - WAW: Archivo Black at enormous size ("MAY 3") with an outlined numeral ("2027") + Caveat handwriting for the slogan and the finish-line caption.
   - Pure Reflections: Gloock (high-contrast serif) + Outfit, with a hand-drawn wavy underline under "Guernsey."
3. **Scale contrast is extreme.** Hero type is 5–9× body size, tight leading (0.9–1.05). Body copy stays small and calm.
4. **Disciplined palette with a reserved action colour.** sarnia.site: near-black + lime (lime = every "click me"). WAW: navy/cream/lime. Pure Reflections: ink navy + aqua + glass cyan, colours documented in tailwind.config.js with where each came from in the logo/banner.
5. **One interactive centrepiece the visitor plays with.** WAW: drag-to-spin island + Guernsey/Herm toggle. Pure Reflections: tap any part of the house. sarnia.site: "Pick a feel" switcher showing real builds. Datum: plant-room hotspots.
6. **Every section has its own structure.** sarnia.site runs: split hero → split with code terminal + 3 cards → sticky scroll-telling → work grid → photo collage with a Facebook tile → star-rated quote wall → mono-labelled pricing table → FAQ split → contact. No two neighbours look alike.
7. **Small, specific details.** WAW's tilted "SINCE 1970" sticker, outlined numerals, curved bottom edge, angled marquee band. Pure Reflections' dashed wave divider and tilted real photo card overlapping the illustration. sarnia.site's fake browser frame with a "Live" pill and a "Guernsey" chip.
8. **Real photos, treated consistently.** WAW's video of the actual drummers; Datum's own heat pump in a framed card with an offset outline; Pure Reflections' own squeegee photo tilted onto the illustration.

## Watch out: house-style convergence

The newest routine builds (ridgeline-roofing, premier-taxis) are good, but they are starting to share one skeleton: eyebrow label → three-line headline with the last line coloured → paragraph → two buttons → tick-list trust row, and on the right a rounded photo with an overlapping small card or illustration. Repeated across clients, *our own* best tricks become a template. Every new build must look different from the last few SarniaSites builds, not just from generic templates.

## Keep the studio's look off client sites

Two of sarnia.site's devices are the studio's own brand, and both are also on the public "AI slop" lists, so they must not appear on client drafts: the **serif-italic accent word inside a sans headline** (Instrument Serif italic in sarnia.site) and the **near-black + one acid-green accent** palette. Borrow sarnia.site's thinking (a signature that tells the story, scroll-telling, extreme scale contrast, one recurring typographic device, mono micro-labels used sparingly), not its surface.

Likewise WAW gets away with a stat strip, a glow blob and a scroll cue because the 3D island, footprints and video carry it, and because a charity event genuinely has numbers to show. Client trade drafts still follow the routine's no-counts, no-glow rules.
