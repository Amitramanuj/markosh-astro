export interface WhitepaperSectionPoint {
  label?: string;
  text: string;
}

export interface WhitepaperSection {
  title: string;
  intro?: string;
  paragraphs?: string[];
  bullets?: WhitepaperSectionPoint[];
  takeaway?: string;
}

export interface Whitepaper {
  slug: string;
  category: string;
  title: string;
  heroSubtitle: string;
  heroSummary: string;
  readTimeMinutes: number;
  published: string;
  updated?: string;
  summary: string;
  sections: WhitepaperSection[];
  highlights: string[];
  recommendedActions: string[];
}

export const whitepapers: Whitepaper[] = [
  {
    slug: 'ai-coding-isnt-economically-sustainable',
    category: 'AI Strategy',
    title:
      "AI Coding Isn't (Yet) Economically Sustainable: Why Usage Caps, Token Prices, and Compute Economics Still Favor Low-Cost Outsourcing",
    heroSubtitle: 'Pricing friction, governance controls, and validation costs still keep autonomous coding on the sidelines for large organizations.',
    heroSummary:
      'Market enthusiasm pushed teams to experiment with fully agentic development. Yet in 2025, token pricing, platform caps, and validation overhead continue to make blended human-led delivery the economic default.',
    readTimeMinutes: 8,
    published: '2025-03-19',
    updated: '2025-08-04',
    summary:
      'A grounded look at the economic realities slowing down fully autonomous coding programs and what must change before they outcompete blended delivery teams.',
    sections: [
      {
        title: 'Market Signals: Why “Cheap AI Coding” Hit Friction in 2025',
        intro:
          'Across enterprise pilots and scaled initiatives, the same set of constraints repeatedly capped the ROI of autonomous development.',
        bullets: [
          {
            text: 'Usage caps on flagship assistants throttled sustained throughput even for paid enterprise tiers.'
          },
          {
            text: 'Token-metered pricing kept complex coding sessions expensive despite “unlimited” or bundled seats.'
          },
          {
            text: 'Flat-priced IDE assistants reverted to API-level billing whenever teams attempted multi-agent or large refactor work.'
          },
          {
            text: 'Inference costs for cutting-edge models remained material and flowed directly into token prices and minimum monthly commits.'
          }
        ],
        takeaway:
          'Tooling is dramatically better and models are stronger, but pricing, policy caps, and governance guardrails are still tuned to prevent runaway usage. That keeps autonomous adoption limited to narrow, high-confidence scopes.'
      },
      {
        title: 'Unit Economics Still Favor Human-Led Delivery',
        paragraphs: [
          'Teams that compared direct costs found that autonomy rarely replaced senior engineers outright. Instead, it shifted spend from labor to platform fees—while still needing humans for supervision, validation, and remediation.',
          'The net effect: total cost of delivery declined modestly in best cases, but rarely beat well-run blended teams or nearshore partners on a sustained basis.'
        ],
        bullets: [
          { text: 'Every “autonomous” sprint required human validators to review architecture choices, security posture, and integration contracts.' },
          { text: 'Remediation post-handoff averaged 20–35% of project time when agents operated beyond tightly scripted scopes.' },
          { text: 'Discounted platform credits often masked high marginal costs once pilot allocations expired.' }
        ],
        takeaway:
          'Teams that treated autonomy as a direct substitute struggled. Those that redeployed senior engineers into reviewer or orchestrator roles achieved higher throughput without letting platform costs balloon.'
      },
      {
        title: 'Where Autonomous Coding Pays Off Today',
        paragraphs: [
          'The economics improve considerably when work is discrete, testable, and heavy on boilerplate generation. In these lanes, assistant output displaces repetitive developer hours while keeping validation tight.'
        ],
        bullets: [
          { text: 'API client scaffolding, SDK updates, and contract test generation with deterministic outputs.' },
          { text: 'Infrastructure-as-code baselines where policies and guardrails are codified ahead of time.' },
          { text: 'Legacy remediation sprints focused on dependency upgrades and static-analysis-driven fixes.' }
        ],
        takeaway:
          'Autonomy thrives when success criteria are objective and validation can be automated. The less subjective judgment required, the more likely agentic delivery produces attractive ROI.'
      },
      {
        title: 'What Would Flip the Economics',
        paragraphs: [
          'Four shifts would materially change the cost curve in favor of autonomous development.'
        ],
        bullets: [
          { text: 'Lower or flat-rate enterprise pricing that allows sustained multi-agent throughput without punitive overage fees.' },
          { text: 'Native integration of safety, compliance, and governance frameworks so validation time collapses.' },
          { text: 'Richer planning and repo-graph awareness to reduce handoff friction between agents and human reviewers.' },
          { text: 'Commodity access to capable, smaller-footprint models that can handle 80% of coding tasks at a fraction of current inference cost.' }
        ],
        takeaway:
          'Vendors that solve for predictable pricing and built-in assurance controls will unlock the next wave of adoption. Until then, mature teams will keep pairing assistants with disciplined engineering processes.'
      }
    ],
    highlights: [
      'Enterprise usage caps stayed in place to control runaway spend, limiting the scale of autonomous pilots.',
      'Token pricing and manual validation kept unit economics similar to blended human teams.',
      'Teams that positioned autonomy as force multiplication—not replacement—reported the best ROI.'
    ],
    recommendedActions: [
      'Budget for validation and remediation as a core line item when modeling autonomous delivery.',
      'Target repetitive, test-heavy workloads first to build reliable ROI cases.',
      'Negotiate platform pricing around sustained throughput instead of headline seat discounts.'
    ]
  },
  {
    slug: 'from-sota-to-systems',
    category: 'Engineering Operations',
    title: 'From SOTA to Systems: Designing Production-Grade AI Coding Assistants (2025 Playbook)',
    heroSubtitle: 'Winning teams moved beyond raw model quality and built deliberate systems around planning, guardrails, and human factors.',
    heroSummary:
      'The 2025 playbook focuses on orchestration, governance, and enablement. Teams that treat assistants as part of a larger socio-technical system see faster onboarding, safer deployments, and higher quality output.',
    readTimeMinutes: 10,
    published: '2025-04-07',
    updated: '2025-07-12',
    summary:
      'Practical frameworks for evolving from ad-hoc prompting to reliable, auditable assistant programs that scale across enterprise engineering teams.',
    sections: [
      {
        title: 'Blueprint the Assistant Lifecycle',
        intro:
          'Leading teams map the assistant lifecycle explicitly—covering planning, execution, review, and learning loops.',
        bullets: [
          { text: 'Planner–executor patterns keep context windows focused while preserving architectural intent.' },
          { text: 'Guardrail libraries sit between natural-language requests and critical systems, enforcing policy automatically.' },
          { text: 'Evaluation harnesses compare assistant output against regression suites, linters, and security scanners before merge.' }
        ],
        takeaway:
          'Treat the assistant like any other production service: give it observability, quality gates, and change-control discipline.'
      },
      {
        title: 'Invest in Human Factors and Enablement',
        paragraphs: [
          'Rollouts stall when teams ignore change management. Upskilling, guidance, and feedback channels are as important as model choice.'
        ],
        bullets: [
          { text: 'Role-specific playbooks translate assistant capabilities into day-to-day workflows for engineers, reviewers, and managers.' },
          { text: 'Communities of practice and office hours help capture edge cases quickly and feed them back into prompts or guardrails.' },
          { text: 'Instrumentation that surfaces assistant contribution to cycle time and defects keeps stakeholders invested.' }
        ],
        takeaway:
          'Empowered teams experiment safely, share repeatable patterns, and raise adoption rates without forcing compliance.'
      },
      {
        title: 'Operationalize Governance from Day One',
        paragraphs: [
          'Auditability has moved from “nice to have” to “table stakes.” Enterprises demand lineage from intent to merged code.'
        ],
        bullets: [
          { text: 'Signed or attributed commits trace assistant participation for compliance teams.' },
          { text: 'Automated policy gates (PII detection, dependency allow-lists, architectural constraints) run before code review.' },
          { text: 'Event logs support post-incident analysis and inform risk-based access controls.' }
        ],
        takeaway:
          'Governance is not a blocker when designed into the workflow. It accelerates trust and clears the path for broader assistant privileges.'
      },
      {
        title: 'Measure What Matters',
        paragraphs: [
          'Traditional delivery metrics do not capture assistant impact. Mature programs combine engineering signals with product outcomes.'
        ],
        bullets: [
          { text: 'Cycle-time deltas segmented by task type reveal where assistants add or subtract value.' },
          { text: 'Defect escape rates and post-release incidents highlight when guardrails need refinement.' },
          { text: 'Adoption heatmaps show which squads are ready for deeper automation and which need coaching.' }
        ],
        takeaway:
          'Quantifying assistant contribution keeps leadership support strong and guides the next wave of investment.'
      }
    ],
    highlights: [
      'Planner–executor patterns and guardrail middleware are becoming standard for enterprise assistants.',
      'Enablement and change management determine adoption velocity more than model benchmarks.',
      'Governance signals—attribution, logging, policy gates—build trust with security and compliance teams.'
    ],
    recommendedActions: [
      'Document an assistant lifecycle that covers intake, execution, validation, and learning.',
      'Stand up cross-functional enablement rituals to accelerate safe adoption.',
      'Instrument assistant activity so leadership can tie outcomes to investment.'
    ]
  },
  {
    slug: 'llms-have-hit-walls',
    category: 'Market Intelligence',
    title: 'LLMs Have Hit Walls: Why Productivity Gains Now Depend on Systems, Not Just Model Upgrades',
    heroSubtitle: 'Model quality still matters, but diminishing returns make orchestration, tooling, and process the primary levers in 2025.',
    heroSummary:
      'Teams that waited for the next benchmark leap lost momentum. The leaders paired capable—but not cutting-edge—models with systems thinking to unlock production-grade productivity gains.',
    readTimeMinutes: 9,
    published: '2025-05-18',
    summary:
      'A market scan of why successive model releases are delivering smaller gains and how organizations can keep velocity high through systems design.',
    sections: [
      {
        title: 'Benchmark Gains, Real-World Plateaus',
        intro:
          'Model accuracy keeps inching up on public leaderboards, but production workloads tell a flatter story.',
        bullets: [
          { text: 'Context fragmentation and tool-use orchestration, not raw reasoning, now dominate failure modes.' },
          { text: 'Special-purpose models tuned for code perform well but still require disciplined prompting and guardrails.' },
          { text: 'Latency and cost considerations push many teams toward mid-tier models where orchestration can matter more than baseline accuracy.' }
        ],
        takeaway:
          'Upgrading to the latest flagship model rarely fixes workflow gaps. Without systemic changes, teams hit the same friction with higher invoices.'
      },
      {
        title: 'Systems Thinking Is the New Differentiator',
        paragraphs: [
          'Organizations that paired assistants with structured collaboration rituals saw the steepest productivity gains.'
        ],
        bullets: [
          { text: 'Repo-graph context services keep assistants anchored to current architecture decisions and domain language.' },
          { text: 'Evaluation harnesses catch regressions before humans enter the loop, protecting reviewer bandwidth.' },
          { text: 'LLMOps pipelines monitor quality drift and allow targeted fine-tuning or prompt updates when performance slips.' }
        ],
        takeaway:
          'Treat model choice as one component of an engineered system. Instruments, guardrails, and feedback loops drive durable improvements.'
      },
      {
        title: 'Strategic Bets for the Next 12 Months',
        paragraphs: [
          'The winners will be intentional about where to invest scarce time and budget.'
        ],
        bullets: [
          { text: 'Consolidate assistant usage onto shared tooling to reduce duplicated experimentation.' },
          { text: 'Pilot retrieval-augmented systems that blend structured knowledge with model reasoning for domain-heavy tasks.' },
          { text: 'Bridge AI programs with product and operations metrics so stakeholders see direct business impact.' }
        ],
        takeaway:
          'Strategic focus beats waiting for the next breakthrough. The organizations building context-rich systems will capitalize fastest when new models arrive.'
      }
    ],
    highlights: [
      'Real-world productivity flattened even as benchmark scores climbed, highlighting orchestration gaps.',
      'Context services, evaluation harnesses, and LLMOps pipelines unlock more value than incremental model upgrades.',
      'Investment focus should shift toward shared tooling, retrieval systems, and business-aligned metrics.'
    ],
    recommendedActions: [
      'Audit where workflow friction—not model reasoning—creates delivery bottlenecks.',
      'Fund shared infrastructure that gives assistants reliable context and guardrails.',
      'Connect assistant metrics to business KPIs to keep executive sponsorship strong.'
    ]
  }
];

export function getWhitepaperBySlug(slug: string): Whitepaper | undefined {
  return whitepapers.find((paper) => paper.slug === slug);
}
