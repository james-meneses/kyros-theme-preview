import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";
import { transitions, variants } from "@/lib/motion";
import { chartColors } from "@/lib/motion";
import {
  Activity, Bot, DollarSign, GitPullRequest,
  TrendingUp, Zap, Clock,
} from "lucide-react";
import { AgentAvatar } from "@/components/AgentAvatar";
import {
  ResponsiveContainer, LineChart, Line, AreaChart, Area,
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  Legend,
} from "recharts";

/* ── Mock Data ── */

const sprintVelocity = [
  { sprint: "S8", completed: 6, total: 8, velocity: 75 },
  { sprint: "S9", completed: 7, total: 8, velocity: 88 },
  { sprint: "S10", completed: 9, total: 10, velocity: 90 },
  { sprint: "S11", completed: 8, total: 9, velocity: 89 },
  { sprint: "S12", completed: 8, total: 8, velocity: 100 },
  { sprint: "S13", completed: 7, total: 8, velocity: 88 },
  { sprint: "S14", completed: 9, total: 9, velocity: 100 },
  { sprint: "S15", completed: 7, total: 8, velocity: 88 },
];

const tokenUsage = [
  { day: "Mon", prompt: 42000, completion: 12000 },
  { day: "Tue", prompt: 38000, completion: 9800 },
  { day: "Wed", prompt: 51000, completion: 15200 },
  { day: "Thu", prompt: 45000, completion: 11400 },
  { day: "Fri", prompt: 62000, completion: 18600 },
  { day: "Sat", prompt: 28000, completion: 7200 },
  { day: "Sun", prompt: 15000, completion: 4100 },
];

const costBreakdown = [
  { name: "Claude Sonnet", value: 12.40, color: chartColors.categorical[0] },
  { name: "Claude Opus", value: 8.20, color: chartColors.categorical[1] },
  { name: "Claude Haiku", value: 3.10, color: chartColors.categorical[2] },
  { name: "Embedding", value: 0.90, color: chartColors.categorical[3] },
];

const agentActivity = [
  { hour: "8am", active: 3, reviewing: 1, idle: 17 },
  { hour: "9am", active: 8, reviewing: 2, idle: 11 },
  { hour: "10am", active: 12, reviewing: 3, idle: 6 },
  { hour: "11am", active: 15, reviewing: 4, idle: 2 },
  { hour: "12pm", active: 10, reviewing: 2, idle: 9 },
  { hour: "1pm", active: 14, reviewing: 3, idle: 4 },
  { hour: "2pm", active: 16, reviewing: 5, idle: 0 },
  { hour: "3pm", active: 13, reviewing: 2, idle: 6 },
  { hour: "4pm", active: 8, reviewing: 1, idle: 12 },
  { hour: "5pm", active: 4, reviewing: 0, idle: 17 },
];

const agents = [
  { name: "Akira", role: "ORCHESTRATOR", color: "#3ECF8E", status: "ACTIVE", task: "OAuth2 token refresh with Redis caching", tokens: 14820, cost: "$0.12" },
  { name: "Zara", role: "ARCHITECT", color: "#38BDF8", status: "ACTIVE", task: "Dashboard notification panel", tokens: 9340, cost: "$0.08" },
  { name: "Grace", role: "BACKEND_DEV", color: "#A78BFA", status: "REVIEWING", task: "Review PR #247 — event bus refactor", tokens: 6210, cost: "$0.05" },
  { name: "Atlas", role: "FE_ARCHITECT", color: "#FB923C", status: "ACTIVE", task: "E2E tests for dispatch pipeline", tokens: 11450, cost: "$0.09" },
  { name: "Echo", role: "QA_ENGINEER", color: "#22D3EE", status: "ERROR", task: "Docker compose health-check timeout", tokens: 3780, cost: "$0.03" },
  { name: "Lyra", role: "FRONTEND_DEV", color: "#F472B6", status: "IDLE", task: "—", tokens: 0, cost: "$0.00" },
];

const statusColor: Record<string, string> = {
  ACTIVE: "#22C55E",
  REVIEWING: "#FBBF24",
  IDLE: "#6B7280",
  ERROR: "#EF4444",
};

