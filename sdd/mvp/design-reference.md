# Design reference — Aura Estética

**Versión:** 0.2 — Escaparate de turismo sanitario y captación de leads
**Estado:** Dirección visual y de experiencia actualizada; pendiente de validación de marca y modelo operativo
**Ámbito:** Experiencia pública, captación comercial y panel operativo esencial

## 1. Dirección del proyecto

Aura Estética no debe presentarse como una tienda de tratamientos ni como una clínica propia. La web será un escaparate editorial y comercial para personas españolas que valoran recibir atención sanitaria en Turquía.

La experiencia debe ayudar a la visitante a:

1. Entender qué especialidades y servicios están disponibles.
2. Conocer las clínicas y profesionales asociados.
3. Comprender el proceso clínico y logístico antes de viajar.
4. Sentirse acompañada y disponer de información para decidir con calma.
5. Solicitar una llamada con un asesor de Aura.

La conversión principal deja de ser “reservar una cita exacta” y pasa a ser **solicitar una llamada de orientación**. Aura coordina información, comunicación y logística; el diagnóstico, la indicación y la atención sanitaria corresponden al centro y al profesional responsable.

## 2. Principios de diseño y contenido

- **Confianza antes que urgencia:** mostrar proceso, centros, profesionales, autorizaciones, inclusiones, exclusiones y seguimiento.
- **Información antes que promesa:** explicar opciones y límites sin garantizar resultados.
- **Acompañamiento humano:** priorizar la llamada y la comunicación con un asesor frente a la automatización.
- **Transparencia clínica:** cada servicio queda sujeto a valoración médica y disponibilidad real.
- **Transparencia operativa:** distinguir lo que gestiona Aura, lo que gestiona un socio y lo que decide la clínica.
- **Seguridad visible:** incluir preparación, documentación, recuperación, incidencias y continuidad asistencial.
- **Mobile-first:** la mayoría de las usuarias llegará desde anuncios, redes sociales o WhatsApp.

## 3. Dirección visual

Aura debe transmitir una marca española de acompañamiento sanitario internacional: profesional, serena, cálida, clara y cuidada. Debe tener una sensación premium, pero no parecer una joyería, un resort ni una página de ofertas médicas.

### Personalidad

- Premium, serena y profesional.
- Femenina sin recurrir a clichés visuales.
- Cercana y clara en formularios y mensajes operativos.
- Editorial en titulares e imágenes.
- Práctica y tranquilizadora en la información clínica y logística.

### Evitar

- Lenguaje de venta agresiva, contadores de urgencia o descuentos como argumento central.
- Promesas absolutas: “sin riesgos”, “resultado garantizado”, “sin dolor” o “el mejor profesional”.
- Estética de clínica genérica, marketplace de tratamientos o agencia de vacaciones.
- Fotografías de stock con resultados exagerados o piel artificial.
- Exceso de dorado, adornos ornamentales, neones o gradientes intensos.
- Animaciones que distraigan de la información o retrasen el contacto.

## 4. Paleta provisional

La paleta combina blanco, azul zafiro y dorado champagne. Los valores son provisionales y deberán sustituirse si el cliente entrega códigos de marca definitivos.

| Token | Valor provisional | Uso principal |
|---|---|---|
| `color-brand-sapphire` | `#12395B` | Marca, encabezados, enlaces y acciones de confianza |
| `color-brand-sapphire-dark` | `#0B263D` | Hover, navegación oscura y fondos de contraste |
| `color-brand-champagne` | `#C8A96B` | Acentos, detalles e indicadores activos |
| `color-brand-champagne-light` | `#F2E9D7` | Fondos suaves, badges y superficies editoriales |
| `color-white` | `#FFFFFF` | Fondo principal y superficies de contenido |
| `color-surface` | `#F7F9FC` | Secciones alternas, campos y separadores |
| `color-text` | `#17212B` | Texto principal |
| `color-text-muted` | `#5D6874` | Texto secundario y metadatos |
| `color-border` | `#DCE3EA` | Bordes, divisores y campos |
| `color-success` | `#247A56` | Confirmaciones y estados positivos |
| `color-warning` | `#9A6A12` | Pendientes y avisos |
| `color-danger` | `#B04444` | Errores y cancelaciones |

