import { motion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  label: string
  value: string
  delta?: string
  trend?: 'up' | 'down' | 'flat'
  icon?: LucideIcon
  index?: number
}

const trendStyles = {
  up: 'text-success',
  down: 'text-danger',
  flat: 'text-ink-muted',
}

export default function MetricCard({
  label,
  value,
  delta,
  trend = 'flat',
  icon: Icon,
  index = 0,
}: Props) {
  const TrendIcon = trend === 'up' ? ArrowUpRight : trend === 'down' ? ArrowDownRight : Minus
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="card relative overflow-hidden p-6"
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/10 blur-3xl" />
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-ink-muted">
          {label}
        </p>
        {Icon && (
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-line bg-bg-soft text-gold">
            <Icon className="h-4 w-4" />
          </span>
        )}
      </div>
      <p className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink">
        {value}
      </p>
      {delta && (
        <p
          className={cn(
            'mt-2 inline-flex items-center gap-1 text-xs font-medium',
            trendStyles[trend],
          )}
        >
          <TrendIcon className="h-3.5 w-3.5" />
          {delta}
        </p>
      )}
    </motion.div>
  )
}
