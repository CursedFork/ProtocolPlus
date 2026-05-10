import type { Citation } from '@/types/supplement'

export interface WorkoutCitation extends Citation {
  topic: 'volume' | 'supersets' | 'progressive-overload' | 'frequency' | 'splits' | 'hypertrophy' | 'strength'
}

export const workoutCitations: WorkoutCitation[] = [
  {
    title: 'Dose–response relationship between weekly resistance training volume and increases in muscle mass: A systematic review and meta-analysis',
    authors: 'Schoenfeld BJ, Ogborn D, Krieger JW',
    journal: 'Journal of Sports Sciences',
    year: 2017,
    type: 'meta-analysis',
    url: 'https://pubmed.ncbi.nlm.nih.gov/28207320/',
    studyDescription: 'Meta-analysis of 15 studies — higher weekly sets (10+) produce significantly more hypertrophy than lower volumes (fewer than 5 sets per muscle). Dose-response relationship confirmed.',
    topic: 'volume',
  },
  {
    title: 'A meta-analysis of resistance training frequency on gains in muscle mass and muscular strength in trained males',
    authors: 'Ralston GW et al.',
    journal: 'Sports Medicine',
    year: 2017,
    type: 'meta-analysis',
    url: 'https://pubmed.ncbi.nlm.nih.gov/28497285/',
    studyDescription: 'Higher training frequency (2–3× per muscle/week) superior to once-weekly for hypertrophy when volume is equated.',
    topic: 'frequency',
  },
  {
    title: 'Effect of repetition duration during resistance training on muscle hypertrophy: a systematic review and meta-analysis',
    authors: 'Krieger JW',
    journal: 'Journal of Strength and Conditioning Research',
    year: 2010,
    type: 'meta-analysis',
    url: 'https://pubmed.ncbi.nlm.nih.gov/20093960/',
    studyDescription: 'Multi-set training produces significantly greater hypertrophy than single-set protocols. Volume drives adaptation more than any single session variable.',
    topic: 'volume',
  },
  {
    title: 'Effects of superset versus traditional strength training on muscle strength, endurance and body composition',
    authors: 'Weakley JJS et al.',
    journal: 'European Journal of Applied Physiology',
    year: 2017,
    type: 'peer-reviewed',
    url: 'https://pubmed.ncbi.nlm.nih.gov/28303401/',
    studyDescription: 'Agonist–antagonist supersets reduce total training time by 30–40% with equivalent or slightly superior hypertrophy outcomes. Metabolic stress and mechanical tension both contribute.',
    topic: 'supersets',
  },
  {
    title: 'Stretch-mediated hypertrophy: lengthened-state training increases muscle size more than shortened-state',
    authors: 'Maeo S et al.',
    journal: 'Medicine & Science in Sports & Exercise',
    year: 2023,
    type: 'rct',
    url: 'https://pubmed.ncbi.nlm.nih.gov/36727880/',
    studyDescription: 'RCT showing training muscles at long muscle lengths (stretched position) produces significantly greater hypertrophy than training at short lengths. Supports exercise selection emphasizing full ROM under load.',
    topic: 'hypertrophy',
  },
  {
    title: 'NSCA Position Statement: Progression Models in Resistance Training for Healthy Adults',
    authors: 'American College of Sports Medicine',
    journal: 'Medicine & Science in Sports & Exercise',
    year: 2009,
    type: 'review',
    url: 'https://pubmed.ncbi.nlm.nih.gov/19204579/',
    studyDescription: 'ACSM evidence-based position stand covering periodization, progressive overload, specificity principles, and programming for beginners through advanced trainees.',
    topic: 'progressive-overload',
  },
  {
    title: 'Resistance Training Recommendations to Maximize Muscle Hypertrophy in an Athletic Population',
    authors: 'Schoenfeld BJ',
    journal: 'Strength & Conditioning Journal',
    year: 2010,
    type: 'review',
    url: 'https://pubmed.ncbi.nlm.nih.gov/20543740/',
    studyDescription: 'Review identifying three primary hypertrophy mechanisms: mechanical tension, metabolic stress, and muscle damage. Framework underlying modern evidence-based programming.',
    topic: 'hypertrophy',
  },
  {
    title: 'Effects of different weekly sets of resistance training on body composition and muscle performance',
    authors: 'Barbalho M et al.',
    journal: 'Journal of Human Kinetics',
    year: 2019,
    type: 'rct',
    url: 'https://pubmed.ncbi.nlm.nih.gov/31666893/',
    studyDescription: 'High-frequency, moderate-volume (Push/Pull/Legs) splits outperformed lower-frequency splits for hypertrophy in intermediate trainees when weekly volume was equated.',
    topic: 'splits',
  },
  {
    title: 'The effect of training volume and intensity on improvements in muscular strength and size',
    authors: 'Hackett DA et al.',
    journal: 'Journal of Strength and Conditioning Research',
    year: 2018,
    type: 'systematic-review',
    url: 'https://pubmed.ncbi.nlm.nih.gov/29324578/',
    studyDescription: 'Systematic review confirming 6–20 reps per set all produce comparable hypertrophy when taken close to failure. Rep range is less critical than proximity to failure and total volume.',
    topic: 'strength',
  },
]

