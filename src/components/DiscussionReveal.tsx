import { motion, useInView } from "motion/react";
import NumberFlow from "@number-flow/react";
import { Card, CardContent } from "@/components/ui/card";
import { AgentAvatar } from "@/components/AgentAvatar";
import { transitions } from "@/lib/motion";
import { Check } from "lucide-react";
import { useRef, useState, useEffect } from "react";

/* ── Discussion participants — 4 agents from the real roster ── */
const participants = [
  { name: "Zara", role: "Architect", color: "#CCFF00", position: "Use event-driven pub/sub for decoupled service communication. Clean boundaries, easy to test." },
  { name: "Grace", role: "Backend", color: "#60A5FA", position: "Agree — BullMQ already handles this pattern. We add typed event envelopes and a relay service." },
  { name: "Sage", role: "Security", color: "#EF4444", position: "Pub/sub is fine if we validate event schemas at the boundary. Add classification and rate limiting." },
  { name: "Echo", role: "QA", color: "#22C55E", position: "Event-driven is testable. I can mock the bus. Ship it — but add correlation IDs for trace coverage." },
] as const;

const consensus = {
  percentage: 87,
  summary: "Adopt event-driven pub/sub with typed envelopes, schema validation at boundaries, and correlation IDs for observability.",
};

/* ── Stagger timing (ms from section entering viewport) ── */
const CARD_DELAY = 600;   // ms between each position card
const COUNTER_START = participants.length * CARD_DELAY + 400;
const CONSENSUS_DELAY = COUNTER_START + 1200;

export function DiscussionReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [step, setStep] = useState(0); // 0 = hidden, 1-4 = cards, 5 = counter, 6 = consensus
  const [agreement, setAgreement] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    // Reveal each position card
    participants.forEach((_, i) => {
      timers.push(setTimeout(() => setStep(i + 1), i * CARD_DELAY));
    });

    // Start agreement counter
    timers.push(setTimeout(() => {
      setStep(5);
      setAgreement(consensus.percentage);
    }, COUNTER_START));

    // Reveal consensus card
    timers.push(setTimeout(() => setStep(6), CONSENSUS_DELAY));

    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  return (
    <div ref={sectionRef}>
      {/* Position cards — alternating left/right slide-in */}
      <div className="space-y-3 mb-8">
        {participants.map((agent, i) => {
          const fromLeft = i % 2 === 0;
          const visible = step >= i + 1;

          return (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, x: fromLeft ? -40 : 40 }}
              animate={visible ? { opacity: 1, x: 0 } : undefined}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card className="overflow-hidden">
                <CardContent className="flex items-start gap-3 py-3 px-4">
                  <AgentAvatar name={agent.name} color={agent.color} size={36} className="shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
                        {agent.name}
                      </span>
                      <span className="text-[10px] font-mono" style={{ color: agent.color }}>
                        {agent.role}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
                      {agent.position}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Agreement percentage counter */}
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={step >= 5 ? { opacity: 1, scale: 1 } : undefined}
        transition={transitions.spring}
      >
        <p className="text-xs font-mono uppercase tracking-[0.15em] mb-2" style={{ color: "var(--foreground-muted)" }}>
          Consensus reached
        </p>
        <div
          className="text-5xl sm:text-6xl font-bold tabular-nums inline-flex items-baseline"
          style={{ color: "var(--primary)", fontFamily: "var(--font-heading)" }}
        >
          <NumberFlow value={agreement} />
          <span className="text-3xl ml-0.5">%</span>
        </div>
      </motion.div>

      {/* Final consensus card — green highlight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={step >= 6 ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <Card style={{ borderColor: "#22C55E", borderWidth: 1 }}>
          <CardContent className="py-4 px-5">
            <div className="flex items-center gap-2 mb-3">
              <motion.div
                className="flex h-6 w-6 items-center justify-center rounded-full"
                style={{ backgroundColor: "#22C55E" }}
                initial={{ scale: 0 }}
                animate={step >= 6 ? { scale: 1 } : undefined}
                transition={transitions.springBouncy}
              >
                <Check className="h-3.5 w-3.5 text-black" />
              </motion.div>
              <span className="text-xs font-mono uppercase tracking-wider" style={{ color: "#22C55E" }}>
                Decision Approved
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--foreground)" }}>
              {consensus.summary}
            </p>
            <div className="mt-3 flex items-center gap-1.5">
              {participants.map((a) => (
                <AgentAvatar key={a.name} name={a.name} color={a.color} size={24} />
              ))}
              <span className="text-[10px] ml-2 font-mono" style={{ color: "var(--foreground-muted)" }}>
                4/4 agents agreed
              </span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
