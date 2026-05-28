import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { useTheme } from '@/hooks/useTheme'
import { useCloudStats } from '@/hooks/useCloudSync'
import { useAuth } from '@/contexts/AuthContext'
import { OnboardingModal } from '@/components/shared/OnboardingModal'

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { user } = useAuth()
  const { stats } = useCloudStats()

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} theme={theme} onToggleTheme={toggleTheme} />
        <main className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="p-4 md:p-6 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* First-run onboarding — shown when logged in but no profile yet */}
      {user && stats === null && <OnboardingModal />}
    </div>
  )
}
