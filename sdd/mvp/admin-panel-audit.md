# Auditoría y especificación del panel administrativo

## Estado de partida

La Fase 4 deja operativo el flujo público de captación: el formulario crea leads en Supabase, registra `lead_created` y envía las notificaciones mediante Resend. El dashboard administrativo actual valida la sesión y muestra contadores, pero todavía no permite trabajar comercialmente cada solicitud.

## Objetivo de la Fase 5

Convertir `/admin/dashboard` en una bandeja comercial segura para que el equipo pueda revisar, contactar, cualificar y acompañar cada lead hasta el viaje, sin depender directamente del Table Editor de Supabase.

## Alcance aprobado

- Gestión de leads como prioridad.
- Vista de lista paginada y panel de detalle.
- Búsqueda por nombre, email, teléfono o referencia.
- Filtros por estado, especialidad, fuente y fecha.
- Cambio de estado, responsable y próxima acción.
- Notas internas y línea temporal de eventos.
- Enlaces de contacto a email, teléfono y Telegram/WhatsApp.
- Exportación CSV exclusiva para `admin`.
- Sin borrado físico de leads.
- Gestión de especialidades, clínicas y profesionales fuera de esta primera versión.

## Auditoría técnica

### Acceso y permisos

- Supabase Auth protege el acceso.
- `requireStaff` exige usuario autenticado, perfil activo y rol `admin` o `manager`.
- RLS protege `leads`, `lead_notes`, `lead_events`, perfiles y contenidos.
- `admin` mantiene la gestión global y la exportación.
- `manager` gestiona el trabajo operativo de leads, notas y estados.
- Todas las mutaciones se ejecutan como server actions y vuelven a validar la sesión.

### Modelo de datos aprovechado

- `leads`: datos de contacto, especialidad, estado, fuente, responsable y próxima acción.
- `lead_notes`: notas internas asociadas al lead.
- `lead_events`: historial comercial asociado al lead.
- `audit_logs`: trazabilidad de cambios administrativos.
- `profiles`: usuarios, roles y responsables activos.

No se modifica el modelo de estados existente. Se conservan `new`, `contact_requested`, `called`, `qualified`, `awaiting_clinic_review`, `proposal_sent`, `travel_planned`, `completed`, `not_eligible`, `lost` y `cancelled`.

## Experiencia de usuario

- La pantalla responde primero a “qué leads requieren atención ahora”.
- La lista es la vista principal; el detalle evita navegar a páginas desconectadas.
- Cada fila muestra referencia, persona, especialidad, estado, responsable y antigüedad.
- El detalle concentra las acciones primarias: cambiar estado, asignar responsable, programar acción y contactar.
- Los estados de carga, vacío, error y guardado son explícitos y accionables.
- La interfaz usa los tokens visuales de Aura: sapphire, champagne, fondos cálidos, tipografía editorial y foco visible.
- El panel es utilizable con teclado y conserva una jerarquía clara en móvil.

## Seguridad y privacidad

- Nunca se expone `SUPABASE_SERVICE_ROLE_KEY` al navegador.
- Las consultas se ejecutan con el cliente de servidor autenticado.
- Las entradas de búsqueda, notas y cambios se validan antes de persistir.
- No se solicitan ni se muestran datos médicos adicionales.
- Los logs no incluyen claves, mensajes completos ni secretos.
- No existe eliminación física en la interfaz; los estados `lost` y `cancelled` conservan el historial.
- La exportación contiene datos de contacto y queda reservada a `admin`.

## Criterios de aceptación

- Un usuario sin sesión no puede ver el dashboard.
- Un perfil inactivo o no autorizado es expulsado.
- Un manager puede operar leads, pero no exportar ni administrar perfiles.
- Un admin puede exportar el listado filtrado.
- Los cambios de estado, responsable y próxima acción se reflejan en `leads`.
- Las notas aparecen en `lead_notes` y las acciones en `lead_events` y `audit_logs`.
- La lista soporta paginación, búsqueda y filtros combinados.
- El panel funciona en escritorio y móvil, con estados vacíos y errores comprensibles.
- TypeScript, ESLint y build pasan antes del despliegue.
