# Aura Estética — Design System

**Versión:** 0.1  
**Estado:** Sistema de referencia para implementación del prototipo  
**Ámbito:** Web pública, captación de leads y panel operativo  
**Última revisión:** 18/08/2026  
**Fuente de verdad:** Este documento define las reglas. El código las implementa; no crea reglas paralelas por pantalla.

## 1. Propósito

Aura Estética es un escaparate de turismo sanitario y una plataforma de coordinación comercial para personas españolas que valoran recibir atención en Turquía. No es una tienda de tratamientos ni una clínica propia.

El sistema debe permitir que la usuaria:

1. Entienda las especialidades disponibles.
2. Conozca clínicas y profesionales verificables.
3. Comprenda el proceso clínico y logístico.
4. Identifique qué gestiona Aura y qué decide el centro sanitario.
5. Solicite una llamada con un asesor sin sentirse presionada.

El panel debe permitir que un equipo de `admin`, `manager` y `asesor` gestione leads, llamadas, especialidades, clínicas, profesionales y seguimiento operativo.

## 2. Principios de experiencia

### Confianza antes que urgencia

La interfaz debe mostrar proceso, responsables, límites, inclusiones, exclusiones y seguimiento antes de pedir una conversión.

### Información antes que promesa

Usar lenguaje orientativo: “puede incluir”, “sujeto a valoración médica”, “según disponibilidad” y “el centro confirmará”. Evitar garantías clínicas, presión temporal y comparaciones basadas solo en precio.

### Acompañamiento humano

La conversión primaria es **Hablar con un asesor**. La automatización facilita el contacto; no sustituye la conversación ni el criterio del profesional sanitario.

### Claridad operativa

Separar visualmente:

- lo que coordina Aura;
- lo que gestiona un socio logístico;
- lo que decide la clínica o el profesional;
- lo que todavía está pendiente de confirmar.

### Accesibilidad desde el inicio

El objetivo es WCAG 2.2 AA. La accesibilidad no se trata como una revisión final: es una propiedad de cada token, componente, estado y flujo.

### Mobile-first

La mayoría del tráfico llegará desde anuncios, redes sociales y WhatsApp. El móvil debe priorizar lectura, confianza, llamada y contacto sin ocultar información esencial detrás de hover.

## 3. Dirección visual

### Personalidad

- Clínica y tecnológica, sin parecer fría.
- Premium y serena, sin parecer una joyería o un resort.
- Editorial en titulares e imágenes.
- Funcional y tranquilizadora en formularios, estados y logística.
- Femenina por sensibilidad y tono, no por clichés decorativos.

### Contrastes intencionados

| Contexto | Decisión |
|---|---|
| Web pública | Más espacio, narrativa editorial, imágenes con aire y lectura pausada |
| Panel interno | Mayor densidad, acciones visibles, tablas y estados operativos |
| Marca | Azul zafiro como confianza; champagne como acento |
| Interacción | Motion breve y funcional; ninguna acción depende de animación |
| Fotografía | Acompañamiento realista; no usar stock como resultado clínico |

### Evitar

- Contadores de urgencia, descuentos agresivos y lenguaje de oferta.
- Neones, gradientes intensos, exceso de dorado y ornamento.
- Promesas como “sin riesgos”, “sin dolor” o “resultado garantizado”.
- Carruseles automáticos que escondan contenido.
- Iconos sin etiqueta en acciones críticas.
- Fichas de clínicas o profesionales sin datos verificables.

## 4. Arquitectura de tokens

Los componentes consumirán tokens semánticos. Los valores de marca actuales son provisionales y deben poder sustituirse sin reescribir componentes.

### Capas

1. **Primitivos:** valores base de color, tipografía, espacio y movimiento.
2. **Semánticos:** significado (`bg.canvas`, `text.primary`, `action.primary`).
3. **Componente:** excepciones justificadas (`button.primary.bg`, `lead.status.pending`).

Nunca usar hexadecimales directamente en un componente.

### Color provisional

