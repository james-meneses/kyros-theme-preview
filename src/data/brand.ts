/**
 * Centralized brand data extracted from:
 * - docs/brand/lp-copy-en.md (commit f7fe4df)
 * - docs/strategy/pricing-model.md
 * - docs/strategy/competitive-matrix.md
 * - docs/strategy/icp-profiles.md
 * - docs/brand/brand-guidelines.md
 */

// ── Hero Section ──────────────────────────────────────────

export const hero = {
  badge: "Design Partner Preview",
  headline: "Describe it Monday. Ship it Friday.",
  headlineAccent: "21 agents. One operator. Production code.",
  headlineAlt: "From brief to PR in minutes, not months.",
  headlineVariants: [
    { headline: "Describe it Monday. Ship it Friday.", accent: "21 agents. One operator. Zero hiring." },
    { headline: "One prompt to a production sprint.", accent: "Architect, backend, frontend, security, QA — governed." },
    { headline: "From spec to sprint in minutes.", accent: "Not another copilot. A full engineering team." },
  ],
  subheadline:
    "Kyros orchestrates 21 specialized agents across architecture, backend, frontend, security, and QA — with governance, memory, and structured review. Your first project is free.",
  primaryCta: "Apply for Early Access",
  secondaryCta: "See It Build",
} as const;

// ── Stats ─────────────────────────────────────────────────

export const stats = [
  { value: 21, suffix: "", label: "Specialized Agents", sublabel: "Architect to QA" },
  { value: 150, suffix: "K+", label: "Lines Shipped", sublabel: "Production TypeScript" },
  { value: 490, suffix: "+", label: "Reviewed Commits", sublabel: "Zero skipped reviews" },
  { value: 15, suffix: "", label: "Days, Zero to Prod", sublabel: "Self-bootstrapped" },
] as const;

// ── Problem Section ───────────────────────────────────────

export const problem = {
  headline: "Code generation is solved. Software delivery isn't.",
  headlineAlt: "AI can write code. It can't ship software. Yet.",
  headlineVariants: [
    "Every AI tool writes code. None of them ship software.",
    "Writing code was never the bottleneck.",
    "You don't have a coding problem. You have a delivery problem.",
  ],
  without: {
    title: "Single-agent reality",
    points: [
      "Prompt. Paste. Fix hallucinations. Re-prompt. Ship anyway.",
      "No architecture review. No test strategy. No one watching the codebase.",
      "Context resets every session — every conversation starts from zero.",
      "You're the QA team, the architect, and the project manager.",
    ],
  },
  with: {
    title: "Governed team execution",
    points: [
      "Architect reviews every PR before it merges.",
      "Backend and frontend build in parallel — like a real team.",
      "QA writes tests. Security audits. Memory persists across sprints.",
      "You describe the mission. 21 agents execute it.",
    ],
  },
} as const;

// ── How It Works ──────────────────────────────────────────

export const howItWorks = [
  {
    step: "01",
    title: "Connect your repo",
    description:
      "Kyros maps your codebase — structure, dependencies, patterns. Agents understand what exists before writing a line. Choose your team or use the default 21-agent configuration.",
  },
  {
    step: "02",
    title: "Describe the mission",
    description:
      "A feature. A migration. A full module. The Orchestrator decomposes it into tasks, assigns agents by specialty, and dispatches. You approve the plan or let it run autonomously.",
  },
  {
    step: "03",
    title: "Review and merge",
    description:
      "Agents build in parallel. Architect reviews every PR. QA tests. Security audits. You see everything in real-time. Merge when satisfied.",
  },
] as const;

// ── Agent Team ────────────────────────────────────────────

export const agents = [
  { name: "Akira", role: "Orchestrator", team: "Operations", description: "Decomposes missions into tasks, dispatches work, manages sprint cadence", color: "#22D3EE" },
  { name: "Zara", role: "Architect", team: "Operations", description: "Reviews every PR, enforces patterns, maintains system coherence", color: "#CCFF00" },
  { name: "Grace", role: "Backend Developer", team: "Backend", description: "Builds APIs, services, and data layers with Fastify, tRPC, and Drizzle", color: "#60A5FA" },
  { name: "Atlas", role: "Frontend Architect", team: "Frontend", description: "Designs component systems, implements UI architecture with Next.js", color: "#F472B6" },
  { name: "Nova", role: "AI/ML Engineer", team: "Intelligence", description: "Builds agent intelligence, prompt engineering, model integration", color: "#D946EF" },
  { name: "Sage", role: "Security Engineer", team: "Security", description: "Audits code, enforces auth patterns, manages secrets and access control", color: "#EF4444" },
  { name: "Echo", role: "QA Tester", team: "Quality", description: "Writes and runs tests, validates coverage, catches regressions", color: "#22C55E" },
  { name: "Lyra", role: "Frontend Developer", team: "Frontend", description: "Implements UI components, design system tokens, responsive layouts", color: "#A78BFA" },
] as const;

