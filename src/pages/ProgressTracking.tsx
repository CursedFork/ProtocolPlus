import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp, TrendingDown, Minus, Scale, Dumbbell, Activity,
  Target, Camera, Plus, Trash2, Pencil, X, Check,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/shared/Card'
import { ProgressBar } from '@/components/shared/ProgressBar'
import { Badge } from '@/components/shared/Badge'
import {
  useCloudWeightLog,
  useCloudStrengthLog,
  useCloudGoals,
  useCloudHabits,
} from '@/hooks/useCloudSync'
import type { Goal } from '@/types/progress'
import { getTodayString } from '@/lib/utils'
import { cn } from '@/lib/utils'

const defaultGoals: Goal[] = [
  { id: 'g1', title: 'Target body weight', targetValue: 170, currentValue: 182, unit: 'lbs', category: 'weight' },
  { id: 'g2', title: 'Bench press 1RM', targetValue: 225, currentValue: 175, unit: 'lbs', category: 'strength' },
  { id: 'g3', title: 'Run 5K pace', targetValue: 25, currentValue: 32, unit: 'min', category: 'cardio' },
]

const HABIT_KEYS = ['Training', 'Protein target', 'Water goal', 'Good sleep', 'Vegetables', 'No late caffeine']

export default function ProgressTracking() {
  const { log: weightLog, addEntry: addWeightEntry, removeEntry: removeWeightEntry } = useCloudWeightLog()
  const { log: strengthLog, addEntry: addStrengthEntry, removeEntry: removeStrengthEntry } = useCloudStrengthLog()
  const { goals, saveGoals } = useCloudGoals(defaultGoals)
  const { habits, toggleHabit } = useCloudHabits()

  const [weightInput, setWeightInput] = useState('')
  const [weightNote, setWeightNote] = useState('')

  const [strengthExercise, setStrengthExercise] = useState('')
  const [strengthWeight, setStrengthWeight] = useState('')
  const [strengthReps, setStrengthReps] = useState('')
  const [strengthSets] = useState('3')

  // Goal editing state: maps goal id → draft values
  const [editingGoal, setEditingGoal] = useState<string | null>(null)
  const [goalDraft, setGoalDraft] = useState<{ currentValue: number; targetValue: number }>({ currentValue: 0, targetValue: 0 })

  const today = getTodayString()

  function addWeight() {
    const w = parseFloat(weightInput)
    if (isNaN(w) || w <= 0) return
    addWeightEntry({ date: today, weightLbs: w, notes: weightNote || undefined })
    setWeightInput('')
    setWeightNote('')
  }

  function addStrength() {
    if (!strengthExercise || !strengthWeight || !strengthReps) return
    addStrengthEntry({
      date: today,
      exercise: strengthExercise,
      weightLbs: parseFloat(strengthWeight),
      reps: parseInt(strengthReps),
      sets: parseInt(strengthSets),
    })
    setStrengthExercise('')
    setStrengthWeight('')
    setStrengthReps('')
  }

  function startEditGoal(goal: Goal) {
    setEditingGoal(goal.id)
    setGoalDraft({ currentValue: goal.currentValue, targetValue: goal.targetValue })
  }

  function saveGoal(goalId: string) {
    const updated = goals.map((g) =>
      g.id === goalId ? { ...g, currentValue: goalDraft.currentValue, targetValue: goalDraft.targetValue } : g,
    )
    saveGoals(updated)
    setEditingGoal(null)
  }

  const recentWeight = weightLog[0]
  const prevWeight = weightLog[1]
  const weightDelta = recentWeight && prevWeight ? recentWeight.weightLbs - prevWeight.weightLbs : null

  const streakDays = countStreak(habits, HABIT_KEYS)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      {/* Goals overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {goals.map((goal) => {
          const isWeight = goal.category === 'weight'
          const isLosing = isWeight && goal.targetValue < goal.currentValue
          const pct = isLosing
            ? Math.min(100, ((goal.currentValue - goal.targetValue) /
                Math.max(1, (goal.currentValue + 10) - goal.targetValue)) * 100)
            : Math.min(100, (goal.currentValue / goal.targetValue) * 100)

          const isEditing = editingGoal === goal.id

          return (
            <Card key={goal.id} className="border-primary/10">
              <div className="flex items-center gap-2 mb-3">
                {goal.category === 'weight' ? <Scale className="h-4 w-4 text-orange-400" />
                  : goal.category === 'strength' ? <Dumbbell className="h-4 w-4 text-red-400" />
                  : <Activity className="h-4 w-4 text-blue-400" />}
                <span className="text-xs text-muted-foreground flex-1">{goal.title}</span>
                {isEditing ? (
                  <div className="flex gap-1">
                    <button onClick={() => saveGoal(goal.id)} className="p-1 text-green-400 hover:text-green-300 transition-colors">
                      <Check className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => setEditingGoal(null)} className="p-1 text-muted-foreground hover:text-foreground transition-colors">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ) : (
                  <button onClick={() => startEditGoal(goal)} className="p-1 text-muted-foreground hover:text-foreground transition-colors">
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-2 mb-3">
                  <div>
                    <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Current</label>
                    <input
                      type="number"
                      value={goalDraft.currentValue}
                      onChange={(e) => setGoalDraft((d) => ({ ...d, currentValue: parseFloat(e.target.value) || 0 }))}
                      className="w-full bg-muted border border-border rounded-lg px-2.5 py-1.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary mt-0.5"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Target</label>
                    <input
                      type="number"
                      value={goalDraft.targetValue}
                      onChange={(e) => setGoalDraft((d) => ({ ...d, targetValue: parseFloat(e.target.value) || 0 }))}
                      className="w-full bg-muted border border-border rounded-lg px-2.5 py-1.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary mt-0.5"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-end justify-between mb-2">
                  <span className="text-2xl font-bold text-foreground">{goal.currentValue}</span>
                  <span className="text-sm text-muted-foreground">/ {goal.targetValue} {goal.unit}</span>
                </div>
              )}

              <ProgressBar
                value={pct}
                max={100}
                color={goal.category === 'weight' ? 'orange' : goal.category === 'strength' ? 'red' : 'blue'}
                size="sm"
              />
            </Card>
          )
        })}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Weight log */}
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Weight Log</CardTitle>
              <CardDescription>Track your body weight over time</CardDescription>
            </div>
            {recentWeight && (
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold text-foreground">{recentWeight.weightLbs}</span>
                <span className="text-xs text-muted-foreground">lbs</span>
                {weightDelta !== null && (
                  <span className={cn('text-xs font-medium flex items-center gap-0.5', weightDelta < 0 ? 'text-green-400' : weightDelta > 0 ? 'text-red-400' : 'text-muted-foreground')}>
                    {weightDelta < 0 ? <TrendingDown className="h-3 w-3" /> : weightDelta > 0 ? <TrendingUp className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
                    {Math.abs(weightDelta).toFixed(1)}
                  </span>
                )}
              </div>
            )}
          </CardHeader>
          <div className="flex gap-2 mb-3">
            <input
              type="number"
              value={weightInput}
              onChange={(e) => setWeightInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addWeight()}
              placeholder="e.g. 182.5"
              className="flex-1 bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <input
              type="text"
              value={weightNote}
              onChange={(e) => setWeightNote(e.target.value)}
              placeholder="Note (optional)"
              className="flex-1 bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              onClick={addWeight}
              className="px-3 py-2 bg-primary/15 hover:bg-primary/25 text-primary border border-primary/30 rounded-lg transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-1 max-h-48 overflow-y-auto scrollbar-thin">
            {weightLog.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-6">No weight entries yet. Log your first weigh-in above.</p>
            )}
            {weightLog.slice(0, 10).map((entry, i) => (
              <div key={i} className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-muted/30 transition-colors">
                <span className="text-xs text-muted-foreground">{entry.date}</span>
                <div className="flex items-center gap-3">
                  {entry.notes && <span className="text-xs text-muted-foreground italic truncate max-w-24">{entry.notes}</span>}
                  <span className="text-sm font-medium text-foreground">{entry.weightLbs} lbs</span>
                  <button
                    onClick={() => removeWeightEntry(i, entry)}
                    className="text-muted-foreground hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Strength log */}
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Strength Log</CardTitle>
              <CardDescription>Track your lifts and PRs</CardDescription>
            </div>
            <Dumbbell className="h-4 w-4 text-red-400" />
          </CardHeader>
          <div className="grid grid-cols-4 gap-1.5 mb-3">
            <input
              value={strengthExercise}
              onChange={(e) => setStrengthExercise(e.target.value)}
              placeholder="Exercise"
              className="col-span-2 bg-muted border border-border rounded-lg px-2 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <input
              type="number"
              value={strengthWeight}
              onChange={(e) => setStrengthWeight(e.target.value)}
              placeholder="lbs"
              className="bg-muted border border-border rounded-lg px-2 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <input
              type="number"
              value={strengthReps}
              onChange={(e) => setStrengthReps(e.target.value)}
              placeholder="reps"
              className="bg-muted border border-border rounded-lg px-2 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              onClick={addStrength}
              className="col-span-4 px-3 py-2 bg-primary/15 hover:bg-primary/25 text-primary border border-primary/30 rounded-lg text-xs font-medium transition-colors"
            >
              Log Set
            </button>
          </div>
          <div className="space-y-1 max-h-48 overflow-y-auto scrollbar-thin">
            {strengthLog.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-6">No strength entries yet.</p>
            )}
            {strengthLog.slice(0, 10).map((entry, i) => (
              <div key={i} className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-muted/30 transition-colors">
                <div>
                  <span className="text-xs font-medium text-foreground">{entry.exercise}</span>
                  <span className="text-[10px] text-muted-foreground ml-2">{entry.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-foreground font-mono">{entry.sets}×{entry.reps} @ {entry.weightLbs}lbs</span>
                  <button
                    onClick={() => removeStrengthEntry(i, entry)}
                    className="text-muted-foreground hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Habit streak */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Daily Habit Tracker</CardTitle>
            <CardDescription>Today's habits — tap to toggle</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="green">{streakDays} day streak</Badge>
          </div>
        </CardHeader>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {HABIT_KEYS.map((habit) => {
            const done = (habits[today] ?? []).includes(habit)
            return (
              <button
                key={habit}
                onClick={() => toggleHabit(today, habit, habits[today] ?? [])}
                className={cn(
                  'flex items-center gap-2.5 px-3 py-2.5 rounded-lg border text-sm text-left transition-all duration-150',
                  done
                    ? 'border-green-500/30 bg-green-500/10 text-green-300'
                    : 'border-border text-muted-foreground hover:text-foreground hover:bg-muted/50',
                )}
              >
                <span className="text-base">{done ? '✓' : '○'}</span>
                <span className="text-xs">{habit}</span>
              </button>
            )
          })}
        </div>
      </Card>

      {/* Monthly photo reminder */}
      <Card className="border-purple-500/20 bg-purple-500/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-purple-400" />
            <div>
              <CardTitle>Monthly Progress Photos</CardTitle>
              <CardDescription>Visual tracking reminder</CardDescription>
            </div>
          </div>
        </CardHeader>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Take monthly progress photos on the same day each month, in the same lighting and position. Visual progress
          often lags scale progress — photos tell the full story that numbers miss. Front, side, and back views are
          recommended.
        </p>
        <div className="mt-3 flex items-center gap-2 text-xs text-purple-400">
          <Target className="h-3.5 w-3.5" />
          <span>Recommended: 1st of each month, morning, before eating</span>
        </div>
      </Card>
    </motion.div>
  )
}

function countStreak(habits: Record<string, string[]>, habitKeys: string[]): number {
  let streak = 0
  const date = new Date()

  for (let i = 0; i < 365; i++) {
    const dateStr = date.toISOString().split('T')[0]
    const dayHabits = habits[dateStr] ?? []
    const completed = habitKeys.filter((h) => dayHabits.includes(h)).length
    if (completed >= Math.ceil(habitKeys.length / 2)) {
      streak++
    } else if (i > 0) {
      break
    }
    date.setDate(date.getDate() - 1)
  }

  return streak
}
