// ─── Labels de estado ───

export const APPLICATION_STATUS_LABELS: Record<string, string> = {
  pendiente: 'Pendiente',
  aprobada: 'Aprobada',
  ejecutada: 'Ejecutada',
  observada: 'Observada',
}

export const APPLICATION_STATUS_COLORS: Record<string, string> = {
  pendiente: 'bg-yellow-100 text-yellow-800',
  aprobada: 'bg-blue-100 text-blue-800',
  ejecutada: 'bg-green-100 text-green-800',
  observada: 'bg-red-100 text-red-800',
}

export const ALERT_SEVERITY_COLORS: Record<string, string> = {
  normal: 'bg-green-100 text-green-800',
  advertencia: 'bg-yellow-100 text-yellow-800',
  critico: 'bg-red-100 text-red-800',
}

export const ALERT_SEVERITY_LABELS: Record<string, string> = {
  normal: 'Normal',
  advertencia: 'Advertencia',
  critico: 'Crítico',
}

export const DEVIATION_COLORS: Record<string, string> = {
  normal: 'bg-green-100 text-green-800',
  advertencia: 'bg-yellow-100 text-yellow-800',
  critico: 'bg-red-100 text-red-800',
}

export const PRODUCT_STATUS_COLORS: Record<string, string> = {
  disponible: 'bg-green-100 text-green-800',
  stock_bajo: 'bg-yellow-100 text-yellow-800',
  agotado: 'bg-red-100 text-red-800',
  por_vencer: 'bg-orange-100 text-orange-800',
}

export const PRODUCT_STATUS_LABELS: Record<string, string> = {
  disponible: 'Disponible',
  stock_bajo: 'Stock Bajo',
  agotado: 'Agotado',
  por_vencer: 'Por Vencer',
}

export const MOVEMENT_TYPE_COLORS: Record<string, string> = {
  entrada: 'bg-green-100 text-green-800',
  salida: 'bg-blue-100 text-blue-800',
  ajuste: 'bg-orange-100 text-orange-800',
}

export const MOVEMENT_TYPE_LABELS: Record<string, string> = {
  entrada: 'Entrada',
  salida: 'Salida',
  ajuste: 'Ajuste',
}

export const CRITICALITY_COLORS: Record<string, string> = {
  alta: 'bg-red-100 text-red-800',
  media: 'bg-yellow-100 text-yellow-800',
  baja: 'bg-blue-100 text-blue-800',
}

// ─── Módulos del sistema ───

export const MODULES = [
  'Dashboard',
  'Inventario',
  'Planificación',
  'Ejecución',
  'Alertas',
  'Reglas',
  'Auditoría',
  'Reportes',
] as const
