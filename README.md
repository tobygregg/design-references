# SarniaSites design references

The visual library the build routine (and Toby and Tom) look at before designing a client draft. Everything here is **for reference only**: borrow the technique, never the content, wording, logos, photos or drawings of another site.

```
00-our-best-work/   the bar: sarnia.site, World Aid Walk, Pure Reflections, Datum (+ why they work)
heroes/             ~35 hero screenshots sorted into 14 layout archetypes (README explains each)
anti-examples/      what generic / AI / template trade sites look like (never build like this)
guides/             typography, colour, branding + graphics, motion, libraries + Figma,
                    AI-slop tells, a trade playbook, and the studio's own "house fingerprint"
tools/slop-lint.mjs Playwright check that fails a draft on measurable AI-template tells
research/           the full research report behind the guides (sources cited inline)
```

## How the routine should use this (in order)

1. Read `00-our-best-work/README.md` — what makes our best sites work, and the house-convergence warning.
2. Read `guides/house-fingerprint.md`, then check the most recent SarniaSites builds (it explains how). Whatever they used for display font, hero archetype and signature idea is off the table for this build.
3. Open `heroes/README.md`, look at every image in the two or three archetypes that suit this client's real assets, and pick one on purpose.
4. Use `guides/trade-playbook.md` for the trade's signature ideas, motifs and starting palettes, then `guides/typography.md` and `guides/colour.md` to choose the type pairing and palette **from the client's brand**, not from the model's habits.
5. Build. Keep `guides/branding-graphics-and-photos.md` and `guides/motion-and-interaction.md` open.
6. Before the review passes, read `guides/ai-slop-tells-and-fixes.md` and run the lint:
   ```bash
   python3 -m http.server 8080 &   # from the site folder
   node /tmp/benchmarks/design-references/tools/slop-lint.mjs http://localhost:8080/ --avoid-fonts "Font A,Font B"
   ```
   `--avoid-fonts` = the display faces of the last few studio builds. Fix every FAIL; look at every WARN.
7. Compare your screenshots with `00-our-best-work/` and `anti-examples/`. If yours sits closer to the anti-examples, redo it.

## Adding references

Save desktop screenshots at 1280–1440px wide as JPEG (quality ~82) into the right `heroes/` folder, named `site-name-what-to-notice.jpg`, and add a line to `heroes/README.md`. Prefer small local businesses and trades over SaaS. If a reference starts appearing in several of our builds, it has become a template: note it in `guides/house-fingerprint.md`.
