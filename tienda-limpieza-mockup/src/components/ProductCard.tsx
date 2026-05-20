import { useState } from 'react'
import { ShoppingCart, Check, Eye, Star } from 'lucide-react'
import type { Product } from '../data/products'
import { formatPrice } from '../data/products'

interface ProductCardProps {
  product: Product
  onAdd: (product: Product) => void
  onDetail: (product: Product) => void
}

export function ProductCard({ product, onAdd, onDetail }: ProductCardProps) {
  const [added, setAdded] = useState(false)
  const [imgError, setImgError] = useState(false)

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    onAdd(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  const fallbackSrc = `https://placehold.co/400x400/f0fdfa/0f766e?text=${encodeURIComponent(product.brand)}`

  return (
    <div
      onClick={() => onDetail(product)}
      className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-teal-100 transition-all group overflow-hidden flex flex-col cursor-pointer"
    >
      {/* Image */}
      <div className="relative bg-slate-50 flex items-center justify-center h-48 overflow-hidden">
        {product.badge && (
          <span className={`absolute top-3 left-3 text-white text-xs font-semibold px-2 py-0.5 rounded-full z-10 ${
            product.badge === 'Oferta' ? 'bg-orange-500' : 'bg-teal-600'
          }`}>
            {product.badge}
          </span>
        )}
        <img
          src={imgError ? fallbackSrc : product.image}
          alt={`${product.brand} ${product.name}`}
          className="h-36 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
          onError={() => setImgError(true)}
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-teal-600/0 group-hover:bg-teal-600/5 transition-colors flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full px-3 py-1.5 flex items-center gap-1.5 text-xs font-semibold text-teal-700 shadow-md">
            <Eye className="w-3.5 h-3.5" />
            Ver detalle
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-bold text-teal-600 uppercase tracking-wide">
            {product.brand}
          </span>
          <div className="flex items-center gap-0.5">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-xs text-slate-400">{product.rating}</span>
          </div>
        </div>
        <h3 className="text-sm font-semibold text-slate-800 leading-snug mb-1">
          {product.name}
        </h3>
        <p className="text-xs text-slate-400 mb-3">{product.volume}</p>

        <div className="mt-auto flex items-center justify-between gap-2">
          <span className="text-lg font-bold text-slate-900">{formatPrice(product.price)}</span>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              added
                ? 'bg-emerald-500 text-white'
                : 'bg-teal-600 hover:bg-teal-700 text-white'
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Agregado</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Agregar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
