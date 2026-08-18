# Design reference — Aura Estética

**Versión:** 0.1 — MVP de prototipo  
**Estado:** Dirección visual provisional pendiente de validación de marca  
**Ámbito:** Experiencia pública y panel administrativo esencial

## 1. Dirección visual

Aura Estética debe transmitir una clínica estética de alta gama: profesional, limpia, segura y cuidada, con una sensación de exclusividad sin parecer fría ni excesivamente médica.

La interfaz debe priorizar la conversión hacia la solicitud de cita. Cada pantalla pública debe responder rápidamente a tres preguntas:

1. Qué servicios ofrece la clínica.
2. Qué beneficio puede obtener la persona visitante.
3. Cómo puede solicitar información o una cita.

La identidad visual de este documento es provisional. El logotipo, las fotografías, los textos, los precios, la ubicación, los datos de contacto y el número de WhatsApp deben considerarse contenido de demostración hasta recibir la aprobación del cliente.

### Personalidad

- Premium, serena y profesional.
- Femenina sin recurrir a clichés visuales.
- Cercana y clara en formularios y mensajes operativos.
- Editorial en titulares e imágenes, práctica en navegación y administración.

### Evitar

- Gradientes intensos, neones o colores médicos genéricos.
- Fotografías de stock con piel artificial, poses exageradas o resultados poco creíbles.
- Exceso de dorado, adornos ornamentales o apariencia de joyería.
- Lenguaje de promesas absolutas o resultados garantizados.
- Interfaces oscuras, recargadas o con demasiadas animaciones.

## 2. Paleta provisional

La paleta combina blanco puro, azul zafiro y dorado champagne. Los valores son una propuesta inicial y deberán sustituirse si el cliente entrega códigos de marca definitivos.

| Token | Valor provisional | Uso principal |
|---|---|---|
| `color-brand-sapphire` | `#12395B` | Marca, encabezados destacados, enlaces y elementos de confianza |
| `color-brand-sapphire-dark` | `#0B263D` | Hover, navegación oscura y texto sobre fondos claros |
| `color-brand-champagne` | `#C8A96B` | Acentos, detalles, indicadores activos y llamadas premium |
| `color-brand-champagne-light` | `#F2E9D7` | Fondos suaves, badges y superficies decorativas |
| `color-white` | `#FFFFFF` | Fondo principal y superficies de contenido |
| `color-surface` | `#F7F9FC` | Secciones alternas, campos y áreas de separación |
| `color-text` | `#17212B` | Texto principal |
| `color-text-muted` | `#5D6874` | Texto secundario y metadatos |
| `color-border` | `#DCE3EA` | Bordes, divisores y campos |
| `color-success` | `#247A56` | Confirmaciones y estados positivos |
| `color-warning` | `#9A6A12` | Pendiente, aviso y atención requerida |
| `color-danger` | `#B04444` | Errores, cancelaciones y acciones destructivas |

### Reglas de uso

- El blanco debe dominar la experiencia pública.
- El azul zafiro se utiliza para estructura, confianza y acciones principales.
- El dorado champagne se reserva para acentos; no debe utilizarse como color de texto pequeño sobre blanco.
- Los botones primarios deben usar azul zafiro con texto blanco.
- Los botones secundarios pueden usar fondo blanco, borde zafiro y texto zafiro.
- Los estados deben incluir texto o iconografía además del color.
- Antes de producción se debe verificar el contraste de todos los pares conforme a WCAG 2.2 AA.

## 3. Tipografía

Se recomienda una combinación de serif editorial y sans serif limpia. La elección concreta de fuentes puede cambiarse durante la implementación, pero debe conservar esta función:

- **Titulares:** serif de contraste moderado, elegante y legible en móvil. Ejemplos de dirección: Cormorant Garamond, DM Serif Display o una alternativa equivalente.
- **Interfaz y cuerpo:** sans serif neutra y abierta. Ejemplos de dirección: Inter, Geist o una alternativa equivalente.

### Jerarquía

- `display`: titular principal de la home; grande, breve y con ritmo editorial.
- `h1`: una sola intención principal por página.
- `h2`: secciones y agrupaciones de contenido.
- `h3`: tarjetas, servicios y bloques secundarios.
- Cuerpo regular: texto explicativo y descripciones.
- Texto pequeño: metadatos, etiquetas y ayudas; nunca debe contener información esencial por sí solo.