// ── Architecture / Stack ──────────────────────────────────

export const stackBadges = [
  "Next.js 16", "Fastify 5", "tRPC v11", "Postgres 18", "Redis 8",
  "BullMQ 5", "Apache AGE", "pgvector", "Drizzle ORM", "Turborepo",
] as const;

export const architectureCards = [
  {
    title: "Three-tier agent memory",
    description: "Task history. Active context. Learned patterns. Agents remember what they've built — across sessions, sprints, and projects.",
    metric: "Persistent Memory",
  },
  {
    title: "Codebase knowledge graph",
    description: "Relationships, dependencies, call chains — mapped. Agents understand structure, not just syntax.",
    metric: "Structural Intelligence",
  },
  {
    title: "Any model. Your choice.",
    description: "Claude, GPT, Gemini, open-source. The model is a configuration choice, not a constraint.",
    metric: "Model Agnostic",
  },
] as const;

// ── Personas / Use Cases ──────────────────────────────────

export const personas = [
  {
    title: "Solo Founder",
    headline: "You're technical. You're one person. You need a team.",
    description:
      "Stop context-switching between frontend, backend, infra, and testing. Dispatch a sprint, review the output, merge. Ship like a team of five.",
    proof: "150K lines in 15 days — ~$1.5M at agency rates. One operator. Production-grade.",
  },
  {
    title: "Tech Lead",
    headline: "Your team builds features. Kyros handles the rest.",
    description:
      "Delegate migrations, refactors, test coverage, and documentation to governed agents. Your engineers focus on work that requires judgment.",
    proof: "490+ commits reviewed by architect, security, and QA. Zero skipped. Zero regressions.",
  },
  {
    title: "Agency Owner",
    headline: "More projects. Same headcount.",
    description:
      "Each instance runs independently — isolated repos, agents, and context. Your team provides creative direction. Kyros delivers engineering throughput at 10x the speed.",
    proof: "15-day delivery vs. 6-month agency timelines. Full code ownership. IP transfers on delivery.",
  },
] as const;

// ── Pricing ───────────────────────────────────────────────

export const pricing = {
  headline: "Design Partner Program",
  subheadline: "We're selecting 3-5 companies to co-develop with us. Your first project ships free — with direct access to the founding team.",
  tiers: [
    {
      name: "Design Partner",
      price: "Free",
      period: "first project",
      description: "Build with us. Ship with confidence.",
      highlighted: false,
      features: [
        "Full Kyros instance — 21 agents, 5 teams",
        "Dedicated onboarding with the founding team",
        "Direct input on product roadmap",
        "Private Discord channel for support",
        "Priority access to production release",
      ],
      cta: "Apply Now",
    },
    {
      name: "Growth",
      price: "$5K",
      period: "per project",
      description: "For startups and SMBs shipping real software.",
      highlighted: true,
      features: [
        "Dedicated agent team matched to your project",
        "Real-time dashboard with full transparency",
        "Consensus code review by specialized agents",
        "Weekly written progress reports",
        "Slack/Discord channel for async support",
        "Full code ownership and IP",
      ],
      cta: "Contact Sales",
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "annual contract",
      description: "White-label AI development at scale.",
      highlighted: false,
      features: [
        "Dedicated agent fleet with custom configurations",
        "White-label option — your brand, our engine",
        "SLA guarantees with 99.5% uptime",
        "On-premise deployment option",
        "Custom CI/CD and tool integrations",
        "SOC 2 readiness and audit logs",
        "Quarterly business reviews",
      ],
      cta: "Talk to Us",
    },
  ],
} as const;

// ── Feature Grid ─────────────────────────────────────────

