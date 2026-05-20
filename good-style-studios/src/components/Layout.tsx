import type { ReactNode } from 'react'
import PublicNavbar from './PublicNavbar'
import MobileBookingBar from './MobileBookingBar'
import { MapPin, Scissors } from 'lucide-react'
import InstagramIcon from './InstagramIcon'
import { Link } from 'react-router-dom'
import { STUDIO } from '@/data/mockData'

type Props = {
  children: ReactNode
  hideFooter?: boolean
  hideMobileBar?: boolean
}

export default function Layout({ children, hideFooter, hideMobileBar }: Props) {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicNavbar />
      <main className="flex-1 pt-16 pb-24 md:pb-0">{children}</main>
      {!hideFooter && (
        <footer className="border-t border-line bg-bg-soft/60">
          <div className="container-app grid gap-10 py-12 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-xl border border-gold/30 bg-gold/10">
                  <Scissors className="h-4 w-4 text-gold" />
                </span>
                <span className="font-display text-lg font-semibold">
                  Good Style <span className="gold-text">Studios</span>
                </span>
              </div>
              <p className="mt-4 max-w-md text-sm text-ink-muted">
                {STUDIO.description}
              </p>
            </div>

            <div>
              <p className="label">Visítanos</p>
              <p className="flex items-start gap-2 text-sm text-ink-muted">
                <MapPin className="mt-0.5 h-4 w-4 text-gold" />
                {STUDIO.address}
              </p>
              <p className="mt-2 text-sm text-ink-muted">{STUDIO.hours}</p>
            </div>

            <div>
              <p className="label">Síguenos</p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-gold"
              >
                <InstagramIcon className="h-4 w-4" /> {STUDIO.instagram}
              </a>
              <div className="mt-4 flex gap-3">
                <Link
                  to="/reservar"
                  className="text-sm text-ink hover:text-gold"
                >
                  Reservar
                </Link>
                <Link
                  to="/admin"
                  className="text-sm text-ink-dim hover:text-gold"
                >
                  Panel
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-line">
            <div className="container-app flex flex-col items-center justify-between gap-2 py-5 text-xs text-ink-dim md:flex-row">
              <p>
                © {new Date().getFullYear()} {STUDIO.name}. Todos los derechos
                reservados.
              </p>
              <p>Sistema de reservas propio · Maqueta visual</p>
            </div>
          </div>
        </footer>
      )}
      {!hideMobileBar && <MobileBookingBar />}
    </div>
  )
}
