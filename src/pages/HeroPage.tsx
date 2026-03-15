import { motion } from "motion/react";
import NumberFlow from "@number-flow/react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TerminalDemo } from "@/components/TerminalDemo";
import { Marquee } from "@/components/Marquee";
import { AgentAvatar } from "@/components/AgentAvatar";
import {
  transitions, heroStagger, heroChild,
  sectionStagger, sectionChild, scrollReveal,
} from "@/lib/motion";
import {
  Zap, GitBranch, BarChart3, Brain, Network, Cpu,
  ArrowRight, Check, X as XIcon, Quote, Mail,
  User, Briefcase, Building2,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  hero, stats, problem, howItWorks, agents,
  stackBadges, architectureCards, personas,
  founderQuote, finalCta,
} from "@/data/brand";

/* ── Animated stat counter ── */
function AnimatedStat({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setValue(target), 100);
      return () => clearTimeout(t);
    }
  }, [inView, target]);
  return (
    <motion.span
      className="inline-flex items-baseline"
      onViewportEnter={() => setInView(true)}
    >
      <NumberFlow value={value} />
      {suffix && <span>{suffix}</span>}
    </motion.span>
  );
}

/* ── Section Header helper ── */
function SectionHeader({ tag, children }: { tag: string; children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <p className="mb-3 text-xs font-mono uppercase tracking-[0.2em]" style={{ color: "var(--primary)" }}>
        // {tag}
      </p>
      {children}
    </div>
  );
}

const howItWorksIcons = [Zap, GitBranch, BarChart3];
const archIcons = [Brain, Network, Cpu];
const personaIcons = [User, Briefcase, Building2];

