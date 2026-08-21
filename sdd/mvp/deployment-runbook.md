# Runbook de despliegue

> Este runbook se ejecuta junto con la checklist y los bloqueadores de [`preproduccion-final.md`](./preproduccion-final.md).

## Preview

1. Instalar dependencias con `npm ci`.
2. Configurar las variables desde un gestor seguro, nunca desde Git.
3. Ejecutar `npm run lint`, `npm run typecheck` y `npm run build`.
4. Aplicar migraciones Supabase en orden.
5. Crear usuarios admin mediante invitación y ajustar su rol en `profiles`.
6. Comprobar `/admin/login`, `/admin/dashboard`, el formulario de leads y `/api/health`.

## Producción

No publicar hasta completar la rotación de credenciales, dominio de correo, rate limiting distribuido, URLs de Auth, HTTPS y revisión de políticas RLS.

## Variables privadas

`SUPABASE_SERVICE_ROLE_KEY`, `OPENAI_API_KEY`, `RESEND_API_KEY`, `UPSTASH_REDIS_REST_TOKEN`, tokens de despliegue y contraseñas de base de datos son exclusivamente server-side. No deben aparecer en `NEXT_PUBLIC_*`, logs, capturas ni commits.
