import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { Layout } from '@/components/layout/Layout'
import Dashboard from '@/pages/Dashboard'
import DietPlan from '@/pages/DietPlan'
import GroceryList from '@/pages/GroceryList'
import WorkoutPlanner from '@/pages/WorkoutPlanner'
import SupplementHub from '@/pages/SupplementHub'
import ProgressTracking from '@/pages/ProgressTracking'
import Disclaimer from '@/pages/Disclaimer'
import Sources from '@/pages/Sources'
import AuthPage from '@/pages/AuthPage'

function AppRoutes() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="diet" element={<DietPlan />} />
        <Route path="grocery" element={<GroceryList />} />
        <Route path="workout" element={<WorkoutPlanner />} />
        <Route path="supplements" element={<SupplementHub />} />
        <Route path="progress" element={<ProgressTracking />} />
        <Route path="sources" element={<Sources />} />
        <Route path="disclaimer" element={<Disclaimer />} />
        <Route path="auth" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
