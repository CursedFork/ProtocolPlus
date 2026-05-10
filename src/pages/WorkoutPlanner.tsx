import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dumbbell, Clock, ChevronDown, ChevronUp, Info, Calendar, Zap, FlaskConical, ExternalLink, BookOpen } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/shared/Card'
import { Badge } from '@/components/shared/Badge'
import { Accordion, AccordionItem } from '@/components/shared/Accordion'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { workoutPlans } from '@/data/workouts'
import { buildSchedule, validateDaySelection } from '@/utils/workoutScaling'
import { supersetTypes, workoutCitations } from '@/data/workoutResearch'
import type { DayOfWeek, SplitType } from '@/types/workout'
import { cn } from '@/lib/utils'

const ALL_DAYS: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const muscleGroupColors: Record<string, string> = {
  Chest: 'text-red-400',
  Back: 'text-blue-400',
  Shoulders: 'text-orange-400',
  Biceps: 'text-green-400',
  Triceps: 'text-purple-400',
  Legs: 'text-yellow-400',
  Glutes: 'text-pink-400',
  Core: 'text-cyan-400',
  Cardio: 'text-teal-400',
  'Full Body': 'text-primary',
}

export default function WorkoutPlanner() {
  const [selectedDays, setSelectedDays] = useLocalStorage<DayOfWeek[]>('workout_days', ['Monday', 'Wednesday', 'Friday'])
  const [expandedDay, setExpandedDay] = useState<number | null>(null)

  const validation = validateDaySelection(selectedDays)
  const splitType = selectedDays.length as SplitType
  const plan = workoutPlans[splitType] ?? workoutPlans[3]
  const schedule = buildSchedule(selectedDays)

  function toggleDay(day: DayOfWeek) {
    setSelectedDays((prev) => {
      if (prev.includes(day)) {
        if (prev.length <= 2) return prev
        return prev.filter((d) => d !== day)
      }
      if (prev.length >= 6) return prev
      return [...prev, day]
    })
    setExpandedDay(null)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      {/* Disclaimer */}
      <Card className="border-yellow-500/20 bg-yellow-500/5">
        <div className="flex gap-2.5">
          <Info className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-yellow-300 leading-relaxed">
            This workout template is a beginner-to-intermediate evidence-based placeholder following Push/Pull/Legs principles.
            Individual needs vary — consult a certified personal trainer for personalized programming. Always warm up and use
            proper form over maximum weight.
          </p>
        </div>
      </Card>

      {/* Day selector */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Select Your Training Days</CardTitle>
            <CardDescription>Choose 2–6 days. Program scales automatically.</CardDescription>
          </div>
          <Badge variant={validation.valid ? 'green' : 'yellow'}>
            {selectedDays.length}-Day Split
          </Badge>
        </CardHeader>
        <div className="grid grid-cols-7 gap-1.5">
          {ALL_DAYS.map((day) => {
            const active = selectedDays.includes(day)
            const short = day.slice(0, 3)
            return (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={cn(
                  'flex flex-col items-center justify-center rounded-lg border py-2 px-1 text-center transition-all duration-150',
                  active
                    ? 'bg-primary/15 border-primary/40 text-primary'
                    : 'border-border text-muted-foreground hover:border-muted-foreground/40 hover:text-foreground',
                )}
              >
                <span className="text-xs font-semibold">{short}</span>
                {active && <div className="w-1 h-1 rounded-full bg-primary mt-1" />}
              </button>
            )
          })}
        </div>
        {!validation.valid && (
          <p className="text-xs text-yellow-400 mt-2 flex items-center gap-1.5">
            <Info className="h-3.5 w-3.5" /> {validation.message}
          </p>
        )}
      </Card>

      {/* Plan overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-primary/20 gradient-green">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-4 w-4 text-primary" />
            <span className="font-semibold text-primary text-sm">{plan.name}</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{plan.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Dumbbell className="h-3.5 w-3.5" />
              <span>{plan.days.length} training days</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span>{plan.days[0]?.estimatedMinutes}–{plan.days[plan.days.length - 1]?.estimatedMinutes} min/session</span>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle className="text-sm">Week Schedule</CardTitle>
              <CardDescription>Your personalized weekly plan</CardDescription>
            </div>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <div className="space-y-1">
            {ALL_DAYS.map((day) => (
              <div key={day} className="flex items-center justify-between py-1">
                <span className="text-xs font-medium text-muted-foreground w-20">{day}</span>
                <span className={cn(
                  'text-xs truncate',
                  selectedDays.includes(day) ? 'text-foreground' : 'text-muted-foreground/50',
                )}>
                  {schedule[day]}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* General notes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Program Notes</CardTitle>
        </CardHeader>
        <ul className="space-y-1.5">
          {plan.generalNotes.map((note, i) => (
            <li key={i} className="flex gap-2 text-sm text-muted-foreground">
              <span className="text-primary font-bold flex-shrink-0">→</span>
              {note}
            </li>
          ))}
        </ul>
      </Card>

      {/* Workout days */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground px-1">Training Days Detail</h3>
        {plan.days.map((day, idx) => (
          <Card key={idx} className={cn(expandedDay === idx && 'border-primary/30')}>
            <button
              onClick={() => setExpandedDay(expandedDay === idx ? null : idx)}
              className="w-full text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary">{idx + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{day.label}</h4>
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {day.focus.map((f) => (
                        <span key={f} className={cn('text-[10px] font-medium', muscleGroupColors[f] ?? 'text-muted-foreground')}>
                          {f}
                        </span>
                      ))}
                      <span className="text-[10px] text-muted-foreground">• ~{day.estimatedMinutes} min</span>
                    </div>
                  </div>
                </div>
                {expandedDay === idx ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                )}
              </div>
            </button>

            <AnimatePresence>
              {expandedDay === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 space-y-3">
                    {/* Exercises table */}
                    <div className="overflow-x-auto -mx-1">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-2 px-2 text-muted-foreground font-medium">Exercise</th>
                            <th className="text-center py-2 px-2 text-muted-foreground font-medium whitespace-nowrap">Sets × Reps</th>
                            <th className="text-center py-2 px-2 text-muted-foreground font-medium whitespace-nowrap">Rest</th>
                            <th className="text-left py-2 px-2 text-muted-foreground font-medium">Muscle</th>
                          </tr>
                        </thead>
                        <tbody>
                          {day.exercises.map((ex, eIdx) => (
                            <tr key={eIdx} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                              <td className="py-2.5 px-2">
                                <div>
                                  <p className="font-medium text-foreground">{ex.name}</p>
                                  {ex.notes && <p className="text-muted-foreground text-[10px]">{ex.notes}</p>}
                                  {ex.progressionTip && (
                                    <p className="text-primary text-[10px] mt-0.5">↑ {ex.progressionTip}</p>
                                  )}
                                </div>
                              </td>
                              <td className="py-2.5 px-2 text-center font-mono text-foreground whitespace-nowrap">
                                {ex.sets} × {ex.reps}
                              </td>
                              <td className="py-2.5 px-2 text-center text-muted-foreground whitespace-nowrap">
                                {ex.restSeconds}s
                              </td>
                              <td className="py-2.5 px-2">
                                <span className={cn('font-medium', muscleGroupColors[ex.muscleGroup] ?? 'text-muted-foreground')}>
                                  {ex.muscleGroup}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Cardio */}
                    {day.cardio && (
                      <div className="flex items-start gap-2 bg-blue-500/5 border border-blue-500/20 rounded-lg p-2.5">
                        <Zap className="h-3.5 w-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-medium text-blue-400 mb-0.5">Cardio Recommendation</p>
                          <p className="text-xs text-muted-foreground">{day.cardio}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        ))}
      </div>

      {/* Research-backed accordion sections */}
      <Accordion>
        <AccordionItem
          title={
            <div className="flex items-center gap-2">
              <Dumbbell className="h-4 w-4 text-primary" />
              <span className="font-medium text-foreground text-sm">Progressive Overload — The Core Principle</span>
            </div>
          }
          badge={<Badge variant="green">NSCA/ACSM</Badge>}
        >
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              Progressive overload — gradually increasing the demands placed on the body over time — is the fundamental
              mechanism behind strength and muscle development. Without it, adaptation stalls. (ACSM Position Stand, 2009)
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { method: 'Add weight', detail: 'Increase load by 2.5–5lbs when you hit the top rep range for 2 sessions in a row' },
                { method: 'Add reps', detail: 'Complete more reps at the same weight before increasing load' },
                { method: 'Add sets', detail: 'Increase total volume by adding a set periodically (10+ weekly sets per muscle = optimal hypertrophy per Schoenfeld et al. 2017)' },
                { method: 'Reduce rest', detail: 'Same work in less time = higher relative intensity' },
                { method: 'Improve form / ROM', detail: 'Fuller range of motion under load drives greater stretch-mediated hypertrophy (Maeo et al. 2023)' },
                { method: 'Add frequency', detail: 'Training a muscle 2–3× per week produces more hypertrophy than once per week when volume is equated (Ralston et al. 2017)' },
              ].map((item) => (
                <div key={item.method} className="bg-muted/40 rounded-lg p-2.5 border border-border">
                  <p className="font-medium text-foreground text-xs">{item.method}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </AccordionItem>

        <AccordionItem
          title={
            <div className="flex items-center gap-2">
              <FlaskConical className="h-4 w-4 text-purple-400" />
              <span className="font-medium text-foreground text-sm">Superset Training Guide</span>
            </div>
          }
          badge={<Badge variant="purple">Time-Efficient</Badge>}
        >
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              Supersets reduce session time by 30–40% with equivalent or superior hypertrophy outcomes compared to traditional
              straight sets. There are 4 distinct types, each with different mechanisms and applications.
              (Weakley et al. 2017)
            </p>
            <div className="space-y-3">
              {supersetTypes.map((st) => (
                <div key={st.id} className="border border-border rounded-lg p-3 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-foreground text-sm">{st.name}</p>
                    <Badge variant="purple" className="text-[9px] flex-shrink-0">{st.timeReduction}</Badge>
                  </div>
                  <p className="text-xs leading-relaxed">{st.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="bg-muted/30 rounded p-2 border border-border">
                      <p className="text-[10px] font-semibold text-foreground uppercase tracking-wider mb-1">Mechanism</p>
                      <p className="text-muted-foreground leading-relaxed">{st.mechanism}</p>
                    </div>
                    <div className="bg-muted/30 rounded p-2 border border-border">
                      <p className="text-[10px] font-semibold text-foreground uppercase tracking-wider mb-1">Best For</p>
                      <p className="text-muted-foreground">{st.bestFor}</p>
                    </div>
                  </div>
                  <div className="bg-primary/5 border border-primary/20 rounded p-2">
                    <p className="text-[10px] font-semibold text-primary uppercase tracking-wider mb-0.5">Example</p>
                    <p className="text-xs text-muted-foreground">{st.example}</p>
                  </div>
                  <p className="text-[10px] text-muted-foreground/70 italic">{st.evidence}</p>
                </div>
              ))}
            </div>
          </div>
        </AccordionItem>

        <AccordionItem
          title={
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-orange-400" />
              <span className="font-medium text-foreground text-sm">Recovery & Deload Guidelines</span>
            </div>
          }
        >
          <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
            <p>Recovery is when adaptation happens — training is the stimulus, rest is the response.</p>
            <ul className="space-y-1.5">
              <li>• <strong className="text-foreground">Sleep:</strong> 7–9 hours is a non-negotiable for optimal recovery and hormonal function</li>
              <li>• <strong className="text-foreground">Deload:</strong> Every 4–8 weeks, reduce volume by ~40% for 1 week. Do not skip — it prevents overtraining and often results in PRs afterwards</li>
              <li>• <strong className="text-foreground">Active recovery:</strong> Light walks, yoga, and swimming on rest days support blood flow without adding fatigue</li>
              <li>• <strong className="text-foreground">Soreness:</strong> DOMS (delayed onset muscle soreness) peaks 24–72h post-exercise. Training through mild soreness is fine; severe soreness may warrant extra recovery</li>
            </ul>
          </div>
        </AccordionItem>

        <AccordionItem
          title={
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-blue-400" />
              <span className="font-medium text-foreground text-sm">Beginner Notes — Where to Start</span>
            </div>
          }
        >
          <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
            <p>If you are new to structured training, the 2–3 day splits are the ideal starting point.</p>
            <ul className="space-y-1.5">
              <li>• Start with bodyweight or light weights — technique comes before load</li>
              <li>• Learn the 5 fundamental movement patterns: squat, hinge, push, pull, carry</li>
              <li>• Consistency matters more than perfection — 2 sessions/week done consistently beats 5 sessions/week done sporadically</li>
              <li>• Soreness does not equal effectiveness — effective training improves performance over time, not just creates pain</li>
              <li>• Consider working with a trainer for your first 4–8 weeks to establish form</li>
            </ul>
          </div>
        </AccordionItem>

        <AccordionItem
          title={
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-cyan-400" />
              <span className="font-medium text-foreground text-sm">Scientific Evidence Base</span>
            </div>
          }
          badge={<Badge variant="blue">{workoutCitations.length} studies</Badge>}
        >
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              The programming principles in this planner are grounded in peer-reviewed sports science literature,
              primarily from NSCA, ACSM, and published meta-analyses. Full citations are available on the{' '}
              <a href="/sources" className="text-primary hover:underline">Sources page</a>.
            </p>
            <div className="space-y-2">
              {workoutCitations.map((c, i) => (
                <div key={i} className="flex gap-2.5 bg-muted/30 rounded-lg p-2.5 border border-border/60 text-xs">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground leading-relaxed">{c.title}</p>
                    <p className="text-muted-foreground/80 mt-0.5 italic">{c.authors} · {c.journal} ({c.year})</p>
                    {c.studyDescription && (
                      <p className="text-[11px] text-blue-300/80 mt-1 leading-relaxed">{c.studyDescription}</p>
                    )}
                  </div>
                  {c.url && (
                    <a href={c.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 flex-shrink-0 mt-0.5">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </AccordionItem>
      </Accordion>
    </motion.div>
  )
}
