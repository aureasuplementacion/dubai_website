create type public.editorial_field_type as enum ('text', 'textarea', 'richtext', 'url');

create table public.site_content (
  id uuid primary key default gen_random_uuid(),
  content_key text not null unique,
  page text not null,
  section text not null,
  label text not null,
  field_type public.editorial_field_type not null default 'text',
  value_es text,
  value_en text,
  status public.content_status not null default 'draft',
  sort_order integer not null default 0,
  updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.site_media (
  id uuid primary key default gen_random_uuid(),
  media_key text not null unique,
  page text not null,
  label text not null,
  path text not null,
  alt_es text,
  alt_en text,
  status public.content_status not null default 'draft',
  sort_order integer not null default 0,
  updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index site_content_page_status_idx on public.site_content (page, status, sort_order);
create index site_media_page_status_idx on public.site_media (page, status, sort_order);
create trigger site_content_updated_at before update on public.site_content for each row execute function public.set_updated_at();
create trigger site_media_updated_at before update on public.site_media for each row execute function public.set_updated_at();

alter table public.site_content enable row level security;
alter table public.site_media enable row level security;
create policy site_content_public_read on public.site_content for select to anon, authenticated using (status = 'published');
create policy site_content_staff_manage on public.site_content for all to authenticated using (public.is_manager_or_admin()) with check (public.is_manager_or_admin());
create policy site_media_public_read on public.site_media for select to anon, authenticated using (status = 'published');
create policy site_media_staff_manage on public.site_media for all to authenticated using (public.is_manager_or_admin()) with check (public.is_manager_or_admin());
