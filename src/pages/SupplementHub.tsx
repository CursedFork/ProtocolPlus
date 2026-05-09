import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FlaskConical, AlertTriangle, BookOpen, ExternalLink,
  ChevronDown, ChevronUp, Info, Shield, Leaf, Clock,
  Layers, Zap, AlertCircle,
} from 'lucide-react'
import { Card } from '@/components/shared/Card'
import { SearchBar } from '@/components/shared/SearchBar'
import { Badge } from '@/components/shared/Badge'
import { Accordion, AccordionItem } from '@/components/shared/Accordion'
import {
  supplements, supplementCategories, evidenceColors, tierColors, recommendedStack,
} from '@/data/supplements'
import type { Supplement, EvidenceLevel } from '@/types/supplement'
import { cn } from '@/lib/utils'

const evidenceLabels: Record<EvidenceLevel, string> = {
  strong: 'Strong Evidence',
  moderate: 'Moderate Evidence',
  mixed: 'Mixed Evidence',
  weak: 'Weak Evidence',
  anecdotal: 'Anecdotal Only',
}

const warningBadge: Record<string, { label: string; classes: string } | undefined> = {
  caution: { label: '⚠ Use with Caution', classes: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30' },
  'bloodwork-required': { label: '🩸 Bloodwork Required', classes: 'text-red-400 bg-red-400/10 border-red-400/30' },
}

export default function SupplementHub() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeTier, setActiveTier] = useState<number | 'all'>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return supplements.filter((s) => {
      const matchSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.purpose.toLowerCase().includes(q) ||
        (s.tags ?? []).some((t) => t.includes(q)) ||
        (s.aliases ?? []).some((a) => a.toLowerCase().includes(q))
      const matchCat = activeCategory === 'all' || s.category === activeCategory
      const matchTier = activeTier === 'all' || s.tier === activeTier
      return matchSearch && matchCat && matchTier
    })
  }, [search, activeCategory, activeTier])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      {/* Medical disclaimer */}
      <Card className="border-red-500/30 bg-red-500/5">
        <div className="flex gap-3">
          <Shield className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-400 mb-1">Medical Disclaimer</p>
            <p className="text-xs text-red-300/80 leading-relaxed">
              This application is <strong>not medical advice</strong> and is for informational and educational purposes only.
              Supplement information is sourced from peer-reviewed literature as cited, but should not substitute professional
              medical consultation. Always consult a qualified healthcare provider before starting any supplement regimen.
              Individual responses vary. Research evolves — what is accurate today may be revised as new evidence emerges.
            </p>
          </div>
        </div>
      </Card>

      {/* Recommended stack */}
      <RecommendedStack />

      {/* Evidence legend */}
      <div className="flex flex-wrap gap-2">
        {(Object.entries(evidenceLabels) as [EvidenceLevel, string][]).map(([level, label]) => (
          <span key={level} className={cn('text-[10px] px-2 py-0.5 rounded-full border font-medium', evidenceColors[level])}>
            {label}
          </span>
        ))}
      </div>

      {/* Controls */}
      <div className="space-y-2">
        <SearchBar value={search} onChange={setSearch} placeholder="Search supplements, effects, aliases…" />
        <div className="flex flex-wrap gap-1.5">
          {supplementCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                'px-3 py-1 rounded-full text-xs font-medium border transition-colors',
                activeCategory === cat.id
                  ? 'bg-primary/15 text-primary border-primary/30'
                  : 'border-border text-muted-foreground hover:text-foreground hover:bg-muted',
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {([['all', 'All Tiers'], [1, 'Tier 1'], [2, 'Tier 2'], [3, 'Tier 3']] as const).map(([t, label]) => (
            <button
              key={String(t)}
              onClick={() => setActiveTier(t)}
              className={cn(
                'px-2.5 py-0.5 rounded-full text-xs border transition-colors',
                activeTier === t ? 'text-foreground bg-muted border-border' : 'text-muted-foreground border-transparent hover:text-foreground',
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Showing {filtered.length} of {supplements.length} supplements
      </p>

      {/* Supplement cards */}
      <div className="space-y-3">
        {filtered.map((supp) => (
          <SupplementCard
            key={supp.id}
            supplement={supp}
            expanded={expandedId === supp.id}
            onToggle={() => setExpandedId(expandedId === supp.id ? null : supp.id)}
          />
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <FlaskConical className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No supplements match your search</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

function RecommendedStack() {
  const [open, setOpen] = useState(false)
  const suppById = useMemo(() => Object.fromEntries(supplements.map((s) => [s.id, s])), [])

  return (
    <Card className="border-primary/20 gradient-green">
      <button onClick={() => setOpen((o) => !o)} className="w-full text-left">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            <span className="font-semibold text-primary text-sm">Evidence-Based Recommended Stack</span>
          </div>
          {open ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
        </div>
        <p className="text-xs text-muted-foreground mt-1">Goal: {recommendedStack.goal}</p>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-4 pt-4 border-t border-border">
              {([1, 2, 3] as const).map((tier) => (
                <div key={tier}>
                  <p className={cn('text-[10px] font-semibold uppercase tracking-wider mb-2 px-1', tierColors[tier].classes.split(' ')[0])}>
                    {tierColors[tier].label}
                  </p>
                  <div className="space-y-2">
                    {recommendedStack.tiers[tier].map((item) => {
                      const s = suppById[item.id]
                      return (
                        <div key={item.id} className="flex items-start gap-3 bg-muted/30 rounded-lg p-2.5 border border-border/50">
                          <FlaskConical className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-foreground">{s?.name ?? item.id}</p>
                            <p className="text-[11px] text-muted-foreground mt-0.5">
                              <strong className="text-foreground">{item.dose}</strong> — {item.reason}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-red-400 mb-2 px-1">
                  Address with Bloodwork First
                </p>
                <div className="space-y-1">
                  {recommendedStack.tiers.bloodworkFirst.map((item) => (
                    <div key={item.id} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <AlertCircle className="h-3 w-3 text-red-400 flex-shrink-0" />
                      <span><strong className="text-foreground">{suppById[item.id]?.name ?? item.id}:</strong> {item.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

function SupplementCard({
  supplement: s,
  expanded,
  onToggle,
}: {
  supplement: Supplement
  expanded: boolean
  onToggle: () => void
}) {
  const categoryColors: Record<string, string> = {
    performance: 'text-orange-400',
    protein: 'text-green-400',
    recovery: 'text-teal-400',
    health: 'text-blue-400',
    cognitive: 'text-purple-400',
    hormonal: 'text-yellow-400',
    sleep: 'text-indigo-400',
    vitamins: 'text-cyan-400',
    minerals: 'text-emerald-400',
    'fatty-acids': 'text-red-400',
    antioxidants: 'text-amber-400',
    'multi-nutrient': 'text-pink-400',
    adaptogen: 'text-lime-400',
  }

  const wb = s.warningLevel && s.warningLevel !== 'none' ? warningBadge[s.warningLevel] : undefined

  return (
    <Card className={cn('transition-all duration-200', expanded && 'border-primary/30 shadow-lg')}>
      {/* Summary row */}
      <button onClick={onToggle} className="w-full text-left">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
            <FlaskConical className={cn('h-4 w-4', categoryColors[s.category] ?? 'text-muted-foreground')} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2 flex-wrap">
              <h3 className="font-semibold text-foreground text-sm">{s.name}</h3>
              {s.aliases && s.aliases.length > 0 && (
                <span className="text-[10px] text-muted-foreground hidden sm:inline">({s.aliases.slice(0, 2).join(', ')})</span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">{s.purpose}</p>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              <span className={cn('text-[10px] px-2 py-0.5 rounded-full border font-medium', evidenceColors[s.evidenceLevel])}>
                {evidenceLabels[s.evidenceLevel]}
              </span>
              {s.tier && (
                <span className={cn('text-[10px] px-2 py-0.5 rounded-full border font-medium', tierColors[s.tier].classes)}>
                  Tier {s.tier}
                </span>
              )}
              {wb && (
                <span className={cn('text-[10px] px-2 py-0.5 rounded-full border font-medium', wb.classes)}>
                  {wb.label}
                </span>
              )}
            </div>
          </div>
          <div className="flex-shrink-0 mt-1">
            {expanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
          </div>
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-4 pt-4 border-t border-border"
        >
          <Accordion>

            {/* Evidence summary */}
            <AccordionItem defaultOpen title={
              <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                <BookOpen className="h-3.5 w-3.5 text-blue-400" /> Evidence Summary
              </span>
            }>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.evidenceSummary}</p>
              {s.tier && (
                <div className="mt-3 flex items-start gap-2 bg-muted/30 rounded-lg p-2.5">
                  <Zap className="h-3.5 w-3.5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground"><strong className="text-foreground">Why include:</strong> {s.tierReason}</p>
                </div>
              )}
            </AccordionItem>

            {/* Benefits & Risks */}
            <AccordionItem title={
              <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                <AlertTriangle className="h-3.5 w-3.5 text-yellow-400" /> Benefits & Risks
              </span>
            }>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-2">Claimed Benefits</h5>
                  <ul className="space-y-1">
                    {s.claimedBenefits.map((b, i) => (
                      <li key={i} className="flex gap-2 text-xs text-muted-foreground">
                        <span className="text-green-400 font-bold flex-shrink-0">+</span>{b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-2">Potential Risks</h5>
                  <ul className="space-y-1">
                    {s.potentialRisks.map((r, i) => (
                      <li key={i} className="flex gap-2 text-xs text-muted-foreground">
                        <span className="text-red-400 font-bold flex-shrink-0">!</span>{r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AccordionItem>

            {/* Dosage & Timing */}
            <AccordionItem title={
              <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                <Clock className="h-3.5 w-3.5 text-purple-400" /> Dosage, Timing & Cycling
              </span>
            }>
              <div className="space-y-3">
                {s.typicalDosageRange && (
                  <div className="bg-muted/40 rounded-lg p-3 border border-border">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Typical Dosage Range</p>
                    <p className="text-xs text-foreground leading-relaxed">{s.typicalDosageRange}</p>
                    <p className="text-[10px] text-yellow-400 mt-1.5">⚠ Individual needs vary — consult a healthcare provider</p>
                  </div>
                )}
                {s.timing && (
                  <div className="bg-muted/40 rounded-lg p-3 border border-border">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Timing</p>
                    <p className="text-xs text-foreground leading-relaxed">{s.timing}</p>
                  </div>
                )}
                {s.cyclingRecommendation && (
                  <div className="flex gap-2 bg-purple-500/5 border border-purple-500/20 rounded-lg p-3">
                    <Info className="h-3.5 w-3.5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] font-semibold text-purple-400 uppercase tracking-wider mb-0.5">Cycling</p>
                      <p className="text-xs text-muted-foreground">{s.cyclingRecommendation}</p>
                    </div>
                  </div>
                )}
              </div>
            </AccordionItem>

            {/* Onset timeline */}
            {s.onsetTimeline && (
              <AccordionItem title={
                <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                  <Clock className="h-3.5 w-3.5 text-cyan-400" /> Onset Timeline
                </span>
              }>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3">
                    <p className="text-[10px] font-semibold text-green-400 uppercase tracking-wider mb-1">When to expect benefits</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{s.onsetTimeline.benefits}</p>
                  </div>
                  <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-3">
                    <p className="text-[10px] font-semibold text-yellow-400 uppercase tracking-wider mb-1">When issues may appear</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{s.onsetTimeline.problems}</p>
                  </div>
                </div>
              </AccordionItem>
            )}

            {/* Form comparison */}
            {s.formComparison && s.formComparison.length > 0 && (
              <AccordionItem title={
                <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                  <Layers className="h-3.5 w-3.5 text-orange-400" /> Form Comparison
                </span>
              }>
                <div className="space-y-2">
                  {s.formComparison.map((form) => (
                    <div key={form.name} className={cn(
                      'rounded-lg p-3 border',
                      form.recommended ? 'border-green-500/30 bg-green-500/5' : 'border-border bg-muted/20',
                    )}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={cn('text-xs font-semibold', form.recommended ? 'text-green-400' : 'text-foreground')}>
                          {form.name}
                        </span>
                        {form.recommended && <Badge variant="green" className="text-[9px]">Recommended</Badge>}
                        {form.bioavailability && (
                          <span className="text-[10px] text-muted-foreground ml-auto">Bioavailability: {form.bioavailability}</span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{form.notes}</p>
                      {form.recommendedFor && (
                        <p className="text-[10px] text-muted-foreground mt-1">
                          <strong className="text-foreground">Best for:</strong> {form.recommendedFor.join(', ')}
                        </p>
                      )}
                      {form.gi_side_effects && (
                        <p className="text-[10px] text-yellow-400/80 mt-1">GI: {form.gi_side_effects}</p>
                      )}
                    </div>
                  ))}
                </div>
              </AccordionItem>
            )}

            {/* Ingredient breakdown (pre-workout) */}
            {s.ingredientBreakdown && s.ingredientBreakdown.length > 0 && (
              <AccordionItem title={
                <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                  <FlaskConical className="h-3.5 w-3.5 text-purple-400" /> Ingredient Breakdown
                </span>
              }>
                <div className="space-y-3">
                  {s.ingredientBreakdown.map((ing) => (
                    <div key={ing.ingredient} className="rounded-lg border border-border p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-semibold text-foreground">{ing.ingredient}</span>
                        <Badge variant={ing.evidence === 'Strong' ? 'green' : 'blue'} className="text-[9px]">
                          {ing.evidence}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground ml-auto">Dose: {ing.effectiveDose}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <p className="text-[10px] text-green-400 font-semibold mb-1">Benefits</p>
                          <ul className="space-y-0.5">
                            {ing.benefits.map((b, i) => (
                              <li key={i} className="text-[11px] text-muted-foreground flex gap-1">
                                <span className="text-green-400">+</span>{b}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-[10px] text-red-400 font-semibold mb-1">Risks</p>
                          <ul className="space-y-0.5">
                            {ing.risks.map((r, i) => (
                              <li key={i} className="text-[11px] text-muted-foreground flex gap-1">
                                <span className="text-red-400">!</span>{r}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionItem>
            )}

            {/* Synergies */}
            {s.synergies && s.synergies.length > 0 && (
              <AccordionItem title={
                <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                  <Zap className="h-3.5 w-3.5 text-yellow-400" /> Synergies
                </span>
              }>
                <div className="space-y-2">
                  {s.synergies.map((syn, i) => (
                    <div key={i} className="flex gap-2 bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-2.5">
                      <Zap className="h-3.5 w-3.5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-semibold text-yellow-400">{syn.partner}</span>
                        <p className="text-xs text-muted-foreground mt-0.5">{syn.mechanism}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionItem>
            )}

            {/* Natural food sources */}
            {s.naturalFoodSources && s.naturalFoodSources.length > 0 && (
              <AccordionItem title={
                <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                  <Leaf className="h-3.5 w-3.5 text-green-400" /> Natural Food Sources
                </span>
              }>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-2 text-muted-foreground font-medium">Food</th>
                        <th className="text-left py-2 px-2 text-muted-foreground font-medium">Amount per Serving</th>
                      </tr>
                    </thead>
                    <tbody>
                      {s.naturalFoodSources.map((src, i) => (
                        <tr key={i} className="border-b border-border/40 hover:bg-muted/20 transition-colors">
                          <td className="py-2 px-2 font-medium text-foreground">{src.food}</td>
                          <td className="py-2 px-2 text-muted-foreground">
                            {src.amount_per_serving}
                            {src.note && <span className="block text-[10px] text-yellow-400/80 mt-0.5">{src.note}</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </AccordionItem>
            )}

            {/* Interactions */}
            {s.interactions && s.interactions.length > 0 && (
              <AccordionItem title={
                <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                  <AlertTriangle className="h-3.5 w-3.5 text-yellow-400" /> Interactions & Notes
                </span>
              }>
                <ul className="space-y-1">
                  {s.interactions.map((interaction, i) => (
                    <li key={i} className="text-xs text-muted-foreground flex gap-2">
                      <span className="text-yellow-400">•</span>{interaction}
                    </li>
                  ))}
                </ul>
              </AccordionItem>
            )}

            {/* Research citations */}
            {s.citations.length > 0 && (
              <AccordionItem title={
                <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                  <BookOpen className="h-3.5 w-3.5 text-blue-400" /> Research Citations ({s.citations.length})
                </span>
              }>
                <div className="space-y-2">
                  {s.citations.map((cite, i) => (
                    <div key={i} className="bg-muted/30 rounded-lg p-2.5 border border-border/50">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p className="text-xs font-medium text-foreground leading-relaxed">{cite.title}</p>
                          {cite.studyDescription && (
                            <p className="text-[10px] text-blue-300/80 mt-0.5 italic">{cite.studyDescription}</p>
                          )}
                        </div>
                        {cite.url && (
                          <a
                            href={cite.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 flex-shrink-0"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-1.5">
                        {cite.journal && <span className="text-[10px] text-muted-foreground italic">{cite.journal}</span>}
                        {cite.year && <span className="text-[10px] text-muted-foreground">{cite.year}</span>}
                        <Badge variant="outline" className="text-[9px]">{cite.type.replace('-', ' ')}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionItem>
            )}

            {/* Govt references */}
            {s.govtReferences && s.govtReferences.length > 0 && (
              <div className="flex gap-2 bg-blue-500/5 border border-blue-500/20 rounded-lg p-3 mt-2">
                <ExternalLink className="h-3.5 w-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-semibold text-blue-400 uppercase tracking-wider mb-0.5">Government / Authoritative Resources</p>
                  <ul className="space-y-0.5">
                    {s.govtReferences.map((ref, i) => (
                      <li key={i} className="text-xs text-blue-300/80">{ref}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

          </Accordion>
        </motion.div>
      )}
    </Card>
  )
}
