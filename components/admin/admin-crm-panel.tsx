"use client";

import { useMemo, useState, useTransition } from "react";
import { Mail, Phone, RefreshCw, Search } from "lucide-react";
import { updateLead, getAdminLeads, type AdminLead, type LeadFilters } from "@/lib/actions/admin-leads";
import { leadStatusLabels, leadStatusTones, type LeadStatus } from "@/lib/admin/lead-status";
import { Button } from "@/components/ui/button";
import { Status } from "@/components/ui/status";

type CrmBucket = "pending" | "qualified" | "not_eligible";
const buckets: { id: CrmBucket; label: string; description: string; status: LeadStatus; tone: "warning" | "success" | "danger" }[] = [
  { id: "pending", label: "Pendiente", description: "Requiere revisión o primer contacto", status: "contact_requested", tone: "warning" },
  { id: "qualified", label: "Apto", description: "Puede avanzar a valoración", status: "qualified", tone: "success" },
  { id: "not_eligible", label: "No apto", description: "Cerrado o no continúa", status: "not_eligible", tone: "danger" },
];

function bucketFor(status: LeadStatus): CrmBucket {
  if (["qualified", "awaiting_clinic_review", "proposal_sent", "travel_planned", "completed"].includes(status)) return "qualified";
  if (["not_eligible", "lost", "cancelled"].includes(status)) return "not_eligible";
  return "pending";
}

function formatDate(value: string) { return new Intl.DateTimeFormat("es-ES", { dateStyle: "medium" }).format(new Date(value)); }

export function AdminCrmPanel({ initialLeads }: { initialLeads: AdminLead[] }) {
  const [leads, setLeads] = useState(initialLeads);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const visibleLeads = useMemo(() => { const normalized = query.trim().toLowerCase(); if (!normalized) return leads; return leads.filter((lead) => [lead.customer_name, lead.customer_email, lead.reference, lead.customer_phone].some((value) => value.toLowerCase().includes(normalized))); }, [leads, query]);

  async function refresh() { setMessage(""); const result = await getAdminLeads({ page: 1, pageSize: 50, status: "all" } satisfies LeadFilters); if (!result.ok) { setMessage(result.message); return; } setLeads(result.leads); }
  function moveLead(lead: AdminLead, bucket: (typeof buckets)[number]) { setMessage(""); startTransition(() => { void (async () => { const result = await updateLead({ leadId: lead.id, status: bucket.status }); if (!result.ok) { setMessage(result.message); return; } setLeads((current) => current.map((item) => item.id === lead.id ? { ...item, status: bucket.status } : item)); setMessage(`${lead.reference} actualizado.`); })(); }); }

  return <section className="mt-10 rounded-[1.5rem] border border-border bg-white p-5 shadow-soft md:p-7"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="eyebrow">CRM operativo</p><h2 className="mt-2 font-display text-3xl text-sapphire">Seguimiento comercial</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-muted">Una clasificación sencilla para saber qué solicitudes requieren atención y cuáles pueden avanzar.</p></div><Button tone="secondary" type="button" onClick={() => void refresh()} disabled={isPending}><RefreshCw size={16} aria-hidden="true" />Actualizar</Button></div><label className="relative mt-7 block max-w-xl"><span className="sr-only">Buscar en el CRM</span><Search size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por nombre, email o referencia" className="w-full rounded-xl border border-border bg-surface py-3 pl-11 pr-4 text-sm" /></label>{message ? <p role="status" className="mt-4 rounded-xl border border-info/20 bg-info/10 px-4 py-3 text-sm text-info">{message}</p> : null}<div className="mt-8 grid gap-5 xl:grid-cols-3">{buckets.map((bucket) => { const bucketLeads = visibleLeads.filter((lead) => bucketFor(lead.status) === bucket.id); return <section key={bucket.id} className="min-h-[28rem] rounded-2xl border border-border bg-surface p-4"><div className="flex items-start justify-between gap-3"><div><Status tone={bucket.tone}>{bucket.label}</Status><p className="mt-3 text-xs leading-5 text-muted">{bucket.description}</p></div><span className="font-display text-3xl text-sapphire">{bucketLeads.length}</span></div><div className="mt-5 space-y-3">{bucketLeads.map((lead) => <article key={lead.id} className="rounded-xl border border-border bg-white p-4 shadow-sm"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><h3 className="truncate font-semibold text-sapphire">{lead.customer_name}</h3><p className="mt-1 truncate text-xs text-muted">{lead.reference}</p></div><Status tone={leadStatusTones[lead.status]}>{leadStatusLabels[lead.status]}</Status></div><p className="mt-3 text-xs text-muted">{lead.specialty_name || "Sin especialidad"} · {formatDate(lead.created_at)}</p><div className="mt-4 flex flex-wrap gap-2"><a aria-label={`Enviar email a ${lead.customer_name}`} className="inline-flex size-9 items-center justify-center rounded-full border border-border text-sapphire hover:border-champagne" href={`mailto:${lead.customer_email}`}><Mail size={15} aria-hidden="true" /></a><a aria-label={`Llamar a ${lead.customer_name}`} className="inline-flex size-9 items-center justify-center rounded-full border border-border text-sapphire hover:border-champagne" href={`tel:${lead.customer_phone.replace(/\s+/g, "")}`}><Phone size={15} aria-hidden="true" /></a><select aria-label={`Clasificar a ${lead.customer_name}`} value={bucket.id} onChange={(event) => { const next = buckets.find((item) => item.id === event.target.value); if (next) moveLead(lead, next); }} className="min-h-9 flex-1 rounded-full border border-border bg-white px-3 text-xs font-semibold text-sapphire"><option value="pending">Pendiente</option><option value="qualified">Apto</option><option value="not_eligible">No apto</option></select></div></article>)}</div>{!bucketLeads.length ? <p className="mt-12 text-center text-sm text-muted">No hay solicitudes en esta columna.</p> : null}</section>; })}</div></section>;
}
