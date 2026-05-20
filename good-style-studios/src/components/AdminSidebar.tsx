import { NavLink, Link } from 'react-router-dom'
import {
  CalendarRange,
  ChevronLeft,
  LayoutDashboard,
  Scissors,
  Settings,
  Users,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const ITEMS = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/reservas', label: 'Reservas', icon: CalendarRange },
  { to: '/admin/servicios', label: 'Servicios', icon: Scissors },
  { to: '/admin/barberos', label: 'Barberos', icon: Users },
]

type Props = {
  open: boolean
  onClose: () => void
}

export default function AdminSidebar({ open, onClose }: Props) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-line bg-bg-soft transition-transform duration-300 md:sticky md:top-0 md:h-screen md:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-line px-5">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-gold/30 bg-gold/10">
              <Scissors className="h-4 w-4 text-gold" />
            </span>
            <span className="font-display text-sm font-semibold leading-tight">
              Good Style
              <br />
              <span className="gold-text">Studios</span>
            </span>
          </Link>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-lg border border-line text-ink-muted hover:text-ink md:hidden"
            aria-label="Cerrar menú"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <p className="px-3 pb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-ink-dim">
            Operación
          </p>
          <ul className="flex flex-col gap-1">
            {ITEMS.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition',
                        isActive
                          ? 'border border-gold/30 bg-gold/10 text-gold'
                          : 'border border-transparent text-ink-muted hover:bg-bg-card hover:text-ink',
                      )
                    }
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="border-t border-line p-4">
          <div className="rounded-xl border border-line bg-bg-card p-3">
            <p className="text-[11px] font-medium uppercase tracking-wider text-gold">
              Sistema activo
            </p>
            <p className="mt-1 text-xs text-ink-muted">
              Versión propia. Sin suscripciones externas.
            </p>
          </div>
          <button className="mt-3 inline-flex w-full items-center gap-2 rounded-xl border border-line px-3 py-2 text-xs text-ink-muted hover:text-ink">
            <Settings className="h-3.5 w-3.5" />
            Configuración
          </button>
        </div>
      </aside>
    </>
  )
}
