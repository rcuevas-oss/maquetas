import { cn } from '@/lib/utils'

type Props = {
  time: string
  selected?: boolean
  disabled?: boolean
  onClick?: () => void
}

export default function TimeSlotButton({
  time,
  selected,
  disabled,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'group relative flex h-12 items-center justify-center rounded-xl border text-sm font-medium transition-all duration-200',
        selected
          ? 'border-gold bg-gold/10 text-gold shadow-gold'
          : 'border-line bg-bg-card text-ink hover:border-gold/50 hover:text-gold',
        disabled && 'pointer-events-none border-line/50 text-ink-dim line-through',
      )}
    >
      {time}
      {selected && (
        <span className="absolute -top-1 right-1 h-2 w-2 rounded-full bg-gold" />
      )}
    </button>
  )
}
