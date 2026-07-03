# Markosh Visual Polish — Task Plan

> Follow-up to the scroll-animation work on the `SEO` branch (2026-07-03).
> V2–V4 implemented 2026-07-03 (validated against 2026 B2B design-trend
> research: monochrome + purposeful CSS-only motion + proof-over-decoration).
> Constraint: preserve the bold-minimal monochrome aesthetic; motion stays
> restrained and respects `prefers-reduced-motion` (pattern already in
> `global.css` + `BaseLayout.astro`).

## V1 — Single accent color — ❌ REJECTED 2026-07-03

Implemented (electric blue on CTA + `--signal`) and immediately reverted at
the user's request: the site stays 100% monochrome ink. Emphasis comes from
size, weight, and ink panels — never hue. **Do not re-suggest accent colors.**

## V2 — Animated hero visual (technical-capability signal) — ✅ DONE 2026-07-03

**Files:** `src/components/sections/HeroSection.astro`, `src/styles/global.css`

- Self-drawing research → talent → delivery diagram, right of the hero stats
  row (`.hero-diagram`, `hidden lg:block`, `aria-hidden`).
- Draw-on via `pathLength="1"` + `stroke-dashoffset` keyframes, staggered
  with `--draw-delay`; monochrome strokes only, no JS.
- Reduced motion: strokes render fully drawn, no animation. LCP untouched.

## V3 — Trust marquee under hero stats — ✅ DONE 2026-07-03

**Files:** `src/components/sections/TrustMarquee.astro` (new),
`src/styles/global.css`, `src/components/sections/HeroSection.astro`

- CSS-only marquee of 12 monochrome stack badges (`.marquee` /
  `.marquee-track`), two duplicated groups sliding `-50%` for a seamless
  42s loop; edge fade via `mask-image`.
- Pauses on hover; static under `prefers-reduced-motion`; second group is
  `aria-hidden`.

## V4 — Hero grid depth (subtle parallax) — ✅ DONE 2026-07-03

**Files:** `src/styles/global.css`, `src/components/sections/HeroSection.astro`,
`src/layouts/BaseLayout.astro` (script)

- `.bg-grid-strong` variant (line alpha 0.7 → 0.9) applied to the hero grid,
  which extends `-top-24` so the transform never exposes a bare edge.
- Generic `[data-parallax]` handler in BaseLayout: speed 0.12, transform-only,
  rAF-throttled, passive scroll listener, skipped under reduced motion.

## V5 — Hero headline kinetic package — ✅ DONE 2026-07-03 (user-requested)

**Files:** `src/components/sections/HeroSection.astro`, `src/styles/global.css`

- Eyebrow: terminal-style type-in via `clip-path` + `steps(28)` (`.hero-type`)
  — no opacity, no layout shift.
- Headline: three phrases as `inline-block` spans rising in sequence
  (`--rise-delay` 0 / 0.12s / 0.24s), transform-only so LCP is unaffected.
  Side benefit: lines now wrap at phrase boundaries, not mid-phrase.
- Primary CTA: arrow nudges right on hover (`group-hover:translate-x-1`).
- All three off under `prefers-reduced-motion`.

## Ideas discussed but NOT approved (implement only if asked)

- Ambient pulse dot traveling down the hero diagram after draw-in (~6s CSS
  loop). Offered 2026-07-03 as the only tasteful "more hero animation"
  candidate; user has not approved it. Hero is otherwise at motion budget.

## Verification (every task)

- `npm run type-check` and `npm run build`.
- Preview server: screenshot `/` at desktop + 375px mobile.
- Reduced-motion check: emulate `prefers-reduced-motion` and confirm all
  motion is off.

## Rejected

- Section-number scroll progress indicator — rejected 2026-07-03; clutters
  the clean aesthetic. Do not re-suggest.

## Out of scope (carried over — still open pre-launch items)

- Contact form backend is still a MOCK (`src/lib/form-utils.ts`) — needs a
  real endpoint before launch.
- Vetting funnel percentages TODO (`VettingProcess.astro:2`) — needs real
  data from the user.
