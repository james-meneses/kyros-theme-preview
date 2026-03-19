import { NavLink } from "react-router-dom";
import { KyrosLogo } from "@/components/KyrosLogo";

const links = [
  { to: "/", label: "Overview" },
  { to: "/pricing", label: "Pricing" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/components", label: "Components" },
  { to: "/typography", label: "Typography" },
  { to: "/ceo-dashboard", label: "CEO Dash" },
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
        <KyrosLogo size={22} />
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

      {/* CTA */}
      <button
        className="px-4 py-1.5 text-xs font-semibold cursor-pointer"
        style={{
          backgroundColor: "var(--primary)",
          color: "var(--primary-foreground)",
          borderRadius: "var(--radius)",
        }}
      >
        Get Early Access
      </button>
    </header>
  );
}
