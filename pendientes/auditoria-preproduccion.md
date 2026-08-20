# Auditoría final de preproducción

Fecha: 20 de agosto de 2026
Estado: técnicamente estable; pendiente de validación operativa y contenidos definitivos.

## Comprobaciones realizadas

- [x] Árbol Git limpio.
- [x] TypeScript sin errores.
- [x] ESLint sin errores ni advertencias pendientes.
- [x] Build de producción correcto.
- [x] `npm audit --omit=dev --audit-level=high`: 0 vulnerabilidades.
- [x] No hay secretos rastreados en Git.
- [x] `.env*` está ignorado salvo `.env.example`.
- [x] `/admin/dashboard` y `/admin/crm` usan autenticación de personal.
- [x] Eliminación de leads restringida a perfiles `admin` y registrada antes de borrar.
- [x] Notas internas y cambios de leads pasan por acciones de servidor.

## Pendientes manuales antes de producción

- [ ] Probar formulario, emails, chatbot y Telegram desde un dispositivo externo.
- [ ] Confirmar que las variables de Preview y producción son distintas y correctas.
- [ ] Ejecutar una prueba real con roles `manager` y `admin`.
- [ ] Crear un lead de prueba, añadir una nota, cambiar su clasificación y eliminarlo desde el CRM.
- [ ] Revisar políticas RLS directamente en Supabase.
- [ ] Configurar dominio y remitente propio en Resend.
- [ ] Confirmar textos legales, consentimiento y política de privacidad.
- [ ] Sustituir contenidos e imágenes provisionales por material aprobado por el cliente.
- [ ] Configurar backups y separar definitivamente Preview de producción.

## Decisiones actuales

- El CRM usa tres clasificaciones operativas: Pendiente, Apto y No apto.
- El calendario y la próxima acción quedan fuera del panel hasta definir una arquitectura comercial real.
- La eliminación es permanente y solo está disponible para administradores.
- Las tablas de agenda y reservas permanecen como legacy.
