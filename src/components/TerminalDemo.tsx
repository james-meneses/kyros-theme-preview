import { motion, useInView } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { transitions } from "@/lib/motion";

/* ── Helpers ── */
const sleep = (ms: number, signal: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const id = setTimeout(resolve, ms);
    signal.addEventListener(
      "abort",
      () => {
        clearTimeout(id);
        reject(new DOMException("Aborted"));
      },
      { once: true },
    );
  });

/** Realistic keystroke timing — mostly fast with occasional hesitation */
const keystrokeDelay = () =>
  Math.random() < 0.12 ? 110 + Math.random() * 90 : 35 + Math.random() * 45;

/* ── Constants ── */
const COMMAND = "kyros dispatch --team full --task 'Build auth module'";
const MERGE_CMD = "kyros merge --sprint 7";

const AGENTS = [
  { name: "Zara", role: "Architect", task: "reviewing system design", color: "#D946EF" },
  { name: "Grace", role: "Backend", task: "implementing session service", color: "#6366F1" },
  { name: "Atlas", role: "Frontend", task: "building login UI", color: "#22D3EE" },
  { name: "Echo", role: "QA", task: "writing integration tests", color: "#22C55E" },
] as const;

type LineType = "command" | "output" | "success" | "agent" | "blank";
interface TermLine { text: string; type: LineType; id: number }

