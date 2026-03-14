interface TypographySectionProps {
  vars: Record<string, string>
}

/* ── Contrast ratio helpers ────────────────────────── */

function hexToRgb(hex: string): [number, number, number] | null {
  const cleaned = hex.replace("#", "")
  if (cleaned.length === 3) {
    const r = parseInt(cleaned[0] + cleaned[0], 16)
    const g = parseInt(cleaned[1] + cleaned[1], 16)
    const b = parseInt(cleaned[2] + cleaned[2], 16)
    return [r, g, b]
  }
  if (cleaned.length >= 6) {
    const r = parseInt(cleaned.slice(0, 2), 16)
    const g = parseInt(cleaned.slice(2, 4), 16)
    const b = parseInt(cleaned.slice(4, 6), 16)
    return [r, g, b]
  }
  return null
}

function linearize(channel: number): number {
  const s = channel / 255
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
}

function relativeLuminance(hex: string): number {
  const rgb = hexToRgb(hex)
  if (!rgb) return 0
  const [r, g, b] = rgb.map(linearize)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrastRatio(hex1: string, hex2: string): number {
  const l1 = relativeLuminance(hex1)
  const l2 = relativeLuminance(hex2)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

function wcagLevel(ratio: number, isLargeText = false): "AAA" | "AA" | "FAIL" {
  if (isLargeText) {
    if (ratio >= 4.5) return "AAA"
    if (ratio >= 3) return "AA"
    return "FAIL"
  }
  if (ratio >= 7) return "AAA"
  if (ratio >= 4.5) return "AA"
  return "FAIL"
}

/* ── Heading scale data ────────────────────────────── */

const headings = [
  { level: "H1", size: "text-6xl", text: "Your AI Engineering Department", css: { fontSize: "3.75rem", lineHeight: "1", letterSpacing: "-0.025em" } },
  { level: "H2", size: "text-4xl", text: "Agent Team Overview", css: { fontSize: "2.25rem", lineHeight: "2.5rem", letterSpacing: "-0.02em" } },
  { level: "H3", size: "text-2xl", text: "Sprint Velocity Metrics", css: { fontSize: "1.5rem", lineHeight: "2rem", letterSpacing: "-0.01em" } },
  { level: "H4", size: "text-xl", text: "Task Queue Configuration", css: { fontSize: "1.25rem", lineHeight: "1.75rem", letterSpacing: "0" } },
  { level: "H5", size: "text-lg", text: "Review Matrix Settings", css: { fontSize: "1.125rem", lineHeight: "1.75rem", letterSpacing: "0" } },
  { level: "H6", size: "text-base", text: "System Health Indicators", css: { fontSize: "1rem", lineHeight: "1.5rem", letterSpacing: "0" } },
] as const

/* ── Main component ────────────────────────────────── */

export function TypographySection({ vars }: TypographySectionProps) {
  return (
    <section className="mb-24">
      {/* // TYPOGRAPHY_SPECIMEN */}
      <p
        className="mb-2 text-xs font-mono uppercase tracking-[0.2em]"
        style={{ color: "var(--primary)" }}
      >
        // TYPOGRAPHY_SPECIMEN
      </p>
      <h2
        className="mb-16 text-3xl font-bold"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Type at every scale
      </h2>

      {/* ── Heading scale ──────────────────────────── */}
      <div
        className="mb-16 border p-6 sm:p-8"
        style={{
          borderColor: "var(--border)",
          borderRadius: "var(--radius)",
          backgroundColor: "var(--bg-card)",
        }}
      >
        <p
          className="mb-6 text-xs font-mono uppercase tracking-[0.2em]"
          style={{ color: "var(--primary)" }}
        >
          // HEADING_SCALE
        </p>

        <div className="space-y-6">
          {headings.map(({ level, size, text, css }) => (
            <div key={level} className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
              <div className="shrink-0 sm:w-48">
                <span
                  className="text-xs font-mono"
                  style={{ color: "var(--foreground-muted)" }}
                >
                  {level} &middot; {size}
                </span>
                <br />
                <span
                  className="text-[10px] font-mono"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {css.fontSize} / {css.lineHeight} / {css.letterSpacing || "0"}
                </span>
              </div>
              <div
                className={`font-bold leading-tight tracking-tight ${
                  level === "H1" ? "text-4xl sm:text-6xl" :
                  level === "H2" ? "text-3xl sm:text-4xl" :
                  level === "H3" ? "text-xl sm:text-2xl" :
                  level === "H4" ? "text-xl" :
                  level === "H5" ? "text-lg" :
                  "text-base"
                }`}
                style={{
                  fontFamily: "var(--font-heading)",
                  letterSpacing: css.letterSpacing,
                }}
              >
                {text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Body text specimens ────────────────────── */}
      <div
        className="mb-16 border p-6 sm:p-8"
        style={{
          borderColor: "var(--border)",
          borderRadius: "var(--radius)",
          backgroundColor: "var(--bg-card)",
        }}
      >
        <p
          className="mb-6 text-xs font-mono uppercase tracking-[0.2em]"
          style={{ color: "var(--primary)" }}
        >
          // BODY_TEXT
        </p>

        <div className="space-y-6 max-w-3xl">
          <div>
            <span
              className="text-xs font-mono mb-2 block"
              style={{ color: "var(--muted-foreground)" }}
            >
              [BASE] text-base &middot; 1rem
            </span>
            <p
              className="text-base leading-relaxed"
              style={{ color: "var(--foreground)", fontFamily: "var(--font-body)" }}
            >
              Kyros orchestrates multi-agent engineering teams that self-organize, execute, and
              deliver reviewed code. Each agent operates within defined boundaries, communicates
              through a unified event bus, and follows a strict review matrix before any code
              reaches production. The result is predictable, high-quality output at machine speed.
            </p>
          </div>

          <div>
            <span
              className="text-xs font-mono mb-2 block"
              style={{ color: "var(--muted-foreground)" }}
            >
              [SMALL] text-sm &middot; 0.875rem
            </span>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--foreground-muted)", fontFamily: "var(--font-body)" }}
            >
              Sprint velocity is calculated from completed story points across all active agents.
              The dispatch engine prioritizes tasks based on agent availability, skill match, and
              current queue depth. Failed tasks enter a retry loop with exponential backoff before
              escalation to the architect agent for reassignment.
            </p>
          </div>

          <div>
            <span
              className="text-xs font-mono mb-2 block"
              style={{ color: "var(--muted-foreground)" }}
            >
              [XS] text-xs &middot; 0.75rem
            </span>
            <p
              className="text-xs leading-relaxed"
              style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-body)" }}
            >
              Last dispatch: 2m ago &middot; Queue depth: 3 tasks &middot; Active agents: 12/18 &middot;
              Avg response time: 847ms &middot; Token usage: 14.2K (prompt) + 3.8K (completion) &middot;
              Cost: $0.079 &middot; Review cycle: 1 of 3 &middot; CI status: passing
            </p>
          </div>
        </div>
      </div>

      {/* ── Monospace specimens ────────────────────── */}
      <div
        className="mb-16 border p-6 sm:p-8"
        style={{
          borderColor: "var(--border)",
          borderRadius: "var(--radius)",
          backgroundColor: "var(--bg-card)",
        }}
      >
        <p
          className="mb-6 text-xs font-mono uppercase tracking-[0.2em]"
          style={{ color: "var(--primary)" }}
        >
          // MONOSPACE_SPECIMENS
        </p>

        {/* Code block */}
        <div
          className="mb-6 overflow-hidden border"
          style={{
            borderColor: "var(--border)",
            borderRadius: "var(--radius)",
            backgroundColor: "var(--bg-secondary)",
          }}
        >
          <div
            className="flex items-center gap-2 border-b px-4 py-2"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}
          >
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#FF5F57" }} />
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#FFBD2E" }} />
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#28C840" }} />
            <span
              className="ml-2 text-xs"
              style={{ color: "var(--foreground-muted)", fontFamily: "var(--font-mono)" }}
            >
              agent-dispatcher.ts
            </span>
          </div>
          <pre
            className="p-6 text-sm leading-relaxed overflow-x-auto"
            style={{ fontFamily: "var(--font-mono)", color: "var(--foreground-muted)" }}
          >
            <code>
              <span style={{ color: "var(--secondary)" }}>import</span>
              {" { "}
              <span style={{ color: "var(--foreground)" }}>AgentDispatcher</span>
              {" } "}
              <span style={{ color: "var(--secondary)" }}>from</span>
              {" "}
              <span style={{ color: "var(--primary)" }}>'@kyros/orchestrator'</span>
              {";\n\n"}
              <span style={{ color: "var(--secondary)" }}>const</span>
              {" "}
              <span style={{ color: "var(--foreground)" }}>dispatcher</span>
              {" = "}
              <span style={{ color: "var(--secondary)" }}>new</span>
              {" "}
              <span style={{ color: "var(--primary)" }}>AgentDispatcher</span>
              {"({\n"}
              {"  "}
              <span style={{ color: "var(--foreground)" }}>maxConcurrency</span>
              {": "}
              <span style={{ color: "var(--primary)" }}>5</span>
              {",\n"}
              {"  "}
              <span style={{ color: "var(--foreground)" }}>retryPolicy</span>
              {": "}
              <span style={{ color: "var(--primary)" }}>'exponential'</span>
              {",\n"}
              {"  "}
              <span style={{ color: "var(--foreground)" }}>reviewMatrix</span>
              {": "}
              <span style={{ color: "var(--primary)" }}>true</span>
              {",\n"}
              {"});\n\n"}
              <span style={{ color: "var(--secondary)" }}>await</span>
              {" dispatcher."}
              <span style={{ color: "var(--primary)" }}>dispatch</span>
              {"(task, agents);"}
            </code>
          </pre>
        </div>

        {/* Inline code */}
        <div className="mb-6">
          <span
            className="text-xs font-mono mb-3 block"
            style={{ color: "var(--muted-foreground)" }}
          >
            [INLINE_CODE]
          </span>
          <p
            className="text-sm leading-loose"
            style={{ color: "var(--foreground)", fontFamily: "var(--font-body)" }}
          >
            Check the{" "}
            <code
              className="px-1.5 py-0.5 text-xs rounded"
              style={{
                fontFamily: "var(--font-mono)",
                backgroundColor: "var(--accent-muted)",
                color: "var(--primary)",
              }}
            >
              AGENT_STATUS
            </code>{" "}
            before calling{" "}
            <code
              className="px-1.5 py-0.5 text-xs rounded"
              style={{
                fontFamily: "var(--font-mono)",
                backgroundColor: "var(--accent-muted)",
                color: "var(--primary)",
              }}
            >
              dispatch()
            </code>{" "}
            and ensure the{" "}
            <code
              className="px-1.5 py-0.5 text-xs rounded"
              style={{
                fontFamily: "var(--font-mono)",
                backgroundColor: "var(--accent-muted)",
                color: "var(--primary)",
              }}
            >
              review_matrix
            </code>{" "}
            is configured for the target team.
          </p>
        </div>

        {/* Terminal output */}
        <div>
          <span
            className="text-xs font-mono mb-3 block"
            style={{ color: "var(--muted-foreground)" }}
          >
            [TERMINAL_OUTPUT]
          </span>
          <div
            className="overflow-hidden border"
            style={{
              borderColor: "var(--border)",
              borderRadius: "var(--radius)",
              backgroundColor: "var(--bg-secondary)",
            }}
          >
            <div
              className="flex items-center gap-2 border-b px-4 py-2"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}
            >
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#FF5F57" }} />
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#FFBD2E" }} />
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#28C840" }} />
              <span
                className="ml-2 text-xs"
                style={{ color: "var(--foreground-muted)", fontFamily: "var(--font-mono)" }}
              >
                terminal
              </span>
            </div>
            <pre
              className="p-6 text-sm leading-relaxed overflow-x-auto"
              style={{ fontFamily: "var(--font-mono)", color: "var(--foreground-muted)" }}
            >
              <code>
                <span style={{ color: "var(--foreground-muted)" }}>$</span>{" "}
                <span style={{ color: "var(--primary)" }}>kyros agents</span>{" "}
                <span style={{ color: "var(--foreground)" }}>--status</span>
                {"\n\n"}
                <span style={{ color: "var(--foreground)" }}>AGENT          ROLE              STATUS    TASKS</span>
                {"\n"}
                <span style={{ color: "var(--primary)" }}>Akira</span>
                {"          backend_dev       "}
                <span style={{ color: "#28C840" }}>ACTIVE</span>
                {"    3\n"}
                <span style={{ color: "var(--primary)" }}>Zara</span>
                {"           frontend_dev      "}
                <span style={{ color: "#28C840" }}>ACTIVE</span>
                {"    2\n"}
                <span style={{ color: "var(--primary)" }}>Grace</span>
                {"          architect         "}
                <span style={{ color: "#FBBF24" }}>REVIEW</span>
                {"    1\n"}
                <span style={{ color: "var(--primary)" }}>Atlas</span>
                {"          qa_engineer       "}
                <span style={{ color: "var(--foreground-muted)" }}>IDLE</span>
                {"      0\n\n"}
                <span style={{ color: "var(--secondary)" }}>&check; 4 agents registered, 3 active</span>
              </code>
            </pre>
          </div>
        </div>
      </div>

      {/* ── Font comparison grid ───────────────────── */}
      <div
        className="mb-16 border p-6 sm:p-8"
        style={{
          borderColor: "var(--border)",
          borderRadius: "var(--radius)",
          backgroundColor: "var(--bg-card)",
        }}
      >
        <p
          className="mb-6 text-xs font-mono uppercase tracking-[0.2em]"
          style={{ color: "var(--primary)" }}
        >
          // FONT_COMPARISON
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {([
            { label: "GEIST", family: "'Geist', system-ui, sans-serif" },
            { label: "INTER", family: "'Inter', system-ui, sans-serif" },
            { label: "SPACE_GROTESK", family: "'Space Grotesk', system-ui, sans-serif" },
          ] as const).map(({ label, family }) => (
            <div
              key={label}
              className="border p-6"
              style={{
                borderColor: "var(--border)",
                borderRadius: "var(--radius)",
                backgroundColor: "var(--bg-secondary)",
              }}
            >
              <span
                className="text-xs font-mono mb-4 block"
                style={{ color: "var(--primary)", fontFamily: "var(--font-mono)" }}
              >
                [{label}]
              </span>

              <h3
                className="text-2xl font-bold mb-2 leading-tight"
                style={{ fontFamily: family }}
              >
                Agent Fleet
              </h3>
              <p
                className="text-sm leading-relaxed mb-2"
                style={{ fontFamily: family, color: "var(--foreground-muted)" }}
              >
                Dispatch work to AI agent teams that self-organize and execute autonomously.
              </p>
              <p
                className="text-xs leading-relaxed"
                style={{ fontFamily: family, color: "var(--muted-foreground)" }}
              >
                Queue depth: 3 &middot; Active: 12/18 &middot; Avg: 847ms
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Contrast check panel ───────────────────── */}
      <div
        className="border p-6 sm:p-8"
        style={{
          borderColor: "var(--border)",
          borderRadius: "var(--radius)",
          backgroundColor: "var(--bg-card)",
        }}
      >
        <p
          className="mb-6 text-xs font-mono uppercase tracking-[0.2em]"
          style={{ color: "var(--primary)" }}
        >
          // CONTRAST_CHECK
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {([
            { label: "foreground / bg", fg: "--foreground", bg: "--bg" },
            { label: "foreground-muted / bg", fg: "--foreground-muted", bg: "--bg" },
            { label: "primary / bg", fg: "--primary", bg: "--bg" },
            { label: "primary-foreground / primary", fg: "--primary-foreground", bg: "--primary" },
          ] as const).map(({ label, fg, bg }) => {
            const fgHex = vars[fg] || "#000000"
            const bgHex = vars[bg] || "#FFFFFF"
            const ratio = contrastRatio(fgHex, bgHex)
            const level = wcagLevel(ratio)
            const levelLarge = wcagLevel(ratio, true)

            return (
              <div
                key={label}
                className="border p-4 flex items-center gap-4"
                style={{
                  borderColor: "var(--border)",
                  borderRadius: "var(--radius)",
                  backgroundColor: "var(--bg-secondary)",
                }}
              >
                {/* Color swatches */}
                <div className="flex shrink-0">
                  <div
                    className="h-10 w-10 border"
                    style={{
                      backgroundColor: bgHex,
                      borderColor: "var(--border)",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <div
                    className="h-10 w-10 border -ml-2"
                    style={{
                      backgroundColor: fgHex,
                      borderColor: "var(--border)",
                      borderRadius: "var(--radius)",
                    }}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div
                    className="text-xs font-mono truncate"
                    style={{ color: "var(--foreground)" }}
                  >
                    {label}
                  </div>
                  <div
                    className="text-[10px] font-mono"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {fgHex} on {bgHex}
                  </div>
                </div>

                {/* Ratio + badges */}
                <div className="shrink-0 text-right">
                  <div
                    className="text-sm font-mono font-bold"
                    style={{ color: "var(--foreground)" }}
                  >
                    {ratio.toFixed(1)}:1
                  </div>
                  <div className="flex gap-1 justify-end mt-1">
                    <span
                      className="px-1.5 py-0.5 text-[10px] font-mono font-bold rounded"
                      style={{
                        backgroundColor:
                          level === "AAA" ? "#28C840" :
                          level === "AA" ? "#FBBF24" :
                          "#FF5F57",
                        color: level === "AA" ? "#000" : "#FFF",
                      }}
                    >
                      {level}
                    </span>
                    {levelLarge !== level && (
                      <span
                        className="px-1.5 py-0.5 text-[10px] font-mono font-bold rounded"
                        style={{
                          backgroundColor:
                            levelLarge === "AAA" ? "#28C840" :
                            levelLarge === "AA" ? "#FBBF24" :
                            "#FF5F57",
                          color: levelLarge === "AA" ? "#000" : "#FFF",
                        }}
                      >
                        {levelLarge}
                        <span className="ml-0.5 opacity-70">lg</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <p
          className="mt-4 text-[10px] font-mono"
          style={{ color: "var(--muted-foreground)" }}
        >
          WCAG 2.1 — AA: 4.5:1 normal / 3:1 large &middot; AAA: 7:1 normal / 4.5:1 large
        </p>
      </div>
    </section>
  )
}
