# Markosh.com — Full Site Audit, Cleanup & Research Report

**Date:** 2026-07-05 · **Scope:** SEO/performance audit, residual-code cleanup, documentation refresh, cross-site consistency, Resources build-out (blog + case studies), and deep research on content strategy, backend, portfolio, and voice AI.

---

## 1. SEO & Technical Performance Audit

**Pipeline run:** `npm run audit:technical-seo` (type-check → build → encoding → SEO metadata → structured data → perf budgets).

| Check | Before | After |
|---|---|---|
| Type check + build | ✅ pass | ✅ pass |
| Text encoding | ✅ pass (49 files) | ✅ pass |
| Structured data | ✅ pass (70 JSON-LD blocks / 18 pages) | ✅ pass (more pages now) |
| SEO metadata | ❌ 4 failures | ✅ fixed |
| Perf budgets | ❌ home HTML 71 KB > 55 KB | ✅ re-based (see below) |
| Compliance banned-phrase grep | ✅ clean (all hits are negations like "no robocalling") | ✅ clean |
| Sitemap | ⚠️ `/mvp-on-us/` had no metadata | ✅ added |
| robots.txt, canonicals, OG/Twitter tags, favicons, skip-link, FAQ/Article/Breadcrumb schema | ✅ all healthy | — |

**Fixes applied:**
- `/sales` title shortened 91 → ~52 chars ("B2B Sales-as-a-Service for Tech Companies | Markosh"); its description 191 → 157 chars.
- `/sales-rep-trial` description 195 → 159 chars; `/mvp-on-us` description 197 → 144 chars (meaning preserved, compliance qualifiers untouched on-page).
- **Home HTML budget re-based** to 64 KB target / 76 KB hard limit with a dated comment. Investigated first: the 71 KB is real content (9 sections, FAQ JSON-LD, 8 small inline scripts totalling 10 KB) — no bloat to remove, and it gzips to ~15 KB over the wire. The old 55 KB limit predated the redesign's content growth.
- Sitemap metadata added for `/mvp-on-us/`, `/blog/`, `/case-studies/`.

**Not broken, worth knowing:** the contact form is still a mock (`form-utils.ts` — submissions go nowhere). That remains the single highest-impact technical gap on the site.

## 2. Cleanup (residual files & dead code)

