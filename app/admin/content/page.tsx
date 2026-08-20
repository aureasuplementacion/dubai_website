import Link from "next/link";
import { AdminContentPanel } from "@/components/admin/admin-content-panel";
import { getContentCatalog } from "@/lib/actions/admin-content";
import { requireStaff } from "@/lib/auth/require-staff";
import { LogoutButton } from "@/app/admin/logout-button";
import { ButtonLink } from "@/components/ui/button";

export default async function AdminContentPage() {
  await requireStaff();
  const catalog = await getContentCatalog();
  return <main className="container-shell py-12 md:py-16"><div className="flex flex-wrap items-end justify-between gap-5"><div><Link href="/admin/dashboard" className="text-sm font-semibold text-sapphire">← Volver al pipeline</Link><p className="eyebrow mt-10">Aura Estética · Contenido</p><h1 className="mt-3 font-display text-5xl text-sapphire">Biblioteca editorial</h1><p className="mt-4 max-w-2xl text-muted">Gestiona el contenido que podrá publicarse en la web. Los cambios se guardan por estado y quedan registrados.</p></div><div className="flex gap-3"><ButtonLink tone="secondary" href="/admin/dashboard">Leads</ButtonLink><LogoutButton /></div></div>{catalog.ok ? <AdminContentPanel initialSpecialties={catalog.specialties} initialServices={catalog.services} initialOptions={catalog.options} /> : <div role="alert" className="mt-10 rounded-2xl border border-danger/20 bg-danger/10 p-6 text-sm text-danger">{catalog.message}</div>}</main>;
}
