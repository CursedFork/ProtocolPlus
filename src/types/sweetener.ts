export type SweetenerEvidenceStrength = 'strong' | 'moderate' | 'mixed' | 'emerging'
export type SweetenerWarningLevel = 'none' | 'caution' | 'significant-caution'

export interface SweetenerFinding {
  finding: string
  study_type: string
  source: string
  url?: string
  publication_year: number
  note?: string
}

export interface Sweetener {
  id: string
  name: string
  brand_names: string[]
  type: string
  sweetness_vs_sugar: string
  calories_per_gram: number
  fda_status: string
  fda_adi?: string
  overall_safety_rating: string
  evidence_strength: SweetenerEvidenceStrength
  safety_rank: number
  safety_rank_rationale: string
  summary: string
  key_findings: SweetenerFinding[]
  risks: string[]
  benefits: string[]
  gut_microbiome: string
  cardiovascular_concern: string
  cancer_concern: string
  who_to_avoid: string[]
  common_in: string[]
  label_transparency_note?: string
  warning_level: SweetenerWarningLevel
}
