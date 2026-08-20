import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { LogoutButton } from "@/app/admin/logout-button";
import { EditorialPanel } from "@/components/admin/editorial-panel";
import { getEditorialContent } from "@/lib/actions/editorial-content";
import { requireStaff } from "@/lib/auth/require-staff";

export default async function AdminContentPage() {
  await requireStaff();
  const content = await getEditorialContent();
  return <main className="container-shell py-12 md:py-16"><div className="flex flex-wrap items-end justify-between gap-5"><div><Link href="/admin/dashboard" className="text-sm font-semibold text-sapphire">← Volver al pipeline</Link><p className="eyebrow mt-10">Aura Estética · Contenido</p><h1 className="mt-3 font-display text-5xl text-sapphire">Editor editorial</h1><p className="mt-4 max-w-2xl text-muted">Textos, traducciones e imágenes organizados por páginas y secciones.</p></div><div className="flex gap-3"><ButtonLink tone="secondary" href="/admin/dashboard">Leads</ButtonLink><LogoutButton /></div></div>{content.ok ? <EditorialPanel initialFields={content.fields} initialMedia={content.media} /> : <div className="mt-10 rounded-2xl border border-warning/20 bg-champagne-light p-6 text-sm text-warning">{content.message}<p className="mt-2">La aplicación seguirá utilizando el contenido actual hasta que la migración editorial se aplique.</p></div>}</main>;
}
