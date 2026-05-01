import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'flex flex-col gap-3',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow && (
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-gold">
          <span className="h-1 w-1 rounded-full bg-gold" />
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl font-semibold leading-[1.1] text-ink sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'max-w-2xl text-base text-ink-muted sm:text-lg',
            align === 'center' && 'mx-auto',
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  )
}
