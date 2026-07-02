# Markosh Visual Redesign — Task Plan

> Companion to [Design.md](Design.md). Execute in order on the `re-branindg`
> branch; each task is independently committable. Copy/IA/compliance are locked.

## T1 — Cool the neutral tokens

**Files:** `src/styles/global.css`

- Shift hue-40 warm neutrals to ~hue-220 per the token table in Design.md §4
  (`--background`, `--secondary`, `--muted`, `--border`, `--input`,
  `--ink-foreground`, and the warm `.dark` foregrounds).
- Verify `bg-grid`, `glass-card` shadows, and Taskade widget styles still look
  right on the cooler paper.

**Done when:** site renders on neutral paper; no warm-cream tint anywhere;
AA contrast spot-checks pass (esp. `--muted-foreground` on `--secondary`).

## T2 — Typography scale + numbered-section pattern

**Files:** all `src/components/sections/*.astro`, page heroes in `src/pages/*.astro`

- Define one eyebrow pattern: mono index + em-dash + label
  (e.g. `01 — What we do`), replacing current small-caps eyebrows on the
  homepage sections first, then inner pages.
- Step section headings up one size where layout allows (3xl/5xl → 4xl/6xl),
  tighten leading/tracking to match the hero.

**Done when:** every homepage section uses the numbered eyebrow; heading scale
feels like one system from hero to footer.

## T3 — Mono data accent

**Files:** `HeroSection.astro`, `VettingProcess.astro`,
`CaseStudiesSection.astro`, `ServicesOverview.astro`, `TrialOfferBand.astro`,
`src/pages/sales.astro`, `src/pages/sales-rep-trial.astro`,
`src/pages/services/ai-strategy.astro`

- `font-mono` (built-in stack, no new fonts) for: stat values, funnel
  percentages, metric values, index numerals/watermarks, offering labels,
  status tags, and the trial qualifier on all three surfaces.
- Nothing else goes mono (no headings, no body prose).

**Done when:** all numerals/metrics/tags/qualifiers are mono; headings and body
unchanged.

## T4 — Homepage component redesign

**Files:** `ServicesOverview.astro`, `HeroSection.astro`,
`CaseStudiesSection.astro`, `TalentShowcase.astro`, `TrustSection.astro`,
`TrialOfferBand.astro`, `HomeFaq.astro`, `RolesGrid.astro`,
`src/pages/index.astro`

- ServicesOverview: replace the 4 icon cards with a typographic numbered
  sequence (rows + rules, oversized verb, mono offering label, description,
  arrow link). Delete the inline SVG icon map.
- Hero: consider removing/replacing the stock team photo; delivery-signal
  mini-cards become a mono caption line; keep stats (now mono).
- CaseStudiesSection: portfolio-style entries (rule-separated, mono metric
  tags) instead of boxed articles; keep the "what stays true" aside content.
- TrialOfferBand: try the ink treatment (full-bleed dark band, mono
  qualifier); re-verify fill alternation for the whole page afterwards.
- TalentShowcase / TrustSection / FAQ / Roles: reduce chrome — rules over
  boxes where possible, no content changes.

**Done when:** no icon-square cards remain on the homepage; fill alternation
rule holds; page reads as type-led.

## T5 — Inner pages

**Files:** `src/pages/sales.astro`, `src/pages/sales-rep-trial.astro`,
`src/pages/services/ai-strategy.astro`, `src/pages/services.astro`

- /sales: models → portfolio-style entries (keep `#revenue-pods` anchor +
  scroll-mt); is/is-not + fit/not-fit → two-column rule lists; guardrails ink
  band goes full-drama (oversized headline, mono labels).
- /sales-rep-trial: included/excluded → rule lists; eligibility ink band;
  qualifier in mono at hero and footer CTA.
- /services/ai-strategy: deliverables → report artifacts ("DELIVERABLE 01"
  mono tag, document top rule); packages → numbered sequence.
- /services: remove Unsplash images from the 8 service rows; typographic rows
  with rules instead. EngagementModels stays at page end.

**Done when:** no stock photography on /services; all four pages share the T2
eyebrow + T3 mono system.

## T6 — Verification & ship

- `npm run check` (only the 3 pre-existing errors in astro.config.mjs,
  toast.tsx, performance.ts are acceptable), `npm run build`.
- Preview server: screenshot/snapshot `/`, `/sales`, `/sales-rep-trial`,
  `/services/ai-strategy`, `/services` at desktop + 375px mobile.
- Fill-alternation audit (DOM check: no two adjacent sections share a fill).
- Contrast spot-checks on new neutral paper + ink bands.
- Compliance grep on `dist/` for the banned-phrase list (Design.md §7) and
  qualifier presence (3 pages minimum).
- Commit sequence suggestion:
  1. `design: cool neutral tokens + mono data accent` (T1+T3)
  2. `design: numbered-section typographic system` (T2)
  3. `design: homepage bold-minimal pass` (T4)
  4. `design: inner pages bold-minimal pass` (T5)

## Out of scope (tracked separately)

- Contact form backend is still a MOCK (`src/lib/form-utils.ts:120`) — needs a
  real endpoint before launch.
- Vetting funnel percentages TODO (`VettingProcess.astro:2`) — needs real data
  from the user.
- `public/og-image.png` regeneration with new tagline
  (`scripts/generate-og-assets.mjs`).
- Deeper redesign of /about, /industries, /career, whitepapers.
