# Plan de testing integral del sitio

## Objetivo

Validar la Preview de Aura Estética antes de producción cubriendo lógica, componentes, APIs, Supabase, autenticación, CRM, chatbot, integraciones externas, accesibilidad, responsive, regresión visual y despliegues.

## Stack

- Vitest para lógica y validaciones.
- Testing Library para componentes y formularios.
- `vitest-axe` para accesibilidad de componentes.
- Playwright para pruebas E2E en Chromium, Firefox y WebKit.
- `@axe-core/playwright` para auditoría de páginas.

Scripts previstos:

- `npm run test`
- `npm run test:unit`
- `npm run test:e2e`
- `npm run test:e2e:ui`
- `npm run test:a11y`
- `npm run test:visual`

## Cobertura

### Unitario y componentes

- Validación Zod del formulario, consentimiento, honeypot y localización.
- Estados y agrupaciones del CRM.
- Generación de referencias y URLs de contacto.
- Detección de solicitudes de soporte humano.
- Componentes críticos de formulario, botones, estados y feedback.

### Integración

- `/api/health` y `/api/chat`.
- Server Action de leads.
- Inserción de `leads` y `lead_events`.
- Notificaciones Resend.
- Errores de Supabase, Resend, OpenAI y Upstash.
- Peticiones administrativas sin sesión o rol autorizado.

### E2E sobre Preview

- Navegación pública en español e inglés.
- Especialidades, tratamientos, clínicas, hotel, transporte y proceso de viaje.
- Formulario y confirmación.
- Chatbot y derivación a Telegram.
- Login, logout, permisos `manager` y `admin`.
- Filtros, búsqueda, paginación, estados, notas y eliminación auditada.

### Accesibilidad, responsive y visual

- Teclado, foco visible, labels, errores, contraste, imágenes y controles flotantes.
- Escritorio de 1280 px, tablet y móviles simulados iPhone/Android.
- Snapshots críticos de home, especialidades, tratamiento, proceso, contacto, login, dashboard y CRM.

## Datos e integraciones

Las pruebas E2E reales se ejecutarán exclusivamente en Supabase Preview. Usarán datos identificables con prefijo `TEST-AURA-`, emails de prueba y ningún dato clínico real. Los leads creados se limpiarán al finalizar mediante el flujo administrativo autorizado, conservando la auditoría.

Las pruebas unitarias y de integración usarán mocks para errores y casos límite. Las integraciones reales tendrán una smoke suite limitada para Supabase, Resend, OpenAI, Upstash, Telegram y Vercel.

## CI y aceptación

GitHub Actions ejecutará los checks en pull requests y pushes a ramas de trabajo. El pipeline debe bloquear cambios si falla lint, typecheck, build, tests unitarios, E2E crítico, accesibilidad o escaneo de secretos.

La Preview se considerará validada cuando los checks automáticos sean verdes, los roles estén verificados, los leads, eventos, notas y emails funcionen, no existan secretos en código o fixtures y las pruebas externas estén documentadas y limpiadas.

## Fuera de alcance

Pagos, reservas, agenda, CMS editorial completo, WhatsApp Business y diagnóstico médico automatizado.
