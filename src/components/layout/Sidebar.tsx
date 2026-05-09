import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Salad,
  ShoppingCart,
  Dumbbell,
  FlaskConical,
  TrendingUp,
  BookOpen,
  AlertCircle,
  X,
  Zap,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, color: 'text-green-400' },
  { to: '/diet', label: 'Diet Plan', icon: Salad, color: 'text-emerald-400' },
  { to: '/grocery', label: 'Grocery List', icon: ShoppingCart, color: 'text-blue-400' },
  { to: '/workout', label: 'Workout Planner', icon: Dumbbell, color: 'text-orange-400' },
  { to: '/supplements', label: 'Supplement Hub', icon: FlaskConical, color: 'text-purple-400' },
  { to: '/progress', label: 'Progress', icon: TrendingUp, color: 'text-yellow-400' },
  { to: '/sources', label: 'Sources', icon: BookOpen, color: 'text-cyan-400' },
  { to: '/disclaimer', label: 'Disclaimer', icon: AlertCircle, color: 'text-red-400' },
]

interface SidebarProps {
  open: boolean
  onClose: () => void
}

function NavItem({ to, label, icon: Icon, color }: (typeof navItems)[0]) {
  const location = useLocation()
  const isActive = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

  return (
    <NavLink
      to={to}
      className={cn(
        'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
        isActive
          ? 'bg-primary/10 text-primary border border-primary/20'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted',
      )}
    >
      <Icon className={cn('h-4 w-4 flex-shrink-0', isActive ? 'text-primary' : color)} />
      <span>{label}</span>
      {isActive && (
        <motion.div
          layoutId="nav-indicator"
          className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
        />
      )}
    </NavLink>
  )
}

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 z-50 w-64 bg-card border-r border-border flex flex-col lg:hidden"
          >
            <SidebarContent onClose={onClose} />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop static sidebar */}
      <aside className="hidden lg:flex flex-col w-56 xl:w-60 flex-shrink-0 sticky top-0 h-screen border-r border-border bg-card">
        <SidebarContent />
      </aside>
    </>
  )
}

function SidebarContent({ onClose }: { onClose?: () => void }) {
  return (
    <>
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center">
            <Zap className="h-4 w-4 text-primary" />
          </div>
          <div>
            <span className="font-bold text-foreground text-sm">Protocol</span>
            <span className="text-primary font-bold text-sm">+</span>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto scrollbar-thin">
        {navItems.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-border">
        <p className="text-[10px] text-muted-foreground text-center leading-relaxed">
          For informational purposes only.
          <br />
          Not medical advice.
        </p>
      </div>
    </>
  )
}
