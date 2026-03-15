import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { transitions } from "@/lib/motion";

/* ── Terminal content — simulates a Kyros agent session ── */
const lines: { text: string; type: "command" | "output" | "success" | "agent" | "blank" }[] = [
  { text: "$ kyros dispatch --team full --task 'Build auth module'", type: "command" },
  { text: "", type: "blank" },
  { text: "▸ Orchestrator decomposed task into 4 subtasks", type: "output" },
  { text: "▸ Zara (Architect)    → reviewing system design...", type: "agent" },
  { text: "▸ Grace (Backend)     → implementing session service...", type: "agent" },
  { text: "▸ Atlas (Frontend)    → building login UI...", type: "agent" },
  { text: "▸ Echo (QA)           → writing integration tests...", type: "agent" },
  { text: "", type: "blank" },
  { text: "✓ 4/4 agents completed — 3 PRs opened", type: "success" },
  { text: "✓ Zara approved all PRs (consensus: 94%)", type: "success" },
  { text: "✓ Sage (Security) audit passed — no vulnerabilities", type: "success" },
  { text: "", type: "blank" },
  { text: "$ kyros merge --sprint 7", type: "command" },
  { text: "✓ Merged to develop. Deployed to staging.", type: "success" },
];

function getLineColor(type: string): string {
  switch (type) {
    case "command": return "var(--primary)";
    case "success": return "#22C55E";
    case "agent": return "#22D3EE";
    default: return "var(--foreground-muted)";
  }
}

export function TerminalDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current > lines.length) {
        clearInterval(interval);
        return;
      }
      setVisibleLines(current);
    }, 180);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={transitions.reveal}
    >
      {/* Terminal window chrome */}
      <div
        className="rounded-xl border overflow-hidden"
        style={{
          backgroundColor: "#0A0A0A",
          borderColor: "var(--border)",
          boxShadow: "0 0 60px rgba(204, 255, 0, 0.06)",
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-2 px-4 py-3 border-b"
          style={{ borderColor: "var(--border)", backgroundColor: "#0D0D0D" }}
        >
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
            <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
            <span className="h-3 w-3 rounded-full bg-[#28C840]" />
          </div>
          <span
            className="ml-2 text-xs font-mono"
            style={{ color: "var(--foreground-muted)" }}
          >
            kyros — agent session
          </span>
        </div>

        {/* Terminal body */}
        <div className="p-5 font-mono text-[13px] leading-6 min-h-[360px]">
          {lines.slice(0, visibleLines).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              style={{ color: getLineColor(line.type) }}
            >
              {line.text || "\u00A0"}
            </motion.div>
          ))}
          {/* Blinking cursor */}
          {visibleLines < lines.length && isInView && (
            <span className="inline-block w-2 h-4 animate-terminal-cursor" style={{ backgroundColor: "var(--primary)" }} />
          )}
        </div>
      </div>
    </motion.div>
  );
}
