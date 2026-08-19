create type public.content_status as enum ('draft', 'review', 'verified', 'published', 'archived');
create type public.lead_status as enum ('new', 'contact_requested', 'called', 'qualified', 'awaiting_clinic_review', 'proposal_sent', 'travel_planned', 'completed', 'not_eligible', 'lost', 'cancelled');

create table public.specialties (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_es text not null,
  name_en text not null,
  short_description_es text not null,
  short_description_en text not null,
  description_es text,
  description_en text,
  status public.content_status not null default 'draft',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.specialty_services (
  id uuid primary key default gen_random_uuid(),
  specialty_id uuid not null references public.specialties(id) on delete cascade,
  slug text not null unique,
  name_es text not null,
  name_en text not null,
  description_es text,
  description_en text,
  status public.content_status not null default 'draft',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.clinics (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  legal_name text,
  city text not null,
  country text not null default 'Türkiye',
  address text,
  description_es text,
  description_en text,
  international_unit text,
  languages text[] not null default '{}',
  authorization_reference text,
  verification_notes text,
  status public.content_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.professionals (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid not null references public.clinics(id) on delete cascade,
  full_name text not null,
  specialty text not null,
  title text,
  bio_es text,
  bio_en text,
  languages text[] not null default '{}',
  status public.content_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique default ('AURA-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8))),
  customer_name text not null,
  customer_phone text not null,
  customer_email text not null,
  specialty_id uuid references public.specialties(id) on delete set null,
  preferred_date date,
  preferred_time_start time,
  preferred_time_end time,
  companion boolean not null default false,
  message text,
  consent_contact boolean not null default false,
  locale text not null default 'es' check (locale in ('es', 'en')),
  source text,
  status public.lead_status not null default 'new',
  assigned_to uuid references public.profiles(id) on delete set null,
  next_action_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.lead_notes (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  author_id uuid references public.profiles(id) on delete set null,
  note text not null,
  created_at timestamptz not null default now()
);

create table public.lead_events (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  actor_id uuid references public.profiles(id) on delete set null,
  event_type text not null,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create index specialty_services_specialty_idx on public.specialty_services (specialty_id, status, sort_order);
create index clinics_status_idx on public.clinics (status, city);
create index professionals_clinic_idx on public.professionals (clinic_id, status);
create index leads_pipeline_idx on public.leads (status, created_at desc);
create index lead_notes_lead_idx on public.lead_notes (lead_id, created_at desc);
create index lead_events_lead_idx on public.lead_events (lead_id, created_at desc);

create trigger specialties_updated_at before update on public.specialties for each row execute function public.set_updated_at();
create trigger specialty_services_updated_at before update on public.specialty_services for each row execute function public.set_updated_at();
create trigger clinics_updated_at before update on public.clinics for each row execute function public.set_updated_at();
create trigger professionals_updated_at before update on public.professionals for each row execute function public.set_updated_at();
create trigger leads_updated_at before update on public.leads for each row execute function public.set_updated_at();

alter table public.specialties enable row level security;
alter table public.specialty_services enable row level security;
alter table public.clinics enable row level security;
alter table public.professionals enable row level security;
alter table public.leads enable row level security;
alter table public.lead_notes enable row level security;
alter table public.lead_events enable row level security;

create policy specialties_public_read on public.specialties for select to anon, authenticated using (status = 'published');
create policy specialties_staff_manage on public.specialties for all to authenticated using (public.is_manager_or_admin()) with check (public.is_manager_or_admin());
create policy specialty_services_public_read on public.specialty_services for select to anon, authenticated using (status = 'published' and exists (select 1 from public.specialties s where s.id = specialty_id and s.status = 'published'));
create policy specialty_services_staff_manage on public.specialty_services for all to authenticated using (public.is_manager_or_admin()) with check (public.is_manager_or_admin());
create policy clinics_public_read on public.clinics for select to anon, authenticated using (status = 'published');
create policy clinics_staff_manage on public.clinics for all to authenticated using (public.is_manager_or_admin()) with check (public.is_manager_or_admin());
create policy professionals_public_read on public.professionals for select to anon, authenticated using (status = 'published' and exists (select 1 from public.clinics c where c.id = clinic_id and c.status = 'published'));
create policy professionals_staff_manage on public.professionals for all to authenticated using (public.is_manager_or_admin()) with check (public.is_manager_or_admin());
create policy leads_staff_manage on public.leads for all to authenticated using (public.is_manager_or_admin()) with check (public.is_manager_or_admin());
create policy lead_notes_staff_manage on public.lead_notes for all to authenticated using (public.is_manager_or_admin()) with check (public.is_manager_or_admin());
create policy lead_events_staff_manage on public.lead_events for all to authenticated using (public.is_manager_or_admin()) with check (public.is_manager_or_admin());

insert into public.specialties (slug, name_es, name_en, short_description_es, short_description_en, description_es, description_en, status, sort_order)
values
('capilar', 'Capilar y cuero cabelludo', 'Hair and scalp', 'Valoración capilar y coordinación de trasplante de cabello, barba o cejas.', 'Hair assessment and coordination for hair, beard or eyebrow restoration.', 'Te ayudamos a conocer tus opciones y organizar una valoración profesional antes de viajar.', 'We help you understand your options and organise a professional assessment before travelling.', 'published', 10),
('odontologia', 'Odontología', 'Dentistry', 'Tratamientos dentales coordinados con clínicas especializadas.', 'Dental treatments coordinated with specialised clinics.', 'Desde una primera valoración hasta rehabilitaciones dentales por fases, con información clara sobre el proceso.', 'From an initial assessment to phased dental rehabilitation, with clear information about the process.', 'published', 20),
('estetica', 'Cirugía estética y corporal', 'Aesthetic and body surgery', 'Información y coordinación para decisiones estéticas importantes.', 'Information and coordination for important aesthetic decisions.', 'Conoce opciones, profesionales, preparación y seguimiento antes de tomar una decisión.', 'Learn about options, professionals, preparation and follow-up before making a decision.', 'published', 30),
('dermatologia', 'Dermatología y medicina estética', 'Dermatology and aesthetic medicine', 'Opciones para cuidar la piel con una valoración profesional.', 'Options for skin care with a professional assessment.', 'Conoce tratamientos para piel, rostro y calidad cutánea, siempre después de una valoración especializada.', 'Explore options for skin, face and skin quality after a specialist assessment.', 'published', 40),
('bariatrica', 'Bariátrica y metabolismo', 'Bariatric and metabolic care', 'Un proceso de salud que empieza antes de viajar.', 'A healthcare process that starts before you travel.', 'Coordinamos una primera orientación sobre cirugía bariátrica, preparación y seguimiento disponible.', 'We coordinate an initial conversation about bariatric surgery, preparation and available follow-up.', 'published', 50),
('oftalmologia', 'Oftalmología', 'Ophthalmology', 'Estudios visuales y opciones oftalmológicas coordinadas.', 'Coordinated vision assessments and ophthalmology options.', 'Te ayudamos a conocer opciones de cirugía refractiva y otros tratamientos visuales disponibles.', 'We help you explore refractive surgery and other available vision treatments.', 'published', 60),
('fertilidad', 'Fertilidad y salud de la mujer', 'Fertility and women’s health', 'Acompañamiento sensible para decisiones importantes.', 'Sensitive support for important decisions.', 'Coordinamos una primera orientación con centros especializados en fertilidad y reproducción asistida.', 'We coordinate an initial conversation with fertility and assisted reproduction specialists.', 'published', 70)
on conflict (slug) do nothing;

insert into public.specialty_services (specialty_id, slug, name_es, name_en, description_es, description_en, status, sort_order)
select s.id, v.service_slug, v.name_es, v.name_en, v.description_es, v.description_en, 'published', v.sort_order
from public.specialties s
cross join (values
  ('capilar', 'trasplante-capilar', 'Trasplante capilar', 'Hair transplant', 'Valoración y coordinación de un plan capilar sujeto a evaluación médica.', 'Assessment and coordination of a hair plan subject to medical evaluation.', 10),
  ('capilar', 'trasplante-barba-cejas', 'Trasplante de barba y cejas', 'Beard and eyebrow transplant', 'Opciones de restauración capilar para barba o cejas cuando el centro las ofrezca.', 'Hair restoration options for beard or eyebrows when offered by the clinic.', 20),
  ('odontologia', 'implantes-rehabilitacion', 'Implantes y rehabilitación dental', 'Implants and dental rehabilitation', 'Soluciones dentales por fases, siempre después de un diagnóstico completo.', 'Phased dental solutions, always after a complete diagnosis.', 10),
  ('odontologia', 'estetica-dental', 'Estética dental', 'Cosmetic dentistry', 'Carillas, coronas y otras alternativas según la valoración odontológica.', 'Veneers, crowns and other options according to the dental assessment.', 20),
  ('estetica', 'cirugia-facial', 'Cirugía facial', 'Facial surgery', 'Rinoplastia, blefaroplastia y otras opciones sujetas a valoración del cirujano.', 'Rhinoplasty, blepharoplasty and other options subject to the surgeon assessment.', 10),
  ('estetica', 'cirugia-corporal', 'Cirugía corporal', 'Body surgery', 'Opciones de remodelación corporal que requieren estudio clínico y plan de recuperación.', 'Body contouring options requiring clinical assessment and a recovery plan.', 20),
  ('estetica', 'cirugia-mamaria', 'Cirugía mamaria', 'Breast surgery', 'Aumento, reducción o elevación cuando el equipo médico lo considere adecuado.', 'Augmentation, reduction or lift when considered appropriate by the medical team.', 30)
) as v(specialty_slug, service_slug, name_es, name_en, description_es, description_en, sort_order)
where s.slug = v.specialty_slug
on conflict (slug) do nothing;
