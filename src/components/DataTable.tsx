import { useState, useMemo, type ReactNode } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { cn } from '../lib/cn'

export interface Column<T> {
  key: string
  header: string
  render: (item: T) => ReactNode
  sortable?: boolean
  sortValue?: (item: T) => string | number
  className?: string
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  keyExtractor: (item: T) => string
  onRowClick?: (item: T) => void
  emptyMessage?: string
  maxRows?: number
  className?: string
}

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  onRowClick,
  emptyMessage = 'Sin datos disponibles',
  maxRows,
  className,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortAsc, setSortAsc] = useState(true)

  const sortedData = useMemo(() => {
    let result = [...data]
    if (sortKey) {
      const col = columns.find(c => c.key === sortKey)
      if (col?.sortValue) {
        result.sort((a, b) => {
          const va = col.sortValue!(a)
          const vb = col.sortValue!(b)
          if (va < vb) return sortAsc ? -1 : 1
          if (va > vb) return sortAsc ? 1 : -1
          return 0
        })
      }
    }
    if (maxRows) result = result.slice(0, maxRows)
    return result
  }, [data, sortKey, sortAsc, columns, maxRows])

  function handleSort(key: string) {
    if (sortKey === key) {
      setSortAsc(!sortAsc)
    } else {
      setSortKey(key)
      setSortAsc(true)
    }
  }

  return (
    <div className={cn('bg-white rounded-xl border border-surface-200 overflow-hidden', className)}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-surface-200 bg-surface-50">
              {columns.map(col => (
                <th
                  key={col.key}
                  className={cn(
                    'px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider',
                    col.sortable && 'cursor-pointer hover:text-gray-700 select-none',
                    col.className
                  )}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                >
                  <div className="flex items-center gap-1">
                    {col.header}
                    {col.sortable && sortKey === col.key && (
                      sortAsc ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-100">
            {sortedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-sm text-gray-400">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              sortedData.map(item => (
                <tr
                  key={keyExtractor(item)}
                  className={cn(
                    'hover:bg-surface-50 transition-colors',
                    onRowClick && 'cursor-pointer'
                  )}
                  onClick={onRowClick ? () => onRowClick(item) : undefined}
                >
                  {columns.map(col => (
                    <td key={col.key} className={cn('px-4 py-3 text-sm text-gray-700', col.className)}>
                      {col.render(item)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
