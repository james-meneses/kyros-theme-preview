import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Input } from "@/components/ui/input"

/* ─────────────────────────────────────────────────
   Mock data
   ───────────────────────────────────────────────── */

const stats = [
  { label: "ACTIVE_TASKS", value: "12", indicator: "green-dot" as const },
  { label: "AGENTS_ONLINE", value: "6/8", indicator: "progress" as const, progress: 75 },
  { label: "SPRINT_VELOCITY", value: "94%", indicator: "arrow-up" as const },
  { label: "QUEUE_DEPTH", value: "3", indicator: "badge" as const },
]

const agents = [
  { name: "Akira", role: "BACKEND_DEV", status: "ACTIVE" as const, task: "Implement OAuth2 token refresh flow with Redis caching", tokens: 14_820 },
  { name: "Zara", role: "FRONTEND_DEV", status: "ACTIVE" as const, task: "Build dashboard notification panel with WebSocket integration", tokens: 9_340 },
  { name: "Grace", role: "ARCHITECT", status: "REVIEWING" as const, task: "Review PR #247 — event bus refactor + migration scripts", tokens: 6_210 },
  { name: "Atlas", role: "QA_ENGINEER", status: "ACTIVE" as const, task: "Write E2E tests for dispatch pipeline happy path", tokens: 11_450 },
  { name: "Dieter", role: "UI_DESIGNER", status: "IDLE" as const, task: "—", tokens: 0 },
  { name: "Ada", role: "DEVOPS", status: "ERROR" as const, task: "Fix Docker compose health-check timeout on staging", tokens: 3_780 },
]

const activityLog = [
  { time: "14:32:07", agent: "Akira", action: "Completed task T-1042: OAuth2 token refresh", type: "completed" as const },
  { time: "14:31:45", agent: "Atlas", action: "Running E2E suite — 42/79 passing", type: "in-progress" as const },
  { time: "14:30:12", agent: "Ada", action: "Deploy failed: health-check timeout after 30s", type: "error" as const },
  { time: "14:28:55", agent: "Grace", action: "Requested changes on PR #247 — missing migration", type: "in-progress" as const },
  { time: "14:27:30", agent: "Zara", action: "Started task T-1044: notification panel", type: "in-progress" as const },
]

const priorityOptions = ["P0_CRITICAL", "P1_HIGH", "P2_STANDARD"]
const assignableAgents = ["Akira", "Zara", "Grace", "Atlas", "Ada"]

/* ─────────────────────────────────────────────────
   Helpers
   ───────────────────────────────────────────────── */

const statusColor: Record<string, string> = {
  ACTIVE: "#22C55E",
  REVIEWING: "#FBBF24",
  IDLE: "#6B7280",
  ERROR: "#EF4444",
}

const activityColor: Record<string, string> = {
  completed: "#22C55E",
  "in-progress": "#FBBF24",
  error: "#EF4444",
}

/* ─────────────────────────────────────────────────
   Component
   ───────────────────────────────────────────────── */