export const featureGrid = [
  { title: "Orchestration", description: "Decompose missions into tasks, dispatch across 21 agents, and manage sprint cadence — automatically.", icon: "Workflow" as const },
  { title: "Observability", description: "Real-time dashboard with agent status, task progress, and full execution trace for every commit.", icon: "BarChart3" as const },
  { title: "Memory", description: "Three-tier persistent memory: task history, active context, and learned patterns across sessions and sprints.", icon: "Brain" as const },
  { title: "Triggers", description: "Event-driven automation — PR reviews, CI failures, and schedule-based dispatches fire without human intervention.", icon: "Zap" as const },
  { title: "Governance", description: "Defined boundaries, review gates, and consensus protocols ensure every line ships with architect and security sign-off.", icon: "Shield" as const },
  { title: "Intelligence", description: "Codebase knowledge graph, structural analysis, and model-agnostic inference power smarter agent decisions.", icon: "Sparkles" as const },
] as const;

// ── Competitive Matrix ────────────────────────────────────

export const competitors = [
  { name: "Kyros", autonomy: 4.5, teamSize: "21 agents", costRange: "$5K-100K/project", speed: "2-8 weeks", quality: "Multi-agent consensus", buyer: "Business / founder", highlight: true },
  { name: "Devin", autonomy: 3.5, teamSize: "Single agent", costRange: "$20/mo + usage", speed: "Hours (per task)", quality: "Self-review", buyer: "Developers", highlight: false },
  { name: "Factory.ai", autonomy: 3, teamSize: "Single agent", costRange: "$20-200/mo", speed: "Hours (per task)", quality: "Single-agent review", buyer: "Dev teams", highlight: false },
  { name: "Cursor", autonomy: 2, teamSize: "Copilot", costRange: "$20-200/mo", speed: "N/A (tool)", quality: "Developer reviews", buyer: "Developers", highlight: false },
  { name: "Lovable", autonomy: 3.5, teamSize: "Single agent", costRange: "$25-50/mo", speed: "Hours (simple)", quality: "Minimal", buyer: "Non-technical", highlight: false },
  { name: "Agency", autonomy: 5, teamSize: "5-20 humans", costRange: "$50K-500K+", speed: "3-12 months", quality: "Human review", buyer: "Enterprise", highlight: false },
] as const;

export const kyrosAdvantages = [
  { title: "Governed Team Orchestration", description: "5 teams, 21 agents, defined review gates. Every PR passes architect, security, and QA before merge." },
  { title: "Consensus Code Review", description: "490+ commits. Zero skipped reviews. Multi-agent consensus catches what single-agent workflows miss." },
  { title: "Self-Bootstrapped Proof", description: "150K lines in 15 days — ~$1.5M at agency rates. Kyros built itself. The product is its own stress test." },
  { title: "Persistent Knowledge Graph", description: "Three-tier memory across sessions, sprints, and projects. No cold starts. No repeated mistakes." },
] as const;

// ── Dashboard Callouts ───────────────────────────────────

export const dashboardCallouts = [
  { label: "Real-time agents", description: "Every agent streams status as it works", position: "top-left" as const },
  { label: "Cost tracking", description: "Per-task token spend, always visible", position: "top-right" as const },
  { label: "Sprint velocity", description: "Tasks completed vs. planned per sprint", position: "bottom-left" as const },
  { label: "Review gate", description: "Architect + QA approve before merge", position: "bottom-right" as const },
] as const;

// ── Trust Signals / Build Timeline ────────────────────────

export const buildTimeline = [
  {
    week: "Week 1",
    title: "Foundation",
    highlights: [
      "Monorepo + CI/CD pipeline",
      "21-agent definitions + governance",
      "Orchestrator engine + BullMQ dispatch",
    ],
  },
  {
    week: "Week 2",
    title: "Intelligence",
    highlights: [
      "Multi-agent consensus reviews",
      "Knowledge graph + persistent memory",
      "Real-time dashboard + WebSocket",
    ],
  },
  {
    week: "Week 3",
    title: "Production",
    highlights: [
      "Auth hardening + security audit",
      "Sprint planning + auto-dispatch",
      "150K+ lines shipped, all reviewed",
    ],
  },
] as const;

export const buildProofMetrics = [
  { value: "150K+", label: "Lines of TypeScript" },
  { value: "490+", label: "Git Commits" },
  { value: "21", label: "Governed Agents" },
  { value: "15", label: "Days to Build" },
] as const;

