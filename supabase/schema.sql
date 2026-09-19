-- Run this once in Supabase SQL Editor.
create table if not exists public.portfolio_content (
  locale text primary key check (locale in ('en', 'fr', 'de')),
  content jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.portfolio_content enable row level security;

drop policy if exists "Public can read portfolio content" on public.portfolio_content;
create policy "Public can read portfolio content"
  on public.portfolio_content for select
  using (true);

drop policy if exists "Authenticated owner can write portfolio content" on public.portfolio_content;
create policy "Authenticated owner can write portfolio content"
  on public.portfolio_content for all
  to authenticated
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

insert into storage.buckets (id, name, public)
values ('portfolio-assets', 'portfolio-assets', true)
on conflict (id) do update set public = true;

drop policy if exists "Public can view portfolio assets" on storage.objects;
create policy "Public can view portfolio assets"
  on storage.objects for select
  using (bucket_id = 'portfolio-assets');

drop policy if exists "Authenticated owner can upload portfolio assets" on storage.objects;
create policy "Authenticated owner can upload portfolio assets"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'portfolio-assets' and auth.uid() is not null);

drop policy if exists "Authenticated owner can update portfolio assets" on storage.objects;
create policy "Authenticated owner can update portfolio assets"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'portfolio-assets' and auth.uid() is not null)
  with check (bucket_id = 'portfolio-assets' and auth.uid() is not null);
