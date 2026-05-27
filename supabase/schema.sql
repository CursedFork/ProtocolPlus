-- ============================================================
-- Protocol+ Supabase Schema
-- Run this in the Supabase SQL Editor (Project → SQL Editor → New query)
-- ============================================================

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ── Profiles (user stats) ─────────────────────────────────────────────────
create table if not exists public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  sex          text not null check (sex in ('male', 'female')),
  age          integer not null check (age > 0),
  weight_lbs   numeric not null check (weight_lbs > 0),
  height_ft    integer not null check (height_ft >= 0),
  height_in    numeric not null check (height_in >= 0 and height_in < 12),
  activity_level text not null check (activity_level in ('sedentary','light','moderate','very','extreme')),
  updated_at   timestamptz not null default now()
);

-- ── Weight log ────────────────────────────────────────────────────────────
create table if not exists public.weight_log (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  date         date not null,
  weight_lbs   numeric not null check (weight_lbs > 0),
  notes        text,
  created_at   timestamptz not null default now()
);

-- ── Strength log ──────────────────────────────────────────────────────────
create table if not exists public.strength_log (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  date         date not null,
  exercise     text not null,
  weight_lbs   numeric not null check (weight_lbs >= 0),
  reps         integer not null check (reps > 0),
  sets         integer not null check (sets > 0),
  created_at   timestamptz not null default now()
);

-- ── Goals ─────────────────────────────────────────────────────────────────
create table if not exists public.goals (
  id            text not null,
  user_id       uuid not null references auth.users(id) on delete cascade,
  title         text not null,
  target_value  numeric not null,
  current_value numeric not null,
  unit          text not null,
  category      text not null check (category in ('weight','strength','cardio','habit')),
  primary key (id, user_id)
);

-- ── Habit log ─────────────────────────────────────────────────────────────
create table if not exists public.habit_log (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  date         date not null,
  habits       jsonb not null default '[]',
  created_at   timestamptz not null default now(),
  unique (user_id, date)
);

-- ── Preferences ───────────────────────────────────────────────────────────
create table if not exists public.preferences (
  user_id      uuid primary key references auth.users(id) on delete cascade,
  workout_days jsonb not null default '["Monday","Wednesday","Friday"]',
  goal_mode    text not null default 'strength',
  budget_mode  boolean not null default false,
  updated_at   timestamptz not null default now()
);

-- ── Row Level Security ────────────────────────────────────────────────────
-- Each user can only read/write their own rows.

alter table public.profiles     enable row level security;
alter table public.weight_log   enable row level security;
alter table public.strength_log enable row level security;
alter table public.goals        enable row level security;
alter table public.habit_log    enable row level security;
alter table public.preferences  enable row level security;

-- profiles
create policy "Users manage own profile"
  on public.profiles for all
  using  (auth.uid() = id)
  with check (auth.uid() = id);

-- weight_log
create policy "Users manage own weight log"
  on public.weight_log for all
  using  (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- strength_log
create policy "Users manage own strength log"
  on public.strength_log for all
  using  (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- goals
create policy "Users manage own goals"
  on public.goals for all
  using  (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- habit_log
create policy "Users manage own habit log"
  on public.habit_log for all
  using  (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- preferences
create policy "Users manage own preferences"
  on public.preferences for all
  using  (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ── Indexes for common queries ────────────────────────────────────────────
create index if not exists idx_weight_log_user_date    on public.weight_log   (user_id, date desc);
create index if not exists idx_strength_log_user_date  on public.strength_log (user_id, date desc);
create index if not exists idx_habit_log_user_date     on public.habit_log    (user_id, date desc);
