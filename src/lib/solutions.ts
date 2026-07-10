/**
 * Content for the solution pages at /solutions/<slug>/
 *
 * Solutions are capability-framed: the problem, how we run the engagement,
 * and its structural shape. Each links to a structural engagement walkthrough
 * (the /case-studies/ collection) — never invented client stories or outcome
 * numbers.
 */

export interface Solution {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  category: 'Software Development' | 'Applied Intelligence' | 'Sales Execution';
  name: string;
  headline: string;
  headlineAccent: string;
  intro: string;
  problem: string[];
  steps: { num: string; title: string; description: string }[];
  shape: { value: string; label: string }[];
  honestyNote: string;
  caseStudy: { title: string; description: string; href: string };
  related: { label: string; href: string };
}

export const solutions: Solution[] = [
  {
    slug: 'outbound-pipeline-pod',
    metaTitle: 'Outbound Pipeline Pod | Managed B2B Outbound | Markosh',
    metaDescription:
      'A managed outbound pod — trained sales rep, lead researcher, and CRM operator — building a disciplined, inspectable B2B outbound motion inside your CRM.',
    category: 'Sales Execution',
    name: 'Outbound Pipeline Pod',
    headline: 'Outbound pipeline,',
    headlineAccent: 'run as a system',
    intro:
      'A managed pod — one trained sales rep, one lead researcher, one CRM operator — that takes you from no outbound motion to a disciplined, inspectable one. Everything the pod produces lives in your CRM, not ours.',
    problem: [
      'Most B2B companies with a working product hit the same wall: inbound interest is real but capped, and the segment of the market that never searches goes completely unreached. Outbound is the obvious answer — and the founders end up doing it ad hoc, between other responsibilities, with no written ICP and a CRM nobody trusts.',
      'Hiring a full sales team is premature at this stage, and doing nothing keeps the ceiling in place. What is missing is not headcount — it is a system: research, targeting rules, outreach discipline, and reporting that someone is accountable for every week.',
    ],
    steps: [
      {
        num: '01',
        title: 'Research before outreach',
        description:
          'The first weeks are research, not sending. The researcher builds your account universe from our contact-intelligence base, the pod drafts ICP and messaging documents, and nothing goes out until you have approved the targeting, the talk tracks, and the suppression rules in writing.',
      },
      {
        num: '02',
        title: 'Human-led outreach, under guardrails',
        description:
          'Human-initiated calls inside prospect-local windows, DNC scrubbing on the required cycle, and no automation anywhere near a conversation. The rep sells; the researcher keeps the account list sharp; the CRM operator keeps the record honest.',
      },
      {
        num: '03',
        title: 'Everything lands in your CRM',
        description:
          'Account research, contact intelligence, activity logging, meeting notes, and the weekly reporting pack all live in your CRM from day one. If the engagement ended tomorrow, you keep the entire asset.',
      },
      {
        num: '04',
        title: 'Weekly calibration',
        description:
          'A weekly session reviews call QA and — more valuably — what the market said back: objections, timing signals, and the vocabulary prospects actually use. That intelligence feeds straight back into your own positioning.',
      },
    ],
    shape: [
      { value: '3 roles', label: 'sales rep, lead researcher, CRM operator' },
      { value: '1 ICP', label: 'per pod, by design — depth over spread' },
      { value: 'weekly', label: 'QA review and reporting cadence' },
      { value: '3 models', label: 'retained rep, appointment setting, or revenue share' },
    ],
    honestyNote:
      'We do not guarantee appointments or revenue. We commit to research quality, outreach discipline, CRM visibility, and honest weekly reporting — and for approved B2B companies, a 14-day rep trial exists so you can judge the work before committing to any model.',
    caseStudy: {
      title: 'Standing Up an Outbound Revenue Pod for a B2B SaaS Team',
      description:
        'How a managed pod takes a SaaS company from no outbound motion to a disciplined, inspectable one — a structural walkthrough, no client stories or numbers.',
      href: '/case-studies/outbound-revenue-pod-b2b-saas/',
    },
    related: { label: 'Sales-as-a-Service — the three commercial models', href: '/sales/' },
  },
  {
    slug: 'workflow-automation',
    metaTitle: 'AI Workflow Automation | One Process, End to End | Markosh',
    metaDescription:
      'We replace one slow manual process with an LLM-powered automation layer — API-first, human review built in, deployed on infrastructure you own.',
    category: 'Applied Intelligence',
    name: 'Workflow Automation Layer',
    headline: 'One workflow, automated',
    headlineAccent: 'end to end',
    intro:
      'We take a single manual process — documents read, data re-keyed, exceptions flagged by email — and replace it with an automation layer that has a model in the middle and your people in the loop. Built API-first, on infrastructure you own.',
    problem: [
      'Most companies still run at least one critical process the manual way: a person reading incoming documents, extracting what matters, re-keying it into other systems, and flagging exceptions by email. The process works — which is exactly why it never gets fixed — but it consumes skilled staff hours daily and scales linearly with volume.',
      'The usual failure mode is the opposite extreme: a broad "AI transformation" initiative that explores everything and ships nothing. We apply a one-workflow rule instead — scope a single process end to end, prove it, and only then look at the next one.',
    ],
    steps: [
      {
        num: '01',
        title: 'Map the real workflow',
        description:
          'Discovery maps the process as it actually runs — including the undocumented judgment calls your team makes without noticing — before any architecture is drawn. Those judgment calls are where automation projects quietly fail.',
      },
      {
        num: '02',
        title: 'A model in the middle, people in the loop',
        description:
          'Document intake, LLM-based extraction with confidence thresholds, validation against your systems of record, and a human review queue for anything below threshold. Low-confidence cases route to people by design — the goal is redirected hours, not a headless process.',
      },
      {
        num: '03',
        title: 'Tune on your corrections',
        description:
          'The people who ran the manual process review and correct outputs from the first week. That builds trust with the team the system affects most — and produces the evaluation data the system is tuned against.',
      },
      {
        num: '04',
        title: 'Hand over the keys',
        description:
          'Every capability is exposed as an API endpoint so your own team can extend it. Deployed in your cloud accounts under your access controls, with source, documentation, prompts, and evaluation datasets handed over. Nothing requires Markosh to operate it.',
      },
    ],
    shape: [
      { value: '1 workflow', label: 'scoped end to end — no broad AI exploration' },
      { value: 'API-first', label: 'every capability is an endpoint your team can extend' },
      { value: 'owned', label: 'your cloud, your access controls, your IP' },
      { value: 'human', label: 'escalation path for low-confidence cases, by design' },
    ],
    honestyNote:
      'An evaluation suite is defined before we build and reported against honestly throughout. If the workflow is a poor fit for automation, the use-case audit says so — that is the point of doing it first.',
    caseStudy: {
      title: 'Replacing a Manual Process with a Workflow Automation Layer',
      description:
        'LLM, data, and integration work focused on one slow manual business process — a structural walkthrough, no client stories or numbers.',
      href: '/case-studies/workflow-automation-layer/',
    },
    related: { label: 'AI Development — the full service', href: '/services/ai-development/' },
  },
  {
    slug: 'embedded-delivery-pod',
    metaTitle: 'Embedded Engineering Pod | Clear Your Backlog | Markosh',
    metaDescription:
      'A pod of vetted engineers embedded in your sprint board, repos, and review standards — clearing backlog without pausing the roadmap. Full IP from the first commit.',
    category: 'Software Development',
    name: 'Embedded Delivery Pod',
    headline: 'Extra engineering capacity,',
    headlineAccent: 'inside your process',
    intro:
      'A small pod of vetted engineers embedded directly into your workflow — your sprint board, your repositories, your review standards — clearing the backlog your team cannot reach without pausing the roadmap.',
    problem: [
      'Scale-up engineering teams end up fully consumed by roadmap work while a backlog of integrations, refactors, and long-promised features ages in the tracker. The classic responses both fail: hiring takes quarters, and handing the backlog to an outside agency usually means onboarding overhead that eats the very capacity it adds.',
      'The missing option is capacity that joins your process instead of running its own: no parallel tooling, no vendor portal, no separate definition of done.',
    ],
    steps: [
      {
        num: '01',
        title: 'Scope before staffing',
        description:
          'Before anyone is allocated, we write down which backlog areas the pod owns, what "done" means for each, and where the boundary with your core team’s roadmap work sits. That document — not a rate card — is what the engagement is priced against.',
      },
      {
        num: '02',
        title: 'Vetted, then embedded',
        description:
          'Every engineer is screened by a working engineer through our technical vetting funnel before they ever reach a client. They join your repositories, your standups, and your review standards — not a parallel process.',
      },
      {
        num: '03',
        title: 'Weekly working demos',
        description:
          'Running software shown every week, not status decks. You see the same sprint board we do at all times, and one accountable delivery lead on our side means escalation is a conversation, not a ticket.',
      },
      {
        num: '04',
        title: 'Handover as the default state',
        description:
          'Source, documentation, infrastructure configuration, and IP are yours from the first commit. Handover is not a project phase at the end — which is what makes it safe to scale the pod down as the backlog burns down.',
      },
    ],
    shape: [
      { value: '4–6', label: 'engineers in a typical pod' },
      { value: '2 wks', label: 'kickoff target from first call' },
      { value: 'weekly', label: 'working demos, shared sprint board' },
      { value: 'full IP', label: 'yours from the first commit' },
    ],
    honestyNote:
      'A pod is not a body shop. If the scope document shows the work fits better as a single staffed engineer or a fixed-bid project, we recommend that instead — the scoping call is where we tell you.',
    caseStudy: {
      title: 'Clearing a Product Backlog Without Pausing the Roadmap',
      description:
        'An embedded engineering pod for teams whose backlog has outgrown their headcount — a structural walkthrough, no client stories or numbers.',
      href: '/case-studies/backlog-acceleration-embedded-pod/',
    },
    related: { label: 'IT Staffing — single-engineer placements', href: '/services/it-staffing/' },
  },
];
