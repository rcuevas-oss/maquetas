import { useState, useCallback } from 'react'
import type { Product } from '../data/products'

export interface CartItem extends Product {
  quantity: number
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = useCallback((product: Product) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) {
        return prev.map(i =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }, [])

  const removeItem = useCallback((id: number) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [])

  const updateQuantity = useCallback((id: number, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(i => i.id !== id))
      return
    }
    setItems(prev =>
      prev.map(i => (i.id === id ? { ...i, quantity } : i))
    )
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return { items, addItem, removeItem, updateQuantity, clear, totalItems, totalPrice }
}
