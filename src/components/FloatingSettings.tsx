import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { transitions } from "@/lib/motion";
import { Settings, X, ChevronDown, Palette } from "lucide-react";

type NavVariant = "sidebar" | "topbar" | "minimal";

interface FloatingSettingsProps {
  navVariant: NavVariant;
  onNavVariantChange: (v: NavVariant) => void;
}

// ── Theme Presets ─────────────────────────────────────────
// Each preset is a complete CSS variable set that can be applied atomically.
// The presets follow the agent consensus from Sprint #2 design discussions.

interface ThemePreset {
  id: string;
  label: string;
  description: string;
  vars: Record<string, string>;
  /** The primary accent hex — used for swatch display */
  swatch: string;
}

const themePresets: ThemePreset[] = [
  {
    id: "v0-tactical-neon",
    label: "v0: Tactical Neon",
    description: "Original neon lime — aggressive, distinctive",
    swatch: "#CCFF00",
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
      "--shadow": "0 0 24px #CCFF0012",
      // shadcn bridges
      "--background": "#050505",
      "--card": "#151515",
      "--card-foreground": "#FAFAFA",
      "--secondary-foreground": "#FAFAFA",
      "--accent-foreground": "#FAFAFA",
      "--input": "#252525",
      "--ring": "#CCFF00",
      "--destructive": "#EF4444",
      "--popover": "#151515",
      "--popover-foreground": "#FAFAFA",
    },
  },
  {
    id: "v1-acid-lime",
    label: "v1: Acid Lime",
    description: "Electric lime + deep matrix — Instagram-inspired",
    swatch: "#B4FF00",
    vars: {
      "--bg": "#060C09",
      "--bg-secondary": "#0B1A12",
      "--bg-card": "#0F2018",
      "--border": "#1D3828",
      "--border-accent": "#B4FF0033",
      "--foreground": "#F5FFF0",
      "--foreground-muted": "#8AAA90",
      "--primary": "#B4FF00",
      "--primary-foreground": "#060C09",
      "--secondary": "#6366F1",
      "--accent": "#B4FF00",
      "--accent-muted": "#B4FF0020",
      "--muted": "#0B1A12",
      "--muted-foreground": "#5A7A64",
      "--shadow": "0 0 24px #B4FF0012",
      // shadcn bridges
      "--background": "#060C09",
      "--card": "#0F2018",
      "--card-foreground": "#F5FFF0",
      "--secondary-foreground": "#FAFAFA",
      "--accent-foreground": "#FAFAFA",
      "--input": "#1D3828",
      "--ring": "#B4FF00",
      "--destructive": "#EF4444",
      "--popover": "#0F2018",
      "--popover-foreground": "#F5FFF0",
    },
  },
  {
    id: "v2-true-green",
    label: "v2: True Green",
    description: "Warm pure green — vibrant, alive, not teal",
    swatch: "#4ADE80",
    vars: {
      "--bg": "#0A0A0A",
      "--bg-secondary": "#111111",
      "--bg-card": "#161616",
      "--border": "#272727",
      "--border-accent": "#4ADE8033",
      "--foreground": "#FAFAFA",
      "--foreground-muted": "#A1A1AA",
      "--primary": "#4ADE80",
      "--primary-foreground": "#052E16",
      "--secondary": "#6366F1",
      "--accent": "#4ADE80",
      "--accent-muted": "#4ADE8020",
      "--muted": "#1C1C1C",
      "--muted-foreground": "#71717A",
      "--shadow": "0 0 24px #4ADE8012",
      // shadcn bridges
      "--background": "#0A0A0A",
      "--card": "#161616",
      "--card-foreground": "#FAFAFA",
      "--secondary-foreground": "#FAFAFA",
      "--accent-foreground": "#FAFAFA",
      "--input": "#272727",
      "--ring": "#4ADE80",
      "--destructive": "#EF4444",
      "--popover": "#161616",
      "--popover-foreground": "#FAFAFA",
    },
  },
];

