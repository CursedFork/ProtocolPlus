import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Droplets, Flame, Apple, Dumbbell, Clock, Target,
  TrendingUp, CheckCircle2, Circle, Zap, Coffee, Moon,
  User, ChevronDown, ChevronUp, Pencil, Save, X,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/shared/Card'
import { ProgressBar } from '@/components/shared/ProgressBar'
import { Badge } from '@/components/shared/Badge'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { getTodayString } from '@/lib/utils'
import { cn } from '@/lib/utils'
import {
  type UserStats,
  ACTIVITY_LABELS,
  ACTIVITY_SHORT,
  calculateTargets,
} from '@/lib/stats'

// ── Static data ──────────────────────────────────────────────────────────────

const DEFAULT_CALORIE_GOAL = 1800
const DEFAULT_PROTEIN_GOAL = 160

const dailyHabits = [
  { id: 'training', label: 'Completed training session', icon: Dumbbell },
  { id: 'protein', label: 'Hit protein target', icon: Apple },
  { id: 'water', label: 'Drank 8 glasses of water', icon: Droplets },
  { id: 'sleep', label: '7–9 hours of sleep', icon: Moon },
  { id: 'caffeine', label: 'Limited caffeine to morning', icon: Coffee },
  { id: 'veggies', label: 'Ate vegetables with 2+ meals', icon: Apple },
]

const weeklyGoals = [
  { label: 'Training sessions', current: 2, target: 4, color: 'orange' as const },
  { label: 'Cardio sessions', current: 1, target: 3, color: 'blue' as const },
  { label: 'Days on-plan', current: 5, target: 7, color: 'green' as const },
]

// ── Dynamic meal generator ────────────────────────────────────────────────────

/** Convert a date string to a stable uint32 seed via djb2-style hash */
function hashString(s: string): number {
  let h = 5381
  for (let i = 0; i < s.length; i++) h = (Math.imul(h, 33) ^ s.charCodeAt(i)) >>> 0
  return h
}

/** Mulberry32 PRNG — fast, small, good distribution */
function seededRng(seed: number) {
  let s = seed >>> 0
  return (): number => {
    s = (s + 0x6d2b79f5) >>> 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 0x100000000
  }
}

function pickRandom<T>(arr: T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)]
}

interface MealTemplate { time: string; name: string; baseKcal: number; baseProtein: number }
interface DailyMeal { time: string; name: string; kcal: number; protein: number }

