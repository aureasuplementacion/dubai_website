# Pendientes del proyecto — Aura Estética

**Fecha de revisión:** 20 de agosto de 2026  
**Estado:** Frontend visual cerrado · Fase 4 implementada en local · Pendiente de validación externa y preparación de producción

## Estado actual

- El frontend premium, la arquitectura pública y la navegación principal están implementados.
- El chatbot de Aura funciona con OpenAI y no persiste conversaciones.
- El formulario de solicitud guarda leads en Supabase.
- Resend envía confirmación al cliente y aviso interno; este flujo ya ha sido probado correctamente.
- Telegram está configurado como canal temporal mediante `@sebasti22`.
- WhatsApp queda preparado, pero no está activo porque todavía no existe un número comercial configurado.
- TypeScript, ESLint, build de producción y detector visual pasan correctamente.
- Las migraciones y la base de datos de Preview existen, pero todavía falta completar las pruebas operativas y de seguridad.
- Los cambios de Fase 4 todavía están pendientes de commit.

## Prioridad P0 — Antes de considerar estable el Preview

- [ ] Crear el commit de cierre de Fase 4 y comprobar que el árbol Git queda limpio.
- [ ] Reiniciar el servidor después de cada cambio de variables y confirmar que `.env.local` no contiene duplicados.
- [ ] Probar el formulario completo en Preview desplegado, no solo en localhost.
- [ ] Confirmar que el lead aparece en Supabase con estado `new` y evento `lead_created`.
- [ ] Confirmar en Preview la recepción del email del cliente y del aviso interno.
- [ ] Probar el chatbot con una petición informativa y con “quiero hablar con un asesor”.
- [ ] Probar el desvío de Telegram desde el botón flotante, contacto y chatbot.
- [ ] Comprobar Telegram en un navegador sin Telegram Desktop y, cuando haya disponibilidad, en móvil Android/iOS.
- [ ] Confirmar que el botón del chatbot no tapa Telegram ni el CTA móvil inferior en los tamaños principales.
- [ ] Verificar en Vercel Preview que estén configuradas las variables de Supabase, OpenAI, Resend y Telegram.
- [ ] Confirmar que las cabeceras de seguridad y las rutas localizadas funcionan en el despliegue.

## Prioridad P1 — Seguridad y producción

- [ ] Rotar cualquier token que haya sido compartido fuera del gestor de secretos.
- [ ] Configurar Upstash Redis para sustituir el rate limiting en memoria antes de producción. Preview puede usar el fallback aislado.
- [ ] Ejecutar pruebas RLS con los roles `anon`, `authenticated`, `manager` y `admin`.
- [ ] Confirmar las URLs de redirección de Supabase Auth para Preview y producción.
- [ ] Verificar un dominio propio en Resend y sustituir `onboarding@resend.dev` por un remitente del dominio.
- [ ] Confirmar política de privacidad, consentimiento, transferencias internacionales y publicidad sanitaria con revisión legal.
- [ ] Configurar backups y separación estricta entre proyectos Supabase de Preview y producción.
- [ ] Configurar Plausible cuando exista el dominio definitivo y verificar que no recibe datos personales.
- [ ] Revisar logs para asegurar que nunca incluyan API keys, teléfonos, emails, mensajes o información clínica.

## Prioridad P1 — Entrevista final y contenidos reales

Esperar a la validación final con el cliente antes de publicar estos elementos:

- [ ] Textos definitivos de home, especialidades, clínicas, profesionales, hotel y transporte.
- [ ] Nombre comercial y datos legales definitivos.
- [ ] Email, teléfono y canal comercial oficiales.
- [ ] Número de WhatsApp Business, si sustituye a Telegram.
- [ ] Lista final de especialidades, tratamientos, subcategorías y disponibilidad real.
- [ ] Profesionales autorizados, cargos, biografías e idiomas.
- [ ] Servicios e inclusiones reales de BHT CLINIC y The G Hotels Istanbul.
- [ ] Condiciones reales de transporte, alojamiento, acompañamiento y seguimiento.
- [ ] Precios, rangos orientativos, exclusiones y política de confirmación.
- [ ] Fotografías reales autorizadas y sus permisos de uso.
- [ ] Textos legales y traducciones inglesas revisadas.

## Prioridad P2 — Fase 5: panel administrativo

- [ ] Completar login, recuperación de contraseña y protección de `/admin`.
- [ ] Sustituir el dashboard provisional por una bandeja real de leads.
- [ ] Añadir filtros por estado, especialidad, fuente y fecha.
- [ ] Añadir detalle de lead, notas internas, responsable y próxima acción.
- [ ] Implementar transiciones comerciales: `new`, `contact_requested`, `called`, `qualified`, `proposal_sent`, `travel_planned`, `completed`, `lost` y `cancelled`.
- [ ] Gestionar especialidades, servicios, clínicas y profesionales desde el panel.
- [ ] Registrar cambios administrativos en `audit_logs`.
- [ ] Mantener las tablas de agenda y reservas como legacy hasta que el cliente solicite una agenda real.

## Prioridad P3 — Escalado posterior

- [ ] Sustituir Telegram por WhatsApp Business o mantener ambos canales según la decisión comercial.
- [ ] Evaluar API oficial de WhatsApp Business y plantillas aprobadas.
- [ ] Añadir reintentos o cola de emails si el volumen lo justifica.
- [ ] Conectar CRM cuando exista un proceso comercial estable.
- [ ] Añadir pruebas E2E automatizadas para formulario, chatbot, enlaces y autenticación.
- [ ] Optimizar SEO técnico, páginas de campaña y eventos de conversión de Google Ads.
- [ ] Monitorizar rendimiento, errores de servidor, entregabilidad de emails y conversiones.

## Orden recomendado de continuación

1. Crear commit de Fase 4.
2. Validar Preview y Telegram en un entorno externo.
3. Completar la entrevista final y congelar contenidos reales.
4. Migrar textos, contactos, partners e imágenes autorizadas.
5. Implementar el panel administrativo de Fase 5.
6. Ejecutar auditoría final de seguridad, accesibilidad, responsive, SEO y producción.

## Fuera de alcance actual

- Pagos.
- Ecommerce.
- Reserva automática de tratamientos.
- API de WhatsApp Business.
- Diagnóstico médico mediante IA.
- Publicación de resultados garantizados o claims clínicos no verificados.
