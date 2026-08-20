-- Content model extension: treatment-specific options managed from the admin panel.
create table public.specialty_service_options (
  id uuid primary key default gen_random_uuid(),
  specialty_service_id uuid not null references public.specialty_services(id) on delete cascade,
  slug text not null unique,
  name_es text not null,
  name_en text not null,
  summary_es text,
  summary_en text,
  status public.content_status not null default 'draft',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index specialty_service_options_lookup_idx on public.specialty_service_options (specialty_service_id, status, sort_order);
create trigger specialty_service_options_updated_at before update on public.specialty_service_options for each row execute function public.set_updated_at();

alter table public.specialty_service_options enable row level security;
create policy specialty_service_options_public_read on public.specialty_service_options for select to anon, authenticated
  using (status = 'published' and exists (select 1 from public.specialty_services s where s.id = specialty_service_id and s.status = 'published'));
create policy specialty_service_options_staff_manage on public.specialty_service_options for all to authenticated
  using (public.is_manager_or_admin()) with check (public.is_manager_or_admin());
