import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  sectionStagger, sectionChild, scrollReveal, transitions,
} from "@/lib/motion";
import {
  GitCommit, GitPullRequest, FileCode, Code2,
  ArrowRight, Layers, Palette, Briefcase, ClipboardList, Cpu,
} from "lucide-react";

/* ── Data ── */

const timelineItems = [
  {
    days: "Day 1-3",
    title: "Foundation",
    description: "Design system, tokens, component library. Established the visual language, color palette, typography scale, and reusable primitives.",
  },
  {
    days: "Day 4-7",
    title: "Core Pages",
    description: "Hero, pricing, typography pages. Full landing page with animated sections, competitive positioning table, and FAQ.",
  },
  {
    days: "Day 8-14",
    title: "Dashboard",
    description: "Technical dashboard with real charts. Sprint velocity, token usage, agent activity, cost breakdown — all with Recharts.",
  },
  {
    days: "Day 15-21",
    title: "Polish",
    description: "Animations, responsive layouts, theme system. Framer Motion scroll reveals, mobile nav, floating settings, preset switcher.",
  },
  {
    days: "Day 22-29",
    title: "Strategic",
    description: "CEO Dashboard, comparison, ROI pages. Business-facing content with real data, investor pitch deck, and case study.",
  },
];

const teamMembers = [
  { name: "Zara", role: "Frontend Developer", contribution: "12 pages, 40+ components", icon: Layers, color: "#A78BFA" },
  { name: "Atlas", role: "UI/UX Designer", contribution: "Design system, theme tokens", icon: Palette, color: "#F472B6" },
  { name: "Nova", role: "Business Strategist", contribution: "Content strategy, positioning", icon: Briefcase, color: "#D946EF" },
  { name: "Akira", role: "Product PM", contribution: "Sprint planning, prioritization", icon: ClipboardList, color: "#22D3EE" },
  { name: "Grace", role: "Architect", contribution: "Component architecture, patterns", icon: Cpu, color: "#60A5FA" },
];

const proofStats = [
  { value: "769", label: "Commits", icon: GitCommit },
  { value: "116", label: "PRs Merged", icon: GitPullRequest },
  { value: "527", label: "Source Files", icon: FileCode },
  { value: "87,006", label: "Lines of Code", icon: Code2 },
];

export function CaseStudyPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 md:py-20">
      {/* ── Header ── */}
      <motion.section className="mb-12 sm:mb-16 md:mb-20 lg:mb-24 text-center" {...sectionStagger}>
        <motion.div {...sectionChild}>
          <p className="mb-3 text-xs font-mono uppercase tracking-[0.3em]" style={{ color: "var(--primary)" }}>
            [ CASE_STUDY ]
          </p>
          <h1 className="mb-4 text-4xl sm:text-5xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
            Built by <span style={{ color: "var(--primary)" }}>AI Agents</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base sm:text-lg" style={{ color: "var(--foreground-muted)" }}>
            Everything you see on this site was created by Kyros agents.
          </p>
        </motion.div>
      </motion.section>

      {/* ── Timeline ── */}
      <motion.section className="mb-12 sm:mb-16 md:mb-24 lg:mb-32" {...sectionStagger}>
        <motion.div {...sectionChild}>
          <p className="mb-3 text-xs font-mono uppercase tracking-[0.2em]" style={{ color: "var(--primary)" }}>
            // BUILD_TIMELINE
          </p>
          <h2 className="mb-8 text-3xl sm:text-4xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
            29 days. Start to finish.
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical connecting line */}
          <div
            className="absolute left-4 md:left-6 top-0 bottom-0 w-px hidden sm:block"
            style={{ backgroundColor: "var(--border)" }}
          />

          <div className="space-y-6">
            {timelineItems.map((item, i) => (
              <motion.div
                key={item.days}
                className="relative pl-10 md:pl-16"
                {...sectionChild}
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-2.5 md:left-4.5 top-3 h-3 w-3 rounded-full border-2 hidden sm:block"
                  style={{
                    borderColor: "var(--primary)",
                    backgroundColor: i === timelineItems.length - 1 ? "var(--primary)" : "var(--bg)",
                    boxShadow: i === timelineItems.length - 1 ? "0 0 10px var(--accent-muted)" : undefined,
                  }}
                />

                <Card className="hover:ring-1 hover:ring-primary/20 transition-all">
                  <CardContent>
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline" className="text-[10px] font-mono">
                        {item.days}
                      </Badge>
                      <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── Agent Team ── */}
      <motion.section className="mb-12 sm:mb-16 md:mb-24 lg:mb-32" {...sectionStagger}>
        <motion.div {...sectionChild}>
          <p className="mb-3 text-xs font-mono uppercase tracking-[0.2em]" style={{ color: "var(--primary)" }}>
            // THE_TEAM
          </p>
          <h2 className="mb-8 text-3xl sm:text-4xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
            Agent team that built it
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {teamMembers.map((member) => (
            <motion.div key={member.name} {...sectionChild}>
              <Card className="h-full group hover:ring-1 hover:ring-primary/20 transition-all">
                <CardContent>
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${member.color}15` }}
                    >
                      <member.icon className="h-5 w-5" style={{ color: member.color }} />
                    </div>
                    <div>
                      <div className="font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
                        {member.name}
                      </div>
                      <div className="text-xs font-mono" style={{ color: member.color }}>
                        {member.role}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
                    {member.contribution}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Proof: The Numbers ── */}
      <motion.section className="mb-12 sm:mb-16 md:mb-24" {...scrollReveal}>
        <div
          className="text-center py-16 px-6 rounded-xl border"
          style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
        >
          <p className="text-xs font-mono uppercase tracking-[0.2em] mb-4" style={{ color: "var(--primary)" }}>
            // THE_PROOF
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            What 1 person + Kyros achieved
          </h2>
          <p className="mx-auto max-w-xl text-base mb-10" style={{ color: "var(--foreground-muted)" }}>
            No hiring. No onboarding. No standups. One technical founder with a vision and 21 AI agents that executed.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {proofStats.map((stat) => (
              <div key={stat.label}>
                <stat.icon className="h-5 w-5 mx-auto mb-2" style={{ color: "var(--primary)" }} />
                <div className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--primary)", fontFamily: "var(--font-heading)" }}>
                  {stat.value}
                </div>
                <div className="text-xs font-mono uppercase mt-1" style={{ color: "var(--foreground-muted)" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── CTA ── */}
      <motion.section className="mb-16" {...scrollReveal}>
        <div className="text-center py-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Your project could be next
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-base" style={{ color: "var(--foreground-muted)" }}>
            First project ships free. See what 21 agents can build for you.
          </p>
          <motion.button
            className="px-8 py-3.5 text-sm font-semibold cursor-pointer inline-flex items-center gap-2"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
              borderRadius: "var(--radius)",
              boxShadow: "0 0 30px var(--accent-muted)",
            }}
            whileHover={{ scale: 1.03, boxShadow: "0 0 40px var(--accent-muted)" }}
            whileTap={{ scale: 0.98 }}
            transition={transitions.micro}
          >
            Apply for Early Access <ArrowRight className="h-4 w-4" />
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
}
