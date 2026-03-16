import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { sectionStagger, sectionChild, cardStagger, cardChild } from "@/lib/motion";
import { Workflow, BarChart3, Brain, Zap, Shield, Sparkles } from "lucide-react";
import { featureGrid } from "@/data/brand";

const iconMap = {
  Workflow,
  BarChart3,
  Brain,
  Zap,
  Shield,
  Sparkles,
} as const;

export function FeatureGrid() {
  return (
    <motion.section className="mb-12 sm:mb-16 md:mb-24 lg:mb-32" {...sectionStagger}>
      <motion.div {...sectionChild}>
        <div className="mb-8 md:mb-12">
          <p className="mb-3 text-xs font-mono uppercase tracking-[0.2em]" style={{ color: "var(--primary)" }}>
            // CAPABILITIES
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
            Six pillars. One platform.
          </h2>
          <p className="mt-3 text-base" style={{ color: "var(--foreground-muted)" }}>
            Everything you need to orchestrate AI-native software delivery — built in, not bolted on.
          </p>
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        {...cardStagger}
      >
        {featureGrid.map((feature) => {
          const Icon = iconMap[feature.icon];
          return (
            <motion.div key={feature.title} {...cardChild}>
              <Card className="h-full group transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-white/[0.06] hover:backdrop-blur-[12px]"
              >
                <CardContent>
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg mb-4"
                    style={{ backgroundColor: "var(--accent-muted)" }}
                  >
                    <Icon className="h-5 w-5" style={{ color: "var(--primary)" }} />
                  </div>
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--foreground-muted)" }}
                  >
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
