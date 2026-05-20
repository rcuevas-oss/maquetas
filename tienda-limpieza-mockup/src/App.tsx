import { useState } from 'react'
import { Header } from './components/Header'
import type { Page } from './components/Header'
import { HeroBanner } from './components/HeroBanner'
import { CategoryFilter } from './components/CategoryFilter'
import { ProductGrid } from './components/ProductGrid'
import { OfertasPage } from './components/OfertasPage'
import { ContactPage } from './components/ContactPage'
import { CartSidebar } from './components/CartSidebar'
import { ProductDetailModal } from './components/ProductDetailModal'
import { Footer } from './components/Footer'
import { ChatBot } from './components/ChatBot'
import { useCart } from './hooks/useCart'
import { products } from './data/products'
import type { Category, Product } from './data/products'

export default function App() {
  const [page, setPage] = useState<Page>('inicio')
  const [activeCategory, setActiveCategory] = useState<Category>('Todos')
  const [searchQuery, setSearchQuery] = useState('')
  const [cartOpen, setCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const { items, addItem, removeItem, updateQuantity, clear, totalItems, totalPrice } = useCart()

  const navigate = (p: Page) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (p !== 'productos') {
      setSearchQuery('')
      setActiveCategory('Todos')
    }
  }

  const handleSearch = (q: string) => {
    setSearchQuery(q)
    if (q && page !== 'productos') setPage('productos')
  }

  const filtered = products.filter(p => {
    const matchesCat = activeCategory === 'Todos' || p.category === activeCategory
    const q = searchQuery.toLowerCase()
    const matchesSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    return matchesCat && matchesSearch
  })

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header
        currentPage={page}
        totalItems={totalItems}
        searchQuery={searchQuery}
        onNavigate={navigate}
        onCartOpen={() => setCartOpen(true)}
        onSearch={handleSearch}
      />

      <main className="flex-1">
        {/* INICIO */}
        {page === 'inicio' && (
          <>
            <HeroBanner onNavigate={navigate} />
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800">Productos destacados</h2>
                <button
                  onClick={() => navigate('productos')}
                  className="text-sm text-teal-600 font-semibold hover:underline"
                >
                  Ver todos →
                </button>
              </div>
              <ProductGrid
                products={products.slice(0, 8)}
                onAdd={addItem}
                onDetail={setSelectedProduct}
              />
            </section>
          </>
        )}

        {/* PRODUCTOS */}
        {page === 'productos' && (
          <>
            <div className="sticky top-16 z-30">
              <CategoryFilter
                active={activeCategory}
                onChange={cat => { setActiveCategory(cat); setSearchQuery('') }}
              />
            </div>
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800">
                  {searchQuery
                    ? `Resultados para "${searchQuery}"`
                    : activeCategory === 'Todos' ? 'Todos los productos' : activeCategory}
                </h2>
                <span className="text-sm text-slate-400">{filtered.length} productos</span>
              </div>
              {filtered.length === 0 ? (
                <div className="text-center py-16 text-slate-400">
                  <p className="text-lg font-medium">No encontramos "{searchQuery}"</p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="mt-3 text-sm text-teal-600 hover:underline"
                  >
                    Ver todos los productos
                  </button>
                </div>
              ) : (
                <ProductGrid products={filtered} onAdd={addItem} onDetail={setSelectedProduct} />
              )}
            </section>
          </>
        )}

        {/* OFERTAS */}
        {page === 'ofertas' && (
          <OfertasPage onAdd={addItem} onDetail={setSelectedProduct} />
        )}

        {/* CONTACTO */}
        {page === 'contacto' && <ContactPage />}
      </main>

      <Footer onNavigate={navigate} />

      <CartSidebar
        isOpen={cartOpen}
        items={items}
        totalPrice={totalPrice}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={updateQuantity}
        onRemove={removeItem}
        onClear={clear}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAdd={addItem}
      />

      <ChatBot />
    </div>
  )
}
