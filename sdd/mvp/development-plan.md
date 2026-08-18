# Plan de desarrollo y despliegue — Aura Estética

**Versión:** 0.1 — MVP de prototipo  
**Estado:** Plan inicial de implementación  
**Objetivo inmediato:** Demo funcional en Preview para validación con el cliente

## 1. Objetivo del plan

Transformar la planificación funcional, técnica y visual de Aura Estética en un MVP demostrable, seguro y reproducible.

El primer lanzamiento será un entorno Preview aislado. No se considerará todavía un lanzamiento comercial: la identidad visual, los textos legales, la ubicación, los servicios, los precios, las imágenes, el teléfono y el número de WhatsApp seguirán siendo provisionales hasta la validación del cliente.

## 2. Alcance del MVP

El MVP incluirá:

- Catálogo bilingüe de servicios con búsqueda, filtros y paginación.
- Página de detalle con imágenes, vídeo externo opcional, beneficios, duración y precio de referencia.
- Solicitud de cita con fecha, hora, datos de contacto, transporte y adjuntos.
- Pantalla de confirmación y notificaciones por email.
- Enlace flotante a WhatsApp con mensaje predefinido.
- Panel administrativo protegido para servicios, categorías, solicitudes, agenda y usuarios.
- Roles `admin` y `manager` con permisos diferenciados.
- Disponibilidad basada en slots, retención temporal y aprobación administrativa.
- Analítica básica con Plausible sin datos personales.
- Despliegue Preview en Vercel con Supabase, Resend y datos demo separados.

Quedan fuera del MVP los pagos, el comercio electrónico, el chatbot de IA, la sincronización con calendarios, la gestión avanzada por profesional, el CRM y la reprogramación autónoma por parte del cliente.

## 3. Fases de implementación

### Fase 1 — Preparación del proyecto

- Crear la aplicación Next.js con App Router y TypeScript estricto.
- Configurar Tailwind CSS, shadcn/ui y la base responsive mobile-first.
- Configurar `next-intl` para `/es` y `/en`, con español como idioma inicial.
- Preparar la estructura de rutas públicas, admin, API y componentes compartidos.
- Separar acceso a datos, Server Actions, validaciones, emails, analítica e internacionalización.
- Crear el repositorio GitHub y conectar el proyecto con Vercel.
- Definir ramas de trabajo, pull requests y Preview automático por cambio.
- Añadir variables de entorno de ejemplo sin incluir secretos en el repositorio.

### Fase 2 — Plataforma y base de datos

- Crear un proyecto Supabase independiente para Preview.
- Implementar migraciones SQL versionadas para:
  - `profiles` y roles administrativos.
  - `locations`.
  - `categories`.
  - `services` y `service_media`.
  - `availability_settings` y `booking_slots`.
  - `booking_requests` y `booking_attachments`.
  - `audit_logs`.
- Habilitar RLS en todas las tablas expuestas.
- Configurar políticas para lectura pública únicamente de servicios y categorías visibles.
- Configurar políticas administrativas según `admin` y `manager`.
- Crear buckets separados para imágenes públicas de catálogo y adjuntos privados.
- Implementar `seed.sql` reproducible con sede provisional en Dubái, moneda EUR, categorías, servicios, disponibilidad y datos de demostración.
- Crear el primer acceso admin mediante invitación de Supabase; no guardar credenciales en seeds ni en el código.

### Fase 3 — Experiencia pública

- Implementar la home orientada a conversión, siguiendo `design-reference.md`.
- Crear catálogo con búsqueda, filtros por categoría, orden y paginación.
- Crear detalle de servicio con galería, vídeo externo opcional, beneficios, duración, precio de referencia y CTA.
- Implementar formulario de solicitud con servicio, fecha, hora, contacto, transporte, mensaje y archivos.
- Añadir validación Zod en cliente y servidor mediante React Hook Form y Server Actions.
- Incorporar honeypot, rate limiting y mensajes de error localizados.
- Crear pantalla de confirmación con resumen, estado pendiente y alternativas de contacto.
- Añadir botón flotante de WhatsApp sin presentarlo como chatbot de IA.
- Mantener todos los textos, datos de contacto, imágenes, precios y ubicación como contenido sustituible.

### Fase 4 — Flujo de citas

