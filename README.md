# Protocol+

A full-featured personal health and fitness web application built with a modern React stack. Protocol+ covers nutrition planning, evidence-based supplementation, workout programming, grocery management, and progress tracking — all running entirely in the browser with no backend and no data collection.

**Live demo:** [Here](https://protocol-plus-by-cursedfork.vercel.app)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript 6 with strict mode |
| Build Tool | Vite 8 (Rolldown bundler) |
| Styling | Tailwind CSS v4 (CSS-first config, `@theme {}` block) |
| Routing | React Router DOM v7 |
| Animation | Framer Motion |
| Component primitives | Radix UI (Accordion, Dialog, Tooltip, Progress, Tabs) |
| Icons | Lucide React |
| Persistence | Browser `localStorage` (custom generic hook) |

No backend. No database. No authentication. No external API calls at runtime.

---

## Features

### Dashboard
- **Personalized calorie and protein targets** computed client-side from user-entered biometrics using the Mifflin-St Jeor BMR formula with a 5-level activity multiplier
- Stats persist across sessions via `localStorage` and propagate to every page that references them (Diet Plan, Dashboard cards)
- Daily habit tracker, water intake counter, supplement checklist, and meal plan overview — all keyed to today's date string so they auto-reset each day
- Weekly goal progress with animated progress bars

### Diet Plan
- Nine evidence-graded nutrition accordion sections (calorie deficit strategy, macros, meal timing, fiber, hydration, cheat meals, alcohol/caffeine)
- The calorie deficit section dynamically shows personalized BMR, TDEE, calorie target, and protein target when stats are configured — falls back to generic guidance otherwise
- Full sweetener safety guide: 8 sweeteners ranked 1–8 by safety with expandable profiles containing key research findings, risks/benefits, gut microbiome effects, cardiovascular concerns, and WHO 2023 guideline

### Supplement Hub
- 18+ supplements organized by tier (Tier 1 / 2 / 3) and evidence strength (strong → anecdotal)
- Each entry includes: evidence summary, benefits & risks, dosage/timing/cycling, onset timeline, form comparison, synergies, natural food sources, and research citations with PubMed links
- Special handling for prescription drug entries (GLP-1 receptor agonists) with a dedicated warning banner and prescription flag
- B Vitamins entry includes an overdose warning banner surfacing the EFSA 2023 B6 toxicity update (12mg/day safe upper limit)
- `ingredientBreakdown` structure used for complex multi-drug/multi-vitamin entries (pre-workout formulas, GLP-1 brand comparison, B3/B6/B12)
- Filterable by category and tier; full-text search across name, purpose, aliases, and tags

### Workout Planner
- Day selector (2–6 days/week) auto-scales to the appropriate training split (Full Body → Upper/Lower → PPL → Advanced splits)
- Week schedule view auto-assigns workouts to selected days
- Superset Training Guide: 4 scientifically-defined superset types (agonist-antagonist, same-muscle, peripheral, mechanical drop set) with mechanism, time reduction, and example
- Scientific Evidence Base accordion: 9 peer-reviewed citations (Schoenfeld 2017, Ralston 2017, Weakley 2017, Maeo 2023, ACSM position stand, etc.) with PubMed links

### Grocery List
- 146+ items across 8 categories (Proteins, Fruits, Vegetables, Snacks, Drinks, Meal Substitutes, Pantry, Seasonings)
- Persistent checked state via `localStorage`, keyed to a weekly reset date
- Category filtering, search, and per-category progress tracking
- Bulk reset with last-reset timestamp display

### Sources
- Full research bibliography aggregating citations from supplements, sweeteners, and workout research into a single searchable, filterable database
- Filter by citation type (meta-analysis, systematic review, RCT, government, etc.)
- Citations grouped by supplement and available as a flat list
- Evidence hierarchy explainer and methodology note

### Progress Tracking
- Goal-setting and habit streak interface with `localStorage` persistence

### Light / Dark Mode
- System-aware theme toggle in the header (Sun/Moon icon)
- Implemented via `data-theme` attribute on `<html>` with CSS custom properties in `@theme {}` and `html[data-theme="light"]` override blocks
- Theme preference persists to `localStorage`

---

## Architecture

### Project Structure

```
src/
├── components/
│   ├── layout/          # Header, Sidebar, Layout (shell components)
│   └── shared/          # Card, Badge, Accordion, SearchBar, ProgressBar
├── data/                # All research and content data as typed TS modules
│   ├── supplements.ts   # 18+ supplements with citations, dosage, forms, synergies
│   ├── sweeteners.ts    # 8 sweeteners ranked by safety with getSweetenerCitations()
│   ├── groceries.ts     # 146+ grocery items with category metadata
│   ├── workouts.ts      # Workout plans for 2–6 day splits
│   └── workoutResearch.ts  # 9 peer-reviewed workout citations + superset type data
├── hooks/
│   ├── useLocalStorage.ts  # Generic typed hook: [value, setValue, removeValue]
│   └── useTheme.ts         # Theme toggle with localStorage persistence
├── lib/
│   ├── stats.ts         # UserStats interface + Mifflin-St Jeor calculateTargets()
│   └── utils.ts         # cn() (clsx + tailwind-merge), getTodayString()
├── pages/               # One component per route
└── types/               # Domain type definitions (supplement, sweetener, grocery, workout)
```

### Data Modeling

All content is authored as strongly-typed TypeScript — not fetched from an API. This means:
- **Compile-time correctness**: missing fields or wrong types on any of the 150+ research citations are caught at build time, not runtime
- **No loading states**: all data is synchronously available
- **Portable**: the entire app ships as a static bundle with no runtime dependencies

The `Supplement` interface (in `src/types/supplement.ts`) is the most complex domain type, supporting 20+ optional fields including `formComparison`, `ingredientBreakdown`, `synergies`, `onsetTimeline`, `isPrescriptionDrug`, and `importantDosageWarning`. New fields can be added without breaking existing entries due to TypeScript's optional field semantics.

### State Management

No Redux, no Zustand, no Context API for state. All persistence is handled by a single custom hook:

```typescript
// src/hooks/useLocalStorage.ts
function useLocalStorage<T>(key: string, initialValue: T): [T, Dispatch<T>, () => void]
```

State that needs to be shared across pages (user biometrics) is written to `localStorage` by the Dashboard and read directly from `localStorage` by consuming pages (Diet Plan). This is a deliberate choice: the app has no auth and no user sessions, so a shared store would be architectural overhead with no benefit.

### Theming

Tailwind CSS v4 uses a `@theme {}` block in `index.css` to declare CSS custom properties as design tokens. Light mode is implemented by overriding those same variables under `html[data-theme="light"]` — no JavaScript class toggling, no extra build step, no theme provider.

```css
@theme {
  --color-background: hsl(222, 47%, 7%);  /* dark default */
  --color-primary: hsl(142, 71%, 45%);
}

html[data-theme="light"] {
  --color-background: hsl(210, 40%, 97%);  /* light override */
  --color-primary: hsl(142, 71%, 35%);
}
```

### Personalized Calculations

BMR is computed client-side using the Mifflin-St Jeor equation (favored by ACSM over Harris-Benedict for modern populations):

```
BMR = (10 × weightKg) + (6.25 × heightCm) − (5 × age) + (5 if male, −161 if female)
TDEE = BMR × activityMultiplier
calorieTarget = max(1200, TDEE − 400)   // moderate deficit, hard floor
proteinTarget = weightLbs × 0.85        // ~0.7–1g/lb range
```

---

## Getting Started

```bash
git clone https://github.com/CursedFork/ProtocolPlus.git
cd ProtocolPlus
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

TypeScript check only (no emit):

```bash
npx tsc --noEmit
```

There are no environment variables, no `.env` files, and no external services to configure.

---

## Engineering Decisions

**Why no backend?** The app's value proposition is personal tracking. A backend would add auth, a database, hosting costs, and a privacy surface — none of which are worth it for a single-user fitness tracker. `localStorage` is sufficient and intentionally simple.

**Why typed data files instead of JSON?** TypeScript modules give compile-time validation, IDE autocomplete when authoring new entries, and zero parsing overhead. A JSON file with 150+ research citations would silently accept malformed entries; a TypeScript interface won't.

**Why Tailwind v4?** The CSS-first config model (`@theme {}`) eliminates the `tailwind.config.js` file entirely and makes design tokens live in CSS where they belong. The `@tailwindcss/vite` plugin integrates directly with the build pipeline without a PostCSS intermediary.

**Why React Router v7?** Nested route support via `<Outlet />` makes the shell layout (sidebar + header) composable without prop drilling or context. The layout component is a pure shell that renders `<Outlet />` — pages are completely decoupled from navigation chrome.

**Why Radix UI for primitives?** Accessible interactive components (Accordion, Dialog, Tooltip) are harder to build correctly than they look. Radix provides headless, accessible primitives that are styled entirely with Tailwind — no CSS-in-JS, no theme override system to fight.

---

## Research Data Coverage

| Domain | Entries | Citations |
|---|---|---|
| Supplements | 18+ (including GLP-1 drugs) | 60+ |
| Sweeteners | 8 (ranked by safety) | 25+ |
| Workout Science | Superset types, splits, overload | 9 |
| **Total** | | **~95+ peer-reviewed sources** |

All citations include publication year, journal, study type classification, and PubMed/source URL where available. The Sources page aggregates all citations into a single searchable bibliography.

---

## Author

Andrew — CS + Philosophy, University of Maryland Baltimore County (2025)
