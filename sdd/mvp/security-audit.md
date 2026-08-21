# Auditoría de seguridad y estabilidad

> Documento técnico de soporte. Para el estado final, responsables y criterios de publicación, consultar [`preproduccion-final.md`](./preproduccion-final.md).

## Alcance

Esta auditoría cubre el código Next.js, el middleware, Supabase/RLS, formularios públicos, chatbot, configuración de despliegue y gestión de secretos. La validación de servicios externos se limita a comprobaciones seguras y no destructivas.

## Correcciones aplicadas

- El panel administrativo usa Supabase Auth con acceso por invitación y contraseña.
- `/admin/dashboard` exige sesión y el servidor valida el perfil activo con rol `admin` o `manager`.
- Las tablas de leads, notas y eventos mantienen RLS; los logs de auditoría no pueden ser falsificados por clientes autenticados.
- Leads y chatbot tienen rate limiting. En producción requieren Upstash Redis; Preview puede usar un fallback en memoria aislado para facilitar las pruebas.
- La solicitud pública ya no acepta fecha ni franja horaria: el objetivo es solicitar contacto con un asesor.
- Se añadieron cabeceras de seguridad, política de framing, control de contenido y política de permisos.
- El service role de Supabase solo se utiliza en server actions y nunca se expone al cliente.

## Riesgos pendientes antes de producción

1. Rotar todas las credenciales que se hayan compartido fuera del gestor de secretos.
2. Configurar `UPSTASH_REDIS_REST_URL` y `UPSTASH_REDIS_REST_TOKEN`.
3. Configurar un dominio de correo verificado antes de activar Resend.
4. Crear usuarios administrativos mediante invitación desde Supabase y revisar manualmente sus roles.
5. Confirmar las URLs de redirección de Supabase Auth para preview y producción.
6. Ejecutar pruebas RLS con roles anon, autenticado, manager y admin en el proyecto de preview.

## Política de datos

El formulario y el chatbot no deben recibir historiales clínicos, informes, fotografías médicas, documentos de identidad, contraseñas ni datos de pago. Cualquier información clínica debe tratarse directamente con el centro autorizado.
