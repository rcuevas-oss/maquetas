import type { AppointmentStatus } from '@/types'
import { Check, Clock, X } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  status: AppointmentStatus
  className?: string
}

const config: Record<
  AppointmentStatus,
  { label: string; className: string; icon: typeof Check }
> = {
  confirmada: {
    label: 'Confirmada',
    className: 'border-success/30 bg-success/10 text-success',
    icon: Check,
  },
  pendiente: {
    label: 'Pendiente',
    className: 'border-warning/30 bg-warning/10 text-warning',
    icon: Clock,
  },
  cancelada: {
    label: 'Cancelada',
    className: 'border-danger/30 bg-danger/10 text-danger',
    icon: X,
  },
}

export default function StatusBadge({ status, className }: Props) {
  const { label, className: cls, icon: Icon } = config[status]
  return (
    <span className={cn('badge', cls, className)}>
      <Icon className="h-3 w-3" />
      {label}
    </span>
  )
}
