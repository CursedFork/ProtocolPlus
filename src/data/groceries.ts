import type { GroceryItem } from '@/types/grocery'

export const groceryItems: GroceryItem[] = [
  // Proteins
  { id: 'p1', name: 'Chicken breast (boneless, skinless)', category: 'proteins', priority: 'essential', notes: 'Bulk buy & freeze' },
  { id: 'p2', name: 'Ground turkey (93% lean)', category: 'proteins', priority: 'essential' },
  { id: 'p3', name: 'Eggs (large, whole)', category: 'proteins', priority: 'essential' },
  { id: 'p4', name: 'Egg whites (carton)', category: 'proteins', priority: 'recommended' },
  { id: 'p5', name: 'Salmon (fresh or frozen)', category: 'proteins', priority: 'essential', notes: 'Rich in Omega-3s' },
  { id: 'p6', name: 'Tuna (canned in water)', category: 'proteins', priority: 'essential', notes: 'Convenient, cheap protein' },
  { id: 'p7', name: 'Greek yogurt (plain, 0% fat)', category: 'proteins', priority: 'essential' },
  { id: 'p8', name: 'Cottage cheese (low-fat)', category: 'proteins', priority: 'recommended', notes: 'Slow-digesting casein before bed' },
  { id: 'p9', name: 'Lean beef (sirloin or 90/10)', category: 'proteins', priority: 'recommended' },
  { id: 'p10', name: 'Shrimp (frozen, peeled)', category: 'proteins', priority: 'optional' },
  { id: 'p11', name: 'Tilapia fillets', category: 'proteins', priority: 'optional' },
  { id: 'p12', name: 'Edamame (frozen)', category: 'proteins', priority: 'recommended', notes: 'Plant-based complete protein' },

  // Fruits
  { id: 'f1', name: 'Bananas', category: 'fruits', priority: 'essential', notes: 'Pre-workout carbs + potassium' },
  { id: 'f2', name: 'Blueberries (fresh or frozen)', category: 'fruits', priority: 'essential', notes: 'Antioxidants' },
  { id: 'f3', name: 'Strawberries', category: 'fruits', priority: 'recommended' },
  { id: 'f4', name: 'Apples', category: 'fruits', priority: 'recommended', notes: 'High fiber, portable' },
  { id: 'f5', name: 'Oranges', category: 'fruits', priority: 'recommended', notes: 'Vitamin C' },
  { id: 'f6', name: 'Pineapple (fresh or canned in juice)', category: 'fruits', priority: 'optional', notes: 'Bromelain for recovery' },
  { id: 'f7', name: 'Cherries (tart, frozen)', category: 'fruits', priority: 'optional', notes: 'Some evidence for recovery benefits' },
  { id: 'f8', name: 'Mango chunks (frozen)', category: 'fruits', priority: 'optional' },
  { id: 'f9', name: 'Grapes', category: 'fruits', priority: 'optional' },
  { id: 'f10', name: 'Kiwi', category: 'fruits', priority: 'optional', notes: 'Some evidence for sleep quality' },

  // Vegetables
  { id: 'v1', name: 'Baby spinach', category: 'vegetables', priority: 'essential', notes: 'High volume, low calorie' },
  { id: 'v2', name: 'Broccoli (fresh or frozen)', category: 'vegetables', priority: 'essential' },
  { id: 'v3', name: 'Bell peppers (mixed)', category: 'vegetables', priority: 'essential', notes: 'Vitamin C, fiber' },
  { id: 'v4', name: 'Sweet potatoes', category: 'vegetables', priority: 'essential', notes: 'Complex carbs, fiber' },
  { id: 'v5', name: 'Zucchini', category: 'vegetables', priority: 'recommended' },
  { id: 'v6', name: 'Asparagus', category: 'vegetables', priority: 'recommended', notes: 'Diuretic, good micronutrients' },
  { id: 'v7', name: 'Cucumbers', category: 'vegetables', priority: 'recommended', notes: 'Hydration, low calorie' },
  { id: 'v8', name: 'Cherry tomatoes', category: 'vegetables', priority: 'recommended' },
  { id: 'v9', name: 'Kale', category: 'vegetables', priority: 'optional' },
  { id: 'v10', name: 'Cauliflower', category: 'vegetables', priority: 'recommended', notes: 'Versatile low-carb base' },
  { id: 'v11', name: 'Green beans', category: 'vegetables', priority: 'optional' },
  { id: 'v12', name: 'Mushrooms', category: 'vegetables', priority: 'optional', notes: 'Vitamin D if sun-exposed' },
  { id: 'v13', name: 'Onions', category: 'vegetables', priority: 'essential', notes: 'Flavor staple' },
  { id: 'v14', name: 'Garlic', category: 'vegetables', priority: 'essential' },

  // Snacks
  { id: 's1', name: 'Almonds (raw or dry-roasted)', category: 'snacks', priority: 'essential', notes: 'Portion control: ~28g/serving' },
  { id: 's2', name: 'Mixed nuts (unsalted)', category: 'snacks', priority: 'recommended' },
  { id: 's3', name: 'Rice cakes (plain or lightly salted)', category: 'snacks', priority: 'recommended', notes: 'Low-cal carb base' },
  { id: 's4', name: 'Peanut butter (natural)', category: 'snacks', priority: 'essential', notes: 'Check: oil + peanuts only' },
  { id: 's5', name: 'Hummus', category: 'snacks', priority: 'recommended' },
  { id: 's6', name: 'Dark chocolate (70%+)', category: 'snacks', priority: 'optional', notes: 'Moderation — antioxidants' },
  { id: 's7', name: 'Protein bars (low-sugar variety)', category: 'snacks', priority: 'optional', notes: 'Read labels carefully' },
  { id: 's8', name: 'Jerky (low-sodium)', category: 'snacks', priority: 'optional', notes: 'Portable protein' },
  { id: 's9', name: 'Popcorn (air-popped)', category: 'snacks', priority: 'optional', notes: 'High volume, decent fiber' },
  { id: 's10', name: 'Pumpkin seeds (pepitas)', category: 'snacks', priority: 'optional', notes: 'Magnesium, zinc source' },

  // Drinks
  { id: 'd1', name: 'Sparkling water (unflavored)', category: 'drinks', priority: 'essential', notes: 'Replaces soda' },
  { id: 'd2', name: 'Green tea (loose leaf or bags)', category: 'drinks', priority: 'recommended', notes: 'L-Theanine + mild caffeine' },
  { id: 'd3', name: 'Black coffee (ground or whole bean)', category: 'drinks', priority: 'recommended' },
  { id: 'd4', name: 'Electrolyte powder (low-sugar)', category: 'drinks', priority: 'recommended', notes: 'LMNT, Nuun, etc.' },
  { id: 'd5', name: 'Protein shake mix (whey or plant)', category: 'drinks', priority: 'recommended' },
  { id: 'd6', name: 'Coconut water (plain)', category: 'drinks', priority: 'optional', notes: 'Natural electrolytes' },
  { id: 'd7', name: 'Tart cherry juice (100%)', category: 'drinks', priority: 'optional', notes: 'Some evidence for recovery' },

  // Meal Substitutes
  { id: 'm1', name: 'Oats (rolled, old-fashioned)', category: 'meal-substitutes', priority: 'essential', notes: 'Beta-glucan fiber, slow carbs' },
  { id: 'm2', name: 'Brown rice', category: 'meal-substitutes', priority: 'essential' },
  { id: 'm3', name: 'Quinoa', category: 'meal-substitutes', priority: 'recommended', notes: 'Complete protein grain' },
  { id: 'm4', name: 'Ezekiel bread (sprouted grain)', category: 'meal-substitutes', priority: 'recommended' },
  { id: 'm5', name: 'Lentils (dry)', category: 'meal-substitutes', priority: 'recommended', notes: 'Fiber + protein + iron' },
  { id: 'm6', name: 'Black beans (canned, low-sodium)', category: 'meal-substitutes', priority: 'recommended' },
  { id: 'm7', name: 'Chickpeas (canned)', category: 'meal-substitutes', priority: 'recommended' },
  { id: 'm8', name: 'Meal replacement shakes (clean label)', category: 'meal-substitutes', priority: 'optional', notes: 'Check: macros, ingredient list' },
]

export const groceryCategoryMeta = {
  proteins: { label: 'Proteins', emoji: '🥩', color: 'text-red-400', bg: 'bg-red-400/10 border-red-400/20' },
  fruits: { label: 'Fruits', emoji: '🍎', color: 'text-pink-400', bg: 'bg-pink-400/10 border-pink-400/20' },
  vegetables: { label: 'Vegetables', emoji: '🥦', color: 'text-green-400', bg: 'bg-green-400/10 border-green-400/20' },
  snacks: { label: 'Snacks', emoji: '🥜', color: 'text-yellow-400', bg: 'bg-yellow-400/10 border-yellow-400/20' },
  drinks: { label: 'Drinks', emoji: '💧', color: 'text-blue-400', bg: 'bg-blue-400/10 border-blue-400/20' },
  'meal-substitutes': { label: 'Meal Bases', emoji: '🌾', color: 'text-orange-400', bg: 'bg-orange-400/10 border-orange-400/20' },
  pantry: { label: 'Pantry', emoji: '🫙', color: 'text-purple-400', bg: 'bg-purple-400/10 border-purple-400/20' },
}
