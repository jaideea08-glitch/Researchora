-- Supabase schema for Researchora
-- Create this table in the Supabase SQL editor or via the Supabase CLI

create table if not exists posts (
  id uuid default uuid_generate_v4() primary key,
  author text not null,
  role text not null,
  title text not null,
  body text not null,
  stats text not null,
  created_at timestamptz default now()
);

create table if not exists profiles (
  id uuid primary key,
  email text not null unique,
  full_name text,
  role text,
  created_at timestamptz default now()
);

create table if not exists ai_conversations (
  user_id uuid primary key references profiles(id) on delete cascade,
  messages jsonb not null default '[]'::jsonb,
  updated_at timestamptz default now()
);