### Reglas

- El blanco debe dominar la experiencia pública.
- El azul zafiro representa estructura, confianza y acciones principales.
- El champagne se reserva para acentos y no para texto pequeño sobre blanco.
- Los estados deben incluir texto o iconografía además del color.
- Verificar contraste conforme a WCAG 2.2 AA antes de producción.

## 5. Tipografía

Se recomienda combinar una serif editorial con una sans serif limpia:

- **Titulares:** serif de contraste moderado, elegante y legible en móvil. Referencias: Cormorant Garamond o DM Serif Display.
- **Interfaz y cuerpo:** sans serif neutra y abierta. Referencias: Inter o Geist.

Los titulares deben ser breves y orientados a una sola intención. El texto explicativo debe ser fácil de escanear, con párrafos cortos, listas y etiquetas visibles para “sujeto a valoración médica”, “incluido” y “no incluido”.

## 6. Fotografía, vídeo e iconografía

### Fotografía

La dirección es **acompañamiento sanitario premium**:

- Personas reales o representadas de forma natural, con diversidad.
- Pacientes tranquilas, asesoras, profesionales, clínicas, recepción, traslados y espacios de recuperación.
- Luz natural o difusa, fondos despejados y ambiente limpio.
- Imágenes de Estambul y Turquía solo como contexto, nunca para convertir una intervención en una experiencia vacacional.
- Espacio negativo para titulares y llamadas a la acción.
- No presentar imágenes de stock como resultados clínicos reales.

Las fotografías de antes y después, testimonios identificables y casos reales requieren consentimiento documentado, contexto clínico y revisión legal.

### Vídeo

Puede utilizarse para presentar el proceso, una clínica, una profesional o una experiencia de acompañamiento. No debe sustituir la explicación escrita ni prometer resultados. Incluir poster image, subtítulos, controles accesibles y carga diferida.

### Iconografía

Usar iconos lineales y sencillos para especialidad, llamada, ubicación, transporte, alojamiento, intérprete, documentación y seguimiento. Los iconos apoyan la comprensión, pero no sustituyen etiquetas textuales.

## 7. Arquitectura pública

### Inicio

Orden recomendado:

1. Header con marca, Especialidades, Clínicas y profesionales, Cómo funciona, FAQ y CTA de llamada.
2. Hero con propuesta de valor, imagen editorial y CTA principal.
3. Bloque de confianza: acompañamiento desde España, centros asociados y proceso transparente.
4. Especialidades prioritarias: capilar, dental, estética, dermatología, bariátrica, oftalmología y fertilidad.
5. Cómo funciona: orientación, valoración, preparación del viaje y seguimiento.
6. Clínicas y profesionales destacados con información verificable.
7. Qué incluye el acompañamiento: traslados, alojamiento, comunicación e intérprete cuando proceda.
8. Seguridad y continuidad asistencial.
9. Testimonios o casos únicamente si están autorizados y contextualizados.
10. CTA final para solicitar una llamada.
11. Footer con contacto, WhatsApp, privacidad, aviso legal, cookies e idioma.

### Hero recomendado

**Tu tratamiento en Turquía, acompañado desde España.**

Clínicas y profesionales seleccionados, información clara y coordinación de todo el proceso para que puedas decidir con calma y viajar con un plan.

**CTA principal:** Hablar con un asesor.
**CTA secundario:** Ver nuestras especialidades.

El hero no debe mostrar precios agresivos ni prometer resultados. La imagen debe reforzar seguridad y acompañamiento, no una idea de vacaciones.

### Especialidades

El catálogo debe agruparse por necesidades y especialidades:

- Capilar y cuero cabelludo.
- Odontología.
- Cirugía estética y corporal.
- Dermatología y medicina estética.
- Bariátrica y metabolismo.
- Oftalmología.
- Fertilidad y salud de la mujer.
- Otras especialidades bajo valoración.

Cada tarjeta debe mostrar nombre, descripción breve, imagen o recurso visual, CTA, disponibilidad y etiqueta “Sujeto a valoración médica”. No mostrar precio, duración ni disponibilidad como definitivos sin verificación del centro.

