import * as React from "react"
import { cn } from "@/lib/utils"

type BadgeVariant = "default" | "secondary" | "outline" | "destructive"

interface BadgeProps extends React.ComponentProps<"span"> {
  variant?: BadgeVariant
}

const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
  default: {
    backgroundColor: "var(--accent-muted)",
    color: "var(--primary)",
    border: "1px solid transparent",
  },
  secondary: {
    backgroundColor: "var(--muted)",
    color: "var(--foreground-muted)",
    border: "1px solid transparent",
  },
  outline: {
    backgroundColor: "transparent",
    color: "var(--foreground)",
    border: "1px solid var(--border)",
  },
  destructive: {
    backgroundColor: "#7F1D1D",
    color: "#FCA5A5",
    border: "1px solid transparent",
  },
}

function Badge({ className, variant = "default", style, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-xs font-mono font-medium uppercase tracking-wider",
        className
      )}
      style={{
        borderRadius: "var(--radius)",
        ...variantStyles[variant],
        ...style,
      }}
      {...props}
    />
  )
}

export { Badge }
export type { BadgeProps, BadgeVariant }
