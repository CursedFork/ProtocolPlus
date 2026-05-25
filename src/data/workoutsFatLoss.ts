import type { WorkoutPlan, SplitType } from '@/types/workout'

// ── Cardio blocks used across fat-loss plans ──────────────────────────────────

const cardioFL = {
  hiit20: '20 min HIIT — 30s all-out effort / 60s active recovery × 10 rounds (treadmill, elliptical, or bike)',
  hiit15: '15 min HIIT — 30s sprint / 60s walk × 8 rounds; finish with 5 min easy cool-down',
  hiit25: '25 min HIIT intervals — alternate between jump rope, elliptical, and bodyweight burpees (30s on / 45s off)',
  liss20: '20 min LISS — brisk walk, light cycling, or elliptical at conversational (Zone 2) pace',
  liss25: '25 min LISS — steady-state cardio, maintaining a pace where you can hold a sentence',
  liss30: '30 min LISS — extended Zone 2 session; ideal post-leg day for active recovery',
  circuit: '15 min metabolic finisher — 3 rounds: 20 jump squats → 15 push-ups → 20 glute bridges → 30s plank; rest 60s between rounds',
}

// ── 2-Day: Full Body Metabolic A/B ───────────────────────────────────────────

const fatLoss2: WorkoutPlan = {
  splitType: 2,
  name: '2-Day Full Body Metabolic',
  description: 'Two full-body sessions using circuits and moderate weights. Each session burns maximum calories through compound movements and built-in cardio. Perfect for busy schedules.',
  days: [
    {
      label: 'Day A — Full Body Circuit (Lower Emphasis)',
      focus: ['Glutes', 'Legs', 'Core', 'Cardio'],
      estimatedMinutes: 50,
      cardio: cardioFL.hiit20,
      exercises: [
        { name: 'Goblet Squat', sets: 3, reps: '15–20', restSeconds: 45, muscleGroup: 'Legs', notes: 'Light-to-moderate DB; control the descent', progressionTip: 'Increase DB weight by 2.5–5 lbs every 2 weeks' },
        { name: 'Dumbbell Romanian Deadlift', sets: 3, reps: '15', restSeconds: 45, muscleGroup: 'Glutes', notes: 'Feel the hamstring stretch; hinge at hips' },
        { name: 'Hip Thrust (bodyweight or DB on hips)', sets: 3, reps: '20', restSeconds: 45, muscleGroup: 'Glutes', notes: 'Squeeze at the top, hold 1s', progressionTip: 'Add a resistance band above knees for extra glute activation' },
        { name: 'Push-Up (or Incline DB Press)', sets: 3, reps: '12–15', restSeconds: 45, muscleGroup: 'Chest', notes: 'Use knees if needed; aim for full range of motion' },
        { name: 'Bent-Over Dumbbell Row', sets: 3, reps: '15', restSeconds: 45, muscleGroup: 'Back' },
        { name: 'Dead Bug', sets: 3, reps: '10 per side', restSeconds: 30, muscleGroup: 'Core', notes: 'Slow and controlled; lower back stays flat on floor' },
      ],
    },
    {
      label: 'Day B — Full Body Circuit (Upper Emphasis)',
      focus: ['Shoulders', 'Back', 'Glutes', 'Core', 'Cardio'],
      estimatedMinutes: 50,
      cardio: cardioFL.liss25,
      exercises: [
        { name: 'Reverse Lunge (Dumbbells)', sets: 3, reps: '12 per side', restSeconds: 45, muscleGroup: 'Legs', notes: 'Step back, not forward — easier on knees' },
        { name: 'Sumo Squat (Dumbbell)', sets: 3, reps: '15–20', restSeconds: 45, muscleGroup: 'Glutes', notes: 'Wide stance, toes pointed out; targets inner thighs and glutes' },
        { name: 'Dumbbell Shoulder Press', sets: 3, reps: '15', restSeconds: 45, muscleGroup: 'Shoulders' },
        { name: 'Lat Pulldown or Resistance Band Row', sets: 3, reps: '15', restSeconds: 45, muscleGroup: 'Back', progressionTip: 'Increase band resistance or cable weight every 2 weeks' },
        { name: 'Lateral Raise', sets: 3, reps: '15', restSeconds: 45, muscleGroup: 'Shoulders', notes: 'Light weight; control the movement — no swinging' },
        { name: 'Plank', sets: 3, reps: '40–60s', restSeconds: 30, muscleGroup: 'Core' },
      ],
    },
  ],
  restDays: ['After Day A', 'After Day B', 'Remaining days'],
  generalNotes: [
    'Use moderate weights that challenge you by the last 3 reps — you should not be able to do 5 more',
    'Keep rest periods short (45–60s) to maintain elevated heart rate and maximize calorie burn',
    'Do NOT skip the cardio block — it is a core part of the fat-loss stimulus',
    'You will NOT get bulky from this program — significant muscle gain requires years of heavy lifting and a calorie surplus',
    'Pair with a 300–400 kcal/day deficit for optimal fat loss (see Diet Plan for guidance)',
    'Aim to lose 0.5–1 lb per week — faster loss risks muscle and energy',
  ],
}

