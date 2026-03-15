import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Sidebar } from "@/components/nav/Sidebar";
import { TopBar } from "@/components/nav/TopBar";
import { MinimalNav } from "@/components/nav/MinimalNav";
import { FloatingSettings } from "@/components/FloatingSettings";
import { HeroPage } from "@/pages/HeroPage";
import { PricingPage } from "@/pages/PricingPage";
import { ComponentsPage } from "@/pages/ComponentsPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { TypographyPage } from "@/pages/TypographyPage";
import { transitions } from "@/lib/motion";

type NavVariant = "sidebar" | "topbar" | "minimal";

/** Tactical Neon CSS variables — applied to document.documentElement so
 *  FloatingSettings can override them on the same cascade level. */
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
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/components" element={<ComponentsPage />} />
          <Route path="/typography" element={<TypographyPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const [navVariant, setNavVariant] = useState<NavVariant>("topbar");

  // Set theme vars on document.body so FloatingSettings can override them
  // (must be body, not html — index.css sets fallback vars on body which would
  // override inherited values from html in the CSS cascade)
  useEffect(() => {
    for (const [key, value] of Object.entries(themeVars)) {
      document.body.style.setProperty(key, value);
    }
  }, []);

  return (
    <div
      className="dark min-h-screen"
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--foreground)",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* Floating settings FAB (bottom-right) */}
      <FloatingSettings
        navVariant={navVariant}
        onNavVariantChange={setNavVariant}
      />

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
