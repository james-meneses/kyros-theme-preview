import { useState, useEffect, useSyncExternalStore, useCallback } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Sidebar } from "@/components/nav/Sidebar";
import { TopBar } from "@/components/nav/TopBar";
import { MinimalNav } from "@/components/nav/MinimalNav";
import { FloatingSettings } from "@/components/FloatingSettings";
import { Footer } from "@/components/Footer";
import { HeroPage } from "@/pages/HeroPage";
import { PricingPage } from "@/pages/PricingPage";
import { ComponentsPage } from "@/pages/ComponentsPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { CeoDashboardPage } from "@/pages/CeoDashboardPage";
import { TypographyPage } from "@/pages/TypographyPage";
import { ComparisonPage } from "@/pages/ComparisonPage";
import { RoiPage } from "@/pages/RoiPage";
import { PitchPage } from "@/pages/PitchPage";
import { CaseStudyPage } from "@/pages/CaseStudyPage";
import { FeaturesPage } from "@/pages/FeaturesPage";
import { transitions } from "@/lib/motion";

const mobileQuery = "(max-width: 768px)";

function useIsMobile() {
  const subscribe = useCallback((cb: () => void) => {
    const mql = window.matchMedia(mobileQuery);
    mql.addEventListener("change", cb);
    return () => mql.removeEventListener("change", cb);
  }, []);
  const getSnapshot = () => window.matchMedia(mobileQuery).matches;
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

type NavVariant = "sidebar" | "topbar" | "minimal";

/** Tactical Neon CSS variables — applied to document.documentElement so
 *  FloatingSettings can override them on the same cascade level. */
const themeVars: Record<string, string> = {
  "--font-heading": "'Space Grotesk', 'Geist Variable', system-ui, sans-serif",
  "--font-body": "'Geist Variable', 'Inter', system-ui, sans-serif",
  "--font-mono": "'Geist Mono', 'JetBrains Mono', monospace",
  "--radius": "0.5rem",

  "--bg": "#080808",
  "--bg-secondary": "#101010",
  "--bg-card": "#181818",
  "--border": "#1A1A1A",
  "--border-accent": "#B4FF0033",
  "--foreground": "#E7E7E7",
  "--foreground-muted": "#999999",
  "--primary": "#B4FF00",
  "--primary-foreground": "#050505",
  "--secondary": "#4D6E00",
  "--secondary-foreground": "#FAFAFA",
  "--terciary": "#6366F1",
  "--terciary-foreground": "#FAFAFA",
  "--accent": "#B4FF00",
  "--accent-foreground": "#FAFAFA",
  "--accent-muted": "#B4FF0016",
  "--muted": "#181818",
  "--muted-foreground": "#6C6C6C",
  "--shadow": "0 0 18px #B4FF000e",
  "--background": "#080808",
  "--card": "#181818",
  "--card-foreground": "#E7E7E7",
  "--input": "#1A1A1A",
  "--ring": "#B4FF00",
  "--destructive": "#EF4444",
  "--popover": "#181818",
  "--popover-foreground": "#E7E7E7",
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
          <Route path="/comparison" element={<ComparisonPage />} />
          <Route path="/roi" element={<RoiPage />} />
          <Route path="/pitch" element={<PitchPage />} />
          <Route path="/case-study" element={<CaseStudyPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/components" element={<ComponentsPage />} />
          <Route path="/typography" element={<TypographyPage />} />
          <Route path="/ceo-dashboard" element={<CeoDashboardPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const [navVariant, setNavVariant] = useState<NavVariant>("topbar");
  const isMobile = useIsMobile();

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
      {!isMobile && navVariant === "sidebar" ? (
        <div className="flex">
          <Sidebar />
          <div className="flex flex-col flex-1 min-w-0 min-h-screen">
            <main className="flex-1">
              <AnimatedRoutes />
            </main>
            <Footer />
          </div>
        </div>
      ) : (
        <div className="flex flex-col min-h-screen">
          {isMobile ? <MinimalNav /> : navVariant === "topbar" ? <TopBar /> : <MinimalNav />}
          <main className="flex-1">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
}
