import { Tag, Truck, Clock } from 'lucide-react'
import { products } from '../data/products'
import type { Product } from '../data/products'
import { ProductCard } from './ProductCard'

interface OfertasPageProps {
  onAdd: (product: Product) => void
  onDetail: (product: Product) => void
}

const offerProducts = products.filter(p => p.badge === 'Oferta')
const bestSellers = products.filter(p => p.badge === 'Más vendido')

export function OfertasPage({ onAdd, onDetail }: OfertasPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Banner */}
      <div className="relative bg-gradient-to-r from-teal-700 to-teal-500 rounded-3xl p-8 mb-10 overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-full opacity-10">
          <div className="w-64 h-64 rounded-full bg-white absolute -top-16 -right-16" />
          <div className="w-40 h-40 rounded-full bg-white absolute bottom-0 right-16" />
        </div>
        <div className="relative z-10">
          <span className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <Tag className="w-3.5 h-3.5" />
            Ofertas por tiempo limitado
          </span>
          <h1 className="text-3xl font-extrabold text-white mb-2">Ofertas del mes</h1>
          <p className="text-teal-100 text-base max-w-lg">
            Los mejores precios en productos de limpieza seleccionados. ¡Aprovecha antes que se acaben!
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            {[
              { icon: Truck, label: 'Envío gratis sobre $15.000' },
              { icon: Clock, label: 'Oferta válida hasta agotar stock' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-teal-100 text-sm">
                <Icon className="w-4 h-4" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ofertas */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-5">
          <span className="w-2 h-6 bg-orange-500 rounded-full" />
          <h2 className="text-xl font-bold text-slate-800">En oferta</h2>
          <span className="ml-2 bg-orange-100 text-orange-600 text-xs font-semibold px-2.5 py-1 rounded-full">
            {offerProducts.length} productos
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {offerProducts.map(p => (
            <ProductCard key={p.id} product={p} onAdd={onAdd} onDetail={onDetail} />
          ))}
        </div>
      </div>

      {/* Más vendidos */}
      <div>
        <div className="flex items-center gap-2 mb-5">
          <span className="w-2 h-6 bg-teal-500 rounded-full" />
          <h2 className="text-xl font-bold text-slate-800">Más vendidos</h2>
          <span className="ml-2 bg-teal-50 text-teal-700 text-xs font-semibold px-2.5 py-1 rounded-full">
            {bestSellers.length} productos
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {bestSellers.map(p => (
            <ProductCard key={p.id} product={p} onAdd={onAdd} onDetail={onDetail} />
          ))}
        </div>
      </div>
    </div>
  )
}
