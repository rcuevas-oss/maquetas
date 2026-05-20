import type { Product } from '../data/products'
import { ProductCard } from './ProductCard'

interface ProductGridProps {
  products: Product[]
  onAdd: (product: Product) => void
  onDetail: (product: Product) => void
}

export function ProductGrid({ products, onAdd, onDetail }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20 text-slate-400">
        <p className="text-lg font-medium">No hay productos en esta categoría.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map(product => (
        <ProductCard key={product.id} product={product} onAdd={onAdd} onDetail={onDetail} />
      ))}
    </div>
  )
}
