import { motion } from 'framer-motion'
import { Phone, Scissors, User } from 'lucide-react'
import type { Appointment } from '@/types'
import StatusBadge from './StatusBadge'
import { cn, formatCLP } from '@/lib/utils'

type Props = {
  appointment: Appointment
  index?: number
  compact?: boolean
  showActions?: boolean
}

export default function AppointmentCard({
  appointment,
  index = 0,
  compact,
  showActions,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className={cn('card flex flex-col gap-3 p-5', !compact && 'sm:p-6')}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-14 flex-col items-center justify-center rounded-xl border border-gold/30 bg-gold/10 font-display">
            <span className="text-base font-semibold text-gold leading-none">
              {appointment.time}
            </span>
            <span className="mt-0.5 text-[10px] uppercase tracking-wider text-gold/80">
              hrs
            </span>
          </div>
          <div>
            <p className="font-semibold text-ink">{appointment.clientName}</p>
            <p className="flex items-center gap-1.5 text-xs text-ink-muted">
              <Phone className="h-3 w-3" />
              {appointment.clientPhone}
            </p>
          </div>
        </div>
        <StatusBadge status={appointment.status} />
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-line/70 pt-3 text-xs text-ink-muted">
        <span className="inline-flex items-center gap-1.5">
          <Scissors className="h-3.5 w-3.5 text-gold" />
          {appointment.serviceName}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <User className="h-3.5 w-3.5 text-gold" />
          {appointment.barberName}
        </span>
        <span className="ml-auto font-medium text-ink">
          {formatCLP(appointment.price)}
        </span>
      </div>

      {appointment.notes && (
        <p className="rounded-lg border border-line/70 bg-bg-soft px-3 py-2 text-xs text-ink-muted">
          “{appointment.notes}”
        </p>
      )}

      {showActions && (
        <div className="flex flex-wrap gap-2 pt-1">
          <button className="rounded-lg border border-line px-3 py-1.5 text-xs text-ink-muted transition hover:border-success/40 hover:text-success">
            Confirmar
          </button>
          <button className="rounded-lg border border-line px-3 py-1.5 text-xs text-ink-muted transition hover:border-gold/40 hover:text-gold">
            Reagendar
          </button>
          <button className="rounded-lg border border-line px-3 py-1.5 text-xs text-ink-muted transition hover:border-danger/40 hover:text-danger">
            Cancelar
          </button>
        </div>
      )}
    </motion.div>
  )
}
