import type { SplitType, WorkoutPlan, DayOfWeek } from '@/types/workout'
import { workoutPlans } from '@/data/workouts'

const ALL_DAYS: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export function buildSchedule(selectedDays: DayOfWeek[]): Record<DayOfWeek, string> {
  const plan = workoutPlans[selectedDays.length as SplitType]
  const schedule: Record<string, string> = {}

  ALL_DAYS.forEach((day) => {
    if (selectedDays.includes(day)) {
      const idx = selectedDays.indexOf(day)
      schedule[day] = plan.days[idx]?.label ?? 'Training Day'
    } else {
      schedule[day] = 'Rest / Active Recovery'
    }
  })

  return schedule as Record<DayOfWeek, string>
}

export function getPlanForDays(count: number): WorkoutPlan | null {
  if (count < 2 || count > 6) return null
  return workoutPlans[count as SplitType] ?? null
}

export function getRestDayCount(splitType: SplitType): number {
  return 7 - splitType
}

export function validateDaySelection(days: DayOfWeek[]): { valid: boolean; message?: string } {
  if (days.length < 2) return { valid: false, message: 'Select at least 2 training days' }
  if (days.length > 6) return { valid: false, message: 'Maximum 6 training days (at least 1 rest day required)' }
  return { valid: true }
}