| Token semántico | Valor actual | Uso |
|---|---|---|
| `color.brand.primary` | `#12395B` | Marca, títulos, acciones principales |
| `color.brand.primary-strong` | `#0B263D` | Hover, navegación oscura, contraste |
| `color.brand.accent` | `#C8A96B` | Detalles, indicadores y acentos |
| `color.brand.accent-soft` | `#F2E9D7` | Superficies editoriales suaves |
| `color.background.canvas` | `#FFFFFF` | Fondo público principal |
| `color.background.subtle` | `#F7F9FC` | Secciones alternas y superficies |
| `color.text.primary` | `#17212B` | Texto principal |
| `color.text.secondary` | `#5D6874` | Metadatos y texto auxiliar |
| `color.border.default` | `#DCE3EA` | Bordes y separadores |
| `color.feedback.success` | `#247A56` | Confirmación |
| `color.feedback.warning` | `#9A6A12` | Pendiente o advertencia |
| `color.feedback.danger` | `#B04444` | Error, cancelación o riesgo |
| `color.feedback.info` | `#25658F` | Información contextual |

Reglas:

- El blanco domina la web pública.
- El zafiro comunica estructura y confianza.
- Champagne no debe usarse como texto pequeño sobre blanco.
- Cada feedback combina color con texto, icono o patrón visual.
- Los estados críticos nunca dependen solo del color.

### Tipografía

Dirección fijada: **sans clínica + serif de acento**.

- `font.family.sans`: Inter, Geist o equivalente legible.
- `font.family.display`: DM Serif Display, Cormorant Garamond o equivalente moderada.
- Sans para navegación, cuerpo, formularios, datos y panel.
- Serif solo en titulares hero, introducciones y momentos editoriales.
- No usar serif en mensajes de error, etiquetas, tablas o controles.

Escala semántica recomendada:

| Token | Uso |
|---|---|
| `type.display-xl` | Hero de escritorio |
| `type.display-lg` | Hero móvil y titulares principales |
| `type.heading-lg` | Títulos de sección |
| `type.heading-md` | Títulos de card o subsección |
| `type.body-lg` | Introducciones y copy orientativo |
| `type.body-md` | Lectura principal |
| `type.body-sm` | Metadatos y ayuda |
| `type.label` | Labels, badges y navegación |
| `type.caption` | Notas legales y texto auxiliar |

El texto debe ser escaneable: párrafos cortos, listas, etiquetas y una sola intención por bloque.

### Espaciado, radios y elevación

- Escala base de espacio en múltiplos consistentes de 4 u 8 px.
- `space.section`: separación amplia entre bloques editoriales.
- `space.stack`: separación vertical de contenido relacionado.
- `space.control`: padding interno de campos y botones.
- Radios suaves, no excesivamente redondeados: la interfaz debe parecer clínica y estable.
- Sombras ligeras con bordes sutiles; evitar tarjetas flotantes sin jerarquía.
- Elevación reservada para superficies que necesitan relación espacial: modal, sticky CTA, dropdown y panel.

### Motion tokens

| Token | Valor orientativo | Uso |
|---|---:|---|
| `motion.duration.fast` | 120 ms | Hover, color y foco |
| `motion.duration.base` | 180 ms | Botones, cards y campos |
| `motion.duration.slow` | 320 ms | Drawer, dialog y reveal |
| `motion.easing.standard` | `cubic-bezier(.2,.8,.2,1)` | Cambios de estado |
| `motion.easing.exit` | `cubic-bezier(.4,0,1,1)` | Cierre y salida |

Con `prefers-reduced-motion`, los reveals se convierten en aparición inmediata y se eliminan parallax, desplazamientos largos y stagger.

## 5. Densidad y layout

### Modos de densidad

`density.editorial` se utiliza en páginas públicas: más aire, ancho de lectura controlado y jerarquía narrativa.

`density.efficient` se utiliza en el panel: más información visible, controles agrupados, tablas compactas y acciones persistentes.

Ambos modos comparten color, tipografía, radios, foco y lenguaje de estados.

### Grid

- Contenedor público máximo: 1180–1280 px según composición.
- Padding lateral fluido, nunca menor que el espacio táctil y respiración definida para móvil.
- Una columna en móvil; dos en tablet; tres cuando cards y contenido lo permitan.
- No forzar tres columnas para fichas que necesiten lectura.
- Usar `max-width` de lectura en textos largos.
- Evitar overflow horizontal en tablas, grids y formularios.

