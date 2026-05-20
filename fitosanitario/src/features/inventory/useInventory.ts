import { useState, useEffect } from 'react'
import { api } from '../../services/api'
import type { Product, Movement } from '../../types'

export function useInventory() {
  const [products, setProducts] = useState<Product[]>([])
  const [movements, setMovements] = useState<Movement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([api.getProducts(), api.getMovements()])
      .then(([prods, movs]) => {
        setProducts(prods)
        setMovements(movs)
      })
      .finally(() => setLoading(false))
  }, [])

  return { products, movements, loading }
}
