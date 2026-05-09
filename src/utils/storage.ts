export const STORAGE_KEYS = {
  GROCERY_CHECKED: 'protocol_grocery_checked',
  GROCERY_LAST_RESET: 'protocol_grocery_last_reset',
  PROGRESS_WEIGHT: 'protocol_progress_weight',
  PROGRESS_STRENGTH: 'protocol_progress_strength',
  PROGRESS_CARDIO: 'protocol_progress_cardio',
  PROGRESS_HABITS: 'protocol_progress_habits',
  GOALS: 'protocol_goals',
  WORKOUT_DAYS: 'protocol_workout_days',
  DASHBOARD_WATER: 'protocol_dashboard_water',
} as const

export function getItem<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // quota exceeded
  }
}

export function removeItem(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch {
    // ignore
  }
}
