# Aura Estética — Premium Editorial System

## 1. Visual Theme & Atmosphere

Dirección: hospitalidad internacional privada + precisión clínica. La interfaz debe parecer una invitación cuidada a una conversación importante: profunda, luminosa, serena y editorial. La composición usa imágenes grandes cuando aportan contexto, superficies cálidas para respirar y fondos oscuros solo para momentos de confianza o decisión.

## 2. Color Palette & Roles

```css
--color-brand-primary: #17324a;
--color-brand-primary-strong: #0d1f2d;
--color-brand-accent: #b99055;
--color-brand-accent-soft: #f1e7d8;
--color-bg-canvas: #fbfaf7;
--color-bg-subtle: #f2efe9;
--color-bg-deep: #102532;
--color-text-primary: #17232c;
--color-text-secondary: #65717a;
--color-border: #dedbd4;
```

El champagne solo funciona como acento, nunca como texto pequeño sobre canvas. El fondo profundo se reserva para hero editorial, confianza y CTA final.

## 3. Typography Rules

- Display: `Cormorant Garamond`, fallback Georgia, para titulares editoriales.
- Sans: `DM Sans`, fallback system sans, para navegación, cuerpo y formularios.
- H1: 58–88 px desktop, 44–56 px mobile, line-height 0.96–1.04.
- H2: 42–60 px desktop, 34–42 px mobile.
- Body: 16–18 px, line-height 1.65.
- Eyebrows: 11 px, tracking .22em, uso moderado.
- No usar Inter, Roboto, Arial ni titulares totalmente en mayúsculas.

## 4. Component Stylings

- Primary CTA: fondo profundo, texto marfil, radio 999px, padding generoso y elevación mínima.
- Secondary CTA: superficie transparente, borde profundo, misma altura táctil.
- Editorial link: texto profundo con línea champagne animada.
- Cards: bordes finos, radio 28px, fondo canvas; evitar grids uniformes de tarjetas.
- Image frame: radio 28px, `object-fit: cover`, overlay solo para legibilidad.
- Form fields: labels visibles, fondo canvas, borde tenue, focus champagne.
- Badges: “Representativo”, “Verificado” y “Sujeto a confirmación” nunca deben confundirse.

## 5. Layout Principles

- Container máximo 1200px con margen lateral fluido.
- Alternar composiciones 5/7, 7/5 y full-bleed para evitar monotonía.
- Una sola acción primaria por bloque.
- Las imágenes ocupan 40–60% de un bloque editorial cuando explican una etapa.
- El móvil prioriza lectura, foco de imagen y CTA; nunca reduce contenido esencial a hover.

## 6. Depth & Elevation

Usar bordes, contraste de superficies y sombras muy suaves. Evitar glassmorphism excesivo, sombras negras y gradientes decorativos sin función.

## 7. Animation & Interaction

Personalidad Premium: easing `cubic-bezier(.4,0,.2,1)`, quick 120ms, standard 240ms, slow 520ms. Entradas de 16–20px con opacity; hover máximo scale 1.015; stagger total inferior a 500ms. No scroll-jacking, WebGL ni cursor custom. `prefers-reduced-motion` elimina desplazamientos y deja cambios instantáneos.

## 8. Do's and Don'ts

### Do

- Hacer que cada imagen responda a una frase concreta.
- Mantener el CTA de asesoría visible y humano.
- Usar el espacio negativo para transmitir calma.
- Mostrar el contexto antes de la acción.
- Usar recortes mobile dedicados.
- Diferenciar evidencia representativa de información verificada.

### Don't

- No usar imágenes de hotel para vender una especialidad.
- No llenar cada sección de tarjetas idénticas.
- No usar dorado como color dominante.
- No superponer textos sobre zonas visualmente complejas.
- No usar claims clínicos ni rostros generados como profesionales reales.
- No esconder foco, error o navegación tras una animación.

## 9. Responsive Behavior

Breakpoints: 375, 640, 768, 1024 y 1280. Reordenar imágenes antes que reducirlas hasta ser ilegibles. Menús complejos pasan a acordeones o bloques navegables. Todos los controles interactivos mantienen 44px mínimo.

## 10. Image Placement Contract

El registro en `lib/media/registry.ts` es la fuente única de asociaciones imagen-contenido. Cada ruta debe usar la familia correspondiente: `hero` para conversación, `specialties` para áreas, `partners` para clínica, `hotel` para estancia, `transport` para traslados, `journey` para etapas y `trust` para acompañamiento.

## 11. Review Gate

Antes de cerrar una superficie: lint, typecheck, build, detector de Impeccable, revisión de contraste/teclado/responsive y checklist de Microsoft Frontend Design Review.
