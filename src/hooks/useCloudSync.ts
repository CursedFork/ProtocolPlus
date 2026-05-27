/**
 * useCloudSync
 *
 * Thin layer on top of useLocalStorage that also reads/writes to Supabase.
 * localStorage stays the source of truth for UI responsiveness.
 * Supabase is synced asynchronously — writes are fire-and-forget.
 */

import { useEffect, useCallback } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import type { UserStats } from '@/lib/stats'
import type { WeightEntry, StrengthEntry, Goal } from '@/types/progress'

// ── Row types (mirror the DB schema) ──────────────────────────────────────

interface ProfileRow {
  id: string
  sex: 'male' | 'female'
  age: number
  weight_lbs: number
  height_ft: number
  height_in: number
  activity_level: UserStats['activityLevel']
}

interface WeightRow {
  id: string
  user_id: string
  date: string
  weight_lbs: number
  notes: string | null
}

interface StrengthRow {
  id: string
  user_id: string
  date: string
  exercise: string
  weight_lbs: number
  reps: number
  sets: number
}

interface GoalRow {
  id: string
  user_id: string
  title: string
  target_value: number
  current_value: number
  unit: string
  category: string
}

interface HabitRow {
  id: string
  user_id: string
  date: string
  habits: string[]
}

interface PrefsRow {
  user_id: string
  workout_days: string[]
  goal_mode: string
}

// ── Profile (UserStats) ────────────────────────────────────────────────────

export function useCloudStats() {
  const { user } = useAuth()
  const [stats, setStats, clearStats] = useLocalStorage<UserStats | null>('user_stats', null)

  // On login: fetch from Supabase and overwrite localStorage
  useEffect(() => {
    if (!user) return
    supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle()
      .then(({ data }) => {
        const row = data as ProfileRow | null
        if (row) {
          setStats({
            sex: row.sex,
            age: row.age,
            weightLbs: row.weight_lbs,
            heightFt: row.height_ft,
            heightIn: row.height_in,
            activityLevel: row.activity_level,
          })
        }
      })
  }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

  const saveStats = useCallback(
    async (s: UserStats) => {
      setStats(s)
      if (!user) return
      await supabase.from('profiles').upsert({
        id: user.id,
        sex: s.sex,
        age: s.age,
        weight_lbs: s.weightLbs,
        height_ft: s.heightFt,
        height_in: s.heightIn,
        activity_level: s.activityLevel,
        updated_at: new Date().toISOString(),
      })
    },
    [user, setStats],
  )

  return { stats, saveStats, clearStats }
}

// ── Weight log ─────────────────────────────────────────────────────────────

export function useCloudWeightLog() {
  const { user } = useAuth()
  const [log, setLog] = useLocalStorage<WeightEntry[]>('progress_weight', [])

  useEffect(() => {
    if (!user) return
    supabase
      .from('weight_log')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: false })
      .limit(90)
      .then(({ data }) => {
        const rows = (data ?? []) as WeightRow[]
        if (rows.length > 0) {
          setLog(rows.map((r) => ({ date: r.date, weightLbs: r.weight_lbs, notes: r.notes ?? undefined })))
        }
      })
  }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

  const addEntry = useCallback(
    async (entry: WeightEntry) => {
      setLog((prev) => [entry, ...prev].slice(0, 90))
      if (!user) return
      await supabase.from('weight_log').insert({
        user_id: user.id,
        date: entry.date,
        weight_lbs: entry.weightLbs,
        notes: entry.notes ?? null,
      })
    },
    [user, setLog],
  )

  const removeEntry = useCallback(
    async (index: number, entry: WeightEntry) => {
      setLog((prev) => prev.filter((_, i) => i !== index))
      if (!user) return
      await supabase
        .from('weight_log')
        .delete()
        .eq('user_id', user.id)
        .eq('date', entry.date)
        .eq('weight_lbs', entry.weightLbs)
    },
    [user, setLog],
  )

  return { log, addEntry, removeEntry }
}

// ── Strength log ───────────────────────────────────────────────────────────

