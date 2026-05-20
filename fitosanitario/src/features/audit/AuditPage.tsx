import { useState } from 'react'
import { PageHeader } from '../../components/PageHeader'
import { DataTable, type Column } from '../../components/DataTable'
import { Badge } from '../../components/Badge'
import { FilterBar } from '../../components/FilterBar'
import { Modal } from '../../components/Modal'
import { useAudit } from './useAudit'
import { formatDateTime } from '../../lib/formatters'
import type { AuditEntry } from '../../types'

const MODULE_COLORS: Record<string, string> = {
  Inventario: 'bg-blue-100 text-blue-800',
  Ejecución: 'bg-green-100 text-green-800',
  Planificación: 'bg-purple-100 text-purple-800',
  Reglas: 'bg-yellow-100 text-yellow-800',
}

export default function AuditPage() {
  const { entries } = useAudit()
  const [moduleFilter, setModuleFilter] = useState('')
  const [userFilter, setUserFilter] = useState('')
  const [selected, setSelected] = useState<AuditEntry | null>(null)

  const filtered = entries.filter(e => {
    if (moduleFilter && e.module !== moduleFilter) return false
    if (userFilter && e.userId !== userFilter) return false
    return true
  })

  const uniqueUsers = [...new Map(entries.map(e => [e.userId, { value: e.userId, label: e.userName }])).values()]
  const uniqueModules = [...new Set(entries.map(e => e.module))].map(m => ({ value: m, label: m }))

  const columns: Column<AuditEntry>[] = [
    { key: 'date', header: 'Fecha / Hora', render: (e) => <span className="text-xs font-mono">{formatDateTime(e.date)}</span>, sortable: true, sortValue: (e) => e.date },
    { key: 'user', header: 'Usuario', render: (e) => <span className="font-medium">{e.userName}</span> },
    { key: 'action', header: 'Acción', render: (e) => e.action },
    { key: 'module', header: 'Módulo', render: (e) => <Badge label={e.module} colorClass={MODULE_COLORS[e.module] || 'bg-gray-100 text-gray-800'} /> },
    { key: 'record', header: 'Registro', render: (e) => <span className="text-xs text-gray-500">{e.recordDescription}</span>, className: 'max-w-xs' },
    { key: 'prev', header: 'Anterior', render: (e) => <span className="text-xs text-red-600">{e.previousValue}</span> },
    { key: 'new', header: 'Nuevo', render: (e) => <span className="text-xs text-green-600">{e.newValue}</span> },
  ]

  return (
    <div>
      <PageHeader
        title="Auditoría"
        description="Registro de todas las acciones del sistema"
      />

      <FilterBar filters={[
        {
          key: 'module', label: 'Módulo', value: moduleFilter, onChange: setModuleFilter,
          options: [{ value: '', label: 'Todos' }, ...uniqueModules],
        },
        {
          key: 'user', label: 'Usuario', value: userFilter, onChange: setUserFilter,
          options: [{ value: '', label: 'Todos' }, ...uniqueUsers],
        },
      ]} />

      <DataTable data={filtered} columns={columns} keyExtractor={(e) => e.id} onRowClick={setSelected} />

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Detalle de Auditoría" size="md">
        {selected && (
          <div className="space-y-4">
            {[
              ['Fecha y Hora', formatDateTime(selected.date)],
              ['Usuario', selected.userName],
              ['Acción', selected.action],
              ['Módulo', selected.module],
              ['Registro', selected.recordDescription],
              ['ID Registro', selected.recordId],
            ].map(([label, value]) => (
              <div key={String(label)}>
                <p className="text-xs font-medium text-gray-500">{label}</p>
                <p className="text-sm text-gray-900 mt-0.5">{value}</p>
              </div>
            ))}

            <div className="grid grid-cols-2 gap-4 p-3 bg-surface-50 rounded-lg">
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Valor Anterior</p>
                <p className="text-sm text-red-700 font-mono bg-red-50 px-2 py-1 rounded">{selected.previousValue}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Valor Nuevo</p>
                <p className="text-sm text-green-700 font-mono bg-green-50 px-2 py-1 rounded">{selected.newValue}</p>
              </div>
            </div>

            {selected.observation && (
              <div>
                <p className="text-xs font-medium text-gray-500">Observación</p>
                <p className="text-sm text-gray-700 mt-1">{selected.observation}</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}