### Detalle de especialidad

La página debe seguir esta jerarquía:

1. Qué es la especialidad y para quién puede ser relevante.
2. Servicios que puede incluir, sin presentarlos como indicación médica.
3. Qué debe valorar el profesional.
4. Proceso antes, durante y después del viaje.
5. Qué incluye y qué no incluye la coordinación.
6. Riesgos, limitaciones y necesidad de seguimiento.
7. Clínicas y profesionales disponibles.
8. Preguntas frecuentes.
9. CTA para hablar con un asesor.

El texto debe usar “puede incluir”, “opciones disponibles” y “sujeto a valoración médica”. No utilizar “garantizado”, “sin riesgos”, “sin dolor” o “resultado asegurado”.

### Clínicas y profesionales

La web debe tener una sección específica para construir confianza. Cada ficha debe incluir, cuando esté verificado:

- Nombre legal y comercial.
- Ciudad y dirección.
- Especialidades y servicios reales.
- Unidad internacional.
- Profesionales responsables y especialidad.
- Autorización o acreditación aplicable.
- Idiomas y disponibilidad de intérprete.
- Instalaciones y tecnología relevante.
- Servicios incluidos y excluidos.
- Plan de seguimiento e incidencias.
- Fecha de última verificación.

No publicar fichas genéricas sin centro, profesional ni responsable identificable.

### Cómo funciona

Presentar el proceso en cuatro pasos:

1. **Nos cuentas qué necesitas.** Llamada inicial para conocer el objetivo y las dudas.
2. **Valoramos las opciones.** Coordinación de información con centros y profesionales disponibles.
3. **Preparamos tu viaje.** Agenda, traslados, alojamiento, intérprete y comunicación cuando proceda.
4. **Sigues tu proceso con claridad.** Documentación disponible y seguimiento acordado con el centro.

### Viaje y acompañamiento

Este bloque debe hacer explícito que Aura puede coordinar, según el servicio contratado:

- Recogida en aeropuerto.
- Traslados a clínica, alojamiento y revisiones.
- Alojamiento.
- Comunicación con la unidad internacional.
- Intérprete o asistencia lingüística.
- Orientación sobre documentación y agenda.
- Coordinación del alta y retorno.
- Solicitud de documentación clínica y pautas de seguimiento.

Siempre separar la logística de la atención médica. Aura no diagnostica ni sustituye al centro.

## 8. Captación y agenda comercial

### CTA principal

La acción principal en home, especialidades, clínicas y footer debe ser **Hablar con un asesor** o **Solicitar una llamada**.

WhatsApp puede funcionar como canal alternativo visible, pero no debe presentarse como chatbot médico ni como sustituto de una urgencia.

### Formulario

El formulario debe ser corto y transmitir privacidad:

- Nombre.
- Teléfono con prefijo.
- Email.
- Especialidad de interés.
- Franja horaria para la llamada.
- Si viajaría sola o acompañada.
- Mensaje opcional.
- Consentimiento para contacto comercial.
- Consentimiento separado y explícito si se solicitan datos de salud, fotografías o informes.

No pedir información médica sensible en el primer campo libre si no existe una finalidad, canal y protección adecuados.

### Microcopy

“No necesitas decidir tu tratamiento ahora. La llamada sirve para orientarte y conocer los siguientes pasos.”

“No compartas información médica sensible en este campo. Te indicaremos un canal adecuado si el centro necesita documentación para valorar tu caso.”

### Estados

- **Enviando:** Estamos registrando tu solicitud.
- **Éxito:** Hemos recibido tu solicitud. Te contactaremos en el horario indicado.
- **Error:** No hemos podido enviar el formulario. Puedes intentarlo de nuevo o escribirnos por WhatsApp.

## 9. Experiencia móvil y responsive

- Mobile-first; priorizar lectura, llamada y WhatsApp.
- CTA fijo o sticky solo si no tapa contenido ni campos.
- Contenedor máximo aproximado de `1200–1280px` en escritorio.
- Una columna en móvil, dos en tablet y tres en escritorio según el contenido.
- Formularios divididos en grupos cortos, con labels persistentes.
- Cards apilables; evitar tablas anchas.
- Objetivos táctiles de al menos `44px`.
- Nunca esconder información esencial detrás de hover.