Los titulares deben utilizar frases cortas. El cuerpo debe mantener una anchura cómoda de lectura, aproximadamente entre 55 y 75 caracteres por línea. La escala debe reducirse progresivamente en móvil sin perder contraste ni jerarquía.

## 4. Fotografía, vídeo e iconografía

### Fotografía

La dirección recomendada es **lifestyle clínico premium**:

- Luz natural o difusa, fondos despejados y espacios luminosos.
- Personas reales o representadas de forma natural, con diversidad y piel visible sin retoque excesivo.
- Expresiones tranquilas y resultados sutiles.
- Detalles de manos, texturas, cabinas, productos y preparación del tratamiento.
- Composición con espacio negativo para permitir superponer titulares o llamadas a la acción.

Las imágenes de catálogo deben mantener una relación visual consistente: temperatura de color neutra-cálida, contraste moderado y acabado limpio. No se deben presentar imágenes de stock como resultados clínicos reales.

### Vídeo

Los vídeos de servicios son opcionales y deben complementar la explicación, no sustituirla. Deben incluir poster image, controles accesibles, subtítulos cuando contengan voz y carga diferida.

### Iconografía

Usar iconos lineales, simples y de grosor consistente. Los iconos apoyan la comprensión —duración, beneficios, ubicación, WhatsApp o transporte—, pero no reemplazan etiquetas textuales importantes.

## 5. Layout y responsive

La experiencia será mobile-first y deberá sentirse espaciosa sin desperdiciar espacio en pantallas pequeñas.

- Contenedor de contenido centrado con anchura máxima aproximada de `1200–1280px`.
- Márgenes laterales amplios en escritorio y seguros en móvil.
- Grid de servicios adaptable: una columna en móvil, dos en tablet y tres o cuatro en escritorio según el contenido.
- CTA principal visible en el primer viewport de la home y del detalle de servicio.
- Formularios divididos en grupos cortos, con etiquetas persistentes y errores junto al campo.
- En móvil, evitar tablas anchas: usar tarjetas o filas apiladas en el panel admin.
- Mantener objetivos táctiles de al menos `44px`.

Los breakpoints concretos deben seguir los tokens del proyecto Tailwind. El diseño no debe depender de un ancho único ni de hover para revelar información esencial.

## 6. Experiencia pública

### Inicio

Orden recomendado:

1. Header sencillo con marca provisional, navegación, selector de idioma y CTA de reservar.
2. Hero visual con propuesta de valor clara, imagen editorial y CTA principal.
3. Categorías o tratamientos prioritarios.
4. Servicios destacados con precio de referencia, duración y acceso al detalle.
5. Bloque de confianza: beneficios, proceso o estándares de atención.
6. Información provisional de sede y transporte, si aplica.
7. CTA final de solicitud de cita.
8. Footer con contacto, WhatsApp, privacidad, aviso legal e idioma.

El hero debe vender la experiencia y la confianza, no prometer resultados médicos. La acción principal debe ser “Solicitar cita” o equivalente localizado; WhatsApp debe permanecer como alternativa secundaria.

### Catálogo

El catálogo debe facilitar exploración rápida mediante búsqueda, filtros por categoría y paginación. Cada tarjeta debe mostrar imagen, nombre, categoría, duración, precio de referencia y una acción clara.

Los estados vacíos deben explicar qué ocurrió y ofrecer una acción para limpiar filtros o volver a explorar. Los servicios ocultos no deben aparecer en la experiencia pública.

### Detalle de servicio

La página debe presentar primero el nombre, la imagen principal, la propuesta de valor y el CTA. Después se muestran beneficios, duración, precio de referencia, galería o vídeo, información complementaria y una nueva llamada a reservar.

El precio debe etiquetarse como referencia y nunca sugerir que existe un cobro online o una confirmación automática.

### Reserva y contacto

El formulario debe sentirse seguro, corto y guiado. Agrupar los campos en:

- Servicio y preferencia de fecha/hora.
- Datos personales y contacto.
- Transporte y archivos adjuntos.
- Mensaje adicional y consentimiento.

Los mensajes deben indicar claramente qué es obligatorio, qué formatos de archivo se aceptan y que la cita queda pendiente de aprobación. La validación debe ser localizada en español e inglés.

### Confirmación

Mostrar un estado positivo claro, resumen de la solicitud, aviso de aprobación pendiente y alternativas de contacto. No mostrar datos internos ni rutas de almacenamiento. El enlace a WhatsApp puede aparecer como siguiente paso opcional.