- Consultar o calcular slots según la zona horaria de la sede.
- Mostrar únicamente slots activos, disponibles y no expirados.
- Validar nuevamente en servidor el servicio, la sede y el slot seleccionado.
- Crear la solicitud en estado `pending`.
- Cambiar el slot a `held` con expiración configurable.
- Guardar los adjuntos en un bucket privado con rutas únicas.
- Liberar slots cuando una solicitud sea cancelada o expire el hold.
- Confirmar solicitudes mediante operación transaccional o idempotente.
- Impedir dos reservas confirmadas para el mismo slot mediante restricción o transacción.
- Gestionar las transiciones `pending`, `contacted`, `confirmed`, `completed` y `cancelled`.

### Fase 5 — Panel administrativo

- Crear login, cierre de sesión y recuperación de contraseña con Supabase Auth.
- Proteger `/admin` mediante middleware y validación adicional en servidor.
- Crear dashboard con solicitudes pendientes y actividad reciente.
- Crear gestión de servicios: alta, edición, ocultación, orden, imágenes y vídeo externo.
- Crear gestión de categorías: edición, visibilidad y orden.
- Crear listado de solicitudes con filtros, detalle, adjuntos y cambios de estado.
- Crear gestión básica de agenda y disponibilidad.
- Permitir gestión de usuarios únicamente al rol `admin`.
- Registrar acciones administrativas relevantes en `audit_logs`.
- Mantener una interfaz responsive y accesible, usando tarjetas apiladas en móvil en lugar de tablas anchas.

### Fase 6 — Emails y analítica

- Crear proyecto o cuenta Resend para el entorno de demo.
- Usar remitente de prueba hasta configurar el dominio definitivo.
- Crear plantillas React Email bilingües para:
  - Solicitud recibida por el cliente.
  - Solicitud recibida por el equipo administrativo.
  - Solicitud confirmada.
  - Invitación administrativa.
  - Recuperación de contraseña gestionada por Supabase.
- Evitar adjuntar archivos del cliente en emails.
- Registrar errores de envío sin duplicar solicitudes ni bloquear innecesariamente el flujo principal.
- Configurar Plausible con los eventos `catalog_viewed`, `service_viewed`, `booking_started`, `booking_submitted`, `booking_confirmed` y `whatsapp_clicked`.
- No enviar a logs ni analítica nombre, teléfono, email, mensaje, archivos ni otros datos personales.

## 4. Entornos y despliegue

### Preview

Cada pull request deberá generar un entorno Preview en Vercel con:

- Proyecto Supabase de Preview.
- Variables de entorno de Preview separadas de producción.
- Datos demo reproducibles mediante migraciones y seed.
- Remitente de email de prueba.
- URL temporal de Vercel.
- Plausible configurado para el dominio de Preview o desactivado hasta disponer de una configuración adecuada.

Las migraciones deberán ejecutarse sobre la base de Preview antes de desplegar código que dependa de cambios de esquema. Los datos de Preview nunca se mezclarán con producción.

### Producción posterior

La promoción a producción se realizará solo después de:

1. Validar con el cliente la identidad visual, servicios, categorías, contenidos, ubicación y contacto.
2. Sustituir los textos legales provisionales por textos revisados.
3. Crear un proyecto Supabase de producción separado.
4. Configurar el dominio definitivo en Vercel.
5. Verificar el dominio y el remitente de producción en Resend.
6. Crear variables de producción y revisar que ningún secreto se exponga al navegador.
7. Ejecutar migraciones controladas y cargar únicamente contenido aprobado.
8. Revisar RLS, permisos, adjuntos, rate limiting, consentimiento y privacidad.
9. Configurar logs, alertas y backups mínimos.
10. Completar la prueba final bilingüe en móvil y escritorio.

## 5. Variables de entorno

