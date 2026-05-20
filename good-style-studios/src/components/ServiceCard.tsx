import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import type { Service } from '@/types'
import { cn, formatCLP, formatDuration } from '@/lib/utils'

type Props = {
  service: Service
  selected?: boolean
  onSelect?: (s: Service) => void
  index?: number
}

export default function ServiceCard({
  service,
  selected,
  onSelect,
  index = 0,
}: Props) {
  const interactive = Boolean(onSelect)
  return (
    <motion.button
      type="button"
      onClick={() => onSelect?.(service)}
      disabled={!interactive}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={interactive ? { y: -3 } : undefined}
      className={cn(
        'group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-bg-card text-left shadow-card transition-all duration-300',
        interactive && 'cursor-pointer hover:border-gold/50 hover:shadow-gold',
        selected && 'border-gold/70 shadow-gold',
        !interactive && 'cursor-default',
      )}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{
            backgroundImage: service.image
              ? `url(${service.image})`
              : undefined,
            backgroundColor: '#0F0F16',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/60 to-transparent" />
        <div className="absolute inset-0 bg-black/30" />
        {service.tag && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-gold/40 bg-bg/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-gold backdrop-blur-md">
            {service.tag}
          </span>
        )}
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-3">
          <h3 className="font-display text-xl font-semibold leading-tight">
            {service.name}
          </h3>
          <span className="font-display text-lg font-semibold text-gold">
            {formatCLP(service.price)}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-sm text-ink-muted">{service.description}</p>
        <div className="mt-auto flex items-center justify-between pt-2 text-xs">
          <span className="inline-flex items-center gap-1.5 text-ink-muted">
            <Clock className="h-3.5 w-3.5 text-gold" />
            {formatDuration(service.durationMin)}
          </span>
          {interactive ? (
            <span className="font-medium text-gold opacity-0 transition group-hover:opacity-100">
              Reservar →
            </span>
          ) : (
            <span className="text-[11px] font-medium uppercase tracking-wider text-ink-dim">
              Reservar online
            </span>
          )}
        </div>
      </div>
    </motion.button>
  )
}
