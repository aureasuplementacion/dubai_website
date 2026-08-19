# Aura Estética

MVP bilingüe para el escaparate de turismo sanitario y coordinación de tratamientos en Turquía para pacientes españolas.

Aura se presenta como marca coordinadora: ofrece orientación, conecta con centros/profesionales y ayuda a organizar la logística. No diagnostica ni sustituye al equipo sanitario.

## Desarrollo local

```bash
npm install
copy .env.example .env.local
npm.cmd run dev
```

## Rutas principales

- `/es` y `/en`: home bilingüe.
- `/es/especialidades` y `/en/especialidades`: especialidades publicadas.
- `/es/especialidades/[slug]`: detalle de especialidad.
- `/es/clinicas` y `/en/clinicas`: red de clínicas en verificación.
- `/es/como-funciona` y `/en/como-funciona`: proceso de acompañamiento.
- `/es/reservar` y `/en/reservar`: solicitud de llamada, no reserva de tratamiento.
- `/admin/login` y `/admin/dashboard`: acceso y panel operativo inicial.
- `/api/health`: comprobación básica del servicio.

## Modelo actual

- Especialidades iniciales: capilar, odontología y cirugía estética/corporal.
- Sin precios públicos ni reserva automática de intervenciones.
- Leads persistidos en Supabase cuando las variables de entorno están disponibles.
- Notificación de nuevos leads mediante Resend cuando está configurado.
- Clínicas y profesionales preparados en el esquema, pero ocultos hasta verificación.
- El formulario inicial no recoge fotografías ni informes médicos.

## Comprobaciones

```bash
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run build
```

La migración `supabase/migrations/202608180002_aura_leads_content.sql` añade especialidades, servicios editoriales, clínicas, profesionales, leads, notas, eventos y políticas RLS. Las tablas antiguas de reservas se conservan como historial y ya no forman parte del flujo público.

Los textos de referencia se encuentran en `sdd/mvp/textos-especialidades.md` y la dirección de experiencia en `sdd/mvp/design-reference.md`.
