import * as React from "react"
import { cn } from "@/lib/utils"

function Card({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn("border transition-all", className)}
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border)",
        borderRadius: "var(--radius)",
        ...style,
      }}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-header" className={cn("p-6 pb-0", className)} {...props} />
}

function CardTitle({ className, style, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn("text-xl font-semibold", className)}
      style={{ fontFamily: "var(--font-heading)", ...style }}
      {...props}
    />
  )
}

function CardDescription({ className, style, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-sm leading-relaxed", className)}
      style={{ color: "var(--foreground-muted)", ...style }}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("p-6", className)} {...props} />
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-footer" className={cn("flex items-center p-6 pt-0", className)} {...props} />
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
