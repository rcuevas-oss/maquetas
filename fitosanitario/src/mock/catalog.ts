import type { User, Field, Product, Movement } from '../types'

// ─── Usuarios ───

export const users: User[] = [
  { id: 'U001', name: 'Carlos Muñoz', role: 'admin', roleLabel: 'Administrador', email: 'cmunoz@agricola.cl', active: true },
  { id: 'U002', name: 'Patricia Lagos', role: 'bodega', roleLabel: 'Encargada de Bodega', email: 'plagos@agricola.cl', active: true },
  { id: 'U003', name: 'Roberto Sepúlveda', role: 'supervisor', roleLabel: 'Supervisor de Campo', email: 'rsepulveda@agricola.cl', active: true },
  { id: 'U004', name: 'Juan Pérez', role: 'operario', roleLabel: 'Aplicador', email: 'jperez@agricola.cl', active: true },
  { id: 'U005', name: 'María González', role: 'operario', roleLabel: 'Aplicadora', email: 'mgonzalez@agricola.cl', active: true },
  { id: 'U006', name: 'Andrés Reyes', role: 'supervisor', roleLabel: 'Supervisor de Campo', email: 'areyes@agricola.cl', active: true },
]

// ─── Campos, Sectores, Lotes ───

export const fields: Field[] = [
  {
    id: 'F001', name: 'Fundo El Roble',
    sectors: [
      { id: 'S001', fieldId: 'F001', name: 'Sector Norte', lots: [
        { id: 'L001', sectorId: 'S001', name: 'Cuartel 1', hectares: 12.5 },
        { id: 'L002', sectorId: 'S001', name: 'Cuartel 2', hectares: 8.3 },
      ]},
      { id: 'S002', fieldId: 'F001', name: 'Sector Sur', lots: [
        { id: 'L003', sectorId: 'S002', name: 'Cuartel 3', hectares: 15.0 },
        { id: 'L004', sectorId: 'S002', name: 'Cuartel 4', hectares: 10.2 },
      ]},
    ],
  },
  {
    id: 'F002', name: 'Fundo Las Palmas',
    sectors: [
      { id: 'S003', fieldId: 'F002', name: 'Sector Poniente', lots: [
        { id: 'L005', sectorId: 'S003', name: 'Cuartel A', hectares: 18.0 },
        { id: 'L006', sectorId: 'S003', name: 'Cuartel B', hectares: 14.5 },
      ]},
      { id: 'S004', fieldId: 'F002', name: 'Sector Oriente', lots: [
        { id: 'L007', sectorId: 'S004', name: 'Cuartel C', hectares: 11.0 },
      ]},
    ],
  },
  {
    id: 'F003', name: 'Fundo Santa Rosa',
    sectors: [
      { id: 'S005', fieldId: 'F003', name: 'Sector Central', lots: [
        { id: 'L008', sectorId: 'S005', name: 'Cuartel 10', hectares: 20.0 },
        { id: 'L009', sectorId: 'S005', name: 'Cuartel 11', hectares: 9.5 },
        { id: 'L010', sectorId: 'S005', name: 'Cuartel 12', hectares: 13.8 },
      ]},
    ],
  },
  {
    id: 'F004', name: 'Fundo La Viña',
    sectors: [
      { id: 'S006', fieldId: 'F004', name: 'Sector Alto', lots: [
        { id: 'L011', sectorId: 'S006', name: 'Parrón 1', hectares: 7.2 },
        { id: 'L012', sectorId: 'S006', name: 'Parrón 2', hectares: 6.8 },
      ]},
      { id: 'S007', fieldId: 'F004', name: 'Sector Bajo', lots: [
        { id: 'L013', sectorId: 'S007', name: 'Parrón 3', hectares: 9.0 },
      ]},
    ],
  },
]

// ─── Productos Fitosanitarios ───

