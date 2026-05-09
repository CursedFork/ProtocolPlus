export type GroceryCategory = 'proteins' | 'fruits' | 'vegetables' | 'snacks' | 'drinks' | 'meal-substitutes' | 'pantry'

export interface GroceryItem {
  id: string
  name: string
  category: GroceryCategory
  notes?: string
  priority?: 'essential' | 'recommended' | 'optional'
}

export interface GroceryListState {
  checked: Record<string, boolean>
  lastReset: string
}
