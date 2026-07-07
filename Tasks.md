# Markosh Site — Task Backlog

> Updated 2026-07-07. This replaces the native booking-calendar spec that previously
> lived here (see git history, commit `bf622e0` and earlier) — **superseded** by the
> decision to buy a business suite (Zoho or similar) that covers email, forms, and
> scheduling in one product.

## 1. Blocked on business decision — pick and buy the suite

The owner is evaluating suites (Zoho One or equivalent). One purchase resolves three
former build items at once:

- [ ] **Contact form backend** — form is currently a mock (`src/lib/form-utils.ts`,
      submissions go nowhere). Wire `ContactFormCore.tsx` to the suite's form/CRM
      endpoint once chosen. This is the highest-impact gap on the site.
- [ ] **Business email** — route `business@markosh.com` / `talent@markosh.com`
      through the suite.
- [ ] **Scheduling / book-a-call** — use the suite's booking product instead of the
      custom Google-Calendar build. Requirement that survives from the old spec:
      the booking UI must stay monochrome and brand-matched — if the suite's embed
      can't be styled acceptably, fall back to a styled link-out rather than an
      off-brand iframe.

## 2. Next conversation queue (approved, ready to execute)

- [ ] **Whitepapers library page** (`src/pages/whitepapers/index.astro`) — still uses
      glass cards; convert to the editorial rule-row style now used by
      WhitepapersTeaser and the Resources/blog/case-studies listings.
- [ ] **Copy work — 5 items.** Process rule: draft 2–3 options per item, owner picks;
      never publish directly. Compliance rules in Design.md §7 apply to all of them.
  - [ ] Homepage **manifesto band** — short "why we exist" beat between HeroSection
        and ServicesOverview (post-AI market shifted; tools cheap, judgment scarce;
        Markosh sells trained judgment amplified by AI). Ink band, 2–3 sentences.
  - [ ] Homepage **Sell-side proof beat** — the outbound-pod equivalent of the
        vetting funnel (ICP → research → human outreach → QA → CRM visibility), so
        the page middle stops reading staffing-first (business is 60% sales).
  - [ ] Homepage **section reorder** — move TrustSection (founders) earlier; demote
        RolesGrid so TrialOfferBand is the unambiguous closing CTA.
  - [ ] **/services/ai-strategy reframe** — from "you don't know where AI pays off"
        to "your pilots didn't stick — we production-ize" (2026 buyer reality).
  - [ ] **/sales human-led argument** — one short block on *why* no AI voice
        outreach (deliverability, FCC robocall classification, brand safety);
        link the existing blog post "Why a Human Makes Every Call".

## 3. Waiting on owner

- [ ] **Case-study review** — the 3 anonymized summaries in
      `src/content/case-studies/` were AI-drafted (structural facts only) and need
      owner sign-off; they are live-on-next-push.
- [ ] **Social profile URLs** — profiles are being created; when ready, re-add footer
      social links (Footer.astro TODO) and correct/confirm the `sameAs` URLs in
      `generateOrganizationStructuredData()` (`src/lib/seo-utils.ts`), which
      currently guess `linkedin.com/company/markosh` and `twitter.com/markosh`.

## 4. Small cleanups (fold into any session)

- [ ] Delete the two stale `TODO(content)` comments — owner confirmed 2026-07-07 that
      the vetting-funnel process (`VettingProcess.astro`) and the operational
      commitments (`TrustSection.astro`) reflect actual practice/SOP. Note: funnel
      claims are "we try to follow it" — keep percentages directionally framed if
      copy is ever revised.

## Resolved log (2026-07-05 → 07)

- Full SEO/perf audit green (26 pages); meta-length fixes; perf budget re-based.
- Dead code cleanup; docs refreshed (CLAUDE.md/AGENTS.md/Design.md/README).
- Eyebrow consistency site-wide; WhitepapersTeaser converted to editorial rows.
- Blog + case-studies content collections shipped; Resources page completed.
- AI agent surfaced in FAQ/contact/ai-strategy copy. Voice agent: **deferred**.
- 200M+ contact-base claim confirmed real; provenance stays vague (never name
  sources, never say "licensed"). Reps briefed by owner.
- No CMS/backend for content by decision — markdown + git.