// ── Founder Quote ─────────────────────────────────────────

export const founderQuote = {
  text: "I needed a team I couldn't afford and couldn't find. So I built one. 21 agents that never burn out, never lose context, and never skip the architecture review. The question isn't whether AI can write code — it's whether AI can ship software.",
  short: "I needed a team I couldn't afford. So I built one — 21 agents, 150K lines, 15 days. The question was never whether AI can write code. It's whether AI can ship software.",
  author: "James Meneses",
  role: "Founder, Kyros",
} as const;

// ── Final CTA ─────────────────────────────────────────────

export const finalCta = {
  headline: "Stop hiring. Start orchestrating.",
  headlineAlt: "Your next sprint starts in minutes.",
  headlineVariants: [
    "One operator. 21 agents. Ship this week.",
    "The team you need exists. Apply today.",
    "Production code. Not prompts. Not prototypes.",
  ],
  subheadline: "3-5 design partners. First project free. Direct access to the founding team.",
  inputPlaceholder: "work@company.com",
  buttonText: "Apply for Early Access",
  finePrint: "No credit card. No commitment. Build something real.",
} as const;

// ── FAQ Items ────────────────────────────────────────────

export const faqItems = [
  {
    question: "How is Kyros different from Devin, Cursor, or other AI coding tools?",
    answer: "Those tools are single-agent copilots — they help one developer write code faster. Kyros is a governed multi-agent team: 21 specialized agents (architect, backend, frontend, security, QA) that execute full software delivery — from task decomposition to PR review. The difference is between a faster typist and a full engineering team.",
  },
  {
    question: "What does '21 agents' actually mean? Are they just prompts?",
    answer: "Each agent has a defined role, boundary constraints, persistent memory, and review authority. The Architect reviews every PR. Security audits access patterns. QA writes and runs tests. They coordinate through structured protocols — not chat. Think of it as 21 specialized roles with enforced governance, not 21 instances of the same model.",
  },
  {
    question: "How do you ensure code quality at AI speed?",
    answer: "Every commit passes through a multi-agent consensus review: Architect checks patterns and structure, Security audits for vulnerabilities, QA validates test coverage. 490+ commits reviewed with zero skipped reviews. The review gate is enforced by the system, not by discipline — agents cannot merge without approval.",
  },
  {
    question: "What's the moat? Can't someone rebuild this with Claude or GPT?",
    answer: "The model is a commodity — Kyros is model-agnostic. The moat is the orchestration layer: agent governance, persistent memory across sprints, codebase knowledge graphs, structured review protocols, and the operational playbook refined over 150K+ lines of self-bootstrapped code. Building an LLM wrapper takes days. Building a governed delivery system takes months.",
  },
  {
    question: "Who owns the code Kyros produces?",
    answer: "You do. 100% IP ownership transfers on delivery. Kyros is the builder, not the owner. Every line lives in your repo, your infrastructure, your Git history. No lock-in, no proprietary runtime, no dependency on our platform to run your software.",
  },
  {
    question: "What's the pricing model and unit economics?",
    answer: "Design partners build their first project free. Growth tier starts at $5K per project — roughly 100x cheaper than equivalent agency work. Enterprise gets custom annual contracts with SLA guarantees. Our cost scales with model inference (tokens), not headcount. As model costs drop 10x yearly, our margins improve without raising prices.",
  },
  {
    question: "How do you handle complex, legacy, or enterprise codebases?",
    answer: "Kyros maps your existing codebase into a knowledge graph — structure, dependencies, patterns, call chains. Agents understand what exists before writing a line. This isn't greenfield-only: we've built Kyros itself incrementally, refactoring and extending a 150K-line codebase across 490+ governed commits.",
  },
  {
    question: "What's the go-to-market strategy?",
    answer: "Phase 1: Design Partner program (3-5 companies, free first project) to validate across industries and prove delivery. Phase 2: Self-serve Growth tier for startups and SMBs. Phase 3: Enterprise with white-label option. We're building a platform, not a service — each project instance runs independently with its own agents, memory, and context.",
  },
] as const;

// ── Footer Links ─────────────────────────────────────────

export const footerLinks = {
  product: [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Changelog", href: "#" },
  ],
  resources: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Status", href: "#" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Partners", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "Security", href: "#" },
  ],
} as const;
