import { useState } from 'react'
import { Plus } from 'lucide-react'
import { PageHeader } from '../../components/PageHeader'
import { DataTable, type Column } from '../../components/DataTable'
import { Badge } from '../../components/Badge'
import { FilterBar } from '../../components/FilterBar'
import { Modal } from '../../components/Modal'
import { useInventory } from './useInventory'
import { PRODUCT_STATUS_COLORS, PRODUCT_STATUS_LABELS, MOVEMENT_TYPE_COLORS, MOVEMENT_TYPE_LABELS } from '../../lib/constants'
import { formatDate, formatNumber } from '../../lib/formatters'
import { cn } from '../../lib/cn'
import type { Product, Movement } from '../../types'

export default function InventoryPage() {
  const { products, movements } = useInventory()
  const [tab, setTab] = useState<'productos' | 'movimientos'>('productos')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const filteredProducts = products.filter(p => {
    if (categoryFilter && p.category !== categoryFilter) return false
    if (statusFilter && p.status !== statusFilter) return false
    return true
  })

  const productColumns: Column<Product>[] = [
    { key: 'name', header: 'Producto', render: (p) => (
      <div>
        <p className="font-medium text-gray-900">{p.name}</p>
        <p className="text-xs text-gray-500">{p.activeIngredient}</p>
      </div>
    ), sortable: true, sortValue: (p) => p.name },
    { key: 'category', header: 'Categoría', render: (p) => <Badge label={p.categoryLabel} colorClass="bg-surface-100 text-gray-700" /> },
    { key: 'stock', header: 'Stock', render: (p) => (
      <span className={cn('font-semibold', p.currentStock <= p.minStock ? 'text-red-600' : 'text-gray-900')}>
        {formatNumber(p.currentStock)} {p.unit}
      </span>
    ), sortable: true, sortValue: (p) => p.currentStock },
    { key: 'min', header: 'Mínimo', render: (p) => `${formatNumber(p.minStock)} ${p.unit}` },
    { key: 'batch', header: 'Lote', render: (p) => p.batch },
    { key: 'expiration', header: 'Vencimiento', render: (p) => formatDate(p.expirationDate), sortable: true, sortValue: (p) => p.expirationDate },
    { key: 'location', header: 'Ubicación', render: (p) => <span className="text-xs">{p.location}</span> },
    { key: 'status', header: 'Estado', render: (p) => <Badge label={PRODUCT_STATUS_LABELS[p.status]} colorClass={PRODUCT_STATUS_COLORS[p.status]} /> },
  ]

  const movementColumns: Column<Movement>[] = [
    { key: 'date', header: 'Fecha', render: (m) => formatDate(m.date), sortable: true, sortValue: (m) => m.date },
    { key: 'product', header: 'Producto', render: (m) => m.productName },
    { key: 'type', header: 'Tipo', render: (m) => <Badge label={MOVEMENT_TYPE_LABELS[m.type]} colorClass={MOVEMENT_TYPE_COLORS[m.type]} /> },
    { key: 'quantity', header: 'Cantidad', render: (m) => {
      const sign = m.type === 'entrada' ? '+' : m.type === 'salida' ? '-' : ''
      return <span className={cn('font-medium', m.type === 'entrada' ? 'text-green-700' : m.type === 'salida' ? 'text-blue-700' : 'text-orange-700')}>{sign}{formatNumber(Math.abs(m.quantity))}</span>
    }},
    { key: 'user', header: 'Responsable', render: (m) => m.userName },
    { key: 'obs', header: 'Observación', render: (m) => <span className="text-xs text-gray-500">{m.observation}</span> },
    { key: 'ref', header: 'Referencia', render: (m) => m.reference || '—' },
  ]

  return (
    <div>
      <PageHeader
        title="Inventario y Bodega"
        description="Control de productos fitosanitarios y movimientos de bodega"
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-700 text-white rounded-lg text-sm font-medium hover:bg-primary-800 transition-colors">
            <Plus className="w-4 h-4" />
            Registrar Movimiento
          </button>
        }
      />

      {/* Tabs */}
      <div className="flex gap-1 mb-4 bg-surface-200 rounded-lg p-1 w-fit">
        {(['productos', 'movimientos'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              'px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize',
              tab === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'productos' && (
        <>
          <FilterBar filters={[
            {
              key: 'category', label: 'Categoría', value: categoryFilter,
              onChange: setCategoryFilter,
              options: [
                { value: '', label: 'Todas' },
                { value: 'insecticida', label: 'Insecticida' },
                { value: 'fungicida', label: 'Fungicida' },
                { value: 'herbicida', label: 'Herbicida' },
                { value: 'fertilizante', label: 'Fertilizante' },
                { value: 'coadyuvante', label: 'Coadyuvante' },
              ],
            },
            {
              key: 'status', label: 'Estado', value: statusFilter,
              onChange: setStatusFilter,
              options: [
                { value: '', label: 'Todos' },
                { value: 'disponible', label: 'Disponible' },
                { value: 'stock_bajo', label: 'Stock Bajo' },
                { value: 'agotado', label: 'Agotado' },
                { value: 'por_vencer', label: 'Por Vencer' },
              ],
            },
          ]} />
          <DataTable
            data={filteredProducts}
            columns={productColumns}
            keyExtractor={(p) => p.id}
            onRowClick={setSelectedProduct}
          />
        </>
      )}

      {tab === 'movimientos' && (
        <DataTable
          data={movements}
          columns={movementColumns}
          keyExtractor={(m) => m.id}
        />
      )}

      {/* Product detail modal */}
      <Modal open={!!selectedProduct} onClose={() => setSelectedProduct(null)} title={selectedProduct?.name || ''} size="lg">
        {selectedProduct && (
          <div className="grid grid-cols-2 gap-4">
            {[
              ['Ingrediente Activo', selectedProduct.activeIngredient],
              ['Categoría', selectedProduct.categoryLabel],
              ['Unidad', selectedProduct.unit],
              ['Stock Actual', `${formatNumber(selectedProduct.currentStock)} ${selectedProduct.unit}`],
              ['Stock Mínimo', `${formatNumber(selectedProduct.minStock)} ${selectedProduct.unit}`],
              ['Lote', selectedProduct.batch],
              ['Vencimiento', formatDate(selectedProduct.expirationDate)],
              ['Ubicación', selectedProduct.location],
              ['Proveedor', selectedProduct.supplier],
              ['Estado', selectedProduct.status],
            ].map(([label, value]) => (
              <div key={String(label)}>
                <p className="text-xs font-medium text-gray-500">{label}</p>
                <p className="text-sm text-gray-900 mt-0.5">{value}</p>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  )
}