const MEAL_POOL: Record<string, MealTemplate[]> = {
  Morning: [
    { time: 'Morning', name: 'Protein Oats + Banana', baseKcal: 450, baseProtein: 35 },
    { time: 'Morning', name: 'Eggs + Avocado Toast', baseKcal: 420, baseProtein: 28 },
    { time: 'Morning', name: 'Greek Yogurt Parfait + Granola', baseKcal: 380, baseProtein: 30 },
    { time: 'Morning', name: 'Protein Pancakes + Berries', baseKcal: 480, baseProtein: 40 },
    { time: 'Morning', name: 'Cottage Cheese + Fruit Bowl', baseKcal: 340, baseProtein: 32 },
    { time: 'Morning', name: 'Overnight Oats + Whey Shake', baseKcal: 430, baseProtein: 38 },
    { time: 'Morning', name: 'Egg White Omelette + Toast', baseKcal: 360, baseProtein: 33 },
  ],
  Midday: [
    { time: 'Midday', name: 'Chicken + Rice + Veg', baseKcal: 550, baseProtein: 45 },
    { time: 'Midday', name: 'Turkey Quinoa Bowl', baseKcal: 530, baseProtein: 42 },
    { time: 'Midday', name: 'Tuna Salad Wrap', baseKcal: 480, baseProtein: 38 },
    { time: 'Midday', name: 'Ground Beef + Sweet Potato', baseKcal: 570, baseProtein: 44 },
    { time: 'Midday', name: 'Salmon Salad Bowl', baseKcal: 500, baseProtein: 40 },
    { time: 'Midday', name: 'Shrimp Stir-fry + Rice', baseKcal: 490, baseProtein: 38 },
    { time: 'Midday', name: 'Steak + Potato + Salad', baseKcal: 600, baseProtein: 48 },
  ],
  Afternoon: [
    { time: 'Afternoon', name: 'Greek Yogurt + Berries', baseKcal: 200, baseProtein: 18 },
    { time: 'Afternoon', name: 'Protein Shake + Banana', baseKcal: 210, baseProtein: 26 },
    { time: 'Afternoon', name: 'Cottage Cheese + Almonds', baseKcal: 230, baseProtein: 20 },
    { time: 'Afternoon', name: 'Beef Jerky + Rice Cakes', baseKcal: 210, baseProtein: 18 },
    { time: 'Afternoon', name: 'Edamame + String Cheese', baseKcal: 190, baseProtein: 16 },
    { time: 'Afternoon', name: 'Hard-boiled Eggs + Veggies', baseKcal: 180, baseProtein: 16 },
    { time: 'Afternoon', name: 'Apple + Almond Butter + Jerky', baseKcal: 240, baseProtein: 14 },
  ],
  Evening: [
    { time: 'Evening', name: 'Salmon + Sweet Potato + Greens', baseKcal: 600, baseProtein: 42 },
    { time: 'Evening', name: 'Chicken Thigh + Roasted Veg', baseKcal: 550, baseProtein: 40 },
    { time: 'Evening', name: 'Ground Turkey Pasta', baseKcal: 580, baseProtein: 44 },
    { time: 'Evening', name: 'Lean Beef Stir-fry + Noodles', baseKcal: 570, baseProtein: 42 },
    { time: 'Evening', name: 'Tilapia + Brown Rice + Broccoli', baseKcal: 520, baseProtein: 38 },
    { time: 'Evening', name: 'Pork Tenderloin + Mashed Potato', baseKcal: 560, baseProtein: 42 },
    { time: 'Evening', name: 'Bison Burger + Sweet Potato Fries', baseKcal: 590, baseProtein: 45 },
  ],
}

/**
 * Returns 4 daily meals seeded by today's date string.
 * Meals change each morning and stay stable within the day.
 * Kcal and protein are scaled proportionally to the user's targets.
 */
function getDailyMeals(today: string, calorieTarget: number, proteinTarget: number): DailyMeal[] {
  const rng = seededRng(hashString(today))
  const slots = ['Morning', 'Midday', 'Afternoon', 'Evening'] as const
  const selected = slots.map((slot) => pickRandom(MEAL_POOL[slot], rng))

  const totalBaseKcal = selected.reduce((s, m) => s + m.baseKcal, 0)
  const totalBaseProtein = selected.reduce((s, m) => s + m.baseProtein, 0)
  const kcalScale = calorieTarget / totalBaseKcal
  const proteinScale = proteinTarget / totalBaseProtein

  return selected.map((m) => ({
    time: m.time,
    name: m.name,
    kcal: Math.round(m.baseKcal * kcalScale),
    protein: Math.round(m.baseProtein * proteinScale),
  }))
}

// ── Smart supplement recommendations ─────────────────────────────────────────

interface SupplementReminder { name: string; dose: string; timing: string }

/**
 * Returns a personalized supplement checklist based on user stats.
 * Tier 1 core supplements are always included.
 * Tier 2/3 additions are determined by activity level, age, sex, and weight.
 */
