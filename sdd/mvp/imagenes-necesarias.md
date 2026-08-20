# Plan de imágenes y activos visuales — Aura Estética

Documento de producción para generar y preparar los recursos visuales del MVP desde ChatGPT Desktop.

## Criterios generales

- Estética: editorial clínica premium, luminosa, humana y segura; evitar aspecto de catálogo, stock genérico o publicidad agresiva.
- Personas: adultas, diversas, naturales y no identificables; no mostrar resultados médicos garantizados ni procedimientos invasivos explícitos.
- Hospital y hotel: usar imágenes generadas como placeholders conceptuales hasta disponer de fotografías autorizadas por BHT CLINIC y The G Hotels Istanbul.
- No generar logotipos, acreditaciones, matrículas, documentos clínicos ni nombres de profesionales ficticios.
- Formato preferido: `.webp` para fotografías de producción; `.png` solo para transparencias o gráficos.
- Perfil de color: sRGB. Compresión alta calidad, sin metadatos sensibles.
- Todas las imágenes deben tener versión desktop y recorte móvil cuando el encuadre lo requiera.
- La generación visual no sustituye la autorización de uso de imágenes reales de partners.

## Estructura de archivos

Guardar los recursos finales en:

```text
public/images/
├── hero/
├── specialties/
├── journey/
├── partners/
├── hotel/
├── transport/
├── trust/
└── ui/
```

## Assets prioritarios

| ID | Archivo final | Uso | Desktop | Móvil | Formato |
|---|---|---|---:|---:|---|
| IMG-01 | `hero/aura-hero-consultation.webp` | Hero de la home; conversación entre asesora y paciente | 1600×1200 | 900×1200 | WebP, 80–85% |
| IMG-02 | `specialties/aura-specialty-consultation.webp` | Imagen base del carrusel de especialidades | 1400×1000 | 900×1100 | WebP, 80–85% |
| IMG-03 | `journey/journey-flight.webp` | Etapa de preparación y vuelo | 1200×800 | 900×1000 | WebP |
| IMG-04 | `journey/journey-arrival.webp` | Llegada y recepción en Estambul | 1200×800 | 900×1000 | WebP |
| IMG-05 | `journey/journey-hotel.webp` | Etapa de estancia | 1200×800 | 900×1000 | WebP |
| IMG-06 | `journey/journey-hospital.webp` | Recepción internacional hospitalaria | 1200×800 | 900×1000 | WebP |
| IMG-07 | `journey/journey-return.webp` | Regreso y acompañamiento | 1200×800 | 900×1000 | WebP |
| IMG-08 | `partners/bht-clinic-exterior.webp` | Ficha de BHT CLINIC | 1600×1000 | 900×1100 | WebP |
| IMG-09 | `partners/bht-clinic-international.webp` | Unidad de pacientes internacionales | 1400×900 | 900×1100 | WebP |
| IMG-10 | `hotel/the-g-hotels-exterior.webp` | Página de alojamiento | 1600×1000 | 900×1100 | WebP |
| IMG-11 | `hotel/the-g-hotels-room.webp` | Habitaciones y opciones de estancia | 1400×1000 | 900×1100 | WebP |
| IMG-12 | `hotel/the-g-hotels-wellness.webp` | Gimnasio, spa y bienestar | 1400×1000 | 900×1100 | WebP |
| IMG-13 | `transport/hotel-transfer.webp` | Página de transporte y vehículo privado | 1600×1000 | 900×1100 | WebP |
| IMG-14 | `trust/aura-advisor-call.webp` | CTA de contacto y asesoramiento | 1400×1000 | 900×1100 | WebP |

## Imágenes por especialidad

El carrusel y las páginas de especialidad deben compartir un lenguaje visual coherente. Generar seis imágenes independientes, aunque en el home se publiquen inicialmente cinco áreas verificadas.

| Archivo | Especialidad | Tamaño recomendado | Dirección visual |
|---|---|---:|---|
| `specialties/hair-restoration.webp` | Restauración capilar | 1400×1000 | Consulta capilar, conversación profesional, cabello natural; sin agujas ni sangre |
| `specialties/dental-smile.webp` | Dental y sonrisa | 1400×1000 | Sonrisa natural y consulta odontológica luminosa; evitar dientes artificialmente perfectos |
| `specialties/aesthetic-surgery.webp` | Cirugía estética | 1400×1000 | Consulta de planificación y acompañamiento; no mostrar cirugía ni cuerpos irreales |
| `specialties/obesity-metabolism.webp` | Obesidad y metabolismo | 1400×1000 | Consulta integral y trato respetuoso; evitar estigmatización corporal |
| `specialties/vision-eye-care.webp` | Ojo y visión | 1400×1000 | Exploración visual y tecnología clínica discreta; no usar ojos hiperrealistas |
| `specialties/medical-aesthetics.webp` | Medicina estética informativa | 1400×1000 | Evaluación profesional no invasiva; mantenerla como imagen de apoyo, no como área BHT confirmada |

