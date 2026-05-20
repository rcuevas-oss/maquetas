import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, CalendarCheck, Pencil } from 'lucide-react'
import type { Barber } from '@/types'
import { cn } from '@/lib/utils'

type Props = {
  barber: Barber
  selected?: boolean
  onSelect?: (b: Barber) => void
  showAdminActions?: boolean
  showBookCTA?: boolean
  index?: number
}

export default function BarberCard({
  barber,
  selected,
  onSelect,
  showAdminActions,
  showBookCTA,
  index = 0,
}: Props) {
  const interactive = Boolean(onSelect)
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-bg-card shadow-card transition-all duration-300 hover:border-gold/50 hover:shadow-gold',
        selected && 'border-gold/70 shadow-gold',
      )}
    >
      <button
        type="button"
        disabled={!interactive}
        onClick={() => onSelect?.(barber)}
        className={cn(
          'flex flex-1 flex-col text-left',
          interactive ? 'cursor-pointer' : 'cursor-default',
        )}
      >
        {/* Photo */}
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{
              backgroundImage: barber.image ? `url(${barber.image})` : undefined,
              backgroundColor: '#0F0F16',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/40 to-transparent" />
          <div className="absolute inset-0 bg-black/20" />
          <span
            className={cn(
              'badge absolute right-3 top-3 backdrop-blur-md',
              barber.available
                ? 'border-success/40 bg-success/15 text-success'
                : 'border-line bg-bg/70 text-ink-muted',
            )}
          >
            <span
              className={cn(
                'h-1.5 w-1.5 rounded-full',
                barber.available ? 'bg-success' : 'bg-ink-dim',
              )}
            />
            {barber.available ? 'Disponible' : 'Ocupado'}
          </span>
          {!barber.image && (
            <div className="absolute inset-0 grid place-items-center">
              <span className="grid h-20 w-20 place-items-center rounded-3xl border border-gold/30 bg-gold/10 font-display text-2xl font-semibold text-gold">
                {barber.initials}
              </span>
            </div>
          )}
          <div className="absolute bottom-3 left-4 right-4">
            <h3 className="font-display text-xl font-semibold leading-tight">
              {barber.name}
            </h3>
            <p className="text-xs text-gold">{barber.specialty}</p>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-3 p-5">
          <p className="text-sm text-ink-muted">{barber.bio}</p>
          <div className="mt-auto flex items-center justify-between border-t border-line/70 pt-3 text-xs">
            <span className="inline-flex items-center gap-1.5 text-ink-muted">
              <CalendarCheck className="h-3.5 w-3.5 text-gold" />
              Próxima hora:{' '}
              <span className="font-medium text-ink">
                {barber.nextSlot ?? '—'}
              </span>
            </span>
            <span className="text-ink-dim">{barber.todayBookings} citas hoy</span>
          </div>
        </div>
      </button>

      {/* Footer actions (outside the main button to allow nested links) */}
      {(showAdminActions || showBookCTA) && (
        <div className="flex flex-wrap items-center gap-2 border-t border-line/70 px-5 py-3">
          {showAdminActions && (
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-lg border border-line px-2.5 py-1 text-xs text-ink-muted transition hover:border-gold/40 hover:text-gold"
            >
              <Pencil className="h-3 w-3" />
              Editar
            </button>
          )}
          {showBookCTA && (
            <Link
              to="/reservar"
              className="ml-auto inline-flex items-center gap-1.5 rounded-xl bg-gold px-3 py-2 text-xs font-semibold text-bg transition hover:bg-gold-hover"
            >
              Reservar con {barber.name.split(' ')[0]}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      )}
    </motion.div>
  )
}