// ── 3-Day: Lower / Upper / Full Body Metabolic ───────────────────────────────

const fatLoss3: WorkoutPlan = {
  splitType: 3,
  name: '3-Day Lean & Toned Split',
  description: 'Three focused sessions: lower body glute emphasis, upper body tone, and a full-body metabolic circuit. Each session includes cardio for maximum calorie burn.',
  days: [
    {
      label: 'Day 1 — Lower Body & Glutes',
      focus: ['Glutes', 'Legs', 'Core'],
      estimatedMinutes: 55,
      cardio: cardioFL.liss20,
      exercises: [
        { name: 'Hip Thrust (DB or Barbell)', sets: 4, reps: '15–20', restSeconds: 60, muscleGroup: 'Glutes', notes: 'Primary glute builder; squeeze hard at top', progressionTip: 'Best exercise for glute growth — prioritize progression here' },
        { name: 'Goblet Squat', sets: 3, reps: '15', restSeconds: 45, muscleGroup: 'Legs' },
        { name: 'Dumbbell Romanian Deadlift', sets: 3, reps: '15', restSeconds: 45, muscleGroup: 'Glutes', notes: 'Control the descent; feel the stretch' },
        { name: 'Walking Dumbbell Lunge', sets: 3, reps: '12 per side', restSeconds: 45, muscleGroup: 'Legs' },
        { name: 'Banded Clamshell', sets: 3, reps: '20 per side', restSeconds: 30, muscleGroup: 'Glutes', notes: 'Hip abductor activation — use medium resistance band' },
        { name: 'Side Plank', sets: 3, reps: '30–45s per side', restSeconds: 30, muscleGroup: 'Core' },
      ],
    },
    {
      label: 'Day 2 — Upper Body & Core',
      focus: ['Chest', 'Back', 'Shoulders', 'Core'],
      estimatedMinutes: 50,
      cardio: cardioFL.hiit15,
      exercises: [
        { name: 'Dumbbell Chest Press (flat or incline)', sets: 3, reps: '15', restSeconds: 60, muscleGroup: 'Chest', notes: 'Controlled tempo — 2s down, 1s up' },
        { name: 'Cable or Band Lat Pulldown', sets: 3, reps: '15', restSeconds: 60, muscleGroup: 'Back', progressionTip: 'Squeeze shoulder blades at bottom' },
        { name: 'Dumbbell Shoulder Press', sets: 3, reps: '15', restSeconds: 45, muscleGroup: 'Shoulders' },
        { name: 'Bent-Over Dumbbell Row', sets: 3, reps: '15', restSeconds: 45, muscleGroup: 'Back' },
        { name: 'Lateral Raise', sets: 3, reps: '15', restSeconds: 45, muscleGroup: 'Shoulders', notes: 'Light weight; raise to shoulder height only' },
        { name: 'Bicycle Crunch', sets: 3, reps: '20', restSeconds: 30, muscleGroup: 'Core' },
        { name: 'Plank', sets: 3, reps: '45s', restSeconds: 30, muscleGroup: 'Core' },
      ],
    },
    {
      label: 'Day 3 — Full Body Metabolic Circuit',
      focus: ['Full Body', 'Glutes', 'Cardio'],
      estimatedMinutes: 50,
      cardio: cardioFL.hiit20,
      exercises: [
        { name: 'Jump Squat (or Step-Up)', sets: 3, reps: '20', restSeconds: 45, muscleGroup: 'Legs', notes: 'Land softly; use step-up as low-impact alternative' },
        { name: 'Push-Up', sets: 3, reps: 'max (aim 10–20)', restSeconds: 45, muscleGroup: 'Chest', notes: 'From toes or knees — full range of motion' },
        { name: 'Dumbbell Swing (KB-style)', sets: 3, reps: '15', restSeconds: 45, muscleGroup: 'Glutes', notes: 'Hip hinge pattern — power from glutes, not arms' },
        { name: 'Renegade Row (light DBs)', sets: 3, reps: '10 per side', restSeconds: 60, muscleGroup: 'Back', notes: 'Plank position; avoid hip rotation' },
        { name: 'Glute Bridge Pulse', sets: 3, reps: '30', restSeconds: 30, muscleGroup: 'Glutes', notes: 'Short pulsing range at top — high burn' },
        { name: 'Mountain Climbers', sets: 3, reps: '30s', restSeconds: 30, muscleGroup: 'Core' },
      ],
    },
  ],
  restDays: ['Between each session', 'At least 1 day off per pair of sessions'],
  generalNotes: [
    'Short rest periods (30–60s) are intentional — they keep heart rate elevated for greater calorie burn',
    'Focus on the muscle being worked, not just moving the weight',
    'Hip thrust is your most important exercise for glute shaping — do not skip Day 1',
    'Progressive overload still applies — increase resistance every 2 weeks to keep toning',
    'Aim for 10,000+ steps on rest days to stay active without overtraining',
    'Hydration is especially important on higher-cardio days — aim for 3L+',
  ],
}

