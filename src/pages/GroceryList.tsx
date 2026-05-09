import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { RefreshCw, CheckSquare, Square, ShoppingCart, Info } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/shared/Card'
import { SearchBar } from '@/components/shared/SearchBar'
import { Badge } from '@/components/shared/Badge'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { groceryItems, groceryCategoryMeta } from '@/data/groceries'
import type { GroceryCategory } from '@/types/grocery'
import { cn } from '@/lib/utils'
import { getTodayString } from '@/lib/utils'

type Priority = 'all' | 'essential' | 'recommended' | 'optional'

const priorityBadge: Record<string, { variant: 'green' | 'blue' | 'outline'; label: string }> = {
  essential: { variant: 'green', label: 'Essential' },
  recommended: { variant: 'blue', label: 'Recommended' },
  optional: { variant: 'outline', label: 'Optional' },
}

export default function GroceryList() {
  const [checked, setChecked] = useLocalStorage<Record<string, boolean>>('grocery_checked', {})
  const [lastReset, setLastReset] = useLocalStorage<string>('grocery_last_reset', '')
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<GroceryCategory | 'all'>('all')
  const [priorityFilter, setPriorityFilter] = useState<Priority>('all')

  const filteredItems = useMemo(() => {
    const q = search.toLowerCase()
    return groceryItems.filter((item) => {
      const matchSearch = !q || item.name.toLowerCase().includes(q) || (item.notes ?? '').toLowerCase().includes(q)
      const matchCat = activeCategory === 'all' || item.category === activeCategory
      const matchPriority = priorityFilter === 'all' || item.priority === priorityFilter
      return matchSearch && matchCat && matchPriority
    })
  }, [search, activeCategory, priorityFilter])

  const byCategory = useMemo(() => {
    const cats = Object.keys(groceryCategoryMeta) as GroceryCategory[]
    return cats
      .map((cat) => ({
        cat,
        items: filteredItems.filter((i) => i.category === cat),
      }))
      .filter((g) => g.items.length > 0)
  }, [filteredItems])

  const totalChecked = Object.values(checked).filter(Boolean).length
  const totalItems = groceryItems.length

  function toggle(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  function handleReset() {
    if (!window.confirm('Reset all grocery checkboxes for a new week?')) return
    setChecked({})
    setLastReset(getTodayString())
  }

  function toggleCategory(cat: GroceryCategory) {
    const catItems = groceryItems.filter((i) => i.category === cat)
    const allChecked = catItems.every((i) => checked[i.id])
    const updates: Record<string, boolean> = {}
    catItems.forEach((i) => { updates[i.id] = !allChecked })
    setChecked((prev) => ({ ...prev, ...updates }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* Header controls */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <SearchBar value={search} onChange={setSearch} placeholder="Search groceries…" />
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-sm text-muted-foreground">{totalChecked}/{totalItems} checked</span>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Weekly Reset
            </button>
          </div>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          <button
            onClick={() => setActiveCategory('all')}
            className={cn(
              'px-3 py-1 rounded-full text-xs font-medium transition-colors border',
              activeCategory === 'all'
                ? 'bg-primary/15 text-primary border-primary/30'
                : 'border-border text-muted-foreground hover:text-foreground hover:bg-muted',
            )}
          >
            All
          </button>
          {(Object.entries(groceryCategoryMeta) as [GroceryCategory, typeof groceryCategoryMeta[GroceryCategory]][]).map(([cat, meta]) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? 'all' : cat)}
              className={cn(
                'px-3 py-1 rounded-full text-xs font-medium transition-colors border',
                activeCategory === cat
                  ? 'bg-primary/15 text-primary border-primary/30'
                  : 'border-border text-muted-foreground hover:text-foreground hover:bg-muted',
              )}
            >
              {meta.emoji} {meta.label}
            </button>
          ))}
        </div>

        {/* Priority filter */}
        <div className="flex gap-1.5 mt-2">
          {(['all', 'essential', 'recommended', 'optional'] as Priority[]).map((p) => (
            <button
              key={p}
              onClick={() => setPriorityFilter(p)}
              className={cn(
                'px-2.5 py-0.5 rounded-full text-xs transition-colors',
                priorityFilter === p ? 'text-foreground bg-muted border border-border' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {p === 'all' ? 'All priorities' : p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>

        {lastReset && (
          <p className="text-[11px] text-muted-foreground mt-2 flex items-center gap-1">
            <Info className="h-3 w-3" /> Last reset: {lastReset}
          </p>
        )}
      </Card>

      {byCategory.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <ShoppingCart className="h-10 w-10 mb-3 opacity-30" />
          <p className="text-sm">No items match your filters</p>
        </div>
      )}

      {/* Category sections */}
      <div className="space-y-4">
        {byCategory.map(({ cat, items }) => {
          const meta = groceryCategoryMeta[cat]
          const catCheckedCount = items.filter((i) => checked[i.id]).length
          const allCatChecked = catCheckedCount === items.length

          return (
            <Card key={cat}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{meta.emoji}</span>
                  <div>
                    <CardTitle className={meta.color}>{meta.label}</CardTitle>
                    <CardDescription>{catCheckedCount}/{items.length} items</CardDescription>
                  </div>
                </div>
                <button
                  onClick={() => toggleCategory(cat)}
                  className={cn(
                    'text-xs px-2.5 py-1 rounded-lg border transition-colors flex-shrink-0',
                    allCatChecked
                      ? 'border-green-500/30 text-green-400 bg-green-500/10 hover:bg-green-500/20'
                      : 'border-border text-muted-foreground hover:bg-muted',
                  )}
                >
                  {allCatChecked ? 'Uncheck all' : 'Check all'}
                </button>
              </CardHeader>
              <div className="space-y-1">
                {items.map((item) => {
                  const isChecked = !!checked[item.id]
                  const badgeMeta = item.priority ? priorityBadge[item.priority] : null

                  return (
                    <button
                      key={item.id}
                      onClick={() => toggle(item.id)}
                      className={cn(
                        'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border text-left transition-all duration-150',
                        isChecked
                          ? 'border-green-500/20 bg-green-500/5 opacity-70'
                          : 'border-transparent hover:border-border hover:bg-muted/30',
                      )}
                    >
                      {isChecked ? (
                        <CheckSquare className="h-4 w-4 text-green-400 flex-shrink-0" />
                      ) : (
                        <Square className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <span className={cn('text-sm', isChecked ? 'line-through text-muted-foreground' : 'text-foreground')}>
                          {item.name}
                        </span>
                        {item.notes && (
                          <p className="text-[11px] text-muted-foreground truncate">{item.notes}</p>
                        )}
                      </div>
                      {badgeMeta && (
                        <Badge variant={badgeMeta.variant} className="text-[10px] flex-shrink-0">
                          {badgeMeta.label}
                        </Badge>
                      )}
                    </button>
                  )
                })}
              </div>
            </Card>
          )
        })}
      </div>
    </motion.div>
  )
}
