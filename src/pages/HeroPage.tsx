import { motion } from "motion/react";
import NumberFlow from "@number-flow/react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { variants, transitions } from "@/lib/motion";
import { Zap, Users, Code, Shield, GitBranch, Bot, Activity, BarChart3 } from "lucide-react";
import { useEffect, useState } from "react";

/** Animated stat that rolls from 0 → target on mount using NumberFlow */
function AnimatedStat({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    // Small delay so the roll animation is visible after page render
    const t = setTimeout(() => setValue(target), 200);
    return () => clearTimeout(t);
  }, [target]);
  return (
    <span className="inline-flex items-baseline">
      <NumberFlow value={value} />
      {suffix && <span>{suffix}</span>}
    </span>
  );
}

const stats = [
  { value: 21, suffix: "", label: "AI_AGENTS", icon: Bot },
  { value: 150, suffix: "K+", label: "LINES_SHIPPED", icon: Code },
  { value: 186, suffix: "", label: "TEST_FILES", icon: Shield },
  { value: 26, suffix: "", label: "EVENT_TYPES", icon: Activity },
];

const howItWorks = [
  {
    step: "01",
    title: "DISPATCH",
    desc: "Describe the work. Kyros assembles the right agent team, assigns roles, and creates a plan.",
    icon: Zap,
    tags: ["BACKEND", "FRONTEND"],
  },
  {
    step: "02",
    title: "EXECUTE",
    desc: "Agents self-organize into sprints. Each agent works in isolated worktrees with full tool access.",
    icon: GitBranch,
    tags: ["PARALLEL", "ISOLATED"],
  },
  {
    step: "03",
    title: "REVIEW",
    desc: "Built-in review matrix ensures quality. Architect reviews every PR. Metrics track cost and velocity.",
    icon: BarChart3,
    tags: ["QA", "METRICS"],
  },
];

const agents = [
  { name: "Akira", role: "BACKEND_DEV", color: "#60A5FA", status: "ACTIVE" },
  { name: "Zara", role: "FRONTEND_DEV", color: "#F472B6", status: "ACTIVE" },
  { name: "Grace", role: "ARCHITECT", color: "#CCFF00", status: "REVIEWING" },
  { name: "Atlas", role: "QA_ENGINEER", color: "#FBBF24", status: "ACTIVE" },
  { name: "Dieter", role: "UI_DESIGNER", color: "#D946EF", status: "IDLE" },
  { name: "Ada", role: "DEVOPS", color: "#22D3EE", status: "ACTIVE" },
  { name: "Coco", role: "BRAND_MGR", color: "#FB923C", status: "IDLE" },
  { name: "Frida", role: "VISUAL_ENG", color: "#A78BFA", status: "ACTIVE" },
];

