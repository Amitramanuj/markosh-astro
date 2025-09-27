export type Whitepaper = {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  content: string;
};

export const whitepapers: Whitepaper[] = [
  {
    slug: 'llms-have-hit-walls',
    title:
      'LLMs Have Hit Walls: Why Coding Productivity Now Depends More on Tools, Systems, and Process than on SOTA Model Bumps',
    subtitle:
      'Tool-centric, repo-aware coding systems now drive bigger gains than incremental model upgrades.',
    summary:
      'After the breakout jumps of 2023 and early 2024, general-purpose LLMs deliver incremental returns on real software work. This paper explains the plateau, outlines a closed-loop system design, and provides KPIs, evaluation methods, and an adoption roadmap.',
    content: `
<section>
  <h2>Executive Summary</h2>
  <ul>
    <li><strong>Signal:</strong> Post-2024 model releases bring smaller step-ups on realistic development tasks while evaluations overfit short, single-file prompts.</li>
    <li><strong>Implication:</strong> Teams that chase state-of-the-art models see diminishing returns compared to teams investing in tooling, context, and workflow design.</li>
    <li><strong>Prescription:</strong> Treat code AI as a closed loop: repo-level retrieval and planning, tool-assisted generation, execution and tests, static and dynamic checks, human review, telemetry, and continual evaluation.</li>
    <li><strong>Outcome:</strong> Achieve 20–40% cycle-time reductions and quality gains without swapping models by combining IDE integration, test scaffolds, spec-first prompts, and CI guardrails.</li>
  </ul>
</section>
<section>
  <h2>1. The Plateau: Why Better Base Models Are Not Moving Business Metrics</h2>
  <h3>1.1 Diminishing Accuracy Deltas</h3>
  <ul>
    <li>Pass@k gains on narrow benchmarks do not translate to fewer rollbacks or rework on multi-file changes.</li>
    <li>Longer context windows help, but intelligent selection, chunking, and symbol resolution matter more than raw token counts.</li>
  </ul>
  <h3>1.2 Real-World Blockers</h3>
  <ul>
    <li>Complex, polyglot, or legacy-heavy repositories with partial test suites.</li>
    <li>Ambiguous tickets that omit acceptance criteria.</li>
    <li>Tooling friction such as fragmented runners and flaky tests that hide regressions.</li>
    <li>Compliance, security, maintainability, and provenance constraints that slow delivery.</li>
  </ul>
  <h3>1.3 Economic Lens</h3>
  <ul>
    <li>Model upgrades impose migration and re-prompting costs.</li>
    <li>Prompting “muscle memory” breaks and requires retraining.</li>
    <li>Lead time and change failure rates rarely improve without surrounding system upgrades.</li>
  </ul>
</section>
<section>
  <h2>2. Tool-Centric, Repo-Aware Coding Systems</h2>
  <h3>2.1 Principles</h3>
  <ul>
    <li>Plan before generating by translating issues into specifications and file-level plans.</li>
    <li>Prefer deterministic tool calls for search, build, test, and lint over free-form reasoning.</li>
    <li>Run short feedback loops with frequent tests, diff surfacing, and rapid iteration.</li>
    <li>Enforce guardrails for style, licensing, security, secrets, and provenance.</li>
    <li>Keep humans in the loop with structured reviews, auto-generated rationales, and patch notes.</li>
  </ul>
  <h3>2.2 High-Leverage Tools</h3>
  <ul>
    <li>IDE integrations with LSP features, inline edits, refactors, and quick fixes.</li>
    <li>Symbolic and semantic code search powered by ctags, tree-sitter, or LSIF.</li>
    <li>Specification and test harnesses that generate and repair tests against coverage targets.</li>
    <li>Static analysis spanning type checking, SAST, and license scanning.</li>
    <li>Sandboxed execution for fast build, run, and validation cycles.</li>
    <li>Telemetry for edit distance, review cycles, and revert rates.</li>
  </ul>
</section>
<section>
  <h2>3. Reference Architecture: Closed-Loop Coding Assistant</h2>
  <ul>
    <li><strong>Ingress and Intent:</strong> Capture tickets, failing tests, or briefs and output structured task plans.</li>
    <li><strong>Context Fabric:</strong> Combine symbol graphs, embeddings, dependency maps, prior PRs, and policy rules.</li>
    <li><strong>Reasoning and Generation:</strong> Use planner and worker loops that favour tools, scaffolds, and TODO-first workflows.</li>
    <li><strong>Execution and Validation:</strong> Automate unit and integration tests, linting, SAST, and artifact capture.</li>
    <li><strong>Review and Governance:</strong> Generate PR descriptions, risk tags, and enforce approvals before merge.</li>
    <li><strong>Observability and Evals:</strong> Track time to green, review cycles, revert rates, and post-merge health—and feed insights back into context and intent layers.</li>
  </ul>
  <p class="text-sm text-muted-foreground">Design hint: visualize these six layers in a swimlane diagram with feedback from observability into context and intent.</p>
</section>
<section>
  <h2>4. KPIs That Matter</h2>
  <ul>
    <li>Lead time for changes.</li>
    <li>Time to green from first commit to passing checks.</li>
    <li>Review iterations per PR.</li>
    <li>Revert rate or post-merge incidents within 30 days.</li>
    <li>Test coverage delta and mutation score.</li>
    <li>Edit distance versus human final output.</li>
    <li>Spec adherence via automated acceptance tests.</li>
  </ul>
</section>
<section>
  <h2>5. Evaluation Methodology</h2>
  <h3>5.1 Build an Internal Corpus</h3>
  <ul>
    <li>Curate 100–300 historical tickets or pull requests with tests and specifications.</li>
    <li>Include multi-file refactors, configuration changes, and flaky tests to mirror reality.</li>
  </ul>
  <h3>5.2 Run A/B Experiments</h3>
  <ul>
    <li>Compare human-only baselines to tool-centric assistants using the same base model.</li>
    <li>Hold out a slice of tasks for regression testing over time.</li>
  </ul>
  <h3>5.3 Scorecards</h3>
  <ul>
    <li>Track task success, human effort minutes, and first-pass quality gates.</li>
    <li>Monitor security and style violations before and after deployment.</li>
    <li>Review longitudinal defect density in touched files.</li>
  </ul>
</section>
<section>
  <h2>6. Adoption Roadmap (12 Weeks)</h2>
  <ul>
    <li><strong>Weeks 1–2:</strong> Instrument repositories, standardize lint and tests, and capture baseline metrics.</li>
    <li><strong>Weeks 3–6:</strong> Pilot planner loops, code search, and test runners for one team with PR templates and auto-generated specs.</li>
    <li><strong>Weeks 7–10:</strong> Scale guardrails with static analysis, secrets scanning, and mutation testing.</li>
    <li><strong>Weeks 11–12:</strong> Harden telemetry, evaluator prompts, and fail-safes on diff size and module risk.</li>
  </ul>
</section>
<section>
  <h2>7. Risk and Governance</h2>
  <ul>
    <li>Mitigate hallucinated imports with compile and type checks in the loop.</li>
    <li>Prevent license contamination through scanners and policy enforcement.</li>
    <li>Protect secrets via pre-commit hooks, CI scanners, and log redaction.</li>
    <li>Reduce security regressions with SAST, DAST, and mandatory threat notes.</li>
    <li>Handle knowledge drift through periodic re-indexing and context eviction.</li>
  </ul>
</section>
<section>
  <h2>8. Business Case</h2>
  <p>Investing in systems and tools rather than perpetual model swaps delivers durable productivity and quality gains, reduces cognitive load for engineers, and satisfies governance requirements—all without waiting for the next breakthrough model.</p>
</section>
`,
  },
  {
    slug: 'from-sota-to-systems',
    title: 'From SOTA to Systems: Designing Production-Grade AI Coding Assistants (2025 Playbook)',
    subtitle:
      'Blueprint for building, operating, and governing enterprise-grade coding assistants with deterministic tooling.',
    summary:
      'This playbook provides an actionable blueprint for planner–executor assistants, repo-graph context, guardrails, human factors, and ROI measurement so teams can move from ad-hoc prompting to repeatable, auditable capabilities.',
    content: `
<section>
  <h2>Executive Summary</h2>
  <ul>
    <li><strong>Thesis:</strong> System design wins—planner and worker loops, deterministic tool usage, strong context, and rigorous validation.</li>
    <li><strong>What’s New:</strong> Repo-graph retrieval, mutation testing, risk-aware routing, and policy engines for tool access, cost, and diff size.</li>
    <li><strong>Outcome:</strong> Faster delivery, fewer regressions, safer merges, and measurable ROI.</li>
  </ul>
</section>
<section>
  <h2>1. Capability Model</h2>
  <p>Map capabilities to risk tiers and controls across four levels:</p>
  <ol>
    <li><strong>Assist:</strong> Inline suggestions, documentation lookup, and quick fixes.</li>
    <li><strong>Augment:</strong> Test generation, small refactors, and diagnostic scripts.</li>
    <li><strong>Automate:</strong> Dependency bumps, configuration fixes, and flaky test quarantine behind gates.</li>
    <li><strong>Autonomy (limited):</strong> Chore pull requests on low-risk code paths with rollback plans.</li>
  </ol>
</section>
<section>
  <h2>2. System Patterns</h2>
  <h3>2.1 Planner–Executor with Tools</h3>
  <ul>
    <li>Planner converts tickets into sub-tasks and selects tools.</li>
    <li>Executor performs granular edits, runs tests, and applies validations.</li>
    <li>Prefer tool calls for search, build, test, and lint over free-form text reasoning.</li>
  </ul>
  <h3>2.2 Context Layer (“Repo Brain”)</h3>
  <ul>
    <li>Build symbol graphs with functions, types, and call edges.</li>
    <li>Retrieve by dependency impact and edit locality, not just cosine similarity.</li>
    <li>Cache style guides, canonical snippets, and prior successful pull requests.</li>
  </ul>
  <h3>2.3 Validation First</h3>
  <ul>
    <li>Enforce compile, type, and lint checks before diff proposals ship.</li>
    <li>Run unit, integration, and mutation tests; follow with SAST and license scans.</li>
    <li>Fail fast and surface minimal diffs with rationales and evidence.</li>
  </ul>
  <h3>2.4 Human Review Experience</h3>
  <ul>
    <li>Generate PR descriptions explaining what changed, why, alternatives considered, and associated risks.</li>
    <li>Attach test evidence, performance deltas, and reviewer routing metadata.</li>
  </ul>
</section>
<section>
  <h2>3. Governance and Risk Controls</h2>
  <ul>
    <li>Establish a policy engine with tool allowlists, network and filesystem sandboxing, and cost guardrails.</li>
    <li>Tier risk based on module criticality and blast radius; apply stronger controls on critical code paths.</li>
    <li>Log prompts, contexts, tool calls, diffs, and artifacts for audits and provenance.</li>
    <li>Protect security posture with secrets quarantine, signed commits, and SBOM updates for dependency changes.</li>
  </ul>
</section>
<section>
  <h2>4. Architecture Blueprint</h2>
  <p>Core components for production-grade assistants:</p>
  <ul>
    <li>Gateway for authentication, authorization, and rate or cost limits.</li>
    <li>Task orchestrator to manage planner graphs, retries, and timeouts.</li>
    <li>Context services covering symbol graphs, embeddings, documentation, and prior pull requests.</li>
    <li>Tooling microservices for search, build, test, lint, SAST, license, secrets, formatting, and code modifications.</li>
    <li>Execution sandbox with per-task containers and ephemeral credentials.</li>
    <li>Model abstraction layer to swap models without changing workflows.</li>
    <li>Telemetry and evaluation pipelines for metrics, traces, and dashboards.</li>
  </ul>
  <p class="text-sm text-muted-foreground">Design tip: capture these elements in a C4-style diagram when publishing the white paper.</p>
</section>
<section>
  <h2>5. Implementation Guide (90 Days)</h2>
  <ul>
    <li><strong>Phase 1 (Weeks 1–4):</strong> Normalize build, test, and lint across repositories; ship IDE plugins with code search; stand up symbol graphs and embeddings pipelines.</li>
    <li><strong>Phase 2 (Weeks 5–8):</strong> Launch planner/executor loops, enable deterministic tool calls, add policy engines, and begin KPI tracking with an internal evaluation suite.</li>
    <li><strong>Phase 3 (Weeks 9–13):</strong> Add SAST, license, secrets, and mutation testing gates; generate PR rationales with risk routing; scale to more teams and publish a playbook.</li>
  </ul>
</section>
<section>
  <h2>6. Human Factors</h2>
  <ul>
    <li>Adopt prompt templates tied to ticket systems that capture problems, constraints, and acceptance criteria.</li>
    <li>Design reviews to show diffs and passing tests first while keeping AI prose concise.</li>
    <li>Train teams on workflows and systems instead of prompt “tricks”; embed champions to reinforce best practices.</li>
  </ul>
</section>
<section>
  <h2>7. Measuring ROI</h2>
  <p>Track lead time, time to green, review cycles, revert rate, defect density, coverage delta, mutation score, engineer NPS, and on-call incidents. Translate improvements into dollars: engineer cost per hour × time saved + incidents avoided - enablement and compute spend.</p>
</section>
<section>
  <h2>8. Buy vs. Build</h2>
  <ul>
    <li><strong>Buy:</strong> When you need speed, multi-IDE support, or hosted policy/evaluation.</li>
    <li><strong>Build:</strong> When platform teams require deep policy control, air-gapped deployments, or language specialization.</li>
    <li><strong>Hybrid:</strong> Pair vendor IDE experiences with in-house server-side policy and context services.</li>
  </ul>
</section>
<section>
  <h2>9. Checklist</h2>
  <ul>
    <li>Standardized build/test/lint.</li>
    <li>Symbol graphs and embeddings with freshness policy.</li>
    <li>Planner/executor with tool allowlists and budgets.</li>
    <li>Test-first workflows and mutation testing.</li>
    <li>SAST, license, secrets, and style gates.</li>
    <li>PR rationales with risk routing.</li>
    <li>Telemetry dashboards with monthly KPI reviews.</li>
  </ul>
</section>
<section>
  <h2>10. Conclusion</h2>
  <p>System-focused investments in context, deterministic tooling, validation, and human-centered review outperform narrow model upgrades and position teams for sustainable productivity gains.</p>
</section>
`,
  },
  {
    slug: 'ai-coding-isnt-economically-sustainable',
    title:
      "AI Coding Isn't (Yet) Economically Sustainable: Why Usage Caps, Token Prices, and Compute Economics Still Favor Low-Cost Outsourcing",
    subtitle:
      'Token pricing, usage caps, and governance overhead keep AI-only development from beating offshore economics in 2025.',
    summary:
      'Aggressive discounts and popular assistants created early optimism, but rate limits, per-token costs, and validation overhead make fully autonomous AI coding less economical than low-cost outsourcing. This paper analyzes market signals, unit economics, ROI-positive scopes, and conditions for change.',
    content: `
<section>
  <h2>1. Market Signals: Why “Cheap AI Coding” Hit Friction in 2025</h2>
  <ul>
    <li>Usage caps on flagship assistants constrain sustained throughput even for paid tiers.</li>
    <li>Token-metered pricing keeps complex coding sessions expensive despite subscription bundles.</li>
    <li>Flat-priced IDE assistants still fall back to API-level token billing for large or agentic work.</li>
    <li>Compute costs for large-model inference remain meaningful and flow directly into token pricing.</li>
  </ul>
  <p><strong>Takeaway:</strong> Tooling is better and models are stronger, but governance, caps, and pricing continue to limit autonomous adoption.</p>
</section>
<section>
  <h2>2. Unit Economics: AI Coding vs. Low-Cost Outsourcing</h2>
  <h3>2.1 Outsourcing Baseline</h3>
  <p>Mid-level offshore developers average roughly $28 per hour all-in, delivering predictable capacity for sustained development efforts.</p>
  <h3>2.2 Cost of a Serious AI Coding Stack</h3>
  <ul>
    <li>Premium assistant subscriptions ranging from $20 to $200+ per user per month.</li>
    <li>High token consumption for planning, retrieval, generation, tool calls, and retries on complex repositories.</li>
    <li>Execution and validation spend on sandboxes, CI minutes, SAST, license, and secrets scans.</li>
    <li>Inference floor costs keep effective per-million-token pricing significant even with cheaper GPUs.</li>
  </ul>
  <p><strong>Result:</strong> Sustained, multi-file development often exceeds offshore seat costs unless scope is tightly bounded.</p>
</section>
<section>
  <h2>3. Why Performance Feels Down Despite Benchmark Gains</h2>
  <ul>
    <li>Guardrails and throttling force more tool round-trips and shorter completions, reducing perceived throughput.</li>
    <li>Enterprise repositories involve cross-cutting changes, flaky tests, configuration drift, and policy gates where latency and token churn dominate the experience.</li>
  </ul>
</section>
<section>
  <h2>4. What Must Change for AI Coding to Beat Low-Cost Outsourcing</h2>
  <p>AI automation becomes the dominant choice when at least one shift occurs:</p>
  <ul>
    <li>Tenfold cheaper tokens at current capability levels.</li>
    <li>Three- to five-fold higher task throughput with fewer retries.</li>
    <li>Vendor plans with high caps or pooled quotas that keep effective hourly costs under $25–$30 including validation.</li>
    <li>Hybrid pricing that charges per accepted diff instead of raw token consumption.</li>
  </ul>
  <p>Recent price cuts on cached inputs help spec-first workflows, but output tokens remain the main lever.</p>
</section>
<section>
  <h2>5. ROI-Positive Use Cases Today</h2>
  <ul>
    <li>Chore pull requests: dependency bumps, formatting, dead code removal, configuration fixes behind guardrails.</li>
    <li>Test augmentation: generating missing tests, repairing flaky suites, supporting mutation testing.</li>
    <li>Documentation and scaffolding: READMEs, migration guides, and boilerplates.</li>
    <li>Diagnostics: triaging failing builds and proposing minimal patches.</li>
  </ul>
</section>
<section>
  <h2>6. Procurement Playbook</h2>
  <ul>
    <li>Prioritize providers that deliver planner/executor loops, repo-graph retrieval, and CI-grade validation.</li>
    <li>Negotiate cost predictability with pooled quotas, hard budgets, and real-time alerts.</li>
    <li>Benchmark against historical tickets with full CI gates; track time to green, review iterations, revert rate, and token spend.</li>
    <li>Design for price-efficient context using symbol graphs, targeted retrieval, and caching strategies.</li>
    <li>Enforce guardrails for diff size, approvals, and provenance logging from day one.</li>
  </ul>
</section>
<section>
  <h2>7. 90-Day Implementation Plan</h2>
  <ul>
    <li><strong>Phase 1 (Weeks 1–3):</strong> Baseline builds, enforce SAST/license/secrets scanning, and set budget caps and alerts.</li>
    <li><strong>Phase 2 (Weeks 4–8):</strong> Roll out bounded automations on select repositories, enable repo-graph retrieval, and track KPIs plus token spend.</li>
    <li><strong>Phase 3 (Weeks 9–12):</strong> Scale cautiously, add PR rationales and risk-based reviewer routing, and pilot per-task vendor pricing.</li>
  </ul>
</section>
<section>
  <h2>8. Strategic Outlook: What Could Flip the Economics?</h2>
  <ul>
    <li>Cheaper, stronger models with sub-dollar input pricing or efficient distillations that maintain quality.</li>
    <li>System throughput wins from better planners, fewer retries, and smarter context management.</li>
    <li>Vendor packaging that prices on accepted work or lifts usage caps without runaway costs.</li>
    <li>Compute deflation via new hardware and kernels that drive marginal token costs toward cents.</li>
  </ul>
</section>
<section>
  <h2>9. Conclusion</h2>
  <p>Economics—not capability—limit AI-only coding in 2025. The highest ROI comes from hybrid strategies pairing affordable human talent with governed, bounded AI automations until pricing and performance cross new thresholds.</p>
</section>
`,
  },
];

export function getWhitepaperBySlug(slug: string) {
  return whitepapers.find((paper) => paper.slug === slug);
}
