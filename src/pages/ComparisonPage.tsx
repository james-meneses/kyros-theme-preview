import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";
import {
  sectionStagger, sectionChild, scrollReveal,
} from "@/lib/motion";
import {
  Check, X as XIcon, Users, Eye, Rocket, ArrowRight,
} from "lucide-react";
import { transitions } from "@/lib/motion";

/* ── Comparison Data ── */

const features = [
  {
    feature: "Multi-agent teams",
    kyros: "21 agents",
    devin: "Single agent",
    copilot: "Single agent + workspace",
    cursor: "Single agent",
    factory: "Droids (limited)",
  },
  {
    feature: "Agent orchestration",
    kyros: "Sprint-based",
    devin: "Manual",
    copilot: "Basic",
    cursor: "None",
    factory: "Missions",
  },
  {
    feature: "Code review by AI",
    kyros: "Cross-agent review",
    devin: "Self-review",
    copilot: "Basic",
    cursor: "None",
    factory: "Limited",
  },
  {
    feature: "Real-time dashboard",
    kyros: "Full visibility",
    devin: "None",
    copilot: "None",
    cursor: "None",
    factory: "Basic",
  },
  {
    feature: "Knowledge graph",
    kyros: "Institutional memory",
    devin: "None",
    copilot: "Codebase index",
    cursor: "None",
    factory: "None",
  },
  {
    feature: "Cost per month",
    kyros: "From $299",
    devin: "$500/seat",
    copilot: "$39/seat",
    cursor: "$20/seat",
    factory: "Custom",
  },
  {
    feature: "Governance",
    kyros: "Budget, boundaries, gates",
    devin: "None",
    copilot: "Basic",
    cursor: "None",
    factory: "Basic",
  },
];

const columns = ["Feature", "Kyros", "Devin", "GitHub Copilot", "Cursor", "Factory"];

function CellValue({ value, isKyros }: { value: string; isKyros: boolean }) {
  const isNone = value.toLowerCase() === "none";
  if (isKyros) {
    return (
      <span className="inline-flex items-center gap-1.5 font-semibold" style={{ color: "var(--primary)" }}>
        <Check className="h-3.5 w-3.5 shrink-0" />
        {value}
      </span>
    );
  }
  if (isNone) {
    return (
      <span className="inline-flex items-center gap-1.5" style={{ color: "var(--foreground-muted)", opacity: 0.5 }}>
        <XIcon className="h-3.5 w-3.5 shrink-0" />
        {value}
      </span>
    );
  }
  return <span style={{ color: "var(--foreground-muted)" }}>{value}</span>;
}

const whyCards = [
  {
    icon: Users,
    title: "Not a copilot. A team.",
    description: "21 agents across 5 specialized teams — architecture, backend, frontend, security, and QA. Each with defined roles, boundaries, and review authority.",
  },
  {
    icon: Eye,
    title: "Full visibility, zero micromanagement",
    description: "Real-time dashboard shows every agent, every task, every cost. Sprint progress, blockers, quality metrics — all live, all the time.",
  },
  {
    icon: Rocket,
    title: "Ship in days, not months",
    description: "From spec to production code. Agents build in parallel, review each other's work, and deliver governed, tested software at 6x the speed.",
  },
];

export function ComparisonPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 md:py-20">
      {/* ── Header ── */}
      <motion.section className="mb-12 sm:mb-16 md:mb-20 lg:mb-24 text-center" {...sectionStagger}>
        <motion.div {...sectionChild}>
          <p className="mb-3 text-xs font-mono uppercase tracking-[0.3em]" style={{ color: "var(--primary)" }}>
            [ COMPETITIVE_EDGE ]
          </p>
          <h1 className="mb-4 text-4xl sm:text-5xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
            How Kyros <span style={{ color: "var(--primary)" }}>Compares</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base sm:text-lg" style={{ color: "var(--foreground-muted)" }}>
            The only platform with multi-agent orchestration, governance, and full visibility.
          </p>
        </motion.div>
      </motion.section>

      {/* ── Comparison Table ── */}
      <motion.section className="mb-12 sm:mb-16 md:mb-24 lg:mb-32" {...sectionStagger}>
        <motion.div {...sectionChild}>
          <Card className="overflow-hidden p-0">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table className="min-w-[900px]">
                  <TableHeader>
                    <TableRow style={{ backgroundColor: "var(--bg-secondary)" }}>
                      {columns.map((col, i) => (
                        <TableHead
                          key={col}
                          className="px-4 py-3 text-[10px] font-mono font-semibold uppercase tracking-wider"
                          style={{
                            color: i === 1 ? "var(--primary)" : "var(--foreground-muted)",
                            backgroundColor: i === 1 ? "var(--accent-muted)" : undefined,
                          }}
                        >
                          {col}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {features.map((row) => (
                      <TableRow key={row.feature} className="transition-colors hover:bg-white/5">
                        <TableCell
                          className="px-4 py-3 font-semibold text-sm"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          {row.feature}
                        </TableCell>
                        <TableCell
                          className="px-4 py-3 text-xs"
                          style={{ backgroundColor: "var(--accent-muted)" }}
                        >
                          <CellValue value={row.kyros} isKyros />
                        </TableCell>
                        <TableCell className="px-4 py-3 text-xs">
                          <CellValue value={row.devin} isKyros={false} />
                        </TableCell>
                        <TableCell className="px-4 py-3 text-xs">
                          <CellValue value={row.copilot} isKyros={false} />
                        </TableCell>
                        <TableCell className="px-4 py-3 text-xs">
                          <CellValue value={row.cursor} isKyros={false} />
                        </TableCell>
                        <TableCell className="px-4 py-3 text-xs">
                          <CellValue value={row.factory} isKyros={false} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.section>

      {/* ── Why Teams Choose Kyros ── */}
      <motion.section className="mb-16" {...sectionStagger}>
        <motion.div {...sectionChild}>
          <p className="mb-3 text-xs font-mono uppercase tracking-[0.2em]" style={{ color: "var(--primary)" }}>
            // WHY_KYROS
          </p>
          <h2 className="mb-8 text-3xl sm:text-4xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
            Why teams choose Kyros
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {whyCards.map((card) => (
            <motion.div key={card.title} {...sectionChild}>
              <Card className="h-full group hover:ring-1 hover:ring-primary/20 transition-all">
                <CardContent className="flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{ backgroundColor: "var(--accent-muted)" }}
                    >
                      <card.icon className="h-5 w-5" style={{ color: "var(--primary)" }} />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── CTA ── */}
      <motion.section className="mb-16" {...scrollReveal}>
        <div className="text-center py-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Ready to see it in action?
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
