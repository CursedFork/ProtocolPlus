import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, ExternalLink, Filter, Shield, ChevronDown, ChevronUp } from 'lucide-react'
import { Card } from '@/components/shared/Card'
import { SearchBar } from '@/components/shared/SearchBar'
import { Badge } from '@/components/shared/Badge'
import { supplements } from '@/data/supplements'
import type { Citation } from '@/types/supplement'
import { cn } from '@/lib/utils'

const citationTypeColors: Record<string, string> = {
  'meta-analysis': 'text-green-400 bg-green-400/10 border-green-400/30',
  'systematic-review': 'text-blue-400 bg-blue-400/10 border-blue-400/30',
  rct: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
  'clinical-trial': 'text-purple-400 bg-purple-400/10 border-purple-400/30',
  review: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  government: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30',
  'peer-reviewed': 'text-orange-400 bg-orange-400/10 border-orange-400/30',
  epidemiological: 'text-pink-400 bg-pink-400/10 border-pink-400/30',
}

const citationTypeLabels: Record<string, string> = {
  'meta-analysis': 'Meta-Analysis',
  'systematic-review': 'Systematic Review',
  rct: 'RCT',
  'clinical-trial': 'Clinical Trial',
  review: 'Review',
  government: 'Government / Authoritative',
  'peer-reviewed': 'Peer-Reviewed Study',
  epidemiological: 'Epidemiological Study',
}

const evidenceHierarchy = [
  { rank: 1, type: 'Meta-analyses & systematic reviews of RCTs', label: 'Highest quality evidence — synthesizes multiple studies', color: 'text-green-400' },
  { rank: 2, type: 'Randomized Controlled Trials (RCTs)', label: 'Gold standard for individual studies — controlled conditions', color: 'text-blue-400' },
  { rank: 3, type: 'Prospective cohort studies', label: 'Follows subjects over time — good for long-term outcomes', color: 'text-purple-400' },
  { rank: 4, type: 'Narrative reviews', label: 'Expert summaries — useful overview, not primary research', color: 'text-yellow-400' },
  { rank: 5, type: 'Government & authoritative body guidance', label: 'NIH, FDA, WHO — synthesize evidence for policy/guidelines', color: 'text-cyan-400' },
  { rank: 6, type: 'Observational / epidemiological studies', label: 'Shows associations, not necessarily causation', color: 'text-orange-400' },
]

const authoritiveSources = [
  { name: 'NIH Office of Dietary Supplements (ODS)', url: 'https://ods.od.nih.gov', note: 'Peer-reviewed fact sheets for individual nutrients and supplements' },
  { name: 'PubMed / MEDLINE', url: 'https://pubmed.ncbi.nlm.nih.gov', note: 'US National Library of Medicine — primary research database' },
  { name: 'PubMed Central (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov', note: 'Free full-text archive of biomedical and life sciences literature' },
  { name: 'Cochrane Library', url: 'https://www.cochranelibrary.com', note: 'Gold standard for systematic reviews of evidence' },
  { name: 'FDA — Dietary Supplements', url: 'https://www.fda.gov/food/dietary-supplements', note: 'US regulatory guidance, safety alerts, GRAS determinations' },
  { name: 'World Health Organization (WHO)', url: 'https://www.who.int', note: 'Global health data and epidemiology' },
  { name: 'International Society of Sports Nutrition (ISSN)', url: 'https://jissn.biomedcentral.com', note: 'Position stands on sports nutrition supplements' },
  { name: 'Mayo Clinic — Supplements', url: 'https://www.mayoclinic.org/drugs-supplements', note: 'Clinical summaries of supplement safety and interactions' },
]

interface FlatCitation extends Citation {
  supplementName: string
  supplementId: string
}

type FilterType = 'all' | Citation['type']