// ── Accent Color Swatches ─────────────────────────────────
// Primary: greens + Instagram color combos (Deep Matrix, Acid Lime)
// Secondary: indigo family + combo colors

interface ColorSwatch {
  hex: string;
  label: string;
}

const primarySwatches: ColorSwatch[] = [
  { hex: "#CCFF00", label: "Neon Lime" },
  { hex: "#B4FF00", label: "Acid Lime" },
  { hex: "#4ADE80", label: "Green-400" },
  { hex: "#34D399", label: "Emerald-400" },
  { hex: "#22C55E", label: "Green-500" },
  { hex: "#00FF41", label: "Matrix" },
  { hex: "#0B1A12", label: "Deep Matrix" },
];

const secondarySwatches: ColorSwatch[] = [
  { hex: "#6366F1", label: "Indigo-500" },
  { hex: "#818CF8", label: "Indigo-400" },
  { hex: "#4F46E5", label: "Indigo-600" },
  { hex: "#A5B4FC", label: "Indigo-300" },
  { hex: "#0B1A12", label: "Deep Matrix" },
  { hex: "#B4FF00", label: "Acid Lime" },
];

// ─────────────────────────────────────────────────────────

const headingFonts = [
  { label: "Space Grotesk", value: "'Space Grotesk', system-ui, sans-serif" },
  { label: "Geist", value: "'Geist Variable', system-ui, sans-serif" },
  { label: "Jakarta", value: "'Plus Jakarta Sans', system-ui, sans-serif" },
  { label: "Manrope", value: "'Manrope', system-ui, sans-serif" },
  { label: "Sora", value: "'Sora', system-ui, sans-serif" },
  { label: "Outfit", value: "'Outfit', system-ui, sans-serif" },
];

const bodyFonts = [
  { label: "Geist", value: "'Geist Variable', system-ui, sans-serif" },
  { label: "Inter", value: "'Inter', system-ui, sans-serif" },
  { label: "DM Sans", value: "'DM Sans', system-ui, sans-serif" },
  { label: "Nunito Sans", value: "'Nunito Sans', system-ui, sans-serif" },
  { label: "Source Sans 3", value: "'Source Sans 3', system-ui, sans-serif" },
  { label: "IBM Plex Sans", value: "'IBM Plex Sans', system-ui, sans-serif" },
];

function setRootVar(name: string, value: string) {
  document.body.style.setProperty(name, value);
}

function applyPreset(preset: ThemePreset) {
  for (const [key, value] of Object.entries(preset.vars)) {
    setRootVar(key, value);
  }
}

function SelectControl({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-[10px] font-mono uppercase tracking-wider mb-1.5" style={{ color: "var(--foreground-muted)" }}>
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none text-xs px-3 py-2 pr-8 rounded-md border cursor-pointer"
          style={{
            backgroundColor: "var(--bg)",
            borderColor: "var(--border)",
            color: "var(--foreground)",
            borderRadius: "var(--radius)",
          }}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 pointer-events-none" style={{ color: "var(--foreground-muted)" }} />
      </div>
    </div>
  );
}

