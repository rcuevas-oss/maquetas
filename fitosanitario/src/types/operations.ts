// ─── Operaciones del sistema ───

export type ApplicationStatus = 'pendiente' | 'aprobada' | 'ejecutada' | 'observada'

export interface Application {
  id: string
  fieldId: string
  fieldName: string
  sectorName: string
  lotName: string
  lotHectares: number
  reason: string
  productId: string
  productName: string
  dosePerHectare: number
  unit: string
  expectedQuantity: number
  scheduledDate: string
  responsibleId: string
  responsibleName: string
  status: ApplicationStatus
  observations: string
}

export interface Execution {
  id: string
  applicationId: string
  application: Application
  realDate: string
  operatorId: string
  operatorName: string
  productUsed: string
  realQuantity: number
  realHectares: number
  expectedQuantity: number
  deviation: number
  deviationPercent: number
  deviationStatus: 'normal' | 'advertencia' | 'critico'
  observations: string
  supervisorValidation: boolean
  supervisorName: string
}

export type AlertType = 'sobreconsumo' | 'stock_bajo' | 'vencimiento' | 'ajuste_manual' | 'descuadre_stock'
export type AlertSeverity = 'normal' | 'advertencia' | 'critico'

export interface Alert {
  id: string
  type: AlertType
  typeLabel: string
  severity: AlertSeverity
  title: string
  description: string
  date: string
  module: string
  relatedId?: string
  resolved: boolean
}

export interface Rule {
  id: string
  name: string
  description: string
  category: 'dosis' | 'producto' | 'rol' | 'umbral' | 'validacion'
  categoryLabel: string
  criticality: 'alta' | 'media' | 'baja'
  active: boolean
  value: string
}

export interface AuditEntry {
  id: string
  userId: string
  userName: string
  date: string
  action: string
  module: string
  recordId: string
  recordDescription: string
  previousValue: string
  newValue: string
  observation: string
}

// ─── Tipos para reportes ───

export interface ConsumptionData {
  name: string
  planificado: number
  real: number
}

export interface EfficiencyData {
  product: string
  field: string
  planned: number
  actual: number
  deviation: number
  deviationPercent: number
  cost: number
}

// ─── Filtros ───

export interface AuditFilters {
  userId?: string
  module?: string
  dateFrom?: string
  dateTo?: string
  action?: string
}

export interface AlertFilters {
  type?: AlertType
  severity?: AlertSeverity
  resolved?: boolean
}
