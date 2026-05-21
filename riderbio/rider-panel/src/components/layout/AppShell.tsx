import { useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { Logo } from "../ui/Logo";
import { useAuth } from "../../hooks/useAuth";

export function AppShell({ children }: { children: ReactNode }) {
  const { rider } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!rider) return null; // RequireAuth ya redirige, esto es solo type-narrowing

  return (
    <div className="flex h-full" style={{ background: "var(--rb-bg)" }}>
      {/* Sidebar desktop */}
      <div className="hidden md:block shrink-0">
        <Sidebar rider={rider} />
      </div>

      {/* Sidebar mobile (drawer) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="relative h-full">
            <Sidebar rider={rider} onClose={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Topbar mobile */}
        <header
          className="flex h-14 items-center justify-between px-4 md:hidden"
          style={{ background: "var(--rb-nav-bg)", borderBottom: "1px solid var(--rb-border)" }}
        >
          <Logo />
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="grid h-9 w-9 place-items-center rounded-lg"
            style={{ color: "var(--rb-muted)", background: "var(--rb-hover)" }}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-5xl px-5 py-6 sm:px-8 sm:py-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
