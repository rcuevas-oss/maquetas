import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, Scissors, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import PrimaryButton from './PrimaryButton'

const NAV_LINKS = [
  { href: '/#servicios', label: 'Servicios' },
  { href: '/#barberos', label: 'Barberos' },
  { href: '/#beneficios', label: 'Beneficios' },
  { href: '/#ubicacion', label: 'Ubicación' },
]

export default function PublicNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-line/80 bg-bg/85 backdrop-blur-xl'
          : 'border-b border-transparent',
      )}
    >
      <div className="container-app flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-gold/30 bg-gold/10">
            <Scissors className="h-4 w-4 text-gold" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Good Style <span className="gold-text">Studios</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-ink-muted transition hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/admin"
            className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-bg-card px-3 py-1.5 text-sm text-ink-muted transition hover:border-gold/50 hover:text-gold"
          >
            Ver panel demo
          </Link>
          <Link to="/reservar">
            <PrimaryButton size="sm">Reservar</PrimaryButton>
          </Link>
        </div>

        <button
          type="button"
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-bg-card md:hidden"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-line bg-bg-soft md:hidden"
        >
          <div className="container-app flex flex-col gap-2 py-4">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-lg px-3 py-2 text-sm text-ink-muted hover:bg-bg-card hover:text-ink"
              >
                {l.label}
              </a>
            ))}
            <Link
              to="/admin"
              className="rounded-lg px-3 py-2 text-sm text-ink-muted hover:bg-bg-card hover:text-ink"
            >
              Ver panel demo
            </Link>
            <Link to="/reservar" className="mt-2">
              <PrimaryButton full>Reservar ahora</PrimaryButton>
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
