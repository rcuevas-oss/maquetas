import { useState, useEffect } from 'react'
import { Package, AlertTriangle, CalendarCheck, TrendingDown } from 'lucide-react'
import { PageHeader } from '../../components/PageHeader'
import { KPICard } from '../../components/KPICard'
import { Badge } from '../../components/Badge'
import { DataTable, type Column } from '../../components/DataTable'
import { api } from '../../services/api'
import type { Product, Alert, Movement } from '../../types'
import { ALERT_SEVERITY_COLORS, ALERT_SEVERITY_LABELS, MOVEMENT_TYPE_COLORS, MOVEMENT_TYPE_LABELS, PRODUCT_STATUS_COLORS, PRODUCT_STATUS_LABELS } from '../../lib/constants'
import { formatDate, formatNumber } from '../../lib/formatters'
import { ConsumptionChart } from './ConsumptionChart'

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [movements, setMovements] = useState<Movement[]>([])

  useEffect(() => {
    api.getProducts().then(setProducts)
    api.getAlerts().then(setAlerts)
    api.getMovements().then(setMovements)
  }, [])

  const totalStock = products.reduce((sum, p) => sum + p.currentStock, 0)
  const criticalProducts = products.filter(p => p.status === 'stock_bajo' || p.status === 'agotado')
  const activeAlerts = alerts.filter(a => !a.resolved)
  const criticalAlerts = alerts.filter(a => a.severity === 'critico' && !a.resolved)

  const alertColumns: Column<Alert>[] = [
    { key: 'severity', header: 'Severidad', render: (a) => <Badge label={ALERT_SEVERITY_LABELS[a.severity]} colorClass={ALERT_SEVERITY_COLORS[a.severity]} /> },
    { key: 'title', header: 'Alerta', render: (a) => <span className="font-medium">{a.title}</span> },
    { key: 'module', header: 'Módulo', render: (a) => a.module },
    { key: 'date', header: 'Fecha', render: (a) => formatDate(a.date), sortable: true, sortValue: (a) => a.date },
  ]

  const movementColumns: Column<Movement>[] = [
    { key: 'date', header: 'Fecha', render: (m) => formatDate(m.date), sortable: true, sortValue: (m) => m.date },
    { key: 'product', header: 'Producto', render: (m) => m.productName },
    { key: 'type', header: 'Tipo', render: (m) => <Badge label={MOVEMENT_TYPE_LABELS[m.type]} colorClass={MOVEMENT_TYPE_COLORS[m.type]} /> },
    { key: 'quantity', header: 'Cantidad', render: (m) => `${m.type === 'salida' ? '-' : m.type === 'ajuste' && m.quantity < 0 ? '' : '+'}${formatNumber(Math.abs(m.quantity))}` },
    { key: 'user', header: 'Responsable', render: (m) => m.userName },
  ]

  const criticalColumns: Column<Product>[] = [
    { key: 'name', header: 'Producto', render: (p) => <span className="font-medium">{p.name}</span> },
    { key: 'stock', header: 'Stock', render: (p) => `${formatNumber(p.currentStock)} ${p.unit}` },
    { key: 'min', header: 'Mínimo', render: (p) => `${formatNumber(p.minStock)} ${p.unit}` },
    { key: 'status', header: 'Estado', render: (p) => <Badge label={PRODUCT_STATUS_LABELS[p.status]} colorClass={PRODUCT_STATUS_COLORS[p.status]} /> },
  ]

  return (
    <div>
      <PageHeader title="Dashboard" description="Visión general de la operación fitosanitaria" />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard
          title="Stock Total Productos"
          value={`${formatNumber(totalStock, 0)} unidades`}
          icon={Package}
        />
        <KPICard
          title="Productos Críticos"
          value={criticalProducts.length}
          icon={TrendingDown}
          iconBg="bg-yellow-100"
          iconColor="text-yellow-700"
          trend={criticalProducts.length > 0 ? { value: `${criticalProducts.length} requieren atención`, positive: false } : undefined}
        />
        <KPICard
          title="Aplicaciones Hoy"
          value={3}
          icon={CalendarCheck}
          iconBg="bg-blue-100"
          iconColor="text-blue-700"
          trend={{ value: '2 ejecutadas, 1 pendiente', positive: true }}
        />
        <KPICard
          title="Alertas Activas"
          value={activeAlerts.length}
          icon={AlertTriangle}
          iconBg={criticalAlerts.length > 0 ? 'bg-red-100' : 'bg-yellow-100'}
          iconColor={criticalAlerts.length > 0 ? 'text-red-700' : 'text-yellow-700'}
          trend={criticalAlerts.length > 0 ? { value: `${criticalAlerts.length} críticas`, positive: false } : undefined}
        />
      </div>

      {/* Charts + Critical Products row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <ConsumptionChart />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Productos con Stock Crítico</h3>
          <DataTable
            data={criticalProducts}
            columns={criticalColumns}
            keyExtractor={(p) => p.id}
            emptyMessage="No hay productos críticos"
          />
        </div>
      </div>

      {/* Alerts + Movements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Alertas Recientes</h3>
          <DataTable
            data={activeAlerts}
            columns={alertColumns}
            keyExtractor={(a) => a.id}
            maxRows={5}
            emptyMessage="Sin alertas activas"
          />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Movimientos Recientes de Bodega</h3>
          <DataTable
            data={movements}
            columns={movementColumns}
            keyExtractor={(m) => m.id}
            maxRows={6}
          />
        </div>
      </div>
    </div>
  )
}
