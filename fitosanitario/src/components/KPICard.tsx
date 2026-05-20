import { cn } from '../lib/cn'
import type { LucideIcon } from 'lucide-react'

interface KPICardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: { value: string; positive: boolean }
  iconBg?: string
  iconColor?: string
}

export function KPICard({ title, value, icon: Icon, trend, iconBg = 'bg-primary-100', iconColor = 'text-primary-700' }: KPICardProps) {
  return (
    <div className="bg-white rounded-xl border border-surface-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className={cn('text-xs font-medium mt-1', trend.positive ? 'text-green-600' : 'text-red-600')}>
              {trend.value}
            </p>
          )}
        </div>
        <div className={cn('w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0', iconBg)}>
          <Icon className={cn('w-6 h-6', iconColor)} />
        </div>
      </div>
    </div>
  )
}