export default function Sources() {
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState<FilterType>('all')
  const [expandedSupp, setExpandedSupp] = useState<string | null>(null)

  const allCitations: FlatCitation[] = useMemo(() =>
    supplements.flatMap((s) =>
      s.citations.map((c) => ({ ...c, supplementName: s.name, supplementId: s.id }))
    ),
    [],
  )

  const citationTypes = useMemo(() => {
    const types = [...new Set(allCitations.map((c) => c.type))]
    return types
  }, [allCitations])

  const filteredCitations = useMemo(() => {
    const q = search.toLowerCase()
    return allCitations.filter((c) => {
      const matchSearch =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.supplementName.toLowerCase().includes(q) ||
        (c.journal ?? '').toLowerCase().includes(q) ||
        (c.studyDescription ?? '').toLowerCase().includes(q)
      const matchType = filterType === 'all' || c.type === filterType
      return matchSearch && matchType
    })
  }, [allCitations, search, filterType])

  const bySupplementGrouped = useMemo(() => {
    const grouped: Record<string, FlatCitation[]> = {}
    filteredCitations.forEach((c) => {
      if (!grouped[c.supplementId]) grouped[c.supplementId] = []
      grouped[c.supplementId].push(c)
    })
    return grouped
  }, [filteredCitations])

  const totalStudies = allCitations.length
  const metaAnalyses = allCitations.filter((c) => c.type === 'meta-analysis' || c.type === 'systematic-review').length
  const govtSources = allCitations.filter((c) => c.type === 'government').length
  const rcts = allCitations.filter((c) => c.type === 'rct' || c.type === 'clinical-trial').length

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <Card className="border-blue-500/20 bg-blue-500/5">
        <div className="flex gap-3">
          <BookOpen className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <h2 className="text-base font-semibold text-foreground mb-1">Sources & Citations</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              All supplement claims in Protocol+ are sourced from peer-reviewed literature, systematic reviews, or
              government/authoritative body fact sheets. This page provides full traceability for every claim made
              in the Supplement Hub.
            </p>
          </div>
        </div>
      </Card>

      {/* Disclaimer */}
      <Card className="border-red-500/20 bg-red-500/5">
        <div className="flex gap-2.5">
          <Shield className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-red-300/80 leading-relaxed">
            Citations are provided for informational and educational purposes only. Protocol+ is not a medical
            publication and this content does not constitute medical advice. Evidence evolves — publication dates
            are noted. Consult a qualified healthcare provider for medical decisions.
          </p>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total citations', value: totalStudies, color: 'text-foreground' },
          { label: 'Meta-analyses / Sys. reviews', value: metaAnalyses, color: 'text-green-400' },
          { label: 'RCTs / Clinical trials', value: rcts, color: 'text-purple-400' },
          { label: 'Govt / Authoritative', value: govtSources, color: 'text-cyan-400' },
        ].map((s) => (
          <Card key={s.label} className="text-center">
            <p className={cn('text-2xl font-bold', s.color)}>{s.value}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Evidence hierarchy */}
      <Card>
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          Evidence Hierarchy (Highest to Lowest Quality)
        </h3>
        <div className="space-y-2">
          {evidenceHierarchy.map((level) => (
            <div key={level.rank} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-muted-foreground">
                {level.rank}
              </div>
              <div>
                <p className={cn('text-xs font-medium', level.color)}>{level.type}</p>
                <p className="text-[11px] text-muted-foreground">{level.label}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Filter & search */}
      <div className="space-y-2">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by supplement, journal, study type…" />
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setFilterType('all')}
            className={cn(
              'px-3 py-1 rounded-full text-xs font-medium border transition-colors',
              filterType === 'all' ? 'bg-primary/15 text-primary border-primary/30' : 'border-border text-muted-foreground hover:text-foreground hover:bg-muted',
            )}
          >
            All Types
          </button>
          {citationTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type as FilterType)}
              className={cn(
                'px-3 py-1 rounded-full text-xs font-medium border transition-colors',
                filterType === type
                  ? 'bg-primary/15 text-primary border-primary/30'
                  : 'border-border text-muted-foreground hover:text-foreground hover:bg-muted',
              )}
            >
              {citationTypeLabels[type] ?? type}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">{filteredCitations.length} of {totalStudies} citations shown</p>
      </div>

      {/* Citations by supplement */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Citations by Supplement</h3>
        {supplements
          .filter((s) => bySupplementGrouped[s.id] && bySupplementGrouped[s.id].length > 0)
          .map((supp) => {
            const cites = bySupplementGrouped[supp.id]
            const isOpen = expandedSupp === supp.id
            return (
              <Card key={supp.id}>
                <button
                  onClick={() => setExpandedSupp(isOpen ? null : supp.id)}
                  className="w-full text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-blue-400 flex-shrink-0" />
                      <span className="text-sm font-medium text-foreground">{supp.name}</span>
                      <Badge variant="blue" className="text-[9px]">{cites.length} citation{cites.length !== 1 ? 's' : ''}</Badge>
                    </div>
                    {isOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-4 space-y-3 pt-4 border-t border-border">
                    {cites.map((cite, i) => (
                      <CitationCard key={i} citation={cite} />
                    ))}
                  </div>
                )}
              </Card>
            )
          })}
      </div>

      {/* Full flat list */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">All Citations — Flat List</h3>
        {filteredCitations.map((cite, i) => (
          <CitationCard key={i} citation={cite} showSupplement />
        ))}
        {filteredCitations.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <BookOpen className="h-8 w-8 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No citations match your filter</p>
          </div>
        )}
      </div>

      {/* Authoritative sources */}
      <Card>
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <ExternalLink className="h-4 w-4 text-muted-foreground" />
          Authoritative Reference Sources
        </h3>
        <p className="text-xs text-muted-foreground mb-4">
          All supplement information in Protocol+ was cross-referenced against these high-authority sources. These are
          the primary databases and institutions from which citations are drawn.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {authoritiveSources.map((src) => (
            <a
              key={src.name}
              href={src.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col p-3 rounded-lg border border-border hover:border-blue-500/40 hover:bg-blue-500/5 transition-all duration-150 group"
            >
              <div className="flex items-center gap-2">
                <ExternalLink className="h-3.5 w-3.5 text-blue-400 group-hover:text-blue-300 flex-shrink-0" />
                <span className="text-xs font-medium text-foreground group-hover:text-blue-300 transition-colors">{src.name}</span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{src.note}</p>
            </a>
          ))}
        </div>
      </Card>

      {/* Methodology note */}
      <Card className="border-border">
        <h3 className="text-sm font-semibold text-foreground mb-2">Research Methodology Note</h3>
        <div className="space-y-2 text-xs text-muted-foreground leading-relaxed">
          <p>
            Protocol+ prioritizes meta-analyses and systematic reviews over individual studies, as they synthesize
            evidence across multiple trials and reduce the impact of outlier results. When meta-analyses are not
            available, RCTs are preferred over observational studies.
          </p>
          <p>
            All evidence quality claims (e.g., "Strong Evidence", "Moderate Evidence") reflect the volume, consistency,
            and quality of available research at time of writing, not absolute certainty. "Strong evidence" means
            multiple high-quality RCTs and/or meta-analyses converge on the same finding. "Mixed evidence" means
            studies conflict or the population studied is limited.
          </p>
          <p>
            Government sources (NIH ODS, FDA, WHO) are used for safety thresholds, RDA values, and epidemiological
            data — not as endorsements of supplementation.
          </p>
          <p className="text-yellow-400/80">
            ⚠ Research evolves. New studies may confirm, revise, or contradict findings cited here. Last data review:
            May 2026. Always verify with current literature before making clinical decisions.
          </p>
        </div>
      </Card>
    </motion.div>
  )
}

function CitationCard({ citation: c, showSupplement }: { citation: FlatCitation; showSupplement?: boolean }) {
  return (
    <div className="bg-muted/30 rounded-lg p-3 border border-border/60">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          {showSupplement && (
            <p className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">{c.supplementName}</p>
          )}
          <p className="text-xs font-medium text-foreground leading-relaxed">{c.title}</p>
          {c.studyDescription && (
            <p className="text-[10px] text-blue-300/80 mt-1 italic leading-relaxed">{c.studyDescription}</p>
          )}
        </div>
        {c.url && (
          <a
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 flex-shrink-0 mt-0.5"
            title="Open source"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        <span className={cn('text-[9px] px-1.5 py-0.5 rounded-full border font-medium', citationTypeColors[c.type] ?? 'text-muted-foreground border-border')}>
          {citationTypeLabels[c.type] ?? c.type}
        </span>
        {c.journal && <span className="text-[10px] text-muted-foreground italic truncate max-w-48">{c.journal}</span>}
        {c.year && <span className="text-[10px] text-muted-foreground">{c.year}</span>}
        {c.authors && <span className="text-[10px] text-muted-foreground">{c.authors}</span>}
      </div>
    </div>
  )
}