function getRecommendedSupplements(stats: UserStats | null): SupplementReminder[] {
  const core: SupplementReminder[] = [
    { name: 'Creatine', dose: '5g monohydrate', timing: 'Post-workout / anytime' },
    { name: 'Omega-3', dose: '2g EPA+DHA', timing: 'With meals' },
    { name: 'Vitamin D3 + K2', dose: '2000 IU + 100mcg', timing: 'With morning meal' },
    { name: 'Magnesium', dose: '400mg glycinate', timing: 'Before bed' },
  ]

  if (!stats) return core

  const extras: SupplementReminder[] = []
  const { sex, age, weightLbs, activityLevel } = stats
  const isHighOutput = activityLevel === 'very' || activityLevel === 'extreme'
  const isActive = activityLevel === 'moderate' || isHighOutput

  // B12 — universal; metabolic + neurological baseline for active adults
  extras.push({ name: 'Vitamin B12', dose: '500mcg methylcobalamin', timing: 'Morning with food' })

  // Zinc — males: testosterone & immune support; modest evidence, low risk
  if (sex === 'male') {
    extras.push({ name: 'Zinc', dose: '15–25mg picolinate', timing: 'With dinner (separate from calcium)' })
  }

  // Collagen — females or 35+: joint integrity & skin collagen synthesis
  if (sex === 'female' || age >= 35) {
    extras.push({ name: 'Collagen Peptides', dose: '10g + Vitamin C', timing: '30 min pre-workout' })
  }

  // Ashwagandha — high-output athletes: cortisol management, recovery
  if (isHighOutput) {
    extras.push({ name: 'Ashwagandha (KSM-66)', dose: '300–600mg', timing: 'Evening with food' })
  }

  // Beta-Alanine — performance-focused training 4+ days/week
  if (isHighOutput) {
    extras.push({ name: 'Beta-Alanine', dose: '3.2g', timing: 'Pre-workout (tingling is normal)' })
  }

  // HMB — heavier athletes or 40+: anti-catabolic during deficit or aging
  if (weightLbs >= 190 || age >= 40) {
    extras.push({ name: 'HMB', dose: '3g HMB-FA', timing: '30–45 min pre-workout or with protein' })
  }

  // L-Carnitine — moderate+ activity on a calorie deficit: fat oxidation support
  if (isActive) {
    extras.push({ name: 'L-Carnitine (LCLT)', dose: '2g', timing: 'With a carb-containing meal' })
  }

  return [...core, ...extras]
}

const stagger = {
  container: { transition: { staggerChildren: 0.06 } },
  item: { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 } },
}

// ── Main component ───────────────────────────────────────────────────────────

