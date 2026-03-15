/**
 * Motion presets derived from Aether Design System (05-motion-elevation.md)
 * Adapted for Tactical Neon theme
 */

export const transitions = {
  micro: { duration: 0.1, ease: [0.16, 1, 0.3, 1] },
  default: { duration: 0.18, ease: [0.16, 1, 0.3, 1] },
  enter: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
  exit: { duration: 0.18, ease: [0.55, 0.055, 0.675, 0.19] },
  spring: { type: "spring" as const, stiffness: 300, damping: 30 },
  springBouncy: { type: "spring" as const, stiffness: 400, damping: 15 },
  page: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
  reveal: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
} as const;

export const variants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: transitions.default,
  },
  slideUp: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -4 },
    transition: transitions.enter,
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: transitions.spring,
  },
  slideFromRight: {
    initial: { opacity: 0, x: 16 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -8 },
    transition: transitions.enter,
  },
  stagger: {
    animate: { transition: { staggerChildren: 0.04 } },
  },
  staggerSlow: {
    animate: { transition: { staggerChildren: 0.08 } },
  },
  countUp: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
} as const;

/** Tactical Neon chart colors for Recharts */
export const chartColors = {
  primary: "#CCFF00",
  secondary: "#6366F1",
  cyan: "#22D3EE",
  green: "#22C55E",
  amber: "#FBBF24",
  red: "#EF4444",
  magenta: "#D946EF",
  blue: "#3B82F6",
  categorical: [
    "#22D3EE", // cyan
    "#6366F1", // violet
    "#22C55E", // green
    "#FBBF24", // amber
    "#EF4444", // red
    "#D946EF", // magenta
    "#CCFF00", // lime
    "#3B82F6", // blue
  ],
};
