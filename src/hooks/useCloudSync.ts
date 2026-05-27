/**
 * useCloudSync
 *
 * Thin layer on top of useLocalStorage that also reads/writes to Appwrite.
 * localStorage stays the source of truth for UI responsiveness.
 * Appwrite is synced asynchronously — writes are fire-and-forget.
 */

import { useEffect, useCallback } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { databases, upsertDocument, ID, Query, Permission, Role, DATABASE_ID, COLLECTIONS } from '@/lib/appwrite'
import { useAuth } from '@/contexts/AuthContext'
import type { UserStats } from '@/lib/stats'
import type { WeightEntry, StrengthEntry, Goal } from '@/types/progress'

// ── Profile (UserStats) ────────────────────────────────────────────────────

export function useCloudStats() {
  const { user } = useAuth()
  const [stats, setStats, clearStats] = useLocalStorage<UserStats | null>('user_stats', null)

  useEffect(() => {
    if (!user) return
    databases
      .getDocument(DATABASE_ID, COLLECTIONS.PROFILES, user.$id)
      .then((doc) => {
        setStats({
          sex: doc.sex as UserStats['sex'],
          age: doc.age as number,
          weightLbs: doc.weight_lbs as number,
          heightFt: doc.height_ft as number,
          heightIn: doc.height_in as number,
          activityLevel: doc.activity_level as UserStats['activityLevel'],
        })
      })
      .catch(() => { /* no profile yet — that's fine */ })
  }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

  const saveStats = useCallback(
    async (s: UserStats) => {
      setStats(s)
      if (!user) return
      await upsertDocument(COLLECTIONS.PROFILES, user.$id, {
        sex: s.sex,
        age: s.age,
        weight_lbs: s.weightLbs,
        height_ft: s.heightFt,
        height_in: s.heightIn,
        activity_level: s.activityLevel,
      }, user.$id)
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
    databases
      .listDocuments(DATABASE_ID, COLLECTIONS.WEIGHT_LOG, [
        Query.equal('user_id', user.$id),
        Query.orderDesc('date'),
        Query.limit(90),
      ])
      .then(({ documents }) => {
        if (documents.length > 0) {
          setLog(documents.map((d) => ({
            date: d.date as string,
            weightLbs: d.weight_lbs as number,
            notes: (d.notes as string) || undefined,
          })))
        }
      })
      .catch(() => {})
  }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

  const addEntry = useCallback(
    async (entry: WeightEntry) => {
      setLog((prev) => [entry, ...prev].slice(0, 90))
      if (!user) return
      await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.WEIGHT_LOG,
        ID.unique(),
        { user_id: user.$id, date: entry.date, weight_lbs: entry.weightLbs, notes: entry.notes ?? null },
        [
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
        ],
      )
    },
    [user, setLog],
  )

  const removeEntry = useCallback(
    async (index: number, entry: WeightEntry) => {
      setLog((prev) => prev.filter((_, i) => i !== index))
      if (!user) return
      // Find the Appwrite document to delete
      const { documents } = await databases.listDocuments(DATABASE_ID, COLLECTIONS.WEIGHT_LOG, [
        Query.equal('user_id', user.$id),
        Query.equal('date', entry.date),
        Query.equal('weight_lbs', entry.weightLbs),
        Query.limit(1),
      ])
      if (documents[0]) {
        await databases.deleteDocument(DATABASE_ID, COLLECTIONS.WEIGHT_LOG, documents[0].$id)
      }
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
    databases
      .listDocuments(DATABASE_ID, COLLECTIONS.STRENGTH_LOG, [
        Query.equal('user_id', user.$id),
        Query.orderDesc('date'),
        Query.limit(200),
      ])
      .then(({ documents }) => {
        if (documents.length > 0) {
          setLog(documents.map((d) => ({
            date: d.date as string,
            exercise: d.exercise as string,
            weightLbs: d.weight_lbs as number,
            reps: d.reps as number,
            sets: d.sets as number,
          })))
        }
      })
      .catch(() => {})
  }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

  const addEntry = useCallback(
    async (entry: StrengthEntry) => {
      setLog((prev) => [entry, ...prev].slice(0, 200))
      if (!user) return
      await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.STRENGTH_LOG,
        ID.unique(),
        {
          user_id: user.$id,
          date: entry.date,
          exercise: entry.exercise,
          weight_lbs: entry.weightLbs,
          reps: entry.reps,
          sets: entry.sets,
        },
        [
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
        ],
      )
    },
    [user, setLog],
  )

  const removeEntry = useCallback(
    async (index: number, entry: StrengthEntry) => {
      setLog((prev) => prev.filter((_, i) => i !== index))
      if (!user) return
      const { documents } = await databases.listDocuments(DATABASE_ID, COLLECTIONS.STRENGTH_LOG, [
        Query.equal('user_id', user.$id),
        Query.equal('date', entry.date),
        Query.equal('exercise', entry.exercise),
        Query.limit(1),
      ])
      if (documents[0]) {
        await databases.deleteDocument(DATABASE_ID, COLLECTIONS.STRENGTH_LOG, documents[0].$id)
      }
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
    databases
      .listDocuments(DATABASE_ID, COLLECTIONS.GOALS, [
        Query.equal('user_id', user.$id),
      ])
      .then(({ documents }) => {
        if (documents.length > 0) {
          setGoals(documents.map((d) => ({
            id: d.goal_id as string,
            title: d.title as string,
            targetValue: d.target_value as number,
            currentValue: d.current_value as number,
            unit: d.unit as string,
            category: d.category as Goal['category'],
          })))
        }
      })
      .catch(() => {})
  }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

  const saveGoals = useCallback(
    async (updated: Goal[]) => {
      setGoals(updated)
      if (!user) return
      await Promise.all(
        updated.map((g) =>
          upsertDocument(
            COLLECTIONS.GOALS,
            `${user.$id}_${g.id}`,
            {
              user_id: user.$id,
              goal_id: g.id,
              title: g.title,
              target_value: g.targetValue,
              current_value: g.currentValue,
              unit: g.unit,
              category: g.category,
            },
            user.$id,
          ),
        ),
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
    databases
      .listDocuments(DATABASE_ID, COLLECTIONS.HABIT_LOG, [
        Query.equal('user_id', user.$id),
        Query.limit(365),
      ])
      .then(({ documents }) => {
        if (documents.length > 0) {
          const map: Record<string, string[]> = {}
          documents.forEach((d) => { map[d.date as string] = d.habits as string[] })
          setHabits(map)
        }
      })
      .catch(() => {})
  }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

  const toggleHabit = useCallback(
    async (today: string, habit: string, currentHabits: string[]) => {
      const updated = currentHabits.includes(habit)
        ? currentHabits.filter((h) => h !== habit)
        : [...currentHabits, habit]

      setHabits((prev) => ({ ...prev, [today]: updated }))

      if (!user) return
      await upsertDocument(
        COLLECTIONS.HABIT_LOG,
        `${user.$id}_${today}`,
        { user_id: user.$id, date: today, habits: updated },
        user.$id,
      )
    },
    [user, setHabits],
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
    databases
      .getDocument(DATABASE_ID, COLLECTIONS.PREFERENCES, user.$id)
      .then((doc) => {
        setWorkoutDays(doc.workout_days as string[])
        setGoalMode(doc.goal_mode as string)
      })
      .catch(() => {})
  }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

  const savePreferences = useCallback(
    async (days: string[], mode: string) => {
      setWorkoutDays(days)
      setGoalMode(mode)
      if (!user) return
      await upsertDocument(
        COLLECTIONS.PREFERENCES,
        user.$id,
        { workout_days: days, goal_mode: mode },
        user.$id,
      )
    },
    [user, setWorkoutDays, setGoalMode],
  )

  return { workoutDays, goalMode, savePreferences }
}
