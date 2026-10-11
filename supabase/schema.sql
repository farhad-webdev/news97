create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.news_articles (
  id uuid primary key default gen_random_uuid(),
  source text not null,
  source_url text not null unique,
  title text not null,
  excerpt text not null default '',
  image_url text,
  category_slug text not null default 'international',
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  imported_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists news_articles_public_feed_idx
  on public.news_articles (published_at desc)
  where status = 'published';

create index if not exists news_articles_drafts_idx
  on public.news_articles (imported_at desc)
  where status = 'draft';

alter table public.admin_users enable row level security;
alter table public.news_articles enable row level security;

drop policy if exists "Admins can read their own admin record" on public.admin_users;
create policy "Admins can read their own admin record"
  on public.admin_users for select to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists "Anyone can read published news" on public.news_articles;
create policy "Anyone can read published news"
  on public.news_articles for select to anon, authenticated
  using (status = 'published');

drop policy if exists "Admins can manage news" on public.news_articles;
create policy "Admins can manage news"
  on public.news_articles for all to authenticated
  using (
    exists (
      select 1 from public.admin_users
      where admin_users.user_id = (select auth.uid())
    )
  )
  with check (
    exists (
      select 1 from public.admin_users
      where admin_users.user_id = (select auth.uid())
    )
  );

grant select on public.admin_users to authenticated;
grant select on public.news_articles to anon, authenticated;
grant insert, update, delete on public.news_articles to authenticated;
