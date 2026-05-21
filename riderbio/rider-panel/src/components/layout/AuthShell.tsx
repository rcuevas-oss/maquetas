import type { ReactNode } from "react";
import { Logo } from "../ui/Logo";
import { useTheme } from "../../hooks/useTheme";
import { Sun, Moon } from "lucide-react";

interface Props {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthShell({ title, subtitle, children, footer }: Props) {
  const { isDark, toggle } = useTheme();
  return (
    <div className="flex min-h-screen flex-col" style={{ background: "var(--rb-bg)" }}>
      <header className="flex h-14 items-center justify-between px-5 sm:px-8">
        <Logo />
        <button
          onClick={toggle}
          aria-label="Cambiar tema"
          className="grid h-9 w-9 place-items-center rounded-lg"
          style={{ color: "var(--rb-muted)", background: "var(--rb-hover)" }}
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </header>

      <main className="flex flex-1 items-center justify-center px-5 py-8">
        <div className="w-full max-w-md">
          <div className="card p-6 sm:p-8">
            <h1 className="heading-2">{title}</h1>
            {subtitle && (
              <p className="mt-2 text-sm" style={{ color: "var(--rb-muted)" }}>
                {subtitle}
              </p>
            )}
            <div className="mt-6">{children}</div>
          </div>
          {footer && (
            <p className="mt-5 text-center text-sm" style={{ color: "var(--rb-muted)" }}>
              {footer}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
