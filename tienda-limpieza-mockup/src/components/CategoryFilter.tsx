import { UtensilsCrossed, Bath, Shirt, Layers, Wind, LayoutGrid } from 'lucide-react'
import type { Category } from '../data/products'
import { CATEGORIES } from '../data/products'

const ICONS: Record<Category, React.ReactNode> = {
  Todos: <LayoutGrid className="w-4 h-4" />,
  Cocina: <UtensilsCrossed className="w-4 h-4" />,
  Baño: <Bath className="w-4 h-4" />,
  Ropa: <Shirt className="w-4 h-4" />,
  Pisos: <Layers className="w-4 h-4" />,
  Desinfectantes: <Wind className="w-4 h-4" />,
}

interface CategoryFilterProps {
  active: Category
  onChange: (cat: Category) => void
}

export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {CATEGORIES.map(cat => {
            const isActive = cat === active
            return (
              <button
                key={cat}
                onClick={() => onChange(cat)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-teal-50 hover:text-teal-700'
                }`}
              >
                {ICONS[cat]}
                {cat}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
