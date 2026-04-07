import { useState } from 'react'
import { AlertTriangle, AlertCircle, CheckCircle2 } from 'lucide-react'
import { PageHeader } from '../../components/PageHeader'
import { KPICard } from '../../components/KPICard'
import { DataTable, type Column } from '../../components/DataTable'
import { Badge } from '../../components/Badge'
import { FilterBar } from '../../components/FilterBar'
import { useAlerts } from './useAlerts'
import { ALERT_SEVERITY_COLORS, ALERT_SEVERITY_LABELS } from '../../lib/constants'
import { formatDate } from '../../lib/formatters'
import type { Alert } from '../../types'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

export default function AlertsPage() {
  const { alerts } = useAlerts()
  const [typeFilter, setTypeFilter] = useState('')
  const [severityFilter, setSeverityFilter] = useState('')
  const [resolvedFilter, setResolvedFilter] = useState('')

  const filtered = alerts.filter(a => {
    if (typeFilter && a.type !== typeFilter) return false
    if (severityFilter && a.severity !== severityFilter) return false
    if (resolvedFilter === 'si' && !a.resolved) return false
    if (resolvedFilter === 'no' && a.resolved) return false
    return true
  })

  const criticalCount = alerts.filter(a => a.severity === 'critico' && !a.resolved).length
  const warningCount = alerts.filter(a => a.severity === 'advertencia' && !a.resolved).length
  const resolvedCount = alerts.filter(a => a.resolved).length

  // Chart data: alerts by type
  const chartData = [
    { name: 'Sobreconsumo', count: alerts.filter(a => a.type === 'sobreconsumo').length, color: '#ef4444' },
    { name: 'Stock Bajo', count: alerts.filter(a => a.type === 'stock_bajo').length, color: '#f59e0b' },
    { name: 'Vencimiento', count: alerts.filter(a => a.type === 'vencimiento').length, color: '#f97316' },
    { name: 'Ajuste Manual', count: alerts.filter(a => a.type === 'ajuste_manual').length, color: '#8b5cf6' },
    { name: 'Descuadre', count: alerts.filter(a => a.type === 'descuadre_stock').length, color: '#dc2626' },
  ]

  const columns: Column<Alert>[] = [
    { key: 'severity', header: 'Severidad', render: (a) => <Badge label={ALERT_SEVERITY_LABELS[a.severity]} colorClass={ALERT_SEVERITY_COLORS[a.severity]} /> },
    { key: 'type', header: 'Tipo', render: (a) => <span className="text-xs font-medium">{a.typeLabel}</span> },
    { key: 'title', header: 'Alerta', render: (a) => <span className="font-medium">{a.title}</span> },
    { key: 'description', header: 'Descripción', render: (a) => <span className="text-xs text-gray-500 line-clamp-2">{a.description}</span>, className: 'max-w-xs' },
    { key: 'module', header: 'Módulo', render: (a) => a.module },
    { key: 'date', header: 'Fecha', render: (a) => formatDate(a.date), sortable: true, sortValue: (a) => a.date },
    { key: 'resolved', header: 'Estado', render: (a) => (
      a.resolved
        ? <span className="flex items-center gap-1 text-green-600 text-xs font-medium"><CheckCircle2 className="w-4 h-4" /> Resuelta</span>
        : <span className="flex items-center gap-1 text-red-600 text-xs font-medium"><AlertCircle className="w-4 h-4" /> Activa</span>
    )},
  ]

  return (
    <div>
      <PageHeader
        title="Alertas y Diferencias"
        description="Problemas detectados por el sistema"
      />

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <KPICard title="Alertas Críticas" value={criticalCount} icon={AlertTriangle} iconBg="bg-red-100" iconColor="text-red-700" />
        <KPICard title="Advertencias" value={warningCount} icon={AlertCircle} iconBg="bg-yellow-100" iconColor="text-yellow-700" />
        <KPICard title="Resueltas" value={resolvedCount} icon={CheckCircle2} iconBg="bg-green-100" iconColor="text-green-700" />
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl border border-surface-200 p-5 mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Alertas por Tipo</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis type="number" tick={{ fontSize: 12 }} />
            <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px' }} />
            <Bar dataKey="count" name="Cantidad" radius={[0, 4, 4, 0]}>
              {chartData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Filters + Table */}
      <FilterBar filters={[
        {
          key: 'type', label: 'Tipo', value: typeFilter, onChange: setTypeFilter,
          options: [
            { value: '', label: 'Todos' },
            { value: 'sobreconsumo', label: 'Sobreconsumo' },
            { value: 'stock_bajo', label: 'Stock Bajo' },
            { value: 'vencimiento', label: 'Vencimiento' },
            { value: 'ajuste_manual', label: 'Ajuste Manual' },
            { value: 'descuadre_stock', label: 'Descuadre Stock' },
          ],
        },
        {
          key: 'severity', label: 'Severidad', value: severityFilter, onChange: setSeverityFilter,
          options: [
            { value: '', label: 'Todas' },
            { value: 'critico', label: 'Crítico' },
            { value: 'advertencia', label: 'Advertencia' },
            { value: 'normal', label: 'Normal' },
          ],
        },
        {
          key: 'resolved', label: 'Estado', value: resolvedFilter, onChange: setResolvedFilter,
          options: [{ value: '', label: 'Todos' }, { value: 'no', label: 'Activas' }, { value: 'si', label: 'Resueltas' }],
        },
      ]} />

      <DataTable data={filtered} columns={columns} keyExtractor={(a) => a.id} />
    </div>
  )
}