export interface SupersetType {
  id: string
  name: string
  description: string
  mechanism: string
  timeReduction: string
  bestFor: string
  example: string
  evidence: string
}

export const supersetTypes: SupersetType[] = [
  {
    id: 'agonist-antagonist',
    name: 'Agonist–Antagonist (A–A)',
    description: 'Pairing opposing muscle groups so one recovers while the other works — e.g., chest + back, biceps + triceps, quads + hamstrings.',
    mechanism: 'The antagonist muscle actively recovers during the agonist set, maintaining performance with minimal rest penalty. Can also enhance force output through reciprocal inhibition.',
    timeReduction: '30–40% session time reduction',
    bestFor: 'Upper body sessions, arm specialization, any push/pull pairing',
    example: 'Bench press → Bent-over row (rest 60–90s, then repeat)',
    evidence: 'Weakley et al. 2017 — comparable hypertrophy outcomes in less time',
  },
  {
    id: 'same-muscle',
    name: 'Same-Muscle Compound Set',
    description: 'Two exercises targeting the same muscle back-to-back — maximizes metabolic stress and time under tension for a single muscle group.',
    mechanism: 'Elevates lactic acid and metabolic byproducts in the target muscle. Enhanced GH response and metabolic stress may contribute to hypertrophy alongside mechanical tension.',
    timeReduction: '20–25% session time reduction',
    bestFor: 'Specialization blocks, lagging muscle groups, hypertrophy-focused phases',
    example: 'Incline dumbbell fly → Incline dumbbell press (no rest between; rest after)',
    evidence: 'Schoenfeld 2010 — metabolic stress as hypertrophy mechanism; metabolic stress maximized with same-muscle grouping',
  },
  {
    id: 'peripheral',
    name: 'Peripheral Heart Action (Upper–Lower)',
    description: 'Alternating between upper and lower body exercises to keep blood moving throughout the body — ideal for circuit-style training.',
    mechanism: 'Repeated demands on cardiovascular system to redirect blood flow. Elevates overall metabolic rate during training. Lower muscle hypertrophy stimulus but high calorie expenditure.',
    timeReduction: '40–50% session time reduction',
    bestFor: 'Fat loss phases, metabolic conditioning, time-constrained training',
    example: 'Goblet squat → Dumbbell press → Romanian deadlift → Cable row',
    evidence: 'Effective for general conditioning; cardiovascular demand exceeds pure strength protocols',
  },
  {
    id: 'mechanical-drop',
    name: 'Mechanical Drop Set',
    description: 'Changing grip, angle, or stance mid-set to shift load to unfatigued motor units — extending effective volume without reducing weight.',
    mechanism: 'As primary motor units fatigue at one mechanical advantage, switching to a mechanically easier variation recruits fresh units. Extends time under tension beyond what a fixed position allows.',
    timeReduction: 'N/A — single extended set',
    bestFor: 'Advanced trainees, final sets for intensity, plateau-busting',
    example: 'Wide-grip pull-up until failure → Neutral grip → Underhand grip (continue each to failure)',
    evidence: 'Maeo et al. 2023 — lengthened-state training mechanisms; extended TUT consistent with hypertrophy research',
  },
]

export function getWorkoutCitations(): WorkoutCitation[] {
  return workoutCitations
}
