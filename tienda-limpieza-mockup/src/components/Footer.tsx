import { Leaf, MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react'
import type { Page } from './Header'

interface FooterProps {
  onNavigate: (page: Page) => void
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-bold text-lg">LimpiaMás</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Tu tienda de confianza para productos de limpieza del hogar. Marcas líderes a precio directo.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-teal-600 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-teal-600 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Tienda */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Tienda</h4>
            <ul className="space-y-2">
              {[
                { label: 'Todos los productos', page: 'productos' as Page },
                { label: 'Ofertas del mes', page: 'ofertas' as Page },
              ].map(({ label, page }) => (
                <li key={label}>
                  <button
                    onClick={() => onNavigate(page)}
                    className="text-sm text-slate-400 hover:text-teal-400 transition-colors text-left"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Información</h4>
            <ul className="space-y-2">
              {['Sobre nosotros', 'Política de envíos', 'Devoluciones', 'Preguntas frecuentes'].map(l => (
                <li key={l}>
                  <button className="text-sm text-slate-400 hover:text-teal-400 transition-colors text-left">
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Contacto</h4>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2 text-sm text-slate-400">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-teal-500" />
                Av. Providencia 1234, Santiago
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-400">
                <Phone className="w-4 h-4 shrink-0 text-teal-500" />
                +56 2 2345 6789
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-400">
                <Mail className="w-4 h-4 shrink-0 text-teal-500" />
                contacto@limpiamas.cl
              </li>
            </ul>
            <button
              onClick={() => onNavigate('contacto')}
              className="mt-4 text-xs text-teal-400 hover:text-teal-300 font-semibold transition-colors"
            >
              Envíanos un mensaje →
            </button>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <p>© 2025 LimpiaMás. Todos los derechos reservados.</p>
          <p>Maqueta demostrativa · No es un sitio real</p>
        </div>
      </div>
    </footer>
  )
}
