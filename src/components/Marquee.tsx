import { motion } from "motion/react";

interface MarqueeProps {
  items: readonly string[];
  /** Seconds for one full loop. Lower = faster. Default 30. */
  duration?: number;
  className?: string;
}

/**
 * Infinite scrolling marquee — CSS-driven for performance.
 * Duplicates items 2x to create seamless loop.
 * Intent: Shows breadth of production infrastructure with visual rhythm.
 */
export function Marquee({ items, duration = 30, className }: MarqueeProps) {
  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <motion.div
        className="flex gap-3 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            duration,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {/* Render items twice for seamless loop */}
        {[...items, ...items].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="shrink-0 px-4 py-2 text-xs font-mono border rounded-md whitespace-nowrap"
            style={{
              borderColor: "var(--border)",
              color: "var(--foreground-muted)",
              backgroundColor: "var(--bg-card)",
            }}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
