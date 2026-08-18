# Especificación técnica — Aura Estética

**Versión:** 0.1 — MVP de prototipo  
**Estado:** Base técnica aprobada para implementación  
**Documento funcional relacionado:** `funcional-spec.md`

## 1. Objetivo técnico

Definir la arquitectura y las decisiones técnicas necesarias para implementar el MVP de Aura Estética como una aplicación web bilingüe, rápida y robusta.

El sistema permitirá mostrar un catálogo de servicios, gestionar solicitudes de citas con disponibilidad basada en slots, administrar contenidos y usuarios, enviar notificaciones por email y recopilar analítica básica respetando la privacidad.

El prototipo utilizará Dubái como ubicación inicial y EUR como moneda de demostración. La sede y la zona horaria deberán poder modificarse posteriormente.

## 2. Stack tecnológico

### Aplicación

- Next.js con App Router.
- TypeScript en modo estricto.
- React.
- Server Components por defecto.
- Server Actions para mutaciones internas de la aplicación.
- Route Handlers para endpoints externos, webhooks y casos que necesiten una interfaz HTTP explícita.

### Interfaz

- Tailwind CSS.
- shadcn/ui.
- Diseño responsive mobile-first.
- Componentes accesibles basados en HTML semántico y patrones WAI-ARIA cuando corresponda.

### Plataforma y datos

- Supabase PostgreSQL para la base de datos.
- Supabase Auth para autenticación administrativa.
- Supabase Storage para imágenes y documentos.
- Row Level Security (RLS) para autorización a nivel de datos.
- Migraciones SQL versionadas en el repositorio.
- Seeds para datos de demostración.

### Servicios externos

- Vercel para despliegue.
- Resend para correo transaccional.
- React Email para plantillas de correo.
- next-intl para internacionalización.
- React Hook Form + Zod para formularios y validación.
- Plausible para analítica con eventos personalizados.

## 3. Estructura de la aplicación

La aplicación se organizará en tres áreas principales:

```text
app/
├── [locale]/
│   ├── page.tsx
│   ├── servicios/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── reservar/page.tsx
│   ├── confirmacion/page.tsx
│   └── contacto/page.tsx
├── admin/
│   ├── login/page.tsx
│   ├── recuperar-acceso/page.tsx
│   ├── dashboard/page.tsx
│   ├── servicios/
│   ├── categorias/
│   ├── solicitudes/
│   ├── agenda/
│   └── usuarios/
└── api/
    ├── webhooks/
    └── uploads/

components/
├── ui/
├── catalog/
├── booking/
├── admin/
└── shared/

lib/
├── supabase/
├── actions/
├── validations/
├── email/
├── i18n/
├── rate-limit/
└── analytics/

supabase/
├── migrations/
└── seed.sql
```

La estructura exacta podrá ajustarse durante la implementación, pero deberá mantenerse la separación entre interfaz pública, administración, acceso a datos, validaciones y servicios externos.

## 4. Arquitectura de renderizado y acceso a datos

- Las páginas públicas de catálogo y detalle se implementarán preferentemente como Server Components.
- Las mutaciones de catálogo, solicitudes, categorías y usuarios utilizarán Server Actions protegidas.
- Los componentes de formulario serán Client Components cuando necesiten estado, validación interactiva o selección de archivos.
- Las consultas públicas solo devolverán servicios y categorías visibles.
- El acceso administrativo se validará en servidor antes de renderizar páginas o ejecutar acciones.
- Nunca se expondrá la `service_role` key al navegador.
- Las operaciones que requieran privilegios elevados se ejecutarán exclusivamente en servidor y quedarán cubiertas por autorización explícita.

## 5. Modelo de datos

El esquema inicial deberá incluir como mínimo las siguientes entidades.

### `profiles`

Extiende el usuario de Supabase Auth.

- `id` — UUID, igual al `auth.users.id`.
- `full_name`.
- `email`.
- `role` — `admin` o `manager`.
- `is_active`.
- `created_at`.
- `updated_at`.

El rol `admin` podrá gestionar usuarios y configuración. El rol `manager` podrá gestionar catálogo y solicitudes, pero no usuarios ni configuración sensible.

### `locations`

Representa una sede y permite evitar acoplar el prototipo a Dubái.

- `id`.
- `name`.
- `address`.
- `city`.
- `country`.
- `timezone` — valor IANA, inicialmente `Asia/Dubai`.
- `is_active`.
- `created_at`.
- `updated_at`.

### `categories`

- `id`.
- `name_es`.
- `name_en`.
- `slug`.
- `description_es`.
- `description_en`.
- `sort_order`.
- `is_visible`.
- `created_at`.
- `updated_at`.