const stats = [
  { label: "ACTIVE_TASKS", value: "12", icon: Activity, change: "+3", positive: true },
  { label: "AGENTS_ONLINE", value: "16/21", icon: Bot, change: "76%", positive: true },
  { label: "SPRINT_VELOCITY", value: "94%", icon: TrendingUp, change: "+6%", positive: true },
  { label: "AVG_COST", value: "$0.079", icon: DollarSign, change: "-12%", positive: true },
  { label: "OPEN_PRS", value: "4", icon: GitPullRequest, change: "2 ready", positive: true },
  { label: "QUEUE_DEPTH", value: "3", icon: Clock, change: "LOW", positive: true },
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

export function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <motion.div {...variants.slideUp}>
        <p className="mb-2 text-xs font-mono uppercase tracking-[0.3em]" style={{ color: "var(--primary)" }}>
          [ LIVE_DASHBOARD ]
        </p>
        <h1 className="mb-4 text-4xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
          Command <span style={{ color: "var(--primary)" }}>Center</span>
        </h1>
        <p className="mb-12 text-lg" style={{ color: "var(--foreground-muted)" }}>
          Real Kyros metrics. Real agent data. Real-time visibility.
        </p>
      </motion.div>

      {/* ── Stats Grid ── */}
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8"
        variants={variants.stagger}
        initial="initial"
        animate="animate"
      >
        {stats.map((s) => (
          <motion.div key={s.label} variants={variants.slideUp}>
            <Card className="h-full">
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <s.icon className="h-4 w-4" style={{ color: "var(--primary)" }} strokeWidth={1.5} />
                  <span className="text-[10px] font-mono" style={{ color: s.positive ? "#22C55E" : "#EF4444" }}>
                    {s.change}
                  </span>
                </div>
                <div className="text-2xl font-bold" style={{ color: "var(--primary)", fontFamily: "var(--font-heading)" }}>
                  {s.value}
                </div>
                <div className="text-[10px] font-mono uppercase tracking-wider" style={{ color: "var(--foreground-muted)" }}>
                  {s.label}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Charts Row 1 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Sprint Velocity */}
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
                  <p className="text-xs font-mono" style={{ color: "var(--primary)" }}>// SPRINT_VELOCITY</p>
                  <h3 className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)" }}>Velocity Trend</h3>
                </div>
                <Badge variant="outline">Last 8 sprints</Badge>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={sprintVelocity}>
                  <defs>
                    <linearGradient id="velocityGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={chartColors.primary} stopOpacity={0.3} />
                      <stop offset="100%" stopColor={chartColors.primary} stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#252525" strokeDasharray="3 3" strokeOpacity={0.4} />
                  <XAxis dataKey="sprint" stroke="#666" fontSize={11} fontFamily="var(--font-mono)" />
                  <YAxis stroke="#666" fontSize={11} fontFamily="var(--font-mono)" domain={[60, 100]} />
                  <RechartsTooltip content={<ChartTooltip />} />
                  <Area type="monotone" dataKey="velocity" stroke={chartColors.primary} fill="url(#velocityGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Cost Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, ...transitions.enter }}
        >
          <Card className="h-full">
            <CardContent>
              <p className="text-xs font-mono mb-1" style={{ color: "var(--primary)" }}>// COST_BREAKDOWN</p>
              <h3 className="text-lg font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>Weekly Cost</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={costBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {costBreakdown.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip content={<ChartTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="text-center -mt-2">
                <div className="text-2xl font-bold" style={{ color: "var(--primary)", fontFamily: "var(--font-heading)" }}>
                  ${costBreakdown.reduce((a, b) => a + b.value, 0).toFixed(2)}
                </div>
                <div className="text-[10px] font-mono" style={{ color: "var(--foreground-muted)" }}>TOTAL_THIS_WEEK</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* ── Charts Row 2 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Token Usage */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={transitions.enter}
        >
          <Card>
            <CardContent>
              <p className="text-xs font-mono mb-1" style={{ color: "var(--primary)" }}>// TOKEN_USAGE</p>
              <h3 className="text-lg font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>Daily Token Usage</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={tokenUsage}>
                  <CartesianGrid stroke="#252525" strokeDasharray="3 3" strokeOpacity={0.4} />
                  <XAxis dataKey="day" stroke="#666" fontSize={11} fontFamily="var(--font-mono)" />
                  <YAxis stroke="#666" fontSize={11} fontFamily="var(--font-mono)" tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}K`} />
                  <RechartsTooltip content={<ChartTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 11, fontFamily: "var(--font-mono)" }} />
                  <Bar dataKey="prompt" name="Prompt" fill={chartColors.cyan} radius={[2, 2, 0, 0]} />
                  <Bar dataKey="completion" name="Completion" fill={chartColors.secondary} radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Agent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, ...transitions.enter }}
        >
          <Card>
            <CardContent>
              <p className="text-xs font-mono mb-1" style={{ color: "var(--primary)" }}>// AGENT_ACTIVITY</p>
              <h3 className="text-lg font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>Activity by Hour</h3>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={agentActivity}>
                  <CartesianGrid stroke="#252525" strokeDasharray="3 3" strokeOpacity={0.4} />
                  <XAxis dataKey="hour" stroke="#666" fontSize={11} fontFamily="var(--font-mono)" />
                  <YAxis stroke="#666" fontSize={11} fontFamily="var(--font-mono)" />
                  <RechartsTooltip content={<ChartTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 11, fontFamily: "var(--font-mono)" }} />
                  <Line type="monotone" dataKey="active" name="Active" stroke={chartColors.green} strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="reviewing" name="Reviewing" stroke={chartColors.amber} strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="idle" name="Idle" stroke="#666" strokeWidth={1} dot={false} strokeDasharray="4 4" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* ── Agent Status Table ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={transitions.enter}
      >
        <Card className="p-0">
          <CardContent>
            <div
              className="px-4 py-3 border-b"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-secondary)" }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4" style={{ color: "var(--primary)" }} />
                  <span className="text-xs font-mono uppercase tracking-wider" style={{ color: "var(--primary)" }}>
                    AGENT_STATUS
                  </span>
                </div>
                <Badge variant="outline">{agents.filter(a => a.status === "ACTIVE").length} active</Badge>
              </div>
            </div>
            <Table className="min-w-[700px]">
              <TableHeader>
                <TableRow style={{ backgroundColor: "var(--bg-secondary)" }}>
                  {["AGENT", "ROLE", "STATUS", "CURRENT_TASK", "TOKENS", "COST"].map((col) => (
                    <TableHead
                      key={col}
                      className="px-4 py-2.5 text-[10px] font-mono font-semibold uppercase tracking-wider"
                      style={{ color: "var(--foreground-muted)" }}
                    >
                      {col}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {agents.map((agent) => (
                  <TableRow key={agent.name} className="transition-colors hover:bg-white/5">
                    <TableCell className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <AgentAvatar name={agent.name} color={agent.color} size={32} />
                        <span className="font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
                          {agent.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <Badge variant="secondary">[{agent.role}]</Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <span className="inline-flex items-center gap-2 text-xs">
                        <span
                          className="inline-block h-2 w-2 rounded-full"
                          style={{
                            backgroundColor: statusColor[agent.status],
                            boxShadow: agent.status === "ACTIVE" ? `0 0 6px ${statusColor[agent.status]}80` : undefined,
                          }}
                        />
                        <span style={{ color: statusColor[agent.status] }}>{agent.status}</span>
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3 max-w-[260px] truncate text-xs" style={{ color: "var(--foreground-muted)" }}>
                      {agent.task}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-right font-mono text-xs tabular-nums" style={{ color: "var(--foreground-muted)" }}>
                      {agent.tokens > 0 ? agent.tokens.toLocaleString() : "—"}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-right font-mono text-xs" style={{ color: "var(--foreground-muted)" }}>
                      {agent.cost}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Live Indicators ── */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent>
            <div className="flex items-center gap-2 mb-3">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full animate-pulse"
                style={{ backgroundColor: "#22C55E", boxShadow: "0 0 8px #22C55E60" }}
              />
              <span className="text-xs font-mono" style={{ color: "var(--foreground-muted)" }}>SYSTEM_STATUS</span>
            </div>
            <div className="text-xl font-bold" style={{ color: "#22C55E", fontFamily: "var(--font-heading)" }}>
              All Systems Operational
            </div>
            <p className="text-xs mt-1" style={{ color: "var(--foreground-muted)" }}>
              Last incident: 3 days ago
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <p className="text-xs font-mono mb-2" style={{ color: "var(--foreground-muted)" }}>CURRENT_SPRINT</p>
            <div className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Phase 4.25
            </div>
            <Progress value={78} className="mb-2" />
            <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>75/96 plans completed (78%)</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <p className="text-xs font-mono mb-2" style={{ color: "var(--foreground-muted)" }}>LINES_SHIPPED_TODAY</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold" style={{ color: "var(--primary)", fontFamily: "var(--font-heading)" }}>
                2,847
              </span>
              <span className="text-xs" style={{ color: "#22C55E" }}>
                <TrendingUp className="inline h-3 w-3 mr-0.5" />
                +340
              </span>
            </div>
            <p className="text-xs mt-1" style={{ color: "var(--foreground-muted)" }}>Across 14 files, 6 agents</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