export const products: Product[] = [
  { id: 'P001', name: 'Imidacloprid 350 SC', category: 'insecticida', categoryLabel: 'Insecticida', unit: 'litros', currentStock: 120, minStock: 30, batch: 'LOT-2025-001', expirationDate: '2026-08-15', location: 'Bodega A - Estante 1', status: 'disponible', activeIngredient: 'Imidacloprid', supplier: 'Bayer CropScience' },
  { id: 'P002', name: 'Clorpirifos 48 EC', category: 'insecticida', categoryLabel: 'Insecticida', unit: 'litros', currentStock: 25, minStock: 40, batch: 'LOT-2025-002', expirationDate: '2026-06-20', location: 'Bodega A - Estante 1', status: 'stock_bajo', activeIngredient: 'Clorpirifos', supplier: 'Syngenta' },
  { id: 'P003', name: 'Mancozeb 80 WP', category: 'fungicida', categoryLabel: 'Fungicida', unit: 'kg', currentStock: 200, minStock: 50, batch: 'LOT-2025-003', expirationDate: '2026-12-01', location: 'Bodega A - Estante 2', status: 'disponible', activeIngredient: 'Mancozeb', supplier: 'BASF' },
  { id: 'P004', name: 'Azoxistrobina 250 SC', category: 'fungicida', categoryLabel: 'Fungicida', unit: 'litros', currentStock: 45, minStock: 20, batch: 'LOT-2025-004', expirationDate: '2026-09-30', location: 'Bodega A - Estante 2', status: 'disponible', activeIngredient: 'Azoxistrobina', supplier: 'Syngenta' },
  { id: 'P005', name: 'Glifosato 480 SL', category: 'herbicida', categoryLabel: 'Herbicida', unit: 'litros', currentStock: 300, minStock: 80, batch: 'LOT-2025-005', expirationDate: '2027-03-15', location: 'Bodega B - Estante 1', status: 'disponible', activeIngredient: 'Glifosato', supplier: 'Monsanto' },
  { id: 'P006', name: 'Paraquat 20 SL', category: 'herbicida', categoryLabel: 'Herbicida', unit: 'litros', currentStock: 10, minStock: 25, batch: 'LOT-2025-006', expirationDate: '2026-04-10', location: 'Bodega B - Estante 1', status: 'por_vencer', activeIngredient: 'Paraquat', supplier: 'Syngenta' },
  { id: 'P007', name: 'Cipermetrina 25 EC', category: 'insecticida', categoryLabel: 'Insecticida', unit: 'litros', currentStock: 80, minStock: 30, batch: 'LOT-2025-007', expirationDate: '2026-11-20', location: 'Bodega A - Estante 3', status: 'disponible', activeIngredient: 'Cipermetrina', supplier: 'FMC' },
  { id: 'P008', name: 'Metalaxil 25 WP', category: 'fungicida', categoryLabel: 'Fungicida', unit: 'kg', currentStock: 0, minStock: 15, batch: 'LOT-2025-008', expirationDate: '2026-07-01', location: 'Bodega A - Estante 2', status: 'agotado', activeIngredient: 'Metalaxil', supplier: 'Syngenta' },
  { id: 'P009', name: 'Lambda-Cihalotrina 10 CS', category: 'insecticida', categoryLabel: 'Insecticida', unit: 'litros', currentStock: 55, minStock: 20, batch: 'LOT-2025-009', expirationDate: '2027-01-15', location: 'Bodega A - Estante 3', status: 'disponible', activeIngredient: 'Lambda-Cihalotrina', supplier: 'Syngenta' },
  { id: 'P010', name: 'Trifloxistrobina 500 WG', category: 'fungicida', categoryLabel: 'Fungicida', unit: 'kg', currentStock: 35, minStock: 10, batch: 'LOT-2025-010', expirationDate: '2026-10-30', location: 'Bodega A - Estante 2', status: 'disponible', activeIngredient: 'Trifloxistrobina', supplier: 'Bayer CropScience' },
  { id: 'P011', name: 'Abamectina 1.8 EC', category: 'insecticida', categoryLabel: 'Insecticida', unit: 'litros', currentStock: 18, minStock: 20, batch: 'LOT-2025-011', expirationDate: '2026-05-15', location: 'Bodega A - Estante 1', status: 'stock_bajo', activeIngredient: 'Abamectina', supplier: 'Syngenta' },
  { id: 'P012', name: 'Pendimetalina 33 EC', category: 'herbicida', categoryLabel: 'Herbicida', unit: 'litros', currentStock: 150, minStock: 40, batch: 'LOT-2025-012', expirationDate: '2027-02-28', location: 'Bodega B - Estante 2', status: 'disponible', activeIngredient: 'Pendimetalina', supplier: 'BASF' },
  { id: 'P013', name: 'Coadyuvante Siliconado', category: 'coadyuvante', categoryLabel: 'Coadyuvante', unit: 'litros', currentStock: 90, minStock: 25, batch: 'LOT-2025-013', expirationDate: '2027-06-01', location: 'Bodega B - Estante 3', status: 'disponible', activeIngredient: 'Organosilicona', supplier: 'Arysta' },
  { id: 'P014', name: 'Fertilizante Foliar NPK', category: 'fertilizante', categoryLabel: 'Fertilizante', unit: 'kg', currentStock: 500, minStock: 100, batch: 'LOT-2025-014', expirationDate: '2027-12-31', location: 'Bodega C', status: 'disponible', activeIngredient: 'NPK 20-20-20', supplier: 'SQM' },
  { id: 'P015', name: 'Acetamiprid 20 SP', category: 'insecticida', categoryLabel: 'Insecticida', unit: 'kg', currentStock: 42, minStock: 15, batch: 'LOT-2025-015', expirationDate: '2026-08-30', location: 'Bodega A - Estante 1', status: 'disponible', activeIngredient: 'Acetamiprid', supplier: 'Nippon Soda' },
]

