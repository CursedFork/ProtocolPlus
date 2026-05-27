import { Client, Databases, Permission, Role } from 'node-appwrite'

const API_KEY = process.argv[2]
if (!API_KEY) {
  console.error('Usage: node scripts/setup-appwrite.mjs <API_KEY>')
  process.exit(1)
}

const client = new Client()
  .setEndpoint('https://nyc.cloud.appwrite.io/v1')
  .setProject('6a175007003a8e03aef8')
  .setKey(API_KEY)

const db = new Databases(client)
const DB_ID = process.argv[3] ?? 'protocol_plus'
const sleep = (ms) => new Promise(r => setTimeout(r, ms))

async function run(fn, label) {
  try {
    await fn()
    console.log(`  ✓ ${label}`)
  } catch (e) {
    if (e.code === 409) {
      console.log(`  ~ ${label} (already exists, skipping)`)
    } else {
      throw new Error(`Failed on "${label}": ${e.message}`)
    }
  }
}

async function main() {
  console.log(`── Using database: ${DB_ID} ─────────────────`)

  // ── profiles ──────────────────────────────────────────────────────────────
  console.log('\n── profiles ─────────────────────────────────')
  await run(() => db.createCollection(DB_ID, 'profiles', 'profiles', [Permission.create(Role.users())], true), 'collection')
  await run(() => db.createStringAttribute(DB_ID,  'profiles', 'sex',            6,   true),  'sex')
  await run(() => db.createIntegerAttribute(DB_ID, 'profiles', 'age',                 true),  'age')
  await run(() => db.createFloatAttribute(DB_ID,   'profiles', 'weight_lbs',          true),  'weight_lbs')
  await run(() => db.createIntegerAttribute(DB_ID, 'profiles', 'height_ft',           true),  'height_ft')
  await run(() => db.createFloatAttribute(DB_ID,   'profiles', 'height_in',           true),  'height_in')
  await run(() => db.createStringAttribute(DB_ID,  'profiles', 'activity_level', 20,  true),  'activity_level')

  // ── weight_log ────────────────────────────────────────────────────────────
  console.log('\n── weight_log ───────────────────────────────')
  await run(() => db.createCollection(DB_ID, 'weight_log', 'weight_log', [Permission.create(Role.users())], true), 'collection')
  await run(() => db.createStringAttribute(DB_ID, 'weight_log', 'user_id',    36,  true),        'user_id')
  await run(() => db.createStringAttribute(DB_ID, 'weight_log', 'date',       10,  true),        'date')
  await run(() => db.createFloatAttribute(DB_ID,  'weight_log', 'weight_lbs',      true),        'weight_lbs')
  await run(() => db.createStringAttribute(DB_ID, 'weight_log', 'notes',      200, false, null), 'notes')

  // ── strength_log ──────────────────────────────────────────────────────────
  console.log('\n── strength_log ─────────────────────────────')
  await run(() => db.createCollection(DB_ID, 'strength_log', 'strength_log', [Permission.create(Role.users())], true), 'collection')
  await run(() => db.createStringAttribute(DB_ID, 'strength_log', 'user_id',    36,  true), 'user_id')
  await run(() => db.createStringAttribute(DB_ID, 'strength_log', 'date',       10,  true), 'date')
  await run(() => db.createStringAttribute(DB_ID, 'strength_log', 'exercise',   100, true), 'exercise')
  await run(() => db.createFloatAttribute(DB_ID,  'strength_log', 'weight_lbs',      true), 'weight_lbs')
  await run(() => db.createIntegerAttribute(DB_ID,'strength_log', 'reps',            true), 'reps')
  await run(() => db.createIntegerAttribute(DB_ID,'strength_log', 'sets',            true), 'sets')

  // ── goals ─────────────────────────────────────────────────────────────────
  console.log('\n── goals ────────────────────────────────────')
  await run(() => db.createCollection(DB_ID, 'goals', 'goals', [Permission.create(Role.users())], true), 'collection')
  await run(() => db.createStringAttribute(DB_ID, 'goals', 'user_id',       36,  true), 'user_id')
  await run(() => db.createStringAttribute(DB_ID, 'goals', 'goal_id',       20,  true), 'goal_id')
  await run(() => db.createStringAttribute(DB_ID, 'goals', 'title',         100, true), 'title')
  await run(() => db.createFloatAttribute(DB_ID,  'goals', 'target_value',       true), 'target_value')
  await run(() => db.createFloatAttribute(DB_ID,  'goals', 'current_value',      true), 'current_value')
  await run(() => db.createStringAttribute(DB_ID, 'goals', 'unit',          20,  true), 'unit')
  await run(() => db.createStringAttribute(DB_ID, 'goals', 'category',      20,  true), 'category')

  // ── habit_log ─────────────────────────────────────────────────────────────
  console.log('\n── habit_log ────────────────────────────────')
  await run(() => db.createCollection(DB_ID, 'habit_log', 'habit_log', [Permission.create(Role.users())], true), 'collection')
  await run(() => db.createStringAttribute(DB_ID, 'habit_log', 'user_id', 36, true),              'user_id')
  await run(() => db.createStringAttribute(DB_ID, 'habit_log', 'date',    10, true),              'date')
  await run(() => db.createStringAttribute(DB_ID, 'habit_log', 'habits',  50, true, null, true),  'habits (array)')

  // ── preferences ───────────────────────────────────────────────────────────
  console.log('\n── preferences ──────────────────────────────')
  await run(() => db.createCollection(DB_ID, 'preferences', 'preferences', [Permission.create(Role.users())], true), 'collection')
  await run(() => db.createStringAttribute(DB_ID, 'preferences', 'workout_days', 10, true, null, true), 'workout_days (array)')
  await run(() => db.createStringAttribute(DB_ID, 'preferences', 'goal_mode',    20, true),             'goal_mode')

  // ── indexes (wait for attributes to be ready first) ───────────────────────
  console.log('\nWaiting for attributes to be processed...')
  await sleep(8000)

  console.log('\n── indexes ──────────────────────────────────')
  await run(() => db.createIndex(DB_ID, 'weight_log',   'user_date',    'key', ['user_id', 'date'], ['ASC', 'DESC']), 'weight_log: user_date')
  await run(() => db.createIndex(DB_ID, 'strength_log', 'user_date',    'key', ['user_id', 'date'], ['ASC', 'DESC']), 'strength_log: user_date')
  await run(() => db.createIndex(DB_ID, 'habit_log',    'user_date',    'key', ['user_id', 'date'], ['ASC', 'DESC']), 'habit_log: user_date')
  await run(() => db.createIndex(DB_ID, 'goals',        'user_id_idx',  'key', ['user_id'],         ['ASC']),         'goals: user_id')

  console.log('\n────────────────────────────────────────────')
  console.log('Setup complete!')
  console.log(`VITE_APPWRITE_DATABASE_ID=${DB_ID}`)
}

main().catch(e => {
  console.error('\nSetup failed:', e.message)
  process.exit(1)
})
