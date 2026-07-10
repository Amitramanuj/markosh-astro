# Markosh.com Technical SEO and Performance Audit

Original audit: 2026-07-03. Re-audited and merged: 2026-07-11.

Scope: local Astro 5 build for `markosh.com-astro`, generated `dist` output, the repo's
own audit pipeline (`npm run audit:technical-seo`), and live checks against
`https://markosh.com/` and `https://www.markosh.com/`.

## Executive Summary

The site is in a strong technical state. Every code-side item from the 2026-07-03
backlog has been implemented and is now **enforced by scripts** that run in
`npm run audit:technical-seo` (type-check → build → encoding, metadata, structured
data, and performance budgets). The 2026-07-11 run is green across all 31 pages.

What remains is almost entirely outside the codebase: a broken `www` subdomain,
the mock contact-form backend, and live verification in Google's tools. Details
below in the open backlog.

## Verified Current State (2026-07-11)

### Build and validation

- `npm run audit:technical-seo` passes end to end.
- 31 static pages (was 17 on 2026-07-03; solutions section, blog, and case studies added since).
- SEO metadata audit: all titles ≤ 70 chars, descriptions ≤ 170 chars, no brand
  repetition in titles (`scripts/audit-seo-metadata.mjs`).
- Structured data: 114 JSON-LD blocks valid across 31 pages
  (`scripts/validate-structured-data.mjs`) — Organization, WebSite, Service,
  Article, BreadcrumbList, FAQPage.
- Text encoding: 58 source files clean, mojibake guard in place
  (`scripts/check-text-encoding.mjs`).
- Performance budgets pass (`scripts/check-performance-budgets.mjs`).
  One soft warning: home HTML is 73.6 KB against a 64 KB target
  (under the 76 KB hard limit) — content growth, monitored, no action.

### Performance profile

- **JS**: home page ships 2.25 KB of JS. React hydrates on the contact page only
  (`ContactFormCore` island); the header, reveals, and count-ups are framework-free.
  The 179 KB react-vendor chunk loads nowhere else.
- **Third parties**: Taskade is the single approved global script, framework-free
  and gated behind first interaction or a 3.5 s idle timer; it renders its own
  launcher (no pre-chat button).
- **Fonts**: 6 files / ~136 KB in `dist/_astro` (was 72 files / ~971 KB) —
  Latin-only subsets of Inter 400/600 and Space Grotesk 700; JetBrains Mono
  replaced by the system mono stack. Modern browsers request only the 3 `.woff2`
  files (~60 KB).
- **CSS**: one stylesheet, 38.5 KB uncompressed (was 63.7 KB).
- **Images**: only optimized WebP in `dist` (7 files, ~53 KB total); the large
  founder PNG originals no longer leak into the build output.
- **Prefetch**: hover strategy, `prefetchAll` disabled.
- **Baseline Lighthouse** (2026-07-03, production preview, home): Performance 99,
  SEO 100, LCP 1.74 s, TBT 0 ms, CLS 0.013. No change since then increases JS or
  render-blocking weight, but a re-run is queued below.

### Crawlability and headers

- Canonical URLs on every route; one H1 per page; `noindex` only on the 404 page.
- Real 404: `src/pages/404.astro` builds `dist/404.html`, so Cloudflare Pages no
  longer answers unknown URLs with a soft-404 SPA fallback.
- Sitemap with honest per-route `lastmod`/`changefreq`/`priority` for all static
  routes (`sitemapMetadataByPath` in `astro.config.mjs`); robots.txt points to it.
- Security headers + CSP served from `public/_headers`; hashed `_astro/*` assets
  cache immutable for a year; HTML revalidates.

## Open Backlog

### P0 — Fix `www.markosh.com` (owner action, Cloudflare dashboard)

Verified live 2026-07-11: `https://www.markosh.com/` returns **HTTP 522**; the apex
loads fine. Anyone typing `www.` gets a Cloudflare error page and any `www` links
waste their equity. Fix in the Cloudflare dashboard (cosmipath@gmail.com account):
add a `www` → apex redirect rule or a proper CNAME on the Pages project. The local
wrangler token lacks zone-write, so this cannot be scripted from the repo.

### P0 — Contact form backend (blocked on business-suite decision)

The form is still a mock (`src/lib/form-utils.ts`); submissions go nowhere. Every
comparable agency converts on this. Tracked in Tasks.md §1 — wire
`ContactFormCore.tsx` to the suite's endpoint once Zoho (or equivalent) is chosen.

### P1 — Live verification in Google tools (manual, ~30 min)

Never confirmed against production:

1. Google Rich Results Test on `/`, `/services/`, `/solutions/outbound-pipeline-pod/`,
   `/sales-rep-trial/`, one whitepaper, and one blog post.
2. Search Console: submit the sitemap, confirm indexing of the new solutions/blog/
   case-study routes, check for structured-data warnings.
