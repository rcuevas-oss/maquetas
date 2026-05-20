import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  step: number
  total: number
  title: string
  subtitle?: string
  children: ReactNode
}

export default function BookingStep({
  step,
  total,
  title,
  subtitle,
  children,
}: Props) {
  return (
    <motion.section
      key={step}
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex flex-col gap-8"
    >
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          {Array.from({ length: total }).map((_, i) => {
            const idx = i + 1
            const done = idx < step
            const current = idx === step
            return (
              <div
                key={i}
                className={cn(
                  'h-1.5 flex-1 rounded-full transition-colors',
                  done ? 'bg-gold' : current ? 'bg-gold/60' : 'bg-line',
                )}
              />
            )
          })}
        </div>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
              Paso {step} de {total}
            </p>
            <h2 className="mt-1 font-display text-2xl font-semibold sm:text-3xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1 text-sm text-ink-muted">{subtitle}</p>
            )}
          </div>
          <span className="hidden h-12 w-12 place-items-center rounded-2xl border border-gold/30 bg-gold/5 text-gold sm:grid">
            {step === total ? <Check className="h-5 w-5" /> : (
              <span className="font-display text-lg font-semibold">{step}</span>
            )}
          </span>
        </div>
      </header>
      <div>{children}</div>
    </motion.section>
  )
}
