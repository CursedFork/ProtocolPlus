export interface UserStats {
  sex: 'male' | 'female'
  age: number
  weightLbs: number
  heightFt: number
  heightIn: number
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'very' | 'extreme'
}

export const ACTIVITY_MULTIPLIERS: Record<UserStats['activityLevel'], number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  very: 1.725,
  extreme: 1.9,
}

export const ACTIVITY_LABELS: Record<UserStats['activityLevel'], string> = {
  sedentary: 'Sedentary (desk job, no exercise)',
  light: 'Lightly Active (1–3 workouts/week)',
  moderate: 'Moderately Active (3–5 workouts/week)',
  very: 'Very Active (6–7 workouts/week)',
  extreme: 'Extremely Active (athlete / physical job)',
}

export const ACTIVITY_SHORT: Record<UserStats['activityLevel'], string> = {
  sedentary: 'Sedentary',
  light: 'Lightly Active',
  moderate: 'Moderately Active',
  very: 'Very Active',
  extreme: 'Extremely Active',
}

export function calculateTargets(stats: UserStats) {
  const heightCm = stats.heightFt * 30.48 + stats.heightIn * 2.54
  const weightKg = stats.weightLbs * 0.453592
  const bmr = Math.round(10 * weightKg + 6.25 * heightCm - 5 * stats.age + (stats.sex === 'male' ? 5 : -161))
  const tdee = Math.round(bmr * ACTIVITY_MULTIPLIERS[stats.activityLevel])
  const calorieTarget = Math.max(1200, tdee - 400)
  const proteinTarget = Math.round(stats.weightLbs * 0.85)
  return { bmr, tdee, calorieTarget, proteinTarget }
}
