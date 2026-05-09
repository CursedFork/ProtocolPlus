import { cn } from '@/lib/utils'
import { type HTMLAttributes, forwardRef } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'elevated'
  glow?: 'green' | 'blue' | 'none'
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', glow = 'none', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl border p-4 transition-all duration-200',
          variant === 'default' && 'bg-card border-border',
          variant === 'glass' && 'glass',
          variant === 'elevated' && 'bg-card border-border shadow-lg',
          glow === 'green' && 'glow-green',
          glow === 'blue' && 'glow-blue',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)
Card.displayName = 'Card'

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}
export function CardHeader({ className, ...props }: CardHeaderProps) {
  return <div className={cn('mb-3 flex items-start justify-between gap-2', className)} {...props} />
}

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}
export function CardTitle({ className, ...props }: CardTitleProps) {
  return <h3 className={cn('font-semibold text-foreground leading-tight', className)} {...props} />
}

interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}
export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return <p className={cn('text-sm text-muted-foreground', className)} {...props} />
}