export function TerminalDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const idCounter = useRef(0);

  const [typed, setTyped] = useState("");
  const [lines, setLines] = useState<TermLine[]>([]);
  const [progress, setProgress] = useState([0, 0, 0, 0]);
  const [claimed, setClaimed] = useState([false, false, false, false]);
  const [showBars, setShowBars] = useState(false);
  const [phase, setPhase] = useState<"idle" | "running" | "done">("idle");
  const [cursorOn, setCursorOn] = useState(true);

  const abortRef = useRef<AbortController | null>(null);
  const startedRef = useRef(false);

  // Blink cursor at ~530ms
  useEffect(() => {
    const id = setInterval(() => setCursorOn((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  // Auto-scroll terminal body
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  });

  const emit = useCallback((text: string, type: LineType) => {
    setLines((prev) => [...prev, { text, type, id: ++idCounter.current }]);
  }, []);

  const typeChars = useCallback(async (text: string, signal: AbortSignal) => {
    for (let i = 1; i <= text.length; i++) {
      signal.throwIfAborted();
      setTyped(text.slice(0, i));
      await sleep(keystrokeDelay(), signal);
    }
  }, []);

  const run = useCallback(async () => {
    const ac = new AbortController();
    abortRef.current = ac;
    const s = ac.signal;

    // Reset all state
    setPhase("running");
    setLines([]);
    setTyped("");
    setProgress([0, 0, 0, 0]);
    setClaimed([false, false, false, false]);
    setShowBars(false);
    idCounter.current = 0;

    try {
      /* ── Phase 1: Type the dispatch command ── */
      await sleep(400, s);
      await typeChars(COMMAND, s);
      await sleep(300, s);

      // Commit typed command to output lines
      emit(`$ ${COMMAND}`, "command");
      setTyped("");
      await sleep(400, s);

      /* ── Phase 2: Orchestrator processing ── */
      emit("", "blank");
      emit("▸ Parsing task description...", "output");
      await sleep(600, s);
      emit("▸ Orchestrator decomposed task into 4 subtasks", "output");
      await sleep(500, s);
      emit("▸ Scanning agent pool for availability...", "output");
      await sleep(700, s);
      emit("", "blank");

      /* ── Phase 3: Agents claim tasks ── */
      for (let i = 0; i < AGENTS.length; i++) {
        await sleep(250 + Math.random() * 350, s);
        setClaimed((prev) => {
          const n = [...prev];
          n[i] = true;
          return n;
        });
        const a = AGENTS[i];
        emit(`▸ ${a.name} (${a.role}) claimed → ${a.task}...`, "agent");
      }
      await sleep(400, s);
      emit("", "blank");
      emit("▸ All agents executing in parallel...", "output");
      await sleep(200, s);

      /* ── Phase 4: Progress bars fill ── */
      setShowBars(true);
      const speeds = [0.9, 0.55, 0.65, 0.75];
      await new Promise<void>((resolve) => {
        let raf: number;
        const tick = () => {
          if (s.aborted) {
            cancelAnimationFrame(raf);
            return;
          }
          setProgress((prev) => {
            const next = prev.map((p, i) =>
              Math.min(100, p + speeds[i] * (0.6 + Math.random() * 0.8)),
            );
            if (next.every((p) => p >= 100)) {
              resolve();
              return next.map(() => 100);
            }
            return next;
          });
          raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        s.addEventListener("abort", () => cancelAnimationFrame(raf), { once: true });
      });

      await sleep(500, s);
      setShowBars(false);
      emit("", "blank");

      /* ── Phase 5: Results ── */
      emit("✓ 4/4 agents completed — 3 PRs opened", "success");
      await sleep(350, s);
      emit("✓ Zara approved all PRs (consensus: 94%)", "success");
      await sleep(350, s);
      emit("✓ Sage (Security) audit passed — no vulnerabilities", "success");
      await sleep(600, s);
      emit("", "blank");

      /* ── Phase 6: Merge command ── */
      await typeChars(MERGE_CMD, s);
      await sleep(300, s);
      emit(`$ ${MERGE_CMD}`, "command");
      setTyped("");
      await sleep(500, s);
      emit("✓ Merged to develop. Deployed to staging.", "success");

      await sleep(400, s);
      setPhase("done");
    } catch {
      // Aborted — cleanup already handled by AbortController
    }
  }, [emit, typeChars]);

  // Start animation when scrolled into view
  useEffect(() => {
    if (isInView && !startedRef.current) {
      startedRef.current = true;
      run();
    }
  }, [isInView, run]);

  const replay = () => {
    abortRef.current?.abort();
    run();
  };

  const lineColor = (type: LineType) => {
    switch (type) {
      case "command":
        return "var(--primary)";
      case "success":
        return "#22C55E";
      case "agent":
        return "#22D3EE";
      default:
        return "var(--foreground-muted)";
    }
  };

  const cursorStyle = {
    backgroundColor: cursorOn ? "var(--primary)" : "transparent",
  };

  return (
    <motion.div
      ref={containerRef}
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
          className="flex items-center justify-between px-4 py-3 border-b"
          style={{ borderColor: "var(--border)", backgroundColor: "#0D0D0D" }}
        >
          <div className="flex items-center gap-2">
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
          {phase === "done" && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={replay}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono cursor-pointer border transition-colors hover:text-[color:var(--primary)] hover:border-[color:var(--primary)]"
              style={{
                color: "var(--foreground-muted)",
                borderColor: "var(--border)",
                backgroundColor: "transparent",
              }}
            >
              <RotateCcw size={12} />
              replay
            </motion.button>
          )}
        </div>

        {/* Terminal body */}
        <div
          ref={bodyRef}
          className="p-5 font-mono text-[13px] leading-6 min-h-[360px] max-h-[480px] overflow-y-auto"
        >
          {/* Rendered output lines */}
          {lines.map((line) => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              style={{ color: lineColor(line.type) }}
            >
              {line.text || "\u00A0"}
            </motion.div>
          ))}

          {/* Agent progress bars */}
          {showBars && (
            <div className="my-2 space-y-1.5">
              {AGENTS.map(
                (agent, i) =>
                  claimed[i] && (
                    <div key={agent.name} className="flex items-center gap-3">
                      <span
                        className="w-[140px] shrink-0 truncate text-xs"
                        style={{ color: agent.color }}
                      >
                        {agent.name} ({agent.role})
                      </span>
                      <div
                        className="flex-1 h-1.5 rounded-full overflow-hidden"
                        style={{ backgroundColor: "#1A1A1A" }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            backgroundColor: agent.color,
                            width: `${progress[i]}%`,
                            boxShadow:
                              progress[i] > 0 ? `0 0 8px ${agent.color}40` : "none",
                          }}
                        />
                      </div>
                      <span
                        className="w-9 text-right text-xs tabular-nums"
                        style={{
                          color:
                            progress[i] >= 100 ? "#22C55E" : "var(--foreground-muted)",
                        }}
                      >
                        {progress[i] >= 100 ? "✓" : `${Math.round(progress[i])}%`}
                      </span>
                    </div>
                  ),
              )}
            </div>
          )}

          {/* Active typing line with cursor */}
          {typed && (
            <div style={{ color: "var(--primary)" }}>
              $ {typed}
              <span
                className="inline-block w-[7px] h-[15px] align-middle ml-px"
                style={cursorStyle}
              />
            </div>
          )}

          {/* Idle blinking cursor (visible between phases and when done) */}
          {!typed && phase !== "idle" && (
            <span
              className="inline-block w-[7px] h-[15px]"
              style={cursorStyle}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}
