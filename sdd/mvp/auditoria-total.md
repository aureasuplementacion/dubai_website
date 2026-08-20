# Auditoría total del proyecto — Aura Estética

Fecha de auditoría: 20 de agosto de 2026  
Rama revisada: `phase-4-preview`  
Objetivo: cerrar la Preview como base técnica estable antes de producción.

## 1. Dictamen ejecutivo

Aura Estética dispone actualmente de una Preview funcional orientada a captar solicitudes de clientas españolas interesadas en servicios estéticos en Turquía. El producto ya no debe considerarse una tienda ni un catálogo de productos: es un escaparate editorial y comercial con captación de leads, acompañamiento humano y una primera herramienta operativa interna.

El código está estable: TypeScript, ESLint, build de producción y auditoría de dependencias pasan correctamente. La arquitectura pública, el formulario, el chatbot, Resend, Telegram, Supabase Auth, el panel administrativo y el CRM están implementados.

El proyecto no está listo para producción comercial definitiva porque todavía depende de información y decisiones del cliente: contenidos aprobados, dominio, remitente profesional, textos legales, contactos oficiales, imágenes autorizadas, backups y separación final de entornos.

## 2. Estado de las fases

### Fases 1–4 — Cerradas

- Preparación del proyecto Next.js, TypeScript, App Router, localización y sistema visual.
- Supabase, migraciones, RLS, perfiles y datos de demostración.
- Frontend premium orientado a confianza, lujo, seguridad y conversión.
- Formulario de solicitud de llamada, leads, Resend, chatbot y Telegram.
- Despliegue Preview en GitHub/Vercel.

### Fase 5 — En consolidación

La base administrativa está implementada, pero esta fase se considera consolidada después de completar las pruebas manuales de Preview y revisar los pendientes operativos.

Incluye:

- Panel principal de leads.
- Búsqueda, paginación y filtros.
- Estados internos y responsables.
- Notas y actividad.
- Exportación CSV solo para administradores.
- CRM separado en `/admin/crm`.
- Clasificación visible simplificada: Pendiente, Apto y No apto.
- Eliminación permanente solo para `admin`, con confirmación y auditoría previa.

## 3. Proceso seguido

1. Se creó un MVP inicial con orientación de tienda/catálogo.
2. La entrevista con el cliente redefinió el producto como escaparate de servicios y migración asistida.
3. Se construyó una identidad visual premium y una arquitectura pública editorial.
4. Se investigaron servicios, clínicas, hoteles, transporte, textos e imágenes.
5. Se implementó la captación mediante formulario, emails y chatbot.
6. Se corrigieron problemas de variables, autenticación, despliegues y URLs Preview.
7. Se construyó el panel administrativo y posteriormente un CRM independiente.
8. Se retiraron el calendario y la próxima acción al no existir todavía una arquitectura comercial que los justificase.
9. Se simplificó el CRM a tres clasificaciones operativas.
10. Se realizó una auditoría técnica y se documentó el estado de preproducción.

## 4. Qué salió bien

- El cambio de posicionamiento comercial se reflejó correctamente en el frontend.
- La identidad visual es coherente con lujo, confianza y acompañamiento.
- El flujo de captación conserva los leads aunque exista un fallo de email.
- Supabase Auth y la validación de perfiles protegen el área administrativa.
- Las mutaciones sensibles usan Server Actions y service role únicamente en servidor.
- RLS protege leads, notas, eventos, perfiles y contenidos.
- Resend envía confirmación al cliente y aviso interno.
- El chatbot puede orientar y derivar a Telegram.
- El CRM no duplica datos: trabaja sobre los mismos leads de Supabase.
- Los permisos `manager` y `admin` están diferenciados.
- La eliminación solo está disponible para `admin` y deja una huella previa en `audit_logs`.
- El proyecto se despliega mediante GitHub y Vercel con Previews identificables por commit.
- El repositorio no rastrea secretos.

## 5. Errores y aprendizajes

### Desviación inicial hacia catálogo y CMS

Se intentó crear un catálogo/editorial CMS antes de tener consolidado el proceso comercial. Fue una ampliación prematura y se revirtió. La decisión vigente es mantener el contenido controlado por código hasta que exista una necesidad editorial real.

### Documentación desalineada

El `development-plan.md` original todavía describe catálogo, reservas, agenda y funcionalidades que ya no representan el producto actual. Queda como contexto histórico; esta auditoría es la referencia vigente.

### Confusión entre Preview y despliegues

