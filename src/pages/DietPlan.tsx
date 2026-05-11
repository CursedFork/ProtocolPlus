import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info, Flame, Beef, Wheat, Droplets, Clock, AlertTriangle, Coffee, Wine, ChevronDown, ChevronUp, ExternalLink, AlertCircle, FlaskConical, DollarSign, TrendingDown } from 'lucide-react'
import { Card } from '@/components/shared/Card'
import { Accordion, AccordionItem } from '@/components/shared/Accordion'
import { Badge } from '@/components/shared/Badge'
import { sweeteners, sweetenerSafetyColors, evidenceStrengthColors } from '@/data/sweeteners'
import { calculateTargets, type UserStats } from '@/lib/stats'
import { cn } from '@/lib/utils'

// ── Helper components ────────────────────────────────────────────────────────

function MacroCard({
  label, range, color, why, sources, budgetSources, budgetMode,
}: {
  label: string
  range: string
  color: 'green' | 'blue' | 'yellow'
  why: string
  sources: string
  budgetSources?: string
  budgetMode?: boolean
}) {
  const colors = {
    green: 'border-green-500/20 bg-green-500/5',
    blue: 'border-blue-500/20 bg-blue-500/5',
    yellow: 'border-yellow-500/20 bg-yellow-500/5',
  }
  const textColors = {
    green: 'text-green-400',
    blue: 'text-blue-400',
    yellow: 'text-yellow-400',
  }
  return (
    <div className={`rounded-lg border p-3 ${colors[color]}`}>
      <div className="flex items-center justify-between mb-2">
        <span className={`font-semibold text-sm ${textColors[color]}`}>{label}</span>
        <Badge variant={color as 'green' | 'blue' | 'yellow'} className="text-[10px]">{range}</Badge>
      </div>
      <p className="text-xs text-muted-foreground mb-2">{why}</p>
      <p className="text-[11px] text-muted-foreground"><strong className="text-foreground">Good sources:</strong> {sources}</p>
      {budgetMode && budgetSources && (
        <div className="mt-2 flex gap-1.5 items-start rounded-md bg-green-500/10 border border-green-500/20 px-2.5 py-1.5">
          <DollarSign className="h-3 w-3 text-green-400 flex-shrink-0 mt-0.5" />
          <p className="text-[11px] text-green-300/90 leading-relaxed">
            <strong className="text-green-400">Budget picks:</strong> {budgetSources}
          </p>
        </div>
      )}
    </div>
  )
}

function InfoBox({ children, type = 'info' }: { children: React.ReactNode; type?: 'info' | 'warning' }) {
  return (
    <div className={`flex gap-2.5 rounded-lg p-3 border text-xs leading-relaxed ${
      type === 'warning'
        ? 'bg-yellow-500/5 border-yellow-500/20 text-yellow-300'
        : 'bg-blue-500/5 border-blue-500/20 text-blue-300'
    }`}>
      <Info className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
      <span>{children}</span>
    </div>
  )
}

// ── Personalized deficit content ─────────────────────────────────────────────

