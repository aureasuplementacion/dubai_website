# Auditoría final de preproducción — Aura Estética

Fecha de revisión: 21 de agosto de 2026  
Rama revisada: `phase-4-preview`  
Documento operativo de referencia para el cierre de Preview.

## 1. Dictamen ejecutivo

Aura Estética dispone de una Preview técnicamente funcional: el sitio público, la captación de leads, el chatbot, Telegram, Resend, Supabase, el panel administrativo y el CRM están implementados.

La Preview puede continuar utilizándose para validación interna y pruebas con el cliente. La promoción a producción comercial queda bloqueada hasta completar los elementos que dependen de contenidos, legal, dominio, contactos oficiales, separación definitiva de entornos y continuidad de datos.

### Veredicto actual

| Área | Estado | Dictamen |
|---|---|---|
| Cierre técnico de Preview | Cerrado con validación manual pendiente | **GO condicionado** |
| Seguridad del repositorio | Cerrado | **GO** |
| Operación administrativa | Implementada | **GO condicionado** |
| Publicación comercial definitiva | Pendiente | **NO-GO** |

## 2. Producto y alcance vigente

El producto es un escaparate editorial y comercial para captar clientas españolas interesadas en servicios estéticos en Turquía y acompañarlas durante el proceso de orientación, selección y viaje.

No es una tienda ni un catálogo de productos. Quedan fuera del alcance actual:

- Ecommerce, pagos y checkout.
- Reserva automática de tratamientos.
- Calendario de citas y disponibilidad clínica.
- Diagnóstico médico mediante IA.
- CMS editorial completo.
- Gestión avanzada por profesional.
- WhatsApp Business hasta disponer de número y configuración empresarial.

## 3. Estado por subsistema

| Subsistema | Estado | Evidencia o cierre requerido | Responsable |
|---|---|---|---|
| Frontend público | Cerrado | Implementación en Preview; queda revisión final de contenidos reales | Técnico / cliente |
| Localización `/es` y `/en` | Cerrado | Navegación y rutas localizadas implementadas | Técnico |
| Especialidades y proceso de viaje | Cerrado | Estructura editorial implementada; falta sustituir textos provisionales | Técnico / cliente |
| Formulario de contacto | Cerrado | Validación server-side, honeypot y rate limiting implementados | Técnico |
| Leads en Supabase | Cerrado | Inserción y trazabilidad implementadas; requiere prueba externa final | Técnico |
| Emails Resend | Cerrado en Preview | Prueba de envío realizada; falta dominio/remitente profesional para producción | Cliente / Resend |
| Chatbot Aura | Cerrado en Preview | Orientación y derivación implementadas; requiere prueba final de errores y límites | Técnico |
| Telegram | Cerrado en Preview | Enlace funcional; revisar desde dispositivos externos antes de publicar | Técnico / cliente |
| Supabase Auth | Cerrado técnicamente | Confirmar URLs definitivas de redirección en producción | Técnico |
| Dashboard administrativo | Implementado | Completar pruebas de roles y operaciones | Técnico |
| CRM | Implementado | Validar notas, estados, filtros y eliminación auditada | Técnico |
| Upstash Redis | Cerrado | Variables configuradas y conexión REST validada con `PONG` | Técnico |
| GitHub | Cerrado | Secret scanning, push protection y protección de rama verificadas | Técnico |
| Vercel Preview | Cerrado | Despliegue operativo con variables configuradas | Técnico |

## 4. Seguridad y gestión de secretos

### Cerrado

- No hay secretos rastreados en Git.
- `.secrets/` está excluida mediante `.gitignore`.
- Las claves server-side no utilizan prefijo `NEXT_PUBLIC_`.
- El `SUPABASE_SERVICE_ROLE_KEY` solo se utiliza en servidor.
- Las rutas administrativas validan sesión y perfil en servidor.
- La eliminación de leads exige rol `admin` y deja auditoría previa.
- GitHub tiene secret scanning y push protection activos.
- El token personal de Supabase que quedó expuesto fue revocado y eliminado del entorno local.
- Upstash está configurado para limitar abuso distribuido.
- La carpeta local de secretos fue cifrada mediante EFS.

### Reglas operativas obligatorias

- No guardar tokens en Markdown, capturas, commits, incidencias ni conversaciones.
- No copiar secretos desde `.secrets/` al código ni a variables públicas.
- Mantener BitLocker activo y guardar su clave de recuperación fuera del equipo.
- Mantener copia del certificado EFS fuera del ordenador.
- Rotar cualquier credencial que vuelva a exponerse.
- Revisar las variables de Vercel por entorno: Preview y Production nunca deben mezclarse.

## 5. Datos, Supabase y permisos

### Arquitectura vigente

Las tablas operativas son `leads`, `lead_notes`, `lead_events`, `audit_logs` y `profiles`. Las estructuras de agenda y reservas permanecen como legacy y no participan en el flujo público actual.

