import { Menu, Zap } from 'lucide-react'
import { useLocation } from 'react-router-dom'

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  '/': { title: 'Dashboard', subtitle: "Today's overview" },
  '/diet': { title: 'Diet Plan', subtitle: 'Nutrition guidelines & meal strategy' },
  '/grocery': { title: 'Grocery List', subtitle: 'Weekly shopping tracker' },
  '/workout': { title: 'Workout Planner', subtitle: 'Evidence-based training programs' },
  '/supplements': { title: 'Supplement Hub', subtitle: 'Research-driven supplement database' },
  '/progress': { title: 'Progress Tracking', subtitle: 'Logs, goals & habit streaks' },
  '/sources': { title: 'Sources', subtitle: 'Full citation database & research bibliography' },
  '/disclaimer': { title: 'Disclaimer', subtitle: 'Important health information' },
}

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const location = useLocation()
  const basePath = '/' + location.pathname.split('/')[1]
  const meta = pageTitles[basePath] ?? pageTitles['/']
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center gap-3 px-4 py-3">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Mobile logo */}
        <div className="flex items-center gap-1.5 lg:hidden">
          <div className="w-6 h-6 rounded-md bg-primary/20 flex items-center justify-center">
            <Zap className="h-3.5 w-3.5 text-primary" />
          </div>
          <span className="font-bold text-sm">
            Protocol<span className="text-primary">+</span>
          </span>
        </div>

        <div className="hidden lg:block">
          <h1 className="text-lg font-semibold text-foreground leading-tight">{meta.title}</h1>
          <p className="text-xs text-muted-foreground">{meta.subtitle}</p>
        </div>

        <div className="ml-auto text-right">
          <p className="text-xs text-muted-foreground hidden sm:block">{today}</p>
          <div className="flex items-center gap-1.5 justify-end mt-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs text-primary font-medium">Active</span>
          </div>
        </div>
      </div>
    </header>
  )
}