function DeficitContent({ stats }: { stats: UserStats | null }) {
  const targets = stats ? calculateTargets(stats) : null
  return (
    <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
      <p>
        A <strong className="text-foreground">moderate calorie deficit of 300–500 kcal/day</strong> below your Total Daily
        Energy Expenditure (TDEE) is the most commonly recommended range for fat loss while preserving muscle. Larger deficits
        may accelerate weight loss but increase the risk of muscle loss and fatigue.
      </p>

      {targets && stats ? (
        <div className="bg-primary/5 border border-primary/25 rounded-lg p-3 space-y-2.5">
          <p className="text-foreground font-medium text-xs uppercase tracking-wider flex items-center gap-1.5">
            <Flame className="h-3.5 w-3.5 text-primary" />
            Your personalized targets (from Dashboard stats)
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { label: 'BMR', value: `${targets.bmr} kcal`, note: 'At rest' },
              { label: 'TDEE', value: `${targets.tdee} kcal`, note: 'With activity' },
              { label: 'Calorie Target', value: `${targets.calorieTarget} kcal`, note: '~400 kcal deficit' },
              { label: 'Protein Target', value: `${targets.proteinTarget}g`, note: `${(stats.weightLbs * 0.85).toFixed(0)}g (~0.85g/lb)` },
            ].map(({ label, value, note }) => (
              <div key={label} className="bg-background/60 rounded-lg p-2 border border-border text-center">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
                <p className="text-base font-bold text-primary mt-0.5">{value}</p>
                <p className="text-[10px] text-muted-foreground">{note}</p>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground">
            Calculated using Mifflin-St Jeor BMR formula. Update your stats on the Dashboard to recalculate.
          </p>
        </div>
      ) : (
        <div className="bg-muted/50 rounded-lg p-3 border border-border space-y-2">
          <p className="text-foreground font-medium text-xs uppercase tracking-wider">Estimating your TDEE</p>
          <ul className="space-y-1 text-xs">
            <li>• Sedentary (desk job, no exercise): BMR × 1.2</li>
            <li>• Lightly active (1–3 workouts/week): BMR × 1.375</li>
            <li>• Moderately active (3–5 workouts/week): BMR × 1.55</li>
            <li>• Very active (6–7 workouts/week): BMR × 1.725</li>
          </ul>
          <p className="text-[11px] text-primary">
            → Set up your stats on the Dashboard to see personalized calorie and protein targets here.
          </p>
        </div>
      )}

      <InfoBox>
        Personal experience indicates that tracking calories even loosely (within ±100 kcal) significantly improves
        results compared to no tracking at all. Apps like Cronometer or MyFitnessPal can help. Accuracy matters more
        than perfection.
      </InfoBox>
      <p>
        Consider refeeds (1–2 days at maintenance calories) every 2–4 weeks during prolonged deficits. Some research
        suggests this may support leptin levels and psychological adherence, though evidence is mixed.
      </p>
    </div>
  )
}

// ── Sweetener section ────────────────────────────────────────────────────────

const warningLabels: Record<string, string> = {
  none: 'Generally Safe',
  caution: 'Use with Caution',
  'significant-caution': 'Significant Caution',
}

function SweetenerResearchSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const sorted = [...sweeteners].sort((a, b) => a.safety_rank - b.safety_rank)

  return (
    <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
      {/* WHO 2023 note */}
      <div className="flex gap-2.5 rounded-lg p-3 border border-orange-500/25 bg-orange-500/5 text-xs leading-relaxed">
        <AlertCircle className="h-3.5 w-3.5 flex-shrink-0 mt-0.5 text-orange-400" />
        <span className="text-orange-300">
          <strong>WHO 2023 Guideline:</strong> The World Health Organization advises against using non-sugar sweeteners
          for long-term weight management, citing insufficient evidence that they help weight control and potential
          long-term health effects. This does not mean sweeteners are unsafe — but relying on them as a weight loss
          tool has limited support. See{' '}
          <a href="https://www.who.int/news/item/15-05-2023-who-advises-not-to-use-non-sugar-sweeteners-for-weight-control" target="_blank" rel="noopener noreferrer" className="underline text-orange-200 hover:text-white">
            WHO 2023
          </a>.
        </span>
      </div>

      {/* Label transparency warning */}
      <div className="flex gap-2.5 rounded-lg p-3 border border-yellow-500/25 bg-yellow-500/5 text-xs leading-relaxed">
        <AlertTriangle className="h-3.5 w-3.5 flex-shrink-0 mt-0.5 text-yellow-400" />
        <span className="text-yellow-300">
          <strong>Label Alert:</strong> Many products marketed as "stevia" or "monk fruit" contain erythritol as the
          primary ingredient. Erythritol is the 2023 cardiovascular concern sweetener — always check the ingredients list,
          not just the front-of-package label.
        </span>
      </div>

      {/* Safety ranking overview */}
      <div>
        <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <FlaskConical className="h-3.5 w-3.5 text-muted-foreground" />
          Safety Ranking — Best to Most Concerning
        </p>
        <div className="space-y-1.5">
          {sorted.map((sw) => {
            const colorClass = sweetenerSafetyColors[sw.warning_level]
            const evColor = evidenceStrengthColors[sw.evidence_strength]
            return (
              <div key={sw.id} className={cn('flex items-center gap-3 rounded-lg px-3 py-2 border text-xs', colorClass)}>
                <span className="font-bold text-sm w-5 flex-shrink-0">{sw.safety_rank}</span>
                <div className="flex-1 min-w-0">
                  <span className="font-medium">{sw.name}</span>
                  <span className="text-[10px] text-muted-foreground ml-2">{sw.type}</span>
                </div>
                <span className={cn('text-[10px] font-medium hidden sm:block', evColor)}>
                  {sw.evidence_strength} evidence
                </span>
                <span className="text-[10px] font-medium flex-shrink-0">{warningLabels[sw.warning_level]}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Expandable individual cards */}
      <p className="text-xs font-semibold text-foreground uppercase tracking-wider mt-2">Detailed Profiles</p>
      <div className="space-y-2">
        {sorted.map((sw) => {
          const isOpen = expandedId === sw.id
          const colorClass = sweetenerSafetyColors[sw.warning_level]
          return (
            <div key={sw.id} className="border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedId(isOpen ? null : sw.id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-muted/30 transition-colors"
              >
                <span className={cn('text-[10px] font-bold px-1.5 py-0.5 rounded border', colorClass)}>
                  #{sw.safety_rank}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{sw.name}</p>
                  <p className="text-[10px] text-muted-foreground truncate">{sw.brand_names.slice(0, 3).join(', ')}</p>
                </div>
                <span className={cn('text-[10px] font-medium flex-shrink-0 mr-2', colorClass.split(' ')[0])}>
                  {warningLabels[sw.warning_level]}
                </span>
                {isOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0" /> : <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />}
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-3 pb-3 pt-1 border-t border-border space-y-3">
                      <p className="text-xs text-muted-foreground leading-relaxed">{sw.summary}</p>

                      {/* Quick facts */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {[
                          { label: 'Sweetness', value: sw.sweetness_vs_sugar },
                          { label: 'Calories/g', value: `${sw.calories_per_gram} kcal` },
                          { label: 'FDA Status', value: sw.fda_status.split('—')[0].trim() },
                        ].map(({ label, value }) => (
                          <div key={label} className="bg-muted/40 rounded p-2 border border-border">
                            <p className="text-[10px] text-muted-foreground">{label}</p>
                            <p className="text-xs font-medium text-foreground mt-0.5">{value}</p>
                          </div>
                        ))}
                      </div>

                      {/* Key findings */}
                      {sw.key_findings.length > 0 && (
                        <div>
                          <p className="text-[10px] font-semibold text-foreground uppercase tracking-wider mb-1.5">Key Findings</p>
                          <div className="space-y-1.5">
                            {sw.key_findings.map((f, i) => (
                              <div key={i} className="flex gap-2 text-xs bg-muted/30 rounded p-2 border border-border/60">
                                <span className="text-primary font-bold flex-shrink-0">→</span>
                                <div>
                                  <p className="text-muted-foreground leading-relaxed">{f.finding}</p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[10px] text-muted-foreground/60 italic">{f.study_type} • {f.source} ({f.publication_year})</span>
                                    {f.url && (
                                      <a href={f.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                                        <ExternalLink className="h-3 w-3" />
                                      </a>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Risks + benefits two column */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <p className="text-[10px] font-semibold text-red-400 uppercase tracking-wider mb-1.5">Risks / Concerns</p>
                          <ul className="space-y-1">
                            {sw.risks.map((r, i) => (
                              <li key={i} className="flex gap-1.5 text-xs text-muted-foreground">
                                <span className="text-red-400 flex-shrink-0">•</span> {r}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold text-green-400 uppercase tracking-wider mb-1.5">Benefits</p>
                          <ul className="space-y-1">
                            {sw.benefits.map((b, i) => (
                              <li key={i} className="flex gap-1.5 text-xs text-muted-foreground">
                                <span className="text-green-400 flex-shrink-0">•</span> {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Gut + cardiovascular concerns */}
                      {(sw.gut_microbiome || sw.cardiovascular_concern) && (
                        <div className="space-y-1.5 bg-muted/20 rounded-lg p-2.5 border border-border">
                          {sw.gut_microbiome && (
                            <p className="text-[11px] text-muted-foreground"><strong className="text-foreground">Gut microbiome:</strong> {sw.gut_microbiome}</p>
                          )}
                          {sw.cardiovascular_concern && sw.cardiovascular_concern !== 'None identified' && (
                            <p className="text-[11px] text-yellow-300"><strong className="text-yellow-400">Cardiovascular:</strong> {sw.cardiovascular_concern}</p>
                          )}
                        </div>
                      )}

                      {/* Who to avoid */}
                      {sw.who_to_avoid.length > 0 && (
                        <div className="flex gap-2 bg-orange-500/5 border border-orange-500/20 rounded-lg p-2.5">
                          <AlertTriangle className="h-3.5 w-3.5 text-orange-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-[10px] font-semibold text-orange-400 mb-1">Who should avoid or limit</p>
                            <ul className="space-y-0.5">
                              {sw.who_to_avoid.map((w, i) => (
                                <li key={i} className="text-[11px] text-muted-foreground">• {w}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {sw.label_transparency_note && (
                        <p className="text-[11px] text-yellow-300/80 italic">{sw.label_transparency_note}</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      <p className="text-[11px] text-muted-foreground">
        Full citations for all sweetener research findings are available on the{' '}
        <a href="/sources" className="text-primary hover:underline">Sources page</a>.
      </p>
    </div>
  )
}

// ── Budget-Friendly Nutrition Guide ──────────────────────────────────────────

const PROTEIN_COST_TABLE = [
  { food: 'Lentils (dry)', proteinPer100g: 25, costPerG: 0.03, notes: 'Also high in iron, folate, fiber' },
  { food: 'Black beans (canned)', proteinPer100g: 8, costPerG: 0.04, notes: 'Complete when paired with rice' },
  { food: 'Eggs (large)', proteinPer100g: 13, costPerG: 0.04, notes: 'Complete protein + healthy fats, B12, choline' },
  { food: 'Canned sardines', proteinPer100g: 25, costPerG: 0.05, notes: 'Best omega-3 value; calcium from bones' },
  { food: 'Canned tuna (in water)', proteinPer100g: 26, costPerG: 0.05, notes: 'Limit to 2–3 cans/week (mercury)' },
  { food: 'Chicken thighs (bone-in)', proteinPer100g: 17, costPerG: 0.06, notes: 'More calorie-dense than breast; more flavorful' },
  { food: 'Cottage cheese (store brand)', proteinPer100g: 11, costPerG: 0.06, notes: 'High casein content — good before bed' },
  { food: 'Peanut butter', proteinPer100g: 25, costPerG: 0.08, notes: 'Also provides healthy fats; calorie-dense' },
  { food: 'Whey protein powder', proteinPer100g: 80, costPerG: 0.09, notes: 'Efficient; best value in bulk (5 lb bags)' },
  { food: 'Greek yogurt (store brand)', proteinPer100g: 10, costPerG: 0.09, notes: 'Probiotics; great base for meals' },
  { food: 'Frozen chicken breast', proteinPer100g: 23, costPerG: 0.11, notes: 'Best bought in bulk bags' },
  { food: 'Canned mackerel', proteinPer100g: 19, costPerG: 0.06, notes: 'Highest omega-3 of canned fish; underrated' },
  { food: 'Fresh salmon (fillet)', proteinPer100g: 20, costPerG: 0.35, notes: 'Premium option — save for occasional use' },
  { food: 'Sirloin steak', proteinPer100g: 26, costPerG: 0.45, notes: 'High quality protein; budget-breaking at scale' },
]

const WEEKLY_BLUEPRINT = [
  { item: '5 dozen eggs', qty: '60 eggs', cost: '$9–11', protein: '~360g', notes: 'Backbone of the budget plan' },
  { item: 'Chicken thighs (bone-in)', qty: '3 lbs', cost: '$5–7', protein: '~240g', notes: 'Batch cook; use in multiple meals' },
  { item: 'Canned tuna (in water)', qty: '4 cans (5oz)', cost: '$4–6', protein: '~100g', notes: 'Quick high-protein meals' },
  { item: 'Lentils (dry, red or green)', qty: '1 lb bag', cost: '$2', protein: '~175g cooked', notes: 'Soups, curries, side dishes' },
  { item: 'Rolled oats (large container)', qty: '42oz', cost: '$4–5', protein: '~50g', notes: 'Breakfast base; fiber + complex carbs' },
  { item: 'Brown or white rice (dry)', qty: '5 lb bag', cost: '$4–6', protein: '~30g', notes: 'Staple carb source for every meal' },
  { item: 'Russet potatoes', qty: '5 lb bag', cost: '$3–5', protein: '~20g', notes: 'Highly satiating per calorie; micronutrient-rich' },
  { item: 'Frozen mixed vegetables', qty: '3 × 12oz bags', cost: '$4–6', protein: '~15g', notes: 'Nutritionally equivalent to fresh; no waste' },
  { item: 'Peanut butter (store brand)', qty: '1 × 16oz jar', cost: '$3–4', protein: '~75g', notes: 'Calorie-dense healthy fat + protein snack' },
  { item: 'Bananas', qty: '1 bunch (~7)', cost: '$1.50', protein: '~8g', notes: 'Best pre-workout carb dollar-for-dollar' },
  { item: 'Cottage cheese (32oz, store brand)', qty: '32oz', cost: '$3–5', protein: '~100g', notes: 'High casein; excellent before bed' },
  { item: 'Olive oil (store brand)', qty: '16oz bottle', cost: '$4–6', protein: '0g', notes: 'Essential fat; cooking and dressing' },
]

const RESEARCH_NOTES = [
  {
    claim: 'Frozen vegetables are nutritionally equivalent to fresh',
    detail: 'Flash-freezing occurs within hours of harvest, locking in vitamins and minerals at peak ripeness. Studies (Bouzari et al., 2015, Journal of Agricultural and Food Chemistry) found no significant difference in vitamin C, B vitamins, and minerals between frozen and fresh produce. In some cases, frozen outperforms "fresh" produce that has been in transit for days.',
    verdict: '✓ Buy frozen without guilt',
  },
  {
    claim: 'Eggs are among the most nutrient-dense foods per dollar',
    detail: 'Whole eggs provide all 9 essential amino acids, choline (critical for liver and brain function), vitamin D, B12, and lutein/zeaxanthin. A 2020 review in Nutrients confirmed that regular egg consumption does not raise cardiovascular risk in healthy individuals. At ~$0.15/egg with 6g of complete protein, the protein quality (PDCAAS of 1.0) matches whey.',
    verdict: '✓ A cornerstone of any budget protein plan',
  },
  {
    claim: 'Legumes provide research-backed cardiovascular and protein benefits',
    detail: 'A 2009 meta-analysis in the American Journal of Clinical Nutrition (Bazzano et al.) found legume consumption associated with significantly reduced cardiovascular risk. Lentils and black beans provide complete amino acid profiles when eaten with grains (rice + beans = all 9 EAAs). High fiber content also supports the gut microbiome and satiety.',
    verdict: '✓ Best cost-per-gram-protein source overall',
  },
  {
    claim: 'Canned fatty fish delivers omega-3s at a fraction of fresh fish cost',
    detail: 'Canned sardines and mackerel provide EPA+DHA omega-3s comparable to fresh salmon. A 2012 systematic review (Mozaffarian & Rimm) confirmed EPA+DHA consumption reduces cardiovascular mortality. Sardines also provide calcium from edible bones. At ~$1.25/can vs $8–12/lb for salmon, the value is significant.',
    verdict: '✓ 2–3 cans/week covers your omega-3 needs',
  },
  {
    claim: 'Store-brand staples are nutritionally identical to name brands',
    detail: 'FDA regulations require store-brand products to meet the same nutritional standards as name brands for items like oats, rice, canned beans, frozen vegetables, and milk. A 2022 Consumer Reports analysis confirmed no meaningful nutritional differences in staple grocery items. The markup on name brands is marketing, not nutrition.',
    verdict: '✓ Always buy store brand for staples',
  },
  {
    claim: 'Peanut butter is an efficient combined protein + fat source',
    detail: 'Natural peanut butter (ingredient: peanuts, salt) provides monounsaturated fats, resveratrol, vitamin E, niacin (B3), magnesium, and protein. A 2018 study in the British Journal of Nutrition found regular nut/peanut butter consumption associated with reduced cardiovascular risk. At ~$0.20/serving, it is one of the best calorie-dense budget foods for athletes.',
    verdict: '✓ Two tablespoons with any meal adds value',
  },
]

function BudgetNutritionSection() {
  const totalCostLow = WEEKLY_BLUEPRINT.reduce((s, item) => {
    const match = item.cost.match(/\$(\d+)/)
    return s + (match ? parseInt(match[1]) : 0)
  }, 0)
  const totalCostHigh = WEEKLY_BLUEPRINT.reduce((s, item) => {
    const match = item.cost.match(/–(\d+)/)
    return s + (match ? parseInt(match[1]) : totalCostLow)
  }, 0)

  return (
    <div className="space-y-5 text-sm text-muted-foreground leading-relaxed">
      {/* Intro */}
      <p>
        Eating for performance doesn't require a premium grocery budget. The most evidence-backed foods for muscle
        building, recovery, and general health — eggs, lentils, oats, canned fish, frozen vegetables — are also among
        the cheapest. The following guide prioritizes{' '}
        <strong className="text-foreground">cost per gram of protein, nutrient density, and research support</strong>.
      </p>

      {/* Cost-per-gram table */}
      <div>
        <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <DollarSign className="h-3.5 w-3.5 text-green-400" />
          Protein Cost Comparison
        </p>
        <div className="rounded-lg border border-border overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto] text-[10px] font-semibold text-muted-foreground uppercase tracking-wider bg-muted/40 px-3 py-2 gap-x-4 border-b border-border">
            <span>Food</span>
            <span className="text-right">$/g protein</span>
            <span className="hidden sm:block text-right">Note</span>
          </div>
          {[...PROTEIN_COST_TABLE].sort((a, b) => a.costPerG - b.costPerG).map((row) => {
            const isGood = row.costPerG <= 0.08
            return (
              <div
                key={row.food}
                className={cn(
                  'grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_auto] px-3 py-2 gap-x-4 border-b border-border/50 last:border-0 text-xs',
                  isGood ? 'bg-green-500/5' : 'bg-transparent',
                )}
              >
                <div className="flex items-center gap-2">
                  {isGood && <span className="text-green-400 text-[10px] font-bold flex-shrink-0">✓</span>}
                  <span className={cn('font-medium', isGood ? 'text-foreground' : 'text-muted-foreground')}>{row.food}</span>
                </div>
                <span className={cn('text-right font-mono font-semibold', isGood ? 'text-green-400' : 'text-muted-foreground')}>
                  ${row.costPerG.toFixed(2)}
                </span>
                <span className="hidden sm:block text-[10px] text-muted-foreground text-right">{row.notes}</span>
              </div>
            )
          })}
        </div>
        <p className="text-[10px] text-muted-foreground mt-1.5">
          ✓ = recommended budget picks (≤$0.08/g protein). Prices are US averages — varies by region and store.
        </p>
      </div>

      {/* Weekly grocery blueprint */}
      <div>
        <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <TrendingDown className="h-3.5 w-3.5 text-green-400" />
          Weekly Grocery Blueprint (~${totalCostLow}–${totalCostHigh}/week)
        </p>
        <p className="text-xs text-muted-foreground mb-3">
          This list covers roughly 1,900–2,400 kcal/day with 130–180g protein for a 160–200lb individual. Scale quantities to your calorie and protein targets.
        </p>
        <div className="space-y-1.5">
          {WEEKLY_BLUEPRINT.map((item) => (
            <div key={item.item} className="flex items-start gap-3 px-3 py-2.5 rounded-lg border border-border bg-muted/20 text-xs">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-foreground">{item.item}</span>
                  <span className="text-muted-foreground">{item.qty}</span>
                </div>
                <p className="text-muted-foreground mt-0.5">{item.notes}</p>
              </div>
              <div className="text-right flex-shrink-0 space-y-0.5">
                <p className="font-semibold text-green-400">{item.cost}</p>
                <p className="text-[10px] text-muted-foreground">{item.protein} protein</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Research notes */}
      <div>
        <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Research Notes</p>
        <div className="space-y-3">
          {RESEARCH_NOTES.map((note) => (
            <div key={note.claim} className="rounded-lg border border-border bg-muted/20 p-3 space-y-1.5">
              <p className="text-xs font-semibold text-foreground">{note.claim}</p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">{note.detail}</p>
              <p className="text-[11px] text-green-400 font-medium">{note.verdict}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Practical tips */}
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 space-y-2">
        <p className="text-xs font-semibold text-foreground uppercase tracking-wider">Practical Budget Tips</p>
        <ul className="space-y-1.5 text-[11px] text-muted-foreground">
          <li className="flex gap-2"><span className="text-primary font-bold flex-shrink-0">→</span><span><strong className="text-foreground">Buy in bulk:</strong> Rice, oats, lentils, and whey protein all drop ~30–50% per serving when bought in larger quantities. Costco and Sam's Club are ideal for eggs, frozen chicken, and oats.</span></li>
          <li className="flex gap-2"><span className="text-primary font-bold flex-shrink-0">→</span><span><strong className="text-foreground">Batch cook once a week:</strong> Prepare a large pot of rice, a tray of chicken thighs, and boil a dozen eggs. You'll have protein and carbs ready for every meal without cooking every day.</span></li>
          <li className="flex gap-2"><span className="text-primary font-bold flex-shrink-0">→</span><span><strong className="text-foreground">Frozen vegetables are not a compromise:</strong> Buy a variety of frozen spinach, broccoli, edamame, and mixed veg. They're cheaper, last longer, and are nutritionally equivalent to fresh.</span></li>
          <li className="flex gap-2"><span className="text-primary font-bold flex-shrink-0">→</span><span><strong className="text-foreground">Spices are the ROI on cheap food:</strong> A $15 spice investment (garlic powder, cumin, paprika, Italian seasoning, chili flakes) turns rice, eggs, and chicken into dozens of different meals.</span></li>
          <li className="flex gap-2"><span className="text-primary font-bold flex-shrink-0">→</span><span><strong className="text-foreground">Limit pre-packaged "healthy" foods:</strong> Protein bars, pre-made salads, and branded snacks mark up 200–400% over whole food equivalents with similar macros. Eat real food, not packaging.</span></li>
          <li className="flex gap-2"><span className="text-primary font-bold flex-shrink-0">→</span><span><strong className="text-foreground">Whey protein is cost-effective when food isn't enough:</strong> A 5 lb bag of whey (~$50–60) provides ~75 servings at 25g protein each — roughly $0.09/g, cheaper than most whole-food sources at scale. Use it to fill protein gaps, not replace meals.</span></li>
        </ul>
      </div>
    </div>
  )
}

// ── Main component ───────────────────────────────────────────────────────────

export default function DietPlan() {
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [budgetMode, setBudgetMode] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('user_stats')
      if (raw) setUserStats(JSON.parse(raw) as UserStats)
    } catch {}
  }, [])

  const staticSections = [
    {
      id: 'macros',
      icon: <Beef className="h-4 w-4 text-green-400" />,
      title: 'Macronutrient Philosophy',
      badge: <Badge variant="green">Evidence-Based</Badge>,
      content: (
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
          <MacroCard
            label="Protein"
            range="0.7–1g per lb bodyweight"
            color="green"
            why={`Protein is the highest-priority macro for body recomposition. It directly supports muscle protein synthesis, has the highest thermic effect of food (~25–30%), and promotes satiety.${userStats ? ` For you at ${userStats.weightLbs}lbs, this means ${Math.round(userStats.weightLbs * 0.7)}–${userStats.weightLbs}g/day.` : ' For a 180lb individual, this means 126–180g/day.'}`}
            sources="Chicken, turkey, eggs, Greek yogurt, cottage cheese, salmon, tuna, lean beef, whey protein"
            budgetSources="Eggs (~$0.15/egg, 6g protein), canned tuna (~$1/can, 25g protein), chicken thighs (~$1.50–2/lb), lentils (~$1–2/lb dry, 18g/cup), cottage cheese (store brand), canned sardines, black beans"
            budgetMode={budgetMode}
          />
          <MacroCard
            label="Carbohydrates"
            range="Fill remaining calories after protein + fat"
            color="blue"
            why="Carbohydrates are not inherently harmful — they fuel training performance and support recovery. Prioritize complex, fiber-rich sources. Timing carbs around workouts may improve performance, though evidence on timing specifically is mixed."
            sources="Oats, rice, sweet potatoes, quinoa, fruits, vegetables"
            budgetSources="Rolled oats (~$0.10/serving), white or brown rice (~$0.10/serving), russet or sweet potatoes (~$0.30–0.50 each), frozen vegetables (nutritionally equivalent to fresh), bananas (~$0.25 each), canned beans"
            budgetMode={budgetMode}
          />
          <MacroCard
            label="Fat"
            range="0.3–0.5g per lb bodyweight minimum"
            color="yellow"
            why="Dietary fat is essential for hormone production (including testosterone), fat-soluble vitamin absorption, and satiety. Do not drop fat below ~20% of calories. Prioritize unsaturated sources."
            sources="Olive oil, avocado, nuts, fatty fish, eggs"
            budgetSources="Eggs (fat + protein in one), peanut butter (~$0.20/serving, 16g fat + 7g protein), canned mackerel/sardines (omega-3s at ~$1.25/can vs $8+ for fresh salmon), sunflower seeds"
            budgetMode={budgetMode}
          />
          <InfoBox>
            Evidence consistently shows that <strong className="text-foreground">total caloric intake and protein adequacy</strong> matter
            more than the precise ratio of carbs-to-fat. Find a ratio that you can sustain and enjoy.
          </InfoBox>
        </div>
      ),
    },
    {
      id: 'timing',
      icon: <Clock className="h-4 w-4 text-blue-400" />,
      title: 'Meal Timing Strategy',
      badge: <Badge variant="blue">Moderate Evidence</Badge>,
      content: (
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            <strong className="text-foreground">Meal timing matters less than total daily intake</strong> — but there are some
            strategies with reasonable support:
          </p>
          <ul className="space-y-2">
            <li className="flex gap-2">
              <span className="text-primary font-bold">→</span>
              <span><strong className="text-foreground">Pre-workout:</strong> A meal or snack 60–90 min before training (protein + carbs) can support performance. Fasted training is also viable — personal preference dictates.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">→</span>
              <span><strong className="text-foreground">Post-workout:</strong> Consuming protein within ~2 hours post-exercise supports muscle protein synthesis. The anabolic window is real but wider than once believed (not just 30 min).</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">→</span>
              <span><strong className="text-foreground">Protein distribution:</strong> Spreading protein intake across 3–5 meals (20–40g per meal) may optimize muscle protein synthesis compared to front- or back-loading.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">→</span>
              <span><strong className="text-foreground">Before bed:</strong> Casein-rich foods (cottage cheese, Greek yogurt) may support overnight muscle repair — some evidence suggests this.</span>
            </li>
          </ul>
          <InfoBox>
            Intermittent fasting (16:8 or similar) can be an effective tool for some individuals to control total intake
            through a shorter eating window. Evidence suggests it is comparable to continuous restriction when protein is
            equated — not superior or inferior for most outcomes.
          </InfoBox>
        </div>
      ),
    },
    {
      id: 'portions',
      icon: <Wheat className="h-4 w-4 text-yellow-400" />,
      title: 'Portion Tracking & Control',
      badge: null,
      content: (
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            Precise tracking is optional but beneficial when starting out — even 2–4 weeks of careful tracking builds
            strong intuition for portion sizes.
          </p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { food: 'Chicken breast', portion: '~140–200g cooked' },
              { food: 'Cooked rice / oats', portion: '½–1 cup (measured dry)' },
              { food: 'Nuts', portion: '28g (small handful)' },
              { food: 'Peanut butter', portion: '2 tbsp ≈ 190 kcal' },
              { food: 'Olive oil', portion: '1 tbsp ≈ 120 kcal' },
              { food: 'Vegetables', portion: 'Fill half your plate' },
            ].map((item) => (
              <div key={item.food} className="bg-muted/40 rounded-lg p-2.5 border border-border">
                <p className="text-foreground font-medium text-xs">{item.food}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{item.portion}</p>
              </div>
            ))}
          </div>
          <InfoBox>
            Restaurant meals and social eating can derail tracking. A practical approach: estimate high on calories,
            prioritize protein, and get back on track the next meal — not the next day.
          </InfoBox>
        </div>
      ),
    },
    {
      id: 'fiber',
      icon: <Wheat className="h-4 w-4 text-green-400" />,
      title: 'Fiber Recommendations',
      badge: <Badge variant="green">Important</Badge>,
      content: (
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            Adequate fiber intake supports gut health, satiety, blood sugar regulation, and cardiovascular health.
            The general recommendation is <strong className="text-foreground">25–38g per day</strong> (lower for women, higher for men per most guidelines).
          </p>
          <p>
            High-fiber foods that fit a fitness-oriented diet: oats, beans/lentils, sweet potatoes, broccoli,
            berries, apples, quinoa, and leafy greens. Most people significantly undereat fiber.
          </p>
          <InfoBox type="warning">
            Increasing fiber too rapidly can cause significant digestive discomfort. Increase gradually over 1–2 weeks
            and ensure adequate hydration alongside fiber intake.
          </InfoBox>
        </div>
      ),
    },
    {
      id: 'hydration',
      icon: <Droplets className="h-4 w-4 text-blue-400" />,
      title: 'Hydration Guidelines',
      badge: null,
      content: (
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            Hydration affects cognitive performance, strength, endurance, and recovery. Even mild dehydration (1–2% body
            weight) can impair physical performance.
          </p>
          <ul className="space-y-1">
            <li>• General target: 3–4 liters/day for active individuals (varies by body size, climate, sweat rate)</li>
            <li>• Increase by ~500ml for every hour of moderate training</li>
            <li>• Check urine color: pale yellow = adequate, dark yellow = dehydrated</li>
            <li>• Electrolytes (sodium, potassium, magnesium) become important with heavy sweating</li>
            <li>• Plain water should be primary source — minimize caloric beverages</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'cheat',
      icon: <AlertTriangle className="h-4 w-4 text-yellow-400" />,
      title: 'Cheat Meals & Refeeds',
      badge: null,
      content: (
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            <strong className="text-foreground">Planned flexibility prevents binge eating</strong> and supports long-term
            adherence — which is the ultimate predictor of results.
          </p>
          <ul className="space-y-2">
            <li className="flex gap-2">
              <span className="text-primary">→</span>
              <span><strong className="text-foreground">Cheat meal (not day):</strong> One relaxed meal per week allows social flexibility without significantly impacting weekly caloric balance.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">→</span>
              <span><strong className="text-foreground">Refeed days:</strong> 1–2 days at maintenance or slight surplus (especially with higher carbohydrates) may support training performance. Evidence on hormonal benefits is mixed.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">→</span>
              <span><strong className="text-foreground">Track the day after:</strong> The scale may jump 1–3 lbs from water/glycogen, not fat. This is normal and temporary.</span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 'alcohol',
      icon: <Wine className="h-4 w-4 text-red-400" />,
      title: 'Alcohol & Caffeine Guidance',
      badge: <Badge variant="red">Important</Badge>,
      content: (
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
          <div>
            <h4 className="text-foreground font-medium mb-2 flex items-center gap-2"><Wine className="h-3.5 w-3.5" /> Alcohol</h4>
            <ul className="space-y-1.5">
              <li>• Alcohol provides 7 kcal/gram — nearly as energy-dense as fat, with zero nutritional value</li>
              <li>• Impairs muscle protein synthesis for up to 24 hours post-consumption at moderate-to-high doses</li>
              <li>• Disrupts sleep quality (even if it aids sleep onset) — sleep is critical for recovery</li>
              <li>• Lowers inhibitions, frequently leading to poor food choices</li>
              <li>• Practical strategy: limit to 1–2 drinks on special occasions; avoid on training nights if possible</li>
            </ul>
          </div>
          <div className="border-t border-border pt-3">
            <h4 className="text-foreground font-medium mb-2 flex items-center gap-2"><Coffee className="h-3.5 w-3.5" /> Caffeine</h4>
            <ul className="space-y-1.5">
              <li>• Effective performance enhancer — well-supported by evidence (see Supplement Hub for details)</li>
              <li>• Tolerance builds with daily use, reducing ergogenic benefit</li>
              <li>• Consume before noon to minimize sleep disruption (caffeine half-life ~5–6 hours)</li>
              <li>• Cycle usage: consider caffeine-free periods to restore sensitivity</li>
              <li>• Limit to 1–2 cups of coffee or pre-workout on training days — avoid stacking sources</li>
            </ul>
          </div>
        </div>
      ),
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Intro card */}
      <Card variant="glass" className="border-primary/20">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Info className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-1">
              <h2 className="text-base font-semibold text-foreground">Evidence-Based Nutrition Guidelines</h2>
              <button
                onClick={() => setBudgetMode((b) => !b)}
                className={cn(
                  'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all flex-shrink-0',
                  budgetMode
                    ? 'border-green-500/40 bg-green-500/10 text-green-400 shadow-sm shadow-green-500/10'
                    : 'border-border text-muted-foreground hover:border-muted-foreground/40 hover:text-foreground',
                )}
                title="Show budget-friendly food alternatives throughout the guide"
              >
                <DollarSign className="h-3.5 w-3.5" />
                {budgetMode ? 'Budget: ON' : 'Budget Mode'}
              </button>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The following guidelines are based on a review of current sports nutrition literature. Where evidence is
              strong, it is stated as such. Where evidence is mixed or evolving, that is clearly noted. This is not
              medical advice — consult a registered dietitian for personalized guidance.
            </p>
            {budgetMode && (
              <div className="mt-3 flex items-center gap-2 text-xs text-green-300/90 bg-green-500/8 border border-green-500/20 rounded-lg px-3 py-2">
                <TrendingDown className="h-3.5 w-3.5 text-green-400 flex-shrink-0" />
                <span>Budget mode active — food recommendations now show affordable alternatives with equivalent nutritional value. See the <strong className="text-green-400">Budget-Friendly Guide</strong> section below for a full breakdown.</span>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Sections */}
      <Accordion>
        {/* Deficit — dynamic with personalized stats */}
        <AccordionItem
          title={
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-orange-400" />
              <span className="font-medium text-foreground text-sm">Calorie Deficit Strategy</span>
            </div>
          }
          badge={
            <div className="flex items-center gap-1.5">
              {userStats && <Badge variant="green" className="text-[9px]">Personalized</Badge>}
              <Badge variant="orange">Core Principle</Badge>
            </div>
          }
        >
          <DeficitContent stats={userStats} />
        </AccordionItem>

        {/* Static sections */}
        {staticSections.map((section) => (
          <AccordionItem
            key={section.id}
            title={
              <div className="flex items-center gap-2">
                {section.icon}
                <span className="font-medium text-foreground text-sm">{section.title}</span>
              </div>
            }
            badge={section.badge}
          >
            {section.content}
          </AccordionItem>
        ))}

        {/* Budget-Friendly Nutrition Guide */}
        <AccordionItem
          title={
            <div className="flex items-center gap-2">
              <DollarSign className={cn('h-4 w-4', budgetMode ? 'text-green-400' : 'text-muted-foreground')} />
              <span className="font-medium text-foreground text-sm">Budget-Friendly Nutrition Guide</span>
            </div>
          }
          badge={
            <div className="flex items-center gap-1.5">
              {budgetMode && <Badge variant="green" className="text-[9px]">Active</Badge>}
              <Badge variant="green">~$50–65/week</Badge>
            </div>
          }
        >
          <BudgetNutritionSection />
        </AccordionItem>

        {/* Sweetener section — full research component */}
        <AccordionItem
          title={
            <div className="flex items-center gap-2">
              <FlaskConical className="h-4 w-4 text-purple-400" />
              <span className="font-medium text-foreground text-sm">Sweetener Safety Guide</span>
            </div>
          }
          badge={<Badge variant="purple">8 Sweeteners Ranked</Badge>}
        >
          <SweetenerResearchSection />
        </AccordionItem>
      </Accordion>
    </motion.div>
  )
}
