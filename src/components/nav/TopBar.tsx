import { NavLink } from "react-router-dom";
import { Zap } from "lucide-react";

const links = [
  { to: "/", label: "Overview" },
  { to: "/components", label: "Components" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/typography", label: "Typography" },
];

export function TopBar() {
  return (
    <header
      className="sticky top-0 z-50 flex items-center justify-between border-b px-6 h-14"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--bg-secondary)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Zap className="h-5 w-5" style={{ color: "var(--primary)" }} />
        <span
          className="text-sm font-bold tracking-wide"
          style={{ fontFamily: "var(--font-heading)", color: "var(--foreground)" }}
        >
          KYROS
        </span>
      </div>

      {/* Nav links */}
      <nav className="flex items-center gap-1">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className="px-3 py-1.5 text-sm font-medium transition-colors rounded-md"
            style={({ isActive }) => ({
              backgroundColor: isActive ? "var(--accent-muted)" : undefined,
              color: isActive ? "var(--primary)" : "var(--foreground-muted)",
              borderRadius: "var(--radius)",
            })}
          >
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Avatar placeholder */}
      <div
        className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold"
        style={{
          backgroundColor: "var(--accent-muted)",
          color: "var(--primary)",
        }}
      >
        JM
      </div>
    </header>
  );
}
