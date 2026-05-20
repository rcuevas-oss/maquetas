import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: Size
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  full?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-gold text-bg hover:bg-gold-hover shadow-soft hover:-translate-y-[1px]',
  secondary:
    'border border-line bg-bg-card text-ink hover:border-gold/60 hover:text-gold',
  ghost: 'text-ink-muted hover:text-ink hover:bg-bg-card',
}

const sizeClasses: Record<Size, string> = {
  sm: 'h-9 px-3 text-xs',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
}

export default function PrimaryButton({
  variant = 'primary',
  size = 'md',
  className,
  leftIcon,
  rightIcon,
  full,
  children,
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        full && 'w-full',
        className,
      )}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  )
}