// ── 4-Day: Glutes + Upper + Legs + Metabolic ─────────────────────────────────

const fatLoss4: WorkoutPlan = {
  splitType: 4,
  name: '4-Day Toning & Fat Loss Split',
  description: 'Four sessions targeting glutes, upper body tone, leg volume, and a metabolic circuit. Designed to build shape while consistently burning calories.',
  days: [
    {
      label: 'Day 1 — Glutes & Hamstrings',
      focus: ['Glutes', 'Legs'],
      estimatedMinutes: 55,
      cardio: cardioFL.liss20,
      exercises: [
        { name: 'Hip Thrust (DB or Barbell)', sets: 4, reps: '15–20', restSeconds: 60, muscleGroup: 'Glutes', notes: 'Drive through heels; hold at top for 1s', progressionTip: 'Increase load every 1–2 weeks — this is your primary glute builder' },
        { name: 'Dumbbell Romanian Deadlift', sets: 4, reps: '12–15', restSeconds: 60, muscleGroup: 'Glutes', notes: 'Hinge deep — feel the hamstring stretch' },
        { name: 'Leg Curl (machine or cable)', sets: 3, reps: '15', restSeconds: 45, muscleGroup: 'Legs' },
        { name: 'Sumo Squat Pulse (DB)', sets: 3, reps: '20', restSeconds: 45, muscleGroup: 'Glutes', notes: 'Stay low; pulse in bottom half of movement' },
        { name: 'Banded Donkey Kick', sets: 3, reps: '20 per side', restSeconds: 30, muscleGroup: 'Glutes' },
        { name: 'Dead Bug', sets: 3, reps: '10 per side', restSeconds: 30, muscleGroup: 'Core' },
      ],
    },
    {
      label: 'Day 2 — Upper Body Tone + Cardio',
      focus: ['Chest', 'Back', 'Shoulders', 'Triceps', 'Biceps'],
      estimatedMinutes: 55,
      cardio: cardioFL.hiit20,
      exercises: [
        { name: 'Dumbbell Incline Press', sets: 3, reps: '15', restSeconds: 60, muscleGroup: 'Chest' },
        { name: 'Cable Lat Pulldown', sets: 3, reps: '15', restSeconds: 60, muscleGroup: 'Back', progressionTip: 'Increase cable weight by 5 lbs every 2–3 weeks' },
        { name: 'Dumbbell Shoulder Press', sets: 3, reps: '15', restSeconds: 45, muscleGroup: 'Shoulders' },
        { name: 'Bent-Over Dumbbell Row', sets: 3, reps: '15', restSeconds: 45, muscleGroup: 'Back' },
        { name: 'Cable Tricep Pushdown', sets: 3, reps: '15', restSeconds: 45, muscleGroup: 'Triceps', notes: 'Full extension at bottom; elbows stay tucked' },
        { name: 'Dumbbell Bicep Curl', sets: 3, reps: '15', restSeconds: 45, muscleGroup: 'Biceps' },
        { name: 'Hanging or Lying Knee Raise', sets: 3, reps: '15', restSeconds: 30, muscleGroup: 'Core' },
      ],
    },
    {
      label: 'Day 3 — Legs & Quads',
      focus: ['Legs', 'Glutes', 'Cardio'],
      estimatedMinutes: 55,
      cardio: cardioFL.hiit25,
      exercises: [
        { name: 'Goblet Squat', sets: 4, reps: '15–20', restSeconds: 45, muscleGroup: 'Legs', progressionTip: 'Add 5 lbs every 2 weeks once form is solid' },
        { name: 'Walking Dumbbell Lunge', sets: 3, reps: '14 per side', restSeconds: 45, muscleGroup: 'Legs' },
        { name: 'Dumbbell Step-Up (box or bench)', sets: 3, reps: '12 per side', restSeconds: 45, muscleGroup: 'Legs', notes: 'Drive through heel of the elevated foot' },
        { name: 'Leg Press (machine, moderate weight)', sets: 3, reps: '15–20', restSeconds: 60, muscleGroup: 'Legs' },
        { name: 'Glute Bridge (bodyweight)', sets: 3, reps: '25', restSeconds: 30, muscleGroup: 'Glutes' },
        { name: 'Calf Raise', sets: 3, reps: '20', restSeconds: 30, muscleGroup: 'Legs' },
      ],
    },
    {
      label: 'Day 4 — Full Body Metabolic HIIT',
      focus: ['Full Body', 'Core', 'Cardio'],
      estimatedMinutes: 45,
      cardio: cardioFL.hiit20,
      exercises: [
        { name: 'Jump Squat (or Box Step-Up)', sets: 3, reps: '20', restSeconds: 45, muscleGroup: 'Legs', notes: 'Use step-up as zero-impact modification' },
        { name: 'Push-Up to Shoulder Tap', sets: 3, reps: '10 per side', restSeconds: 45, muscleGroup: 'Chest', notes: 'Core stability challenge — keep hips square' },
        { name: 'Dumbbell Swing', sets: 3, reps: '15', restSeconds: 45, muscleGroup: 'Glutes' },
        { name: 'Renegade Row', sets: 3, reps: '10 per side', restSeconds: 60, muscleGroup: 'Back', notes: 'Light DBs — technique over load' },
        { name: 'Lateral Raise', sets: 3, reps: '15', restSeconds: 45, muscleGroup: 'Shoulders' },
        { name: 'Mountain Climbers', sets: 3, reps: '30s', restSeconds: 30, muscleGroup: 'Core' },
      ],
    },
  ],
  restDays: ['At least 1 day between Day 2 and Day 3 recommended', 'Weekend rest or light walking'],
  generalNotes: [
    'Day 1 (Glutes & Hamstrings) is your most important session — prioritize it even on tired days',
    'Keep rest under 60s for Days 2 and 4 to maintain metabolic demand',
    'Add a resistance band above your knees on any squat or hip thrust for additional glute activation',
    'Progressive overload still matters — increase resistance every 2 weeks to keep the body adapting',
    'Pair with 8,000–12,000 steps daily and a 300–500 kcal deficit for best fat loss results',
    'Do not fear the scale — muscle weighs more than fat; measure progress with photos and how clothes fit',
  ],
}

