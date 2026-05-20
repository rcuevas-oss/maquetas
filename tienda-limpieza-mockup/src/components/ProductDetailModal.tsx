import { useState } from 'react'
import { X, ShoppingCart, Check, Star, Package, Truck, Shield, ChevronRight } from 'lucide-react'
import type { Product } from '../data/products'
import { formatPrice } from '../data/products'

interface ProductDetailModalProps {
  product: Product | null
  onClose: () => void
  onAdd: (product: Product) => void
}

export function ProductDetailModal({ product, onClose, onAdd }: ProductDetailModalProps) {
  const [added, setAdded] = useState(false)
  const [imgError, setImgError] = useState(false)

  if (!product) return null

  const handleAdd = () => {
    onAdd(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const fallbackSrc = `https://placehold.co/500x500/f0fdfa/0f766e?text=${encodeURIComponent(product.brand)}`

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-5 pb-0">
            <nav className="flex items-center gap-1 text-xs text-slate-400">
              <span>Tienda</span>
              <ChevronRight className="w-3 h-3" />
              <span>{product.category}</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-slate-600 font-medium">{product.brand}</span>
            </nav>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">
            {/* Image */}
            <div className="bg-gradient-to-br from-teal-50 to-slate-50 rounded-2xl flex items-center justify-center p-8 aspect-square">
              <img
                src={imgError ? fallbackSrc : product.image}
                alt={product.name}
                className="w-full h-full object-contain"
                onError={() => setImgError(true)}
              />
            </div>

            {/* Details */}
            <div className="flex flex-col">
              {/* Brand + badge */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-bold text-teal-600 uppercase tracking-wide">
                  {product.brand}
                </span>
                {product.badge && (
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full text-white ${
                    product.badge === 'Oferta' ? 'bg-orange-500' : 'bg-teal-600'
                  }`}>
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Name */}
              <h2 className="text-xl font-bold text-slate-900 leading-tight mb-2">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i <= Math.round(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-200 fill-slate-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-slate-500">{product.rating} / 5.0</span>
              </div>

              {/* Volume */}
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-500">Contenido: <strong className="text-slate-700">{product.volume}</strong></span>
              </div>

              {/* Price */}
              <div className="mb-5">
                <span className="text-3xl font-extrabold text-slate-900">
                  {formatPrice(product.price)}
                </span>
                <span className="text-sm text-slate-400 ml-2">c/u</span>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-500 leading-relaxed mb-5">
                {product.description}
              </p>

              {/* Highlights */}
              <ul className="space-y-2 mb-6">
                {product.highlights.map(h => (
                  <li key={h} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={handleAdd}
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold transition-all text-base ${
                  added
                    ? 'bg-emerald-500 text-white'
                    : 'bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-100'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" />
                    Agregado al carrito
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Agregar al carrito
                  </>
                )}
              </button>

              {/* Badges */}
              <div className="flex gap-4 mt-4 justify-center">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Truck className="w-3.5 h-3.5 text-teal-500" />
                  Despacho a domicilio
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Shield className="w-3.5 h-3.5 text-teal-500" />
                  Pago seguro
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
