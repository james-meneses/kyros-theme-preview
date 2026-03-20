import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  sectionChild, transitions,
} from "@/lib/motion";
import {
  ArrowRight, Mail, Users, TrendingUp, DollarSign,
} from "lucide-react";
import { agents } from "@/data/brand";
import { AnimatedAgentAvatar } from "@/components/AnimatedAgentAvatar";
import { useRef, useState } from "react";
import NumberFlow from "@number-flow/react";

/* ── Animated stat that fires on viewport entry ── */
function PitchStat({ target, suffix = "", delay = 0 }: { target: number; suffix?: string; delay?: number }) {
  const [value, setValue] = useState(0);
  const fired = useRef(false);
  return (
    <motion.span
      className="inline-flex items-baseline"
      onViewportEnter={() => {
        if (fired.current) return;
        fired.current = true;
        setTimeout(() => setValue(target), delay);
      }}
      viewport={{ once: true, margin: "-40px" }}
    >
      <NumberFlow value={value} />
      {suffix && <span>{suffix}</span>}
    </motion.span>
  );
}

/* ── Slide wrapper ── */
function Slide({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section
      className={`min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 snap-start ${className}`}
    >
      {children}
    </section>
  );
}

const tractionStats = [
  { value: 769, suffix: "", label: "Commits" },
  { value: 116, suffix: "", label: "PRs Merged" },
  { value: 87, suffix: "K", label: "Lines of Code" },
  { value: 29, suffix: "", label: "Days" },
];

const tiers = [
  { name: "Starter", price: "$299", period: "/mo" },
  { name: "Growth", price: "$599", period: "/mo" },
  { name: "Enterprise", price: "$999", period: "/mo" },
];