## 10. Panel operativo esencial

El panel debe dejar de tratar las solicitudes como “reservas de servicio” y reflejar un embudo comercial y de coordinación:

- Dashboard de leads nuevos, llamadas pendientes y casos en seguimiento.
- Especialidades, clínicas y profesionales.
- Solicitudes con origen de campaña, especialidad, prioridad y consentimiento.
- Agenda de llamadas de asesores.
- Estado de coordinación del viaje.
- Documentos y verificaciones internas.

### Estados recomendados del lead

`new`, `contact_requested`, `called`, `qualified`, `awaiting_clinic_review`, `proposal_sent`, `travel_planned`, `completed`, `not_eligible`, `lost`, `cancelled`.

Los estados deben tener texto visible, fecha, responsable y próxima acción. No mostrar datos sensibles a usuarios que no tengan autorización.

## 11. Componentes base

El sistema debe definir variantes coherentes para:

- Botones primario, secundario, ghost y destructivo.
- CTA de llamada y CTA de WhatsApp.
- Inputs, selects, textarea y date picker.
- Cards de especialidad, clínica y profesional.
- Badges de disponibilidad, verificación y estado.
- Bloques “incluye / no incluye”.
- Timeline del proceso.
- FAQ accordion.
- Modal de consentimiento.
- Toasts y mensajes inline.
- Skeletons, empty states y páginas de error.
- Header, breadcrumbs, footer y navegación admin.

Usar tokens y componentes compartidos; evitar estilos aislados por pantalla. Las etiquetas de confianza, riesgo y estado deben seguir siendo comprensibles sin color.

## 12. Accesibilidad y movimiento

Objetivo WCAG 2.2 AA:

- Contraste suficiente para texto, controles y estados.
- Navegación completa por teclado.
- Foco visible.
- Labels asociados a todos los campos.
- Errores anunciables y vinculados al campo correspondiente.
- Alt text localizado.
- No depender solo del color, hover o movimiento.
- Respetar `prefers-reduced-motion`.

Las animaciones deben ser breves y funcionales. Evitar parallax intenso, autoplay invasivo, pop-ups repetitivos y efectos que retrasen la solicitud de llamada.

## 13. Internacionalización y contenido

La experiencia debe funcionar con `/es` y `/en`, tolerando diferencias de longitud entre idiomas. La versión española es la fuente editorial principal; la traducción inglesa se hará después de validar los textos y el modelo operativo.

Todo contenido no aprobado debe marcarse internamente como provisional:

- Marca y logotipo.
- Imágenes y vídeos.
- Especialidades y servicios.
- Clínicas y profesionales.
- Precios, disponibilidad y moneda.
- Teléfono, WhatsApp y horarios.
- Claims, testimonios y casos.
- Textos legales y de privacidad.

## 14. Fuera de alcance del MVP rediseñado

- Carrito, pagos online o ecommerce.
- Reserva automática de una intervención.
- Diagnóstico o recomendación médica automatizada.
- Chatbot de IA médico.
- Sincronización avanzada con calendarios externos.
- CRM completo con automatizaciones complejas.
- Publicación de especialidades sin centros y profesionales verificados.
- Promesas de resultados o comparativas basadas únicamente en precio.

## 15. Criterios de aceptación de diseño

El diseño será válido cuando:

1. La propuesta de Aura como acompañante y coordinadora sea evidente.
2. La CTA principal sea solicitar una llamada, no comprar ni reservar una intervención.
3. Las especialidades, clínicas y profesionales se puedan explorar con claridad.
4. Cada servicio comunique valoración médica, límites y seguimiento.
5. El proceso de viaje y acompañamiento sea visible.
6. Se distingan servicios incluidos y excluidos.
7. El formulario gestione consentimiento y no solicite datos sensibles innecesarios.
8. La experiencia funcione en español e inglés, móvil, tablet y escritorio.
9. El panel gestione leads, llamadas y coordinación, no solo reservas.
10. La interfaz mantenga una percepción premium sin sacrificar claridad, accesibilidad ni velocidad.
