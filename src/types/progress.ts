export interface WeightEntry {
  date: string
  weightLbs: number
  notes?: string
}

export interface StrengthEntry {
  date: string
  exercise: string
  weightLbs: number
  reps: number
  sets: number
}

export interface CardioEntry {
  date: string
  type: string
  durationMinutes: number
  distanceKm?: number
}

export interface HabitEntry {
  date: string
  habits: Record<string, boolean>
}

export interface Goal {
  id: string
  title: string
  targetValue: number
  currentValue: number
  unit: string
  deadline?: string
  category: 'weight' | 'strength' | 'cardio' | 'habit'
}

export interface ProgressState {
  weight: WeightEntry[]
  strength: StrengthEntry[]
  cardio: CardioEntry[]
  habits: HabitEntry[]
  goals: Goal[]
}
