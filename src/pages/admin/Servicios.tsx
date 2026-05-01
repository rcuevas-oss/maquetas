import { motion } from 'framer-motion'
import { Clock, MoreVertical, Pencil, Plus, Scissors, Trash2 } from 'lucide-react'
import AdminLayout from '@/components/AdminLayout'
import PrimaryButton from '@/components/PrimaryButton'
import { SERVICES } from '@/data/mockData'
import { cn, formatCLP, formatDuration } from '@/lib/utils'

export default function ServiciosPage() {
  return (
    <AdminLayout
      title="Servicios"
      subtitle="El catálogo que ven tus clientes al reservar"
      actions={
        <>
          <PrimaryButton leftIcon={<Plus className="h-4 w-4" />}>
            Nuevo servicio
          </PrimaryButton>
          <PrimaryButton variant="secondary">Importar desde CSV</PrimaryButton>
        </>
      }
    >
      {/* Mobile cards */}
      <div className="grid gap-4 md:hidden">
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            className="card p-5"
          >
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-bg-soft text-gold">
                <Scissors className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{s.name}</p>
                <p className="text-xs text-ink-muted">{s.description}</p>
              </div>
              <span
                className={cn(
                  'badge',
                  s.active
                    ? 'border-success/30 bg-success/10 text-success'
                    : 'border-line bg-bg-soft text-ink-muted',
                )}
              >
                {s.active ? 'Activo' : 'Inactivo'}
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="inline-flex items-center gap-1.5 text-ink-muted">
                <Clock className="h-3.5 w-3.5 text-gold" />
                {formatDuration(s.durationMin)}
              </span>
              <span className="font-display text-lg font-semibold">
                {formatCLP(s.price)}
              </span>
            </div>
            <div className="mt-4 flex gap-2 border-t border-line/70 pt-4">
              <button className="btn-secondary h-9 flex-1 px-3 text-xs">
                <Pencil className="h-3.5 w-3.5" /> Editar
              </button>
              <button className="btn h-9 px-3 text-xs text-danger hover:bg-danger/10">
                <Trash2 className="h-3.5 w-3.5" /> Eliminar
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="card hidden overflow-hidden p-0 md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-bg-soft text-left">
              <Th>Servicio</Th>
              <Th>Duración</Th>
              <Th>Precio</Th>
              <Th>Estado</Th>
              <Th align="right">Acciones</Th>
            </tr>
          </thead>
          <tbody>
            {SERVICES.map((s, i) => (
              <motion.tr
                key={s.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="border-b border-line/60 last:border-0 transition hover:bg-bg-soft/40"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-bg-soft text-gold">
                      <Scissors className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-medium">{s.name}</p>
                      <p className="text-xs text-ink-muted">{s.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-ink-muted">
                  {formatDuration(s.durationMin)}
                </td>
                <td className="px-6 py-4 font-medium">
                  {formatCLP(s.price)}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={cn(
                      'badge',
                      s.active
                        ? 'border-success/30 bg-success/10 text-success'
                        : 'border-line bg-bg-soft text-ink-muted',
                    )}
                  >
                    {s.active ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      className="rounded-lg border border-line p-2 text-ink-muted transition hover:border-gold/40 hover:text-gold"
                      aria-label="Editar"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      className="rounded-lg border border-line p-2 text-ink-muted transition hover:border-danger/40 hover:text-danger"
                      aria-label="Eliminar"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      className="rounded-lg border border-line p-2 text-ink-muted transition hover:text-ink"
                      aria-label="Más"
                    >
                      <MoreVertical className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}

function Th({
  children,
  align = 'left',
}: {
  children: React.ReactNode
  align?: 'left' | 'right'
}) {
  return (
    <th
      className={cn(
        'px-6 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-dim',
        align === 'right' && 'text-right',
      )}
    >
      {children}
    </th>
  )
}
