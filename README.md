# Protocol+

A full-featured personal health and fitness web application built with a modern React stack. Protocol+ covers nutrition planning, evidence-based supplementation, workout programming, grocery management, and progress tracking — with optional cloud sync via Appwrite.

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
| Auth & Database | Appwrite Cloud |
| Local persistence | Browser `localStorage` (custom generic hook) |

---

## Features

### Dashboard
- **Personalized calorie and protein targets** computed client-side from user-entered biometrics using the Mifflin-St Jeor BMR formula with a 5-level activity multiplier
- Stats persist across sessions via `localStorage` and sync to Appwrite — available across all devices when signed in
- Daily habit tracker, water intake counter, supplement checklist, and meal plan overview — all keyed to today's date string so they auto-reset each day
- 300 rotating daily quotes from athletes, coaches, philosophers, and classic films — seeded by date so everyone sees the same quote each day
- Weekly goal progress with animated progress bars

### Diet Plan
- Nine evidence-graded nutrition accordion sections (calorie deficit strategy, macros, meal timing, fiber, hydration, cheat meals, alcohol/caffeine)
- The calorie deficit section dynamically shows personalized BMR, TDEE, calorie target, and protein target when stats are configured
- **Budget mode toggle** — switches all food recommendations to affordable alternatives, adds a cost-per-gram protein table, weekly grocery blueprint (~$50–65/week), and research-backed budget nutrition notes
- Full sweetener safety guide: 8 sweeteners ranked 1–8 by safety with expandable profiles

### Workout Planner
- **Two goal modes:** Strength & Size (Push/Pull/Legs, barbell focus) and Lean & Toned (higher reps, dumbbells/cables, glute/core emphasis, integrated cardio)
- Day selector (2–6 days/week) auto-scales to the appropriate training split
- Week schedule view auto-assigns workouts to selected days
- Superset Training Guide: 4 scientifically-defined superset types with mechanism, time reduction, and example
- Scientific Evidence Base accordion: 9 peer-reviewed citations with PubMed links

### Supplement Hub
- 18+ supplements organized by tier (Tier 1 / 2 / 3) and evidence strength
- Each entry includes: evidence summary, benefits & risks, dosage/timing/cycling, onset timeline, form comparison, synergies, natural food sources, and research citations
- Special handling for prescription drug entries (GLP-1 receptor agonists)
- Filterable by category and tier; full-text search across name, purpose, aliases, and tags

### Grocery List
- 146+ items across 8 categories
- Persistent checked state, weekly auto-reset
- Category filtering, search, and per-category progress tracking

### Progress Tracking
- Weight log, strength log (lifts & PRs), goal tracker, and daily habit streaks
- All data synced to Appwrite — persists across devices and browser clears

### Sources
- Full research bibliography aggregating citations from supplements, sweeteners, diet, and workout research
- Filter by citation type; grouped by domain

### Light / Dark Mode
- System-aware theme toggle; preference persists to `localStorage`

---

## Architecture

### Project Structure

```
src/
├── components/
│   ├── layout/          # Header, Sidebar, Layout (shell components)
│   └── shared/          # Card, Badge, Accordion, SearchBar, ProgressBar
├── contexts/
│   └── AuthContext.tsx  # Appwrite auth state, signIn/signUp/signOut
├── data/                # All research and content data as typed TS modules
│   ├── supplements.ts
│   ├── sweeteners.ts
│   ├── groceries.ts
│   ├── workouts.ts          # Strength & Size plans (2–6 day splits)
│   ├── workoutsFatLoss.ts   # Lean & Toned plans (2–6 day splits)
│   ├── workoutResearch.ts
│   ├── dietCitations.ts
│   └── quotes.ts            # 300 daily rotating quotes
├── hooks/
│   ├── useLocalStorage.ts   # Generic typed hook: [value, setValue, removeValue]
│   ├── useCloudSync.ts      # Appwrite sync hooks for all user data
│   └── useTheme.ts
├── lib/
│   ├── appwrite.ts      # Appwrite client, account, databases, upsertDocument helper
│   ├── stats.ts         # UserStats interface + Mifflin-St Jeor calculateTargets()
│   └── utils.ts         # cn(), getTodayString()
├── pages/               # One component per route
│   └── AuthPage.tsx     # Email + password sign-in / sign-up
├── types/               # Domain type definitions
└── utils/
    ├── storage.ts
    └── workoutScaling.ts
appwrite/
└── setup.md             # Appwrite dashboard setup guide (collections, attributes, indexes)
```

### Auth & Cloud Sync

Authentication is handled by Appwrite's email+password flow. On sign-in, all user data (stats, weight log, strength log, goals, habits, preferences) is fetched from Appwrite and merged into `localStorage`. On every write, `localStorage` is updated immediately (zero latency for the UI) and Appwrite is synced asynchronously.

`useCloudSync.ts` exports one hook per data domain (`useCloudStats`, `useCloudWeightLog`, etc.). Each hook follows the same pattern: fetch on login, upsert on write, `localStorage` as the local cache.

### State Management

No Redux, no Zustand. Persistence is handled by `useLocalStorage<T>` for local state and `useCloudSync` hooks for cloud-backed state. Data shared across pages (user biometrics) is written to `localStorage` by one page and read directly by others.

### Theming

Tailwind CSS v4 uses a `@theme {}` block in `index.css` to declare CSS custom properties as design tokens. Light mode overrides those variables under `html[data-theme="light"]`.

### Personalized Calculations

```
BMR = (10 × weightKg) + (6.25 × heightCm) − (5 × age) + (5 if male, −161 if female)
TDEE = BMR × activityMultiplier
calorieTarget = max(1200, TDEE − 400)
proteinTarget = weightLbs × 0.85
```

---

## Getting Started

```bash
git clone https://github.com/CursedFork/ProtocolPlus.git
cd ProtocolPlus
npm install
```

Create a `.env.local` file:

```
VITE_APPWRITE_DATABASE_ID=your_database_id
```

The Appwrite endpoint and project ID are already set in `src/lib/appwrite.ts`. See `appwrite/setup.md` for the full dashboard setup guide (database, collections, attributes, indexes).

```bash
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

---

## Research Data Coverage

| Domain | Entries | Citations |
|---|---|---|
| Supplements | 18+ (including GLP-1 drugs) | 60+ |
| Sweeteners | 8 (ranked by safety) | 25+ |
| Diet & Nutrition | 6 sections | 21 |
| Workout Science | Superset types, splits, overload | 9 |
| **Total** | | **~115+ peer-reviewed sources** |

---

## Author

Andrew — CS + Philosophy, University of Maryland Baltimore County (2025)
