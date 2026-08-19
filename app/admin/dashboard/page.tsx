import { Button } from "@/components/ui/button";
import { Status } from "@/components/ui/status";
import { requireStaff } from "@/lib/auth/require-staff";
import { LogoutButton } from "@/app/admin/logout-button";

const pipeline = [{ label: "Nuevos", tone: "neutral" as const }, { label: "Llamada pendiente", tone: "warning" as const }, { label: "Valorados", tone: "info" as const }, { label: "Viaje planificado", tone: "success" as const }];

export default async function AdminDashboardPage() {
  const { supabase, profile } = await requireStaff();
  const [{ count: leadCount }, { count: specialtyCount }, { count: clinicCount }, { count: professionalCount }] = await Promise.all([
    supabase.from("leads").select("id", { count: "exact", head: true }),
    supabase.from("specialties").select("id", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("clinics").select("id", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("professionals").select("id", { count: "exact", head: true }).eq("status", "published"),
  ]);
  return <main className="container-shell py-12 md:py-16"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="eyebrow">Aura Estetica · Operativa</p><h1 className="mt-3 font-display text-5xl text-sapphire">Pipeline de acompanamiento</h1><p className="mt-4 max-w-2xl text-muted">Sesion activa para {profile.full_name || profile.email}. Gestiona solicitudes y contenido verificado.</p></div><div className="flex gap-3"><Button disabled>Nuevo contenido proximamente</Button><LogoutButton /></div></div><section className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{pipeline.map((item) => <article key={item.label} className="rounded-[1.25rem] border border-border bg-white p-6 shadow-sm"><Status tone={item.tone}>{item.label}</Status><p className="mt-4 font-display text-4xl text-sapphire">{item.label === "Nuevos" ? leadCount || 0 : 0}</p></article>)}</section><section className="mt-10 grid gap-6 lg:grid-cols-[1.3fr_.7fr]"><article className="rounded-[1.25rem] border border-border bg-white p-7"><div className="flex items-center justify-between gap-4"><h2 className="font-display text-2xl text-sapphire">Leads recientes</h2><span className="text-sm text-muted">{leadCount || 0} solicitudes</span></div><div className="mt-8 rounded-xl border border-dashed border-border bg-surface p-10 text-center"><p className="font-display text-xl text-sapphire">Panel de gestion en preparacion</p><p className="mt-2 text-sm text-muted">La lectura esta protegida y conectada. Las acciones de edicion se habilitaran en la siguiente iteracion.</p></div></article><article className="rounded-[1.25rem] border border-border bg-white p-7"><h2 className="font-display text-2xl text-sapphire">Contenido publicado</h2><ul className="mt-6 space-y-4 text-sm text-muted"><li className="flex justify-between"><span>Especialidades</span><strong className="text-sapphire">{specialtyCount || 0}</strong></li><li className="flex justify-between"><span>Clinicas</span><strong className="text-sapphire">{clinicCount || 0}</strong></li><li className="flex justify-between"><span>Profesionales</span><strong className="text-sapphire">{professionalCount || 0}</strong></li></ul></article></section></main>;
}
