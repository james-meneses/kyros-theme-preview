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
  badge: "Now in Design Partner Preview",
  headline: "Your AI engineering team.",
  headlineAccent: "Not another copilot.",
  headlineAlt: "Ship code while you sleep.",
  subheadline:
    "Kyros orchestrates 21 specialized AI agents across 5 teams — architect, backend, frontend, security, QA — to build production-grade software with governance, memory, and multi-agent review. One operator. A full engineering org.",
  primaryCta: "Get Early Access",
  secondaryCta: "Watch Demo",
} as const;

// ── Stats ─────────────────────────────────────────────────

export const stats = [
  { value: 21, suffix: "", label: "AI Agents", sublabel: "Across 5 specialized teams" },
  { value: 150, suffix: "K+", label: "Lines Shipped", sublabel: "Typed TypeScript across monorepo" },
  { value: 490, suffix: "+", label: "Git Commits", sublabel: "Traceable, attributed, governed" },
  { value: 15, suffix: "", label: "Days to Build", sublabel: "From zero to production platform" },
] as const;

// ── Problem Section ───────────────────────────────────────

export const problem = {
  headline: "The gap between AI assistance and AI execution",
  headlineAlt: "One agent writes code. A team ships software.",
  without: {
    title: "One agent, no structure",
    points: [
      "You prompt an AI, paste code, fix hallucinations, re-prompt, repeat",
      "No architectural review. No test coverage strategy. No institutional memory",
      "Code ships fast. Technical debt ships faster",
      "Context evaporates between sessions — every conversation starts from zero",
    ],
  },
  with: {
    title: "21 agents, governed workflow",
    points: [
      "Zara (Architect) reviews every PR. Grace (Backend) and Atlas (Frontend) build in parallel",
      "Echo (QA) writes tests. Sage (Security) audits. Nova (Intelligence) learns from every sprint",
      "Three-tier memory persists context: episodic (Postgres), working (Redis), semantic (pgvector)",
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
      "Select agents by role — or use a preconfigured team. Assign trust levels, set governance rules, and connect your repo. Kyros maps your codebase into a knowledge graph so agents understand your architecture before writing a single line.",
  },
  {
    step: "02",
    title: "Set the mission",
    description:
      "Describe what you need built — a feature, a migration, a full module. The Orchestrator breaks it into tasks, assigns agents by expertise, and dispatches work across teams. You approve the plan or let it run autonomously.",
  },
  {
    step: "03",
    title: "Watch it ship",
    description:
      "Agents build in parallel. Architect reviews. QA tests. Security audits. You observe progress in real-time through the dashboard — 26 typed event streams, live agent status, and full sprint telemetry. Merge when ready.",
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
    description: "Episodic (Postgres) for task history. Working (Redis) for active context. Semantic (pgvector) for learned patterns. Agents remember what they've built.",
    metric: "Memory",
  },
  {
    title: "Architectural awareness",
    description: "Apache AGE with Cypher queries maps your entire codebase — relationships, dependencies, call chains. Agents understand structure, not just syntax.",
    metric: "Knowledge Graph",
  },
  {
    title: "Any model. Your choice.",
    description: "Claude, GPT, Gemini, open-source models. Kyros orchestrates the team — the underlying model is a configuration choice, not a constraint.",
    metric: "Model Agnostic",
  },
] as const;

// ── Personas / Use Cases ──────────────────────────────────

export const personas = [
  {
    title: "Solo Founder",
    headline: "You're technical. You're one person. You need a team.",
    description:
      "Stop context-switching between frontend, backend, infra, and testing. Dispatch a sprint to Kyros, review the output, merge, and move on. One founder with 21 agents ships like a team of 5.",
    proof: "Kyros itself was built by one operator and 21 agents in ~15 working days. 490+ commits. 150K+ lines. Production-grade.",
  },
  {
    title: "Tech Lead",
    headline: "Your team builds features. Kyros handles the rest.",
    description:
      "Delegate migrations, refactors, test coverage, and documentation to governed AI agents while your human engineers focus on the work that requires judgment.",
    proof: "Multi-agent consensus review catches issues that single-agent code generation misses. Governance is built in, not bolted on.",
  },
  {
    title: "Agency Owner",
    headline: "Multiply your delivery capacity without multiplying headcount.",
    description:
      "Take on more client projects without hiring. Each Kyros instance runs independently — isolated repos, isolated agents, isolated context. Your team provides creative direction. Kyros provides engineering throughput.",
    proof: "Design partner program: free first project. Validate the model on a real client engagement before committing.",
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
        "Multi-agent consensus code review",
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
  { title: "Multi-Agent Orchestration", description: "18 specialized agents across 5 teams. Not one agent — a team with architects, developers, security, and QA." },
  { title: "Consensus-Based Review", description: "Multiple specialized agents independently review every deliverable. Security checks for vulnerabilities. Architecture checks consistency." },
  { title: "Self-Bootstrapping Proof", description: "Kyros built itself — 150K+ lines in ~15 days. Devin didn't build Devin. Cursor didn't build Cursor." },
  { title: "Knowledge Graph Memory", description: "Apache AGE maps your entire codebase. Three-tier memory persists context across the entire engagement." },
] as const;

// ── Founder Quote ─────────────────────────────────────────

export const founderQuote = {
  text: "I built Kyros because I needed a team I couldn't afford and couldn't find. Now I have 21 engineers who never burn out, never forget context, and never skip the architecture review. The question isn't whether AI can write code — it's whether AI can ship software. Kyros is my answer.",
  author: "James Meneses",
  role: "Founder, Kyros",
} as const;

// ── Final CTA ─────────────────────────────────────────────

export const finalCta = {
  headline: "Stop hiring. Start orchestrating.",
  headlineAlt: "Your AI engineering team is ready.",
  subheadline: "Join the design partner program. Build your first project with 21 AI agents — architect, backend, frontend, security, QA — governed, coordinated, and shipping production code.",
  inputPlaceholder: "your@email.com",
  buttonText: "Get Early Access",
  finePrint: "Free for your first project. No credit card required.",
} as const;
