create extension if not exists pgcrypto;

create type public.user_role as enum ('admin', 'manager');
create type public.media_type as enum ('image');
create type public.slot_status as enum ('available', 'held', 'booked', 'blocked');
create type public.booking_status as enum ('pending', 'contacted', 'confirmed', 'completed', 'cancelled');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  role public.user_role not null default 'manager',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.locations (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  address text,
  city text not null,
  country text not null,
  timezone text not null default 'Asia/Dubai',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name_es text not null,
  name_en text not null,
  slug text not null unique,
  description_es text,
  description_en text,
  sort_order integer not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.services (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories(id) on delete restrict,
  name_es text not null,
  name_en text not null,
  slug text not null unique,
  description_es text,
  description_en text,
  benefits_es text[] not null default '{}',
  benefits_en text[] not null default '{}',
  duration_minutes integer not null check (duration_minutes > 0),
  reference_price numeric(10,2) not null check (reference_price >= 0),
  currency text not null default 'EUR' check (char_length(currency) = 3),
  video_url text,
  sort_order integer not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.service_media (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.services(id) on delete cascade,
  storage_path text not null unique,
  media_type public.media_type not null default 'image',
  alt_text_es text,
  alt_text_en text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.availability_settings (
  id uuid primary key default gen_random_uuid(),
  location_id uuid not null references public.locations(id) on delete cascade,
  weekday smallint not null check (weekday between 0 and 6),
  start_time time not null,
  end_time time not null,
  slot_duration_minutes integer not null default 30 check (slot_duration_minutes between 5 and 480),
  is_active boolean not null default true,
  unique (location_id, weekday)
);

create table public.booking_slots (
  id uuid primary key default gen_random_uuid(),
  location_id uuid not null references public.locations(id) on delete cascade,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status public.slot_status not null default 'available',
  hold_expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_at > starts_at),
  unique (location_id, starts_at)
);

create table public.booking_requests (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_phone text not null,
  customer_email text not null,
  service_id uuid not null references public.services(id) on delete restrict,
  location_id uuid not null references public.locations(id) on delete restrict,
  slot_id uuid references public.booking_slots(id) on delete set null,
  preferred_date date not null,
  preferred_time time not null,
  message text,
  transport_requested boolean not null default false,
  status public.booking_status not null default 'pending',
  hold_expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.booking_attachments (
  id uuid primary key default gen_random_uuid(),
  booking_request_id uuid not null references public.booking_requests(id) on delete cascade,
  storage_path text not null unique,
  original_name text not null,
  mime_type text not null,
  size_bytes bigint not null check (size_bytes > 0),
  created_at timestamptz not null default now()
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create index services_category_visible_idx on public.services (category_id, is_visible, sort_order);
create index service_media_service_idx on public.service_media (service_id, sort_order);
create index booking_slots_lookup_idx on public.booking_slots (location_id, starts_at, status);
create index booking_requests_status_idx on public.booking_requests (status, created_at desc);
create index booking_attachments_request_idx on public.booking_attachments (booking_request_id);

create or replace function public.set_updated_at()
returns trigger language plpgsql security invoker set search_path = public as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger locations_updated_at before update on public.locations for each row execute function public.set_updated_at();
create trigger categories_updated_at before update on public.categories for each row execute function public.set_updated_at();
create trigger services_updated_at before update on public.services for each row execute function public.set_updated_at();
create trigger booking_slots_updated_at before update on public.booking_slots for each row execute function public.set_updated_at();
create trigger booking_requests_updated_at before update on public.booking_requests for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, new.raw_user_meta_data ->> 'full_name', new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin' and is_active);
$$;

create or replace function public.is_manager_or_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'manager') and is_active);
$$;

alter table public.profiles enable row level security;
alter table public.locations enable row level security;
alter table public.categories enable row level security;
alter table public.services enable row level security;
alter table public.service_media enable row level security;
alter table public.availability_settings enable row level security;
alter table public.booking_slots enable row level security;
alter table public.booking_requests enable row level security;
alter table public.booking_attachments enable row level security;
alter table public.audit_logs enable row level security;

create policy profiles_self_read on public.profiles for select to authenticated using (id = auth.uid() or public.is_admin());
create policy profiles_admin_manage on public.profiles for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy locations_public_read on public.locations for select to anon, authenticated using (is_active);
create policy locations_staff_manage on public.locations for all to authenticated using (public.is_manager_or_admin()) with check (public.is_manager_or_admin());

create policy categories_public_read on public.categories for select to anon, authenticated using (is_visible);
create policy categories_staff_read on public.categories for select to authenticated using (public.is_manager_or_admin());
create policy categories_staff_manage on public.categories for all to authenticated using (public.is_manager_or_admin()) with check (public.is_manager_or_admin());

create policy services_public_read on public.services for select to anon, authenticated using (is_visible);
create policy services_staff_read on public.services for select to authenticated using (public.is_manager_or_admin());
create policy services_staff_manage on public.services for all to authenticated using (public.is_manager_or_admin()) with check (public.is_manager_or_admin());

create policy service_media_public_read on public.service_media for select to anon, authenticated using (exists (select 1 from public.services s where s.id = service_id and s.is_visible));
create policy service_media_staff_manage on public.service_media for all to authenticated using (public.is_manager_or_admin()) with check (public.is_manager_or_admin());

create policy availability_staff_manage on public.availability_settings for all to authenticated using (public.is_manager_or_admin()) with check (public.is_manager_or_admin());
create policy slots_staff_manage on public.booking_slots for all to authenticated using (public.is_manager_or_admin()) with check (public.is_manager_or_admin());
create policy requests_staff_manage on public.booking_requests for all to authenticated using (public.is_manager_or_admin()) with check (public.is_manager_or_admin());
create policy attachments_staff_manage on public.booking_attachments for all to authenticated using (public.is_manager_or_admin()) with check (public.is_manager_or_admin());
create policy audit_staff_read on public.audit_logs for select to authenticated using (public.is_manager_or_admin());
create policy audit_staff_insert on public.audit_logs for insert to authenticated with check (public.is_manager_or_admin());

insert into storage.buckets (id, name, public)
values ('service-images', 'service-images', true), ('booking-attachments', 'booking-attachments', false)
on conflict (id) do update set public = excluded.public;

create policy service_images_public_read on storage.objects for select to anon, authenticated using (bucket_id = 'service-images');
create policy service_images_staff_insert on storage.objects for insert to authenticated with check (bucket_id = 'service-images' and public.is_manager_or_admin());
create policy service_images_staff_update on storage.objects for update to authenticated using (bucket_id = 'service-images' and public.is_manager_or_admin()) with check (bucket_id = 'service-images' and public.is_manager_or_admin());
create policy service_images_staff_delete on storage.objects for delete to authenticated using (bucket_id = 'service-images' and public.is_manager_or_admin());
create policy booking_attachments_staff_read on storage.objects for select to authenticated using (bucket_id = 'booking-attachments' and public.is_manager_or_admin());
create policy booking_attachments_staff_insert on storage.objects for insert to authenticated with check (bucket_id = 'booking-attachments' and public.is_manager_or_admin());
create policy booking_attachments_staff_delete on storage.objects for delete to authenticated using (bucket_id = 'booking-attachments' and public.is_manager_or_admin());
