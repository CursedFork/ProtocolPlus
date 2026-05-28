import { Client, Databases, Users, ID, Permission, Role } from 'node-appwrite'

const API_KEY = process.argv[2]
if (!API_KEY) {
  console.error('Usage: node scripts/seed-demo.mjs <API_KEY>')
  process.exit(1)
}

const DB_ID    = '6a175734003dec1b3b45'
const EMAIL    = 'demo@protocolplus.app'
const PASSWORD = 'Demo1234!'

const client = new Client()
  .setEndpoint('https://nyc.cloud.appwrite.io/v1')
  .setProject('6a175007003a8e03aef8')
  .setKey(API_KEY)

const db    = new Databases(client)
const users = new Users(client)

// Return YYYY-MM-DD for N days ago from 2026-05-27
function date(daysAgo) {
  const d = new Date('2026-05-27')
  d.setDate(d.getDate() - daysAgo)
  return d.toISOString().split('T')[0]
}

function perms(uid) {
  return [
    Permission.read(Role.user(uid)),
    Permission.update(Role.user(uid)),
    Permission.delete(Role.user(uid)),
  ]
}

async function tryDoc(collectionId, docId, data, uid) {
  try {
    await db.createDocument(DB_ID, collectionId, docId, data, perms(uid))
  } catch (e) {
    if (e.code !== 409) throw e
  }
}