### Navegación pública

Header recomendado:

1. Marca.
2. Especialidades.
3. Clínicas y profesionales.
4. Cómo funciona.
5. FAQ.
6. Selector de idioma.
7. CTA “Hablar con un asesor”.

En móvil: menú compacto, CTA de llamada visible y CTA sticky sin tapar campos ni contenido.

### Shell del panel

- Navegación lateral en escritorio.
- Drawer o navegación compacta en móvil.
- Header con título, contexto, estado de sesión y acción principal.
- El contenido nunca depende solo del color de un badge.
- Las acciones de un lead deben mostrar responsable y próxima acción.

## 6. Inventario de componentes

### Primitives obligatorias

- `Button`, `LinkButton`, `IconButton`.
- `Input`, `Textarea`, `Select`, `Combobox`.
- `Checkbox`, `RadioGroup`, `Switch`.
- `Label`, `FieldHint`, `FieldError`.
- `Badge`, `Status`, `Avatar`.
- `Card`, `Surface`, `Divider`.
- `Dialog`, `Drawer`, `Popover`, `Tooltip`.
- `Tabs`, `Accordion`, `Breadcrumbs`.
- `Toast`, `Alert`, `Skeleton`.

Radix/shadcn puede utilizarse para el comportamiento de Dialog, Drawer, Popover, Select, Tabs, Accordion y menús. La apariencia, tokens y copy siguen siendo propios.

### Componentes de producto

- `PublicHeader` y `PublicFooter`.
- `MobileStickyCta`.
- `WhatsAppFloat`.
- `HeroSection`.
- `TrustSignals`.
- `SpecialtyCard`.
- `ClinicCard`.
- `ProfessionalCard`.
- `IncludedExcludedList`.
- `ProcessTimeline`.
- `FaqList`.
- `LeadForm`.
- `CallRequestSummary`.
- `AdminShell`.
- `LeadTable`.
- `LeadKanban`.
- `LeadDetail`.
- `ActivityTimeline`.
- `FilterBar`.
- `MetricsCard`.
- `ContentStatusPanel`.

### Estados mínimos

Todo componente interactivo documenta:

- `default` / enabled
- `hover`
- `focus-visible`
- `pressed` o selected
- `disabled`
- `loading`
- `error` cuando aplique
- `success` cuando aplique
- comportamiento con teclado
- comportamiento táctil

Los estados siguen el modelo de Material: el componente no está terminado si solo existe su estado de reposo.

## 7. Patrones públicos

### Home

1. Header y CTA.
2. Hero: “Tu tratamiento en Turquía, acompañado desde España”.
3. Señales de confianza.
4. Especialidades prioritarias.
5. Cómo funciona.
6. Clínicas y profesionales.
7. Logística y acompañamiento.
8. Seguridad y continuidad.
9. CTA final.
10. Footer legal y de contacto.

### Ficha de especialidad

1. Qué es y para quién puede ser relevante.
2. Servicios posibles.
3. Qué debe valorar el profesional.
4. Proceso antes, durante y después.
5. Incluye / no incluye.
6. Clínicas y profesionales.
7. FAQ.
8. CTA de llamada.

### Ficha de clínica o profesional

Mostrar únicamente información verificada: identidad, ciudad, unidad internacional, especialidades, profesionales responsables, idiomas, acreditaciones, inclusiones, exclusiones, seguimiento y fecha de verificación.

### Formulario de llamada

Campos base:

- Nombre.
- Teléfono con prefijo.
- Email.
- Especialidad de interés.
- Franja horaria.
- Acompañante, si aplica.
- Mensaje opcional.
- Consentimiento comercial.
- Consentimiento separado para datos de salud o documentación.

Microcopy recomendado: “No necesitas decidir tu tratamiento ahora. La llamada sirve para orientarte y conocer los siguientes pasos.”

No pedir fotografías ni informes clínicos en el primer paso sin finalidad, canal seguro y consentimiento explícito.