// ── 5-Day: Glutes / Upper Push / Cardio+Core / Upper Pull / Legs ──────────────

const fatLoss5: WorkoutPlan = {
  splitType: 5,
  name: '5-Day Lean Body Program',
  description: 'Five dedicated sessions covering glute building, upper body toning, a dedicated cardio and core day, upper pull, and leg volume. High frequency with manageable per-session volume.',
  days: [
    {
      label: 'Day 1 — Glutes & Hamstrings',
      focus: ['Glutes', 'Legs'],
      estimatedMinutes: 55,
      cardio: cardioFL.liss20,
      exercises: [
        { name: 'Hip Thrust (DB or Barbell)', sets: 4, reps: '15–20', restSeconds: 60, muscleGroup: 'Glutes', progressionTip: 'Primary glute exercise — track weight and add load regularly' },
        { name: 'Dumbbell Romanian Deadlift', sets: 4, reps: '12–15', restSeconds: 60, muscleGroup: 'Glutes', notes: 'Control descent — feel hamstring stretch' },
        { name: 'Leg Curl (cable or machine)', sets: 3, reps: '15', restSeconds: 45, muscleGroup: 'Legs' },
        { name: 'Banded Donkey Kick', sets: 3, reps: '20 per side', restSeconds: 30, muscleGroup: 'Glutes' },
        { name: 'Banded Fire Hydrant', sets: 3, reps: '20 per side', restSeconds: 30, muscleGroup: 'Glutes', notes: 'Hip abduction for outer glute shape' },
        { name: 'Dead Bug', sets: 3, reps: '10 per side', restSeconds: 30, muscleGroup: 'Core' },
      ],
    },
    {
      label: 'Day 2 — Upper Push + Core',
      focus: ['Chest', 'Shoulders', 'Triceps', 'Core'],
      estimatedMinutes: 50,
      cardio: cardioFL.hiit20,
      exercises: [
        { name: 'Dumbbell Chest Press (flat or incline)', sets: 3, reps: '15', restSeconds: 60, muscleGroup: 'Chest', notes: '2s down, press up explosively' },
        { name: 'Dumbbell Shoulder Press', sets: 3, reps: '15', restSeconds: 45, muscleGroup: 'Shoulders' },
        { name: 'Lateral Raise', sets: 3, reps: '15', restSeconds: 45, muscleGroup: 'Shoulders', notes: 'Raise to ear height; control the descent' },
        { name: 'Cable Fly or Pec Deck', sets: 3, reps: '15', restSeconds: 45, muscleGroup: 'Chest', notes: 'Full stretch at start of each rep' },
        { name: 'Tricep Overhead Extension (DB)', sets: 3, reps: '15', restSeconds: 45, muscleGroup: 'Triceps', notes: 'Targets the often-undertrained long head' },
        { name: 'Plank', sets: 3, reps: '45s', restSeconds: 30, muscleGroup: 'Core' },
        { name: 'Bicycle Crunch', sets: 3, reps: '20', restSeconds: 30, muscleGroup: 'Core' },
      ],
    },
    {
      label: 'Day 3 — HIIT Cardio + Abs',
      focus: ['Core', 'Cardio'],
      estimatedMinutes: 45,
      cardio: cardioFL.hiit25,
      exercises: [
        { name: 'Bicycle Crunch', sets: 4, reps: '20', restSeconds: 30, muscleGroup: 'Core' },
        { name: 'Leg Raise (lying or hanging)', sets: 3, reps: '15', restSeconds: 30, muscleGroup: 'Core', notes: 'Keep lower back pressed flat on floor during lying version' },
        { name: 'Russian Twist (with or without DB)', sets: 3, reps: '20', restSeconds: 30, muscleGroup: 'Core' },
        { name: 'Side Plank', sets: 3, reps: '45s per side', restSeconds: 30, muscleGroup: 'Core' },
        { name: 'Plank to Downward Dog', sets: 3, reps: '10', restSeconds: 30, muscleGroup: 'Core', notes: 'Dynamic core stability movement' },
        { name: 'Hollow Body Hold', sets: 3, reps: '30s', restSeconds: 30, muscleGroup: 'Core', notes: 'Gymnastics-style core compression; lower back stays flat' },
      ],
    },
    {
      label: 'Day 4 — Upper Pull + Shoulders',
      focus: ['Back', 'Biceps', 'Shoulders'],
      estimatedMinutes: 50,
      cardio: cardioFL.liss20,
      exercises: [
        { name: 'Cable Lat Pulldown', sets: 4, reps: '15', restSeconds: 60, muscleGroup: 'Back', progressionTip: 'Squeeze shoulder blades at bottom — width comes from lats' },
        { name: 'Bent-Over Dumbbell Row', sets: 3, reps: '15', restSeconds: 60, muscleGroup: 'Back' },
        { name: 'Seated Cable Row', sets: 3, reps: '15', restSeconds: 45, muscleGroup: 'Back' },
        { name: 'Face Pull (cable, rope attachment)', sets: 3, reps: '15', restSeconds: 45, muscleGroup: 'Shoulders', notes: 'Rear delt and rotator cuff health — underrated exercise' },
        { name: 'Dumbbell Bicep Curl', sets: 3, reps: '15', restSeconds: 45, muscleGroup: 'Biceps' },
        { name: 'Hammer Curl', sets: 3, reps: '15', restSeconds: 45, muscleGroup: 'Biceps', notes: 'Targets the brachialis for arm definition' },
      ],
    },
    {
      label: 'Day 5 — Legs & Glute Volume',
      focus: ['Legs', 'Glutes', 'Cardio'],
      estimatedMinutes: 55,
      cardio: cardioFL.hiit20,
      exercises: [
        { name: 'Goblet Squat', sets: 4, reps: '15–20', restSeconds: 45, muscleGroup: 'Legs', progressionTip: 'Increase DB weight every 2 weeks' },
        { name: 'Walking Dumbbell Lunge', sets: 3, reps: '14 per side', restSeconds: 45, muscleGroup: 'Legs' },
        { name: 'Sumo Squat (heavy DB)', sets: 3, reps: '15–20', restSeconds: 45, muscleGroup: 'Glutes', notes: 'Wide stance targets inner thighs and glutes simultaneously' },
        { name: 'Dumbbell Step-Up', sets: 3, reps: '12 per side', restSeconds: 45, muscleGroup: 'Legs' },
        { name: 'Glute Bridge Pulse', sets: 3, reps: '30', restSeconds: 30, muscleGroup: 'Glutes', notes: 'Short pulse range at top — high burn, great finisher' },
        { name: 'Calf Raise (seated or standing)', sets: 3, reps: '25', restSeconds: 30, muscleGroup: 'Legs' },
      ],
    },
  ],
  restDays: ['2 rest days — ideally after Day 3 or spread across the week', 'Light walks on rest days are encouraged'],
  generalNotes: [
    'Day 3 (HIIT + Core) is a moderate-intensity day — use it as a bridge between upper and lower sessions',
    'Glute exercises on Days 1 and 5 should see progressive resistance increases every 2 weeks',
    'Face pulls (Day 4) support shoulder health and posture — especially important for desk workers',
    'Keep all rest periods under 60s on Days 3 and 4 to maintain elevated calorie burn',
    'Pair with daily step count target (8,000–12,000) and a modest calorie deficit for best fat loss results',
    'Visible abs are 80% diet — the core work here builds functional strength; leanness comes from your kitchen',
  ],
}

