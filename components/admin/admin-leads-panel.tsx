"use client";

import { FormEvent, useMemo, useState, useTransition } from "react";
import { Download, Mail, MessageCircle, Phone, RefreshCw, Search, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Status } from "@/components/ui/status";
import { addLeadNote, exportAdminLeads, getAdminLeads, getLeadDetail, updateLead, type AdminLead, type AdminProfile, type LeadDetail, type LeadFilters } from "@/lib/actions/admin-leads";
import { leadStatuses, leadStatusGroups, leadStatusLabels, leadStatusTones, type LeadStatus } from "@/lib/admin/lead-status";

type Specialty = { id: string; name_es: string };
type Summary = { total: number; newCount: number; contactCount: number; qualifiedCount: number; travelCount: number; overdueCount: number; unassignedCount: number };

function formatDate(value: string | null) {
  if (!value) return "Sin fecha";
  return new Intl.DateTimeFormat("es-ES", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

function localDateTime(value: string | null) {
  return value ? new Date(value).toISOString().slice(0, 16) : "";
}

function leadPhoneHref(phone: string) { return `tel:${phone.replace(/\s+/g, "")}`; }

export function AdminLeadsPanel({ initialLeads, initialCount, initialTotalPages, specialties, profiles, summary, isAdmin }: { initialLeads: AdminLead[]; initialCount: number; initialTotalPages: number; specialties: Specialty[]; profiles: AdminProfile[]; summary: Summary; isAdmin: boolean }) {
  const [leads, setLeads] = useState(initialLeads);
  const [selectedId, setSelectedId] = useState(initialLeads[0]?.id || "");
  const [detail, setDetail] = useState<LeadDetail | null>(null);
  const [filters, setFilters] = useState<LeadFilters>({ page: 1, pageSize: 20, status: "all" });
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [count, setCount] = useState(initialCount);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const selectedLead = useMemo(() => leads.find((lead) => lead.id === selectedId) || leads[0] || null, [leads, selectedId]);
  const activeDetail = detail?.lead.id === selectedLead?.id ? detail : null;

  async function loadLeads(nextFilters: LeadFilters, nextSelectedId?: string) {
    setMessage("");
    const result = await getAdminLeads(nextFilters);
    if (!result.ok) { setMessage(result.message); return; }
    setLeads(result.leads); setCount(result.count); setTotalPages(result.totalPages); setFilters(nextFilters);
    const id = nextSelectedId || result.leads[0]?.id || "";
    setSelectedId(id);
    if (id) {
      const detailResult = await getLeadDetail(id);
      if (detailResult.ok) setDetail(detailResult.detail);
    } else setDetail(null);
  }

  function refresh(selected = selectedId) { startTransition(() => { void loadLeads(filters, selected); }); }

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const next = { ...filters, query: String(form.get("query") || "").trim(), page: 1 };
    startTransition(() => { void loadLeads(next); });
  }

  function handleFilter(name: keyof LeadFilters, value: string) {
    const next = { ...filters, [name]: value || undefined, page: 1 };
    startTransition(() => { void loadLeads(next); });
  }

  async function selectLead(id: string) {
    setSelectedId(id); setMessage("");
    const result = await getLeadDetail(id);
    if (result.ok) setDetail(result.detail); else setMessage(result.message);
  }

  async function updateField(input: { status?: LeadStatus; assignedTo?: string | null; nextActionAt?: string | null }) {
    if (!selectedLead) return;
    setMessage("");
    try {
      const result = await updateLead({ leadId: selectedLead.id, ...input });
      if (!result.ok) { setMessage(result.message); return; }
      setMessage("Cambios guardados.");
      await refresh(selectedLead.id);
    } catch {
      setMessage("No se ha podido guardar el cambio. Comprueba la configuración de Supabase y vuelve a intentarlo.");
    }
  }

  async function handleNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedLead) return;
    const form = new FormData(event.currentTarget);
    const result = await addLeadNote({ leadId: selectedLead.id, note: String(form.get("note") || "") });
    if (!result.ok) { setMessage(result.message); return; }
    event.currentTarget.reset(); setMessage("Nota añadida.");
    const refreshed = await getLeadDetail(selectedLead.id); if (refreshed.ok) setDetail(refreshed.detail);
  }

  async function handleExport() {
    setMessage("");
    const result = await exportAdminLeads(filters);
    if (!result.ok) { setMessage(result.message); return; }
    const blob = new Blob([`\ufeff${result.csv}`], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob); const anchor = document.createElement("a"); anchor.href = url; anchor.download = `aura-leads-${new Date().toISOString().slice(0, 10)}.csv`; anchor.click(); URL.revokeObjectURL(url);
    setMessage("Exportación preparada.");
  }

  return <>
    <section className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {[{ label: "Todos los leads", value: summary.total, tone: "neutral" as const }, { label: "Nuevos", value: summary.newCount, tone: "warning" as const }, { label: "Contacto", value: summary.contactCount, tone: "info" as const }, { label: "Cualificados", value: summary.qualifiedCount, tone: "info" as const }, { label: "Viajes", value: summary.travelCount, tone: "success" as const }, { label: "Acciones vencidas", value: summary.overdueCount, tone: "danger" as const }, { label: "Sin asignar", value: summary.unassignedCount, tone: "warning" as const }].map((item) => <article key={item.label} className="rounded-[1.25rem] border border-border bg-white p-5 shadow-sm"><Status tone={item.tone}>{item.label}</Status><p className="mt-4 font-display text-4xl text-sapphire">{item.value}</p></article>)}
    </section>

    <section className="mt-8 rounded-[1.5rem] border border-border bg-white p-5 shadow-soft md:p-7">
      <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="eyebrow">Bandeja comercial</p><h2 className="mt-2 font-display text-3xl text-sapphire">Solicitudes de contacto</h2></div><div className="flex flex-wrap gap-2"><Button tone="secondary" type="button" onClick={() => refresh()} disabled={isPending}><RefreshCw size={16} aria-hidden="true" />Actualizar</Button>{isAdmin ? <Button tone="secondary" type="button" onClick={() => void handleExport()}><Download size={16} aria-hidden="true" />Exportar CSV</Button> : null}</div></div>
      <form onSubmit={handleSearch} className="mt-7 grid gap-3 lg:grid-cols-[1.5fr_repeat(5,1fr)_auto]">
        <label className="relative block"><span className="sr-only">Buscar lead</span><Search size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" /><input name="query" defaultValue={filters.query || ""} placeholder="Nombre, email, teléfono o referencia" className="w-full rounded-xl border border-border bg-surface py-3 pl-11 pr-4 text-sm" /></label>
        <label><span className="sr-only">Estado</span><select value={filters.status || "all"} onChange={(event) => handleFilter("status", event.target.value)} className="w-full rounded-xl border border-border bg-surface px-3 py-3 text-sm"><option value="all">Todos los estados</option>{leadStatuses.map((status) => <option key={status} value={status}>{leadStatusLabels[status]}</option>)}</select></label>
        <label><span className="sr-only">Grupo de trabajo</span><select value={filters.group || "all"} onChange={(event) => handleFilter("group", event.target.value)} className="w-full rounded-xl border border-border bg-surface px-3 py-3 text-sm"><option value="all">Todos los grupos</option><option value="entrada">Entrada</option><option value="seguimiento">Seguimiento</option><option value="proceso">Proceso</option><option value="cierre">Cierre</option></select></label>
        <label><span className="sr-only">Especialidad</span><select value={filters.specialtyId || ""} onChange={(event) => handleFilter("specialtyId", event.target.value)} className="w-full rounded-xl border border-border bg-surface px-3 py-3 text-sm"><option value="">Especialidad</option>{specialties.map((specialty) => <option key={specialty.id} value={specialty.id}>{specialty.name_es}</option>)}</select></label>
        <label><span className="sr-only">Desde</span><input type="date" value={filters.from || ""} onChange={(event) => handleFilter("from", event.target.value)} className="w-full rounded-xl border border-border bg-surface px-3 py-3 text-sm" /></label>
        <label><span className="sr-only">Hasta</span><input type="date" value={filters.to || ""} onChange={(event) => handleFilter("to", event.target.value)} className="w-full rounded-xl border border-border bg-surface px-3 py-3 text-sm" /></label>
        <label><span className="sr-only">Atención</span><select value={filters.attention || ""} onChange={(event) => handleFilter("attention", event.target.value)} className="w-full rounded-xl border border-border bg-surface px-3 py-3 text-sm"><option value="">Cualquier prioridad</option><option value="overdue">Acciones vencidas</option></select></label>
        <Button type="submit" disabled={isPending}><Search size={16} aria-hidden="true" />Buscar</Button>
      </form>
      {message ? <p role="status" className="mt-4 rounded-xl border border-info/20 bg-info/10 px-4 py-3 text-sm text-info">{message}</p> : null}

      <div className="mt-7 grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(360px,.95fr)]">
        <div className="min-w-0 overflow-hidden rounded-2xl border border-border">
          <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-3 text-xs font-bold uppercase tracking-[.12em] text-muted"><span>{count} solicitudes</span><span>Página {filters.page || 1} de {totalPages}</span></div>
          <div className="divide-y divide-border">{leads.length ? leads.map((lead) => <button type="button" key={lead.id} onClick={() => void selectLead(lead.id)} className={`block w-full text-left p-4 transition hover:bg-surface focus-visible:bg-surface ${selectedLead?.id === lead.id ? "bg-champagne-light/50" : "bg-white"}`}><div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="truncate font-semibold text-sapphire">{lead.customer_name}</p><p className="mt-1 truncate text-xs text-muted">{lead.reference} · {lead.specialty_name || "Sin especialidad"}</p></div><Status tone={leadStatusTones[lead.status]}>{leadStatusLabels[lead.status]}</Status></div><div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted"><span>{formatDate(lead.created_at)}</span><span>{lead.assigned_name || "Sin asignar"}</span></div></button>) : <div className="p-10 text-center"><p className="font-display text-xl text-sapphire">No hay leads con estos filtros</p><p className="mt-2 text-sm text-muted">Prueba a cambiar la búsqueda o el estado seleccionado.</p></div>}</div>
          <div className="flex items-center justify-between border-t border-border px-4 py-3"><Button tone="ghost" type="button" disabled={isPending || (filters.page || 1) <= 1} onClick={() => { const next = { ...filters, page: (filters.page || 1) - 1 }; startTransition(() => { void loadLeads(next); }); }}>Anterior</Button><Button tone="ghost" type="button" disabled={isPending || (filters.page || 1) >= totalPages} onClick={() => { const next = { ...filters, page: (filters.page || 1) + 1 }; startTransition(() => { void loadLeads(next); }); }}>Siguiente</Button></div>
        </div>
        <LeadDetailPanel detail={activeDetail} profiles={profiles} onUpdate={updateField} onNote={handleNote} />
      </div>
    </section>
  </>;
}

function LeadDetailPanel({ detail, profiles, onUpdate, onNote }: { detail: LeadDetail | null; profiles: AdminProfile[]; onUpdate: (input: { status?: LeadStatus; assignedTo?: string | null; nextActionAt?: string | null }) => Promise<void>; onNote: (event: FormEvent<HTMLFormElement>) => Promise<void> }) {
  if (!detail) return <aside className="rounded-2xl border border-dashed border-border bg-surface p-8 text-center"><UserRound size={30} className="mx-auto text-muted" aria-hidden="true" /><p className="mt-4 font-display text-2xl text-sapphire">Selecciona un lead</p><p className="mt-2 text-sm text-muted">Aquí aparecerán los datos, acciones e historial de la solicitud.</p></aside>;
  const { lead, notes, events } = detail;
  return <aside className="min-w-0 rounded-2xl border border-border bg-surface p-5 md:p-6"><div className="flex items-start justify-between gap-4"><div><p className="eyebrow">Detalle de solicitud</p><h3 className="mt-2 font-display text-3xl text-sapphire">{lead.customer_name}</h3><p className="mt-1 text-sm text-muted">{lead.reference} · {leadStatusGroups[lead.status]}</p></div><Status tone={leadStatusTones[lead.status]}>{leadStatusLabels[lead.status]}</Status></div>
    <div className="mt-6 grid gap-3 sm:grid-cols-2"><a className="rounded-xl border border-border bg-white p-3 text-sm text-sapphire hover:border-champagne" href={`mailto:${lead.customer_email}`}><Mail size={16} className="mb-2 text-champagne" aria-hidden="true" />{lead.customer_email}</a><a className="rounded-xl border border-border bg-white p-3 text-sm text-sapphire hover:border-champagne" href={leadPhoneHref(lead.customer_phone)}><Phone size={16} className="mb-2 text-champagne" aria-hidden="true" />{lead.customer_phone}</a></div>
    <div className="mt-5 flex flex-wrap gap-2"><a className="inline-flex min-h-10 items-center gap-2 rounded-full border border-sapphire px-4 py-2 text-xs font-bold text-sapphire hover:bg-white" href={`mailto:${lead.customer_email}`}><Mail size={15} aria-hidden="true" />Email</a><a className="inline-flex min-h-10 items-center gap-2 rounded-full border border-sapphire px-4 py-2 text-xs font-bold text-sapphire hover:bg-white" href={leadPhoneHref(lead.customer_phone)}><Phone size={15} aria-hidden="true" />Llamar</a><a className="inline-flex min-h-10 items-center gap-2 rounded-full border border-sapphire px-4 py-2 text-xs font-bold text-sapphire hover:bg-white" href={`https://t.me/${process.env.NEXT_PUBLIC_TELEGRAM_USERNAME || "sebasti22"}`} target="_blank" rel="noreferrer"><MessageCircle size={15} aria-hidden="true" />Telegram</a></div>
    <div className="mt-7 grid gap-4"><label className="text-sm font-semibold text-sapphire">Estado<select value={lead.status} onChange={(event) => void onUpdate({ status: event.target.value as LeadStatus })} className="mt-2 w-full rounded-xl border border-border bg-white px-3 py-3 text-sm"><option value="">Seleccionar estado</option>{leadStatuses.map((status) => <option key={status} value={status}>{leadStatusLabels[status]}</option>)}</select></label><label className="text-sm font-semibold text-sapphire">Responsable<select value={lead.assigned_to || ""} onChange={(event) => void onUpdate({ assignedTo: event.target.value || null })} className="mt-2 w-full rounded-xl border border-border bg-white px-3 py-3 text-sm"><option value="">Sin asignar</option>{profiles.map((profile) => <option key={profile.id} value={profile.id}>{profile.full_name || profile.email}</option>)}</select></label><label className="text-sm font-semibold text-sapphire">Próxima acción<input type="datetime-local" value={localDateTime(lead.next_action_at)} onChange={(event) => void onUpdate({ nextActionAt: event.target.value ? new Date(event.target.value).toISOString() : null })} className="mt-2 w-full rounded-xl border border-border bg-white px-3 py-3 text-sm" /></label></div>
    <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-border py-5 text-sm"><div><dt className="text-muted">Especialidad</dt><dd className="mt-1 font-semibold text-sapphire">{lead.specialty_name || "No indicada"}</dd></div><div><dt className="text-muted">Fuente</dt><dd className="mt-1 font-semibold text-sapphire">{lead.source || "Web"}</dd></div><div><dt className="text-muted">Idioma</dt><dd className="mt-1 font-semibold text-sapphire">{lead.locale === "es" ? "Español" : "English"}</dd></div><div><dt className="text-muted">Acompañante</dt><dd className="mt-1 font-semibold text-sapphire">{lead.companion ? "Sí" : "No"}</dd></div></dl>
    {lead.message ? <div className="mt-5 rounded-xl border border-border bg-white p-4"><p className="text-xs font-bold uppercase tracking-[.12em] text-muted">Mensaje inicial</p><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-sapphire">{lead.message}</p></div> : null}
    <form onSubmit={onNote} className="mt-6"><label className="text-sm font-semibold text-sapphire">Añadir nota interna<textarea name="note" required maxLength={2000} rows={3} placeholder="Registra la conversación o el siguiente paso…" className="mt-2 w-full resize-y rounded-xl border border-border bg-white px-3 py-3 text-sm" /></label><Button type="submit" className="mt-3">Guardar nota</Button></form>
    <div className="mt-7"><h4 className="font-display text-2xl text-sapphire">Actividad</h4><div className="mt-4 space-y-3">{[...notes.map((note) => ({ id: note.id, label: "Nota interna", text: note.note, date: note.created_at, author: note.author_name })), ...events.map((event) => ({ id: event.id, label: event.event_type.replaceAll("_", " "), text: event.actor_name || "Actividad registrada", date: event.created_at, author: null }))].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 8).map((item) => <div key={item.id} className="rounded-xl border border-border bg-white p-3"><div className="flex items-center justify-between gap-3"><span className="text-xs font-bold uppercase tracking-[.1em] text-champagne">{item.label}</span><time className="text-xs text-muted">{formatDate(item.date)}</time></div><p className="mt-2 text-sm text-sapphire">{item.text}</p>{item.author ? <p className="mt-1 text-xs text-muted">{item.author}</p> : null}</div>)}{!notes.length && !events.length ? <p className="text-sm text-muted">Todavía no hay actividad registrada.</p> : null}</div></div>
  </aside>;
}
