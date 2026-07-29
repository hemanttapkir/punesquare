-- Run this in the Supabase SQL Editor (Project > SQL Editor > New query)

create table if not exists projects (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  title        text not null,
  location     text not null,
  price        text not null,
  rera         text,
  description  text,
  images_url   text[],
  floor_plans  jsonb,
  amenities    text[],
  specs        text,
  landmarks    text[],
  lat          double precision,
  lng          double precision,
  created_at   timestamptz not null default now()
);

-- Allow the anon key to read/insert projects.
-- Adjust/tighten this later (e.g. require auth for inserts) once you have a login flow.
alter table projects enable row level security;

create policy "Public can read projects"
  on projects for select
  using (true);

create policy "Public can insert projects"
  on projects for insert
  with check (true);
