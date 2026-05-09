import { motion } from 'framer-motion'
import { Info, Flame, Beef, Wheat, Droplets, Clock, AlertTriangle, Coffee, Wine } from 'lucide-react'
import { Card } from '@/components/shared/Card'
import { Accordion, AccordionItem } from '@/components/shared/Accordion'
import { Badge } from '@/components/shared/Badge'

const sections = [
  {
    id: 'deficit',
    icon: <Flame className="h-4 w-4 text-orange-400" />,
    title: 'Calorie Deficit Strategy',
    badge: <Badge variant="orange">Core Principle</Badge>,
    content: (
      <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
        <p>
          A <strong className="text-foreground">moderate calorie deficit of 300–500 kcal/day</strong> below your Total Daily
          Energy Expenditure (TDEE) is the most commonly recommended range for fat loss while preserving muscle. Larger deficits
          may accelerate weight loss but increase the risk of muscle loss and fatigue.
        </p>
        <div className="bg-muted/50 rounded-lg p-3 border border-border space-y-2">
          <p className="text-foreground font-medium text-xs uppercase tracking-wider">Estimating your TDEE</p>
          <ul className="space-y-1 text-xs">
            <li>• Sedentary (desk job, no exercise): BMR × 1.2</li>
            <li>• Lightly active (1–3 workouts/week): BMR × 1.375</li>
            <li>• Moderately active (3–5 workouts/week): BMR × 1.55</li>
            <li>• Very active (6–7 workouts/week): BMR × 1.725</li>
          </ul>
        </div>
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
    ),
  },
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
          why="Protein is the highest-priority macro for body recomposition. It directly supports muscle protein synthesis, has the highest thermic effect of food (~25–30%), and promotes satiety. For a 180lb individual, this means 126–180g/day."
          sources="Chicken, turkey, eggs, Greek yogurt, cottage cheese, salmon, tuna, lean beef, whey protein"
        />
        <MacroCard
          label="Carbohydrates"
          range="Fill remaining calories after protein + fat"
          color="blue"
          why="Carbohydrates are not inherently harmful — they fuel training performance and support recovery. Prioritize complex, fiber-rich sources. Timing carbs around workouts may improve performance, though evidence on timing specifically is mixed."
          sources="Oats, rice, sweet potatoes, quinoa, fruits, vegetables"
        />
        <MacroCard
          label="Fat"
          range="0.3–0.5g per lb bodyweight minimum"
          color="yellow"
          why="Dietary fat is essential for hormone production (including testosterone), fat-soluble vitamin absorption, and satiety. Do not drop fat below ~20% of calories. Prioritize unsaturated sources."
          sources="Olive oil, avocado, nuts, fatty fish, eggs"
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
    id: 'sweeteners',
    icon: <Info className="h-4 w-4 text-purple-400" />,
    title: 'Sweetener Guidelines',
    badge: <Badge variant="purple">Mixed Evidence</Badge>,
    content: (
      <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
        <p>
          Non-caloric sweeteners (stevia, erythritol, sucralose, aspartame) are widely used in low-calorie products.
          Evidence on their safety and metabolic effects is evolving and sometimes conflicting.
        </p>
        <InfoBox>
          Current evidence generally supports non-caloric sweeteners as safe within normal consumption limits and useful
          for reducing total caloric intake. However, some research suggests possible gut microbiome effects — evidence
          is mixed and the clinical significance in healthy individuals is unclear. Personal experience indicates
          significant inter-individual variation in how people respond to different sweeteners.
        </InfoBox>
        <p>
          <strong className="text-foreground">Practical guidance:</strong> Replacing sugary beverages with artificially
          sweetened alternatives has strong evidence for reducing total caloric intake. If gut symptoms arise, experiment
          with different sweeteners or reduce intake. Whole food sources of sweetness (fruit) are always a sound choice.
        </p>
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
            <span><strong className="text-foreground">Cheat meal (not day):</strong> One relaxed meal per week allows social flexibility without significantly impacting weekly caloric balance. A single meal of 1000–1500 kcal above normal is unlikely to cause fat gain if weekly deficit is maintained.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">→</span>
            <span><strong className="text-foreground">Refeed days:</strong> 1–2 days at maintenance or slight surplus (especially with higher carbohydrates) may support training performance and psychologically signal "abundance" to the body. Evidence on hormonal benefits is mixed.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">→</span>
            <span><strong className="text-foreground">Track the day after:</strong> Reassurance matters — the scale may jump 1–3 lbs from water/glycogen, not fat. This is normal.</span>
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

export default function DietPlan() {
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
          <div>
            <h2 className="text-base font-semibold text-foreground mb-1">Evidence-Based Nutrition Guidelines</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The following guidelines are based on a review of current sports nutrition literature. Where evidence is
              strong, it is stated as such. Where evidence is mixed or evolving, that is clearly noted. This is not
              medical advice — consult a registered dietitian for personalized guidance.
            </p>
          </div>
        </div>
      </Card>

      {/* Sections */}
      <Accordion>
        {sections.map((section) => (
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
      </Accordion>
    </motion.div>
  )
}

function MacroCard({
  label, range, color, why, sources,
}: {
  label: string
  range: string
  color: 'green' | 'blue' | 'yellow'
  why: string
  sources: string
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