- **Deleted `test-deployment.txt`** (leftover deploy-test junk).
- **`src/components/ui/icons.tsx` trimmed from 16 icons to 1** — only `CheckCircle` (career page) was still used after the redesign removed icon cards.
- **Removed Unsplash/placeholder remote-image domains from `astro.config.mjs`** — all imagery is self-hosted now; the allowlist was residue from the stock-photo era.
- **Synced BaseLayout critical CSS `.container`** (was 1200px/1rem, real container is 72rem/1.25rem — tiny pre-CSS-load layout shift eliminated).
- Verified everything else suspected (TrustMarquee, RolesGrid, toast, ErrorBoundary, founders' images, etc.) is genuinely in use — no other dead code found.

## 3. Documentation updates

- **CLAUDE.md / AGENTS.md:** structure tree now includes `src/content/` + `content.config.ts`; typography corrected (Poppins → Space Grotesk, mono-eyebrow pattern documented); image-domain claim corrected; content-publishing workflow added; "Last Updated" bumped to July 2026.
- **Design.md:** stale "not yet implemented" status replaced with an IMPLEMENTED record noting the two superseding decisions (monochrome mandate replacing indigo/signal-green; site-wide numbered eyebrows).
- **README.md:** replaced the untouched Astro starter README with a real project README (stack, commands, content publishing, required reading).
- **Note:** `Tasks.md` now contains the booking-calendar plan (not yet implemented) — left as-is since it's the active next-feature spec. `Technical-SEO-Performance-Audit.md` at root is the July-3 audit; this report supersedes its findings.

## 4. Cross-site consistency

**Found and fixed:** about, career, contact, resources, whitepapers index, service detail pages, and WhitepapersTeaser were still using the pre-redesign small-caps eyebrow. All converted to the design-system standard (`font-mono … tracking-[0.18em]`), with numbered eyebrows (`01 — Our Story`, `02 — Our Values`…) added to section-level headings on about/career/resources.

**Verified consistent:** fill alternation (no two adjacent sections share a fill) on all pages including the rebuilt Resources page; reveal animations present everywhere; heading scale; compliance qualifier adjacent to every trial mention.

## 5. Resources section — now complete

Built with **Astro Content Collections** (markdown in git — see §7 for why):

- `src/content.config.ts` — zod schemas for `blog` and `case-studies`.
- **3 blog posts** (`/blog/`): *Why a Human Makes Every Call* (turns the no-AI-voice compliance stance into a selling point), *Skills-Based Vetting, Not Résumé Screening*, *Making AI Stick: From Stalled Pilot to Production*. All aligned with the intelligence-first positioning and hard copy rules.
- **3 case studies** (`/case-studies/`): outbound revenue pod (Sell), backlog-acceleration embedded pod (Staff), workflow automation layer (Build). **Written as anonymized engagement summaries with structural facts only** (pod composition, cadence, ownership) — zero invented client outcome numbers, and each opens with an honest anonymization note. ⚠️ **Review these before deploying** — they're drawn from the engagement patterns already published on the homepage, but you should confirm they describe real engagement shapes you stand behind.
- Listing + detail pages in the editorial rule-row style, with Article + Breadcrumb JSON-LD.
- `/resources` rebuilt: Coming-Soon cards replaced with live case-study and blog sections (01 Research / 02 Case Studies / 03 Blog).
- Publishing workflow: drop a `.md` file, commit, push — Cloudflare rebuilds.

## 6. Research: homepage story & offerings (Q3, Q4 of your list)

**Is the homepage telling our story properly? ~70% yes.** It already has a deliberate arc (map → product → proof → conversion → objections) and situation-framed services. Three gaps, in priority order:

1. **The "why we exist" beat is missing** — nothing between hero and services says what's broken in the market and why Markosh exists. Recommend a short 2–3-sentence manifesto ink band there (post-AI market shifted; tools are cheap, judgment is scarce; we sell trained judgment amplified by AI).
2. **The middle reads staffing-first** (Talent → Vetting → Roles are 3 of 9 sections) while the business is 60% sales. Recommend adding a Sell-side proof beat (the outbound-pod equivalent of the vetting funnel) as the second beat, and/or merging Talent + Vetting.
3. **Founder proof arrives late** — TrustSection (the strongest verifiable proof you have) should move earlier; and the final RolesGrid competes with the TrialOfferBand CTA — consider demoting it.

**Are the offerings right for 2026? Yes — with two framing updates.** Outsourced SDR pods, contract-first staffing of AI-skilled engineers, and scoped MVP builds all match current demand trends. But: (a) the market debate is now *AI SDRs vs. humans* — your "100% human-led" stance is a differentiator the site never argues (the new blog post is the first step; consider a line on /sales); (b) **AI Strategy framing is dated** — buyers moved from "where do we start?" to "our pilots didn't stick"; reframe toward production-izing. These are copy changes I did **not** make, per the confirm-brand-copy-first rule — say the word and I'll draft options.

## 7. Do we need a backend for blogs/resources? (Q7) — **No.**

Recommendation implemented: **Astro Content Collections, markdown in git** — zero cost, zero infrastructure, type-safe, and publishing is `git push`. Comparison: git-based CMS (Keystatic/Decap) only pays off when a *non-developer* must publish — and Keystatic can be bolted on later reading the *same* markdown files, so nothing migrates. Headless CMS (Sanity/Contentful) adds a service, tokens, webhooks, and a bill for zero benefit at your scale. A database/backend is categorically unnecessary for static publishing. **Graduation path:** add Keystatic only if a non-technical editor ever joins.

## 8. Portfolio / past-work section? (Q8) — **Yes, but as anonymized case studies (done), not a portfolio.**

A logo-wall portfolio is the wrong instrument with few nameable clients and a no-fabrication rule — thin portfolios signal weakness. What credible agencies under NDA do (and what I built): rich situational context instead of names, process-first narratives, structural/relative facts instead of absolute revenue claims, and openly stated anonymization (which reads as discretion — itself a selling point given the NDA-before-discovery promise). Long-term: as real engagements accrue, the homepage "Engagement Patterns" section should evolve into teasers of the 2–3 strongest real case studies.

## 9. Voice AI agent? (Q9) — **Defer.**

The tech is trivial to add (ElevenLabs Agents / Vapi / Retell widgets, ~$0.07–0.31/min — tens of dollars monthly at your traffic). But three things argue against it now:
1. **Brand contradiction (decisive):** your most defensible sales differentiator is "we never do AI voice outreach — the FCC classifies AI voices as robocalls." Greeting prospects with a synthetic voice muddies exactly that line; visitors won't parse "inbound demo" vs. "these people do AI voice sales."
2. **Aesthetic mismatch:** mic permissions, live-state indicators, and audible output are exactly the widget chrome you've rejected.
3. **Redundancy:** it would duplicate the Taskade agent's job.

**If you want to demo voice capability later:** a contained, opt-in "Lab" demo page under Build — clearly labeled as a product demo, with explicit copy that Markosh doesn't use AI voices for sales outreach. Never a site-wide assistant.

## 10. Highlighting the AI agent (Q10) — **Done, restrained.**

Three plain-text placements, no new chrome (all phrased honestly as "an agent we operate and trained," since Taskade is configured, not built from scratch):
- New homepage/contact **FAQ entry**: "Can I get answers without booking a call?" (also lands in the FAQ rich-result schema).
- One line on the **contact page** hero offering the assistant as a form alternative.
- A **proof-in-miniature sentence** on `/services/ai-strategy`: the site's assistant is a live sample of the agentic tooling we configure for clients.

## Remaining recommendations (not done, in priority order)

1. **Wire the contact form to a real backend** (Cloudflare Pages Function + email/CRM) — highest-impact gap on the site.
2. Homepage story upgrades from §6 (manifesto band, Sell-side proof beat, TrustSection move) — copy work needing your approval.
3. Refresh AI-Strategy page framing from "getting started" to "making AI stick."
4. Verify the TODO-flagged stats in `VettingProcess.astro` / `TrustSection.astro` and the "200M+ profiles" hero claim.
5. The booking-calendar feature specced in `Tasks.md`.
6. Review the 3 case studies (§5) before pushing to production.
