import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import {
  sectionStagger, sectionChild, scrollReveal, transitions,
} from "@/lib/motion";
import {
  Bot, Network, BarChart3, GitBranch, Zap, Brain, ArrowRight,
} from "lucide-react";

/* ── Feature Data ── */

const features = [
  {
    icon: Bot,
    title: "Multi-Agent Teams",
    description:
      "21 specialized agents across architecture, backend, frontend, security, and QA. Each with defined boundaries, skills, and review responsibilities.",
  },
  {
    icon: Network,
    title: "Knowledge Graph",
    description:
      "Every agent, task, file, PR, and decision connected. Trace any bug back to its origin. Institutional memory that never forgets.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Dashboard",
    description:
      "See what every agent is doing, how well, and at what cost. Sprint progress, blockers, quality metrics — all live.",
  },
  {
    icon: GitBranch,
    title: "Governed Execution",
    description:
      "Budget controls, boundary enforcement, automated code reviews, quality gates. Your agents work autonomously within guardrails.",
  },
  {
    icon: Zap,
    title: "Sprint Planning",
    description:
      "Describe the mission. The PM agent creates structured sprints with wave-based parallel execution. Agents self-organize and dispatch.",
  },
  {
    icon: Brain,
    title: "Continuous Learning",
    description:
      "Three-tier memory system. Agents learn from every session, every review, every mistake. Performance improves over time.",
  },
];

export function FeaturesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 md:py-20">
      {/* ── Header ── */}
      <motion.section className="mb-12 sm:mb-16 md:mb-20 lg:mb-24 text-center" {...sectionStagger}>
        <motion.div {...sectionChild}>
          <p className="mb-3 text-xs font-mono uppercase tracking-[0.3em]" style={{ color: "var(--primary)" }}>
            [ CAPABILITIES ]
          </p>
          <h1 className="mb-4 text-4xl sm:text-5xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
            What Kyros <span style={{ color: "var(--primary)" }}>Does</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base sm:text-lg" style={{ color: "var(--foreground-muted)" }}>
            Not another AI coding assistant. A complete engineering team.
          </p>
        </motion.div>
      </motion.section>

      {/* ── Feature Grid ── */}
      <motion.section className="mb-12 sm:mb-16 md:mb-24 lg:mb-32" {...sectionStagger}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <motion.div key={feature.title} {...sectionChild}>
              <Card className="h-full group hover:ring-1 hover:ring-primary/20 transition-all">
                <CardContent className="flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{ backgroundColor: "var(--accent-muted)" }}
                    >
                      <feature.icon className="h-5 w-5" style={{ color: "var(--primary)" }} />
                    </div>
                    <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Bottom CTA ── */}
      <motion.section className="mb-16" {...scrollReveal}>
        <div
          className="text-center py-16 px-6 rounded-xl border"
          style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Ready to replace your <span style={{ color: "var(--primary)" }}>hiring pipeline</span>?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-base" style={{ color: "var(--foreground-muted)" }}>
            3-5 design partners. First project free. Direct access to the founding team.
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