### Bloqueantes o pendientes de validación

1. Ejecutar una prueba RLS controlada con `anon`, usuario autenticado, `manager` y `admin`.
2. Confirmar que un `manager` no puede exportar ni eliminar.
3. Confirmar que un `admin` puede operar y eliminar con auditoría.
4. Verificar que las notas aparecen tras guardarse y que generan actividad.
5. Confirmar backups y procedimiento de restauración en el proyecto de producción.
6. Confirmar que Preview y Producción utilizan proyectos, datos y credenciales separados.

No se aplicarán migraciones destructivas sin copia de seguridad y procedimiento de reversión documentado.

## 6. Checklist manual de Preview

| Prueba | Resultado | Evidencia requerida |
|---|---|---|
| Enviar formulario desde navegador externo | Pendiente de consolidar | Lead creado y referencia recibida |
| Confirmar evento `lead_created` | Pendiente de consolidar | Evento visible en Supabase/CRM |
| Confirmar email al cliente | Verificado previamente | Email recibido |
| Confirmar email interno | Verificado previamente | Email recibido por el equipo |
| Probar chatbot con consulta informativa | Verificado previamente | Respuesta válida |
| Probar error o límite del chatbot | Pendiente | Mensaje amable y alternativa de contacto |
| Probar derivación a Telegram | Verificado en entorno disponible | Apertura correcta en dispositivo externo |
| Acceder como `manager` | Pendiente de consolidar | Permisos correctos |
| Acceder como `admin` | Verificado previamente | Acceso y operaciones correctas |
| Añadir y visualizar una nota | Pendiente de consolidar | Nota visible en actividad |
| Cambiar clasificación del lead | Verificado previamente | Estado persistido |
| Eliminar lead de prueba como `admin` | Pendiente de consolidar | Confirmación y `audit_logs` |
| Intentar eliminar como `manager` | Pendiente | Operación rechazada |
| Probar responsive móvil y escritorio | Pendiente de consolidar | Capturas o registro manual |
| Revisar `/es` y `/en` | Pendiente de consolidar | Navegación sin rutas rotas |
| Revisar botones flotantes | Verificado previamente | Sin solapamiento visual |

## 7. Bloqueadores para producción

Estos puntos impiden una publicación comercial definitiva:

- Dominio definitivo de la marca.
- Dominio y remitente profesional verificados en Resend.
- Textos legales, privacidad, cookies y consentimiento revisados.
- Contenidos reales aprobados por el cliente.
- Imágenes reales con autorización de uso.
- Contactos y horarios comerciales definitivos.
- Variables y credenciales separadas para Producción.
- Proyecto Supabase de Producción confirmado y aislado de Preview.
- Backups y procedimiento de restauración confirmados.
- URLs de redirección de Supabase Auth configuradas para el dominio final.
- Pruebas RLS y pruebas manuales de roles completadas.

## 8. Preparación de publicación

Antes de promover a Producción:

1. Ejecutar `npm ci`.
2. Ejecutar `npm run lint`.
3. Ejecutar `npm run typecheck`.
4. Ejecutar `npm run build`.
5. Ejecutar `npm audit --omit=dev --audit-level=high`.
6. Aplicar únicamente migraciones revisadas sobre Supabase Producción.
7. Configurar variables de Producción desde el gestor correspondiente.
8. Configurar dominio, HTTPS, Resend y redirecciones de Auth.
9. Ejecutar la checklist manual completa.
10. Obtener aprobación del cliente sobre contenido, legal, imágenes y contactos.

## 9. Rollback y continuidad

- Promover una versión anterior desde Vercel si el despliegue falla.
- Mantener Preview disponible para validar una corrección antes de producción.
- No borrar migraciones ni datos sin backup.
- Registrar cualquier incidente en el historial del proyecto.
- Revocar inmediatamente cualquier secreto expuesto y sustituirlo en el entorno afectado.
- Restaurar Supabase desde backup siguiendo el procedimiento del proveedor si se produce pérdida de datos.

## 10. Fuera de alcance de este cierre

- Integración oficial de WhatsApp Business.
- Automatización avanzada del ciclo comercial.
- Agenda de asesores.
- CMS para edición por personal no técnico.
- Pagos, reservas o contratación online.
- Diagnóstico o recomendación clínica automatizada.
- Campañas de Google Ads, analítica avanzada y optimización SEO continua.

## 11. Criterio final de aceptación

La Preview se considera cerrada cuando todas las pruebas manuales de la sección 6 estén verificadas y documentadas, las variables estén separadas por entorno y no existan contradicciones documentales.

Producción solo obtiene veredicto **GO** cuando los bloqueadores de la sección 7 estén cerrados y el cliente apruebe contenidos, legal, imágenes, contactos y dominio.

Este documento sustituye como referencia operativa a las auditorías anteriores. Los documentos históricos permanecen únicamente como contexto.
