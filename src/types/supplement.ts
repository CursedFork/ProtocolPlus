export type EvidenceLevel = 'strong' | 'moderate' | 'mixed' | 'weak' | 'anecdotal'

export type SupplementCategory =
  | 'protein'
  | 'performance'
  | 'recovery'
  | 'health'
  | 'cognitive'
  | 'hormonal'
  | 'sleep'
  | 'vitamins'
  | 'minerals'
  | 'fatty-acids'
  | 'antioxidants'
  | 'multi-nutrient'
  | 'adaptogen'
  | 'prescription'

export interface Citation {
  title: string
  authors?: string
  journal?: string
  year?: number
  url?: string
  type: 'peer-reviewed' | 'meta-analysis' | 'systematic-review' | 'review' | 'government' | 'clinical-trial' | 'rct' | 'epidemiological'
  studyDescription?: string
}

export interface FoodSource {
  food: string
  amount_per_serving: string
  note?: string
}

export interface OnsetTimeline {
  benefits: string
  problems: string
}

export interface FormVariant {
  name: string
  bioavailability?: string
  recommendedFor?: string[]
  notes: string
  recommended?: boolean
  gi_side_effects?: string
}

export interface IngredientBreakdown {
  ingredient: string
  evidence: string
  effectiveDose: string
  benefits: string[]
  risks: string[]
}

export interface Supplement {
  id: string
  name: string
  aliases?: string[]
  category: SupplementCategory
  purpose: string
  claimedBenefits: string[]
  potentialRisks: string[]
  evidenceLevel: EvidenceLevel
  evidenceSummary: string
  citations: Citation[]
  typicalDosageRange?: string
  timing?: string
  cyclingRecommendation?: string
  interactions?: string[]
  govtReferences?: string[]
  tags?: string[]
  // New expanded fields
  naturalFoodSources?: FoodSource[]
  onsetTimeline?: OnsetTimeline
  formComparison?: FormVariant[]
  synergies?: { partner: string; mechanism: string }[]
  ingredientBreakdown?: IngredientBreakdown[]
  tier?: 1 | 2 | 3
  tierReason?: string
  warningLevel?: 'none' | 'caution' | 'bloodwork-required'
  isPrescriptionDrug?: boolean
  prescriptionWarning?: string
  importantDosageWarning?: string
}
