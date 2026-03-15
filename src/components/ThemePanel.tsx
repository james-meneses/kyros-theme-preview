import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DashboardSection } from "@/components/DashboardSection"
import { TypographySection } from "@/components/TypographySection"
import { AgentAvatar } from "@/components/AgentAvatar"

interface ThemePanelProps {
  themeKey: string
  themeLabel: string
  themeDescription: string
  headingFont: string
  bodyFont: string
  radius: string
  vars: Record<string, string>
  compact?: boolean
}

export function ThemePanel({
  themeLabel,
  themeDescription,
  vars,
  compact = false,
}: ThemePanelProps) {
  return (
    <div
      className={`mx-auto max-w-6xl ${compact ? "px-4" : "px-6"} py-16`}
      style={Object.fromEntries(Object.entries(vars))}
    >
      {/* // HERO */}
      <section className="mb-24 text-center">
        <p
          className="mb-4 text-xs font-mono uppercase tracking-[0.3em]"
          style={{ color: "var(--primary)" }}
        >
          [ THE AI-NATIVE OS FOR SOFTWARE TEAMS ]
        </p>
        <h1
          className="mb-6 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Your AI Engineering
          <br />
          <span style={{ color: "var(--primary)" }}>Department</span>
        </h1>
        <p
          className="mx-auto mb-8 max-w-2xl text-base sm:text-lg leading-relaxed"
          style={{ color: "var(--foreground-muted)" }}
        >
          Dispatch work to AI agent teams that self-organize, execute, and deliver reviewed,
          tested code — with full visibility into what every agent is doing.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            className="px-6 py-3 text-sm font-semibold transition-all hover:opacity-90 cursor-pointer"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
              borderRadius: "var(--radius)",
              boxShadow: "var(--shadow)",
            }}
          >
            Start Building →
          </button>
          <button
            className="border px-6 py-3 text-sm font-medium transition-all hover:opacity-80 cursor-pointer"
            style={{
              borderColor: "var(--border)",
              color: "var(--foreground)",
              borderRadius: "var(--radius)",
              backgroundColor: "transparent",
            }}
          >
            Watch Demo
          </button>
        </div>
      </section>

      {/* // METRICS_OVERVIEW */}
      <section
        className="mb-24 grid grid-cols-2 md:grid-cols-4 border"
        style={{
          borderColor: "var(--border)",
          borderRadius: "var(--radius)",
          backgroundColor: "var(--bg-card)",
        }}
      >
        {[
          { value: "18", label: "AI_AGENTS" },
          { value: "150K+", label: "LINES_SHIPPED" },
          { value: "186", label: "TEST_FILES" },
          { value: "26", label: "EVENT_TYPES" },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className="px-4 sm:px-6 py-6 text-center"
            style={{
              borderColor: "var(--border)",
              borderLeftWidth: i % 2 !== 0 ? "1px" : 0,
              borderLeftStyle: "solid",
              borderTopWidth: i >= 2 ? "1px" : 0,
              borderTopStyle: "solid",
            }}
          >
            <div
              className="text-2xl sm:text-3xl font-bold"
              style={{ color: "var(--primary)", fontFamily: "var(--font-heading)" }}
            >
              {stat.value}
            </div>
            <div
              className="mt-1 text-[10px] sm:text-xs font-mono uppercase tracking-wider"
              style={{ color: "var(--foreground-muted)" }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </section>

      {/* // HOW_IT_WORKS */}
      <section className="mb-24">
        <p
          className="mb-2 text-xs font-mono uppercase tracking-[0.2em]"
          style={{ color: "var(--primary)" }}
        >
          // HOW_IT_WORKS
        </p>
        <h2
          className="mb-10 text-3xl font-bold"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Three steps to orchestrated AI
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              title: "DISPATCH_COMMAND",
              desc: "Describe the work. Kyros assembles the right agent team, assigns roles, and creates a plan.",
              tags: ["BACKEND", "FRONTEND"],
            },
            {
              step: "02",
              title: "AGENT_EXECUTE",
              desc: "Agents self-organize into sprints. Each agent works in isolated worktrees with full tool access.",
              tags: ["PARALLEL", "ISOLATED"],
            },
            {
              step: "03",
              title: "REVIEW_MATRIX",
              desc: "Built-in review matrix ensures quality. Architect reviews every PR. Metrics track cost and velocity.",
              tags: ["QA", "METRICS"],
            },
          ].map((item) => (
            <Card key={item.step} className="hover:ring-foreground/25">
              <CardContent className="flex flex-col flex-1">
                <div
                  className="mb-3 inline-block rounded-full px-3 py-1 font-mono text-xs"
                  style={{
                    backgroundColor: "var(--accent-muted)",
                    color: "var(--primary)",
                  }}
                >
                  {item.step}
                </div>
                <h3
                  className="mb-2 text-xl font-semibold"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-3"
                  style={{ color: "var(--foreground-muted)" }}
                >
                  {item.desc}
                </p>
                <div className="flex gap-2 mt-auto">
                  {item.tags.map((tag) => (
                    <Badge key={tag}>[{tag}]</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* // AGENT_TEAM */}
      <section className="mb-24">
        <p
          className="mb-2 text-xs font-mono uppercase tracking-[0.2em]"
          style={{ color: "var(--primary)" }}
        >
          // AGENT_TEAM
        </p>
        <h2
          className="mb-10 text-3xl font-bold"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Meet your AI engineering team
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Akira", role: "BACKEND_DEV", color: "#60A5FA", status: "ACTIVE" },
            { name: "Zara", role: "FRONTEND_DEV", color: "#F472B6", status: "ACTIVE" },
            { name: "Grace", role: "ARCHITECT", color: "#C3FF49", status: "ACTIVE" },
            { name: "Atlas", role: "QA_ENGINEER", color: "#FBBF24", status: "IDLE" },
          ].map((agent) => (
            <Card key={agent.name}>
              <CardContent>
                <AgentAvatar name={agent.name} color={agent.color} size={40} className="mb-3" />
                <div
                  className="font-semibold"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {agent.name}
                </div>
                <div
                  className="text-xs font-mono mb-2"
                  style={{ color: "var(--foreground-muted)" }}
                >
                  {agent.role}
                </div>
                <Badge variant={agent.status === "ACTIVE" ? "default" : "secondary"}>
                  [{agent.status}]
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* // DISPATCH_TERMINAL */}
      <section className="mb-24">
        <p
          className="mb-2 text-xs font-mono uppercase tracking-[0.2em]"
          style={{ color: "var(--primary)" }}
        >
          // DISPATCH_TERMINAL
        </p>
        <h2
          className="mb-8 text-3xl font-bold"
          style={{ fontFamily: "var(--font-heading)" }}
        >
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
            <span
              className="ml-2 text-xs"
              style={{ color: "var(--foreground-muted)", fontFamily: "var(--font-mono)" }}
            >
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
              <span style={{ color: "var(--foreground)" }}>
                "Add OAuth2 login with Google and GitHub providers"
              </span>
              {"\n\n"}
              <span style={{ color: "var(--foreground-muted)" }}>
                → Assembling team: Akira (backend), Zara (frontend), Grace (review)
              </span>
              {"\n"}
              <span style={{ color: "var(--foreground-muted)" }}>
                → Sprint created: 3 tasks, estimated 45 min
              </span>
              {"\n"}
              <span style={{ color: "var(--primary)" }}>→ Agents executing...</span>
              {"\n\n"}
              <span style={{ color: "var(--secondary)" }}>
                ✓ PR #247 ready for review (18 files, 1,240 lines, 186 tests passing)
              </span>
            </code>
          </pre>
        </div>
      </section>

      {/* // DASHBOARD_PREVIEW */}
      <DashboardSection />

      {/* // TYPOGRAPHY_SPECIMEN */}
      <TypographySection vars={vars} />

      {/* // CALL_TO_ACTION */}
      <section className="mb-16 text-center">
        <h2
          className="mb-4 text-3xl sm:text-4xl font-bold"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Ready to build with <span style={{ color: "var(--primary)" }}>Kyros</span>?
        </h2>
        <p className="mb-8 text-lg" style={{ color: "var(--foreground-muted)" }}>
          Join the Design Partner Program. Limited spots available.
        </p>
        <button
          className="px-8 py-4 text-base font-semibold transition-all hover:opacity-90 cursor-pointer"
          style={{
            backgroundColor: "var(--primary)",
            color: "var(--primary-foreground)",
            borderRadius: "var(--radius)",
            boxShadow: "var(--shadow)",
          }}
        >
          Apply for Early Access →
        </button>
      </section>

      {/* // ACTIVE_PALETTE */}
      <section
        className="border p-6"
        style={{
          borderColor: "var(--border)",
          borderRadius: "var(--radius)",
          backgroundColor: "var(--bg-card)",
        }}
      >
        <p
          className="mb-4 text-xs font-mono uppercase tracking-[0.2em]"
          style={{ color: "var(--primary)" }}
        >
          // ACTIVE_PALETTE
        </p>
        <div className="grid grid-cols-2 min-[400px]:grid-cols-4 md:grid-cols-7 gap-3">
          {[
            { name: "bg", var: "--bg" },
            { name: "card", var: "--bg-card" },
            { name: "muted", var: "--muted" },
            { name: "border", var: "--border" },
            { name: "foreground", var: "--foreground" },
            { name: "primary", var: "--primary" },
            { name: "secondary", var: "--secondary" },
          ].map((c) => (
            <div key={c.name} className="text-center">
              <div
                className="mb-2 aspect-square w-full border"
                style={{
                  backgroundColor: `var(${c.var})`,
                  borderColor: "var(--border)",
                  borderRadius: "var(--radius)",
                }}
              />
              <div className="text-xs" style={{ color: "var(--foreground-muted)" }}>
                {c.name}
              </div>
              <div
                className="font-mono text-[10px]"
                style={{ color: "var(--muted-foreground)" }}
              >
                {vars[c.var]}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* // THEME_INFO */}
      <div className="mt-6 mb-6 text-center text-sm" style={{ color: "var(--foreground-muted)" }}>
        <strong>{themeLabel}</strong> — {themeDescription}
      </div>
    </div>
  )
}
