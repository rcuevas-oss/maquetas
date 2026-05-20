// ─── Entidades base del catálogo ───

export interface User {
  id: string
  name: string
  role: 'admin' | 'bodega' | 'supervisor' | 'operario'
  roleLabel: string
  email: string
  active: boolean
}

export interface Field {
  id: string
  name: string
  sectors: Sector[]
}

export interface Sector {
  id: string
  fieldId: string
  name: string
  lots: Lot[]
}

export interface Lot {
  id: string
  sectorId: string
  name: string
  hectares: number
}

export interface Product {
  id: string
  name: string
  category: 'insecticida' | 'fungicida' | 'herbicida' | 'fertilizante' | 'coadyuvante'
  categoryLabel: string
  unit: string
  currentStock: number
  minStock: number
  batch: string
  expirationDate: string
  location: string
  status: 'disponible' | 'stock_bajo' | 'agotado' | 'por_vencer'
  activeIngredient: string
  supplier: string
}

export interface Movement {
  id: string
  date: string
  productId: string
  productName: string
  type: 'entrada' | 'salida' | 'ajuste'
  quantity: number
  userId: string
  userName: string
  observation: string
  reference?: string
}
