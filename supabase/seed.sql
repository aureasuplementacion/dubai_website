-- Demo content only. Never add real customer data or admin credentials here.

insert into public.locations (name, address, city, country, timezone)
values ('Aura Estética · Demo', 'Ubicación provisional', 'Dubai', 'United Arab Emirates', 'Asia/Dubai')
on conflict do nothing;

insert into public.categories (name_es, name_en, slug, description_es, description_en, sort_order)
values
  ('Tratamientos faciales', 'Facial treatments', 'faciales', 'Rituales de cuidado y luminosidad.', 'Care rituals for a fresh, luminous feel.', 1),
  ('Tratamientos corporales', 'Body treatments', 'corporales', 'Experiencias corporales personalizadas.', 'Personalised body experiences.', 2),
  ('Cuidado personal', 'Personal care', 'cuidado-personal', 'Momentos de bienestar para ti.', 'Wellbeing moments made for you.', 3),
  ('Transporte', 'Transport', 'transporte', 'Asistencia de transporte provisional.', 'Provisional transport assistance.', 4)
on conflict (slug) do update set name_es = excluded.name_es, name_en = excluded.name_en, is_visible = true;

insert into public.services (category_id, name_es, name_en, slug, description_es, description_en, benefits_es, benefits_en, duration_minutes, reference_price, currency, sort_order)
select id, 'Ritual facial luminoso', 'Luminous facial ritual', 'ritual-facial-luminoso', 'Una experiencia serena para cuidar y revitalizar tu piel.', 'A calm experience to care for and revitalise your skin.', array['Piel más suave', 'Momento de relajación'], array['Softer-looking skin', 'A moment to relax'], 60, 95, 'EUR', 1 from public.categories where slug = 'faciales'
on conflict (slug) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, reference_price = excluded.reference_price, is_visible = true;

insert into public.services (category_id, name_es, name_en, slug, description_es, description_en, benefits_es, benefits_en, duration_minutes, reference_price, currency, sort_order)
select id, 'Masaje bienestar', 'Wellbeing massage', 'masaje-bienestar', 'Un espacio para bajar el ritmo y reconectar contigo.', 'A space to slow down and reconnect with yourself.', array['Relajación profunda', 'Atención personalizada'], array['Deep relaxation', 'Personalised care'], 50, 80, 'EUR', 2 from public.categories where slug = 'cuidado-personal'
on conflict (slug) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, reference_price = excluded.reference_price, is_visible = true;

insert into public.services (category_id, name_es, name_en, slug, description_es, description_en, benefits_es, benefits_en, duration_minutes, reference_price, currency, sort_order)
select id, 'Experiencia corporal', 'Body experience', 'experiencia-corporal', 'Tratamiento corporal pensado para acompañar tu bienestar.', 'A body treatment designed to support your wellbeing.', array['Cuidado integral', 'Ritmo personalizado'], array['Whole-body care', 'Personalised pace'], 75, 120, 'EUR', 3 from public.categories where slug = 'corporales'
on conflict (slug) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, reference_price = excluded.reference_price, is_visible = true;

insert into public.availability_settings (location_id, weekday, start_time, end_time, slot_duration_minutes)
select id, weekday, '09:00', '18:00', 30 from public.locations cross join generate_series(1, 6) as weekday
on conflict (location_id, weekday) do update set start_time = excluded.start_time, end_time = excluded.end_time, is_active = true;
