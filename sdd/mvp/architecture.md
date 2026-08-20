# Arquitectura vigente

> Esta arquitectura describe la evolución inicial. Para el estado real y las decisiones actuales, consultar [`auditoria-total.md`](./auditoria-total.md).

## Aplicación

Next.js App Router con rutas públicas en español/inglés, componentes React y server actions. El middleware combina internacionalización con renovación de sesiones Supabase y protección del panel.

## Datos

Supabase PostgreSQL contiene contenido publicado, clínicas, profesionales y leads. Las tablas de reservas/agendas de la primera etapa se conservan como legacy y no participan en el flujo público actual.

## Privacidad

Las lecturas públicas solo muestran contenido publicado mediante RLS. Leads, notas, eventos y perfiles requieren sesión autorizada. El service role se reserva a operaciones de servidor controladas.

## Integraciones

- OpenAI: chatbot server-side, sin persistencia de conversaciones.
- Resend: notificaciones opcionales cuando exista dominio verificado.
- Upstash Redis: rate limiting distribuido requerido en producción.
- Plausible y WhatsApp: integraciones opcionales y configurables mediante variables públicas no sensibles.
