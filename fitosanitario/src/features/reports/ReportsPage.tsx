import { Download } from 'lucide-react'
import { PageHeader } from '../../components/PageHeader'
import { DataTable, type Column } from '../../components/DataTable'
import { Badge } from '../../components/Badge'
import { useReports } from './useReports'
import { DEVIATION_COLORS } from '../../lib/constants'
import { formatNumber, formatPercent, formatCurrency } from '../../lib/formatters'
import type { EfficiencyData } from '../../types'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function ReportsPage() {
  const { consumptionByProduct, consumptionBySector, efficiency } = useReports()

  const getDeviationStatus = (pct: number) => {
    const abs = Math.abs(pct)
    if (abs > 25) return 'critico'
    if (abs > 10) return 'advertencia'
    return 'normal'
  }

  const efficiencyColumns: Column<EfficiencyData>[] = [
    { key: 'product', header: 'Producto', render: (e) => <span className="font-medium">{e.product}</span> },
    { key: 'field', header: 'Campo', render: (e) => e.field },
    { key: 'planned', header: 'Planificado', render: (e) => formatNumber(e.planned) },
    { key: 'actual', header: 'Real', render: (e) => formatNumber(e.actual) },
    { key: 'deviation', header: 'Desviación', render: (e) => (
      <Badge label={formatPercent(e.deviationPercent)} colorClass={DEVIATION_COLORS[getDeviationStatus(e.deviationPercent)]} />
    ), sortable: true, sortValue: (e) => Math.abs(e.deviationPercent) },
    { key: 'cost', header: 'Costo Estimado', render: (e) => formatCurrency(e.cost), sortable: true, sortValue: (e) => e.cost },
  ]

  return (
    <div>
      <PageHeader
        title="Reportes"
        description="Análisis de consumo, eficiencia y costos"
        actions={
          <button className="flex items-center gap-2 px-4 py-2 border border-surface-300 bg-white text-gray-700 rounded-lg text-sm font-medium hover:bg-surface-50 transition-colors">
            <Download className="w-4 h-4" />
            Exportar
          </button>
        }
      />

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Consumption by product */}
        <div className="bg-white rounded-xl border border-surface-200 p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Consumo por Producto</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={consumptionByProduct} margin={{ top: 5, right: 20, left: 0, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" tick={{ fontSize: 10, angle: -35, textAnchor: 'end' }} interval={0} height={80} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px' }} />
              <Legend wrapperStyle={{ fontSize: '13px' }} />
              <Bar dataKey="planificado" name="Planificado" fill="#93c5fd" radius={[4, 4, 0, 0]} />
              <Bar dataKey="real" name="Real" fill="#1b5e20" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Consumption by sector */}
        <div className="bg-white rounded-xl border border-surface-200 p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Consumo por Sector</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={consumptionBySector} margin={{ top: 5, right: 20, left: 0, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" tick={{ fontSize: 10, angle: -35, textAnchor: 'end' }} interval={0} height={80} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px' }} />
              <Legend wrapperStyle={{ fontSize: '13px' }} />
              <Bar dataKey="planificado" name="Planificado" fill="#93c5fd" radius={[4, 4, 0, 0]} />
              <Bar dataKey="real" name="Real" fill="#1b5e20" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Efficiency table */}
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Eficiencia de Aplicaciones: Planificado vs Ejecutado</h3>
      <DataTable
        data={efficiency}
        columns={efficiencyColumns}
        keyExtractor={(e) => `${e.product}-${e.field}`}
      />
    </div>
  )
}
