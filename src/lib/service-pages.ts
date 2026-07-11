/**
 * Content for the SEO service landing pages at /services/<slug>/
 */

export interface ServicePage {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  intro: string;
  benefits: { title: string; description: string }[];
  process: { step: string; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  /** Forward link to the solution playbook or offer this service is proven by */
  related: { label: string; href: string };
}

export const servicePages: ServicePage[] = [
  {
    slug: 'it-staffing',
    metaTitle: 'IT Staffing Services | Vetted Senior Engineers',
    metaDescription:
      'Augment your team with pre-vetted senior engineers in under 2 weeks. Guaranteed time-zone overlap, NDA-first, flexible contracts. IT staffing by Markosh.',
    eyebrow: 'IT Staffing',
    headline: 'Hire vetted engineers,',
    headlineAccent: 'embedded in weeks',
    intro:
      'Skip months of recruiting. Markosh places senior developers, designers, and AI specialists directly into your team — matched to your stack, your culture, and your working hours.',
    benefits: [
      { title: 'Pre-vetted talent pool', description: 'Every engineer passes technical screening and a real-world project assessment before they ever meet a client.' },
      { title: 'Your time-zone overlap', description: 'Guaranteed 4+ hours of overlap with your working day, with standups and reviews in your hours.' },
      { title: 'Flexible engagement', description: 'Scale from one engineer to a full squad — contract, contract-to-hire, or dedicated team.' },
      { title: 'Two-week kickoff', description: 'From first call to a productive engineer in your repos in as little as two weeks.' },
    ],
    process: [
      { step: '01', title: 'Define the role', description: 'A 30-minute discovery call maps the skills, seniority, and team fit you need.' },
      { step: '02', title: 'Meet candidates', description: 'You interview 2-3 matched engineers within days — no résumé spam.' },
      { step: '03', title: 'Embed and ship', description: 'Your engineer joins your tools and standups. We stay accountable for the fit.' },
    ],
    faqs: [
      { question: 'How fast can an engineer start?', answer: 'Typically within two weeks of the first discovery call, including interviews and onboarding.' },
      { question: 'Do your engineers work our hours?', answer: 'Yes. Every placement guarantees at least 4 hours of overlap with your working day — US, UK, Europe, or Australia — with standups scheduled in your time zone.' },
      { question: 'What if the engineer is not a fit?', answer: 'We replace them at no additional placement cost. You only pay for productive time.' },
      { question: 'Who owns the work product?', answer: 'You do. Every contract assigns full IP ownership to the client, and we sign your NDA before discovery.' },
    ],
    related: { label: 'Embedded Delivery Pod — how a full pod runs inside your process', href: '/solutions/embedded-delivery-pod/' },
  },
  {
    slug: 'custom-software-development',
    metaTitle: 'Custom Software Development Services | Web & Mobile Apps',
    metaDescription:
      'Full-cycle custom software development: web apps, mobile apps, and cloud platforms. Fixed-bid or dedicated team. Built by Markosh.',
    eyebrow: 'Custom Software',
    headline: 'Software built for your roadmap,',
    headlineAccent: 'not a template',
    intro:
      'From concept to launch, we design, build, and maintain web and mobile applications — with an agile process you can see into, and architecture that scales past version one.',
    benefits: [
      { title: 'End-to-end delivery', description: 'Strategy, design, development, deployment, and maintenance under one accountable team.' },
      { title: 'Transparent process', description: 'Weekly demos, shared boards, and a roadmap you control. No black-box development.' },
      { title: 'Scalable architecture', description: 'Cloud-native builds on AWS, GCP, or Azure designed for growth and easy handover.' },
      { title: 'Your IP, your code', description: 'Full source code and infrastructure ownership transfers to you — documented and tested.' },
    ],
    process: [
      { step: '01', title: 'Scope and design', description: 'We turn your requirements into a concrete spec, designs, and a delivery plan with milestones.' },
      { step: '02', title: 'Build in sprints', description: 'Two-week sprints with demos at every step. You see working software early and often.' },
      { step: '03', title: 'Launch and support', description: 'We deploy to your infrastructure, document everything, and stay on for support if you want us.' },
    ],
    faqs: [
      { question: 'Do you work fixed-bid or time and materials?', answer: 'Both. Well-defined scopes work well as fixed-bid; evolving products usually fit a dedicated-team model better. We will recommend honestly.' },
      { question: 'What stacks do you build with?', answer: 'Primarily React/Next.js, Node.js, Python, and native iOS/Android, deployed on AWS, GCP, or Azure with Docker/Kubernetes.' },
      { question: 'Can you take over an existing codebase?', answer: 'Yes. We start with a paid technical audit so both sides know exactly what state the code is in before committing.' },
      { question: 'How do you handle security and compliance?', answer: 'Least-privilege access, client-owned infrastructure and secrets, and compliance-aligned practices (HIPAA, SOC 2 controls) when your industry requires them.' },
    ],
    related: { label: 'Your MVP, On Us — a basic MVP built at our investment', href: '/mvp-on-us/' },
  },
  {
    slug: 'ai-development',
    metaTitle: 'AI Development Services | LLM, ML & Agentic AI Solutions',
    metaDescription:
      'Custom AI development services: LLM integrations, machine learning models, and agentic AI systems that automate real workflows. By Markosh.',
    eyebrow: 'AI Development',
    headline: 'AI that automates real work,',
    headlineAccent: 'not just demos',
    intro:
      'We build production AI systems — LLM-powered features, custom ML models, and AI agents that reason and act — grounded in your data and integrated with your existing stack.',
    benefits: [
      { title: 'LLM integration', description: 'RAG pipelines, document processing, and AI features built on Claude, GPT, or open models — chosen for your use case, not hype.' },
      { title: 'Agentic AI systems', description: 'AI agents that plan and execute multi-step workflows alongside your team, with human oversight built in.' },
      { title: 'Custom ML models', description: 'NLP, computer vision, and predictive models trained on your data when off-the-shelf APIs are not enough.' },
      { title: 'Production-grade', description: 'Evaluation suites, cost controls, and monitoring — so the system keeps working after the demo.' },
    ],
    process: [
      { step: '01', title: 'Use-case audit', description: 'We identify where AI genuinely pays off in your workflow — and tell you where it does not.' },
      { step: '02', title: 'Prototype fast', description: 'A working proof of concept on your real data within weeks, with honest accuracy numbers.' },
      { step: '03', title: 'Harden and deploy', description: 'Evaluation, guardrails, cost optimization, and integration into your production stack.' },
    ],
    faqs: [
      { question: 'Which AI models do you work with?', answer: 'Claude, OpenAI GPT, and open-weight models (Llama, Mistral). We pick per use case based on accuracy, cost, and data-privacy requirements.' },
      { question: 'Can our data stay private?', answer: 'Yes. We can build on zero-retention API tiers, your own cloud accounts, or fully self-hosted open models depending on your requirements.' },
      { question: 'How do you measure whether the AI actually works?', answer: 'Every project ships with an evaluation suite measuring accuracy on your real data — defined before we build, reported honestly throughout.' },
      { question: 'What does an AI project typically cost?', answer: 'Proof-of-concept engagements typically start at a few weeks of a small team. We scope a fixed-price PoC first so you can validate before committing further.' },
    ],
    related: { label: 'Workflow Automation Layer — one process automated end to end', href: '/solutions/workflow-automation/' },
  },
];
