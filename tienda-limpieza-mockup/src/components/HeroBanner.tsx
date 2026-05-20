import { ArrowRight, Shield, Truck, Star } from 'lucide-react'
import type { Page } from './Header'

interface HeroBannerProps {
  onNavigate: (page: Page) => void
}

export function HeroBanner({ onNavigate }: HeroBannerProps) {
  return (
    <section className="relative bg-white overflow-hidden border-b border-slate-100">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-emerald-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <span className="inline-flex items-center gap-1.5 bg-teal-50 border border-teal-200 text-teal-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
              <Star className="w-3 h-3 fill-teal-500 text-teal-500" />
              Envío gratis sobre $15.000
            </span>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-slate-900 leading-tight mb-5">
              Tu hogar,
              <span className="block text-teal-600">siempre impecable.</span>
            </h1>
            <p className="text-slate-500 text-lg mb-8 max-w-md leading-relaxed">
              Los mejores productos de limpieza del mercado chileno. Marcas líderes,
              precios directos y entrega rápida a todo Chile.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('productos')}
                className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-full transition-colors shadow-lg shadow-teal-100"
              >
                Ver productos
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('ofertas')}
                className="inline-flex items-center gap-2 border border-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-full hover:border-teal-300 hover:text-teal-700 transition-colors"
              >
                Ver ofertas
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-slate-100">
              {[
                { icon: Truck, label: 'Despacho a todo Chile' },
                { icon: Shield, label: 'Pago 100% seguro' },
                { icon: Star, label: 'Marcas garantizadas' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-slate-500 text-sm">
                  <Icon className="w-4 h-4 text-teal-500" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              <img
                src="https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800&q=80&auto=format&fit=crop"
                alt="Productos de limpieza"
                className="w-full h-full object-cover rounded-3xl shadow-xl"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=800&q=80&auto=format&fit=crop'
                }}
              />
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-slate-100">
                <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center">
                  <Star className="w-5 h-5 text-teal-600 fill-teal-600" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">+2.000 clientes</div>
                  <div className="text-sm font-bold text-slate-800">Calificación 4.9 ★</div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-teal-600 text-white rounded-2xl shadow-xl px-4 py-3 text-center">
                <div className="text-xs opacity-80">Hasta</div>
                <div className="text-lg font-extrabold">30% OFF</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
