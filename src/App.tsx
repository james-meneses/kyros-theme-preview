import { useState } from "react";
import { ThemePanel } from "@/components/ThemePanel";

/* ─────────────────────────────────────────────────
   Theme Variants — toggle to compare visually
   ───────────────────────────────────────────────── */

const themes = {
  "neon-night": {
    label: "Neon Night (Primary)",
    description: "Near-black + neon lime green. Cyberpunk-lite x clean SaaS.",
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
  const vars: Record<string, string> = {
    ...theme.vars,
    "--font-heading": fontOptions[headingFont as keyof typeof fontOptions]?.value ?? theme.vars["--font-heading"],
    "--font-body": fontOptions[bodyFont as keyof typeof fontOptions]?.value ?? theme.vars["--font-body"],
    "--radius": radius,
  };

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        ...vars,
        backgroundColor: "var(--bg)",
        color: "var(--foreground)",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* // CONTROLS */}
      <div
        className="sticky top-0 z-50 flex flex-wrap items-center gap-4 border-b px-6 py-3"
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderColor: "var(--border)",
        }}
      >
        <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "var(--primary)" }}>
          [ THEME_PREVIEW ]
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

      {/* // MAIN_CONTENT */}
      <ThemePanel
        themeKey={activeTheme}
        themeLabel={theme.label}
        themeDescription={theme.description}
        headingFont={headingFont}
        bodyFont={bodyFont}
        radius={radius}
        vars={vars}
      />
    </div>
  );
}
