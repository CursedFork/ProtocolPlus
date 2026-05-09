import { cn } from '@/lib/utils'
import { type HTMLAttributes } from 'react'

type BadgeVariant = 'default' | 'green' | 'blue' | 'yellow' | 'orange' | 'red' | 'purple' | 'outline'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-secondary text-secondary-foreground',
  green: 'bg-green-500/15 text-green-400 border border-green-500/25',
  blue: 'bg-blue-500/15 text-blue-400 border border-blue-500/25',
  yellow: 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/25',
  orange: 'bg-orange-500/15 text-orange-400 border border-orange-500/25',
  red: 'bg-red-500/15 text-red-400 border border-red-500/25',
  purple: 'bg-purple-500/15 text-purple-400 border border-purple-500/25',
  outline: 'border border-border text-muted-foreground',
}

export function Badge({ variant = 'default', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  )
}
