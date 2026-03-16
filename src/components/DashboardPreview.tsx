import { motion } from "motion/react";
import { sectionStagger, sectionChild, transitions } from "@/lib/motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { dashboardCallouts } from "@/data/brand";

function Callout({ label, description, position }: {
  label: string;
  description: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
  const positionClasses = {
    "top-left": "top-4 left-4 sm:top-6 sm:left-6",
    "top-right": "top-4 right-4 sm:top-6 sm:right-6",
    "bottom-left": "bottom-4 left-4 sm:bottom-6 sm:left-6",
    "bottom-right": "bottom-4 right-4 sm:bottom-6 sm:right-6",
  };

  return (
    <div
      className={`absolute ${positionClasses[position]} hidden sm:block max-w-[180px] px-3 py-2 rounded-lg text-left`}
      style={{
        backgroundColor: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(8px)",
        border: "1px solid var(--border)",
      }}
    >
      <div className="text-[11px] font-semibold" style={{ color: "var(--primary)" }}>
        {label}
      </div>
      <div className="text-[10px] leading-snug mt-0.5" style={{ color: "var(--foreground-muted)" }}>
        {description}
      </div>
    </div>
  );
}

export function DashboardPreview() {
  return (
    <motion.section className="mb-12 sm:mb-16 md:mb-24 lg:mb-32" {...sectionStagger}>
      <motion.div {...sectionChild}>
        <div className="mb-8 md:mb-12 text-center">
          <p className="mb-3 text-xs font-mono uppercase tracking-[0.2em]" style={{ color: "var(--primary)" }}>
            // COMMAND_CENTER
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
            See everything. Control everything.
          </h2>
          <p className="mt-3 text-base mx-auto max-w-2xl" style={{ color: "var(--foreground-muted)" }}>
            Real-time visibility into every agent, every task, every dollar — from dispatch to merge.
          </p>
        </div>
      </motion.div>

      <motion.div {...sectionChild}>
        {/* Browser chrome frame */}
        <div
          className="rounded-xl overflow-hidden border"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}
        >
          {/* Title bar */}
          <div
            className="flex items-center gap-2 px-4 py-3 border-b"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-secondary)" }}
          >
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <div
              className="flex-1 text-center text-[11px] font-mono"
              style={{ color: "var(--foreground-muted)" }}
            >
              kyros.dev/dashboard
            </div>
          </div>

          {/* Dashboard mockup content */}
          <div className="relative p-4 sm:p-6 min-h-[300px] sm:min-h-[400px]">
            {/* Simulated dashboard grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {/* Stat cards */}
              {[
                { label: "Active Agents", value: "8/21" },
                { label: "Sprint Progress", value: "73%" },
                { label: "Tasks Today", value: "14" },
                { label: "Token Cost", value: "$12.40" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg p-3 border"
                  style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}
                >
                  <div className="text-[10px] mb-1" style={{ color: "var(--foreground-muted)" }}>
                    {stat.label}
                  </div>
                  <div
                    className="text-lg font-bold"
                    style={{ color: "var(--primary)", fontFamily: "var(--font-heading)" }}
                  >
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Simulated agent activity rows */}
            <div className="space-y-2">
              {[
                { agent: "Zara", task: "Reviewing PR #191", status: "active", color: "#CCFF00" },
                { agent: "Grace", task: "Building auth middleware", status: "active", color: "#60A5FA" },
                { agent: "Echo", task: "Writing integration tests", status: "active", color: "#22C55E" },
                { agent: "Sage", task: "Security audit — session handling", status: "active", color: "#EF4444" },
                { agent: "Atlas", task: "Dashboard layout refactor", status: "queued", color: "#F472B6" },
              ].map((row) => (
                <div
                  key={row.agent}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg border"
                  style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}
                >
                  <div
                    className="w-2 h-2 rounded-full animate-pulse-glow"
                    style={{ backgroundColor: row.color, color: row.color }}
                  />
                  <span className="text-xs font-semibold w-16" style={{ color: row.color }}>
                    {row.agent}
                  </span>
                  <span className="text-xs flex-1 min-w-0 truncate" style={{ color: "var(--foreground-muted)" }}>
                    {row.task}
                  </span>
                  <span
                    className="text-[10px] font-mono px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: row.status === "active" ? "var(--accent-muted)" : "var(--muted)",
                      color: row.status === "active" ? "var(--primary)" : "var(--foreground-muted)",
                    }}
                  >
                    {row.status}
                  </span>
                </div>
              ))}
            </div>

            {/* Floating callout tooltips */}
            {dashboardCallouts.map((callout) => (
              <Callout key={callout.label} {...callout} />
            ))}
          </div>
        </div>

        {/* CTA below */}
        <div className="mt-6 text-center">
          <Link to="/dashboard">
            <motion.span
              className="inline-flex items-center gap-2 text-sm font-medium cursor-pointer"
              style={{ color: "var(--primary)" }}
              whileHover={{ x: 4 }}
              transition={transitions.micro}
            >
              See the full dashboard <ArrowRight className="h-4 w-4" />
            </motion.span>
          </Link>
        </div>
      </motion.div>
    </motion.section>
  );
}