Las categorías serán configurables y no estarán limitadas a faciales, corporales, cuidado personal o transporte.

### `services`

- `id`.
- `category_id`.
- `name_es`.
- `name_en`.
- `slug`.
- `description_es`.
- `description_en`.
- `benefits_es`.
- `benefits_en`.
- `duration_minutes`.
- `reference_price`.
- `currency`, inicialmente `EUR`.
- `video_url`, opcional.
- `sort_order`.
- `is_visible`.
- `created_at`.
- `updated_at`.

El slug deberá ser único. Los servicios no se eliminarán físicamente si existen solicitudes relacionadas; se preferirá ocultarlos o aplicar borrado lógico.

### `service_media`

- `id`.
- `service_id`.
- `storage_path`.
- `media_type` — imagen.
- `alt_text_es`.
- `alt_text_en`.
- `sort_order`.
- `created_at`.

Los vídeos se gestionarán como URLs externas en `services.video_url`. No se subirán vídeos al almacenamiento propio en el MVP.

### `availability_settings`

Configuración simple de agenda.

- `id`.
- `location_id`.
- `weekday`.
- `start_time`.
- `end_time`.
- `slot_duration_minutes`.
- `is_active`.

La configuración será inicialmente global por sede. El modelo podrá ampliarse posteriormente para asociar horarios a profesionales.

### `booking_slots`

Representa slots de reserva calculados o generados para una sede.

- `id`.
- `location_id`.
- `starts_at`.
- `ends_at`.
- `status` — `available`, `held`, `booked`, `blocked`.
- `hold_expires_at`, opcional.
- `created_at`.
- `updated_at`.

Deberá existir una restricción o transacción que evite dos reservas confirmadas para el mismo slot.

### `booking_requests`

- `id`.
- `customer_name`.
- `customer_phone`.
- `customer_email`.
- `service_id`.
- `location_id`.
- `slot_id`, opcional durante la propuesta inicial.
- `preferred_date`.
- `preferred_time`.
- `message`.
- `transport_requested`.
- `status` — `pending`, `contacted`, `confirmed`, `completed`, `cancelled`.
- `hold_expires_at`, opcional.
- `created_at`.
- `updated_at`.

Los datos de contacto se tratarán como información sensible y no se incluirán en eventos de analítica.

### `booking_attachments`

- `id`.
- `booking_request_id`.
- `storage_path`.
- `original_name`.
- `mime_type`.
- `size_bytes`.
- `created_at`.

### `audit_logs`

Se recomienda incluir una auditoría mínima para operaciones administrativas.

- `id`.
- `actor_id`.
- `action`.
- `entity_type`.
- `entity_id`.
- `metadata` JSONB sin datos innecesarios.
- `created_at`.

## 6. Flujo técnico de citas

### 6.1 Consulta de disponibilidad

1. El cliente selecciona servicio, sede, fecha y hora.
2. El servidor calcula o consulta los slots disponibles usando la zona horaria de la sede.
3. Solo se muestran slots activos, no bloqueados y no expirados.
4. El cliente completa sus datos y adjuntos.

### 6.2 Creación de solicitud

1. React Hook Form mantiene el estado del formulario.
2. Zod valida los datos en cliente para feedback inmediato.
3. La Server Action vuelve a validar todo en servidor.
4. Se comprueba que el servicio y la sede estén activos.
5. Se comprueba que el slot siga disponible.
6. Se crea la solicitud en estado `pending`.
7. El slot pasa a `held` con una fecha de expiración configurable.
8. Se almacenan los adjuntos en un bucket privado.
9. Se envían los emails de nueva solicitud.
10. Se devuelve una respuesta segura para mostrar la pantalla de confirmación.

### 6.3 Aprobación administrativa

1. Un usuario autorizado consulta la solicitud.
2. El administrador o gestor revisa datos, adjuntos, fecha y hora.
3. Si aprueba, la solicitud pasa a `confirmed` y el slot a `booked`.
4. Si rechaza, la solicitud pasa a `cancelled` y el slot vuelve a `available`.
5. Si el hold expira sin aprobación, un proceso de limpieza libera el slot y la solicitud queda disponible para seguimiento administrativo.
6. La aprobación y cancelación se ejecutarán dentro de una transacción o mediante operaciones idempotentes.

### 6.4 Notificaciones

Se enviará email:

- Al crear una solicitud: al cliente y al equipo administrativo.
- Al aprobar una solicitud: al cliente y al equipo administrativo.

