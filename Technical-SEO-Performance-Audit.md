# Markosh.com Technical SEO and Performance Audit

Audit date: 2026-07-03, local workspace timezone.

Scope: local Astro 5 build for `markosh.com-astro`, generated `dist` output, a clean local production-preview Lighthouse run for the home page, and light live checks against `https://markosh.com/` headers, `robots.txt`, and sitemap output.

## Executive Summary

The site is in a good technical SEO baseline state. It builds statically, generates a sitemap, serves canonical URLs, has one H1 per built route, ships compressed HTML/assets on Cloudflare, uses immutable caching for hashed `_astro` assets, and passes local production-preview Lighthouse SEO at 100.

The main improvement opportunity is not basic crawlability. It is performance headroom for Core Web Vitals, especially INP risk from global React hydration and third-party chat loading. The highest-impact work is to reduce unnecessary JavaScript, reduce font payload, restrict or gate the Taskade widget, and improve sitemap freshness metadata.

## Confirmed Current State

### Build and Validation

- `npm.cmd run build` completed successfully.
- `npm.cmd run type-check` completed with 0 errors, 0 warnings, and 0 hints.
- Build output: 17 static pages.
- Sitemap output: `dist/sitemap-index.xml` points to `https://markosh.com/sitemap-0.xml`.
- Live `https://markosh.com/robots.txt` matches the repo and points to the sitemap index.

### Local Production Lighthouse, Home Page

Command target: clean `astro preview` on a separate local port, not the already-running dev server on 4321.

| Metric | Result |
|---|---:|
| Performance | 99 |
| SEO | 100 |
| First Contentful Paint | 1.48s |
| Largest Contentful Paint | 1.74s |
| Total Blocking Time | 0ms |
| Cumulative Layout Shift | 0.013 |
| Speed Index | 1.48s |

Remaining Lighthouse opportunities on the home page:

- Render-blocking stylesheet: one CSS file, estimated 460ms opportunity.
- Unused JavaScript: about 32 KB transferred, all from Astro/React client runtime.
- Unused CSS: about 17 KB transferred.

### Live Header Checks

Live HTML:

- `Content-Type: text/html; charset=utf-8`
- `Content-Encoding: br` when requested.
- `Cache-Control: public, max-age=0, must-revalidate`
- `CF-Cache-Status: DYNAMIC`
- Security headers from `public/_headers` are active.

Live hashed assets:

- `_astro/*.js` and `_astro/*.css` use `Cache-Control: public, max-age=31536000, immutable`.
- Brotli is active for JS/CSS when requested.

This is broadly correct for Cloudflare Pages: HTML revalidates, fingerprinted assets cache for a year.

### Route SEO Inventory

Generated pages have:

- 17 canonical tags for 17 pages.
- 17 H1 elements for 17 pages.
- No `noindex` output.
- 52 JSON-LD blocks across the generated site.

Notable metadata issues:

- Some whitepaper titles are too long for search display control. Examples are 118, 123, and 165 characters.
- Some whitepaper descriptions are long at 184, 209, and 211 characters.
- Several generated page titles repeat the brand twice, for example `About Markosh | Markosh`, `Our Services - Markosh | Markosh`, and `Resources - Markosh | Markosh`.

## Priority Backlog

### P0 - Reduce Unnecessary React Hydration

Current hotspots:

- `src/components/layout/Header.astro` hydrates `src/components/islands/Header.tsx` with `client:load` on every page.
- `src/pages/index.astro` wraps the LCP hero in `FadeInSection client:load`.
- Many static sections are wrapped in `FadeInSection client:visible` or `client:idle`.
- `src/layouts/BaseLayout.astro` mounts a framework-free `TaskadeWidget` on every page, then lazy-loads the third-party script after interaction or idle delay.

Why this matters:

- The production preview transfers about 55.7 KB for `client.*.js`, with Lighthouse estimating about 31.5 KB unused on first load.
- The React runtime is loaded for mostly static content.
- The homepage generated HTML contains many Astro islands around static sections, increasing HTML size and hydration bookkeeping.

Recommended implementation:

1. Convert the desktop/header shell to Astro.
2. Keep only the mobile menu as a tiny island, or use a small framework-free script.
3. Replace `FadeInSection.tsx` with CSS-based reveal where possible.
4. Remove `client:load` from the homepage hero; LCP content should be plain SSR HTML.
5. Use React islands only for actual forms, toasts, and unavoidable interactivity.

Expected impact:

- Lower JS transfer and parse cost on every page.
- More INP headroom.
- Smaller HTML output where repeated island wrappers are removed.
- Lower risk that non-critical animation delays or hydration affect above-the-fold content.

### P0 - Lazy Load Taskade Without Adding an Extra Chat Gate

Current behavior:

- `TaskadeWidget` is mounted globally in `BaseLayout.astro` because site-wide chat availability is a UX requirement.
- It injects `https://assets.taskade.com/embeds/latest/taskade-embed.min.js` after first interaction or after a 3.5s timer.
- The Taskade script is about 271 KB before transfer compression.

Why this matters:

- It may not hurt first Lighthouse paint, but it can affect real-user INP after idle or interaction.
- It introduces a third-party execution dependency on every route.
- A custom intermediate "Chat" button creates poor UX because visitors must click once to load another launcher, then click again to start chat.

Recommended implementation:

1. Keep Taskade site-wide, but lazy-load it after first interaction or after the page has settled.
2. Let Taskade render its own launcher; do not add a Markosh-side pre-chat button.
3. Keep the implementation framework-free so global chat does not reintroduce a React island on every route.
4. Treat Taskade as an explicitly approved global third-party script and revisit only if field data shows INP regression.

Expected impact:

- Preserves the simpler site-wide chat UX.
- Keeps the heavy third-party script off the initial render path.
- Avoids unnecessary React hydration for the global widget.

### P1 - Fix Font Payload and Subsetting

Current state:

- `src/layouts/BaseLayout.astro` imports broad `@fontsource` files:
  - `@fontsource/inter/400.css`
  - `@fontsource/inter/500.css`
  - `@fontsource/inter/600.css`
  - `@fontsource/space-grotesk/500.css`
  - `@fontsource/space-grotesk/700.css`
  - `@fontsource/jetbrains-mono/400.css`
  - `@fontsource/jetbrains-mono/600.css`
- Generated `dist/_astro` contains 72 font files.
- Font payload in `dist`: about 971 KB across `.woff` and `.woff2`.
- Home page requests 9 font files in the production preview.

Why this matters:

- The all-subset imports include Cyrillic, Greek, Vietnamese, Latin-ext, Latin, and legacy `woff` fallbacks for each weight.
- Most of this is not needed for an English business site.

Recommended implementation:

1. Replace broad imports with Latin-specific imports, for example `@fontsource/inter/latin-400.css`.
2. Consider custom `@font-face` declarations that reference only `.woff2`.
3. Remove JetBrains Mono if the visual system can use a system monospace stack.
4. Consider reducing Inter to 400/600 and Space Grotesk to 700 if 500 is not visually essential.
5. Add a font budget check for generated `dist/_astro/*.woff*`.

Expected impact:

- Smaller deploy output.
- Fewer render-critical font requests.
- Lower chance that font loading competes with CSS/JS during first render.

### P1 - Tune Astro Prefetch

Current behavior:

- `astro.config.mjs` uses:
  - `prefetchAll: true`
  - `defaultStrategy: 'viewport'`
- Lighthouse network requests show prefetched route documents such as `/services` and `/contact` during the home page load.

Why this matters:

- Prefetch can improve navigation, but it also spends bandwidth while fonts and critical CSS are still loading.
- On mobile or slower connections, broad viewport prefetch can compete with current-page rendering.

Recommended implementation:

1. Disable global `prefetchAll`.
2. Add explicit prefetch only to high-confidence CTA links or primary next-step links.
3. Avoid prefetching long content routes from the home page unless analytics proves users commonly navigate there immediately.

Expected impact:

- Lower first-page transfer pressure.
- More predictable lab and field performance on slower devices.

### P1 - Add Sitemap Freshness Metadata

Current state:

- Sitemap includes all 17 generated URLs.
- It does not include `lastmod`, `changefreq`, or `priority`.

Recommended implementation:

1. Add accurate `lastmod` values for whitepapers from `published`/`updated` data.
2. Add route-level last modified data for evergreen service pages when content changes.
3. Keep `lastmod` honest; do not stamp every page with build time.

Expected impact:

- Better crawl recency signals for resources and whitepapers.
- Cleaner Search Console diagnostics when content changes.

### P1 - Repair Mojibake in Whitepaper Content

Confirmed issue:

- `src/lib/whitepapers.ts` contains literal corrupted text such as `â€œ`, `â€`, `â€“`, and `â€”`-style mojibake sequences.
- `src/pages/whitepapers/index.astro` contains a literal `Â·`.
- The generated `dist/whitepapers/index.html` ships the corrupted `Â·`.

Why this matters:

- Corrupted punctuation can appear in indexed text and snippets.
- It reduces perceived content quality on resource pages.

Recommended implementation:

1. Replace mojibake sequences with intended ASCII or Unicode punctuation.
2. Prefer ASCII punctuation in source if Windows/editor encoding drift keeps recurring.
3. Add a simple CI/search check for common mojibake markers: `Â`, `â€`, `Ã`.

Expected impact:

- Cleaner indexed content and snippets.
- Lower risk of recurring copy corruption.