async function main() {
  // ── 1. User account ────────────────────────────────────────────────────────
  console.log('Creating demo user...')
  let userId
  try {
    const user = await users.create(ID.unique(), EMAIL, undefined, PASSWORD, 'Demo User')
    userId = user.$id
    console.log(`  ✓ ${EMAIL}  (${userId})`)
  } catch (e) {
    if (e.code === 409) {
      const found = await users.list([], EMAIL)
      userId = found.users[0].$id
      console.log(`  ~ already exists  (${userId})`)
    } else {
      throw e
    }
  }

  // ── 2. Profile ─────────────────────────────────────────────────────────────
  console.log('\nCreating profile...')
  await tryDoc('profiles', userId, {
    sex:            'male',
    age:            28,
    weight_lbs:     185,
    height_ft:      5,
    height_in:      11,
    activity_level: 'moderate',
  }, userId)
  console.log('  ✓ sex:male age:28 185lbs 5\'11" moderate')

  // ── 3. Weight log — 30 days, gentle downward trend ─────────────────────────
  console.log('\nSeeding weight log...')
  const startWeight = 185.4
  for (let i = 30; i >= 0; i--) {
    const trend = (30 - i) * 0.072          // ~2.2 lbs total drop
    const noise = (Math.sin(i * 7.3) * 0.25 + Math.cos(i * 3.1) * 0.18) // deterministic variation
    const w = Math.round((startWeight - trend + noise) * 10) / 10
    await db.createDocument(DB_ID, 'weight_log', ID.unique(), {
      user_id:    userId,
      date:       date(i),
      weight_lbs: w,
      notes:      i === 30 ? 'Starting weight' : i === 0 ? 'Feeling leaner' : null,
    }, perms(userId))
  }
  console.log('  ✓ 31 entries')

  // ── 4. Strength log — 5 lifts showing clear progression ───────────────────
  console.log('\nSeeding strength log...')
  const lifts = [
    // Bench Press
    { d: 21, ex: 'Bench Press',      w: 170, r: 8,  s: 3 },
    { d: 17, ex: 'Bench Press',      w: 175, r: 8,  s: 3 },
    { d: 13, ex: 'Bench Press',      w: 175, r: 9,  s: 3 },
    { d: 10, ex: 'Bench Press',      w: 180, r: 7,  s: 3 },
    { d:  6, ex: 'Bench Press',      w: 180, r: 8,  s: 3 },
    { d:  2, ex: 'Bench Press',      w: 185, r: 6,  s: 3 },
    // Back Squat
    { d: 20, ex: 'Back Squat',       w: 215, r: 6,  s: 4 },
    { d: 15, ex: 'Back Squat',       w: 225, r: 6,  s: 4 },
    { d: 11, ex: 'Back Squat',       w: 225, r: 7,  s: 4 },
    { d:  7, ex: 'Back Squat',       w: 235, r: 5,  s: 4 },
    { d:  3, ex: 'Back Squat',       w: 235, r: 6,  s: 4 },
    // Deadlift
    { d: 19, ex: 'Deadlift',         w: 265, r: 5,  s: 3 },
    { d: 12, ex: 'Deadlift',         w: 275, r: 5,  s: 3 },
    { d:  5, ex: 'Deadlift',         w: 285, r: 4,  s: 3 },
    // Overhead Press
    { d: 21, ex: 'Overhead Press',   w: 110, r: 8,  s: 3 },
    { d: 14, ex: 'Overhead Press',   w: 115, r: 8,  s: 3 },
    { d:  7, ex: 'Overhead Press',   w: 115, r: 9,  s: 3 },
    { d:  1, ex: 'Overhead Press',   w: 120, r: 6,  s: 3 },
    // Pull-ups
    { d: 18, ex: 'Pull-ups',         w:   0, r: 10, s: 3 },
    { d: 11, ex: 'Pull-ups',         w:   0, r: 11, s: 3 },
    { d:  4, ex: 'Pull-ups',         w:  10, r: 8,  s: 3 },
  ]
  for (const l of lifts) {
    await db.createDocument(DB_ID, 'strength_log', ID.unique(), {
      user_id:    userId,
      date:       date(l.d),
      exercise:   l.ex,
      weight_lbs: l.w,
      reps:       l.r,
      sets:       l.s,
    }, perms(userId))
  }
  console.log(`  ✓ ${lifts.length} entries`)

  // ── 5. Goals ───────────────────────────────────────────────────────────────
  console.log('\nSeeding goals...')
  const goals = [
    { id: 'g1', title: 'Target body weight', target: 175, current: 183, unit: 'lbs',  category: 'weight' },
    { id: 'g2', title: 'Bench press 1RM',    target: 225, current: 185, unit: 'lbs',  category: 'strength' },
    { id: 'g3', title: 'Run 5K',             target: 25,  current: 31,  unit: 'min',  category: 'cardio' },
  ]
  for (const g of goals) {
    await tryDoc('goals', `${userId}_${g.id}`, {
      user_id:       userId,
      goal_id:       g.id,
      title:         g.title,
      target_value:  g.target,
      current_value: g.current,
      unit:          g.unit,
      category:      g.category,
    }, userId)
  }
  console.log('  ✓ 3 goals')

  // ── 6. Habit log — 14 days, realistic completion rate ─────────────────────
  console.log('\nSeeding habit log...')
  const allHabits = ['Training', 'Protein target', 'Water goal', 'Good sleep', 'Vegetables', 'No late caffeine']
  // Deterministic "missed" pattern — misses 1 habit every 3rd day
  for (let i = 14; i >= 1; i--) {
    const habits = i % 3 === 0
      ? allHabits.slice(1)              // skip 'Training' every 3rd day (rest day)
      : i % 7 === 0
        ? allHabits.slice(0, 4)         // bad day once a week
        : allHabits
    await tryDoc('habit_log', `${userId}_${date(i)}`, {
      user_id: userId,
      date:    date(i),
      habits,
    }, userId)
  }
  console.log('  ✓ 14 entries')

  // ── 7. Preferences ─────────────────────────────────────────────────────────
  console.log('\nSeeding preferences...')
  await tryDoc('preferences', userId, {
    workout_days: ['Monday', 'Tuesday', 'Thursday', 'Friday', 'Saturday'],
    goal_mode:    'strength',
  }, userId)
  console.log('  ✓ 5-day split, strength mode')

  // ── Done ───────────────────────────────────────────────────────────────────
  console.log('\n────────────────────────────────────────────')
  console.log('Demo account ready!')
  console.log(`  Email    : ${EMAIL}`)
  console.log(`  Password : ${PASSWORD}`)
}

main().catch(e => {
  console.error('\nSeed failed:', e.message)
  process.exit(1)
})
