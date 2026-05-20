import { useMemo, useState } from 'react'
import { Filter, Plus, Search } from 'lucide-react'
import AdminLayout from '@/components/AdminLayout'
import AppointmentCard from '@/components/AppointmentCard'
import PrimaryButton from '@/components/PrimaryButton'
import { APPOINTMENTS } from '@/data/mockData'
import type { AppointmentStatus } from '@/types'
import { cn } from '@/lib/utils'

type Filtro = 'todas' | AppointmentStatus

const FILTERS: { id: Filtro; label: string }[] = [
  { id: 'todas', label: 'Todas' },
  { id: 'confirmada', label: 'Confirmadas' },
  { id: 'pendiente', label: 'Pendientes' },
  { id: 'cancelada', label: 'Canceladas' },
]

export default function ReservasPage() {
  const [filtro, setFiltro] = useState<Filtro>('todas')
  const [query, setQuery] = useState('')

  const counts = useMemo(() => {
    return {
      todas: APPOINTMENTS.length,
      confirmada: APPOINTMENTS.filter((a) => a.status === 'confirmada').length,
      pendiente: APPOINTMENTS.filter((a) => a.status === 'pendiente').length,
      cancelada: APPOINTMENTS.filter((a) => a.status === 'cancelada').length,
    }
  }, [])

  const list = useMemo(() => {
    return APPOINTMENTS.filter((a) =>
      filtro === 'todas' ? true : a.status === filtro,
    )
      .filter((a) => {
        if (!query.trim()) return true
        const q = query.toLowerCase()
        return (
          a.clientName.toLowerCase().includes(q) ||
          a.serviceName.toLowerCase().includes(q) ||
          a.barberName.toLowerCase().includes(q)
        )
      })
      .sort((a, b) => a.time.localeCompare(b.time))
  }, [filtro, query])

  return (
    <AdminLayout
      title="Reservas"
      subtitle="Filtra, busca y gestiona en segundos"
      actions={
        <>
          <PrimaryButton leftIcon={<Plus className="h-4 w-4" />}>
            Nueva reserva
          </PrimaryButton>
          <PrimaryButton
            variant="secondary"
            leftIcon={<Filter className="h-4 w-4" />}
          >
            Filtros avanzados
          </PrimaryButton>
        </>
      }
    >
      {/* Filters & search */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFiltro(f.id)}
              className={cn(
                'inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition',
                filtro === f.id
                  ? 'border-gold bg-gold/10 text-gold'
                  : 'border-line bg-bg-card text-ink-muted hover:border-gold/40 hover:text-ink',
              )}
            >
              {f.label}
              <span
                className={cn(
                  'rounded-full px-1.5 py-0.5 text-[10px]',
                  filtro === f.id
                    ? 'bg-gold/20 text-gold'
                    : 'bg-bg-soft text-ink-dim',
                )}
              >
                {counts[f.id]}
              </span>
            </button>
          ))}
        </div>
        <div className="relative sm:ml-auto sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-dim" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input h-10 pl-9"
            placeholder="Buscar cliente, servicio…"
          />
        </div>
      </div>

      {list.length === 0 ? (
        <div className="card flex flex-col items-center gap-2 p-12 text-center text-ink-muted">
          <p className="font-display text-lg font-semibold text-ink">
            Sin resultados
          </p>
          <p className="text-sm">Prueba con otro filtro o búsqueda.</p>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {list.map((a, i) => (
            <AppointmentCard
              key={a.id}
              appointment={a}
              index={i}
              showActions
            />
          ))}
        </div>
      )}
    </AdminLayout>
  )
}
