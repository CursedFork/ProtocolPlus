export type SplitType = 2 | 3 | 4 | 5 | 6

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'

export type MuscleGroup =
  | 'Chest' | 'Back' | 'Shoulders' | 'Biceps' | 'Triceps'
  | 'Legs' | 'Glutes' | 'Core' | 'Cardio' | 'Full Body'

export interface Exercise {
  name: string
  sets: number
  reps: string
  restSeconds: number
  muscleGroup: MuscleGroup
  notes?: string
  progressionTip?: string
}

export interface WorkoutDay {
  label: string
  focus: MuscleGroup[]
  exercises: Exercise[]
  cardio?: string
  estimatedMinutes: number
}

export interface WorkoutPlan {
  splitType: SplitType
  name: string
  description: string
  days: WorkoutDay[]
  restDays: string[]
  generalNotes: string[]
}

export interface ProgressEntry {
  date: string
  exercise: string
  weight?: number
  reps?: number
  sets?: number
  notes?: string
}

export interface CardioSession {
  date: string
  type: string
  durationMinutes: number
  distanceKm?: number
  notes?: string
}
