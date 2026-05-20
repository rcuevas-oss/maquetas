import { useState } from 'react'
import { Plus } from 'lucide-react'
import { PageHeader } from '../../components/PageHeader'
import { DataTable, type Column } from '../../components/DataTable'
import { Badge } from '../../components/Badge'
import { FilterBar } from '../../components/FilterBar'
import { Modal } from '../../components/Modal'
import { usePlanning } from './usePlanning'
import { APPLICATION_STATUS_COLORS, APPLICATION_STATUS_LABELS } from '../../lib/constants'
import { formatDate, formatNumber } from '../../lib/formatters'
import type { Application } from '../../types'

export default function PlanningPage() {
  const { applications } = usePlanning()
  const [statusFilter, setStatusFilter] = useState('')
  const [fieldFilter, setFieldFilter] = useState('')
  const [selected, setSelected] = useState<Application | null>(null)
  const [showForm, setShowForm] = useState(false)

  const filtered = applications.filter(a => {
    if (statusFilter && a.status !== statusFilter) return false
    if (fieldFilter && a.fieldId !== fieldFilter) return false
    return true
  })

  const uniqueFields = [...new Map(applications.map(a => [a.fieldId, { value: a.fieldId, label: a.fieldName }])).values()]

  const columns: Column<Application>[] = [
    { key: 'id', header: 'ID', render: (a) => <span className="font-mono text-xs text-gray-500">{a.id}</span> },
    { key: 'date', header: 'Fecha', render: (a) => formatDate(a.scheduledDate), sortable: true, sortValue: (a) => a.scheduledDate },
    { key: 'field', header: 'Campo / Sector / Lote', render: (a) => (
      <div>
        <p className="font-medium text-gray-900">{a.fieldName}</p>
        <p className="text-xs text-gray-500">{a.sectorName} → {a.lotName} ({a.lotHectares} ha)</p>
      </div>
    )},
    { key: 'reason', header: 'Motivo', render: (a) => a.reason },
    { key: 'product', header: 'Producto', render: (a) => a.productName },
    { key: 'dose', header: 'Dosis/ha', render: (a) => `${a.dosePerHectare} ${a.unit}` },
    { key: 'expected', header: 'Cantidad Esperada', render: (a) => <span className="font-semibold">{formatNumber(a.expectedQuantity)} {a.unit}</span> },
    { key: 'responsible', header: 'Responsable', render: (a) => a.responsibleName },
    { key: 'status', header: 'Estado', render: (a) => <Badge label={APPLICATION_STATUS_LABELS[a.status]} colorClass={APPLICATION_STATUS_COLORS[a.status]} /> },
  ]

  return (
    <div>
      <PageHeader
        title="Planificación de Aplicaciones"
        description="Programación de aplicaciones fitosanitarias"
        actions={
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary-700 text-white rounded-lg text-sm font-medium hover:bg-primary-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nueva Planificación
          </button>
        }
      />

      <FilterBar filters={[
        {
          key: 'status', label: 'Estado', value: statusFilter, onChange: setStatusFilter,
          options: [
            { value: '', label: 'Todos' },
            { value: 'pendiente', label: 'Pendiente' },
            { value: 'aprobada', label: 'Aprobada' },
            { value: 'ejecutada', label: 'Ejecutada' },
            { value: 'observada', label: 'Observada' },
          ],
        },
        {
          key: 'field', label: 'Campo', value: fieldFilter, onChange: setFieldFilter,
          options: [{ value: '', label: 'Todos' }, ...uniqueFields],
        },
      ]} />

      <DataTable
        data={filtered}
        columns={columns}
        keyExtractor={(a) => a.id}
        onRowClick={setSelected}
      />

      {/* Detail Modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title={`Detalle Planificación ${selected?.id || ''}`} size="lg">
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                ['Campo', selected.fieldName],
                ['Sector', selected.sectorName],
                ['Lote', `${selected.lotName} (${selected.lotHectares} ha)`],
                ['Motivo', selected.reason],
                ['Producto', selected.productName],
                ['Dosis por hectárea', `${selected.dosePerHectare} ${selected.unit}/ha`],
                ['Superficie', `${selected.lotHectares} ha`],
                ['Cantidad Esperada', `${formatNumber(selected.expectedQuantity)} ${selected.unit}`],
                ['Fecha Programada', formatDate(selected.scheduledDate)],
                ['Responsable', selected.responsibleName],
              ].map(([label, value]) => (
                <div key={String(label)}>
                  <p className="text-xs font-medium text-gray-500">{label}</p>
                  <p className="text-sm text-gray-900 mt-0.5">{value}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">Estado</p>
              <Badge label={APPLICATION_STATUS_LABELS[selected.status]} colorClass={APPLICATION_STATUS_COLORS[selected.status]} className="mt-1" />
            </div>
            {selected.observations && (
              <div>
                <p className="text-xs font-medium text-gray-500">Observaciones</p>
                <p className="text-sm text-gray-700 mt-0.5">{selected.observations}</p>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Form Modal (simulado) */}
      <Modal open={showForm} onClose={() => setShowForm(false)} title="Nueva Planificación" size="lg">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowForm(false) }}>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Campo', placeholder: 'Seleccionar campo...' },
              { label: 'Sector', placeholder: 'Seleccionar sector...' },
              { label: 'Lote', placeholder: 'Seleccionar lote...' },
              { label: 'Motivo', placeholder: 'Ej: Control de pulgón' },
              { label: 'Producto', placeholder: 'Seleccionar producto...' },
              { label: 'Dosis por hectárea', placeholder: 'Ej: 1.2' },
              { label: 'Fecha Programada', placeholder: 'dd/mm/aaaa' },
              { label: 'Responsable', placeholder: 'Seleccionar...' },
            ].map(field => (
              <div key={field.label}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                <input
                  type="text"
                  placeholder={field.placeholder}
                  className="w-full px-3 py-2 border border-surface-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            ))}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Observaciones</label>
            <textarea
              rows={3}
              placeholder="Observaciones adicionales..."
              className="w-full px-3 py-2 border border-surface-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-gray-700 hover:bg-surface-100 rounded-lg transition-colors">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-primary-700 text-white rounded-lg text-sm font-medium hover:bg-primary-800 transition-colors">
              Crear Planificación
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
