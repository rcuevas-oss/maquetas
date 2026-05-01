import { useState, type ReactNode } from 'react'
import { Bell, Menu, Search } from 'lucide-react'
import AdminSidebar from './AdminSidebar'
import { STUDIO } from '@/data/mockData'

type Props = {
  title: string
  subtitle?: string
  actions?: ReactNode
  children: ReactNode
}

export default function AdminLayout({
  title,
  subtitle,
  actions,
  children,
}: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-bg">
      <AdminSidebar open={open} onClose={() => setOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-line bg-bg/85 backdrop-blur-xl">
          <div className="flex h-16 items-center gap-4 px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setOpen(true)}
              className="grid h-9 w-9 place-items-center rounded-lg border border-line text-ink-muted md:hidden"
              aria-label="Abrir menú"
            >
              <Menu className="h-4 w-4" />
            </button>
            <div className="min-w-0">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink-dim">
                {STUDIO.name}
              </p>
              <h1 className="truncate font-display text-lg font-semibold sm:text-xl">
                {title}
              </h1>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <div className="relative hidden md:block">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-dim" />
                <input
                  className="input h-10 w-64 pl-9"
                  placeholder="Buscar reservas, clientes…"
                />
              </div>
              <button
                aria-label="Notificaciones"
                className="relative grid h-10 w-10 place-items-center rounded-xl border border-line bg-bg-card text-ink-muted hover:text-ink"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-gold" />
              </button>
              <div className="hidden items-center gap-3 rounded-xl border border-line bg-bg-card px-3 py-1.5 sm:flex">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-gold/20 font-display text-xs font-semibold text-gold">
                  GS
                </span>
                <div className="text-xs">
                  <p className="font-medium text-ink">Dueño</p>
                  <p className="text-ink-dim">admin@goodstyle.cl</p>
                </div>
              </div>
            </div>
          </div>
          {subtitle && (
            <div className="border-t border-line/70 px-4 py-3 text-sm text-ink-muted sm:px-6 lg:px-8">
              {subtitle}
            </div>
          )}
        </header>

        <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {actions && (
            <div className="mb-6 flex flex-wrap items-center gap-3">{actions}</div>
          )}
          {children}
        </div>
      </div>
    </div>
  )
}
