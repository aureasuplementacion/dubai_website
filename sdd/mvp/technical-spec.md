# Especificación técnica — Aura Estética

**Versión:** 0.2 — Escaparate de turismo sanitario y captación de leads
**Estado:** Base técnica reconvertida; pendiente de verificación de socios y despliegue de migración

## 1. Objetivo

Construir una aplicación bilingüe que presente especialidades, clínicas y profesionales asociados, convierta visitas en solicitudes de llamada y permita al equipo gestionar leads y contenido desde Supabase.

Aura actúa como coordinadora. El centro sanitario y el profesional responsable determinan diagnóstico, indicación, técnica, calendario y resultado.

## 2. Stack

- Next.js App Router, React, TypeScript y Tailwind CSS.
- `next-intl` para `/es` y `/en`.
- Supabase PostgreSQL, Auth, Storage y RLS.
- Server Actions para crear leads.
- Resend para notificar al equipo.
- WhatsApp mediante enlace configurable.

## 3. Experiencia pública

Rutas:

- `/[locale]`: propuesta de valor, especialidades y confianza.
- `/[locale]/especialidades`: listado de especialidades publicadas.
- `/[locale]/especialidades/[slug]`: servicios posibles, límites, proceso y CTA.
- `/[locale]/clinicas`: clínicas/profesionales verificados; vacío hasta disponer de socios.
- `/[locale]/como-funciona`: itinerario de orientación, valoración, viaje y seguimiento.
- `/[locale]/reservar`: formulario de solicitud de llamada.

El CTA principal es “Hablar con un asesor”. No hay carrito, precio público ni reserva automática de intervención.

## 4. Modelo de datos

La migración `202608180002_aura_leads_content.sql` añade:

- `specialties`: nombre, descripciones, orden y estado editorial.
- `specialty_services`: opciones informativas asociadas a una especialidad.
- `clinics`: centro, ciudad, unidad internacional, idiomas y verificación.
- `professionals`: profesional, clínica, especialidad, biografía e idiomas.
- `leads`: contacto, especialidad, preferencia de llamada, consentimiento, estado y responsable.
- `lead_notes`: notas internas.
- `lead_events`: historial de actividad.

Estados de contenido: `draft`, `review`, `verified`, `published`, `archived`.

Estados de lead: `new`, `contact_requested`, `called`, `qualified`, `awaiting_clinic_review`, `proposal_sent`, `travel_planned`, `completed`, `not_eligible`, `lost`, `cancelled`.

Las tablas `booking_*`, slots y catálogo antiguo se conservan para historial, pero no se consultan desde el nuevo flujo público.

## 5. Flujo de lead

1. La persona selecciona especialidad, datos de contacto y franja preferida.
2. Se valida el formulario con Zod y honeypot.
3. Se genera referencia `AURA-XXXXXXXX`.
4. Se persiste el lead en Supabase mediante REST server-side si hay credenciales configuradas.
5. Se envía email al equipo mediante Resend si está configurado.
6. La interfaz confirma la recepción de la solicitud, no un tratamiento ni una cita clínica.

El mensaje libre no debe solicitar fotografías ni informes médicos. Estos datos se pedirán posteriormente mediante un canal seguro si el caso lo requiere.

## 6. Seguridad

- `SUPABASE_SERVICE_ROLE_KEY` y `RESEND_API_KEY` solo en servidor.
- Leads, notas y eventos solo para usuarios administrativos autorizados mediante RLS.
- Contenido público únicamente si está en estado `published`.
- Clínicas y profesionales no verificados permanecen ocultos.
- Consentimiento separado para contacto.
- No incluir datos sensibles en analítica ni emails.
- Rate limiting y CAPTCHA pueden añadirse antes de campañas de tráfico significativo.

## 7. Administración

El panel debe evolucionar desde reservas hacia:

- Pipeline de leads.
- Estados, notas, responsables y próxima acción.
- Gestión de especialidades y servicios.
- Gestión de clínicas y profesionales.
- Verificación y publicación de contenido.
- Auditoría de cambios.

La pantalla administrativa actual muestra el pipeline inicial; las operaciones CRUD completas se incorporarán sobre las tablas nuevas.

## 8. Analítica

Eventos no sensibles:

- `specialty_viewed`
- `clinic_viewed`
- `professional_viewed`
- `lead_started`
- `lead_submitted`
- `call_requested`
- `whatsapp_clicked`

No enviar nombre, teléfono, email, mensaje, fotografías ni informes.

## 9. Variables de entorno

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
RESEND_API_KEY
RESEND_FROM_EMAIL
ADMIN_NOTIFICATION_EMAIL
NEXT_PUBLIC_WHATSAPP_NUMBER
NEXT_PUBLIC_SITE_URL
DEFAULT_LOCALE
```

## 10. Verificación

```bash
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run build
```

Antes de producción: aplicar la migración en Preview, verificar RLS, configurar el dominio de Resend, sustituir el WhatsApp provisional, validar textos legales y confirmar autorizaciones de cada clínica/profesional.
