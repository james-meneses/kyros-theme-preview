import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { transitions, variants } from "@/lib/motion";
import { chartColors } from "@/lib/motion";
import {
  TrendingUp, Calendar, Target, CheckCircle2,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";

/* ── Mock Data ── */

const stats = [
  { label: "PROJECT_PROGRESS", value: "88%", progress: 88, icon: Target, sub: "On track" },
  { label: "BUDGET_HEALTH", value: "$24.60 / $500.00", sub: "4.9% used", icon: TrendingUp },
  { label: "SPRINT_VELOCITY", value: "94%", sub: "+6% vs last", icon: TrendingUp },
  { label: "DAYS_TO_MVP", value: "12", sub: "Target: Mar 31", icon: Calendar },
];

const phaseTimeline = [
  { phase: "Foundation", planned: 100, actual: 100 },
  { phase: "Observability", planned: 100, actual: 100 },
  { phase: "Intelligence", planned: 100, actual: 100 },
  { phase: "Dashboard", planned: 100, actual: 88 },
  { phase: "Launch", planned: 100, actual: 0 },
];

const milestones = [
  { label: "Core Engine", date: "Feb 10", status: "done" },
  { label: "Observability", date: "Feb 24", status: "done" },
  { label: "Intelligence", date: "Mar 5", status: "done" },
  { label: "Dashboard", date: "Mar 19", status: "current" },
  { label: "Launch", date: "Mar 31", status: "upcoming" },
];

const teamOutput = [
  { metric: "PRs Merged", count: 13 },
  { metric: "Issues Closed", count: 21 },
  { metric: "Commits", count: 87 },
  { metric: "Tests Added", count: 34 },
];

const budgetBreakdown = [
  { name: "AI Compute", value: 12.40, color: chartColors.categorical[0] },
  { name: "Infrastructure", value: 6.20, color: chartColors.categorical[1] },
  { name: "Dev Tools", value: 3.80, color: chartColors.categorical[2] },
  { name: "Reserve", value: 2.20, color: chartColors.categorical[3] },
];

const risks = [
  { text: "Production rate limiting config needed", severity: "Medium", color: chartColors.amber },
  { text: "E2E test baselines pending", severity: "Low", color: chartColors.blue },
  { text: "Market window: 4 weeks remaining", severity: "Low", color: chartColors.blue },
];

const decisions = [
  { text: "Sprint 7 kick-off", badge: "Awaiting" },
  { text: "Cloud provider selection", badge: "In Discussion" },
  { text: "Beta user onboarding flow", badge: "Planned" },
];

/* ── Custom Tooltip ── */
function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-md border px-3 py-2 text-xs shadow-lg"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border)",
        color: "var(--foreground)",
      }}
    >
      <p className="font-mono mb-1" style={{ color: "var(--foreground-muted)" }}>{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: {typeof p.value === "number" ? p.value.toLocaleString() : p.value}
        </p>
      ))}
    </div>
  );
}