Las URLs Preview son específicas de cada despliegue o alias de rama. Una URL antigua puede seguir mostrando una versión previa. La comprobación correcta debe hacerse por commit y desde el despliegue correspondiente en Vercel.

### Gestión de credenciales

Durante el desarrollo se compartieron credenciales en conversación y posteriormente se revocaron o sustituyeron. En adelante, los secretos deben vivir únicamente en Vercel, Supabase y `.secrets/` local ignorado por Git.

### Calendario y próxima acción

Se implementaron antes de definir una operación comercial real. Se retiraron de la interfaz y se conservan únicamente restos legacy en la base de datos para no forzar una migración innecesaria.

## 6. Arquitectura vigente

### Público

- Next.js App Router.
- Rutas localizadas `/es` y `/en`.
- Home, especialidades, servicios, clínicas, proceso de viaje, contacto y solicitud de llamada.
- Chatbot server-side sin persistencia de conversaciones.
- Telegram como canal activo temporal; WhatsApp preparado pero no activo.

### Captación

- Validación de datos en servidor.
- Honeypot y rate limiting.
- Inserción de leads en Supabase con estado inicial `new`.
- Evento `lead_created`.
- Email al cliente y al equipo mediante Resend.

### Administración

- `/admin/dashboard`: bandeja principal.
- `/admin/crm`: tablero operativo separado.
- Supabase Auth, perfiles activos y roles `admin`/`manager`.
- Server Actions para cambios de estado, asignación, notas, exportación y eliminación.
- `audit_logs` y `lead_events` para trazabilidad.

### Datos

- `leads`, `lead_notes`, `lead_events`, `audit_logs` y `profiles` sostienen la operación actual.
- Tablas de agenda y reservas se mantienen como legacy y no participan en el flujo público.
- Los estados detallados se conservan para historial; el CRM los agrupa visualmente en Pendiente, Apto y No apto.

## 7. Seguridad y privacidad

### Verificado

- No se han encontrado secretos rastreados en Git.
- `.env*` está ignorado salvo `.env.example`.
- `SUPABASE_SERVICE_ROLE_KEY` no se expone al navegador.
- Rutas administrativas validan sesión y perfil en servidor.
- La eliminación exige rol `admin`.
- Los logs de auditoría no dependen de inserciones directas del cliente.
- `npm audit --omit=dev --audit-level=high` devuelve 0 vulnerabilidades.

### Pendiente antes de producción

- Ejecutar pruebas RLS con `anon`, autenticado, `manager` y `admin`.
- Configurar Upstash Redis para rate limiting distribuido.
- Separar completamente Supabase Preview y producción.
- Configurar backups.
- Revisar redirecciones de Supabase Auth.
- Revisar logs para evitar datos personales o clínicos.
- Rotar cualquier credencial que vuelva a exponerse fuera del gestor de secretos.

## 8. Pendientes clasificados

### Bloqueadores de producción

- Dominio definitivo.
- Remitente y dominio verificado de Resend.
- Textos legales y consentimiento revisados.
- Contenidos reales aprobados por el cliente.
- Imágenes reales con permiso de uso.
- Contactos comerciales oficiales.
- Backups y separación final de entornos.

### Validación manual de Preview

- Enviar varios formularios desde un dispositivo externo.
- Confirmar lead, evento y emails en cada prueba.
- Probar chatbot informativo y derivación a Telegram.
- Probar roles `manager` y `admin`.
- Añadir una nota y confirmar que aparece en actividad.
- Cambiar clasificación desde panel y CRM.
- Eliminar un lead de prueba como `admin`.
- Comprobar que un `manager` no puede exportar ni eliminar.
- Verificar responsive, navegación localizada y botones flotantes.

### Fuera de alcance actual

- Ecommerce y pagos.
- Reserva automática de tratamientos.
- Calendario operativo.
- Gestión avanzada por profesional.
- API oficial de WhatsApp Business.
- Diagnóstico médico mediante IA.
- CMS editorial completo.

## 9. Criterios de cierre de Preview

La Preview podrá considerarse cerrada cuando las pruebas manuales anteriores estén verificadas y documentadas, no existan contradicciones en la documentación vigente y los únicos pendientes restantes dependan del cliente o de la preparación de producción.

La producción no se iniciará solo por pasar los checks técnicos: requiere aprobación de contenidos, legal, dominio, remitente, contactos y separación de datos.

## 10. Referencia documental

Este archivo es la referencia canónica del estado actual. Los documentos de planificación inicial, arquitectura inicial y auditoría inicial se conservan para contexto histórico y no deben utilizarse para inferir funcionalidades vigentes sin contrastarlos con este documento.
