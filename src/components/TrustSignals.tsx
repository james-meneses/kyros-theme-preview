import { motion } from "motion/react";
import { sectionStagger, sectionChild, scrollReveal } from "@/lib/motion";
import { stackBadges, buildTimeline, buildProofMetrics } from "@/data/brand";

/* ── Large-format metric ── */
function ProofMetric({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div
        className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight"
        style={{ color: "var(--primary)", fontFamily: "var(--font-heading)" }}
      >
        {value}
      </div>
      <div className="mt-1 text-xs sm:text-sm font-medium" style={{ color: "var(--foreground-muted)" }}>
        {label}
      </div>
    </div>
  );
}

/* ── Timeline step with vertical connector ── */
function TimelineStep({
  week,
  title,
  highlights,
  isLast,
}: {
  week: string;
  title: string;
  highlights: readonly string[];
  isLast: boolean;
}) {
  return (
    <div className="relative flex gap-4">
      {/* Dot + line */}
      <div className="flex flex-col items-center">
        <div
          className="h-3 w-3 rounded-full shrink-0 mt-1.5"
          style={{ backgroundColor: "var(--primary)" }}
        />
        {!isLast && (
          <div
            className="w-px flex-1 mt-1"
            style={{ backgroundColor: "color-mix(in srgb, var(--primary) 25%, transparent)" }}
          />
        )}
      </div>

      {/* Content */}
      <div className={isLast ? "pb-0" : "pb-6"}>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-xs font-mono uppercase" style={{ color: "var(--primary)" }}>
            {week}
          </span>
          <span className="text-sm font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
            {title}
          </span>
        </div>
        <ul className="space-y-0.5">
          {highlights.map((h) => (
            <li key={h} className="text-xs" style={{ color: "var(--foreground-muted)" }}>
              {h}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function TrustSignals() {
  return (
    <motion.section className="mb-10 sm:mb-14 md:mb-20 lg:mb-28" {...sectionStagger}>
      <motion.div {...sectionChild}>
        <div className="mb-8 md:mb-12">
          <p
            className="mb-3 text-xs font-mono uppercase tracking-[0.2em]"
            style={{ color: "var(--primary)" }}
          >
            // BUILD_PROOF
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
            Not a demo. Not a prototype.
          </h2>
          <p className="mt-3 text-base" style={{ color: "var(--foreground-muted)" }}>
            Kyros built itself — 150K+ lines of production TypeScript in 15 days. Every commit reviewed, every PR governed.
          </p>
        </div>
      </motion.div>

      {/* Large-format metrics */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-10 md:mb-14"
        {...scrollReveal}
      >
        {buildProofMetrics.map((m) => (
          <ProofMetric key={m.label} value={m.value} label={m.label} />
        ))}
      </motion.div>

      {/* Two-column: timeline + tech stack */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Build timeline */}
        <motion.div
          className="border rounded-xl p-6"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}
          {...sectionChild}
        >
          <h3
            className="text-sm font-semibold mb-4 uppercase tracking-wide"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Build Timeline
          </h3>
          <div>
            {buildTimeline.map((step, i) => (
              <TimelineStep
                key={step.week}
                week={step.week}
                title={step.title}
                highlights={step.highlights}
                isLast={i === buildTimeline.length - 1}
              />
            ))}
          </div>
        </motion.div>

        {/* Built with tech stack */}
        <motion.div
          className="border rounded-xl p-6"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}
          {...sectionChild}
        >
          <h3
            className="text-sm font-semibold mb-4 uppercase tracking-wide"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Built With
          </h3>
          <div className="flex flex-wrap gap-2">
            {stackBadges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center px-3 py-1.5 text-xs font-mono rounded-md border"
                style={{
                  borderColor: "color-mix(in srgb, var(--primary) 20%, var(--border))",
                  color: "var(--foreground)",
                  backgroundColor: "var(--accent-muted)",
                }}
              >
                {badge}
              </span>
            ))}
          </div>
          <p className="mt-4 text-xs leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
            Production infrastructure — not a prototype stack. The same technologies you'd choose for a real SaaS, because it is one.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