Los cambios a `contacted`, `completed` o `cancelled` serán internos en el MVP, salvo que posteriormente el cliente solicite notificaciones adicionales.

Los envíos deberán registrar errores sin bloquear innecesariamente la creación de la solicitud. Se recomienda una estrategia de reintento o una cola futura si el volumen aumenta.

## 7. Autenticación y autorización

- Supabase Auth gestionará email y contraseña.
- Los usuarios administrativos serán invitados por email.
- El usuario invitado establecerá su contraseña mediante el flujo de Supabase.
- La recuperación de contraseña se realizará mediante email.
- El middleware protegerá las rutas `/admin`.
- La autorización se comprobará también dentro de cada Server Action.
- El frontend no será la única capa de autorización.

### Permisos

| Acción | Admin | Gestor |
|---|---:|---:|
| Consultar catálogo administrativo | Sí | Sí |
| Gestionar servicios | Sí | Sí |
| Gestionar categorías | Sí | Sí |
| Consultar solicitudes | Sí | Sí |
| Cambiar estados de solicitudes | Sí | Sí |
| Gestionar agenda | Sí | Sí |
| Invitar usuarios | Sí | No |
| Cambiar roles | Sí | No |
| Gestionar configuración sensible | Sí | No |

## 8. Seguridad y RLS

### Base de datos

- RLS estará habilitado en todas las tablas expuestas.
- Los visitantes no tendrán acceso directo a datos administrativos.
- Las consultas públicas solo podrán leer categorías y servicios visibles.
- Los usuarios autenticados solo podrán ejecutar acciones permitidas por su rol.
- Las solicitudes serán accesibles únicamente para usuarios administrativos autorizados.
- Las claves secretas permanecerán en variables de entorno de servidor.

### Archivos

- Se utilizará un bucket privado para documentos adjuntos.
- Las imágenes públicas de catálogo podrán servirse mediante URLs controladas o bucket público separado.
- Los documentos de clientes se servirán mediante URLs firmadas con expiración.
- Se validará MIME type y tamaño tanto en cliente como en servidor.
- El nombre original del archivo no se utilizará como ruta de almacenamiento.
- Se generarán rutas únicas para evitar colisiones.

### Límites iniciales recomendados

- Imágenes de catálogo: máximo 5 MB por archivo.
- Documentos o imágenes de una solicitud: máximo 10 MB por archivo.
- Máximo 5 adjuntos por solicitud.
- Tipos permitidos: `image/jpeg`, `image/png`, `image/webp`, `application/pdf`.
- Vídeos: únicamente URLs externas validadas.

Estos valores deberán poder modificarse sin cambiar el flujo de negocio.

### Formulario público

- Honeypot oculto para detectar envíos automatizados.
- Rate limiting por IP y, cuando sea posible, por email.
- Mensajes de error genéricos que no revelen información interna.
- Sanitización de texto libre.
- No se guardarán datos personales en logs ni en Plausible.

## 9. Internacionalización

- next-intl gestionará los textos de interfaz.
- El locale formará parte de la ruta pública, por ejemplo `/es` y `/en`.
- Los servicios y categorías tendrán campos separados `*_es` y `*_en`.
- El idioma por defecto será español, salvo decisión posterior.
- Las fechas, horas y precios se formatearán según locale.
- Las fechas de la agenda se almacenarán en UTC y se mostrarán usando la zona horaria de la sede.

## 10. Emails

Resend enviará los emails desde una dirección de dominio configurada en producción. React Email generará plantillas reutilizables y bilingües.

Plantillas mínimas:

- `booking-request-received`.
- `booking-request-confirmed`.
- `admin-booking-notification`.
- `admin-invitation`.
- `password-reset` gestionada por Supabase.

Los emails deberán mostrar:

- Nombre del cliente.
- Servicio.
- Fecha y hora.
- Sede y profesional si existen.
- Solicitud de transporte.
- Estado de confirmación.
- Información de contacto de la clínica.

No se enviarán adjuntos del cliente por email. Se enviarán enlaces seguros solo cuando el flujo administrativo lo requiera.

## 11. WhatsApp y chatbot futuro

El MVP tendrá un número de WhatsApp configurable y un mensaje predefinido. El botón podrá implementarse mediante enlace `wa.me` o componente flotante.

No se implementará en el MVP:

- Chatbot con IA.
- Consulta automática de agenda desde WhatsApp.
- Transferencia contextual de conversación a una secretaria.
- Persistencia de conversaciones.

La futura integración deberá exponerse mediante una interfaz desacoplada para no mezclar la lógica de conversación con el flujo principal de reservas.