3. Re-run production Lighthouse on `/`, `/services/`, `/contact/`, `/sales/`
   (baseline above is from 2026-07-03 with 17 pages).

### P2 — Sitemap `lastmod` for content collections (small code task)

Static routes have honest `lastmod` values, but blog posts and case studies fall
through the manual `sitemapMetadataByPath` map with no `lastmod` at all. Derive it
from collection frontmatter (`publishDate`/`updatedDate`) in the sitemap
`serialize()` hook. Also note: the map is manual — every new page must be added by
hand (documented in CLAUDE.md/AGENTS.md).

### P2 — Organization `sameAs` URLs are guesses (waiting on owner)

`generateOrganizationStructuredData()` in `src/lib/seo-utils.ts` claims
`linkedin.com/company/markosh` and `twitter.com/markosh` — neither confirmed.
Correct or remove once the real profiles exist (Tasks.md §3, with the footer
social links).

### P3 — Optional small wins

- **Drop `.woff` fallbacks**: 3 legacy `.woff` files (~77 KB) ship in every deploy
  but are never requested by browsers that can run this site. Custom `@font-face`
  with `.woff2`-only sources would remove them.
- **`llms.txt`**: cheap addition that helps AI crawlers cite the site correctly —
  on-brand for an intelligence lab.
- **Home HTML weight**: watch the 73.6 KB (target 64 KB, hard limit 76 KB); next
  copy addition to the home page may need an offsetting trim.

### Growth candidates (from 2026-07-11 competitor review — owner decisions, copy rules apply)

Benchmarked against Belkins/CIENCE/Martal (sales-as-a-service) and Toptal/Lemon.io
(vetted talent). Already at parity on: solution playbooks, vetting explainer,
risk-free trial, honest case studies. Gaps, in impact order:

1. **Pricing-structure page** — all five competitors publish at least a range or
   engagement structure; a structural "how engagements are priced" page fits the
   honesty-note voice without hard numbers.
2. **Comparison/evaluation content** — "X vs Y" and "how to evaluate an outbound
   agency" pages dominate this market's search results; fits the research-first blog.
3. **Role-specific staffing landing pages** ("hire React developers" pattern) —
   extends the `solutions.ts` typed-data approach cleanly.
4. **Third-party proof** — Clutch/G2/DesignRush profiles; needs real client reviews.

## Resolved (2026-07-03 backlog → done by 2026-07-11)

| 2026-07-03 item | Resolution |
|---|---|
| P0 Reduce global React hydration | Header/reveals converted to Astro + vanilla JS; React only on `/contact/`; home JS 2.25 KB |
| P0 Taskade lazy-load without pre-chat gate | Framework-free, interaction/idle-gated, native launcher, `markoshOpenAgent()` bridge for CTAs |
| P1 Font payload and subsetting | Latin subsets only, 3 weights, JetBrains Mono → system mono; 72 files/971 KB → 6 files/136 KB |
| P1 Tune prefetch | `prefetchAll: false`, hover strategy |
| P1 Sitemap freshness metadata | Per-route `lastmod`/`changefreq`/`priority` for all static routes |
| P1 Whitepaper mojibake | Fixed; `check-text-encoding.mjs` guards regressions in CI path |
| P2 Metadata length/double-branding | `generateTitle()` de-dupes brand; `audit-seo-metadata.mjs` enforces 70/170 budgets; last 2 outliers trimmed 2026-07-11 |
| P2 Structured data validation (local) | `validate-structured-data.mjs`: 114 blocks green (live Google check still open, see P1 above) |
| P2 Source-image weight in dist | Only WebP ships; PNG originals no longer emitted |
| P2 CSS strategy | Stylesheet 63.7 KB → 38.5 KB; critical CSS stays small and inline |
| P3 Browserslist / Tailwind experiment / audit tooling | No staleness warning in current builds; `optimizeUniversalDefaults` removed; `audit:technical-seo` + `lighthouse:summary` scripts added |

## Performance Budget Guardrails

Now enforced by `scripts/check-performance-budgets.mjs` (run in `check:seo`), not
just documented. Current standing vs. the original suggested targets:

| Budget | Target | Current |
|---|---:|---:|
| Home JS before third parties | < 45 KB | 2.25 KB |
| React runtime on static pages | avoid | contact page only |
| Font files in dist | < 20 | 6 |
| Home HTML size | 64 KB target / 76 KB hard | 73.6 KB (soft warning) |
| Global third-party scripts | 0 + approved exceptions | Taskade only, gated |

## Sources Used

- Google Search Central: Core Web Vitals and Search: https://developers.google.com/search/docs/appearance/core-web-vitals
- Google Search Central: Page experience: https://developers.google.com/search/docs/appearance/page-experience
- Google Search Central: Sitemaps: https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
- Google Search Central: Canonical URLs: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- web.dev: INP: https://web.dev/articles/inp
- web.dev: Optimize LCP: https://web.dev/articles/optimize-lcp
