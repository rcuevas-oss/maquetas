import { cn } from '../lib/cn'

interface FilterOption {
  value: string
  label: string
}

interface FilterBarProps {
  filters: {
    key: string
    label: string
    options: FilterOption[]
    value: string
    onChange: (value: string) => void
  }[]
  className?: string
}

export function FilterBar({ filters, className }: FilterBarProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-3 mb-4', className)}>
      {filters.map(filter => (
        <div key={filter.key} className="flex items-center gap-2">
          <label className="text-xs font-medium text-gray-500 whitespace-nowrap">{filter.label}:</label>
          <select
            value={filter.value}
            onChange={(e) => filter.onChange(e.target.value)}
            className="text-sm border border-surface-300 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {filter.options.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  )
}
