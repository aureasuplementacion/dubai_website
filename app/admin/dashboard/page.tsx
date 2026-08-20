import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/app/admin/logout-button";
import { AdminLeadsPanel } from "@/components/admin/admin-leads-panel";
import { getAdminLeadSummary, getAdminLeads, getAdminProfiles } from "@/lib/actions/admin-leads";
import { requireStaff } from "@/lib/auth/require-staff";

export default async function AdminDashboardPage() {
  const { supabase, profile } = await requireStaff();
  const [initialResult, profileResult, summaryResult, { data: specialties }] = await Promise.all([
    getAdminLeads({ page: 1, pageSize: 20, status: "all" }),
    getAdminProfiles(),
    getAdminLeadSummary(),
    supabase.from("specialties").select("id, name_es").eq("status", "published").order("sort_order"),
  ]);
  const initialLeads = initialResult.ok ? initialResult.leads : [];
  const initialCount = initialResult.ok ? initialResult.count : 0;
  const initialTotalPages = initialResult.ok ? initialResult.totalPages : 1;
  const profiles = profileResult.ok ? profileResult.profiles : [];
  const summary = summaryResult.ok ? summaryResult.summary : { total: initialCount, newCount: 0, contactCount: 0, qualifiedCount: 0, travelCount: 0, overdueCount: 0, unassignedCount: 0 };

  return <main className="container-shell py-12 md:py-16">
    <div className="flex flex-wrap items-end justify-between gap-5">
      <div><p className="eyebrow">Aura Estética · Operativa</p><h1 className="mt-3 font-display text-5xl text-sapphire">Pipeline de acompañamiento</h1><p className="mt-4 max-w-2xl text-muted">Sesión activa para {profile.full_name || profile.email}. Gestiona cada solicitud con contexto y próximo paso.</p></div>
      <div className="flex gap-3"><Button disabled>Contenido próximamente</Button><LogoutButton /></div>
    </div>
    <AdminLeadsPanel initialLeads={initialLeads} initialCount={initialCount} initialTotalPages={initialTotalPages} specialties={(specialties || []) as { id: string; name_es: string }[]} profiles={profiles} summary={summary} isAdmin={profile.role === "admin"} />
  </main>;
}