function SwatchRow({
  label,
  swatches,
  activeHex,
  onSelect,
}: {
  label: string;
  swatches: ColorSwatch[];
  activeHex: string;
  onSelect: (hex: string) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-[10px] font-mono uppercase tracking-wider" style={{ color: "var(--foreground-muted)" }}>
          {label}
        </label>
        <span className="text-[10px] font-mono" style={{ color: "var(--primary)" }}>
          {activeHex.toUpperCase()}
        </span>
      </div>
      <div className="flex gap-1.5 flex-wrap">
        {swatches.map((swatch) => {
          const isActive = activeHex.toLowerCase() === swatch.hex.toLowerCase();
          return (
            <button
              key={swatch.hex}
              onClick={() => onSelect(swatch.hex)}
              title={`${swatch.label} — ${swatch.hex}`}
              className="rounded-full border-2 transition-all cursor-pointer shrink-0"
              style={{
                width: "1.375rem",
                height: "1.375rem",
                backgroundColor: swatch.hex,
                borderColor: isActive ? "var(--foreground)" : "rgba(255,255,255,0.12)",
                boxShadow: isActive ? `0 0 10px ${swatch.hex}80` : undefined,
                transform: isActive ? "scale(1.15)" : undefined,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export function FloatingSettings({ navVariant, onNavVariantChange }: FloatingSettingsProps) {
  const [open, setOpen] = useState(false);
  const [activePreset, setActivePreset] = useState(themePresets[0].id);
  const [activePrimaryColor, setActivePrimaryColor] = useState(themePresets[0].vars["--primary"]);
  const [activeSecondaryColor, setActiveSecondaryColor] = useState(themePresets[0].vars["--secondary"]);
  const [headingFont, setHeadingFont] = useState(headingFonts[0].value);
  const [bodyFont, setBodyFont] = useState(bodyFonts[0].value);
  const [radius, setRadius] = useState(8);
  // Muted foreground brightness: 0x66 = 102 (v0 default). Range 80–200.
  const [mutedFgLevel, setMutedFgLevel] = useState(102);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  function switchPreset(presetId: string) {
    const preset = themePresets.find((p) => p.id === presetId);
    if (!preset) return;
    setActivePreset(presetId);
    applyPreset(preset);
    setActivePrimaryColor(preset.vars["--primary"]);
    setActiveSecondaryColor(preset.vars["--secondary"]);
    const mfHex = preset.vars["--muted-foreground"].slice(1, 3);
    setMutedFgLevel(parseInt(mfHex, 16));
  }

  function applyPrimaryColor(hex: string) {
    setRootVar("--primary", hex);
    setRootVar("--accent", hex);
    setRootVar("--ring", hex);
    setRootVar("--border-accent", hex + "33");
    setRootVar("--accent-muted", hex + "20");
    setRootVar("--shadow", `0 0 24px ${hex}12`);
    setActivePrimaryColor(hex);
  }

  function applySecondaryColor(hex: string) {
    setRootVar("--secondary", hex);
    setActiveSecondaryColor(hex);
  }

  function updateHeadingFont(value: string) {
    setHeadingFont(value);
    setRootVar("--font-heading", value);
  }

  function updateBodyFont(value: string) {
    setBodyFont(value);
    setRootVar("--font-body", value);
  }

  function updateRadius(value: number) {
    setRadius(value);
    setRootVar("--radius", `${value / 16}rem`);
  }

  function updateMutedFg(level: number) {
    const h = level.toString(16).padStart(2, "0");
    setRootVar("--muted-foreground", `#${h}${h}${h}`);
    setMutedFgLevel(level);
  }

  const mutedFgHex = `#${mutedFgLevel.toString(16).padStart(2, "0").toUpperCase().repeat(3)}`;

  return (
    <div className="fixed bottom-6 right-6 z-[100]" ref={panelRef}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={transitions.spring}
            className="absolute bottom-16 right-0 w-[calc(100vw-3rem)] sm:w-80 rounded-xl border p-4 space-y-4 max-h-[80vh] overflow-y-auto"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border)",
              boxShadow: "0 16px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider" style={{ color: "var(--primary)" }}>
                Theme Settings
              </span>
              <button
                onClick={() => setOpen(false)}
                className="p-1 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
                style={{ color: "var(--foreground-muted)" }}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* ── Theme Presets ── */}
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <Palette className="h-3 w-3" style={{ color: "var(--foreground-muted)" }} />
                <label className="text-[10px] font-mono uppercase tracking-wider" style={{ color: "var(--foreground-muted)" }}>
                  Theme Preset
                </label>
              </div>
              <div className="space-y-1.5">
                {themePresets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => switchPreset(preset.id)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all cursor-pointer"
                    style={{
                      backgroundColor: activePreset === preset.id ? "var(--accent-muted)" : "transparent",
                      borderRadius: "var(--radius)",
                    }}
                  >
                    <div
                      className="h-6 w-6 rounded-full shrink-0 border-2 transition-all"
                      style={{
                        backgroundColor: preset.swatch,
                        borderColor: activePreset === preset.id ? "var(--foreground)" : "transparent",
                        boxShadow: activePreset === preset.id ? `0 0 10px ${preset.swatch}60` : undefined,
                      }}
                    />
                    <div className="min-w-0">
                      <div className="text-[11px] font-semibold truncate" style={{ color: activePreset === preset.id ? "var(--foreground)" : "var(--foreground-muted)" }}>
                        {preset.label}
                      </div>
                      <div className="text-[9px] truncate" style={{ color: "var(--muted-foreground)" }}>
                        {preset.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* ── Primary Color ── */}
            <SwatchRow
              label="Primary Color"
              swatches={primarySwatches}
              activeHex={activePrimaryColor}
              onSelect={applyPrimaryColor}
            />

            {/* ── Secondary Color ── */}
            <SwatchRow
              label="Secondary Color"
              swatches={secondarySwatches}
              activeHex={activeSecondaryColor}
              onSelect={applySecondaryColor}
            />

            {/* ── Muted Text ── */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider" style={{ color: "var(--foreground-muted)" }}>
                  Muted Text
                </label>
                <span className="text-[10px] font-mono" style={{ color: "var(--primary)" }}>
                  {mutedFgHex}
                </span>
              </div>
              <input
                type="range"
                min={80}
                max={200}
                value={mutedFgLevel}
                onChange={(e) => updateMutedFg(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, var(--primary) ${((mutedFgLevel - 80) / 120) * 100}%, var(--border) ${((mutedFgLevel - 80) / 120) * 100}%)`,
                }}
              />
              <div className="flex justify-between mt-1">
                <span className="text-[9px] font-mono" style={{ color: "var(--muted-foreground)" }}>subtle</span>
                <span className="text-[9px] font-mono" style={{ color: "var(--muted-foreground)" }}>crisp</span>
              </div>
            </div>

            {/* Separator */}
            <div style={{ borderTop: "1px solid var(--border)" }} />

            {/* Nav Variant */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider mb-1.5" style={{ color: "var(--foreground-muted)" }}>
                Navigation
              </label>
              <div className="flex gap-1">
                {(["sidebar", "topbar", "minimal"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => onNavVariantChange(v)}
                    className="flex-1 px-2 py-1.5 text-[11px] font-medium transition-all cursor-pointer rounded-md"
                    style={{
                      backgroundColor: navVariant === v ? "var(--primary)" : "transparent",
                      color: navVariant === v ? "var(--primary-foreground)" : "var(--foreground-muted)",
                      borderRadius: "var(--radius)",
                    }}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Heading Font */}
            <SelectControl
              label="Heading Font"
              options={headingFonts}
              value={headingFont}
              onChange={updateHeadingFont}
            />

            {/* Body Font */}
            <SelectControl
              label="Body Font"
              options={bodyFonts}
              value={bodyFont}
              onChange={updateBodyFont}
            />

            {/* Radius */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider" style={{ color: "var(--foreground-muted)" }}>
                  Radius
                </label>
                <span className="text-[10px] font-mono" style={{ color: "var(--primary)" }}>{radius}px</span>
              </div>
              <input
                type="range"
                min={0}
                max={20}
                value={radius}
                onChange={(e) => updateRadius(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, var(--primary) ${(radius / 20) * 100}%, var(--border) ${(radius / 20) * 100}%)`,
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="h-12 w-12 rounded-full flex items-center justify-center cursor-pointer border"
        style={{
          backgroundColor: open ? "var(--bg-card)" : "var(--primary)",
          color: open ? "var(--primary)" : "var(--primary-foreground)",
          borderColor: open ? "var(--border)" : "transparent",
          boxShadow: open ? "0 4px 24px rgba(0,0,0,0.4)" : "0 0 24px var(--accent-muted), 0 4px 24px rgba(0,0,0,0.4)",
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        transition={transitions.micro}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={transitions.micro}>
              <X className="h-5 w-5" />
            </motion.div>
          ) : (
            <motion.div key="settings" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={transitions.micro}>
              <Settings className="h-5 w-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
