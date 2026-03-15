import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Sidebar } from "@/components/nav/Sidebar";
import { TopBar } from "@/components/nav/TopBar";
import { MinimalNav } from "@/components/nav/MinimalNav";
import { HeroPage } from "@/pages/HeroPage";
import { ComponentsPage } from "@/pages/ComponentsPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { TypographyPage } from "@/pages/TypographyPage";
import { transitions } from "@/lib/motion";

type NavVariant = "sidebar" | "topbar" | "minimal";

/** Tactical Neon CSS variables set once at the root */
const themeVars: Record<string, string> = {
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
  "--font-heading": "'Space Grotesk', 'Geist Variable', system-ui, sans-serif",
  "--font-body": "'Geist Variable', 'Inter', system-ui, sans-serif",
  "--font-mono": "'Geist Mono', 'JetBrains Mono', monospace",
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
};

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={transitions.page}
      >
        <Routes location={location}>
          <Route path="/" element={<HeroPage />} />
          <Route path="/components" element={<ComponentsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/typography" element={<TypographyPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const [navVariant, setNavVariant] = useState<NavVariant>("sidebar");

  return (
    <div
      className="dark min-h-screen"
      style={{
        ...themeVars,
        backgroundColor: "var(--bg)",
        color: "var(--foreground)",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* Nav variant switcher — floating pill */}
      <div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-1 rounded-full border px-2 py-1.5"
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
        }}
      >
        <span className="text-[10px] font-mono px-2" style={{ color: "var(--foreground-muted)" }}>NAV:</span>
        {(["sidebar", "topbar", "minimal"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setNavVariant(v)}
            className="px-3 py-1 text-[11px] font-medium transition-all cursor-pointer rounded-full"
            style={{
              backgroundColor: navVariant === v ? "var(--primary)" : "transparent",
              color: navVariant === v ? "var(--primary-foreground)" : "var(--foreground-muted)",
            }}
          >
            {v}
          </button>
        ))}
      </div>

      {/* Layout shell */}
      {navVariant === "sidebar" ? (
        <div className="flex">
          <Sidebar />
          <main className="flex-1 min-w-0 min-h-screen">
            <AnimatedRoutes />
          </main>
        </div>
      ) : (
        <>
          {navVariant === "topbar" ? <TopBar /> : <MinimalNav />}
          <main className="min-h-screen">
            <AnimatedRoutes />
          </main>
        </>
      )}
    </div>
  );
}