### Asistente de WhatsApp

El botón flotante debe ser reconocible, no bloquear campos ni contenido y mantener una etiqueta accesible. En el MVP enlaza a WhatsApp mediante un mensaje predefinido; no debe presentarse como chatbot de IA.

## 7. Panel administrativo esencial

El panel debe compartir colores, tipografía, botones, formularios y estados con la experiencia pública, pero priorizar densidad informativa y eficiencia operativa.

Áreas principales:

- Dashboard con resumen de solicitudes pendientes y actividad reciente.
- Servicios y categorías con búsqueda, filtros, visibilidad y orden.
- Solicitudes con estado, servicio, fecha, contacto y acciones.
- Agenda con disponibilidad, bloqueos y reservas.
- Usuarios y configuración sensible únicamente para `admin`.

### Estados de solicitud

Usar badges con texto visible para `pending`, `contacted`, `confirmed`, `completed` y `cancelled`. Cada cambio debe ofrecer feedback inmediato, confirmación para acciones destructivas y un mensaje de error recuperable.

Los datos de clientes deben mostrarse solo a usuarios autorizados. Los adjuntos deben abrirse mediante acceso seguro y nunca exponer rutas internas.

## 8. Componentes base

El sistema debe definir variantes coherentes para:

- Botones primario, secundario, ghost y destructivo.
- Inputs, selects, textarea, date picker y carga de archivos.
- Cards de servicio y tarjetas de resumen.
- Badges de estado.
- Modal de confirmación y drawer móvil.
- Toasts o mensajes inline.
- Skeletons y estados de carga.
- Empty states y páginas de error.
- Header, navegación admin, breadcrumbs y footer.

Los componentes deben apoyarse en shadcn/ui cuando exista un patrón adecuado y mantener HTML semántico. Las variantes visuales deben expresarse mediante tokens, no mediante estilos aislados por pantalla.

## 9. Accesibilidad y movimiento

El objetivo de diseño es WCAG 2.2 AA:

- Contraste suficiente para texto, controles y estados.
- Navegación completa por teclado.
- Foco visible y nunca eliminado globalmente.
- Labels asociados a todos los campos.
- Errores anunciables y vinculados al campo correspondiente.
- Alt text localizado para imágenes de servicio.
- No depender solo del color, hover o movimiento.
- Respetar `prefers-reduced-motion`.

Las animaciones deben ser breves y funcionales: aparición suave de secciones, feedback de botones, transiciones de navegación y carga progresiva de imágenes. Evitar parallax intenso, auto-play invasivo y efectos que retrasen la reserva.

## 10. Internacionalización y contenido provisional

El diseño debe funcionar con `/es` y `/en`. Los componentes deben tolerar diferencias de longitud entre idiomas, especialmente en botones, navegación, estados y mensajes de validación.

Todo contenido no aprobado debe etiquetarse internamente como provisional, incluyendo:

- Nombre y logotipo.
- Fotografías y vídeos.
- Servicios, categorías y descripciones.
- Precios y moneda.
- Ubicación y horarios.
- Teléfono y WhatsApp.
- Textos legales y de privacidad.

La interfaz no debe mostrar etiquetas de “demo” al visitante final salvo que se trate de un entorno de presentación controlado; la clasificación provisional es una regla de gestión de contenido para el equipo.

## 11. Fuera de alcance visual del MVP

Este documento no define:

- Pagos, carrito o comercio electrónico.
- Chatbot de IA o consulta automática por WhatsApp.
- Sincronización con calendarios externos.
- Identidad de marca definitiva.
- Reglas avanzadas por profesional.
- Reprogramación o cancelación autónoma por parte del cliente.
- Campañas de marketing o CRM.

## 12. Criterios de aceptación de diseño

El diseño de cada pantalla será válido cuando:

1. La acción principal sea evidente y accesible.
2. La experiencia sea coherente en español e inglés.
3. Los servicios visibles y ocultos respeten las reglas del catálogo.
4. El formulario comunique estados, errores y aprobación pendiente con claridad.
5. La interfaz funcione en móvil, tablet y escritorio.
6. El panel distinga permisos y estados sin depender únicamente del color.
7. Las imágenes y los textos provisionales puedan sustituirse sin rediseñar la estructura.
8. Los componentes cumplan las reglas WCAG 2.2 AA definidas en este documento.
9. La experiencia mantenga una percepción premium sin sacrificar claridad ni velocidad.
