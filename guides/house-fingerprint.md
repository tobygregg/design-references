# The studio's own fingerprint — don't repeat it

The newest risk isn't the AI's defaults, it's **ours**. Every escape route written into a prompt becomes the next default. The routine's old font "starting points" turned into a house style within a month:

## Display / body faces used so far (from each repo's tailwind.config.js, Nov 2026)

| Face | Builds using it |
|---|---|
| Fraunces | bow-wow-pet-services, paws-on-the-rock, jwh-decorating, all-tidied-up, locksmiths, PhoenixGardening (6) |
| Bricolage Grotesque | mg-gardens, treevolution, v1-window-cleaning, plumbdr, h2o (5) |
| Figtree (body) | mg-gardens, treevolution, limepointing-works, all-tidied-up, locksmiths, plumbdr, h2o (7) |
| Young Serif | premier-taxis, limepointing-works |
| Hanken Grotesk | premier-taxis, ridgeline-roofing |
| Archivo | ridgeline-roofing, pete-s-mobile-mechanical, WAW (Archivo Black) |
| Public Sans | pete-s-mobile-mechanical, r-w-electrical |
| Manrope | BR, PhoenixGardening, JHT |
| Also used once | Bodoni Moda (buff), Saira (r-w-electrical), Zilla Slab (special-branch), Josefin Sans (the-garden-barber), Shrikhand + Schibsted Grotesk (the-cake-lady), Rokkitt (junk-b-gone), Plus Jakarta Sans, DM Sans, Barlow Condensed + IBM Plex Mono (datum), Oswald (BR), Chakra Petch + Instrument Sans (supreme), Playfair Display (JHT), Gloock + Outfit (pure-reflections), Sora + Instrument Serif + DM Mono + Figtree (sarnia.site), Caveat (plumbdr, WAW) |

**Rule:** a face used for display by any of the last ~8 studio builds is off the table, and the faces with 3+ uses above are retired as display faces for now (`tools/slop-lint.mjs` fails them).

## Hero / layout patterns that are becoming house style

- Eyebrow label → three-line headline with the **last line in the accent colour** → paragraph → Call + Quote → a row of tick or icon "trust points". (ridgeline-roofing, premier-taxis, datum, pure-reflections, many others.)
- A rounded photo on the right with a **small card or illustration overlapping its corner** (ridgeline-roofing copies Pure Reflections' illustrated house on a card).
- **Arch-masked photos joined by a dashed route line** with pill labels (premier-taxis). Good once; not again soon.
- **Hand-drawn wavy underline under one word** of the headline (pure-reflections and many since).
- Numbered tap-to-explain hotspots (datum's plant room, premier-taxis' taxi diagram). Strong, but rotate the form: a scroll-drawn path, a stepper, a cross-section, a before/after, a map.

Use none of these on autopilot. If one genuinely fits, change its form enough that the two sites couldn't be mistaken for each other.

## How the routine checks the latest builds (read-only)

Org-wide GitHub listing (`gh repo list`, `/orgs/.../repos`) is blocked inside Claude Code sessions, so:

1. Call the `list_repos` tool with query `SarniaSites/` (results include `pushed_at`); take the ~8 most recently pushed, skipping `demo-repository` and the build's own repo. If the tool isn't there, use the builds named above.
2. For each, read the fonts and colours, and look at the committed hero screenshot (every routine build saves one):
   ```bash
   curl -s https://raw.githubusercontent.com/SarniaSites/<name>/main/tailwind.config.js | grep -A6 -E "fontFamily|colors"
   curl -s -o /tmp/house-<name>.jpg https://raw.githubusercontent.com/SarniaSites/<name>/main/_shots/desktop.jpg
   ```
3. Write down each build's display font, hero archetype and signature idea. Choose differently on all three, and pass their display fonts to `tools/slop-lint.mjs --avoid-fonts`.

Update this file when a new pattern starts repeating.