export default function Dashboard() {
  const today = getTodayString()
  const [userStats, setUserStats] = useLocalStorage<UserStats | null>('user_stats', null)
  const [waterGlasses, setWaterGlasses] = useLocalStorage(`water_${today}`, 0)
  const [habits, setHabits] = useLocalStorage<Record<string, boolean>>(`habits_${today}`, {})
  const [suppDone, setSuppDone] = useLocalStorage<Record<string, boolean>>(`supps_${today}`, {})
  const [mealDone, setMealDone] = useLocalStorage<Record<string, boolean>>(`meals_${today}`, {})

  const habitsDone = dailyHabits.filter((h) => habits[h.id]).length

  const targets = userStats ? calculateTargets(userStats) : null
  const calorieGoal = targets?.calorieTarget ?? DEFAULT_CALORIE_GOAL
  const proteinGoal = targets?.proteinTarget ?? DEFAULT_PROTEIN_GOAL

  const todayMeals = getDailyMeals(today, calorieGoal, proteinGoal)
  const supplementsReminders = getRecommendedSupplements(userStats)

  const WATER_GOAL = 8

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={stagger.container}
      className="space-y-6"
    >
      {/* Hero row */}
      <motion.div variants={stagger.item} className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          icon={<Flame className="h-5 w-5 text-orange-400" />}
          label="Calorie Target"
          value={calorieGoal.toLocaleString()}
          unit={targets ? `kcal/day (−400 from TDEE)` : 'kcal/day (default)'}
          color="orange"
        />
        <StatCard
          icon={<Apple className="h-5 w-5 text-green-400" />}
          label="Protein Target"
          value={proteinGoal.toString()}
          unit={targets ? `g/day (0.85g per lb)` : 'g/day (default)'}
          color="green"
        />
        <StatCard
          icon={<Droplets className="h-5 w-5 text-blue-400" />}
          label="Hydration"
          value={`${waterGlasses}/${WATER_GOAL}`}
          unit="glasses"
          color="blue"
        />
        <StatCard
          icon={<CheckCircle2 className="h-5 w-5 text-purple-400" />}
          label="Daily Habits"
          value={`${habitsDone}/${dailyHabits.length}`}
          unit="done"
          color="purple"
        />
      </motion.div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left column: Meals + Supplements */}
        <div className="lg:col-span-2 space-y-4">
          {/* Today's meals */}
          <motion.div variants={stagger.item}>
            <Card>
              <CardHeader>
                <div>
                  <CardTitle>Today's Recommended Meals</CardTitle>
                  <CardDescription>Refreshes each morning · scaled to your target</CardDescription>
                </div>
                <Badge variant="green" className="flex-shrink-0">
                  {todayMeals.reduce((s, m) => s + m.kcal, 0)} kcal
                </Badge>
              </CardHeader>
              <div className="space-y-2">
                {todayMeals.map((meal) => (
                  <MealRow
                    key={meal.time}
                    time={meal.time}
                    name={meal.name}
                    kcal={meal.kcal}
                    protein={meal.protein}
                    done={!!mealDone[meal.time]}
                    onToggle={() => setMealDone((prev) => ({ ...prev, [meal.time]: !prev[meal.time] }))}
                  />
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-border space-y-2">
                <ProgressBar
                  label="Estimated protein"
                  sublabel={`${todayMeals.reduce((s, m) => s + m.protein, 0)}g / ${proteinGoal}g`}
                  value={todayMeals.reduce((s, m) => s + m.protein, 0)}
                  max={proteinGoal}
                  color="green"
                  size="sm"
                />
              </div>
            </Card>
          </motion.div>

          {/* Supplement checklist */}
          <motion.div variants={stagger.item}>
            <Card>
              <CardHeader>
                <div>
                  <CardTitle>Supplement Reminders</CardTitle>
                  <CardDescription>Today's protocol</CardDescription>
                </div>
                <Badge variant="purple">
                  {supplementsReminders.filter((s) => suppDone[s.name]).length}/{supplementsReminders.length}
                </Badge>
              </CardHeader>
              <div className="space-y-2">
                {supplementsReminders.map((s) => (
                  <button
                    key={s.name}
                    onClick={() => setSuppDone((prev) => ({ ...prev, [s.name]: !prev[s.name] }))}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border text-left transition-all duration-150',
                      suppDone[s.name]
                        ? 'border-green-500/30 bg-green-500/5 opacity-75'
                        : 'border-border hover:border-muted-foreground/30 hover:bg-muted/50',
                    )}
                  >
                    {suppDone[s.name] ? (
                      <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0" />
                    ) : (
                      <Circle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <span className={cn('text-sm font-medium', suppDone[s.name] && 'line-through text-muted-foreground')}>
                        {s.name}
                      </span>
                      <span className="text-xs text-muted-foreground ml-2">{s.dose}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground flex-shrink-0">
                      <Clock className="h-3 w-3" />
                      <span className="text-xs">{s.timing}</span>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Body Stats */}
          <motion.div variants={stagger.item}>
            <StatsCard stats={userStats} onSave={setUserStats} />
          </motion.div>

          {/* Water tracker */}
          <motion.div variants={stagger.item}>
            <Card glow={waterGlasses >= WATER_GOAL ? 'blue' : 'none'}>
              <CardHeader>
                <div>
                  <CardTitle>Hydration</CardTitle>
                  <CardDescription>8 × 250ml glasses</CardDescription>
                </div>
                <Droplets className={cn('h-5 w-5', waterGlasses >= WATER_GOAL ? 'text-blue-400' : 'text-muted-foreground')} />
              </CardHeader>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {Array.from({ length: WATER_GOAL }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setWaterGlasses(i < waterGlasses ? i : i + 1)}
                    className={cn(
                      'aspect-square rounded-lg border flex items-center justify-center transition-all duration-150',
                      i < waterGlasses
                        ? 'bg-blue-500/20 border-blue-500/40 text-blue-400'
                        : 'bg-muted border-border text-muted-foreground hover:border-blue-500/30',
                    )}
                  >
                    <Droplets className="h-4 w-4" />
                  </button>
                ))}
              </div>
              <ProgressBar value={waterGlasses} max={WATER_GOAL} color="blue" size="sm" />
              <p className="text-xs text-muted-foreground mt-2 text-center">
                {waterGlasses >= WATER_GOAL ? '✓ Daily goal reached!' : `${WATER_GOAL - waterGlasses} more glasses to go`}
              </p>
            </Card>
          </motion.div>

          {/* Daily habits */}
          <motion.div variants={stagger.item}>
            <Card>
              <CardHeader>
                <div>
                  <CardTitle>Daily Habits</CardTitle>
                  <CardDescription>Track your consistency</CardDescription>
                </div>
                <span className="text-xs font-medium text-primary">{habitsDone}/{dailyHabits.length}</span>
              </CardHeader>
              <div className="space-y-1.5">
                {dailyHabits.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setHabits((prev) => ({ ...prev, [id]: !prev[id] }))}
                    className={cn(
                      'w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left text-sm transition-all duration-150',
                      habits[id]
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
                    )}
                  >
                    {habits[id] ? (
                      <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0" />
                    ) : (
                      <Circle className="h-4 w-4 flex-shrink-0" />
                    )}
                    <Icon className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className={cn(habits[id] && 'line-through opacity-60')}>{label}</span>
                  </button>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Weekly goals */}
          <motion.div variants={stagger.item}>
            <Card>
              <CardHeader>
                <div>
                  <CardTitle>Weekly Goals</CardTitle>
                  <CardDescription>This week's targets</CardDescription>
                </div>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <div className="space-y-4">
                {weeklyGoals.map((g) => (
                  <ProgressBar
                    key={g.label}
                    label={g.label}
                    sublabel={`${g.current} / ${g.target}`}
                    value={g.current}
                    max={g.target}
                    color={g.color}
                  />
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Motivational widget */}
          <motion.div variants={stagger.item}>
            <Card variant="glass" className="border-primary/20 gradient-green">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Today's Principle</span>
              </div>
              <p className="text-sm text-foreground leading-relaxed italic">
                "Consistency over intensity. One perfect week won't transform you — but 52 good weeks will."
              </p>
              <div className="mt-3 flex items-center gap-2">
                <TrendingUp className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs text-muted-foreground">Progressive overload is the mechanism. Habits are the system.</span>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

// ── StatsCard ────────────────────────────────────────────────────────────────

function StatsCard({
  stats,
  onSave,
}: {
  stats: UserStats | null
  onSave: (s: UserStats) => void
}) {
  const [editing, setEditing] = useState(!stats)
  const [open, setOpen] = useState(true)
  const [draft, setDraft] = useState<UserStats>(
    stats ?? { sex: 'male', age: 25, weightLbs: 180, heightFt: 5, heightIn: 10, activityLevel: 'moderate' },
  )

  const isValid =
    draft.age > 0 && draft.age < 120 &&
    draft.weightLbs > 0 &&
    draft.heightFt >= 0 &&
    draft.heightIn >= 0 &&
    draft.heightIn < 12

  function handleSave() {
    if (!isValid) return
    onSave(draft)
    setEditing(false)
  }

  function handleEdit() {
    setDraft(stats ?? draft)
    setEditing(true)
    setOpen(true)
  }

  const targets = stats ? calculateTargets(stats) : null

  // Collapsed compact view (stats set, not editing)
  if (stats && !editing && !open) {
    return (
      <Card>
        <button onClick={() => setOpen(true)} className="w-full flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Your Stats</span>
            <span className="text-xs text-muted-foreground">
              {stats.weightLbs} lbs · {stats.heightFt}'{stats.heightIn}" · {ACTIVITY_SHORT[stats.activityLevel]}
            </span>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        </button>
      </Card>
    )
  }

  // Display mode (stats set, not editing, open)
  if (stats && !editing) {
    return (
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-primary" />
            <div>
              <CardTitle>Your Stats</CardTitle>
              <CardDescription>Mifflin-St Jeor calculation</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={handleEdit}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              title="Edit stats"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <ChevronUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </CardHeader>

        {/* Profile summary */}
        <div className="flex flex-wrap gap-2 mb-3">
          {[
            `${stats.sex === 'male' ? 'Male' : 'Female'}`,
            `${stats.age} yrs`,
            `${stats.weightLbs} lbs`,
            `${stats.heightFt}'${stats.heightIn}"`,
          ].map((tag) => (
            <span key={tag} className="text-[11px] px-2 py-0.5 rounded-full bg-muted border border-border text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mb-3">{ACTIVITY_SHORT[stats.activityLevel]}</p>

        {/* Calculated values */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'BMR', value: targets!.bmr.toLocaleString(), unit: 'kcal', color: 'text-muted-foreground' },
            { label: 'TDEE', value: targets!.tdee.toLocaleString(), unit: 'kcal', color: 'text-blue-400' },
            { label: 'Calorie target', value: targets!.calorieTarget.toLocaleString(), unit: 'kcal/day', color: 'text-orange-400' },
            { label: 'Protein target', value: targets!.proteinTarget.toString(), unit: 'g/day', color: 'text-green-400' },
          ].map((row) => (
            <div key={row.label} className="bg-muted/40 rounded-lg p-2 border border-border">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{row.label}</p>
              <p className={cn('text-base font-bold', row.color)}>{row.value}</p>
              <p className="text-[10px] text-muted-foreground">{row.unit}</p>
            </div>
          ))}
        </div>

        <p className="text-[10px] text-muted-foreground mt-3 leading-relaxed">
          Calorie target = TDEE − 400 kcal (moderate deficit). Protein = 0.85 g per lb bodyweight.
        </p>
      </Card>
    )
  }

  // Edit / setup form
  return (
    <Card className={cn('border-primary/20', !stats && 'border-dashed')}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-primary" />
          <div>
            <CardTitle>{stats ? 'Edit Stats' : 'Set Up Your Stats'}</CardTitle>
            <CardDescription>Personalize calorie & protein targets</CardDescription>
          </div>
        </div>
        {stats && (
          <button
            onClick={() => setEditing(false)}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex-shrink-0"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </CardHeader>

      <div className="space-y-3">
        {/* Sex */}
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">Biological Sex</label>
          <div className="grid grid-cols-2 gap-2">
            {(['male', 'female'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setDraft((d) => ({ ...d, sex: s }))}
                className={cn(
                  'py-2 rounded-lg text-xs font-medium border transition-all',
                  draft.sex === s
                    ? 'border-primary/50 bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:text-foreground hover:bg-muted',
                )}
              >
                {s === 'male' ? 'Male' : 'Female'}
              </button>
            ))}
          </div>
        </div>

        {/* Age + Weight */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Age (years)</label>
            <input
              type="number"
              min={10}
              max={110}
              value={draft.age || ''}
              onChange={(e) => setDraft((d) => ({ ...d, age: parseInt(e.target.value) || 0 }))}
              placeholder="25"
              className="w-full bg-muted border border-border rounded-lg px-2.5 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Weight (lbs)</label>
            <input
              type="number"
              min={50}
              max={600}
              value={draft.weightLbs || ''}
              onChange={(e) => setDraft((d) => ({ ...d, weightLbs: parseFloat(e.target.value) || 0 }))}
              placeholder="180"
              className="w-full bg-muted border border-border rounded-lg px-2.5 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
        </div>

        {/* Height */}
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">Height</label>
          <div className="grid grid-cols-2 gap-2">
            <div className="relative">
              <input
                type="number"
                min={3}
                max={8}
                value={draft.heightFt || ''}
                onChange={(e) => setDraft((d) => ({ ...d, heightFt: parseInt(e.target.value) || 0 }))}
                placeholder="5"
                className="w-full bg-muted border border-border rounded-lg px-2.5 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors pr-7"
              />
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">ft</span>
            </div>
            <div className="relative">
              <input
                type="number"
                min={0}
                max={11}
                value={draft.heightIn !== undefined ? draft.heightIn : ''}
                onChange={(e) => setDraft((d) => ({ ...d, heightIn: parseInt(e.target.value) || 0 }))}
                placeholder="10"
                className="w-full bg-muted border border-border rounded-lg px-2.5 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors pr-7"
              />
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">in</span>
            </div>
          </div>
        </div>

        {/* Activity level */}
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">Activity Level</label>
          <div className="space-y-1">
            {(Object.keys(ACTIVITY_LABELS) as UserStats['activityLevel'][]).map((level) => (
              <button
                key={level}
                onClick={() => setDraft((d) => ({ ...d, activityLevel: level }))}
                className={cn(
                  'w-full text-left px-3 py-2 rounded-lg text-xs border transition-all',
                  draft.activityLevel === level
                    ? 'border-primary/50 bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:text-foreground hover:bg-muted',
                )}
              >
                {ACTIVITY_LABELS[level]}
              </button>
            ))}
          </div>
        </div>

        {/* Live preview */}
        {isValid && (() => {
          const preview = calculateTargets(draft)
          return (
            <div className="bg-muted/50 rounded-lg p-2.5 border border-border space-y-1">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Preview</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                <span className="text-muted-foreground">BMR</span>
                <span className="text-foreground font-medium">{preview.bmr.toLocaleString()} kcal</span>
                <span className="text-muted-foreground">TDEE</span>
                <span className="text-blue-400 font-medium">{preview.tdee.toLocaleString()} kcal</span>
                <span className="text-muted-foreground">Calorie target</span>
                <span className="text-orange-400 font-medium">{preview.calorieTarget.toLocaleString()} kcal/day</span>
                <span className="text-muted-foreground">Protein target</span>
                <span className="text-green-400 font-medium">{preview.proteinTarget} g/day</span>
              </div>
            </div>
          )
        })()}

        <button
          onClick={handleSave}
          disabled={!isValid}
          className={cn(
            'w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium border transition-all',
            isValid
              ? 'bg-primary/15 border-primary/40 text-primary hover:bg-primary/25'
              : 'bg-muted border-border text-muted-foreground cursor-not-allowed opacity-50',
          )}
        >
          <Save className="h-4 w-4" />
          Save Stats
        </button>

        <p className="text-[10px] text-muted-foreground text-center">
          Stored locally in your browser only. Not sent anywhere.
        </p>
      </div>
    </Card>
  )
}

// ── Sub-components ───────────────────────────────────────────────────────────

function StatCard({
  icon, label, value, unit, color,
}: {
  icon: React.ReactNode
  label: string
  value: string
  unit: string
  color: 'green' | 'blue' | 'orange' | 'purple'
}) {
  const borderColors = {
    green: 'border-green-500/20',
    blue: 'border-blue-500/20',
    orange: 'border-orange-500/20',
    purple: 'border-purple-500/20',
  }
  return (
    <Card className={cn('border', borderColors[color])}>
      <div className="flex items-center justify-between mb-2">
        {icon}
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{unit}</p>
    </Card>
  )
}

function MealRow({
  time, name, kcal, protein, done, onToggle,
}: {
  time: string
  name: string
  kcal: number
  protein: number
  done: boolean
  onToggle: () => void
}) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border text-left transition-all duration-150',
        done
          ? 'border-green-500/20 bg-green-500/5 opacity-75'
          : 'border-border hover:border-muted-foreground/30 hover:bg-muted/50',
      )}
    >
      {done ? (
        <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0" />
      ) : (
        <Circle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-[10px] px-1.5 py-0">{time}</Badge>
          <span className={cn('text-sm font-medium text-foreground truncate', done && 'line-through text-muted-foreground')}>
            {name}
          </span>
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-xs font-medium text-foreground">{kcal} kcal</p>
        <p className="text-[10px] text-muted-foreground">{protein}g protein</p>
      </div>
    </button>
  )
}
