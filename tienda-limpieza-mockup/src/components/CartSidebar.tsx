import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import type { CartItem } from '../hooks/useCart'
import { formatPrice } from '../data/products'

interface CartSidebarProps {
  isOpen: boolean
  items: CartItem[]
  totalPrice: number
  onClose: () => void
  onUpdateQuantity: (id: number, quantity: number) => void
  onRemove: (id: number) => void
  onClear: () => void
}

export function CartSidebar({
  isOpen,
  items,
  totalPrice,
  onClose,
  onUpdateQuantity,
  onRemove,
  onClear,
}: CartSidebarProps) {
  const shipping = totalPrice >= 15000 ? 0 : 2990
  const total = totalPrice + shipping

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-teal-600" />
            <h2 className="font-bold text-slate-800">Mi carrito</h2>
            {items.length > 0 && (
              <span className="bg-teal-50 text-teal-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                {items.reduce((s, i) => s + i.quantity, 0)} items
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-3">
              <ShoppingBag className="w-12 h-12 opacity-30" />
              <p className="text-sm font-medium">Tu carrito está vacío</p>
              <button
                onClick={onClose}
                className="text-teal-600 text-sm font-semibold hover:underline"
              >
                Seguir comprando
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-3">
                <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-contain"
                    onError={(e) => {
                      e.currentTarget.src = `https://placehold.co/100x100/f0fdfa/0f766e?text=${encodeURIComponent(item.brand)}`
                    }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs text-teal-600 font-bold">{item.brand}</p>
                  <p className="text-sm font-medium text-slate-800 truncate">{item.name}</p>
                  <p className="text-xs text-slate-400">{item.volume}</p>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                      >
                        <Minus className="w-3 h-3 text-slate-600" />
                      </button>
                      <span className="w-6 text-center text-sm font-semibold text-slate-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-3 h-3 text-slate-600" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-800">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-5 py-4 border-t border-slate-100 space-y-3 bg-slate-50/50">
            <div className="flex items-center justify-between text-sm text-slate-500">
              <span>Subtotal</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Envío</span>
              {shipping === 0 ? (
                <span className="text-teal-600 font-semibold">Gratis</span>
              ) : (
                <span className="text-slate-600">{formatPrice(shipping)}</span>
              )}
            </div>
            {shipping > 0 && (
              <p className="text-xs text-slate-400 bg-teal-50 rounded-lg px-3 py-2 border border-teal-100">
                Agrega {formatPrice(15000 - totalPrice)} más para envío gratis
              </p>
            )}
            <div className="flex items-center justify-between font-bold text-slate-900 text-base pt-2 border-t border-slate-200">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>

            <button className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3.5 rounded-2xl transition-colors">
              Proceder al pago
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onClear}
              className="w-full text-sm text-slate-400 hover:text-red-500 transition-colors py-1"
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
