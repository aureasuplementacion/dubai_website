# Supabase Preview

La fase 2 se versiona en:

- `migrations/202608180001_initial_schema.sql`: esquema, triggers, RLS y políticas de Storage.
- `seed.sql`: sede, categorías, servicios y disponibilidad demo idempotente.
- `config.toml`: configuración base de la CLI.

Cuando `.secrets/preview.env` tenga `SUPABASE_ACCESS_TOKEN` y `SUPABASE_ORG_ID`, se podrá provisionar el proyecto y aplicar:

```powershell
supabase login
supabase link --project-ref $env:SUPABASE_PROJECT_REF
supabase db push
supabase db reset --linked
```

El primer usuario admin debe crearse mediante invitación de Supabase Auth. No se incluyen credenciales ni usuarios en el seed.