## 8. Patrones del panel

### Roles

| Rol | Capacidades iniciales |
|---|---|
| `admin` | Configuración, usuarios, contenidos, clínicas, profesionales y leads |
| `manager` | Supervisión de pipeline, asignación, métricas y contenidos operativos |
| `asesor` | Leads asignados, llamadas, notas, eventos y próxima acción |

### Estados de lead

`new`, `contact_requested`, `called`, `qualified`, `awaiting_clinic_review`, `proposal_sent`, `travel_planned`, `completed`, `not_eligible`, `lost`, `cancelled`.

Cada estado debe mostrar texto, fecha, responsable y próxima acción. Las transiciones inválidas deben bloquearse con explicación, no fallar silenciosamente.

### Fixtures y repositorios

El prototipo usa fixtures tipados y repositorios intercambiables. La UI no importa Supabase directamente. La futura conexión real sustituirá la implementación del repositorio, no el contrato de componentes.

Interfaces conceptuales:

```ts
type DensityMode = "editorial" | "efficient";
type InteractionTier = "L1" | "L2" | "L3";
type UserRole = "admin" | "manager" | "asesor";

type ComponentState =
  | "default" | "hover" | "focus-visible" | "pressed"
  | "disabled" | "loading" | "error" | "success";

type Repository<T> = {
  list: () => Promise<T[]>;
  getById: (id: string) => Promise<T | null>;
};
```

Estas interfaces documentan intención; no obligan a crear una abstracción innecesaria para cada componente.

## 9. Interacción y motion

Nivel adoptado: **L2, fluido y sobrio**.

Permitido:

- Reveal suave al entrar una sección en viewport.
- Stagger limitado en grids.
- Cambio de header al desplazarse.
- Apertura de drawer, dialog, popover y accordion.
- Feedback inmediato de botones y formularios.
- Transiciones de estado del pipeline.

No permitido:

- Scroll-jacking.
- Parallax intenso o obligatorio.
- Autoplay de vídeo con sonido.
- Motion como única forma de explicar un estado.
- Animaciones que retrasen el CTA o impidan cancelar una interacción.

CSS y APIs nativas son la primera opción. Framer Motion, GSAP u otra librería requerirán una justificación de rendimiento y accesibilidad.

## 10. Accesibilidad y contenido

Checklist mínimo:

- Contraste AA para texto y controles.
- Foco visible y no eliminado por CSS.
- Orden de tabulación lógico.
- `label` asociado a cada campo.
- Errores vinculados al campo y anunciables.
- Botones con nombre accesible.
- Alt text para imágenes informativas; alt vacío para decorativas.
- Dialogs con foco gestionado y cierre por teclado.
- Menús y accordions operables sin ratón.
- Touch targets mínimos de 44 × 44 px.
- No depender solo del color, hover o movimiento.
- Soporte de `prefers-reduced-motion`.
- Mensajes de éxito y error persistentes el tiempo suficiente para leerlos.

El contenido clínico debe respetar `textos-especialidades.md` y las restricciones de `design-reference.md`: no diagnosticar, no prometer resultados, no presentar Aura como clínica y distinguir valoración médica de coordinación logística.

## 11. Internacionalización

- Las rutas públicas soportan `/es` y `/en`.
- Los componentes no deben depender de longitudes fijas de texto.
- El español es la fuente editorial inicial.
- El inglés se valida después de aprobar textos y claims.
- Fechas, horas, teléfonos y direcciones deben respetar locale.
- Los mensajes de error y consentimiento también se traducen.

## 12. Convenciones de implementación

- Next.js App Router y React Server Components por defecto.
- Componentes interactivos con `use client` solo cuando sea necesario.
- Tailwind consume tokens; no se añaden hex aislados en páginas.
- `cn` o utilidad equivalente para composición de clases.
- `class-variance-authority` para variantes cuando mejore legibilidad.
- Lucide para iconos lineales coherentes.
- `next/image` para imágenes con tamaños y carga definidos.
- Radix/shadcn para comportamiento complejo y accesible.
- Fixtures y repositorios separados de la capa de presentación.
- No acoplar componentes de UI a Supabase, URLs externas o datos definitivos del cliente.

