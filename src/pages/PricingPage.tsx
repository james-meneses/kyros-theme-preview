import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";
import {
  sectionStagger, sectionChild, scrollReveal,
} from "@/lib/motion";
import { Check, ArrowRight, Quote } from "lucide-react";
import { pricing, competitors, kyrosAdvantages, founderQuote } from "@/data/brand";

export function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 md:py-20">
      {/* ── Header ── */}
      <motion.section className="mb-20 text-center" {...sectionStagger}>
        <motion.div {...sectionChild}>
          <p className="mb-3 text-xs font-mono uppercase tracking-[0.3em]" style={{ color: "var(--primary)" }}>
            [ PRICING ]
          </p>
          <h1 className="mb-4 text-4xl sm:text-5xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
            {pricing.headline}
          </h1>
          <p className="mx-auto max-w-2xl text-base sm:text-lg" style={{ color: "var(--foreground-muted)" }}>
            {pricing.subheadline}
          </p>
        </motion.div>
      </motion.section>

      {/* ── Pricing Tiers ── */}
      <motion.section className="mb-32" {...sectionStagger}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricing.tiers.map((tier) => (
            <motion.div key={tier.name} {...sectionChild}>
              <Card
                className="h-full flex flex-col"
                style={tier.highlighted ? {
                  borderColor: "var(--primary)",
                  borderWidth: 1,
                  boxShadow: "0 0 40px var(--accent-muted)",
                } : undefined}
              >
                <CardContent className="flex flex-col flex-1">
                  {tier.highlighted && (
                    <Badge className="self-start mb-3 text-[10px]">Most Popular</Badge>
                  )}
                  <h3 className="text-xl font-bold mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span
                      className="text-3xl font-bold"
                      style={{
                        color: tier.highlighted ? "var(--primary)" : "var(--foreground)",
                        fontFamily: "var(--font-heading)",
                      }}
                    >
                      {tier.price}
                    </span>
                    <span className="text-xs" style={{ color: "var(--foreground-muted)" }}>
                      /{tier.period}
                    </span>
                  </div>
                  <p className="text-sm mb-6" style={{ color: "var(--foreground-muted)" }}>
                    {tier.description}
                  </p>

                  <ul className="space-y-2.5 mb-8 flex-1">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex gap-2.5 text-sm">
                        <Check className="h-4 w-4 shrink-0 mt-0.5" style={{ color: "var(--primary)" }} />
                        <span style={{ color: "var(--foreground-muted)" }}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    className="w-full py-3 text-sm font-semibold cursor-pointer inline-flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: tier.highlighted ? "var(--primary)" : "transparent",
                      color: tier.highlighted ? "var(--primary-foreground)" : "var(--foreground)",
                      borderRadius: "var(--radius)",
                      border: tier.highlighted ? "none" : "1px solid var(--border)",
                      boxShadow: tier.highlighted ? "0 0 24px var(--accent-muted)" : undefined,
                    }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: tier.highlighted ? "0 0 32px var(--accent-muted)" : "0 0 12px rgba(255,255,255,0.05)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {tier.cta} <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Competitive Positioning ── */}
      <motion.section className="mb-32" {...sectionStagger}>
        <motion.div {...sectionChild}>
          <p className="mb-3 text-xs font-mono uppercase tracking-[0.2em]" style={{ color: "var(--primary)" }}>
            // COMPETITIVE_POSITIONING
          </p>
          <h2 className="mb-4 text-3xl sm:text-4xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
            How Kyros compares
          </h2>
          <p className="mb-8 text-base" style={{ color: "var(--foreground-muted)" }}>
            We don't compete with developer tools — we replace the need for them.
          </p>
        </motion.div>

        <motion.div {...sectionChild}>
          <Card className="overflow-hidden p-0">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table className="min-w-[800px]">
                  <TableHeader>
                    <TableRow style={{ backgroundColor: "var(--bg-secondary)" }}>
                      {["", "Team", "Cost", "Speed", "Quality", "Buyer"].map((col) => (
                        <TableHead
                          key={col}
                          className="px-4 py-3 text-[10px] font-mono font-semibold uppercase tracking-wider"
                          style={{ color: "var(--foreground-muted)" }}
                        >
                          {col}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {competitors.map((c) => (
                      <TableRow
                        key={c.name}
                        className="transition-colors"
                        style={c.highlight ? { backgroundColor: "var(--accent-muted)" } : undefined}
                      >
                        <TableCell className="px-4 py-3">
                          <span
                            className="font-semibold"
                            style={{
                              fontFamily: "var(--font-heading)",
                              color: c.highlight ? "var(--primary)" : "var(--foreground)",
                            }}
                          >
                            {c.name}
                          </span>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-xs" style={{ color: "var(--foreground-muted)" }}>
                          {c.teamSize}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-xs font-mono" style={{ color: "var(--foreground-muted)" }}>
                          {c.costRange}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-xs" style={{ color: "var(--foreground-muted)" }}>
                          {c.speed}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-xs" style={{ color: "var(--foreground-muted)" }}>
                          {c.quality}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-xs" style={{ color: "var(--foreground-muted)" }}>
                          {c.buyer}
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

      {/* ── Why Kyros ── */}
      <motion.section className="mb-32" {...sectionStagger}>
        <motion.div {...sectionChild}>
          <p className="mb-3 text-xs font-mono uppercase tracking-[0.2em]" style={{ color: "var(--primary)" }}>
            // WHY_KYROS
          </p>
          <h2 className="mb-8 text-3xl sm:text-4xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
            Unfair advantages
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {kyrosAdvantages.map((adv) => (
            <motion.div key={adv.title} {...sectionChild}>
              <Card className="h-full">
                <CardContent>
                  <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                    {adv.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
                    {adv.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Founder Quote ── */}
      <motion.section className="mb-16" {...scrollReveal}>
        <div
          className="text-center py-16 px-6 rounded-xl border"
          style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
        >
          <Quote className="mx-auto h-8 w-8 mb-6" style={{ color: "var(--primary)", opacity: 0.4 }} />
          <blockquote className="text-base sm:text-lg italic leading-relaxed mb-6 max-w-3xl mx-auto" style={{ color: "var(--foreground-muted)" }}>
            "{founderQuote.text}"
          </blockquote>
          <p className="text-sm font-semibold">{founderQuote.author}</p>
          <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>{founderQuote.role}</p>
        </div>
      </motion.section>
    </div>
  );
}