export function HeroPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      {/* ═══ Section 1: Hero ═══ */}
      <motion.section
        className="relative mb-40 text-center"
        {...heroStagger}
      >
        {/* Radial glow behind hero — draws eye to primary message */}
        <div
          className="pointer-events-none absolute inset-0 -top-32"
          style={{
            background: "radial-gradient(ellipse 60% 40% at 50% 20%, rgba(204,255,0,0.06) 0%, transparent 70%)",
          }}
        />
        <motion.div {...heroChild}>
          <Badge className="mb-6 text-xs px-4 py-1.5">
            {hero.badge}
          </Badge>
        </motion.div>

        <motion.h1
          className="mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight"
          style={{ fontFamily: "var(--font-heading)" }}
          {...heroChild}
        >
          {hero.headline}
          <br />
          <span style={{ color: "var(--primary)" }}>{hero.headlineAccent}</span>
        </motion.h1>

        <motion.p
          className="mx-auto mb-10 max-w-2xl text-base sm:text-lg leading-relaxed"
          style={{ color: "var(--foreground-muted)" }}
          {...heroChild}
        >
          {hero.subheadline}
        </motion.p>

        <motion.div className="flex flex-wrap justify-center gap-4" {...heroChild}>
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
            {hero.primaryCta} <ArrowRight className="h-4 w-4" />
          </motion.button>
          <motion.button
            className="border px-8 py-3.5 text-sm font-medium cursor-pointer"
            style={{
              borderColor: "var(--border)",
              color: "var(--foreground)",
              borderRadius: "var(--radius)",
              backgroundColor: "transparent",
            }}
            whileHover={{ borderColor: "var(--primary)", color: "var(--primary)" }}
            whileTap={{ scale: 0.98 }}
            transition={transitions.micro}
          >
            {hero.secondaryCta}
          </motion.button>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 border"
          style={{
            borderColor: "var(--border)",
            borderRadius: "var(--radius)",
            backgroundColor: "var(--bg-card)",
          }}
          {...heroChild}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="px-4 sm:px-6 py-6 text-center"
              style={{
                borderColor: "var(--border)",
                borderLeftWidth: i % 2 !== 0 ? "1px" : 0,
                borderLeftStyle: "solid" as const,
                borderTopWidth: i >= 2 ? "1px" : 0,
                borderTopStyle: "solid" as const,
              }}
            >
              <div
                className="text-2xl sm:text-3xl font-bold tabular-nums"
                style={{ color: "var(--primary)", fontFamily: "var(--font-heading)" }}
              >
                <AnimatedStat target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-1 text-xs font-medium" style={{ color: "var(--foreground)" }}>
                {stat.label}
              </div>
              <div className="text-[10px]" style={{ color: "var(--foreground-muted)" }}>
                {stat.sublabel}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.section>

      {/* ═══ Section 2: Problem — Without / With ═══ */}
      <motion.section className="mb-40" {...sectionStagger}>
        <motion.div {...sectionChild}>
          <SectionHeader tag="THE_PROBLEM">
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
              {problem.headline}
            </h2>
          </SectionHeader>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Without */}
          <motion.div {...sectionChild}>
            <Card className="h-full border-red-500/20">
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                  <XIcon className="h-5 w-5 text-red-500" />
                  <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
                    {problem.without.title}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {problem.without.points.map((point, i) => (
                    <li key={i} className="flex gap-3 text-sm" style={{ color: "var(--foreground-muted)" }}>
                      <XIcon className="h-4 w-4 shrink-0 mt-0.5 text-red-500/60" />
                      {point}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* With */}
          <motion.div {...sectionChild}>
            <Card className="h-full" style={{ borderColor: "var(--primary)", borderWidth: 1 }}>
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                  <Check className="h-5 w-5" style={{ color: "var(--primary)" }} />
                  <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
                    {problem.with.title}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {problem.with.points.map((point, i) => (
                    <li key={i} className="flex gap-3 text-sm" style={{ color: "var(--foreground-muted)" }}>
                      <Check className="h-4 w-4 shrink-0 mt-0.5" style={{ color: "var(--primary)" }} />
                      {point}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      {/* ═══ Section 3: How It Works ═══ */}
      <motion.section className="mb-40" {...sectionStagger}>
        <motion.div {...sectionChild}>
          <SectionHeader tag="HOW_IT_WORKS">
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
              From brief to deployed code in three steps
            </h2>
          </SectionHeader>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {howItWorks.map((item, i) => {
            const Icon = howItWorksIcons[i];
            return (
              <motion.div key={item.step} {...sectionChild}>
                <Card className="h-full group hover:ring-1 hover:ring-primary/30 transition-shadow">
                  <CardContent className="flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-lg"
                        style={{ backgroundColor: "var(--accent-muted)" }}
                      >
                        <Icon className="h-5 w-5" style={{ color: "var(--primary)" }} />
                      </div>
                      <span className="font-mono text-xs" style={{ color: "var(--foreground-muted)" }}>
                        STEP_{item.step}
                      </span>
                    </div>
                    <h3 className="mb-3 text-xl font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* ═══ Section 3b: Terminal Demo — makes the workflow tangible ═══ */}
      <section className="mb-40">
        <div className="mb-8 text-center">
          <p className="mb-3 text-xs font-mono uppercase tracking-[0.2em]" style={{ color: "var(--primary)" }}>
            // SEE_IT_IN_ACTION
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
            One command. A full engineering sprint.
          </h2>
        </div>
        <div className="max-w-3xl mx-auto">
          <TerminalDemo />
        </div>
      </section>

      {/* ═══ Section 4: Agent Team ═══ */}
      <motion.section className="mb-40" {...sectionStagger}>
        <motion.div {...sectionChild}>
          <SectionHeader tag="AGENT_FLEET">
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
              Meet the team that builds your software
            </h2>
            <p className="mt-3 text-base" style={{ color: "var(--foreground-muted)" }}>
              Every agent has a name, a role, defined boundaries, and a trust level. They collaborate through structured workflows — not unstructured chat.
            </p>
          </SectionHeader>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {agents.map((agent) => (
            <motion.div key={agent.name} {...sectionChild}>
              <Card className="group hover:ring-1 hover:ring-primary/20 transition-all">
                <CardContent>
                  <div className="flex items-center gap-3 mb-3">
                    <AgentAvatar name={agent.name} color={agent.color} size={40} />
                    <span
                      className="inline-block h-2 w-2 rounded-full animate-pulse-glow"
                      style={{ backgroundColor: "#22C55E", color: "#22C55E" }}
                    />
                  </div>
                  <div className="font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
                    {agent.name}
                  </div>
                  <div className="text-xs font-mono mb-2" style={{ color: agent.color }}>
                    {agent.role}
                  </div>
                  <p className="text-[11px] leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
                    {agent.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ═══ Section 5: Architecture ═══ */}
      <motion.section className="mb-40" {...sectionStagger}>
        <motion.div {...sectionChild}>
          <SectionHeader tag="ARCHITECTURE">
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
              Production infrastructure. Not a prototype.
            </h2>
            <p className="mt-3 text-base" style={{ color: "var(--foreground-muted)" }}>
              Kyros runs on the same technologies you'd choose for a production SaaS — because it is one. 150K+ lines of TypeScript, fully typed, fully tested.
            </p>
          </SectionHeader>
        </motion.div>

        {/* Stack badges — scrolling marquee */}
        <motion.div className="mb-8" {...sectionChild}>
          <Marquee items={stackBadges} duration={25} />
        </motion.div>

        {/* Architecture cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {architectureCards.map((card, i) => {
            const Icon = archIcons[i];
            return (
              <motion.div key={card.metric} {...sectionChild}>
                <Card className="h-full">
                  <CardContent>
                    <div className="flex items-center gap-2 mb-4">
                      <Icon className="h-5 w-5" style={{ color: "var(--primary)" }} />
                      <span className="text-xs font-mono uppercase" style={{ color: "var(--primary)" }}>
                        {card.metric}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                      {card.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
                      {card.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* ═══ Section 6: Social Proof / Numbers ═══ */}
      <motion.section className="mb-32" {...scrollReveal}>
        <div
          className="text-center py-16 px-6 rounded-xl border"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border)",
          }}
        >
          <p className="text-xs font-mono uppercase tracking-[0.2em] mb-4" style={{ color: "var(--primary)" }}>
            // BUILT_IN_PUBLIC
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-12" style={{ fontFamily: "var(--font-heading)" }}>
            The numbers speak
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl sm:text-4xl font-bold" style={{ color: "var(--primary)", fontFamily: "var(--font-heading)" }}>
                  <AnimatedStat target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm font-medium mt-1">{stat.label}</div>
                <div className="text-[11px]" style={{ color: "var(--foreground-muted)" }}>{stat.sublabel}</div>
              </div>
            ))}
          </div>

          {/* Founder quote */}
          <div className="max-w-3xl mx-auto">
            <Quote className="mx-auto h-8 w-8 mb-4" style={{ color: "var(--primary)", opacity: 0.4 }} />
            <blockquote className="text-base sm:text-lg italic leading-relaxed mb-4" style={{ color: "var(--foreground-muted)" }}>
              "{founderQuote.text}"
            </blockquote>
            <p className="text-sm font-semibold">{founderQuote.author}</p>
            <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>{founderQuote.role}</p>
          </div>
        </div>
      </motion.section>

      {/* ═══ Section 7: Use Cases / Personas ═══ */}
      <motion.section className="mb-32" {...sectionStagger}>
        <motion.div {...sectionChild}>
          <SectionHeader tag="USE_CASES">
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
              Built for builders who ship
            </h2>
          </SectionHeader>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {personas.map((persona, i) => {
            const Icon = personaIcons[i];
            return (
              <motion.div key={persona.title} {...sectionChild}>
                <Card className="h-full group hover:ring-1 hover:ring-primary/20 transition-all">
                  <CardContent className="flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-lg"
                        style={{ backgroundColor: "var(--accent-muted)" }}
                      >
                        <Icon className="h-5 w-5" style={{ color: "var(--primary)" }} />
                      </div>
                      <Badge variant="outline">{persona.title}</Badge>
                    </div>
                    <h3 className="text-lg font-semibold mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                      {persona.headline}
                    </h3>
                    <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "var(--foreground-muted)" }}>
                      {persona.description}
                    </p>
                    <div
                      className="text-xs px-3 py-2 rounded-md"
                      style={{
                        backgroundColor: "var(--accent-muted)",
                        color: "var(--primary)",
                        borderRadius: "var(--radius)",
                      }}
                    >
                      <strong>Proof:</strong> {persona.proof}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* ═══ Section 8: Final CTA ═══ */}
      <motion.section className="mb-16" {...scrollReveal}>
        <div className="text-center py-20">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {finalCta.headline.split(".")[0]}.
            <br />
            <span style={{ color: "var(--primary)" }}>
              {finalCta.headline.split(".")[1]?.trim() || "Start orchestrating."}
            </span>
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-base sm:text-lg" style={{ color: "var(--foreground-muted)" }}>
            {finalCta.subheadline}
          </p>

          {/* Email capture */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto mb-4">
            <div className="relative flex-1 w-full">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "var(--foreground-muted)" }} />
              <Input
                type="email"
                placeholder={finalCta.inputPlaceholder}
                className="pl-10 h-12"
              />
            </div>
            <motion.button
              className="px-6 h-12 text-sm font-semibold cursor-pointer whitespace-nowrap inline-flex items-center gap-2 w-full sm:w-auto justify-center"
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
              {finalCta.buttonText} <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>
          <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>
            {finalCta.finePrint}
          </p>
        </div>
      </motion.section>
    </div>
  );
}
