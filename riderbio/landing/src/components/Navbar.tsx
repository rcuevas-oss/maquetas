import { useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import type { View } from "../types";
import { Button } from "./Button";
import { Logo } from "./Logo";

interface NavbarProps {
  current: View;
  onNavigate: (v: View) => void;
  onCTA: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

const items: { label: string; view: View }[] = [
  { label: "Inicio", view: "landing" },
  { label: "Perfil demo", view: "profile" },
  { label: "Dashboard", view: "dashboard" },
  { label: "Marcas y tiendas", view: "brands" },
];

export function Navbar({ current, onNavigate, onCTA, isDark, onToggleTheme }: NavbarProps) {
  const [open, setOpen] = useState(false);

  const go = (v: View) => { onNavigate(v); setOpen(false); };

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur"
      style={{ background: "var(--rb-nav-bg)", borderBottom: "1px solid var(--rb-border)" }}
    >
      <div className="container-rb flex h-16 items-center justify-between">
        <button onClick={() => go("landing")} className="flex items-center">
          <Logo />
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {items.map((it) => {
            const active = current === it.view;
            return (
              <button
                key={it.view}
                onClick={() => go(it.view)}
                className={["rounded-lg px-3 py-2 text-sm transition font-medium", active ? "bg-accent/10 text-accent" : "hover:bg-[var(--rb-hover)]"].join(" ")}
                style={!active ? { color: "var(--rb-muted)" } : undefined}
              >
                {it.label}
              </button>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={onToggleTheme}
            aria-label={isDark ? "Modo claro" : "Modo oscuro"}
            className="grid h-9 w-9 place-items-center rounded-lg transition"
            style={{ color: "var(--rb-muted)", background: "var(--rb-hover)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--rb-text)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--rb-muted)"; }}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <Button size="sm" onClick={onCTA}>Quiero mi RiderBio</Button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={onToggleTheme}
            aria-label="Cambiar tema"
            className="grid h-9 w-9 place-items-center rounded-lg"
            style={{ color: "var(--rb-muted)" }}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            className="grid h-10 w-10 place-items-center rounded-lg"
            style={{ color: "var(--rb-muted)" }}
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open ? (
        <div style={{ borderTop: "1px solid var(--rb-border)", background: "var(--rb-nav-bg)" }}>
          <div className="container-rb py-3 flex flex-col gap-1">
            {items.map((it) => (
              <button
                key={it.view}
                onClick={() => go(it.view)}
                className={["rounded-lg px-3 py-2.5 text-left text-sm", current === it.view ? "bg-accent/10 text-accent" : ""].join(" ")}
                style={current !== it.view ? { color: "var(--rb-muted)" } : undefined}
              >
                {it.label}
              </button>
            ))}
            <div className="pt-2">
              <Button fullWidth onClick={onCTA}>Quiero mi RiderBio</Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