### P2 - Tighten Metadata for Search Display

Current state:

- Basic metadata is present across routes.
- Some titles and descriptions are too long, especially whitepapers.
- Some titles repeat the brand.

Recommended implementation:

1. Update `generateTitle()` or whitepaper metadata to avoid double-branding.
2. Add dedicated short SEO titles for whitepapers.
3. Keep page descriptions concise and distinct.
4. Add a metadata audit script that reports title/description length outliers during CI.

Expected impact:

- Better control over search result title links and snippets.
- Cleaner brand presentation.

### P2 - Validate Structured Data in Production

Current state:

- The site outputs Organization, FAQPage, Service, Article, and BreadcrumbList JSON-LD.
- The local Lighthouse SEO check passes.

Recommended implementation:

1. Run Google Rich Results Test on representative pages:
   - `/`
   - `/services/`
   - `/services/ai-strategy/`
   - `/sales-rep-trial/`
   - one whitepaper detail page
2. Check whether FAQ rich results are appropriate for current Google eligibility and display behavior.
3. Avoid emitting overly broad Service schemas if they become noisy or duplicative.

Expected impact:

- Fewer structured-data warnings.
- Better chance of eligible rich result treatment where Google still supports it.

### P2 - Clean Build Output Weight from Source Images

Current state:

- Optimized WebP variants are used in HTML.
- The original imported founder PNGs are also emitted into `dist/_astro`:
  - `Amit...png`: about 1.23 MB
  - `Anvesha...png`: about 1.11 MB
- These originals do not appear to be referenced by generated HTML, but they increase deploy output.

Recommended implementation:

1. Replace source PNGs with already-optimized source assets.
2. Move large originals out of import paths if they are only source material.
3. Keep generated display assets at the actual rendered sizes.

Expected impact:

- Smaller deployment artifact.
- Less accidental risk of large originals being linked later.

### P2 - Review CSS Strategy

Current state:

- One generated CSS file is about 63.7 KB uncompressed, about 22 KB transferred in the local preview.
- Lighthouse estimates about 17 KB transferred unused CSS on the home page.
- The same stylesheet is render-blocking.

Recommended implementation:

1. Keep global Tailwind, but reduce class surface from unused components if possible.
2. Avoid adding more broad UI libraries unless they are used across many routes.
3. Keep critical inline CSS small; do not inline the whole stylesheet unless route-specific testing proves it wins.

Expected impact:

- Small but real FCP/LCP improvement.
- Lower CSS parse cost.

### P3 - Dependency and Tooling Hygiene

Current build warning:

- Browserslist data is 11 months old.
- Tailwind `optimizeUniversalDefaults` is experimental.

Recommended implementation:

1. Run `npx.cmd update-browserslist-db@latest` in a controlled dependency update PR.
2. Decide whether the Tailwind experimental flag is worth the stability risk.
3. Add a repeatable audit script for build, type-check, and Lighthouse JSON extraction.

Expected impact:

- Keeps generated browser targets current.
- Reduces unexpected CSS changes from experimental Tailwind behavior.

## Recommended Implementation Order

1. Repair whitepaper mojibake and metadata outliers.
2. Convert header and fade-in wrappers away from global React hydration.
3. Keep Taskade global for UX, but lazy-load it without a custom pre-chat button.
4. Subset fonts to Latin and preferably `.woff2` only.
5. Tune prefetch to explicit links.
6. Add sitemap `lastmod` and metadata/asset budget checks.
7. Re-run production Lighthouse on `/`, `/services/`, `/contact/`, `/sales/`, and one whitepaper.
8. Validate representative pages in Google Rich Results Test and Search Console.

## Performance Budget Targets

Suggested guardrails for this repo:

| Budget | Target |
|---|---:|
| Home page JS transfer before third parties | under 45 KB |
| React runtime on static pages | avoid unless needed |
| Initial font transfer on home | under 70 KB |
| Total generated font files | under 20 |
| Home page LCP lab target | under 1.8s |
| Home page CLS lab target | under 0.05 |
| Route HTML size | under 45 KB for normal pages; justify exceptions |
| Global third-party scripts | 0 without explicit approval; Taskade is the approved exception |

## Sources Used

- Google Search Central: Core Web Vitals and Search: https://developers.google.com/search/docs/appearance/core-web-vitals
- Google Search Central: Page experience: https://developers.google.com/search/docs/appearance/page-experience
- Google Search Central: Sitemaps: https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
- Google Search Central: Canonical URLs: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Google Search Central: robots.txt limitations: https://developers.google.com/search/docs/crawling-indexing/robots/intro
- web.dev: INP: https://web.dev/articles/inp
- web.dev: Optimize LCP: https://web.dev/articles/optimize-lcp
