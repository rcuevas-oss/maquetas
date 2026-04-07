import { Bell, User } from 'lucide-react'

export function Topbar() {
  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-surface-300 flex items-center justify-between px-6 z-20">
      <div>
        <p className="text-sm text-gray-500">Panel de Control Fitosanitario</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-surface-100 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* User */}
        <div className="flex items-center gap-3 pl-4 border-l border-surface-300">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">Carlos Muñoz</p>
            <p className="text-xs text-gray-500">Administrador</p>
          </div>
          <div className="w-9 h-9 bg-primary-100 text-primary-800 rounded-full flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  )
}