export function DashboardSection() {
  return (
    <section className="mb-24">
      {/* // DASHBOARD_PREVIEW */}
      <p
        className="mb-2 text-xs font-mono uppercase tracking-[0.2em]"
        style={{ color: "var(--primary)" }}
      >
        // DASHBOARD_PREVIEW
      </p>
      <h2
        className="mb-8 text-3xl font-bold"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Real product. Real patterns.
      </h2>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-[10px] font-mono uppercase tracking-wider"
                  style={{ color: "var(--foreground-muted)" }}
                >
                  {s.label}
                </span>
                {s.indicator === "green-dot" && (
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: "#22C55E", boxShadow: "0 0 6px #22C55E80" }}
                  />
                )}
                {s.indicator === "arrow-up" && (
                  <span className="text-xs" style={{ color: "#22C55E" }}>&#9650;</span>
                )}
                {s.indicator === "badge" && (
                  <Badge variant="outline" className="text-[10px]">[LOW]</Badge>
                )}
              </div>
              <div
                className="text-2xl font-bold"
                style={{ color: "var(--primary)", fontFamily: "var(--font-heading)" }}
              >
                {s.value}
              </div>
              {s.indicator === "progress" && (
                <div
                  className="mt-2 h-1.5 w-full overflow-hidden"
                  style={{
                    backgroundColor: "var(--muted)",
                    borderRadius: "var(--radius)",
                  }}
                >
                  <div
                    className="h-full transition-all"
                    style={{
                      width: `${s.progress}%`,
                      backgroundColor: "var(--primary)",
                      borderRadius: "var(--radius)",
                    }}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Agent Status Table ── */}
      <Card className="mb-6 p-0">
        <CardContent>
          <div
            className="px-4 py-3 border-b"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-secondary)" }}
          >
            <span
              className="text-xs font-mono uppercase tracking-wider"
              style={{ color: "var(--primary)" }}
            >
              // AGENT_STATUS
            </span>
          </div>
          <Table className="min-w-[600px]" style={{ fontFamily: "var(--font-body)" }}>
            <TableHeader>
              <TableRow
                style={{ backgroundColor: "var(--bg-secondary)" }}
              >
                {["AGENT", "ROLE", "STATUS", "CURRENT_TASK", "TOKENS"].map((col) => (
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
              {agents.map((agent, i) => (
                <TableRow
                  key={agent.name}
                  className={`transition-colors hover:bg-accent/10 ${i % 2 === 0 ? "bg-card" : "bg-bg-secondary"}`}
                >
                  <TableCell className="px-4 py-3 font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
                    {agent.name}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <Badge variant="secondary">[{agent.role}]</Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <span className="inline-flex items-center gap-2 text-xs">
                      <span
                        className="inline-block h-2 w-2 rounded-full"
                        style={{ backgroundColor: statusColor[agent.status] }}
                      />
                      <span style={{ color: statusColor[agent.status] }}>{agent.status}</span>
                    </span>
                  </TableCell>
                  <TableCell
                    className="px-4 py-3 max-w-[260px] truncate text-xs"
                    style={{ color: "var(--foreground-muted)" }}
                  >
                    {agent.task}
                  </TableCell>
                  <TableCell
                    className="px-4 py-3 text-right font-mono text-xs tabular-nums"
                    style={{ color: "var(--foreground-muted)" }}
                  >
                    {agent.tokens > 0 ? agent.tokens.toLocaleString() : "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ── Bottom Row: Form + Activity Feed ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* ── Dispatch Form ── */}
        <Card className="lg:col-span-3 p-0">
          <CardContent>
            <div
              className="px-4 py-3 border-b"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-secondary)" }}
            >
              <span
                className="text-xs font-mono uppercase tracking-wider"
                style={{ color: "var(--primary)" }}
              >
                // DISPATCH_TASK
              </span>
            </div>
            <div className="p-4 space-y-4">
              {/* Task description */}
              <div>
                <label
                  className="block mb-1.5 text-[10px] font-mono uppercase tracking-wider"
                  style={{ color: "var(--foreground-muted)" }}
                >
                  TASK_DESCRIPTION
                </label>
                <Input
                  type="text"
                  readOnly
                  defaultValue="Add rate limiting to public API endpoints"
                  className="h-10 px-3 py-2 text-sm"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    color: "var(--foreground)",
                    fontFamily: "var(--font-body)",
                  }}
                />
              </div>

              {/* Priority select — with validation error */}
              <div>
                <label
                  className="block mb-1.5 text-[10px] font-mono uppercase tracking-wider"
                  style={{ color: "var(--foreground-muted)" }}
                >
                  PRIORITY
                </label>
                <select
                  className="w-full h-10 px-3 py-2 text-sm border outline-none"
                  defaultValue=""
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "#EF4444",
                    borderRadius: "var(--radius)",
                    color: "var(--foreground)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  <option value="" disabled>Select priority...</option>
                  {priorityOptions.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                <p
                  className="mt-1 text-xs"
                  style={{ color: "#EF4444", fontFamily: "var(--font-mono)" }}
                >
                  [ERROR] Priority is required for dispatch
                </p>
              </div>

              {/* Agent checkboxes */}
              <div>
                <label
                  className="block mb-2 text-[10px] font-mono uppercase tracking-wider"
                  style={{ color: "var(--foreground-muted)" }}
                >
                  ASSIGN_AGENTS
                </label>
                <div className="flex flex-wrap gap-3">
                  {assignableAgents.map((name, i) => (
                    <label
                      key={name}
                      className="inline-flex items-center gap-2 text-sm cursor-pointer"
                      style={{ color: "var(--foreground)" }}
                    >
                      <input
                        type="checkbox"
                        readOnly
                        defaultChecked={i < 2}
                        className="accent-current"
                        style={{ accentColor: "var(--primary)" }}
                      />
                      {name}
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button
                className="w-full px-4 py-2.5 text-sm font-semibold transition-all hover:opacity-90 cursor-pointer"
                style={{
                  backgroundColor: "var(--primary)",
                  color: "var(--primary-foreground)",
                  borderRadius: "var(--radius)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                DISPATCH →
              </button>
            </div>
          </CardContent>
        </Card>

        {/* ── Activity Feed ── */}
        <Card className="lg:col-span-2 p-0">
          <CardContent>
            <div
              className="px-4 py-3 border-b"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-secondary)" }}
            >
              <span
                className="text-xs font-mono uppercase tracking-wider"
                style={{ color: "var(--primary)" }}
              >
                // ACTIVITY_LOG
              </span>
            </div>
            <div className="divide-y divide-border">
              {activityLog.map((entry, i) => (
                <div
                  key={i}
                  className="px-4 py-3 flex flex-col gap-1"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[10px] tabular-nums"
                      style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-mono)" }}
                    >
                      {entry.time}
                    </span>
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: activityColor[entry.type] }}
                    />
                    <span
                      className="text-xs font-semibold"
                      style={{ color: activityColor[entry.type] }}
                    >
                      {entry.agent}
                    </span>
                  </div>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--foreground-muted)" }}
                  >
                    {entry.action}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
