import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, Phone } from 'lucide-react'
import { STUDIO } from '@/data/mockData'

export default function MobileBookingBar() {
  const { pathname } = useLocation()
  // Hide on the booking flow itself and on admin pages
  if (pathname.startsWith('/reservar') || pathname.startsWith('/admin')) {
    return null
  }
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 backdrop-blur-xl shadow-[0_-8px_24px_rgba(0,0,0,0.5)] md:hidden"
      style={{
        paddingBottom: 'max(0.65rem, env(safe-area-inset-bottom))',
      }}
    >
      <div className="flex items-center gap-3 px-4 pt-3">
        <a
          href={`tel:${STUDIO.phone.replace(/\s/g, '')}`}
          aria-label="Llamar"
          className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-xl border border-line bg-bg-card text-ink-muted transition active:scale-95"
        >
          <Phone className="h-4 w-4" />
        </a>
        <Link
          to="/reservar"
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-gold text-sm font-semibold text-bg shadow-soft transition active:scale-95"
        >
          Reservar mi corte
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
