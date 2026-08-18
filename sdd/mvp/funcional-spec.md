# Especificación funcional — Aura Estética

**Versión:** 0.1 — MVP de prototipo  
**Estado:** Borrador funcional para validación con el cliente  
**Ubicación temporal:** Dubái  
**Idiomas:** Español e inglés  
**Moneda del prototipo:** EUR

## 1. Propósito del producto

Aura Estética será un escaparate digital de servicios de estética y tratamientos personales que permita a los clientes descubrir los servicios disponibles, consultar sus detalles y solicitar una cita real con fecha y hora.

El administrador podrá gestionar el catálogo y revisar, aprobar y dar seguimiento a las solicitudes recibidas. El prototipo se utilizará para presentar la propuesta al cliente y recoger retroalimentación real antes de cerrar las especificaciones definitivas.

## 2. Objetivo del MVP

Validar que una clínica de estética puede presentar sus servicios de forma clara y convertir el interés de los visitantes en solicitudes de cita gestionables por el equipo administrativo.

El MVP debe ser rápido, robusto y suficientemente completo para probar el flujo principal. No pretende cerrar todavía las decisiones definitivas de marca, ubicación, automatización conversacional o requisitos operativos de la clínica.

## 3. Usuarios y roles

### 3.1 Visitante o cliente

Puede:

- Explorar el catálogo de servicios.
- Buscar y filtrar servicios por categoría.
- Consultar el detalle de un servicio.
- Seleccionar una sede, profesional o tipo de atención cuando estén configurados.
- Solicitar una cita indicando fecha y hora preferidas.
- Solicitar transporte como opción adicional durante la reserva.
- Adjuntar imágenes o documentos a la solicitud.
- Recibir un correo de confirmación con el resumen de la solicitud.
- Contactar con la clínica mediante WhatsApp.

### 3.2 Administrador

Puede:

- Iniciar sesión de forma segura.
- Recuperar su contraseña.
- Crear, editar, ocultar y eliminar servicios.
- Gestionar imágenes y vídeos asociados a los servicios.
- Crear y gestionar distintos usuarios administrativos.
- Gestionar categorías y su orden de presentación.
- Consultar las solicitudes de citas y contactos.
- Aprobar o rechazar solicitudes.
- Cambiar el estado de las solicitudes.
- Revisar los datos de contacto, fecha, hora, servicio, transporte y archivos adjuntos.

### 3.3 Futuro rol de secretaria

La operación podrá evolucionar para que una secretaria continúe las conversaciones iniciadas por el asistente y gestione la agenda manualmente. Este comportamiento no forma parte del alcance cerrado del MVP.

## 4. Alcance funcional del MVP

### 4.1 Catálogo de servicios

El sistema mostrará un catálogo visual con servicios de estética y cuidado personal.

El catálogo deberá permitir:

- Mostrar servicios paginados con un número configurable de elementos por página.
- Buscar por nombre o texto relevante del servicio.
- Filtrar por categoría.
- Ordenar o priorizar categorías y servicios destacados.
- Ocultar servicios que no estén disponibles sin eliminarlos definitivamente.
- Mostrar categorías visuales y populares en posiciones prioritarias.

Las categorías iniciales podrán incluir tratamientos faciales, tratamientos corporales, cuidado personal y transporte, pero deberán poder modificarse desde el panel de administración.

### 4.2 Datos de un servicio

Cada servicio podrá contener:

- Nombre.
- Categoría.
- Descripción.
- Beneficios.
- Duración estimada.
- Precio de referencia en euros.
- Imágenes.
- Vídeo explicativo opcional.
- Estado de visibilidad.
- Orden o prioridad de presentación.

El precio se mostrará como referencia y no implicará un cobro online ni una confirmación automática del importe final.

### 4.3 Página de detalle

Cada servicio tendrá una página dedicada con su información principal, galería multimedia, precio de referencia, beneficios y duración.

La página incluirá una acción clara para iniciar la solicitud de cita o pedir información. También podrá mostrar información de sede, profesional o tipo de atención cuando estos datos estén configurados.

### 4.4 Solicitud y reserva de cita

El usuario podrá solicitar una cita con una fecha y hora preferidas. La solicitud deberá incluir como mínimo:

- Nombre.
- Teléfono.
- Correo electrónico.
- Servicio solicitado.
- Fecha preferida.
- Hora preferida.
- Mensaje o información adicional.
- Opción de solicitar transporte.
- Archivos adjuntos opcionales, incluyendo imágenes y documentos.

La cita no quedará confirmada automáticamente. La solicitud deberá pasar por la aprobación del administrador.

El sistema deberá permitir seleccionar, cuando corresponda:

- Sede.
- Profesional.
- Tipo de atención.

La disponibilidad real de sedes, profesionales y agenda podrá configurarse después de la reunión con el cliente. Para el prototipo se utilizará Dubái como ubicación temporal.

### 4.5 Estados de las solicitudes

Cada solicitud tendrá uno de los siguientes estados:

- **Pendiente:** recibida y aún no revisada.
- **Contactado:** el equipo ya se ha puesto en contacto con el cliente.
- **Confirmado:** la cita ha sido aprobada.
- **Completado:** la cita o atención ya ha finalizado.
- **Cancelado:** la solicitud o cita ha sido cancelada.

El administrador podrá actualizar el estado y consultar el historial o información relevante de la solicitud según lo que se defina en la fase técnica.

### 4.6 Confirmaciones por correo electrónico

