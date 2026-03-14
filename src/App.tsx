import { useState } from "react";

/* ─────────────────────────────────────────────────
   Theme Variants — toggle to compare visually
   ───────────────────────────────────────────────── */

const themes = {
  "neon-night": {
    label: "Neon Night (Primary)",
    description: "Near-black + neon lime green. Cyberpunk-lite × clean SaaS.",
    vars: {
      "--bg": "#0B090A",
      "--bg-secondary": "#141214",
      "--bg-card": "#1A181B",
      "--border": "#2A2A2A",
      "--border-accent": "#C3FF4933",
      "--foreground": "#F2F2F2",
      "--foreground-muted": "#A0A0A0",
      "--primary": "#C3FF49",
      "--primary-foreground": "#0B090A",
      "--secondary": "#7B61FF",
      "--accent": "#C3FF49",
      "--accent-muted": "#C3FF4920",
      "--muted": "#1E1C1F",
      "--muted-foreground": "#71717A",
      "--radius": "0.625rem",
      "--shadow": "0 0 20px #C3FF4915",
      "--font-heading": "'Geist', 'Inter', system-ui, sans-serif",
      "--font-body": "'Geist', 'Inter', system-ui, sans-serif",
      "--font-mono": "'Geist Mono', 'JetBrains Mono', monospace",
    },
  },
  "tactical-neon": {
    label: "Tactical Neon (Variant)",
    description: "Chartreuse yellow-green. More aggressive, higher contrast.",
    vars: {
      "--bg": "#050505",
      "--bg-secondary": "#0D0D0D",
      "--bg-card": "#151515",
      "--border": "#252525",
      "--border-accent": "#CCFF0033",
      "--foreground": "#FAFAFA",
      "--foreground-muted": "#999999",
      "--primary": "#CCFF00",
      "--primary-foreground": "#050505",
      "--secondary": "#6366F1",
      "--accent": "#CCFF00",
      "--accent-muted": "#CCFF0020",
      "--muted": "#1A1A1A",
      "--muted-foreground": "#666666",
      "--radius": "0.5rem",
      "--shadow": "0 0 24px #CCFF0012",
      "--font-heading": "'Geist', 'Inter', system-ui, sans-serif",
      "--font-body": "'Geist', 'Inter', system-ui, sans-serif",
      "--font-mono": "'Geist Mono', 'JetBrains Mono', monospace",
    },
  },
  "violet-depth": {
    label: "Violet Depth (Alt)",
    description: "Deep violet primary with green accent. Reflect/Vercel energy.",
    vars: {
      "--bg": "#09090B",
      "--bg-secondary": "#111113",
      "--bg-card": "#18181B",
      "--border": "#27272A",
      "--border-accent": "#7B61FF33",
      "--foreground": "#FAFAFA",
      "--foreground-muted": "#A1A1AA",
      "--primary": "#7B61FF",
      "--primary-foreground": "#FAFAFA",
      "--secondary": "#C3FF49",
      "--accent": "#C3FF49",
      "--accent-muted": "#7B61FF20",
      "--muted": "#1C1C1F",
      "--muted-foreground": "#71717A",
      "--radius": "0.75rem",
      "--shadow": "0 0 30px #7B61FF10",
      "--font-heading": "'Geist', 'Inter', system-ui, sans-serif",
      "--font-body": "'Geist', 'Inter', system-ui, sans-serif",
      "--font-mono": "'Geist Mono', 'JetBrains Mono', monospace",
    },
  },
} as const;

type ThemeKey = keyof typeof themes;

const fontOptions = {
  geist: { label: "Geist", value: "'Geist', system-ui, sans-serif" },
  inter: { label: "Inter", value: "'Inter', system-ui, sans-serif" },
  "space-grotesk": { label: "Space Grotesk", value: "'Space Grotesk', system-ui, sans-serif" },
};

const radiusOptions = ["0.25rem", "0.5rem", "0.625rem", "0.75rem", "1rem"];

