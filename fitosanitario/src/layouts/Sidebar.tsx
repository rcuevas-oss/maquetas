import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Package, Calendar, ClipboardCheck,
  AlertTriangle, Shield, FileText, BarChart3, Leaf,
} from 'lucide-react'
import { cn } from '../lib/cn'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/inventario', label: 'Inventario', icon: Package },
  { to: '/planificacion', label: 'Planificación', icon: Calendar },
  { to: '/ejecucion', label: 'Ejecución', icon: ClipboardCheck },
  { to: '/alertas', label: 'Alertas', icon: AlertTriangle },
  { to: '/reportes', label: 'Reportes', icon: BarChart3 },
  { to: '/reglas', label: 'Reglas', icon: Shield },
  { to: '/auditoria', label: 'Auditoría', icon: FileText },
]

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-primary-900 flex flex-col z-30">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-primary-800">
        <div className="w-9 h-9 bg-primary-500 rounded-lg flex items-center justify-center">
          <Leaf className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-white font-semibold text-sm leading-tight">FitoControl</h1>
          <p className="text-primary-300 text-xs">Sistema Fitosanitario</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              cn('sidebar-link', isActive ? 'sidebar-link-active' : 'sidebar-link-inactive')
            }
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-primary-800">
        <p className="text-primary-400 text-xs">Agrícola Demo S.A.</p>
        <p className="text-primary-500 text-xs">Temporada 2025-2026</p>
      </div>
    </aside>
  )
}
