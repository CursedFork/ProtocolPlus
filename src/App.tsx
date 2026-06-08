import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import { Layout } from '@/components/layout/Layout'
import Dashboard from '@/pages/Dashboard'
import DietPlan from '@/pages/DietPlan'
import GroceryList from '@/pages/GroceryList'
import WorkoutPlanner from '@/pages/WorkoutPlanner'
import SupplementHub from '@/pages/SupplementHub'
import ProgressTracking from '@/pages/ProgressTracking'
import Disclaimer from '@/pages/Disclaimer'
import Sources from '@/pages/Sources'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
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
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