## 12. Analítica

Plausible se cargará respetando la configuración de privacidad del sitio y sin almacenar datos personales.

Eventos iniciales:

- `catalog_viewed`.
- `service_viewed`.
- `booking_started`.
- `booking_submitted`.
- `booking_confirmed`.
- `whatsapp_clicked`.

Los eventos podrán incluir datos no sensibles como categoría, servicio anonimizado o idioma, pero nunca nombre, teléfono, email, mensaje ni archivos.

## 13. Variables de entorno

Variables previstas:

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

Las variables públicas solo contendrán valores aptos para navegador. Las claves de servicio y Resend solo estarán disponibles en el entorno servidor.

## 14. Despliegue

### Preview

- Cada cambio desplegable generará un entorno Preview en Vercel.
- Las variables de Preview estarán separadas de producción.
- Los emails podrán utilizar un remitente o configuración de prueba.
- Los datos de Preview no se mezclarán con producción.

### Producción

- El despliegue se realizará en Vercel.
- Las migraciones de Supabase se ejecutarán de forma controlada antes de activar cambios dependientes del esquema.
- El dominio y remitente de email deberán estar verificados.
- Se configurarán logs y alertas mínimas para errores de Server Actions y emails.

## 15. Migraciones y datos iniciales

- Cada cambio de esquema se almacenará como migración SQL ordenada.
- Las migraciones deberán ser idempotentes cuando sea posible.
- Las políticas RLS se versionarán junto al esquema.
- `seed.sql` incluirá categorías y servicios de demostración.
- No se incluirán datos reales de clientes en el repositorio.
- Los datos provisionales de Dubái deberán identificarse como contenido de demo.

## 16. Estrategia de errores

- Las validaciones de usuario devolverán errores comprensibles y localizados.
- Los errores internos se registrarán en servidor sin exponer trazas al cliente.
- Las Server Actions devolverán resultados tipados con éxito o error controlado.
- Los fallos de email no deberán provocar duplicación de solicitudes.
- Las operaciones de aprobación deberán ser idempotentes.
- Si un slot deja de estar disponible durante el envío, el usuario recibirá un error recuperable y deberá seleccionar otro horario.
- Los errores de subida deberán indicar tipo, tamaño o estado del archivo sin revelar rutas internas.

## 17. Pruebas

### Unitarias

- Esquemas Zod.
- Formateo de fechas, horas y precios.
- Cálculo de slots.
- Expiración de bloqueos.
- Transiciones válidas de estado.
- Permisos por rol.

### Integración

- Server Actions de creación y actualización de solicitudes.
- Consultas públicas de servicios visibles.
- RLS para cada rol.
- Subida y generación de URLs firmadas.
- Generación y envío de emails.
- Rate limiting y honeypot.

### E2E

- Visitante: catálogo → detalle → reserva → adjunto → confirmación.
- Administrador: login → revisión → aprobación → solicitud confirmada.
- Gestor: consulta y cambio de estado sin acceso a gestión de usuarios.
- Recuperación de contraseña.
- Cambio de idioma.
- Intento de reservar un slot ocupado o expirado.

## 18. Criterios técnicos de aceptación

1. La aplicación puede desplegarse en Vercel usando variables de entorno documentadas.
2. La base de datos puede crearse mediante migraciones y seeds versionados.
3. Las páginas públicas muestran únicamente contenido visible.
4. Los roles `admin` y `manager` aplican permisos tanto en interfaz como en servidor y RLS.
5. Una solicitud válida crea un registro, retiene temporalmente el slot y almacena los adjuntos de forma privada.
6. No pueden existir dos reservas confirmadas para el mismo slot.
7. La aprobación libera un email correcto al cliente y al equipo administrativo.
8. El sistema maneja correctamente slots ocupados, bloqueos expirados, errores de email y archivos inválidos.
9. La interfaz funciona en español e inglés.
10. Plausible registra únicamente eventos no sensibles.
11. El flujo crítico está cubierto por pruebas automatizadas.
12. No se requieren pagos online ni funcionalidades de e-commerce para considerar terminado el MVP.

## 19. Decisiones futuras

Quedan para una fase posterior:

- Reglas de agenda por profesional.
- Múltiples sedes operativas completas.
- Reprogramación y cancelación por parte del cliente.
- Sincronización con Google Calendar u otro calendario.
- Chatbot IA y transferencia a secretaria.
- Procesamiento de pagos.
- Antivirus y controles avanzados para archivos.
- CRM y automatizaciones de marketing.
- Textos legales definitivos y revisión de cumplimiento específica del país.

