# markosh.com

Marketing site for **Markosh** — an intelligence lab for business execution (B2B sales-as-a-service, vetted technical talent, software builds, and AI strategy).

Built with **Astro 5** (static output), **React 19** islands, and **Tailwind CSS 3**. Deployed on **Cloudflare Pages**.

## Quick start

```sh
npm install
npm run dev        # dev server at localhost:4321
```

## Commands

| Command                      | Action                                                    |
| :--------------------------- | :-------------------------------------------------------- |
| `npm run build`              | Production build to `./dist/`                             |
| `npm run preview`            | Preview the production build locally                      |
| `npm run type-check`         | `astro check` + `tsc --noEmit`                            |
| `npm run check:seo`          | Encoding, SEO metadata, structured data, and perf budgets |
| `npm run audit:technical-seo`| Full pipeline: type-check → build → all SEO checks        |
| `npm run generate:og`        | Regenerate social image and favicon PNGs                  |

## Publishing content

Blog posts and case studies are git-based markdown — no CMS, no backend:

- `src/content/blog/*.md` — field-note articles
- `src/content/case-studies/*.md` — anonymized engagement summaries
- Schemas live in `src/content.config.ts`; publishing = commit + push (Cloudflare Pages rebuilds automatically)

Whitepapers are typed data in `src/lib/whitepapers.ts`; solution playbooks (`/solutions/<slug>/`) are typed data in `src/lib/solutions.ts`.

## Required reading

- [CLAUDE.md](CLAUDE.md) / [AGENTS.md](AGENTS.md) — coding standards and project conventions
- [Design.md](Design.md) — visual design system (monochrome ink, editorial typography)

Copy on sales pages carries compliance constraints (human-led outreach, no guarantee claims) — read the "LOCKED" section in Design.md before editing any copy.