Después de enviar una solicitud, el sistema mostrará una pantalla de confirmación y enviará un correo automático al cliente y al administrador.

El correo deberá incluir:

- Nombre y datos de contacto del cliente.
- Servicio solicitado.
- Fecha y hora preferidas.
- Sede, profesional o tipo de atención, si fueron seleccionados.
- Indicación de si se solicitó transporte.
- Mensaje o información adicional relevante.
- Aviso de que la cita queda pendiente de aprobación, si todavía no ha sido confirmada.

### 4.7 WhatsApp y asistente inicial

El MVP incluirá un botón o asistente flotante que conecte con un número de WhatsApp de prueba mediante un mensaje predefinido.

El chatbot avanzado de tipo recepcionista, incluyendo respuestas impulsadas por IA, consulta de citas y agenda, transferencia contextual a la secretaria y continuidad de la conversación, queda fuera del alcance cerrado del MVP.

Se reservará la estructura necesaria para definirlo posteriormente según las especificaciones que aporte el cliente.

### 4.8 Panel de administración

El panel estará protegido mediante autenticación y permitirá administrar el catálogo, categorías, usuarios y solicitudes.

El administrador podrá:

- Acceder y cerrar sesión.
- Recuperar la contraseña.
- Gestionar otros usuarios administrativos.
- Crear, editar, ocultar y eliminar servicios.
- Subir y reemplazar imágenes y vídeos.
- Gestionar categorías.
- Cambiar el orden o visibilidad de categorías y servicios.
- Consultar y filtrar solicitudes.
- Aprobar solicitudes y cambiar sus estados.

Los permisos detallados por tipo de usuario se definirán cuando el cliente confirme la estructura interna de su equipo.

## 5. Navegación principal

La experiencia pública deberá incluir como mínimo:

- Inicio.
- Catálogo de servicios.
- Detalle de servicio.
- Formulario de solicitud de cita.
- Confirmación de solicitud.
- Información de contacto.
- Avisos legales y privacidad.

El panel administrativo tendrá navegación separada y protegida.

## 6. Requisitos de idioma y contenido

El prototipo deberá estar disponible en español e inglés. El contenido de servicios y los textos de interfaz deberán poder mantenerse en ambos idiomas, aunque el método concreto de gestión de traducciones se definirá en la especificación técnica.

La ubicación inicial será Dubái y podrá cambiarse posteriormente. Los textos, datos de contacto, número de WhatsApp, precios, categorías y contenidos visuales se considerarán configurables o provisionales.

Se utilizará una estética estándar de clínica de tratamientos estéticos, con imágenes de stock y sin identidad visual definitiva proporcionada por el cliente.

## 7. Avisos legales y privacidad

El prototipo incluirá páginas o elementos estándar para:

- Política de privacidad.
- Consentimiento para el tratamiento de datos personales.
- Aviso legal.
- Política de cookies, si aplica.

Estos textos serán provisionales y deberán ser revisados y sustituidos por textos legalmente validados antes de un uso comercial.

## 8. Analítica y calidad de experiencia

Se priorizarán la velocidad de carga, la estabilidad y la robustez del flujo de solicitud. La analítica se limitará inicialmente a los eventos necesarios para validar el MVP, como:

- Visualización del catálogo.
- Visualización de un servicio.
- Inicio y envío del formulario.
- Solicitud enviada correctamente.
- Clic en WhatsApp.

No se incorporarán sistemas de analítica complejos hasta confirmar que aportan valor a la validación del producto.

## 9. Fuera del alcance del MVP

Quedan fuera del alcance inicial:

- Pagos online.
- Comercio electrónico tradicional o carrito de compra.
- Chatbot avanzado con IA conectado a la agenda.
- Transferencia automática de conversaciones a una secretaria.
- Gestión avanzada de disponibilidad en tiempo real, salvo la información mínima necesaria para solicitar y aprobar citas.
- Identidad visual definitiva.
- Ubicación definitiva y datos operativos finales de la clínica.
- Textos legales finales validados por un profesional.
- Automatizaciones complejas de marketing o CRM.

## 10. Criterios de aceptación del MVP

El MVP se considerará funcionalmente terminado cuando:

1. Un visitante pueda navegar por el catálogo, buscar y filtrar servicios.
2. Cada servicio pueda mostrar información, imágenes, vídeo opcional, duración y precio de referencia.
3. Un visitante pueda enviar una solicitud con fecha y hora, datos de contacto, opción de transporte y archivos adjuntos.
4. La solicitud quede registrada con estado `pendiente` y pueda ser revisada por un administrador.
5. El administrador pueda aprobar la solicitud y modificar su estado.
6. El cliente y el administrador reciban el correo de confirmación con el resumen de la solicitud.
7. El visitante pueda contactar mediante WhatsApp usando el número de prueba.
8. El administrador pueda gestionar servicios, categorías, usuarios y recuperación de contraseña.
9. La interfaz pueda utilizarse en español e inglés.
10. El flujo principal sea estable, rápido y apto para una demostración real al cliente.

## 11. Decisiones pendientes para la reunión con el cliente

- Ubicación y sedes definitivas.
- Profesionales y tipos de atención disponibles.
- Reglas reales de disponibilidad y agenda.
- Número de WhatsApp definitivo.
- Comportamiento exacto del chatbot y alcance de IA.
- Categorías y servicios finales.
- Identidad visual y banco de imágenes aprobado.
- Roles y permisos administrativos.
- Textos legales definitivos.
- Reglas de confirmación, cancelación y reprogramación.

