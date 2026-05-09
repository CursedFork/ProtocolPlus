import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AccordionItemProps {
  title: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
  className?: string
  badge?: React.ReactNode
}

export function AccordionItem({ title, children, defaultOpen = false, className, badge }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className={cn('border border-border rounded-xl overflow-hidden', className)}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/50 transition-colors"
        aria-expanded={open}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {typeof title === 'string' ? (
            <span className="font-medium text-foreground text-sm">{title}</span>
          ) : (
            title
          )}
          {badge}
        </div>
        <ChevronDown
          className={cn('h-4 w-4 text-muted-foreground flex-shrink-0 transition-transform duration-200', open && 'rotate-180')}
        />
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-300 ease-in-out',
          open ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className="px-4 pb-4 pt-1 border-t border-border">{children}</div>
      </div>
    </div>
  )
}

interface AccordionProps {
  children: React.ReactNode
  className?: string
}

export function Accordion({ children, className }: AccordionProps) {
  return <div className={cn('flex flex-col gap-2', className)}>{children}</div>
}
