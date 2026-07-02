# Markosh Visual Redesign — Design Direction

> Status: **approved direction, not yet implemented.** Written 2026-07-02 after the
> content rebrand landed on `re-branindg` (commits `04de64a`, `b0d9850`).
> Execute via [Tasks.md](Tasks.md). Copy, IA, and compliance language are LOCKED —
> this is a visual-language change only.

## 1. The brief in one line

Move from "warm editorial consultancy with icon cards" to **bold-minimal
"AI studio"**: typography-led, radically reduced, proof-forward — on a
**hybrid canvas: light neutral base with big dark ink bands**.

## 2. References (user-provided)

| Reference | What we take from it | What we don't |
|---|---|---|
| sociallcapital.com | Light minimalism, huge confident display type, numbered sections (1/2/3 pitch structure), generous whitespace, text-led storytelling | Its pure-white sterility; we keep a faint paper tint |
| 360labs.ai/portfolio | Dark technical drama, portfolio-forward proof (project entries with live/development status tags), content density used as credibility | Full-dark site-wide; we use dark as punctuation, not canvas |

**Shared philosophy (this is the actual taste target):** typography does the
design; few elements per screen; work/proof over promises; zero
"corporate SaaS" chrome (no icon-in-rounded-square feature cards).

## 3. Canvas & rhythm (hybrid)

- Light neutral paper is the base canvas.
- Full-bleed **ink bands** are the drama: Vetting (home), Operating Guardrails
  (/sales), Eligibility (/sales-rep-trial), Footer. Consider promoting the
  TrialOfferBand to ink for a stronger conversion moment.
- Keep the existing rule: **no two adjacent sections share a fill.** Current
  home rhythm (hero → secondary → background → ink → secondary → background →
  secondary → background → secondary → ink footer) may be re-planned, but the
  alternation rule survives.
- Dark bands should feel like chapters, not cards-on-dark: full-bleed,
  oversized headline, lifted `--signal` green (already handled by `.ink-panel`).

## 4. Colour tokens

Keep: **indigo primary** (`244 55% 48%`), **signal green** (`158 60% 28%`,
lifted to `158 55% 58%` on ink), **ink** (`230 30% 9%`), destructive, radius.

Cool the warm hue-40 neutrals to neutral-cool (~hue 220) in
`src/styles/global.css`:

| Token | Current (warm) | Target (neutral) |
|---|---|---|
| `--background` | `40 33% 97%` | `220 20% 98%` |
| `--secondary` | `40 25% 93%` | `220 14% 94%` |
| `--muted` | `40 20% 91%` | `220 12% 92%` |
| `--border` / `--input` | `40 15% 85%` | `220 12% 86%` |
| `--ink-foreground` | `40 33% 97%` | match new `--background` |
| `.dark` warm foregrounds (`40 33% 96%`) | warm | cool to match |

Also check `bg-grid` (uses `--border`) still reads correctly after the shift.

## 5. Typography system

- **Space Grotesk (display)** goes bigger and harder-working. Hero stays at its
  current scale or larger; section headings step up (3xl/5xl → 4xl/6xl where
  the layout allows). Tight leading (`leading-[1.02]`–`[1.05]`), tracking-tight.
- **Numbered sections** (Social Capital pattern): section eyebrows become
  mono-numbered — e.g. `01 — What we do` — replacing the current
  small-caps-only eyebrows. One shared pattern, applied consistently.
- **Inter (body)** unchanged.
- **Mono accent (new):** Tailwind's built-in `font-mono` stack (system mono —
  zero font-download cost). Used ONLY for data: hero stat values, vetting
  funnel percentages, case-study metric values, card index numerals,
  small-caps offering labels, status tags, and the trial qualifier
  (compliance-print feel). Never for headings or body prose.

## 6. Component language

**Kill:** icon-in-rounded-square feature cards (ServicesOverview icons),
decorative glass-card usage where a rule/divider would do, stock Unsplash
photography (both references are text-led; generic stock photos are the
single biggest "template site" tell — remove or replace with real
artifacts/abstract motifs).

**Replace with:**
- **Four families** = a bold typographic sequence (numbered rows with rules,
  oversized family verb, mono offering label, one-line description, arrow
  link) — not four boxes.
- **Engagement patterns / case studies** = portfolio-style entries
  (360labs): title, sector tag, mono status/metric tags, rule between entries.
- **Deliverables (ai-strategy)** = report artifacts: mono index tag
  ("DELIVERABLE 01"), document-style top rule; they should look like things
  a client receives.
- **Lists over cards** generally: fit/not-fit, included/excluded become
  clean two-column rule-separated lists.
- Keep `glass-card` only where a card is semantically right (contact form,
  FAQ accordions if needed).

## 7. What is LOCKED (do not change)

- All copy and page inventory (/, /sales, /sales-rep-trial,
  /services/ai-strategy, /services, /contact, /about, etc.).
- Compliance rules: the trial qualifier ("For approved B2B companies only.
  One rep. One ICP. Capped activity. No appointment or closed-deal
  guarantee.") stays adjacent to every trial mention; the banned-phrase list
  (guaranteed appointments/revenue, TCPA-proof, 100% compliant, risk-free,
  call center, lead generation, robocall, AI voice, auto-dial, growth
  hacking…) still applies. Grep the build after changes.
- Fonts (Inter + Space Grotesk), indigo primary, signal green, ink token,
  logo, radius, contact-form logic.

## 8. Per-page treatment notes

- **Home:** hero = biggest type on the site, trim remaining chrome
  (delivery-signal mini-cards under the photo can become a mono caption
  line; consider dropping or replacing the stock team photo). Families as
  typographic sequence. Vetting ink band amplified (it's already the best
  section — make it the template for all dark bands). Case patterns as
  portfolio entries. TrialOfferBand: candidate for ink treatment.
- **/sales:** hero type up; what-is/is-not and fit/not-fit as rule-lists;
  models as portfolio-style entries (keep `#revenue-pods` anchor);
  guardrails ink band full-bleed drama.
- **/sales-rep-trial:** qualifier in mono print; included/excluded as
  rule-lists; eligibility ink band.
- **/services/ai-strategy:** deliverables as report artifacts; packages as
  numbered sequence.
- **/services:** remove Unsplash imagery from the 8 service rows —
  typographic rows instead; keep EngagementModels at the end.
- **/about, /contact, /industries, whitepapers:** token/typography inheritance
  only in the first pass; deeper treatment later.

## 9. Accessibility floor

AA contrast everywhere (indigo on new neutral paper passes; re-verify muted
foreground on `220 14% 94%`); lifted signal on ink; visible focus rings;
mono sizes never below 12px; qualifier text must remain readable size, not
fine-print.
