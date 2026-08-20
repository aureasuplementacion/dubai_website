# Manual de marca y frontend — Aura Estética

## 1. Dirección de marca

Aura Estética es una marca de acompañamiento sanitario internacional para mujeres y pacientes que viajan desde España a Turquía. La experiencia debe sentirse como una conversación con una asesora experta: clara, serena, cuidada y orientada a facilitar cada decisión.

### Promesa de experiencia

**Tu viaje hacia Turquía, acompañado con claridad y confianza.**

No vendemos tratamientos como productos. Presentamos información, contexto, coordinación y una conversación humana con el centro sanitario responsable.

### Tres atributos visuales

- **Calidad:** composición editorial, espacio, tipografía limpia e imágenes cuidadas.
- **Lujo:** materiales visuales sobrios, zafiro profundo, champagne controlado y detalles discretos.
- **Confianza:** información verificable, estados transparentes, lenguaje prudente y CTAs humanos.

## 2. Sistema visual

### Paleta

| Token | Valor | Uso |
|---|---|---|
| `brand-primary` | `#12395B` | Navegación, titulares de autoridad y CTA principal |
| `brand-primary-strong` | `#0B263D` | Hover, fondos oscuros y bloques de confianza |
| `brand-accent` | `#C8A96B` | Eyebrows, líneas, indicadores y detalles premium |
| `brand-accent-soft` | `#F2E9D7` | Badges, fondos de apoyo y estados informativos |
| `canvas` | `#FFFEFC` | Fondo principal marfil |
| `surface` | `#F6F4EF` | Secciones alternas y superficies cálidas |
| `text-primary` | `#17212B` | Texto principal |
| `text-secondary` | `#5D6874` | Texto auxiliar |
| `border` | `#DDE2E4` | Bordes y separadores |

El champagne nunca se usa como texto pequeño sobre blanco. El zafiro es el color de confianza, no un fondo que deba ocupar toda la página.

### Tipografía

- **Manrope:** titulares, nombres de partner, llamadas de atención y frases editoriales.
- **Inter:** navegación, cuerpo, formularios, datos, badges y mensajes funcionales.
- H1 desktop: 56–76 px, peso 700–800, interlineado 1.02–1.08.
- H2 desktop: 40–52 px, peso 700, interlineado 1.08.
- Cuerpo: 16–18 px, interlineado 1.65–1.8.
- Labels y eyebrows: 11–12 px, peso 800, tracking amplio, nunca abusar de mayúsculas.

### Wordmark provisional

Usar el wordmark textual **Aura Estética** con “Aura” en zafiro y “Estética” en champagne. El monograma `AE` solo se usará como detalle pequeño en favicon, avatar o estados compactos; no se presenta como logotipo oficial.

## 3. Fotografía y assets

Los assets generados ubicados en `public/images/` son placeholders editoriales del prototipo. No deben interpretarse como fotografías oficiales de BHT CLINIC, The G Hotels Istanbul o del proveedor de transporte.

### Familias disponibles

- `hero/`: bienvenida y primera conversación.
- `specialties/`: cinco áreas publicadas y apoyos informativos.
- `partners/`: BHT CLINIC y entorno internacional.
- `hotel/`: exterior, habitaciones, dining y wellness.
- `transport/`: aeropuerto, hotel y traslado privado.
- `journey/`: narrativa visual del viaje.
- `trust/`: conversación y coordinación documental.

Usar las versiones `*-mobile.webp` en recortes verticales cuando estén disponibles. Mantener `object-fit: cover`, evitar recortes que oculten el foco humano y no superponer texto sobre zonas con demasiado detalle.

## 4. Voz comercial premium

### Cómo habla Aura

- Habla en segunda persona, con naturalidad y respeto.
- Anticipa dudas: “Te explicamos qué ocurre en cada etapa”.
- Vende claridad, coordinación y acompañamiento; no vende resultados clínicos.
- Utiliza verbos de orientación: conocer, valorar, preparar, coordinar, acompañar.
- Cierra con una acción humana: “Habla con un asesor”.

