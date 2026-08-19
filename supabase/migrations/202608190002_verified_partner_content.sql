create type public.partner_type as enum ('hospital', 'hotel', 'transport');

create table public.travel_partners (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  partner_type public.partner_type not null,
  name text not null,
  short_description_es text not null,
  short_description_en text not null,
  description_es text,
  description_en text,
  address text,
  city text,
  country text not null default 'Türkiye',
  contact_email text,
  contact_phone text,
  website_url text,
  verification_status public.content_status not null default 'draft',
  last_verified date,
  source_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.partner_services (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references public.travel_partners(id) on delete cascade,
  slug text not null unique,
  name_es text not null,
  name_en text not null,
  description_es text,
  description_en text,
  availability_note_es text,
  availability_note_en text,
  verification_status public.content_status not null default 'draft',
  sort_order integer not null default 0
);

create table public.accommodation_options (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references public.travel_partners(id) on delete cascade,
  slug text not null unique,
  name_es text not null,
  name_en text not null,
  size_m2 numeric(6,2),
  bed_es text,
  bed_en text,
  amenities_es text[] not null default '{}',
  amenities_en text[] not null default '{}',
  verification_status public.content_status not null default 'draft',
  sort_order integer not null default 0
);

create table public.transport_options (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid references public.travel_partners(id) on delete set null,
  name_es text not null,
  name_en text not null,
  vehicle_description_es text,
  vehicle_description_en text,
  capacity smallint,
  luggage_notes_es text,
  luggage_notes_en text,
  conditions_es text,
  conditions_en text,
  verification_status public.content_status not null default 'draft',
  sort_order integer not null default 0
);

create index travel_partners_status_idx on public.travel_partners (verification_status, partner_type, sort_order);
create index partner_services_partner_idx on public.partner_services (partner_id, verification_status, sort_order);
create index accommodation_partner_idx on public.accommodation_options (partner_id, verification_status, sort_order);
create index transport_status_idx on public.transport_options (verification_status, sort_order);

create trigger travel_partners_updated_at before update on public.travel_partners for each row execute function public.set_updated_at();

alter table public.travel_partners enable row level security;
alter table public.partner_services enable row level security;
alter table public.accommodation_options enable row level security;
alter table public.transport_options enable row level security;

create policy travel_partners_public_read on public.travel_partners for select to anon, authenticated using (verification_status = 'published');
create policy travel_partners_staff_manage on public.travel_partners for all to authenticated using (public.is_manager_or_admin()) with check (public.is_manager_or_admin());
create policy partner_services_public_read on public.partner_services for select to anon, authenticated using (verification_status = 'published' and exists (select 1 from public.travel_partners p where p.id = partner_id and p.verification_status = 'published'));
create policy partner_services_staff_manage on public.partner_services for all to authenticated using (public.is_manager_or_admin()) with check (public.is_manager_or_admin());
create policy accommodation_public_read on public.accommodation_options for select to anon, authenticated using (verification_status = 'published' and exists (select 1 from public.travel_partners p where p.id = partner_id and p.verification_status = 'published'));
create policy accommodation_staff_manage on public.accommodation_options for all to authenticated using (public.is_manager_or_admin()) with check (public.is_manager_or_admin());
create policy transport_public_read on public.transport_options for select to anon, authenticated using (verification_status = 'published');
create policy transport_staff_manage on public.transport_options for all to authenticated using (public.is_manager_or_admin()) with check (public.is_manager_or_admin());

update public.specialties set status = case when slug in ('capilar', 'odontologia', 'estetica', 'bariatrica', 'oftalmologia') then 'published' else 'draft' end;

insert into public.travel_partners (slug, partner_type, name, short_description_es, short_description_en, description_es, description_en, address, city, country, contact_email, contact_phone, website_url, verification_status, last_verified, source_url, sort_order)
values
('bht-clinic', 'hospital', 'BHT CLINIC Istanbul Tema Hospital', 'Grupo hospitalario de Estambul con atención internacional en cinco áreas.', 'Istanbul hospital group with international care across five areas.', 'Cirugía estética, obesidad y metabolismo, odontología, visión y restauración capilar, siempre sujetos a valoración del equipo sanitario responsable.', 'Aesthetic surgery, obesity and metabolic care, dentistry, vision and hair restoration, always subject to assessment by the responsible healthcare team.', 'Atatürk Mah. Aşina Sok. No:38/2, Küçükçekmece / İstanbul', 'Istanbul', 'Türkiye', 'info@bhtclinicturkey.com', '+90 552 980 28 52', 'https://international.bhtclinic.com.tr/lang/es', 'published', '2026-08-19', 'https://international.bhtclinic.com.tr/lang/en', 10),
('the-g-hotels-istanbul', 'hotel', 'The G Hotels Istanbul', 'Alojamiento urbano en Basın Ekspres con habitaciones, restauración, spa y servicios de huésped.', 'Urban accommodation in Basın Ekspres with rooms, dining, spa and guest services.', 'Una base cómoda y conectada para una estancia en Estambul. Categoría, noches y régimen dependen de la propuesta confirmada.', 'A comfortable, connected base for a stay in Istanbul. Room category, nights and board depend on the confirmed proposal.', 'Bağlar Mahallesi, Mimar Sinan Caddesi, No:35, 34209, Bağcılar / İstanbul', 'Istanbul', 'Türkiye', 'info@theghotels.com.tr', null, 'https://theghotelsistanbul.com/', 'published', '2026-08-19', 'https://theghotelsistanbul.com/', 20),
('aura-luxury-transport', 'transport', 'Transporte privado Aura', 'Traslados privados en vehículo de lujo según el itinerario confirmado.', 'Private transfers in a luxury vehicle according to the confirmed itinerary.', 'Servicio de transporte de lujo para los desplazamientos coordinados entre aeropuerto, hotel y centro sanitario.', 'Luxury transport for coordinated transfers between airport, hotel and healthcare centre.', null, 'Istanbul', 'Türkiye', null, null, null, 'published', '2026-08-19', null, 30)
on conflict (slug) do update set name = excluded.name, short_description_es = excluded.short_description_es, short_description_en = excluded.short_description_en, description_es = excluded.description_es, description_en = excluded.description_en, verification_status = excluded.verification_status, last_verified = excluded.last_verified, updated_at = now();

insert into public.partner_services (partner_id, slug, name_es, name_en, description_es, description_en, verification_status, sort_order)
select p.id, v.slug, v.name_es, v.name_en, v.description_es, v.description_en, 'published', v.sort_order from public.travel_partners p cross join (values
('bht-clinic','cirugia-estetica','Cirugía estética y plástica','Aesthetic and plastic surgery','Rinoplastia, cirugía mamaria, mommy makeover, abdominoplastia y lifting facial o cervical según valoración.','Rhinoplasty, breast surgery, mommy makeover, tummy tuck and face or neck lift after assessment.',10),
('bht-clinic','obesidad-metabolismo','Obesidad y metabolismo','Obesity and metabolic care','Cirugía bariátrica con seguimiento dietético y metabólico según el centro.','Bariatric surgery with dietetic and metabolic follow-up according to the centre.',20),
('bht-clinic','dental-sonrisa','Dental y diseño de sonrisa','Dental and smile design','Coronas, carillas e implantes sujetos a diagnóstico odontológico.','Crowns, veneers and implants subject to dental diagnosis.',30),
('bht-clinic','vision','Ojo y visión','Eye and vision','Cirugía refractiva y de lentes después de una exploración ocular completa.','Refractive and lens surgery after a full eye examination.',40),
('bht-clinic','restauracion-capilar','Restauración capilar','Hair restoration','Opciones FUE y DHI sujetas a valoración profesional.','FUE and DHI options subject to professional assessment.',50)
) as v(partner_slug, slug, name_es, name_en, description_es, description_en, sort_order) where p.slug = v.partner_slug on conflict (slug) do nothing;

insert into public.accommodation_options (partner_id, slug, name_es, name_en, size_m2, bed_es, bed_en, amenities_es, amenities_en, verification_status, sort_order)
select p.id, v.slug, v.name_es, v.name_en, v.size_m2, v.bed_es, v.bed_en, v.amenities_es, v.amenities_en, 'published', v.sort_order from public.travel_partners p cross join (values
('the-g-hotels-istanbul','superior-room','Superior Room','Superior Room',27,'1 cama King','1 King bed',array['Teléfono de baño','TV LCD','Minibar','Caja fuerte','Zona de estar','Secador','Wi-Fi','TV vía satélite'],array['Bathroom phone','LCD TV','Minibar','Safe','Seating area','Hairdryer','Wi-Fi','Satellite TV'],10),
('the-g-hotels-istanbul','deluxe-room','Deluxe Room','Deluxe Room',34,'1 cama King','1 King bed',array['TV LCD','Aire acondicionado','Minibar','Caja fuerte','Zona de estar','Secador','Wi-Fi','TV vía satélite'],array['LCD TV','Air conditioning','Minibar','Safe','Seating area','Hairdryer','Wi-Fi','Satellite TV'],20),
('the-g-hotels-istanbul','junior-suite','Junior Suite','Junior Suite',42,'1 cama King','1 King bed',array['TV LCD','Aire acondicionado','Minibar','Caja fuerte','Zona de estar','Secador','Wi-Fi','TV vía satélite'],array['LCD TV','Air conditioning','Minibar','Safe','Seating area','Hairdryer','Wi-Fi','Satellite TV'],30),
('the-g-hotels-istanbul','corner-suite','Corner Suite','Corner Suite',48,'1 cama King','1 King bed',array['TV LCD','Aire acondicionado','Minibar','Caja fuerte','Zona de estar','Secador','Wi-Fi','TV vía satélite'],array['LCD TV','Air conditioning','Minibar','Safe','Seating area','Hairdryer','Wi-Fi','Satellite TV'],40)
) as v(partner_slug, slug, name_es, name_en, size_m2, bed_es, bed_en, amenities_es, amenities_en, sort_order) where p.slug = v.partner_slug on conflict (slug) do nothing;

insert into public.transport_options (partner_id, name_es, name_en, vehicle_description_es, vehicle_description_en, verification_status, sort_order)
select p.id, 'Vehículo privado de lujo', 'Private luxury vehicle', 'Traslados entre aeropuerto, hotel y centro sanitario según itinerario confirmado.', 'Transfers between airport, hotel and healthcare centre according to the confirmed itinerary.', 'published', 10 from public.travel_partners p where p.slug = 'aura-luxury-transport' and not exists (select 1 from public.transport_options t where t.name_es = 'Vehículo privado de lujo');