export function CeoDashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      {/* ── Header ── */}
      <motion.div {...variants.slideUp}>
        <p className="mb-2 text-xs font-mono uppercase tracking-[0.3em]" style={{ color: "var(--primary)" }}>
          [ EXECUTIVE_OVERVIEW ]
        </p>
        <h1 className="mb-4 text-4xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
          Executive <span style={{ color: "var(--primary)" }}>Overview</span>
        </h1>
        <p className="mb-12 text-lg" style={{ color: "var(--foreground-muted)" }}>
          Real-time project health for decision-makers
        </p>
      </motion.div>

      {/* ── Stats Row ── */}
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        variants={variants.stagger}
        initial="initial"
        animate="animate"
      >
        {stats.map((s) => (
          <motion.div key={s.label} variants={variants.slideUp}>
            <Card className="h-full">
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <s.icon className="h-4 w-4" style={{ color: "var(--foreground)" }} strokeWidth={1.5} />
                  <span className="text-[10px] font-mono" style={{ color: "#22C55E" }}>
                    {s.sub}
                  </span>
                </div>
                <div className="text-2xl font-bold" style={{ color: "var(--primary)", fontFamily: "var(--font-heading)" }}>
                  {s.value}
                </div>
                <div className="text-[10px] font-mono uppercase tracking-wider" style={{ color: "var(--foreground-muted)" }}>
                  {s.label}
                </div>
                {s.progress && <Progress value={s.progress} className="mt-2" />}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Charts Row 1: Timeline + Budget ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Phase Completion Trajectory */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={transitions.enter}
        >
          <Card className="h-full">
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs font-mono" style={{ color: "var(--primary)" }}>// PHASE_TRAJECTORY</p>
                  <h3 className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)" }}>Phase Completion Trajectory</h3>
                </div>
                <Badge variant="outline">5 phases</Badge>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={phaseTimeline}>
                  <defs>
                    <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={chartColors.primary} stopOpacity={0.3} />
                      <stop offset="100%" stopColor={chartColors.primary} stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#252525" strokeDasharray="3 3" strokeOpacity={0.4} />
                  <XAxis dataKey="phase" stroke="#666" fontSize={11} fontFamily="var(--font-mono)" />
                  <YAxis stroke="#666" fontSize={11} fontFamily="var(--font-mono)" domain={[0, 100]} />
                  <RechartsTooltip content={<ChartTooltip />} />
                  <Area type="monotone" dataKey="planned" stroke="#666" fill="none" strokeWidth={1} strokeDasharray="4 4" name="Planned" />
                  <Area type="monotone" dataKey="actual" stroke={chartColors.primary} fill="url(#actualGrad)" strokeWidth={2} name="Actual" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Budget Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, ...transitions.enter }}
        >
          <Card className="h-full">
            <CardContent>
              <p className="text-xs font-mono mb-1" style={{ color: "var(--primary)" }}>// BUDGET_ALLOCATION</p>
              <h3 className="text-lg font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>Budget Allocation</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={budgetBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {budgetBreakdown.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip content={<ChartTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="text-center -mt-2">
                <div className="text-2xl font-bold" style={{ color: "var(--primary)", fontFamily: "var(--font-heading)" }}>
                  $24.60
                </div>
                <div className="text-[10px] font-mono" style={{ color: "var(--foreground-muted)" }}>TOTAL_SPEND</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* ── Milestone Tracker ── */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={transitions.enter}
      >
        <Card>
          <CardContent>
            <p className="text-xs font-mono mb-1" style={{ color: "var(--primary)" }}>// MILESTONES</p>
            <h3 className="text-lg font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>Milestone Tracker</h3>
            <div className="flex items-start justify-between overflow-x-auto">
              {milestones.map((m, i) => (
                <div key={m.label} className="flex flex-col items-center flex-1 min-w-[100px] relative">
                  {/* Connecting line */}
                  {i < milestones.length - 1 && (
                    <div
                      className="absolute top-3 left-1/2 w-full h-[2px]"
                      style={{
                        backgroundColor: m.status === "done" ? chartColors.green : "var(--border)",
                      }}
                    />
                  )}
                  {/* Circle */}
                  <div
                    className="relative z-10 flex items-center justify-center h-6 w-6 rounded-full border-2"
                    style={{
                      borderColor: m.status === "done"
                        ? chartColors.green
                        : m.status === "current"
                          ? "var(--primary)"
                          : "var(--border)",
                      backgroundColor: m.status === "done"
                        ? chartColors.green
                        : m.status === "current"
                          ? "transparent"
                          : "var(--bg-card)",
                      boxShadow: m.status === "current"
                        ? `0 0 12px var(--primary), 0 0 4px var(--primary)`
                        : undefined,
                    }}
                  >
                    {m.status === "done" && (
                      <CheckCircle2 className="h-4 w-4" style={{ color: "var(--bg)" }} />
                    )}
                    {m.status === "current" && (
                      <span
                        className="h-2 w-2 rounded-full animate-pulse"
                        style={{ backgroundColor: "var(--primary)" }}
                      />
                    )}
                  </div>
                  {/* Label */}
                  <span
                    className="mt-2 text-xs font-medium text-center"
                    style={{
                      color: m.status === "current"
                        ? "var(--primary)"
                        : m.status === "done"
                          ? "var(--foreground)"
                          : "var(--foreground-muted)",
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    {m.label}
                  </span>
                  <span className="text-[10px] font-mono" style={{ color: "var(--foreground-muted)" }}>
                    {m.date}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Charts Row 2: Team Output + Risk/Decisions ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Team Output */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={transitions.enter}
        >
          <Card className="h-full">
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs font-mono" style={{ color: "var(--primary)" }}>// TEAM_OUTPUT</p>
                  <h3 className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)" }}>Team Output — Last 7 Days</h3>
                </div>
                <Badge variant="outline">155 deliverables this week</Badge>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={teamOutput}>
                  <CartesianGrid stroke="#252525" strokeDasharray="3 3" strokeOpacity={0.4} />
                  <XAxis dataKey="metric" stroke="#666" fontSize={11} fontFamily="var(--font-mono)" />
                  <YAxis stroke="#666" fontSize={11} fontFamily="var(--font-mono)" />
                  <RechartsTooltip content={<ChartTooltip />} />
                  <Bar dataKey="count" name="Count" fill={chartColors.primary} radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Risk & Blockers + Key Decisions */}
        <div className="flex flex-col gap-6">
          {/* Risk & Blockers */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, ...transitions.enter }}
          >
            <Card>
              <CardContent>
                <p className="text-xs font-mono mb-1" style={{ color: "var(--primary)" }}>// RISK_BLOCKERS</p>
                <h3 className="text-lg font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>Risk & Blockers</h3>
                <div className="space-y-3">
                  {risks.map((r) => (
                    <div key={r.text} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className="inline-block h-2 w-2 rounded-full shrink-0"
                          style={{ backgroundColor: r.color }}
                        />
                        <span className="text-sm truncate" style={{ color: "var(--foreground-muted)" }}>
                          {r.text}
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        style={{
                          borderColor: r.color,
                          color: r.color,
                        }}
                      >
                        {r.severity}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Key Decisions */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, ...transitions.enter }}
          >
            <Card>
              <CardContent>
                <p className="text-xs font-mono mb-1" style={{ color: "var(--primary)" }}>// KEY_DECISIONS</p>
                <h3 className="text-lg font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>Key Decisions</h3>
                <div className="space-y-3">
                  {decisions.map((d) => (
                    <div key={d.text} className="flex items-center justify-between gap-3">
                      <span className="text-sm" style={{ color: "var(--foreground-muted)" }}>
                        {d.text}
                      </span>
                      <Badge variant="outline">{d.badge}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