### Ejemplos

| Evitar | Usar |
|---|---|
| “Compra tu tratamiento” | “Conoce tus opciones y habla con un asesor” |
| “Resultados garantizados” | “La indicación depende de la valoración médica” |
| “Oferta exclusiva por tiempo limitado” | “Recibe una propuesta clara para tu caso” |
| “La mejor clínica de Turquía” | “Información verificada del centro partner” |
| “Reserva tu operación” | “Prepara una conversación con el equipo responsable” |

### CTA principal

**Hablar con un asesor**

Variantes válidas: “Quiero que me orienten”, “Consultar mi viaje”, “Preparar mi conversación”. Evitar “Comprar”, “Pagar”, “Reservar tratamiento” y urgencias artificiales.

## 5. Arquitectura de experiencia

### Home

1. Hero con propuesta de valor y CTA.
2. Pruebas de confianza y claridad clínica.
3. Carrusel de especialidades.
4. Historia visual del viaje.
5. BHT CLINIC, alojamiento y transporte.
6. Bloque de acompañamiento.
7. CTA final.

### Navegación

- Especialidades: mega menú con las cinco áreas publicadas.
- Clínicas y profesionales: ficha real de BHT CLINIC.
- Tu viaje: hub integrado con alojamiento y transporte.
- CTA persistente: Hablar con un asesor.

### Reglas de contenido

- Mostrar “Información verificada” solo cuando el dato tenga fuente aprobada.
- Mostrar “Sujeto a confirmación” en disponibilidad, horarios, transporte, precio y condiciones.
- Mantener la valoración médica visible cerca de cualquier tratamiento.
- No publicar profesionales no confirmados.
- No usar imágenes generadas para representar personas reales identificables.

## 6. Componentes y estados

- Botón primario: zafiro, texto blanco, radio completo, sombra suave.
- Botón secundario: fondo marfil/blanco, borde zafiro.
- Enlace editorial: texto zafiro con subrayado champagne.
- Card premium: fondo canvas, borde tenue, radio 24 px, elevación al hover.
- Badge de verificación: champagne suave con texto zafiro.
- Badge de confirmación: fondo cálido, texto oscuro, siempre explícito.
- Formularios: campos grandes, labels visibles, foco champagne y error concreto.
- Chatbot: acompañante secundario, nunca más dominante que el CTA principal.

## 7. Movimiento e interacción

Nivel **L2 fluido y elegante**:

- Reveal vertical de 12–16 px y 320 ms.
- Hover de tarjetas con elevación mínima y escala máxima de 1.01.
- Carruseles con teclado, botones visibles y `aria-label`.
- Timeline con cambio de contenido sin saltos de layout.
- Transiciones de menú entre 180 y 320 ms.
- Sin scroll-jacking, cursor personalizado ni WebGL obligatorio.
- Con `prefers-reduced-motion`, eliminar desplazamientos y mantener cambios instantáneos.

## 8. Responsive y accesibilidad

- Mobile-first en 375 px, 768 px, 1024 px y desktop.
- Targets táctiles mínimos de 44 px.
- El mega menú se transforma en navegación por secciones en móvil.
- Las imágenes hero reducen altura y usan su recorte mobile.
- Mantener contraste AA como mínimo.
- Todo control debe funcionar con teclado.
- No depender del color para comunicar estados.
- Cada imagen informativa debe tener `alt` descriptivo.

## 9. Criterios de cierre de fase 3

- Todo el frontend público usa este sistema visual.
- No aparece copy de demo, catálogo comercial o promesas médicas.
- Las imágenes generadas están integradas en sus familias correctas.
- Español e inglés conservan la misma jerarquía y tono.
- El CTA principal es coherente en todas las páginas.
- Build, lint y typecheck pasan.
- Las rutas antiguas continúan redirigiendo correctamente.
- El frontend mantiene rendimiento, accesibilidad y degradación de movimiento.
