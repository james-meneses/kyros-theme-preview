/**
 * AnimatedAgentAvatar — AgentAvatar with orchestrated state animations.
 *
 * States: idle → thinking → executing → complete
 * - IDLE: subtle breathing pulse glow in agent color
 * - THINKING: rotating orbital ring around avatar
 * - EXECUTING: active pulsing with brighter glow + progress arc
 * - COMPLETE: brief checkmark flash then settle to idle
 *
 * Uses Motion (framer-motion) variants with spring physics. < 300ms transitions.
 * Works with all 3 theme presets (colors come from agent.color prop).
 */

import { motion, AnimatePresence } from "motion/react";
import { AgentAvatar } from "./AgentAvatar";
import { useEffect, useState } from "react";

export type AgentState = "idle" | "thinking" | "executing" | "complete";

interface AnimatedAgentAvatarProps {
  name: string;
  color: string;
  size?: number;
  state?: AgentState;
  className?: string;
}

/** Spring transition shared across all state changes — under 300ms feel */
const stateTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 28,
  mass: 0.8,
};

/** Breathing pulse for idle state */
const idleGlow = {
  animate: {
    boxShadow: [
      "0 0 0px var(--glow-color)",
      "0 0 12px var(--glow-color)",
      "0 0 0px var(--glow-color)",
    ],
    scale: [1, 1.02, 1],
  },
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

/** Orbital ring rotation for thinking state */
const thinkingRing = {
  animate: { rotate: 360 },
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: "linear" as const,
  },
};

/** Active pulse for executing state */
const executingPulse = {
  animate: {
    boxShadow: [
      "0 0 4px var(--glow-color)",
      "0 0 20px var(--glow-color)",
      "0 0 4px var(--glow-color)",
    ],
    scale: [1, 1.04, 1],
  },
  transition: {
    duration: 1,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

export function AnimatedAgentAvatar({
  name,
  color,
  size = 40,
  state = "idle",
  className = "",
}: AnimatedAgentAvatarProps) {
  // Track complete → idle transition
  const [showCheck, setShowCheck] = useState(false);

  useEffect(() => {
    if (state === "complete") {
      setShowCheck(true);
      const timer = setTimeout(() => setShowCheck(false), 800);
      return () => clearTimeout(timer);
    }
    setShowCheck(false);
  }, [state]);

  const glowColor = color + "60"; // 37% opacity hex for glow
  const ringSize = size + 10;

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{
        width: ringSize,
        height: ringSize,
        // CSS custom property for glow color used in animation keyframes
        "--glow-color": glowColor,
      } as React.CSSProperties}
    >
      {/* ── Thinking: orbital ring ── */}
      <AnimatePresence>
        {state === "thinking" && (
          <motion.div
            className="absolute inset-0 rounded-lg"
            style={{
              border: `2px dashed ${color}50`,
              borderRadius: "calc(var(--radius, 8px) + 3px)",
            }}
            initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: 360 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              opacity: stateTransition,
              scale: stateTransition,
              rotate: thinkingRing.transition,
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Executing: progress arc (SVG ring) ── */}
      <AnimatePresence>
        {state === "executing" && (
          <motion.svg
            className="absolute inset-0"
            width={ringSize}
            height={ringSize}
            viewBox={`0 0 ${ringSize} ${ringSize}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={stateTransition}
          >
            {/* Background track */}
            <rect
              x={1}
              y={1}
              width={ringSize - 2}
              height={ringSize - 2}
              rx={10}
              ry={10}
              fill="none"
              stroke={color + "20"}
              strokeWidth={2}
            />
            {/* Animated progress arc */}
            <motion.rect
              x={1}
              y={1}
              width={ringSize - 2}
              height={ringSize - 2}
              rx={10}
              ry={10}
              fill="none"
              stroke={color}
              strokeWidth={2}
              strokeLinecap="round"
              strokeDasharray={`${(ringSize - 2) * 4}`}
              animate={{
                strokeDashoffset: [(ringSize - 2) * 4, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.svg>
        )}
      </AnimatePresence>

      {/* ── Avatar container with state-dependent glow ── */}
      <motion.div
        className="relative z-10"
        animate={
          state === "idle"
            ? idleGlow.animate
            : state === "executing"
              ? executingPulse.animate
              : { boxShadow: "0 0 0px transparent", scale: 1 }
        }
        transition={
          state === "idle"
            ? idleGlow.transition
            : state === "executing"
              ? executingPulse.transition
              : stateTransition
        }
        style={{
          "--glow-color": glowColor,
          borderRadius: "var(--radius, 8px)",
        } as React.CSSProperties}
      >
        <AgentAvatar name={name} color={color} size={size} />
      </motion.div>

      {/* ── Complete: checkmark flash overlay ── */}
      <AnimatePresence>
        {showCheck && (
          <motion.div
            className="absolute inset-0 z-20 flex items-center justify-center"
            style={{
              borderRadius: "calc(var(--radius, 8px) + 3px)",
              backgroundColor: color + "30",
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={stateTransition}
          >
            <motion.svg
              width={size * 0.5}
              height={size * 0.5}
              viewBox="0 0 24 24"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <motion.path
                d="M5 13l4 4L19 7"
                stroke={color}
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </motion.svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Hook for demo/preview: cycles through states on a timer.
 * Each agent gets a random offset so they don't all sync.
 */
export function useDemoAgentState(agentIndex: number): AgentState {
  const states: AgentState[] = ["idle", "thinking", "executing", "complete"];
  const [stateIdx, setStateIdx] = useState(0);

  useEffect(() => {
    // Offset each agent so they cycle out of phase
    const offset = agentIndex * 800;
    const interval = 2500;

    const timer = setTimeout(() => {
      const id = setInterval(() => {
        setStateIdx((prev) => (prev + 1) % states.length);
      }, interval);
      return () => clearInterval(id);
    }, offset);

    return () => clearTimeout(timer);
  }, [agentIndex]);

  return states[stateIdx];
}
