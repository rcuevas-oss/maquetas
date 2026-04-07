import { useState } from 'react'
import { PageHeader } from '../../components/PageHeader'
import { DataTable, type Column } from '../../components/DataTable'
import { Badge } from '../../components/Badge'
import { Modal } from '../../components/Modal'
import { useExecution } from './useExecution'
import { DEVIATION_COLORS, ALERT_SEVERITY_LABELS } from '../../lib/constants'
import { formatDate, formatNumber, formatPercent } from '../../lib/formatters'
import { cn } from '../../lib/cn'
import type { Execution } from '../../types'
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react'

export default function ExecutionPage() {
  const { executions } = useExecution()
  const [selected, setSelected] = useState<Execution | null>(null)

  const columns: Column<Execution>[] = [
    { key: 'id', header: 'ID', render: (e) => <span className="font-mono text-xs text-gray-500">{e.id}</span> },
    { key: 'app', header: 'Planificación', render: (e) => <span className="font-mono text-xs">{e.applicationId}</span> },
    { key: 'date', header: 'Fecha Real', render: (e) => formatDate(e.realDate), sortable: true, sortValue: (e) => e.realDate },
    { key: 'field', header: 'Campo / Lote', render: (e) => (
      <div>
        <p className="text-sm">{e.application.fieldName}</p>
        <p className="text-xs text-gray-500">{e.application.lotName}</p>
      </div>
    )},
    { key: 'product', header: 'Producto', render: (e) => e.productUsed },
    { key: 'operator', header: 'Operario', render: (e) => e.operatorName },
    { key: 'expected', header: 'Esperado', render: (e) => formatNumber(e.expectedQuantity) },
    { key: 'real', header: 'Real', render: (e) => (
      <span className={cn('font-semibold', e.deviationStatus === 'critico' ? 'text-red-700' : e.deviationStatus === 'advertencia' ? 'text-yellow-700' : 'text-gray-900')}>
        {formatNumber(e.realQuantity)}
      </span>
    )},
    { key: 'deviation', header: 'Desviación', render: (e) => <Badge label={formatPercent(e.deviationPercent)} colorClass={DEVIATION_COLORS[e.deviationStatus]} />, sortable: true, sortValue: (e) => Math.abs(e.deviationPercent) },
    { key: 'validated', header: 'Validado', render: (e) => (
      e.supervisorValidation
        ? <CheckCircle className="w-5 h-5 text-green-600" />
        : <XCircle className="w-5 h-5 text-red-500" />
    )},
  ]

  return (
    <div>
      <PageHeader
        title="Registro de Aplicaciones Ejecutadas"
        description="Comparación entre consumo esperado y consumo real"
      />

      <DataTable
        data={executions}
        columns={columns}
        keyExtractor={(e) => e.id}
        onRowClick={setSelected}
      />

      {/* Detail Modal with comparison panel */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title={`Detalle Ejecución ${selected?.id || ''}`} size="xl">
        {selected && (
          <div className="space-y-6">
            {/* Comparison Panel */}
            <div className="bg-surface-50 rounded-xl p-5 border border-surface-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-4">Comparación: Planificado vs Ejecutado</h4>
              <div className="grid grid-cols-3 gap-6">
                {/* Expected */}
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Esperado</p>
                  <p className="text-3xl font-bold text-gray-400">{formatNumber(selected.expectedQuantity)}</p>
                  <p className="text-xs text-gray-400">{selected.application.unit}</p>
                </div>

                {/* Arrow */}
                <div className="flex items-center justify-center">
                  <ArrowRight className="w-8 h-8 text-gray-300" />
                </div>

                {/* Real */}
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Real</p>
                  <p className={cn('text-3xl font-bold', selected.deviationStatus === 'critico' ? 'text-red-600' : selected.deviationStatus === 'advertencia' ? 'text-yellow-600' : 'text-green-600')}>
                    {formatNumber(selected.realQuantity)}
                  </p>
                  <p className="text-xs text-gray-400">{selected.application.unit}</p>
                </div>
              </div>

              {/* Deviation bar */}
              <div className="mt-4 flex items-center justify-center gap-3">
                <Badge
                  label={`Desviación: ${formatPercent(selected.deviationPercent)}`}
                  colorClass={DEVIATION_COLORS[selected.deviationStatus]}
                  className="text-sm px-4 py-1"
                />
                <Badge
                  label={ALERT_SEVERITY_LABELS[selected.deviationStatus]}
                  colorClass={DEVIATION_COLORS[selected.deviationStatus]}
                />
              </div>
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                ['Planificación', selected.applicationId],
                ['Fecha Programada', formatDate(selected.application.scheduledDate)],
                ['Fecha Real', formatDate(selected.realDate)],
                ['Campo', selected.application.fieldName],
                ['Sector', selected.application.sectorName],
                ['Lote', `${selected.application.lotName} (${selected.application.lotHectares} ha)`],
                ['Motivo', selected.application.reason],
                ['Producto', selected.productUsed],
                ['Dosis/ha', `${selected.application.dosePerHectare} ${selected.application.unit}`],
                ['Hectáreas reales', `${formatNumber(selected.realHectares)} ha`],
                ['Operario', selected.operatorName],
                ['Supervisor', selected.supervisorName],
              ].map(([label, value]) => (
                <div key={String(label)}>
                  <p className="text-xs font-medium text-gray-500">{label}</p>
                  <p className="text-sm text-gray-900 mt-0.5">{value}</p>
                </div>
              ))}
            </div>

            {/* Validation status */}
            <div className="flex items-center gap-2 p-3 rounded-lg border border-surface-200">
              {selected.supervisorValidation
                ? <><CheckCircle className="w-5 h-5 text-green-600" /><span className="text-sm text-green-700 font-medium">Validado por {selected.supervisorName}</span></>
                : <><XCircle className="w-5 h-5 text-red-500" /><span className="text-sm text-red-600 font-medium">Pendiente de validación por {selected.supervisorName}</span></>
              }
            </div>

            {selected.observations && (
              <div>
                <p className="text-xs font-medium text-gray-500">Observaciones</p>
                <p className="text-sm text-gray-700 mt-1 p-3 bg-surface-50 rounded-lg">{selected.observations}</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}
