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
  headline: "Your AI engineering team.",
  headlineAccent: "Not another copilot.",
  headlineAlt: "21 agents. One operator. Production code.",
  headlineVariants: [
    { headline: "Ship software, not prompts.", accent: "Not another copilot." },
    { headline: "The engineering team that never sleeps.", accent: "21 agents. One operator." },
    { headline: "From prompt to production.", accent: "Without the agency price tag." },
  ],
  subheadline:
    "21 agents across 5 teams — architect, backend, frontend, security, QA — ship production software with governance, memory, and structured review.",
  primaryCta: "Get Early Access",
  secondaryCta: "Watch Demo",
} as const;

// ── Stats ─────────────────────────────────────────────────

export const stats = [
  { value: 21, suffix: "", label: "AI Agents", sublabel: "5 teams, governed workflow" },
  { value: 150, suffix: "K+", label: "Lines Shipped", sublabel: "Production TypeScript" },
  { value: 490, suffix: "+", label: "Git Commits", sublabel: "Attributed and reviewed" },
  { value: 15, suffix: "", label: "Days to Build", sublabel: "Zero to production" },
] as const;

// ── Problem Section ───────────────────────────────────────

export const problem = {
  headline: "One agent writes code. A team ships software.",
  headlineAlt: "AI assistance is not AI execution.",
  headlineVariants: [
    "Code generation is not software delivery.",
    "Writing code is the easy part.",
    "You don't need another code generator.",
  ],
  without: {
    title: "One agent, no structure",
    points: [
      "Prompt, paste, fix hallucinations, re-prompt, repeat",
      "No architecture review. No test strategy. No institutional memory",
      "Code ships fast. Technical debt ships faster",
      "Context resets every session — every conversation starts from zero",
    ],
  },
  with: {
    title: "21 agents, governed workflow",
    points: [
      "Architect reviews every PR. Backend and frontend build in parallel",
      "QA writes tests. Security audits. Intelligence learns from every sprint",
      "Three-tier memory persists context across sessions, sprints, and projects",
      "Multi-agent consensus review catches what single-agent workflows miss",
    ],
  },
} as const;

// ── How It Works ──────────────────────────────────────────

export const howItWorks = [
  {
    step: "01",
    title: "Define your team",
    description:
      "Select agents by role or use a preconfigured team. Set governance rules, connect your repo. Kyros maps your codebase before agents write a line.",
  },
  {
    step: "02",
    title: "Set the mission",
    description:
      "Describe what you need — a feature, a migration, a full module. The Orchestrator breaks it into tasks, assigns agents, and dispatches. You approve or let it run.",
  },
  {
    step: "03",
    title: "Watch it ship",
    description:
      "Agents build in parallel. Architect reviews. QA tests. Security audits. Track everything in real-time. Merge when ready.",
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
    proof: "One operator. 150K lines and 490+ commits in 15 days. Production-grade.",
  },
  {
    title: "Tech Lead",
    headline: "Your team builds features. Kyros handles the rest.",
    description:
      "Delegate migrations, refactors, test coverage, and documentation to governed agents. Your engineers focus on work that requires judgment.",
    proof: "Every PR reviewed by architect, security, and QA. Zero skipped reviews.",
  },
  {
    title: "Agency Owner",
    headline: "More projects. Same headcount.",
    description:
      "Each instance runs independently — isolated repos, agents, and context. Your team provides creative direction. Kyros provides engineering throughput.",
    proof: "Isolated per-client instances. Full code ownership. IP transfers on delivery.",
  },
] as const;

// ── Pricing ───────────────────────────────────────────────

export const pricing = {
  headline: "Design Partner Program",
  subheadline: "We're selecting 3-5 companies to co-develop the future of AI-native software delivery. Your first project is free.",
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
  { title: "Governed Team Orchestration", description: "Five specialized teams — architecture, backend, frontend, security, QA — each with defined roles and review gates. Structure that scales." },
  { title: "Consensus Code Review", description: "Every deliverable is independently reviewed for security vulnerabilities, architectural consistency, and test coverage before it ships." },
  { title: "Self-Bootstrapped Proof", description: "150K+ lines shipped in 15 days. Kyros built itself — the product is its own case study and stress test." },
  { title: "Persistent Knowledge Graph", description: "Codebase structure, learned patterns, and project context persist across sessions. No cold starts. No lost context." },
] as const;

// ── Founder Quote ─────────────────────────────────────────

export const founderQuote = {
  text: "I needed a team I couldn't afford and couldn't find. So I built one. 21 agents that never burn out, never lose context, and never skip the architecture review. The question isn't whether AI can write code — it's whether AI can ship software.",
  short: "I needed a team I couldn't afford. So I built one. The question was never whether AI can write code — it's whether AI can ship software.",
  author: "James Meneses",
  role: "Founder, Kyros",
} as const;

// ── Final CTA ─────────────────────────────────────────────

export const finalCta = {
  headline: "Stop hiring. Start orchestrating.",
  headlineAlt: "Your AI engineering team is ready.",
  headlineVariants: [
    "Your next sprint starts in minutes.",
    "Replace the hiring pipeline. Ship this week.",
    "21 agents. Zero recruiting. Go.",
  ],
  subheadline: "Join the design partner program. Ship your first project with 21 governed agents.",
  inputPlaceholder: "your@email.com",
  buttonText: "Get Early Access",
  finePrint: "First project free. No credit card required.",
} as const;
