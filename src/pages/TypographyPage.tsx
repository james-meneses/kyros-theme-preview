import { motion } from "motion/react";
import { TypographySection } from "@/components/TypographySection";
import { Card, CardContent } from "@/components/ui/card";
import { transitions, variants } from "@/lib/motion";

/** Active palette display – shows current CSS variable values */
function ActivePalette() {
  const swatches = [
    { name: "bg", var: "--bg" },
    { name: "bg-secondary", var: "--bg-secondary" },
    { name: "card", var: "--bg-card" },
    { name: "muted", var: "--muted" },
    { name: "border", var: "--border" },
    { name: "foreground", var: "--foreground" },
    { name: "muted-fg", var: "--foreground-muted" },
    { name: "primary", var: "--primary" },
    { name: "secondary", var: "--secondary" },
    { name: "terciary", var: "--terciary" },
  ];

  return (
    <section className="mb-16">
      <p className="mb-2 text-xs font-mono uppercase tracking-[0.2em]" style={{ color: "var(--primary)" }}>
        // ACTIVE_PALETTE
      </p>
      <h2 className="mb-8 text-2xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
        Tactical Neon Color Tokens
      </h2>
      <Card>
        <CardContent>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-3">
            {swatches.map((c) => (
              <div key={c.name} className="text-center">
                <div
                  className="mb-2 aspect-square w-full border"
                  style={{
                    backgroundColor: `var(${c.var})`,
                    borderColor: "var(--border)",
                    borderRadius: "var(--radius)",
                  }}
                />
                <div className="text-[10px] font-medium" style={{ color: "var(--foreground-muted)" }}>
                  {c.name}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

/** Design token reference */
function TokenReference() {
  const tokens = [
    { category: "Radius", items: [
      { name: "--radius", value: "0.5rem (8px)" },
      { name: "--radius-sm", value: "calc(0.5rem × 0.6) = 4.8px" },
      { name: "--radius-lg", value: "0.5rem" },
      { name: "--radius-xl", value: "calc(0.5rem × 1.4) = 11.2px" },
    ]},
    { category: "Shadows", items: [
      { name: "--shadow", value: "0 0 24px #CCFF0012" },
      { name: "card hover glow", value: "0 0 30px #CCFF0020" },
    ]},
    { category: "Duration", items: [
      { name: "micro", value: "100ms — checkboxes, toggles" },
      { name: "default", value: "180ms — standard transitions" },
      { name: "enter", value: "280ms — cards, panels" },
      { name: "reveal", value: "600ms — hero animations" },
    ]},
    { category: "Easing", items: [
      { name: "ease-out", value: "cubic-bezier(0.16, 1, 0.3, 1)" },
      { name: "spring", value: "stiffness: 300, damping: 30" },
      { name: "springBouncy", value: "stiffness: 400, damping: 15" },
    ]},
  ];

  return (
    <section className="mb-16">
      <p className="mb-2 text-xs font-mono uppercase tracking-[0.2em]" style={{ color: "var(--primary)" }}>
        // DESIGN_TOKENS
      </p>
      <h2 className="mb-8 text-2xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
        Token Reference
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tokens.map((group) => (
          <Card key={group.category}>
            <CardContent>
              <p className="text-xs font-mono mb-4" style={{ color: "var(--primary)" }}>
                {group.category.toUpperCase()}
              </p>
              <div className="space-y-3">
                {group.items.map((item) => (
                  <div key={item.name} className="flex items-start justify-between gap-4">
                    <code className="text-xs font-mono shrink-0" style={{ color: "var(--foreground)" }}>
                      {item.name}
                    </code>
                    <span className="text-xs text-right" style={{ color: "var(--foreground-muted)" }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

// Build theme vars for the Typography section (Tactical Neon hardcoded)
const tacticalNeonVars: Record<string, string> = {
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
  "--font-heading": "'Space Grotesk', 'Geist Variable', system-ui, sans-serif",
  "--font-body": "'Geist Variable', 'Inter', system-ui, sans-serif",
  "--font-mono": "'Geist Mono', 'JetBrains Mono', monospace",
};

export function TypographyPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <motion.div {...variants.slideUp}>
        <p className="mb-2 text-xs font-mono uppercase tracking-[0.3em]" style={{ color: "var(--primary)" }}>
          [ DESIGN_SYSTEM ]
        </p>
        <h1 className="mb-4 text-4xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
          Typography & <span style={{ color: "var(--primary)" }}>Tokens</span>
        </h1>
        <p className="mb-16 text-lg" style={{ color: "var(--foreground-muted)" }}>
          The Tactical Neon design language — type scale, color palette, and design tokens.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={transitions.enter}
      >
        <TypographySection vars={tacticalNeonVars} />
        <ActivePalette />
        <TokenReference />
      </motion.div>
    </div>
  );
}
