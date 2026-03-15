import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { transitions } from "@/lib/motion";
import { Settings, X, ChevronDown } from "lucide-react";

type NavVariant = "sidebar" | "topbar" | "minimal";

interface FloatingSettingsProps {
  navVariant: NavVariant;
  onNavVariantChange: (v: NavVariant) => void;
}

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

const accentPresets = [
  { label: "Neon Lime", value: "#CCFF00" },
  { label: "Electric Blue", value: "#3B82F6" },
  { label: "Violet", value: "#8B5CF6" },
  { label: "Cyan", value: "#22D3EE" },
  { label: "Rose", value: "#F43F5E" },
  { label: "Amber", value: "#F59E0B" },
];

function hexToMuted(hex: string, opacity: string): string {
  return hex + opacity;
}

function setRootVar(name: string, value: string) {
  // Target body — matches where App.tsx sets initial theme vars.
  // CSS custom property declarations on body override the index.css body{} fallbacks.
  document.body.style.setProperty(name, value);
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

export function FloatingSettings({ navVariant, onNavVariantChange }: FloatingSettingsProps) {
  const [open, setOpen] = useState(false);
  const [headingFont, setHeadingFont] = useState(headingFonts[0].value);
  const [bodyFont, setBodyFont] = useState(bodyFonts[0].value);
  const [accent, setAccent] = useState("#CCFF00");
  const [radius, setRadius] = useState(8);
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

  function updateHeadingFont(value: string) {
    setHeadingFont(value);
    setRootVar("--font-heading", value);
  }

  function updateBodyFont(value: string) {
    setBodyFont(value);
    setRootVar("--font-body", value);
  }

  function updateAccent(value: string) {
    setAccent(value);
    setRootVar("--primary", value);
    setRootVar("--accent", value);
    setRootVar("--ring", value);
    setRootVar("--accent-muted", hexToMuted(value, "20"));
    setRootVar("--border-accent", hexToMuted(value, "33"));
    setRootVar("--shadow", `0 0 24px ${hexToMuted(value, "12")}`);
  }

  function updateRadius(value: number) {
    setRadius(value);
    setRootVar("--radius", `${value / 16}rem`);
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100]" ref={panelRef}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={transitions.spring}
            className="absolute bottom-16 right-0 w-72 rounded-xl border p-4 space-y-4"
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

            {/* Accent Color */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider mb-1.5" style={{ color: "var(--foreground-muted)" }}>
                Accent Color
              </label>
              <div className="flex gap-1.5">
                {accentPresets.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => updateAccent(p.value)}
                    className="h-7 w-7 rounded-full border-2 transition-all cursor-pointer hover:scale-110"
                    style={{
                      backgroundColor: p.value,
                      borderColor: accent === p.value ? "var(--foreground)" : "transparent",
                      boxShadow: accent === p.value ? `0 0 12px ${p.value}60` : undefined,
                    }}
                    title={p.label}
                  />
                ))}
              </div>
            </div>

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