export function HeroPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      {/* ── Hero ── */}
      <motion.section
        className="mb-24 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transitions.reveal}
      >
        <motion.p
          className="mb-4 text-xs font-mono uppercase tracking-[0.3em]"
          style={{ color: "var(--primary)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, ...transitions.default }}
        >
          [ THE AI-NATIVE OS FOR SOFTWARE TEAMS ]
        </motion.p>
        <h1
          className="mb-6 text-4xl sm:text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Your AI Engineering
          <br />
          <span style={{ color: "var(--primary)" }}>Department</span>
        </h1>
        <p
          className="mx-auto mb-10 max-w-2xl text-base sm:text-lg leading-relaxed"
          style={{ color: "var(--foreground-muted)" }}
        >
          Dispatch work to AI agent teams that self-organize, execute, and deliver reviewed,
          tested code — with full visibility into what every agent is doing.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <motion.button
            className="px-8 py-3.5 text-sm font-semibold cursor-pointer"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
              borderRadius: "var(--radius)",
              boxShadow: "0 0 30px var(--accent-muted)",
            }}
            whileHover={{ scale: 1.03, boxShadow: "0 0 40px #CCFF0040" }}
            whileTap={{ scale: 0.98 }}
            transition={transitions.micro}
          >
            Start Building →
          </motion.button>
          <motion.button
            className="border px-8 py-3.5 text-sm font-medium cursor-pointer"
            style={{
              borderColor: "var(--border)",
              color: "var(--foreground)",
              borderRadius: "var(--radius)",
              backgroundColor: "transparent",
            }}
            whileHover={{ borderColor: "var(--primary)", color: "var(--primary)" }}
            whileTap={{ scale: 0.98 }}
            transition={transitions.micro}
          >
            Watch Demo
          </motion.button>
        </div>
      </motion.section>

      {/* ── Stats ── */}
      <motion.section
        className="mb-24 grid grid-cols-2 md:grid-cols-4 border"
        style={{
          borderColor: "var(--border)",
          borderRadius: "var(--radius)",
          backgroundColor: "var(--bg-card)",
        }}
        {...variants.slideUp}
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="px-4 sm:px-6 py-8 text-center"
            style={{
              borderColor: "var(--border)",
              borderLeftWidth: i % 2 !== 0 ? "1px" : 0,
              borderLeftStyle: "solid" as const,
              borderTopWidth: i >= 2 ? "1px" : 0,
              borderTopStyle: "solid" as const,
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i, ...transitions.enter }}
          >
            <stat.icon
              className="mx-auto mb-2 h-5 w-5"
              style={{ color: "var(--primary)" }}
              strokeWidth={1.5}
            />
            <div
              className="text-3xl sm:text-4xl font-bold tabular-nums"
              style={{ color: "var(--primary)", fontFamily: "var(--font-heading)" }}
            >
              <AnimatedStat target={stat.value} suffix={stat.suffix} />
            </div>
            <div
              className="mt-1 text-[10px] sm:text-xs font-mono uppercase tracking-wider"
              style={{ color: "var(--foreground-muted)" }}
            >
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.section>

      {/* ── How It Works ── */}
      <section className="mb-24">
        <p
          className="mb-2 text-xs font-mono uppercase tracking-[0.2em]"
          style={{ color: "var(--primary)" }}
        >
          // HOW_IT_WORKS
        </p>
        <h2 className="mb-10 text-3xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
          Three steps to orchestrated AI
        </h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={variants.stagger}
          initial="initial"
          animate="animate"
        >
          {howItWorks.map((item) => (
            <motion.div key={item.step} variants={variants.slideUp}>
              <Card className="h-full hover:ring-foreground/25 transition-shadow">
                <CardContent className="flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{ backgroundColor: "var(--accent-muted)" }}
                    >
                      <item.icon className="h-5 w-5" style={{ color: "var(--primary)" }} />
                    </div>
                    <span
                      className="font-mono text-xs"
                      style={{ color: "var(--foreground-muted)" }}
                    >
                      STEP_{item.step}
                    </span>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--foreground-muted)" }}>
                    {item.desc}
                  </p>
                  <div className="flex gap-2 mt-auto">
                    {item.tags.map((tag) => (
                      <Badge key={tag}>[{tag}]</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Agent Team ── */}
      <section className="mb-24">
        <p
          className="mb-2 text-xs font-mono uppercase tracking-[0.2em]"
          style={{ color: "var(--primary)" }}
        >
          // AGENT_FLEET
        </p>
        <h2 className="mb-10 text-3xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
          Meet your AI engineering team
        </h2>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          variants={variants.stagger}
          initial="initial"
          animate="animate"
        >
          {agents.map((agent) => (
            <motion.div key={agent.name} variants={variants.slideUp}>
              <Card className="group relative overflow-hidden">
                <CardContent>
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold"
                      style={{ backgroundColor: agent.color + "20", color: agent.color }}
                    >
                      {agent.name[0]}
                    </div>
                    {/* Status dot */}
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{
                        backgroundColor:
                          agent.status === "ACTIVE" ? "#22C55E" :
                          agent.status === "REVIEWING" ? "#FBBF24" : "#6B7280",
                        boxShadow: agent.status === "ACTIVE" ? "0 0 6px #22C55E80" : undefined,
                      }}
                    />
                  </div>
                  <div className="font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
                    {agent.name}
                  </div>
                  <div className="text-xs font-mono mb-2" style={{ color: "var(--foreground-muted)" }}>
                    {agent.role}
                  </div>
                  <Badge variant={agent.status === "ACTIVE" ? "default" : "secondary"}>
                    [{agent.status}]
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Terminal Demo ── */}
      <motion.section
        className="mb-24"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={transitions.enter}
      >
        <p
          className="mb-2 text-xs font-mono uppercase tracking-[0.2em]"
          style={{ color: "var(--primary)" }}
        >
          // DISPATCH_TERMINAL
        </p>
        <h2 className="mb-8 text-3xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
          One command to ship
        </h2>
        <div
          className="overflow-hidden border"
          style={{
            borderColor: "var(--border)",
            borderRadius: "var(--radius)",
            backgroundColor: "var(--bg-card)",
          }}
        >
          <div
            className="flex items-center gap-2 border-b px-4 py-2"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-secondary)" }}
          >
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#FF5F57" }} />
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#FFBD2E" }} />
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#28C840" }} />
            <span className="ml-2 text-xs" style={{ color: "var(--foreground-muted)", fontFamily: "var(--font-mono)" }}>
              terminal
            </span>
          </div>
          <pre
            className="p-6 text-sm leading-relaxed overflow-x-auto"
            style={{ fontFamily: "var(--font-mono)", color: "var(--foreground-muted)" }}
          >
            <code>
              <span style={{ color: "var(--foreground-muted)" }}>$</span>{" "}
              <span style={{ color: "var(--primary)" }}>kyros dispatch</span>{" "}
              <span style={{ color: "var(--foreground)" }}>"Add OAuth2 login with Google and GitHub providers"</span>
              {"\n\n"}
              <span style={{ color: "var(--foreground-muted)" }}>→ Assembling team: Akira (backend), Zara (frontend), Grace (review)</span>
              {"\n"}
              <span style={{ color: "var(--foreground-muted)" }}>→ Sprint created: 3 tasks, estimated 45 min</span>
              {"\n"}
              <span style={{ color: "var(--primary)" }}>→ Agents executing...</span>
              {"\n\n"}
              <span style={{ color: "#22C55E" }}>✓ PR #247 ready for review (18 files, 1,240 lines, 186 tests passing)</span>
            </code>
          </pre>
        </div>
      </motion.section>

      {/* ── CTA ── */}
      <motion.section
        className="mb-16 text-center py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={transitions.enter}
      >
        <Users className="mx-auto mb-4 h-8 w-8" style={{ color: "var(--primary)" }} />
        <h2 className="mb-4 text-3xl sm:text-4xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
          Ready to build with <span style={{ color: "var(--primary)" }}>Kyros</span>?
        </h2>
        <p className="mb-8 text-lg" style={{ color: "var(--foreground-muted)" }}>
          Join the Design Partner Program. Limited spots available.
        </p>
        <motion.button
          className="px-8 py-4 text-base font-semibold cursor-pointer"
          style={{
            backgroundColor: "var(--primary)",
            color: "var(--primary-foreground)",
            borderRadius: "var(--radius)",
            boxShadow: "0 0 30px var(--accent-muted)",
          }}
          whileHover={{ scale: 1.03, boxShadow: "0 0 40px #CCFF0040" }}
          whileTap={{ scale: 0.98 }}
        >
          Apply for Early Access →
        </motion.button>
      </motion.section>
    </div>
  );
}
