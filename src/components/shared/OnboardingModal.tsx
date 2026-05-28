/**
 * OnboardingModal
 *
 * Appears on first login when no user profile exists.
 * Collects essential stats needed to power nutrition/workout calculations.
 * Cannot be dismissed without completing the form.
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import { UserCircle, ChevronRight } from 'lucide-react'
import { useCloudStats } from '@/hooks/useCloudSync'
import type { UserStats } from '@/lib/stats'

const activityOptions: { value: UserStats['activityLevel']; label: string; description: string }[] = [
  { value: 'sedentary',  label: 'Sedentary',        description: 'Little or no exercise' },
  { value: 'light',      label: 'Lightly Active',    description: '1–3 days/week' },
  { value: 'moderate',   label: 'Moderately Active', description: '3–5 days/week' },
  { value: 'very',       label: 'Very Active',       description: '6–7 days/week' },
  { value: 'extreme',    label: 'Athlete',           description: 'Hard training 2× daily' },
]

export function OnboardingModal() {
  const { saveStats } = useCloudStats()

  const [sex, setSex] = useState<UserStats['sex']>('male')
  const [age, setAge] = useState('')
  const [weightLbs, setWeightLbs] = useState('')
  const [heightFt, setHeightFt] = useState('')
  const [heightIn, setHeightIn] = useState('')
  const [activityLevel, setActivityLevel] = useState<UserStats['activityLevel']>('moderate')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const ageNum = parseInt(age, 10)
    const weightNum = parseFloat(weightLbs)
    const ftNum = parseInt(heightFt, 10)
    const inNum = parseInt(heightIn, 10) || 0

    if (!ageNum || ageNum < 13 || ageNum > 100) { setError('Please enter a valid age (13–100).'); return }
    if (!weightNum || weightNum < 50 || weightNum > 700) { setError('Please enter a valid weight in lbs.'); return }
    if (!ftNum || ftNum < 3 || ftNum > 8) { setError('Please enter a valid height.'); return }

    setSaving(true)
    try {
      await saveStats({ sex, age: ageNum, weightLbs: weightNum, heightFt: ftNum, heightIn: inNum, activityLevel })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="bg-card border border-border rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-primary/10 border-b border-border px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <UserCircle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">Welcome to Protocol+</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Set up your profile to get personalized recommendations</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* Sex */}
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Biological Sex</label>
            <div className="grid grid-cols-2 gap-2">
              {(['male', 'female'] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSex(s)}
                  className={`py-2.5 rounded-lg border text-sm font-medium transition-all ${
                    sex === s
                      ? 'bg-primary/15 border-primary/40 text-primary'
                      : 'border-border text-muted-foreground hover:border-muted-foreground/40'
                  }`}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Age + Weight */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="25"
                min={13}
                max={100}
                className="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Weight (lbs)</label>
              <input
                type="number"
                value={weightLbs}
                onChange={(e) => setWeightLbs(e.target.value)}
                placeholder="160"
                min={50}
                max={700}
                className="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50"
              />
            </div>
          </div>

          {/* Height */}
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Height</label>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <input
                  type="number"
                  value={heightFt}
                  onChange={(e) => setHeightFt(e.target.value)}
                  placeholder="5"
                  min={3}
                  max={8}
                  className="w-full bg-muted border border-border rounded-lg pl-3 pr-8 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">ft</span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  value={heightIn}
                  onChange={(e) => setHeightIn(e.target.value)}
                  placeholder="10"
                  min={0}
                  max={11}
                  className="w-full bg-muted border border-border rounded-lg pl-3 pr-8 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">in</span>
              </div>
            </div>
          </div>

          {/* Activity Level */}
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Activity Level</label>
            <div className="space-y-1.5">
              {activityOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setActivityLevel(opt.value)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border text-left transition-all ${
                    activityLevel === opt.value
                      ? 'bg-primary/10 border-primary/40'
                      : 'border-border hover:border-muted-foreground/30'
                  }`}
                >
                  <div>
                    <p className={`text-sm font-medium ${activityLevel === opt.value ? 'text-primary' : 'text-foreground'}`}>
                      {opt.label}
                    </p>
                    <p className="text-xs text-muted-foreground">{opt.description}</p>
                  </div>
                  {activityLevel === opt.value && (
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-lg py-3 text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60 mt-2"
          >
            {saving ? 'Saving...' : (
              <>
                Get Started
                <ChevronRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  )
}
