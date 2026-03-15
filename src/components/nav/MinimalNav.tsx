import { NavLink } from "react-router-dom";
import { Menu, X, Zap } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/", label: "Overview" },
  { to: "/components", label: "Components" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/typography", label: "Typography" },
];

export function MinimalNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header
        className="sticky top-0 z-50 flex items-center justify-between border-b px-6 h-14"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--bg-secondary)",
        }}
      >
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5" style={{ color: "var(--primary)" }} />
          <span
            className="text-sm font-bold tracking-wide"
            style={{ fontFamily: "var(--font-heading)", color: "var(--foreground)" }}
          >
            KYROS
          </span>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-md transition-colors hover:bg-white/5 cursor-pointer"
          style={{ color: "var(--foreground)" }}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* Slide-out drawer */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60"
            onClick={() => setOpen(false)}
          />
          <div
            className="fixed top-0 right-0 z-50 h-full w-64 border-l p-6 space-y-2"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--bg-secondary)",
            }}
          >
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-md hover:bg-white/5 cursor-pointer"
                style={{ color: "var(--foreground)" }}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-md text-sm font-medium transition-colors"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "var(--accent-muted)" : undefined,
                  color: isActive ? "var(--primary)" : "var(--foreground-muted)",
                  borderRadius: "var(--radius)",
                })}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </>
      )}
    </>
  );
}
