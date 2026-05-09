import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  sublabel?: string
  color?: 'green' | 'blue' | 'orange' | 'red' | 'purple'
  size?: 'sm' | 'md'
  className?: string
}

const colorStyles = {
  green: 'bg-green-500',
  blue: 'bg-blue-500',
  orange: 'bg-orange-500',
  red: 'bg-red-500',
  purple: 'bg-purple-500',
}

export function ProgressBar({
  value,
  max = 100,
  label,
  sublabel,
  color = 'green',
  size = 'md',
  className,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div className={cn('w-full', className)}>
      {(label || sublabel) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && <span className="text-sm font-medium text-foreground">{label}</span>}
          {sublabel && <span className="text-xs text-muted-foreground">{sublabel}</span>}
        </div>
      )}
      <div className={cn('w-full bg-secondary rounded-full overflow-hidden', size === 'sm' ? 'h-1.5' : 'h-2.5')}>
        <div
          className={cn('h-full rounded-full transition-all duration-500 ease-out', colorStyles[color])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
