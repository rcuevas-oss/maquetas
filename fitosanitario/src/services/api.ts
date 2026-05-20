import type { Api } from './api.types'
import type { AlertFilters, AuditFilters } from '../types'
import { products, movements } from '../mock/catalog'
import { applications, executions } from '../mock/operations'
import { alerts, rules, auditLog } from '../mock/system'

export const api: Api = {
  // ─── Inventario ───
  async getProducts() {
    return products
  },

  async getMovements(productId?: string) {
    if (productId) return movements.filter(m => m.productId === productId)
    return movements
  },

  // ─── Planificación ───
  async getApplications() {
    return applications
  },

  // ─── Ejecución ───
  async getExecutions() {
    return executions
  },

  // ─── Alertas ───
  async getAlerts(filters?: AlertFilters) {
    let result = [...alerts]
    if (filters?.type) result = result.filter(a => a.type === filters.type)
    if (filters?.severity) result = result.filter(a => a.severity === filters.severity)
    if (filters?.resolved !== undefined) result = result.filter(a => a.resolved === filters.resolved)
    return result
  },

  // ─── Reglas ───
  async getRules() {
    return rules
  },

  async toggleRule(id: string) {
    const rule = rules.find(r => r.id === id)
    if (!rule) throw new Error(`Rule ${id} not found`)
    rule.active = !rule.active
    return rule
  },

  // ─── Auditoría ───
  async getAuditLog(filters?: AuditFilters) {
    let result = [...auditLog]
    if (filters?.userId) result = result.filter(a => a.userId === filters.userId)
    if (filters?.module) result = result.filter(a => a.module === filters.module)
    if (filters?.action) result = result.filter(a => a.action.toLowerCase().includes(filters.action!.toLowerCase()))
    return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  },

  // ─── Reportes ───
  async getConsumptionByProduct() {
    const map = new Map<string, { planificado: number; real: number }>()
    for (const ex of executions) {
      const key = ex.productUsed
      const current = map.get(key) || { planificado: 0, real: 0 }
      current.planificado += ex.expectedQuantity
      current.real += ex.realQuantity
      map.set(key, current)
    }
    return Array.from(map.entries()).map(([name, data]) => ({ name, ...data }))
  },

  async getConsumptionBySector() {
    const map = new Map<string, { planificado: number; real: number }>()
    for (const ex of executions) {
      const key = ex.application.sectorName
      const current = map.get(key) || { planificado: 0, real: 0 }
      current.planificado += ex.expectedQuantity
      current.real += ex.realQuantity
      map.set(key, current)
    }
    return Array.from(map.entries()).map(([name, data]) => ({ name, ...data }))
  },

  async getEfficiencyData() {
    return executions.map(ex => ({
      product: ex.productUsed,
      field: ex.application.fieldName,
      planned: ex.expectedQuantity,
      actual: ex.realQuantity,
      deviation: ex.deviation,
      deviationPercent: ex.deviationPercent,
      cost: Math.round(ex.realQuantity * 12500), // costo estimado mock
    }))
  },
}