Se documentarán en un archivo de ejemplo y se configurarán por separado en Preview y producción:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
RESEND_API_KEY
RESEND_FROM_EMAIL
ADMIN_NOTIFICATION_EMAIL
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_PLAUSIBLE_DOMAIN
NEXT_PUBLIC_WHATSAPP_NUMBER
BOOKING_HOLD_MINUTES
DEFAULT_LOCALE
```

Las variables `NEXT_PUBLIC_*` solo podrán contener valores aptos para navegador. `SUPABASE_SERVICE_ROLE_KEY` y `RESEND_API_KEY` quedarán exclusivamente en el entorno servidor.

## 6. Calidad y pruebas

### Checks automatizados

Cada pull request deberá ejecutar, como mínimo:

- Lint.
- Typecheck.
- Build de producción.
- Pruebas unitarias.
- Pruebas de integración.
- Pruebas E2E del flujo crítico.

El Preview no se considerará válido si falla cualquiera de los checks obligatorios.

### Pruebas unitarias

- Esquemas Zod.
- Formateo de fechas, horas y precios.
- Cálculo y expiración de slots.
- Transiciones de estado.
- Permisos por rol.
- Construcción de eventos de analítica sin datos sensibles.

### Pruebas de integración

- Server Actions de creación, actualización, aprobación y cancelación.
- Consultas públicas de servicios visibles.
- RLS para visitante, `manager` y `admin`.
- Subida y URLs firmadas de adjuntos.
- Generación y envío de emails.
- Rate limiting y honeypot.

### Pruebas E2E

- Visitante: catálogo → detalle → reserva → adjunto → confirmación.
- Administrador: login → revisión → aprobación → solicitud confirmada.
- Gestor: consulta y cambio de estado sin acceso a usuarios.
- Recuperación de contraseña.
- Cambio de idioma.
- Intento de reservar un slot ocupado o expirado.
- Clic en WhatsApp.
- Navegación por teclado, foco visible y uso responsive básico.

## 7. Criterios de aceptación del MVP

El MVP estará listo para demo cuando:

1. La aplicación se despliegue correctamente en Vercel mediante variables documentadas.
2. La base de datos se pueda crear desde cero con migraciones y seed.
3. Las páginas públicas muestren únicamente categorías y servicios visibles.
4. La interfaz funcione en español e inglés.
5. Un visitante pueda enviar una solicitud con fecha, hora, contacto, transporte y adjuntos.
6. La solicitud quede en `pending` y pueda revisarse desde el panel.
7. La aprobación no permita duplicar una reserva confirmada.
8. El cliente y el equipo reciban los emails correspondientes.
9. Los roles `admin` y `manager` se apliquen en interfaz, servidor y RLS.
10. Plausible registre únicamente eventos no sensibles.
11. El flujo crítico esté cubierto por pruebas automatizadas.
12. El entorno Preview utilice datos, secretos y correo separados de producción.

## 8. Rollback, errores y operación

- Los despliegues de Vercel deberán poder revertirse al despliegue anterior.
- Las migraciones destructivas deberán evitarse o acompañarse de una estrategia de reversión documentada.
- Los cambios de esquema deberán ser compatibles con el código desplegado cuando exista riesgo de despliegue parcial.
- Los errores internos se registrarán en servidor sin mostrar trazas al usuario.
- Los errores de email no crearán solicitudes duplicadas.
- Los errores de slot ocupado, archivo inválido o fallo recuperable mostrarán una acción clara al visitante.
- Se configurarán alertas mínimas para errores de Server Actions, emails y despliegues.
- La producción deberá mantener Supabase separado de Preview y contar con backups adecuados al nivel del servicio contratado.

## 9. Contratos internos del proyecto

El MVP no añadirá APIs públicas nuevas. Se mantendrán como contratos internos:

- Migraciones SQL y seeds versionados.
- Estados y transiciones de `booking_requests`.
- Resultado tipado de Server Actions.
- Variables de entorno separadas por entorno.
- Plantillas de email bilingües.
- Eventos de analítica sin información personal.
- Permisos de `admin` y `manager`.
- Procedimiento de despliegue, promoción y rollback.

## 10. Supuestos y decisiones pendientes

### Decisiones adoptadas

- El primer objetivo es una demo funcional en Preview.
- GitHub será el repositorio y Vercel gestionará los despliegues.
- Vercel, Supabase, Resend y Plausible deberán provisionarse desde cero.
- Preview usará URL de Vercel, datos demo y remitente de prueba.
- La base de datos demo se cargará mediante seed reproducible.
- El primer admin se creará mediante invitación de Supabase.
- Dubái, EUR, servicios, imágenes, textos, contacto y WhatsApp serán provisionales.
- La guía visual de referencia será `sdd/mvp/design-reference.md`.

### Pendiente de validación antes de producción

- Dominio definitivo.
- Identidad visual y logotipo.
- Servicios, categorías y precios finales.
- Sede, horarios y reglas reales de agenda.
- Número de WhatsApp.
- Roles y equipo operativo definitivos.
- Textos legales revisados.
- Política de retención y eliminación de datos.
- Remitente y dominio de correo de producción.
