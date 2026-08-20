import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { LogoutButton } from "@/app/admin/logout-button";
import { AdminCrmPanel } from "@/components/admin/admin-crm-panel";
import { getAdminLeads } from "@/lib/actions/admin-leads";
import { requireStaff } from "@/lib/auth/require-staff";

export default async function AdminCrmPage() { const { profile } = await requireStaff(); const result = await getAdminLeads({ page: 1, pageSize: 50, status: "all" }); return <main className="container-shell py-12 md:py-16"><div className="flex flex-wrap items-end justify-between gap-5"><div><Link href="/admin/dashboard" className="text-sm font-semibold text-sapphire hover:text-champagne">← Bandeja principal</Link><p className="eyebrow mt-10">Aura Estética · Operativa</p><h1 className="mt-3 font-display text-5xl text-sapphire">CRM comercial</h1><p className="mt-4 max-w-2xl text-muted">Sesión activa para {profile.full_name || profile.email}. Clasifica y acompaña cada solicitud desde un solo lugar.</p></div><div className="flex gap-3"><ButtonLink tone="secondary" href="/admin/dashboard">Bandeja</ButtonLink><LogoutButton /></div></div><AdminCrmPanel initialLeads={result.ok ? result.leads : []} isAdmin={profile.role === "admin"} /></main>; }