## Imágenes opcionales para ampliar el prototipo

Estas imágenes no son necesarias para publicar el MVP, pero dejan preparada la evolución visual del sitio.

| Archivo | Uso | Tamaño | Formato |
|---|---|---:|---|
| `hotel/room-superior.webp` | Ficha habitación Superior, 27 m² | 1200×900 | WebP |
| `hotel/room-deluxe.webp` | Ficha habitación Deluxe, 34 m² | 1200×900 | WebP |
| `hotel/room-junior-suite.webp` | Ficha Junior Suite, 42 m² | 1200×900 | WebP |
| `hotel/room-corner-suite.webp` | Ficha Corner Suite, 48 m² | 1200×900 | WebP |
| `hotel/the-g-hotels-dining.webp` | Restauración y servicio de huéspedes | 1400×1000 | WebP |
| `transport/airport-pickup.webp` | Recogida en aeropuerto | 1200×900 | WebP |
| `transport/hotel-transfer.webp` | Traslado hotel–centro | 1200×900 | WebP |
| `partners/bht-clinic-care-team.webp` | Equipo y entorno hospitalario sin identificar personas | 1400×1000 | WebP |
| `trust/document-coordination.webp` | Preparación documental y coordinación | 1200×900 | WebP |
| `ui/og-aura-estetica.webp` | Open Graph para compartir URLs | 1200×630 | WebP o PNG |
| `ui/favicon-mark.png` | Marca reducida para favicon | 512×512 | PNG transparente |

## Prompts base para generar en ChatGPT Desktop

Usar cada prompt como base y sustituir `[ESCENA]` por la escena concreta del inventario.

### Fotografía editorial principal

> Fotografía editorial premium para una marca española de acompañamiento sanitario internacional. [ESCENA]. Estilo clínico cálido, arquitectura y luz natural, paleta marfil, azul zafiro y champagne, composición limpia con espacio negativo para texto, personas adultas naturales y diversas, expresión tranquila, sensación de seguridad y confianza, realismo fotográfico, sin logos, sin texto, sin marcas, sin resultados médicos garantizados, sin sangre ni procedimientos explícitos, formato horizontal 4:3.

### Imagen de hospital

> Imagen editorial realista de un hospital privado internacional moderno en Estambul. [ESCENA]. Recepción luminosa, arquitectura contemporánea, atención humana, limpieza y organización, sin pacientes identificables, sin logotipos ni acreditaciones inventadas, sin texto legible, sin promesas médicas, espacio negativo para copy, formato horizontal 16:10.

### Imagen de hotel

> Fotografía editorial realista de un hotel urbano premium en Estambul. [ESCENA]. Interior elegante y sereno, tonos neutros, iluminación natural, sensación de descanso y acompañamiento, sin logotipos, sin nombres de marca, sin texto legible, sin personas identificables, formato horizontal 4:3.

### Imagen de transporte

> Fotografía editorial realista de un traslado privado de lujo en Estambul. Vehículo oscuro elegante visto de forma discreta, acceso cómodo para una viajera adulta con equipaje, conductor no identificable, ambiente seguro y profesional, sin matrícula legible, sin logotipos, sin texto, sin prometer modelo o características no confirmadas, formato horizontal 16:10.

## Reglas técnicas para exportación

1. Generar primero una imagen maestra de alta resolución.
2. Recortar sin deformar a la proporción desktop y móvil indicada.
3. Exportar a WebP; mantener PNG únicamente para favicon o transparencia.
4. No superar aproximadamente 250 KB en tarjetas, 400 KB en contenido y 600 KB en hero.
5. Usar nombres de archivo en minúsculas, sin espacios, tildes ni caracteres especiales.
6. Antes de incorporar una imagen real de BHT, The G Hotels o del transporte, confirmar autorización de uso y conservar la fuente en la documentación de contenidos.
7. Añadir texto alternativo descriptivo en el componente; no usar el nombre del archivo como `alt`.

## Textos alternativos iniciales

- `IMG-01`: “Asesora de Aura conversando con una paciente en un espacio luminoso”.
- `IMG-08`: “Exterior de un hospital privado internacional en Estambul”.
- `IMG-10`: “Interior elegante de un hotel urbano en Estambul”.
- `IMG-13`: “Vehículo privado preparado para un traslado en Estambul”.
- Especialidades: describir la consulta o el contexto profesional, nunca prometer un resultado.

## Orden recomendado de generación

1. `IMG-01` y `IMG-02` para completar inmediatamente la home.
2. Seis imágenes de especialidad para el carrusel y sus páginas.
3. `IMG-08` a `IMG-13` para la migración real de partners y viaje.
4. `IMG-03` a `IMG-07` para reforzar el hub de proceso.
5. `IMG-14` y los activos opcionales de confianza, SEO y futura expansión.