## 13. Gobernanza

### Crear un componente nuevo cuando

- El patrón aparece en dos o más contextos.
- Tiene estados o accesibilidad que conviene centralizar.
- Su nombre comunica una intención de producto estable.

### Crear una variante cuando

- Cambia la intención o densidad, pero no la anatomía.
- La diferencia puede expresarse con tokens y estados.

### No crear una variante cuando

- Solo cambia un margen de una pantalla.
- Resuelve contenido que debería estar en el modelo editorial.
- Rompe la jerarquía de acciones o contraste del sistema.

Toda excepción debe registrar motivo, impacto responsive y criterio de retirada.

## 14. QA de diseño y producto

### Visual

- Jerarquía clara en viewport móvil y desktop.
- Sin valores de color fuera de tokens.
- Tipografía y contraste consistentes.
- Imágenes optimizadas y con crop intencionado.
- Estados visibles en componentes críticos.

### Funcional

- Navegación pública completa.
- CTA de llamada operativo con mock.
- Formulario con validación, carga, éxito y error.
- Menú móvil y CTA sticky sin solapamientos.
- Filtros, tabs, dialogs y accordions operables.
- Panel con fixtures, roles y cambios de estado simulados.

### Accesibilidad

- Keyboard walkthrough de todas las rutas clave.
- Revisión de foco y nombres accesibles.
- Test de reduced motion.
- Revisión de contraste.
- Test en ancho móvil sin overflow.

### Técnica

```text
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run build
```

La validación visual deberá cubrir `/es`, especialidades, detalle de especialidad, clínicas, contacto, reservar y panel.

## 15. Roadmap de implementación

### Núcleo inmediato

1. Convertir tokens actuales en variables semánticas.
2. Estabilizar Button, Link, Field, Badge, Card, Alert, Dialog, Accordion y Toast.
3. Unificar header, footer, CTA móvil y navegación del panel.
4. Añadir todos los estados de formulario y lead.

### Escalado del prototipo

1. Aplicar plantillas de especialidad, clínica y profesional.
2. Aplicar densidad editorial y eficiente.
3. Completar pipeline, detalle de lead, timeline y filtros.
4. Añadir motion L2 y reduced motion.
5. Validar visualmente todas las rutas y locales.

### Integración real posterior

1. Sustituir fixtures por repositorios Supabase.
2. Conectar CRM y agenda de asesores.
3. Configurar analítica de CTA y embudo.
4. Incorporar contenidos, contactos, clínicas y profesionales reales.
5. Revisar legalmente claims, consentimiento, cookies y datos sensibles.

## 16. Fuentes y criterio de adaptación

Este sistema se ha contrastado con:

- [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Apple Human Interface Guidelines — Motion](https://developer.apple.com/design/human-interface-guidelines/motion)
- [Material Design — Interaction states](https://m3.material.io/foundations/interaction/states/overview)
- [Radix Primitives](https://www.radix-ui.com/primitives/docs/overview/introduction)
- [shadcn/ui](https://ui.shadcn.com/docs)
- [Nielsen Norman Group — 10 usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/)
- [GitHub: xiaopu-ai/web-design](https://github.com/xiaopu-ai/web-design)
- [Investigación interna de servicios de turismo sanitario](../../.research/medical-tourism-turkey-service-taxonomy/FINDINGS.md)

Las fuentes aportan principios y patrones, no una identidad que deba copiarse. Las decisiones de marca, contenido clínico, captación y operación de Aura tienen prioridad cuando existe una diferencia justificada.

## 17. Supuestos y pendientes de validación

- La identidad actual es provisional y podrá sustituirse con tokens.
- Aura actúa como coordinadora y facilitadora, no como proveedor médico.
- No se incluye portal privado de pacientes en esta fase.
- No se incluyen pagos ni reservas automáticas de intervenciones.
- Clínicas, profesionales, autorizaciones, testimonios, imágenes, teléfonos y claims deben verificarse antes de producción.
- La revisión legal debe confirmar tratamiento de datos de salud, transferencias internacionales, publicidad sanitaria y modelo de intermediación.
