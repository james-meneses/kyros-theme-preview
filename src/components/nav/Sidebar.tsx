import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Component,
  BarChart3,
  Type,
  ChevronLeft,
  DollarSign,
} from "lucide-react";
import { useState } from "react";
import { KyrosLogo } from "@/components/KyrosLogo";

const links = [
  { to: "/", label: "Overview", icon: LayoutDashboard },
  { to: "/pricing", label: "Pricing", icon: DollarSign },
  { to: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { to: "/components", label: "Components", icon: Component },
  { to: "/typography", label: "Typography", icon: Type },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className="hidden lg:flex flex-col shrink-0 border-r h-screen sticky top-0 transition-all duration-200"
      style={{
        width: collapsed ? 64 : 240,
        borderColor: "var(--border)",
        backgroundColor: "var(--bg-secondary)",
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-2 border-b px-4 h-14"
        style={{ borderColor: "var(--border)" }}
      >
        <KyrosLogo size={22} className="shrink-0" />
        {!collapsed && (
          <span
            className="text-sm font-bold tracking-wide"
            style={{ fontFamily: "var(--font-heading)", color: "var(--foreground)" }}
          >
            KYROS
          </span>
        )}
      </div>

      {/* Nav links */}
      <nav className="flex-1 py-3 px-2 space-y-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                isActive ? "" : "hover:bg-white/5"
              }`
            }
            style={({ isActive }) => ({
              backgroundColor: isActive ? "var(--accent-muted)" : undefined,
              color: isActive ? "var(--primary)" : "var(--foreground-muted)",
              borderRadius: "var(--radius)",
            })}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center h-10 border-t transition-colors hover:bg-white/5 cursor-pointer"
        style={{ borderColor: "var(--border)", color: "var(--foreground-muted)" }}
      >
        <ChevronLeft
          className="h-4 w-4 transition-transform"
          style={{ transform: collapsed ? "rotate(180deg)" : undefined }}
        />
      </button>
    </aside>
  );
}
