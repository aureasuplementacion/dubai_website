# Aura Estética

MVP de prototipo para el escaparate bilingüe de Aura Estética. La fase 1 deja preparada la aplicación Next.js para continuar con Supabase, reservas y panel administrativo.

## Desarrollo local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Rutas iniciales:

- `/es` y `/en`: experiencia pública bilingüe.
- `/es/servicios` y `/en/servicios`: catálogo provisional.
- `/admin/login` y `/admin/dashboard`: estructura administrativa inicial.
- `/api/health`: comprobación básica del servicio.

## Comprobaciones

```bash
npm run typecheck
npm run lint
npm run build
```

## Estado de la fase 1

- Next.js App Router y TypeScript estricto: listo.
- Tailwind CSS, tokens visuales y base mobile-first: listo.
- `next-intl` con español inicial e inglés: listo.
- Separación inicial de rutas, internacionalización y configuración: lista.
- Supabase, Server Actions, validaciones, emails y analítica: reservados para las fases siguientes.
- GitHub y Vercel: pendientes de conectar con las cuentas del proyecto.

El workflow de GitHub Actions en `.github/workflows/ci.yml` ejecuta lint, typecheck y build en cada pull request y en `main`. Al conectar el repositorio a Vercel, cada pull request podrá generar su Preview automáticamente.

Los contenidos, precios, contacto, imágenes y ubicación actuales son provisionales según la documentación del MVP.