// ─── Movimientos de Bodega ───

export const movements: Movement[] = [
  { id: 'M001', date: '2026-03-28', productId: 'P001', productName: 'Imidacloprid 350 SC', type: 'salida', quantity: 15, userId: 'U002', userName: 'Patricia Lagos', observation: 'Salida para aplicación Cuartel 1', reference: 'APP-001' },
  { id: 'M002', date: '2026-03-28', productId: 'P003', productName: 'Mancozeb 80 WP', type: 'salida', quantity: 25, userId: 'U002', userName: 'Patricia Lagos', observation: 'Salida para aplicación Cuartel A', reference: 'APP-003' },
  { id: 'M003', date: '2026-03-27', productId: 'P005', productName: 'Glifosato 480 SL', type: 'salida', quantity: 40, userId: 'U002', userName: 'Patricia Lagos', observation: 'Salida para control malezas', reference: 'APP-005' },
  { id: 'M004', date: '2026-03-27', productId: 'P002', productName: 'Clorpirifos 48 EC', type: 'entrada', quantity: 100, userId: 'U002', userName: 'Patricia Lagos', observation: 'Recepción OC-2026-045', reference: 'OC-045' },
  { id: 'M005', date: '2026-03-26', productId: 'P007', productName: 'Cipermetrina 25 EC', type: 'salida', quantity: 10, userId: 'U002', userName: 'Patricia Lagos', observation: 'Salida para aplicación Cuartel 3', reference: 'APP-004' },
  { id: 'M006', date: '2026-03-26', productId: 'P014', productName: 'Fertilizante Foliar NPK', type: 'salida', quantity: 60, userId: 'U002', userName: 'Patricia Lagos', observation: 'Fertilización programa semanal', reference: 'APP-008' },
  { id: 'M007', date: '2026-03-25', productId: 'P008', productName: 'Metalaxil 25 WP', type: 'ajuste', quantity: -5, userId: 'U001', userName: 'Carlos Muñoz', observation: 'Ajuste por merma detectada en inventario', reference: 'AJ-001' },
  { id: 'M008', date: '2026-03-25', productId: 'P004', productName: 'Azoxistrobina 250 SC', type: 'salida', quantity: 8, userId: 'U002', userName: 'Patricia Lagos', observation: 'Salida para aplicación preventiva', reference: 'APP-006' },
  { id: 'M009', date: '2026-03-24', productId: 'P009', productName: 'Lambda-Cihalotrina 10 CS', type: 'salida', quantity: 12, userId: 'U002', userName: 'Patricia Lagos', observation: 'Salida para control de polillas', reference: 'APP-007' },
  { id: 'M010', date: '2026-03-24', productId: 'P011', productName: 'Abamectina 1.8 EC', type: 'salida', quantity: 6, userId: 'U002', userName: 'Patricia Lagos', observation: 'Salida para control de arañitas', reference: 'APP-009' },
  { id: 'M011', date: '2026-03-23', productId: 'P001', productName: 'Imidacloprid 350 SC', type: 'entrada', quantity: 50, userId: 'U002', userName: 'Patricia Lagos', observation: 'Recepción OC-2026-042', reference: 'OC-042' },
  { id: 'M012', date: '2026-03-23', productId: 'P010', productName: 'Trifloxistrobina 500 WG', type: 'salida', quantity: 5, userId: 'U002', userName: 'Patricia Lagos', observation: 'Salida para aplicación curativa', reference: 'APP-010' },
  { id: 'M013', date: '2026-03-22', productId: 'P006', productName: 'Paraquat 20 SL', type: 'salida', quantity: 15, userId: 'U002', userName: 'Patricia Lagos', observation: 'Control malezas hilera', reference: 'APP-011' },
  { id: 'M014', date: '2026-03-22', productId: 'P012', productName: 'Pendimetalina 33 EC', type: 'entrada', quantity: 80, userId: 'U002', userName: 'Patricia Lagos', observation: 'Recepción OC-2026-040', reference: 'OC-040' },
  { id: 'M015', date: '2026-03-21', productId: 'P013', productName: 'Coadyuvante Siliconado', type: 'salida', quantity: 5, userId: 'U002', userName: 'Patricia Lagos', observation: 'Complemento aplicación insecticida', reference: 'APP-001' },
]
