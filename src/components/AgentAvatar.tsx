/**
 * AgentAvatar — Unique 2D SVG avatars for each Kyros agent.
 * Each icon is a geometric abstraction of the agent's role.
 */

interface AgentAvatarProps {
  name: string
  color: string
  size?: number
  className?: string
}

/** Role-specific SVG icon paths keyed by agent name */
function AgentIcon({ name, color, size = 24 }: { name: string; color: string; size: number }) {
  const s = size
  const half = s / 2
  const unit = s / 16 // 16-grid unit for consistent proportions

  switch (name) {
    // Akira — Orchestrator: Hub with radiating connections
    case "Akira":
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
          {/* Central hub */}
          <circle cx={half} cy={half} r={unit * 2.5} fill={color} opacity={0.9} />
          {/* Radiating lines to outer nodes */}
          {[0, 60, 120, 180, 240, 300].map((angle) => {
            const rad = (angle * Math.PI) / 180
            const ox = half + Math.cos(rad) * unit * 6
            const oy = half + Math.sin(rad) * unit * 6
            return (
              <g key={angle}>
                <line x1={half} y1={half} x2={ox} y2={oy} stroke={color} strokeWidth={unit * 0.6} opacity={0.4} />
                <circle cx={ox} cy={oy} r={unit * 1.2} fill={color} opacity={0.6} />
              </g>
            )
          })}
        </svg>
      )

    // Zara — Architect: Compass/blueprint cross with frame
    case "Zara":
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
          {/* Outer frame */}
          <rect
            x={unit * 2} y={unit * 2}
            width={unit * 12} height={unit * 12}
            rx={unit} stroke={color} strokeWidth={unit * 0.7} opacity={0.5}
          />
          {/* Crosshairs */}
          <line x1={half} y1={unit * 3} x2={half} y2={unit * 13} stroke={color} strokeWidth={unit * 0.6} opacity={0.7} />
          <line x1={unit * 3} y1={half} x2={unit * 13} y2={half} stroke={color} strokeWidth={unit * 0.6} opacity={0.7} />
          {/* Compass diamond center */}
          <polygon
            points={`${half},${half - unit * 2.5} ${half + unit * 2.5},${half} ${half},${half + unit * 2.5} ${half - unit * 2.5},${half}`}
            fill={color} opacity={0.85}
          />
        </svg>
      )

    // Grace — Backend Developer: Terminal/server brackets
    case "Grace":
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
          {/* Left bracket */}
          <polyline
            points={`${unit * 5},${unit * 3} ${unit * 3},${half} ${unit * 5},${unit * 13}`}
            stroke={color} strokeWidth={unit * 0.8} strokeLinecap="round" strokeLinejoin="round" opacity={0.8}
          />
          {/* Right bracket */}
          <polyline
            points={`${unit * 11},${unit * 3} ${unit * 13},${half} ${unit * 11},${unit * 13}`}
            stroke={color} strokeWidth={unit * 0.8} strokeLinecap="round" strokeLinejoin="round" opacity={0.8}
          />
          {/* Cursor/underscore */}
          <line x1={unit * 6.5} y1={half} x2={unit * 9.5} y2={half} stroke={color} strokeWidth={unit * 0.9} strokeLinecap="round" opacity={0.9} />
        </svg>
      )

    // Atlas — Frontend Architect: Layout grid
    case "Atlas":
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
          {/* Top bar */}
          <rect x={unit * 2} y={unit * 2} width={unit * 12} height={unit * 3} rx={unit * 0.5} fill={color} opacity={0.8} />
          {/* Left column */}
          <rect x={unit * 2} y={unit * 6} width={unit * 4.5} height={unit * 8} rx={unit * 0.5} fill={color} opacity={0.5} />
          {/* Right content area */}
          <rect x={unit * 7.5} y={unit * 6} width={unit * 6.5} height={unit * 3.5} rx={unit * 0.5} fill={color} opacity={0.35} />
          <rect x={unit * 7.5} y={unit * 10.5} width={unit * 6.5} height={unit * 3.5} rx={unit * 0.5} fill={color} opacity={0.35} />
        </svg>
      )

    // Nova — AI/ML Engineer: Neural network / brain abstraction
    case "Nova":
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
          {/* Three-layer neural net */}
          {/* Layer 1 (left) */}
          {[unit * 4, unit * 8, unit * 12].map((y) => (
            <circle key={`l1-${y}`} cx={unit * 3} cy={y} r={unit * 1.1} fill={color} opacity={0.5} />
          ))}
          {/* Layer 2 (center) */}
          {[unit * 5, unit * 8, unit * 11].map((y) => (
            <circle key={`l2-${y}`} cx={half} cy={y} r={unit * 1.3} fill={color} opacity={0.7} />
          ))}
          {/* Layer 3 (right) */}
          {[unit * 6, unit * 10].map((y) => (
            <circle key={`l3-${y}`} cx={unit * 13} cy={y} r={unit * 1.1} fill={color} opacity={0.5} />
          ))}
          {/* Connections L1→L2 */}
          {[unit * 4, unit * 8, unit * 12].flatMap((y1) =>
            [unit * 5, unit * 8, unit * 11].map((y2) => (
              <line key={`c1-${y1}-${y2}`} x1={unit * 3} y1={y1} x2={half} y2={y2} stroke={color} strokeWidth={unit * 0.3} opacity={0.2} />
            ))
          )}
          {/* Connections L2→L3 */}
          {[unit * 5, unit * 8, unit * 11].flatMap((y1) =>
            [unit * 6, unit * 10].map((y2) => (
              <line key={`c2-${y1}-${y2}`} x1={half} y1={y1} x2={unit * 13} y2={y2} stroke={color} strokeWidth={unit * 0.3} opacity={0.2} />
            ))
          )}
        </svg>
      )

    // Sage — Security Engineer: Shield
    case "Sage":
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
          {/* Shield outline */}
          <path
            d={`M${half},${unit * 2} L${unit * 13},${unit * 4.5} L${unit * 13},${unit * 9} Q${unit * 13},${unit * 13} ${half},${unit * 14.5} Q${unit * 3},${unit * 13} ${unit * 3},${unit * 9} L${unit * 3},${unit * 4.5} Z`}
            fill={color} fillOpacity={0.2} stroke={color} strokeWidth={unit * 0.7} opacity={0.7}
          />
          {/* Lock/keyhole */}
          <circle cx={half} cy={unit * 7.5} r={unit * 1.5} fill={color} opacity={0.8} />
          <rect x={half - unit * 0.6} y={unit * 8.5} width={unit * 1.2} height={unit * 2.5} rx={unit * 0.3} fill={color} opacity={0.8} />
        </svg>
      )

    // Echo — QA Tester: Checkmark with pulse rings
    case "Echo":
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
          {/* Pulse rings */}
          <circle cx={half} cy={half} r={unit * 6.5} stroke={color} strokeWidth={unit * 0.4} opacity={0.15} />
          <circle cx={half} cy={half} r={unit * 4.5} stroke={color} strokeWidth={unit * 0.5} opacity={0.25} />
          {/* Inner filled circle */}
          <circle cx={half} cy={half} r={unit * 2.8} fill={color} opacity={0.2} />
          {/* Checkmark */}
          <polyline
            points={`${unit * 5.5},${half} ${unit * 7.2},${unit * 9.5} ${unit * 11},${unit * 6}`}
            stroke={color} strokeWidth={unit * 1} strokeLinecap="round" strokeLinejoin="round" opacity={0.9}
          />
        </svg>
      )

    // Lyra — Frontend Developer: Code + paintbrush (design-code hybrid)
    case "Lyra":
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
          {/* Angled code tag < */}
          <polyline
            points={`${unit * 6},${unit * 4} ${unit * 3},${half} ${unit * 6},${unit * 12}`}
            stroke={color} strokeWidth={unit * 0.7} strokeLinecap="round" strokeLinejoin="round" opacity={0.6}
          />
          {/* Angled code tag > */}
          <polyline
            points={`${unit * 10},${unit * 4} ${unit * 13},${half} ${unit * 10},${unit * 12}`}
            stroke={color} strokeWidth={unit * 0.7} strokeLinecap="round" strokeLinejoin="round" opacity={0.6}
          />
          {/* Center slash */}
          <line x1={unit * 9.5} y1={unit * 3.5} x2={unit * 6.5} y2={unit * 12.5} stroke={color} strokeWidth={unit * 0.7} strokeLinecap="round" opacity={0.85} />
        </svg>
      )

    // Fallback: initial letter
    default:
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
          <text
            x={half} y={half} dominantBaseline="central" textAnchor="middle"
            fill={color} fontSize={unit * 7} fontFamily="var(--font-mono)" fontWeight="bold"
          >
            {name[0]}
          </text>
        </svg>
      )
  }
}

export function AgentAvatar({ name, color, size = 40, className = "" }: AgentAvatarProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-lg ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: color + "15",
        border: `1px solid ${color}25`,
      }}
    >
      <AgentIcon name={name} color={color} size={size * 0.65} />
    </div>
  )
}
