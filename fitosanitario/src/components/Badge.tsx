import { cn } from '../lib/cn'

interface BadgeProps {
  label: string
  colorClass?: string
  className?: string
}

export function Badge({ label, colorClass = 'bg-gray-100 text-gray-800', className }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', colorClass, className)}>
      {label}
    </span>
  )
}