export function useCloudStrengthLog() {
  const { user } = useAuth()
  const [log, setLog] = useLocalStorage<StrengthEntry[]>('progress_strength', [])

  useEffect(() => {
    if (!user) return
    supabase
      .from('strength_log')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: false })
      .limit(200)
      .then(({ data }) => {
        const rows = (data ?? []) as StrengthRow[]
        if (rows.length > 0) {
          setLog(rows.map((r) => ({
            date: r.date,
            exercise: r.exercise,
            weightLbs: r.weight_lbs,
            reps: r.reps,
            sets: r.sets,
          })))
        }
      })
  }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

  const addEntry = useCallback(
    async (entry: StrengthEntry) => {
      setLog((prev) => [entry, ...prev].slice(0, 200))
      if (!user) return
      await supabase.from('strength_log').insert({
        user_id: user.id,
        date: entry.date,
        exercise: entry.exercise,
        weight_lbs: entry.weightLbs,
        reps: entry.reps,
        sets: entry.sets,
      })
    },
    [user, setLog],
  )

  const removeEntry = useCallback(
    async (index: number, entry: StrengthEntry) => {
      setLog((prev) => prev.filter((_, i) => i !== index))
      if (!user) return
      await supabase
        .from('strength_log')
        .delete()
        .eq('user_id', user.id)
        .eq('date', entry.date)
        .eq('exercise', entry.exercise)
    },
    [user, setLog],
  )

  return { log, addEntry, removeEntry }
}

// ── Goals ──────────────────────────────────────────────────────────────────

export function useCloudGoals(defaultGoals: Goal[]) {
  const { user } = useAuth()
  const [goals, setGoals] = useLocalStorage<Goal[]>('goals', defaultGoals)

  useEffect(() => {
    if (!user) return
    supabase
      .from('goals')
      .select('*')
      .eq('user_id', user.id)
      .then(({ data }) => {
        const rows = (data ?? []) as GoalRow[]
        if (rows.length > 0) {
          setGoals(rows.map((r) => ({
            id: r.id,
            title: r.title,
            targetValue: r.target_value,
            currentValue: r.current_value,
            unit: r.unit,
            category: r.category as Goal['category'],
          })))
        }
      })
  }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

  const saveGoals = useCallback(
    async (updated: Goal[]) => {
      setGoals(updated)
      if (!user) return
      await supabase.from('goals').upsert(
        updated.map((g) => ({
          id: g.id,
          user_id: user.id,
          title: g.title,
          target_value: g.targetValue,
          current_value: g.currentValue,
          unit: g.unit,
          category: g.category,
        })),
      )
    },
    [user, setGoals],
  )

  return { goals, saveGoals }
}

// ── Habit log ──────────────────────────────────────────────────────────────

export function useCloudHabits() {
  const { user } = useAuth()
  const [habits, setHabits] = useLocalStorage<Record<string, string[]>>('habit_streak', {})

  useEffect(() => {
    if (!user) return
    supabase
      .from('habit_log')
      .select('*')
      .eq('user_id', user.id)
      .then(({ data }) => {
        const rows = (data ?? []) as HabitRow[]
        if (rows.length > 0) {
          const map: Record<string, string[]> = {}
          rows.forEach((r) => { map[r.date] = r.habits })
          setHabits(map)
        }
      })
  }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

  const toggleHabit = useCallback(
    async (today: string, habit: string) => {
      let updatedHabits: string[] = []
      setHabits((prev) => {
        const todayHabits = prev[today] ?? []
        updatedHabits = todayHabits.includes(habit)
          ? todayHabits.filter((h) => h !== habit)
          : [...todayHabits, habit]
        return { ...prev, [today]: updatedHabits }
      })
      if (!user) return
      // We need the current list after state update — read it fresh
      const currentHabits = habits[today] ?? []
      const finalHabits = currentHabits.includes(habit)
        ? currentHabits.filter((h) => h !== habit)
        : [...currentHabits, habit]
      await supabase.from('habit_log').upsert({
        user_id: user.id,
        date: today,
        habits: finalHabits,
      })
    },
    [user, habits, setHabits],
  )

  return { habits, toggleHabit }
}

// ── Preferences ────────────────────────────────────────────────────────────

export function useCloudPreferences() {
  const { user } = useAuth()
  const [workoutDays, setWorkoutDays] = useLocalStorage<string[]>('workout_days', ['Monday', 'Wednesday', 'Friday'])
  const [goalMode, setGoalMode] = useLocalStorage<string>('workout_goal', 'strength')

  useEffect(() => {
    if (!user) return
    supabase
      .from('preferences')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle()
      .then(({ data }) => {
        const row = data as PrefsRow | null
        if (row) {
          setWorkoutDays(row.workout_days)
          setGoalMode(row.goal_mode)
        }
      })
  }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

  const savePreferences = useCallback(
    async (days: string[], mode: string) => {
      setWorkoutDays(days)
      setGoalMode(mode)
      if (!user) return
      await supabase.from('preferences').upsert({
        user_id: user.id,
        workout_days: days,
        goal_mode: mode,
        updated_at: new Date().toISOString(),
      })
    },
    [user, setWorkoutDays, setGoalMode],
  )

  return { workoutDays, goalMode, savePreferences }
}
