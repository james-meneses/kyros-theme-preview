import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";
import {
  sectionStagger, sectionChild, scrollReveal, transitions,
} from "@/lib/motion";
import {
  GitCommit, GitPullRequest, FileCode, Code2, Quote, ArrowRight,
} from "lucide-react";

/* ── Data ── */

const traditionalTeam = [
  { role: "Tech Lead", cost: "R$36,000" },
  { role: "Backend Developer (x2)", cost: "R$31,500" },
  { role: "Frontend Developer", cost: "R$28,800" },
  { role: "DevOps Engineer", cost: "R$27,000" },
  { role: "QA Engineer", cost: "R$23,400" },
  { role: "Project Manager", cost: "R$27,000" },
];

const kyrosCosts = [
  { item: "AI Compute (Claude, models)", cost: "~$150" },
  { item: "Infrastructure (servers, CI)", cost: "~$50/mo" },
  { item: "Time investment", cost: "29 days" },
];

const resultStats = [
  { value: "769", label: "Commits", icon: GitCommit },
  { value: "116", label: "PRs Merged", icon: GitPullRequest },
  { value: "527", label: "Source Files", icon: FileCode },
  { value: "87,006", label: "Lines of Code", icon: Code2 },
];

export function RoiPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 md:py-20">
      {/* ── Header ── */}
      <motion.section className="mb-12 sm:mb-16 md:mb-20 lg:mb-24 text-center" {...sectionStagger}>
        <motion.div {...sectionChild}>
          <p className="mb-3 text-xs font-mono uppercase tracking-[0.3em]" style={{ color: "var(--primary)" }}>
            [ ROI_CALCULATOR ]
          </p>
          <h1 className="mb-4 text-4xl sm:text-5xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
            The Business <span style={{ color: "var(--primary)" }}>Case</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base sm:text-lg" style={{ color: "var(--foreground-muted)" }}>
            Real numbers from a real project.
          </p>
        </motion.div>
      </motion.section>

      {/* ── Cost Comparison Cards ── */}
      <motion.section className="mb-12 sm:mb-16 md:mb-24" {...sectionStagger}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Traditional Team */}
          <motion.div {...sectionChild}>
            <Card className="h-full border-red-500/20">
              <CardContent>
                <div className="flex items-center gap-2 mb-6">
                  <Badge variant="destructive" className="text-[10px]">Traditional</Badge>
                </div>
                <h3 className="text-xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>
                  Traditional Development Team
                </h3>
                <Table>
                  <TableHeader>
                    <TableRow style={{ backgroundColor: "var(--bg-secondary)" }}>
                      <TableHead className="px-4 py-2 text-[10px] font-mono uppercase tracking-wider" style={{ color: "var(--foreground-muted)" }}>
                        Role
                      </TableHead>
                      <TableHead className="px-4 py-2 text-[10px] font-mono uppercase tracking-wider text-right" style={{ color: "var(--foreground-muted)" }}>
                        Monthly Cost
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {traditionalTeam.map((row) => (
                      <TableRow key={row.role} className="hover:bg-white/5">
                        <TableCell className="px-4 py-2.5 text-sm" style={{ color: "var(--foreground-muted)" }}>
                          {row.role}
                        </TableCell>
                        <TableCell className="px-4 py-2.5 text-sm font-mono text-right" style={{ color: "var(--foreground-muted)" }}>
                          {row.cost}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-6 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm" style={{ color: "var(--foreground-muted)" }}>Monthly total</span>
                    <span className="font-mono font-bold" style={{ color: "var(--destructive)" }}>R$205,200</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm" style={{ color: "var(--foreground-muted)" }}>Timeline</span>
                    <span className="font-mono text-sm" style={{ color: "var(--foreground-muted)" }}>4-6 months</span>
                  </div>
                  <div
                    className="text-center py-4 rounded-lg"
                    style={{ backgroundColor: "rgba(239, 68, 68, 0.08)" }}
                  >
                    <div className="text-xs font-mono uppercase mb-1" style={{ color: "var(--foreground-muted)" }}>
                      TOTAL_COST
                    </div>
                    <div className="text-3xl font-bold" style={{ color: "var(--destructive)", fontFamily: "var(--font-heading)" }}>
                      R$1,231,200
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Kyros */}
          <motion.div {...sectionChild}>
            <Card className="h-full" style={{ borderColor: "var(--primary)", borderWidth: 1 }}>
              <CardContent>
                <div className="flex items-center gap-2 mb-6">
                  <Badge className="text-[10px]">Kyros</Badge>
                </div>
                <h3 className="text-xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>
                  Kyros + 1 Technical Founder
                </h3>
                <Table>
                  <TableHeader>
                    <TableRow style={{ backgroundColor: "var(--bg-secondary)" }}>
                      <TableHead className="px-4 py-2 text-[10px] font-mono uppercase tracking-wider" style={{ color: "var(--foreground-muted)" }}>
                        Item
                      </TableHead>
                      <TableHead className="px-4 py-2 text-[10px] font-mono uppercase tracking-wider text-right" style={{ color: "var(--foreground-muted)" }}>
                        Cost
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {kyrosCosts.map((row) => (
                      <TableRow key={row.item} className="hover:bg-white/5">
                        <TableCell className="px-4 py-2.5 text-sm" style={{ color: "var(--foreground-muted)" }}>
                          {row.item}
                        </TableCell>
                        <TableCell className="px-4 py-2.5 text-sm font-mono text-right" style={{ color: "var(--foreground-muted)" }}>
                          {row.cost}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-6 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
                  <div
                    className="text-center py-4 rounded-lg"
                    style={{
                      backgroundColor: "var(--accent-muted)",
                      boxShadow: "0 0 40px var(--accent-muted)",
                    }}
                  >
                    <div className="text-xs font-mono uppercase mb-1" style={{ color: "var(--foreground-muted)" }}>
                      TOTAL_COST
                    </div>
                    <div className="text-3xl font-bold" style={{ color: "var(--primary)", fontFamily: "var(--font-heading)" }}>
                      ~R$1,500
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      {/* ── Results Stats ── */}
      <motion.section className="mb-12 sm:mb-16 md:mb-24" {...sectionStagger}>
        <motion.div {...sectionChild}>
          <p className="mb-3 text-xs font-mono uppercase tracking-[0.2em]" style={{ color: "var(--primary)" }}>
            // RESULTS_ACHIEVED
          </p>
          <h2 className="mb-8 text-3xl sm:text-4xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
            What was delivered
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {resultStats.map((stat) => (
            <motion.div key={stat.label} {...sectionChild}>
              <Card className="text-center">
                <CardContent>
                  <stat.icon className="h-5 w-5 mx-auto mb-3" style={{ color: "var(--primary)" }} />
                  <div className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--primary)", fontFamily: "var(--font-heading)" }}>
                    {stat.value}
                  </div>
                  <div className="text-xs font-mono uppercase mt-1" style={{ color: "var(--foreground-muted)" }}>
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Quote Block ── */}
      <motion.section className="mb-12 sm:mb-16 md:mb-24" {...scrollReveal}>
        <div
          className="text-center py-16 px-6 rounded-xl border"
          style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
        >
          <Quote className="mx-auto h-8 w-8 mb-6" style={{ color: "var(--primary)", opacity: 0.4 }} />
          <blockquote className="text-lg sm:text-xl md:text-2xl font-bold leading-relaxed mb-6 max-w-3xl mx-auto" style={{ fontFamily: "var(--font-heading)" }}>
            R$1.2M in dev costs{" "}
            <span style={{ color: "var(--destructive)" }}>&#8594;</span>{" "}
            <span style={{ color: "var(--primary)" }}>R$1,500</span> with Kyros.
            <br />
            Same output.
          </blockquote>
        </div>
      </motion.section>

      {/* ── Timeline Comparison ── */}
      <motion.section className="mb-16" {...sectionStagger}>
        <motion.div {...sectionChild}>
          <p className="mb-3 text-xs font-mono uppercase tracking-[0.2em]" style={{ color: "var(--primary)" }}>
            // DELIVERY_SPEED
          </p>
          <h2 className="mb-8 text-3xl sm:text-4xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
            Time to delivery
          </h2>
        </motion.div>

        <motion.div {...sectionChild}>
          <Card>
            <CardContent className="space-y-6">
              {/* Traditional */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
                    Traditional Team
                  </span>
                  <span className="text-xs font-mono" style={{ color: "var(--foreground-muted)" }}>
                    6 months
                  </span>
                </div>
                <div
                  className="h-8 rounded-md flex items-center px-3"
                  style={{ backgroundColor: "rgba(239, 68, 68, 0.15)", width: "100%" }}
                >
                  <span className="text-[10px] font-mono" style={{ color: "var(--destructive)" }}>
                    ████████████████████████████████████████████████████████████
                  </span>
                </div>
              </div>

              {/* Kyros */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
                    Kyros
                  </span>
                  <span className="text-xs font-mono" style={{ color: "var(--primary)" }}>
                    29 days
                  </span>
                </div>
                <div
                  className="h-8 rounded-md flex items-center px-3"
                  style={{
                    backgroundColor: "var(--accent-muted)",
                    width: "16%",
                    minWidth: 120,
                    boxShadow: "0 0 20px var(--accent-muted)",
                  }}
                >
                  <span className="text-[10px] font-mono" style={{ color: "var(--primary)" }}>
                    ████████
                  </span>
                </div>
              </div>

              {/* Speed multiplier */}
              <div className="text-center pt-4 border-t" style={{ borderColor: "var(--border)" }}>
                <span className="text-2xl font-bold" style={{ color: "var(--primary)", fontFamily: "var(--font-heading)" }}>
                  6.2x
                </span>
                <span className="text-sm ml-2" style={{ color: "var(--foreground-muted)" }}>
                  faster delivery
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.section>

      {/* ── CTA ── */}
      <motion.section className="mb-16" {...scrollReveal}>
        <div className="text-center py-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            See the ROI for your project
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-base" style={{ color: "var(--foreground-muted)" }}>
            First project ships free. Direct access to the founding team.
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
