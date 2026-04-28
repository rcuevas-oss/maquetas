import { useState } from 'react'
import { ShoppingCart, Search, Leaf, X, Menu } from 'lucide-react'

export type Page = 'inicio' | 'productos' | 'ofertas' | 'contacto'

interface HeaderProps {
  currentPage: Page
  totalItems: number
  searchQuery: string
  onNavigate: (page: Page) => void
  onCartOpen: () => void
  onSearch: (q: string) => void
}

const NAV: { label: string; page: Page }[] = [
  { label: 'Inicio', page: 'inicio' },
  { label: 'Productos', page: 'productos' },
  { label: 'Ofertas', page: 'ofertas' },
  { label: 'Contacto', page: 'contacto' },
]

export function Header({
  currentPage,
  totalItems,
  searchQuery,
  onNavigate,
  onCartOpen,
  onSearch,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNav = (page: Page) => {
    onNavigate(page)
    setMenuOpen(false)
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3">

            {/* Logo */}
            <button
              onClick={() => handleNav('inicio')}
              className="flex items-center gap-2 shrink-0"
            >
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <div className="text-left">
                <span className="text-lg font-bold text-slate-800 tracking-tight">LimpiaMás</span>
                <span className="hidden sm:block text-xs text-slate-400 font-normal leading-none">
                  Productos de limpieza
                </span>
              </div>
            </button>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
              {NAV.map(({ label, page }) => (
                <button
                  key={page}
                  onClick={() => handleNav(page)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-teal-50 text-teal-700 font-semibold'
                      : 'text-slate-600 hover:text-teal-600 hover:bg-slate-50'
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>

            {/* Desktop search */}
            {(currentPage === 'inicio' || currentPage === 'productos') && (
              <div className="hidden md:flex items-center bg-slate-100 rounded-full px-4 py-2 gap-2 w-44">
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => onSearch(e.target.value)}
                  placeholder="Buscar..."
                  className="bg-transparent text-sm text-slate-600 placeholder-slate-400 outline-none w-full"
                />
                {searchQuery && (
                  <button onClick={() => onSearch('')}>
                    <X className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                )}
              </div>
            )}

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Cart */}
              <button
                onClick={onCartOpen}
                className="relative flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">Carrito</span>
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </button>

              {/* Hamburger — mobile only */}
              <button
                onClick={() => setMenuOpen(o => !o)}
                className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-colors"
                aria-label="Menú"
              >
                {menuOpen
                  ? <X className="w-5 h-5 text-slate-700" />
                  : <Menu className="w-5 h-5 text-slate-700" />
                }
              </button>
            </div>
          </div>
        </div>

        {/* Mobile search bar (below main row) */}
        {(currentPage === 'inicio' || currentPage === 'productos') && (
          <div className="md:hidden px-4 pb-3">
            <div className="flex items-center bg-slate-100 rounded-full px-4 py-2.5 gap-2">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => onSearch(e.target.value)}
                placeholder="Buscar productos..."
                className="bg-transparent text-sm text-slate-600 placeholder-slate-400 outline-none w-full"
              />
              {searchQuery && (
                <button onClick={() => onSearch('')}>
                  <X className="w-3.5 h-3.5 text-slate-400" />
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-30 md:hidden"
            onClick={() => setMenuOpen(false)}
          />
          <div className="fixed top-0 left-0 bottom-0 w-72 bg-white z-40 shadow-2xl flex flex-col md:hidden">
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-teal-600 rounded-lg flex items-center justify-center">
                  <Leaf className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="font-bold text-slate-800">LimpiaMás</span>
              </div>
              <button onClick={() => setMenuOpen(false)}>
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 px-3 py-4 space-y-1">
              {NAV.map(({ label, page }) => (
                <button
                  key={page}
                  onClick={() => handleNav(page)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-teal-50 text-teal-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>

            {/* Drawer footer */}
            <div className="px-5 py-4 border-t border-slate-100 text-xs text-slate-400">
              contacto@limpiamas.cl · +56 2 2345 6789
            </div>
          </div>
        </>
      )}
    </>
  )
}
