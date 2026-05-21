import { NavLink } from "react-router-dom";
import { LayoutDashboard, User, Link as LinkIcon, Settings, LogOut, ExternalLink, Sun, Moon } from "lucide-react";
import { Logo } from "../ui/Logo";
import { logoutRider, publicProfileUrl } from "../../lib/pb";
import { useTheme } from "../../hooks/useTheme";
import type { Rider } from "../../lib/types";

interface Props {
  rider: Rider;
  onClose?: () => void;
}

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/perfil", label: "Mi perfil", icon: User },
  { to: "/links", label: "Links", icon: LinkIcon },
  { to: "/cuenta", label: "Cuenta", icon: Settings },
];

export function Sidebar({ rider, onClose }: Props) {
  const { isDark, toggle } = useTheme();

  const handleLogout = () => {
    logoutRider();
    window.location.href = "/login";
  };

  return (
    <aside
      className="flex h-full w-64 flex-col"
      style={{ background: "var(--rb-surface)", borderRight: "1px solid var(--rb-border)" }}
    >
      <div className="px-5 py-5" style={{ borderBottom: "1px solid var(--rb-border)" }}>
        <Logo />
      </div>

      {/* Rider header */}
      <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--rb-border)" }}>
        <div className="flex items-center gap-3">
          <div
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl font-display text-sm font-bold text-accent"
            style={{ background: "var(--rb-elevated)" }}
          >
            {rider.display_name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold" style={{ color: "var(--rb-text)" }}>
              {rider.display_name}
            </p>
            <p className="truncate text-xs" style={{ color: "var(--rb-muted)" }}>
              @{rider.username}
            </p>
          </div>
        </div>
        {!rider.is_active && (
          <p className="mt-3 rounded-lg px-2.5 py-1.5 text-[11px]"
            style={{ background: "rgba(245, 158, 11, 0.1)", color: "rgb(245, 158, 11)", border: "1px solid rgba(245, 158, 11, 0.2)" }}>
            Perfil en revisión — aún no es público
          </p>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-1">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) => ["nav-item", isActive ? "active" : ""].join(" ")}
            >
              <item.icon size={16} />
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="my-4 divider" />

        {rider.is_active && (
          <a
            href={publicProfileUrl(rider.username)}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-item"
            onClick={onClose}
          >
            <ExternalLink size={16} />
            Ver mi perfil público
          </a>
        )}

        <button onClick={toggle} className="nav-item w-full text-left">
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
          {isDark ? "Modo claro" : "Modo oscuro"}
        </button>
      </nav>

      <div className="px-3 py-3" style={{ borderTop: "1px solid var(--rb-border)" }}>
        <button onClick={handleLogout} className="nav-item w-full text-left">
          <LogOut size={16} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