// ── 6-Day: Glutes / Upper Push / Cardio+Core / Legs / Upper Pull / Full Body ──

const fatLoss6: WorkoutPlan = {
  splitType: 6,
  name: '6-Day Lean Body Advanced Split',
  description: 'Six sessions designed for maximum body composition improvement — glute specialization, upper body toning, dedicated cardio, leg volume, pulling strength, and a full-body HIIT finisher.',
  days: [
    {
      label: 'Day 1 — Glutes & Hamstrings (Priority)',
      focus: ['Glutes', 'Legs'],
      estimatedMinutes: 55,
      cardio: cardioFL.liss20,
      exercises: [
        { name: 'Hip Thrust (DB or Barbell)', sets: 4, reps: '15–20', restSeconds: 60, muscleGroup: 'Glutes', progressionTip: 'Add load every 1–2 weeks — this is the cornerstone lift of this program' },
        { name: 'Dumbbell Romanian Deadlift', sets: 4, reps: '12–15', restSeconds: 60, muscleGroup: 'Glutes' },
        { name: 'Leg Curl (cable or machine)', sets: 3, reps: '15', restSeconds: 45, muscleGroup: 'Legs' },
        { name: 'Banded Donkey Kick', sets: 3, reps: '20 per side', restSeconds: 30, muscleGroup: 'Glutes' },
        { name: 'Banded Fire Hydrant', sets: 3, reps: '20 per side', restSeconds: 30, muscleGroup: 'Glutes' },
        { name: 'Dead Bug', sets: 3, reps: '10 per side', restSeconds: 30, muscleGroup: 'Core' },
      ],
    },
    {
      label: 'Day 2 — Upper Push',
      focus: ['Chest', 'Shoulders', 'Triceps'],
      estimatedMinutes: 50,
      cardio: cardioFL.hiit15,
      exercises: [
        { name: 'Dumbbell Chest Press (incline)', sets: 3, reps: '15', restSeconds: 60, muscleGroup: 'Chest' },
        { name: 'Dumbbell Shoulder Press', sets: 3, reps: '15', restSeconds: 45, muscleGroup: 'Shoulders' },
        { name: 'Lateral Raise', sets: 3, reps: '15', restSeconds: 45, muscleGroup: 'Shoulders' },
        { name: 'Cable Fly', sets: 3, reps: '15', restSeconds: 45, muscleGroup: 'Chest' },
        { name: 'Tricep Pushdown (cable)', sets: 3, reps: '15', restSeconds: 45, muscleGroup: 'Triceps' },
        { name: 'Tricep Overhead Extension', sets: 3, reps: '15', restSeconds: 45, muscleGroup: 'Triceps' },
      ],
    },
    {
      label: 'Day 3 — LISS Cardio + Full Core',
      focus: ['Core', 'Cardio'],
      estimatedMinutes: 50,
      cardio: cardioFL.liss30,
      exercises: [
        { name: 'Plank', sets: 4, reps: '60s', restSeconds: 30, muscleGroup: 'Core' },
        { name: 'Bicycle Crunch', sets: 3, reps: '20', restSeconds: 30, muscleGroup: 'Core' },
        { name: 'Hanging Knee Raise or Lying Leg Raise', sets: 3, reps: '15', restSeconds: 30, muscleGroup: 'Core' },
        { name: 'Russian Twist', sets: 3, reps: '20', restSeconds: 30, muscleGroup: 'Core' },
        { name: 'Side Plank', sets: 3, reps: '45s per side', restSeconds: 30, muscleGroup: 'Core' },
        { name: 'Hollow Body Hold', sets: 3, reps: '30s', restSeconds: 30, muscleGroup: 'Core' },
      ],
    },
    {
      label: 'Day 4 — Legs & Quad Volume',
      focus: ['Legs', 'Glutes', 'Cardio'],
      estimatedMinutes: 55,
      cardio: cardioFL.hiit20,
      exercises: [
        { name: 'Goblet Squat', sets: 4, reps: '15–20', restSeconds: 45, muscleGroup: 'Legs', progressionTip: 'Increase DB weight every 2 weeks' },
        { name: 'Walking Dumbbell Lunge', sets: 3, reps: '14 per side', restSeconds: 45, muscleGroup: 'Legs' },
        { name: 'Leg Press (machine)', sets: 3, reps: '15–20', restSeconds: 60, muscleGroup: 'Legs' },
        { name: 'Dumbbell Step-Up', sets: 3, reps: '12 per side', restSeconds: 45, muscleGroup: 'Legs' },
        { name: 'Sumo Squat (DB)', sets: 3, reps: '15–20', restSeconds: 45, muscleGroup: 'Glutes' },
        { name: 'Calf Raise', sets: 3, reps: '25', restSeconds: 30, muscleGroup: 'Legs' },
      ],
    },
    {
      label: 'Day 5 — Upper Pull + Shoulders',
      focus: ['Back', 'Biceps', 'Shoulders'],
      estimatedMinutes: 50,
      cardio: cardioFL.liss20,
      exercises: [
        { name: 'Cable Lat Pulldown', sets: 4, reps: '15', restSeconds: 60, muscleGroup: 'Back', progressionTip: 'Increase cable weight every 2–3 weeks' },
        { name: 'Bent-Over Dumbbell Row', sets: 3, reps: '15', restSeconds: 60, muscleGroup: 'Back' },
        { name: 'Seated Cable Row', sets: 3, reps: '15', restSeconds: 45, muscleGroup: 'Back' },
        { name: 'Face Pull (cable)', sets: 3, reps: '15', restSeconds: 45, muscleGroup: 'Shoulders', notes: 'Rear delt and rotator cuff health — do not skip' },
        { name: 'Dumbbell Bicep Curl', sets: 3, reps: '15', restSeconds: 45, muscleGroup: 'Biceps' },
        { name: 'Hammer Curl', sets: 3, reps: '15', restSeconds: 45, muscleGroup: 'Biceps' },
      ],
    },
    {
      label: 'Day 6 — Full Body HIIT Circuit',
      focus: ['Full Body', 'Core', 'Cardio'],
      estimatedMinutes: 45,
      cardio: cardioFL.circuit,
      exercises: [
        { name: 'Jump Squat (or Step-Up)', sets: 3, reps: '20', restSeconds: 45, muscleGroup: 'Legs', notes: 'This is your high-calorie-burn finisher — give it everything' },
        { name: 'Push-Up', sets: 3, reps: 'max', restSeconds: 45, muscleGroup: 'Chest' },
        { name: 'Dumbbell Swing', sets: 3, reps: '15', restSeconds: 45, muscleGroup: 'Glutes' },
        { name: 'Renegade Row', sets: 3, reps: '10 per side', restSeconds: 60, muscleGroup: 'Back' },
        { name: 'Lateral Raise', sets: 3, reps: '15', restSeconds: 45, muscleGroup: 'Shoulders' },
        { name: 'Burpee (or Inchworm)', sets: 3, reps: '10', restSeconds: 45, muscleGroup: 'Full Body', notes: 'Use inchworm as low-impact modification' },
        { name: 'Plank', sets: 3, reps: '60s', restSeconds: 30, muscleGroup: 'Core' },
      ],
    },
  ],
  restDays: ['1 rest day — Sunday or any day that fits your schedule', 'Light walking on rest day is encouraged'],
  generalNotes: [
    'Day 3 (LISS + Core) is the lightest session of the week — use it to recover while staying active',
    'Day 6 (Full Body HIIT) is the highest calorie-burn session — do not replace it with rest',
    'Hip thrust progression is critical: track it each session and add weight consistently',
    'You WILL see definition without getting bulky — the science is clear on this',
    'Daily step count (8,000–12,000) on rest days dramatically improves weekly calorie burn',
    'At 6 days, nutrition and sleep quality become even more important — prioritize both',
  ],
}

// ── Export ────────────────────────────────────────────────────────────────────

export const fatLossPlans: Record<SplitType, WorkoutPlan> = {
  2: fatLoss2,
  3: fatLoss3,
  4: fatLoss4,
  5: fatLoss5,
  6: fatLoss6,
}