export function PitchPage() {
  return (
    <div
      className="overflow-y-auto"
      style={{
        scrollSnapType: "y mandatory",
        height: "calc(100vh - 56px)",
      }}
    >
      {/* ── Slide 1: Cover ── */}
      <Slide>
        <motion.div
          className="text-center max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={transitions.reveal}
        >
          <div
            className="text-6xl sm:text-7xl md:text-8xl font-bold mb-6 tracking-tight"
            style={{ fontFamily: "var(--font-heading)", color: "var(--primary)" }}
          >
            Kyros
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-8" style={{ fontFamily: "var(--font-heading)" }}>
            The Operating System for AI-Native Software Teams
          </h1>
          <div className="flex items-center justify-center gap-3">
            <Badge className="text-xs px-4 py-1.5">Seed Round</Badge>
            <Badge variant="outline" className="text-xs px-4 py-1.5">March 2026</Badge>
          </div>
          <div className="mt-16 animate-bounce" style={{ color: "var(--foreground-muted)" }}>
            <p className="text-xs font-mono uppercase tracking-wider mb-2">Scroll down</p>
            <div className="text-lg">&#8595;</div>
          </div>
        </motion.div>
      </Slide>

      {/* ── Slide 2: Problem ── */}
      <Slide>
        <motion.div
          className="text-center max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={transitions.reveal}
        >
          <p className="mb-4 text-xs font-mono uppercase tracking-[0.3em]" style={{ color: "var(--primary)" }}>
            [ THE_PROBLEM ]
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8" style={{ fontFamily: "var(--font-heading)" }}>
            Engineering teams are the <span style={{ color: "var(--destructive)" }}>bottleneck</span>
          </h2>
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div>
              <div className="text-3xl font-bold" style={{ color: "var(--destructive)", fontFamily: "var(--font-heading)" }}>
                6 months
              </div>
              <div className="text-xs mt-1" style={{ color: "var(--foreground-muted)" }}>Average MVP timeline</div>
            </div>
            <div>
              <div className="text-3xl font-bold" style={{ color: "var(--destructive)", fontFamily: "var(--font-heading)" }}>
                7 people
              </div>
              <div className="text-xs mt-1" style={{ color: "var(--foreground-muted)" }}>Minimum team size</div>
            </div>
            <div>
              <div className="text-3xl font-bold" style={{ color: "var(--destructive)", fontFamily: "var(--font-heading)" }}>
                R$1.2M
              </div>
              <div className="text-xs mt-1" style={{ color: "var(--foreground-muted)" }}>Total cost</div>
            </div>
          </div>
          <p className="text-lg" style={{ color: "var(--foreground-muted)" }}>
            We fix that.
          </p>
        </motion.div>
      </Slide>

      {/* ── Slide 3: Solution ── */}
      <Slide>
        <motion.div
          className="text-center max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={transitions.reveal}
        >
          <p className="mb-4 text-xs font-mono uppercase tracking-[0.3em]" style={{ color: "var(--primary)" }}>
            [ THE_SOLUTION ]
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            21 AI agents. One operator.
            <br />
            <span style={{ color: "var(--primary)" }}>Production code.</span>
          </h2>
          <p className="text-base mb-10" style={{ color: "var(--foreground-muted)" }}>
            Specialized agents across architecture, backend, frontend, security, and QA.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {agents.map((agent, i) => (
              <motion.div
                key={agent.name}
                className="flex flex-col items-center gap-1"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, ...transitions.enter }}
              >
                <AnimatedAgentAvatar name={agent.name} color={agent.color} size={40} state="idle" />
                <span className="text-[10px] font-mono" style={{ color: agent.color }}>{agent.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Slide>

      {/* ── Slide 4: Traction ── */}
      <Slide>
        <motion.div
          className="text-center max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={transitions.reveal}
        >
          <p className="mb-4 text-xs font-mono uppercase tracking-[0.3em]" style={{ color: "var(--primary)" }}>
            [ TRACTION ]
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-12" style={{ fontFamily: "var(--font-heading)" }}>
            Built and proven — by itself
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {tractionStats.map((stat, i) => (
              <div key={stat.label}>
                <div className="text-4xl sm:text-5xl font-bold" style={{ color: "var(--primary)", fontFamily: "var(--font-heading)" }}>
                  <PitchStat target={stat.value} suffix={stat.suffix} delay={i * 120} />
                </div>
                <div className="text-sm mt-2" style={{ color: "var(--foreground-muted)" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </Slide>

      {/* ── Slide 5: Market ── */}
      <Slide>
        <motion.div
          className="text-center max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={transitions.reveal}
        >
          <p className="mb-4 text-xs font-mono uppercase tracking-[0.3em]" style={{ color: "var(--primary)" }}>
            [ MARKET ]
          </p>
          <div className="text-6xl sm:text-7xl font-bold mb-4" style={{ color: "var(--primary)", fontFamily: "var(--font-heading)" }}>
            $32B
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Total Addressable Market
          </h2>
          <p className="text-base" style={{ color: "var(--foreground-muted)" }}>
            Software development market transitioning to AI-native delivery.
            Every company that builds software is a potential customer.
          </p>
          <div className="flex justify-center gap-6 mt-10">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" style={{ color: "var(--primary)" }} />
              <span className="text-sm" style={{ color: "var(--foreground-muted)" }}>Startups</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" style={{ color: "var(--primary)" }} />
              <span className="text-sm" style={{ color: "var(--foreground-muted)" }}>Scale-ups</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" style={{ color: "var(--primary)" }} />
              <span className="text-sm" style={{ color: "var(--foreground-muted)" }}>Enterprise</span>
            </div>
          </div>
        </motion.div>
      </Slide>

      {/* ── Slide 6: Business Model ── */}
      <Slide>
        <motion.div
          className="text-center max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={transitions.reveal}
        >
          <p className="mb-4 text-xs font-mono uppercase tracking-[0.3em]" style={{ color: "var(--primary)" }}>
            [ BUSINESS_MODEL ]
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            SaaS: <span style={{ color: "var(--primary)" }}>$299-999/mo</span> per project
          </h2>
          <p className="text-base mb-10" style={{ color: "var(--foreground-muted)" }}>
            Three tiers. Predictable pricing. Infinite scale.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                {...sectionChild}
              >
                <Card
                  className="text-center"
                  style={i === 1 ? { borderColor: "var(--primary)", borderWidth: 1 } : undefined}
                >
                  <CardContent>
                    <div className="text-sm font-semibold mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                      {tier.name}
                    </div>
                    <div className="text-2xl font-bold" style={{ color: "var(--primary)", fontFamily: "var(--font-heading)" }}>
                      {tier.price}
                    </div>
                    <div className="text-xs" style={{ color: "var(--foreground-muted)" }}>{tier.period}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Slide>

      {/* ── Slide 7: CTA ── */}
      <Slide>
        <motion.div
          className="text-center max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={transitions.reveal}
        >
          <p className="mb-4 text-xs font-mono uppercase tracking-[0.3em]" style={{ color: "var(--primary)" }}>
            [ LETS_TALK ]
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Let's build the future of
            <br />
            <span style={{ color: "var(--primary)" }}>software delivery</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mb-8">
            <Mail className="h-5 w-5" style={{ color: "var(--primary)" }} />
            <a
              href="mailto:james@usekyros.ai"
              className="text-lg font-mono hover:underline"
              style={{ color: "var(--primary)" }}
            >
              james@usekyros.ai
            </a>
          </div>
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
            Schedule a Demo <ArrowRight className="h-4 w-4" />
          </motion.button>
        </motion.div>
      </Slide>
    </div>
  );
}
