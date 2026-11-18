# Motion and interaction

Motion has three jobs: **show a state change, direct attention, express the brand's personality**. Anything doing none of the three goes.

## Budget per site

1. **One choreographed hero moment** on load (headline split/stagger, a mask reveal on the main photo, the motif drawing itself, the nav settling last). Runs once.
2. **The signature idea's motion** (the squeegee loop, the pipe flow, the route drawing as you scroll, the island you spin). At most ~3 ambient loops visible at once; pause them offscreen.
3. **Feedback micro-interactions** everywhere the visitor acts.
4. Everything else is mostly still. Not every section fades up.

## Timings and easing (NN/g, Emil Kowalski, Codrops)

- Feedback ~100ms; most UI motion 150–300ms; entrances slightly longer than exits; nothing feels good past ~500ms except ambient loops.
- Ease-out (or `cubic-bezier(.2,.7,.2,1)`, expo/quart out) for entrances; ease-in for exits; **never linear** except 1:1 scroll scrubbing; no bounce/elastic everywhere.
- Vary timing per element type (buttons crisp, illustrations soft, loops slow and slightly randomised: `gsap.utils.random(1.5,2.5)`); tiny staggers (~12–60ms) beat lockstep.
- Personality: precise trades (electrical, plumbing, roofing) feel crisp and exact; friendly ones (pets, cakes, gardens) can be a touch bouncier.
- Animate **transform and opacity** only. No `transition-all`, `animate-bounce`, `animate-pulse` (lint fails them).

## Micro-interactions checklist

Buttons lift on hover, press down on click · links get an underline that draws from the left (`background-size` or `scale-x`, ~220ms) with matching `:focus-visible` · cards lift or tilt slightly and their photo zooms a touch (not every image on the page) · header shrinks/changes on scroll, nav marks the active section · form fields: clear focus ring, inline validation, loading → success state on submit · explorer tabs, accordions, lightbox and mobile menu transition smoothly · tap states on mobile · on desktop only (`(hover:hover) and (pointer:fine)`), hero layers may shift slightly with the cursor; at most one magnetic CTA.

## Patterns: crafted vs slop

| Crafted | Slop |
|---|---|
| A route/pipe/cable line that draws itself as you scroll (`stroke-dashoffset` or scroll-driven animation) | Fade-up on every section with the same delay |
| A before/after reveal the visitor drags | Count-up numbers of Facebook stats |
| A services marquee (CSS transform) that pauses on hover/focus and stops under reduced motion | Auto-advancing testimonial carousel |
| Sticky stacking cards for a genuine 3–5 step process | Parallax on everything; scroll-jacking |
| A satisfying submit state (button → spinner → tick, motif completes) | Confetti, sparkles, glow pulses |

## Native CSS you can use now (behind `@supports` + `prefers-reduced-motion: no-preference`)

- **Scroll-driven animations** (`animation-timeline: view()` / `scroll()`): all three engines since Oct 2026 — ideal for drawing the motif on scroll without JS.
- **Same-document View Transitions** (Baseline) for the services explorer/tabs swap; `@starting-style` (Baseline) for entry transitions of popovers/menus.
- Cross-page view transitions (`@view-transition { navigation: auto; }`) work in Chrome/Safari, not Firefox — a free extra for thanks.html/404.html.
- `text-wrap: balance` for headings; `text-wrap: pretty` (Chrome/Safari) for paragraphs.
- Tailwind v3 has no utilities for these; write them in `src/input.css`.

## Reduced motion

`@media (prefers-reduced-motion: reduce)`: no loops, no parallax, no marquee movement, no drawn-on-scroll paths (show them complete), simple opacity fades at most. With GSAP use `gsap.matchMedia()` with a `reduceMotion` condition. The page must look finished with all motion off.
