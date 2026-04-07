import type {
  Product, Movement, Application, Execution,
  Alert, AlertFilters, Rule, AuditEntry, AuditFilters,
  ConsumptionData, EfficiencyData,
} from '../types'

export interface Api {
  // Inventario
  getProducts(): Promise<Product[]>
  getMovements(productId?: string): Promise<Movement[]>

  // Planificación
  getApplications(): Promise<Application[]>

  // Ejecución
  getExecutions(): Promise<Execution[]>

  // Alertas
  getAlerts(filters?: AlertFilters): Promise<Alert[]>

  // Reglas
  getRules(): Promise<Rule[]>
  toggleRule(id: string): Promise<Rule>

  // Auditoría
  getAuditLog(filters?: AuditFilters): Promise<AuditEntry[]>

  // Reportes
  getConsumptionByProduct(): Promise<ConsumptionData[]>
  getConsumptionBySector(): Promise<ConsumptionData[]>
  getEfficiencyData(): Promise<EfficiencyData[]>
}