export default function App() {
  const [activeTheme, setActiveTheme] = useState<ThemeKey>("neon-night");
  const [headingFont, setHeadingFont] = useState("geist");
  const [bodyFont, setBodyFont] = useState("geist");
  const [radius, setRadius] = useState("0.625rem");

  const theme = themes[activeTheme];
  const vars = {
    ...theme.vars,
    "--font-heading": fontOptions[headingFont as keyof typeof fontOptions]?.value ?? theme.vars["--font-heading"],
    "--font-body": fontOptions[bodyFont as keyof typeof fontOptions]?.value ?? theme.vars["--font-body"],
    "--radius": radius,
  };

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        ...Object.fromEntries(Object.entries(vars)),
        backgroundColor: "var(--bg)",
        color: "var(--foreground)",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* ── Controls Bar ── */}
      <div
        className="sticky top-0 z-50 flex flex-wrap items-center gap-4 border-b px-6 py-3"
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderColor: "var(--border)",
        }}
      >
        <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "var(--primary)" }}>
          [ THEME PREVIEW ]
        </span>

        {/* Theme selector */}
        <div className="flex gap-1">
          {(Object.keys(themes) as ThemeKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTheme(key)}
              className="px-3 py-1.5 text-xs font-medium transition-all cursor-pointer"
              style={{
                borderRadius: "var(--radius)",
                backgroundColor: activeTheme === key ? "var(--primary)" : "var(--muted)",
                color: activeTheme === key ? "var(--primary-foreground)" : "var(--foreground-muted)",
              }}
            >
              {themes[key].label}
            </button>
          ))}
        </div>

        {/* Font selectors */}
        <div className="flex items-center gap-2">
          <label className="text-xs" style={{ color: "var(--foreground-muted)" }}>Heading:</label>
          <select
            value={headingFont}
            onChange={(e) => setHeadingFont(e.target.value)}
            className="rounded border px-2 py-1 text-xs"
            style={{
              backgroundColor: "var(--muted)",
              borderColor: "var(--border)",
              color: "var(--foreground)",
            }}
          >
            {Object.entries(fontOptions).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs" style={{ color: "var(--foreground-muted)" }}>Body:</label>
          <select
            value={bodyFont}
            onChange={(e) => setBodyFont(e.target.value)}
            className="rounded border px-2 py-1 text-xs"
            style={{
              backgroundColor: "var(--muted)",
              borderColor: "var(--border)",
              color: "var(--foreground)",
            }}
          >
            {Object.entries(fontOptions).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
        </div>

        {/* Radius selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs" style={{ color: "var(--foreground-muted)" }}>Radius:</label>
          <div className="flex gap-1">
            {radiusOptions.map((r) => (
              <button
                key={r}
                onClick={() => setRadius(r)}
                className="px-2 py-1 text-xs transition-all cursor-pointer"
                style={{
                  borderRadius: r,
                  border: `1px solid ${radius === r ? "var(--primary)" : "var(--border)"}`,
                  backgroundColor: radius === r ? "var(--accent-muted)" : "transparent",
                  color: "var(--foreground-muted)",
                }}
              >
                {parseFloat(r) * 16}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Hero Section */}
        <section className="mb-24 text-center">
          <p
            className="mb-4 text-xs font-mono uppercase tracking-[0.3em]"
            style={{ color: "var(--primary)" }}
          >
            [ THE AI-NATIVE OS FOR SOFTWARE TEAMS ]
          </p>
          <h1
            className="mb-6 text-6xl font-bold leading-tight tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Your AI Engineering
            <br />
            <span style={{ color: "var(--primary)" }}>Department</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
            Dispatch work to AI agent teams that self-organize, execute, and deliver reviewed,
            tested code — with full visibility into what every agent is doing.
          </p>
          <div className="flex justify-center gap-4">
            <button
              className="px-6 py-3 text-sm font-semibold transition-all hover:opacity-90 cursor-pointer"
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
                borderRadius: "var(--radius)",
                boxShadow: "var(--shadow)",
              }}
            >
              Start Building &rarr;
            </button>
            <button
              className="border px-6 py-3 text-sm font-medium transition-all hover:opacity-80 cursor-pointer"
              style={{
                borderColor: "var(--border)",
                color: "var(--foreground)",
                borderRadius: "var(--radius)",
                backgroundColor: "transparent",
              }}
            >
              Watch Demo
            </button>
          </div>
        </section>

        {/* Stats Strip */}
        <section
          className="mb-24 grid grid-cols-4 divide-x border"
          style={{
            borderColor: "var(--border)",
            borderRadius: "var(--radius)",
            backgroundColor: "var(--bg-card)",
          }}
        >
          {[
            { value: "18", label: "AI Agents" },
            { value: "150K+", label: "Lines Shipped" },
            { value: "186", label: "Test Files" },
            { value: "26", label: "Event Types" },
          ].map((stat) => (
            <div key={stat.label} className="px-6 py-6 text-center" style={{ borderColor: "var(--border)" }}>
              <div className="text-3xl font-bold" style={{ color: "var(--primary)", fontFamily: "var(--font-heading)" }}>
                {stat.value}
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider" style={{ color: "var(--foreground-muted)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </section>

        {/* Feature Cards */}
        <section className="mb-24">
          <p className="mb-2 text-xs font-mono uppercase tracking-[0.2em]" style={{ color: "var(--primary)" }}>
            // HOW IT WORKS
          </p>
          <h2 className="mb-12 text-3xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
            Three steps to orchestrated AI
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {[
              { step: "01", title: "Dispatch", desc: "Describe the work. Kyros assembles the right agent team, assigns roles, and creates a plan." },
              { step: "02", title: "Execute", desc: "Agents self-organize into sprints. Each agent works in isolated worktrees with full tool access." },
              { step: "03", title: "Review", desc: "Built-in review matrix ensures quality. Architect reviews every PR. Metrics track cost and velocity." },
            ].map((item) => (
              <div
                key={item.step}
                className="border p-6 transition-all hover:border-opacity-60"
                style={{
                  borderColor: "var(--border)",
                  borderRadius: "var(--radius)",
                  backgroundColor: "var(--bg-card)",
                }}
              >
                <div
                  className="mb-3 inline-block rounded-full px-3 py-1 font-mono text-xs"
                  style={{
                    backgroundColor: "var(--accent-muted)",
                    color: "var(--primary)",
                  }}
                >
                  {item.step}
                </div>
                <h3 className="mb-2 text-xl font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Agent Team Preview */}
        <section className="mb-24">
          <p className="mb-2 text-xs font-mono uppercase tracking-[0.2em]" style={{ color: "var(--primary)" }}>
            // AGENT TEAM
          </p>
          <h2 className="mb-12 text-3xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
            Meet your AI engineering team
          </h2>
          <div className="grid grid-cols-4 gap-4">
            {[
              { name: "Akira", role: "Backend", color: "#60A5FA" },
              { name: "Zara", role: "Frontend", color: "#F472B6" },
              { name: "Grace", role: "Architect", color: "#C3FF49" },
              { name: "Atlas", role: "QA", color: "#FBBF24" },
            ].map((agent) => (
              <div
                key={agent.name}
                className="border p-5 transition-all"
                style={{
                  borderColor: "var(--border)",
                  borderRadius: "var(--radius)",
                  backgroundColor: "var(--bg-card)",
                }}
              >
                <div
                  className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold"
                  style={{ backgroundColor: agent.color + "20", color: agent.color }}
                >
                  {agent.name[0]}
                </div>
                <div className="font-semibold" style={{ fontFamily: "var(--font-heading)" }}>{agent.name}</div>
                <div className="text-xs" style={{ color: "var(--foreground-muted)" }}>{agent.role} Engineer</div>
              </div>
            ))}
          </div>
        </section>

        {/* Code Block */}
        <section className="mb-24">
          <p className="mb-2 text-xs font-mono uppercase tracking-[0.2em]" style={{ color: "var(--primary)" }}>
            // DISPATCH
          </p>
          <h2 className="mb-8 text-3xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
            One command to ship
          </h2>
          <div
            className="overflow-hidden border"
            style={{
              borderColor: "var(--border)",
              borderRadius: "var(--radius)",
              backgroundColor: "var(--bg-card)",
            }}
          >
            <div
              className="flex items-center gap-2 border-b px-4 py-2"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-secondary)" }}
            >
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#FF5F57" }} />
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#FFBD2E" }} />
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#28C840" }} />
              <span className="ml-2 text-xs" style={{ color: "var(--foreground-muted)", fontFamily: "var(--font-mono)" }}>
                terminal
              </span>
            </div>
            <pre
              className="p-6 text-sm leading-relaxed"
              style={{ fontFamily: "var(--font-mono)", color: "var(--foreground-muted)" }}
            >
              <code>
                <span style={{ color: "var(--foreground-muted)" }}>$</span>{" "}
                <span style={{ color: "var(--primary)" }}>kyros dispatch</span>{" "}
                <span style={{ color: "var(--foreground)" }}>&quot;Add OAuth2 login with Google and GitHub providers&quot;</span>
                {"\n\n"}
                <span style={{ color: "var(--foreground-muted)" }}>&rarr; Assembling team: Akira (backend), Zara (frontend), Grace (review)</span>
                {"\n"}
                <span style={{ color: "var(--foreground-muted)" }}>&rarr; Sprint created: 3 tasks, estimated 45 min</span>
                {"\n"}
                <span style={{ color: "var(--primary)" }}>&rarr; Agents executing...</span>
                {"\n\n"}
                <span style={{ color: "var(--secondary)" }}>&check; PR #247 ready for review (18 files, 1,240 lines, 186 tests passing)</span>
              </code>
            </pre>
          </div>
        </section>

        {/* CTA */}
        <section className="mb-16 text-center">
          <h2
            className="mb-4 text-4xl font-bold"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Ready to build with <span style={{ color: "var(--primary)" }}>Kyros</span>?
          </h2>
          <p className="mb-8 text-lg" style={{ color: "var(--foreground-muted)" }}>
            Join the Design Partner Program. Limited spots available.
          </p>
          <button
            className="px-8 py-4 text-base font-semibold transition-all hover:opacity-90 cursor-pointer"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
              borderRadius: "var(--radius)",
              boxShadow: "var(--shadow)",
            }}
          >
            Apply for Early Access &rarr;
          </button>
        </section>

        {/* Color Palette Display */}
        <section
          className="border p-6"
          style={{
            borderColor: "var(--border)",
            borderRadius: "var(--radius)",
            backgroundColor: "var(--bg-card)",
          }}
        >
          <p className="mb-4 text-xs font-mono uppercase tracking-[0.2em]" style={{ color: "var(--primary)" }}>
            // ACTIVE PALETTE
          </p>
          <div className="grid grid-cols-7 gap-3">
            {[
              { name: "bg", var: "--bg" },
              { name: "card", var: "--bg-card" },
              { name: "muted", var: "--muted" },
              { name: "border", var: "--border" },
              { name: "foreground", var: "--foreground" },
              { name: "primary", var: "--primary" },
              { name: "secondary", var: "--secondary" },
            ].map((c) => (
              <div key={c.name} className="text-center">
                <div
                  className="mb-2 h-16 w-full border"
                  style={{
                    backgroundColor: `var(${c.var})`,
                    borderColor: "var(--border)",
                    borderRadius: "var(--radius)",
                  }}
                />
                <div className="text-xs" style={{ color: "var(--foreground-muted)" }}>{c.name}</div>
                <div className="font-mono text-[10px]" style={{ color: "var(--muted-foreground)" }}>
                  {vars[c.var as keyof typeof vars]}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Theme description */}
        <div className="mt-6 text-center text-sm" style={{ color: "var(--foreground-muted)" }}>
          <strong>{theme.label}</strong> — {theme.description}
        </div>
      </div>
    </div>
  );
}
