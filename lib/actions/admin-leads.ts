"use server";

import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { requireStaff } from "@/lib/auth/require-staff";
import { leadStatuses, leadStatusGroups, type LeadStatus, type LeadStatusGroup } from "@/lib/admin/lead-status";

export type AdminLead = {
  id: string;
  reference: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  specialty_id: string | null;
  specialty_name: string | null;
  companion: boolean;
  message: string | null;
  consent_contact: boolean;
  locale: "es" | "en";
  source: string | null;
  status: LeadStatus;
  assigned_to: string | null;
  assigned_name: string | null;
  next_action_at: string | null;
  created_at: string;
  updated_at: string;
};

export type AdminProfile = { id: string; full_name: string | null; email: string | null; role: "admin" | "manager"; is_active: boolean };
export type LeadNote = { id: string; note: string; author_name: string | null; created_at: string };
export type LeadEvent = { id: string; event_type: string; metadata: Record<string, unknown>; actor_name: string | null; created_at: string };
export type LeadDetail = { lead: AdminLead; notes: LeadNote[]; events: LeadEvent[] };
export type LeadFilters = { query?: string; status?: LeadStatus | "all"; group?: LeadStatusGroup | "all"; attention?: "overdue"; specialtyId?: string; source?: string; from?: string; to?: string; page?: number; pageSize?: number };

const statusSchema = z.enum(leadStatuses);
const leadIdSchema = z.string().uuid();
const updateLeadSchema = z.object({
  leadId: leadIdSchema,
  status: statusSchema.optional(),
  assignedTo: z.string().uuid().nullable().optional(),
  nextActionAt: z.string().datetime().nullable().optional(),
});

function normalizeLead(row: Record<string, unknown>, specialties: Map<string, string>, profiles: Map<string, string>): AdminLead {
  return {
    id: String(row.id),
    reference: String(row.reference),
    customer_name: String(row.customer_name),
    customer_phone: String(row.customer_phone),
    customer_email: String(row.customer_email),
    specialty_id: row.specialty_id ? String(row.specialty_id) : null,
    specialty_name: row.specialty_id ? specialties.get(String(row.specialty_id)) || null : null,
    companion: Boolean(row.companion),
    message: row.message ? String(row.message) : null,
    consent_contact: Boolean(row.consent_contact),
    locale: row.locale === "en" ? "en" : "es",
    source: row.source ? String(row.source) : null,
    status: row.status as LeadStatus,
    assigned_to: row.assigned_to ? String(row.assigned_to) : null,
    assigned_name: row.assigned_to ? profiles.get(String(row.assigned_to)) || null : null,
    next_action_at: row.next_action_at ? String(row.next_action_at) : null,
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
  };
}

async function lookupMaps(supabase: Awaited<ReturnType<typeof requireStaff>>["supabase"]) {
  const [{ data: specialties }, { data: profiles }] = await Promise.all([
    supabase.from("specialties").select("id, name_es"),
    supabase.from("profiles").select("id, full_name, email").eq("is_active", true).order("full_name"),
  ]);
  return {
    specialties: new Map((specialties || []).map((item) => [String(item.id), String(item.name_es)])),
    profiles: new Map((profiles || []).map((item) => [String(item.id), String(item.full_name || item.email || "Sin nombre")])),
  };
}

async function recordAudit(actorId: string, action: string, entityId: string, metadata: Record<string, unknown>) {
  const serviceClient = createServiceClient();
  const result = await serviceClient.from("audit_logs").insert({ actor_id: actorId, action, entity_type: "lead", entity_id: entityId, metadata });
  if (result.error) throw new Error("audit_persist_failed");
}

function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) throw new Error("supabase_service_not_configured");
  return createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });
}

async function recordEvent(actorId: string, leadId: string, eventType: string, metadata: Record<string, unknown> = {}) {
  const result = await createServiceClient().from("lead_events").insert({ actor_id: actorId, lead_id: leadId, event_type: eventType, metadata });
  if (result.error) throw new Error("event_persist_failed");
}

export async function getAdminLeads(filters: LeadFilters = {}) {
  const { supabase } = await requireStaff();
  const pageSize = Math.min(Math.max(filters.pageSize || 20, 10), 50);
  const page = Math.max(filters.page || 1, 1);
  let query = supabase.from("leads").select("id, reference, customer_name, customer_phone, customer_email, specialty_id, companion, message, consent_contact, locale, source, status, assigned_to, next_action_at, created_at, updated_at", { count: "exact" });
  const search = filters.query?.trim().replace(/[(),]/g, " ");
  if (search) query = query.or(`reference.ilike.%${search}%,customer_name.ilike.%${search}%,customer_email.ilike.%${search}%,customer_phone.ilike.%${search}%`);
  if (filters.status && filters.status !== "all") query = query.eq("status", filters.status);
  if (filters.group && filters.group !== "all") {
    const statuses = leadStatuses.filter((status) => leadStatusGroups[status] === filters.group);
    query = query.in("status", statuses);
  }
  if (filters.attention === "overdue") query = query.lt("next_action_at", new Date().toISOString()).not("next_action_at", "is", null).not("status", "in", "(completed,not_eligible,lost,cancelled)");
  if (filters.specialtyId) query = query.eq("specialty_id", filters.specialtyId);
  if (filters.source) query = query.eq("source", filters.source);
  if (filters.from) query = query.gte("created_at", `${filters.from}T00:00:00.000Z`);
  if (filters.to) query = query.lt("created_at", `${filters.to}T23:59:59.999Z`);
  const { data, error, count } = await query.order("created_at", { ascending: false }).range((page - 1) * pageSize, page * pageSize - 1);
  if (error) return { ok: false as const, message: "No se han podido cargar los leads." };
  const maps = await lookupMaps(supabase);
  return { ok: true as const, leads: (data || []).map((row) => normalizeLead(row, maps.specialties, maps.profiles)), count: count || 0, page, pageSize, totalPages: Math.max(1, Math.ceil((count || 0) / pageSize)) };
}

export async function getLeadDetail(leadId: string) {
  const parsedId = leadIdSchema.safeParse(leadId);
  if (!parsedId.success) return { ok: false as const, message: "Lead no válido." };
  const { supabase } = await requireStaff();
  const [{ data: row, error }, { data: notes }, { data: events }, maps] = await Promise.all([
    supabase.from("leads").select("id, reference, customer_name, customer_phone, customer_email, specialty_id, companion, message, consent_contact, locale, source, status, assigned_to, next_action_at, created_at, updated_at").eq("id", parsedId.data).maybeSingle(),
    supabase.from("lead_notes").select("id, note, author_id, created_at").eq("lead_id", parsedId.data).order("created_at", { ascending: false }),
    supabase.from("lead_events").select("id, event_type, metadata, actor_id, created_at").eq("lead_id", parsedId.data).order("created_at", { ascending: false }),
    lookupMaps(supabase),
  ]);
  if (error || !row) return { ok: false as const, message: "No se ha encontrado el lead." };
  const noteAuthors = new Map(maps.profiles);
  return { ok: true as const, detail: { lead: normalizeLead(row, maps.specialties, maps.profiles), notes: (notes || []).map((item) => ({ id: String(item.id), note: String(item.note), author_name: item.author_id ? noteAuthors.get(String(item.author_id)) || null : null, created_at: String(item.created_at) })), events: (events || []).map((item) => ({ id: String(item.id), event_type: String(item.event_type), metadata: (item.metadata || {}) as Record<string, unknown>, actor_name: item.actor_id ? noteAuthors.get(String(item.actor_id)) || null : null, created_at: String(item.created_at) })) } satisfies LeadDetail };
}

export async function updateLead(input: unknown) {
  const parsed = updateLeadSchema.safeParse(input);
  if (!parsed.success || (!parsed.data.status && parsed.data.assignedTo === undefined && parsed.data.nextActionAt === undefined)) return { ok: false as const, message: "No hay cambios válidos que guardar." };
  const { user } = await requireStaff();
  const serviceClient = createServiceClient();
  const payload: Record<string, unknown> = {};
  if (parsed.data.status) payload.status = parsed.data.status;
  if (parsed.data.assignedTo !== undefined) payload.assigned_to = parsed.data.assignedTo;
  if (parsed.data.nextActionAt !== undefined) payload.next_action_at = parsed.data.nextActionAt;
  const { data: before } = await serviceClient.from("leads").select("status, assigned_to, next_action_at").eq("id", parsed.data.leadId).maybeSingle();
  const { error } = await serviceClient.from("leads").update(payload).eq("id", parsed.data.leadId);
  if (error) return { ok: false as const, message: "No se han podido guardar los cambios." };
  const changes = { before: before || {}, after: payload };
  await recordEvent(user.id, parsed.data.leadId, parsed.data.status ? "status_changed" : "lead_updated", changes);
  await recordAudit(user.id, parsed.data.status ? "lead_status_updated" : "lead_updated", parsed.data.leadId, changes);
  return { ok: true as const };
}

export async function addLeadNote(input: unknown) {
  const parsed = z.object({ leadId: leadIdSchema, note: z.string().trim().min(2).max(2000) }).safeParse(input);
  if (!parsed.success) return { ok: false as const, message: "La nota debe tener entre 2 y 2.000 caracteres." };
  const { user } = await requireStaff();
  const { error } = await createServiceClient().from("lead_notes").insert({ lead_id: parsed.data.leadId, author_id: user.id, note: parsed.data.note });
  if (error) return { ok: false as const, message: "No se ha podido guardar la nota." };
  await recordEvent(user.id, parsed.data.leadId, "note_added");
  await recordAudit(user.id, "lead_note_added", parsed.data.leadId, {});
  return { ok: true as const };
}

export async function exportAdminLeads(filters: LeadFilters = {}) {
  const { profile } = await requireStaff();
  if (profile.role !== "admin") return { ok: false as const, message: "Solo un administrador puede exportar leads." };
  const result = await getAdminLeads({ ...filters, page: 1, pageSize: 50 });
  if (!result.ok) return result;
  const cell = (value: unknown) => `"${String(value ?? "").replaceAll('"', '""')}"`;
  const rows = [
    ["Referencia", "Nombre", "Email", "Teléfono", "Especialidad", "Estado", "Fuente", "Responsable", "Creado"],
    ...result.leads.map((lead) => [lead.reference, lead.customer_name, lead.customer_email, lead.customer_phone, lead.specialty_name, lead.status, lead.source, lead.assigned_name, lead.created_at]),
  ];
  return { ok: true as const, csv: rows.map((row) => row.map(cell).join(",")).join("\n") };
}

export async function getAdminProfiles() {
  const { supabase } = await requireStaff();
  const { data, error } = await supabase.from("profiles").select("id, full_name, email, role, is_active").eq("is_active", true).order("full_name");
  if (error) return { ok: false as const, message: "No se han podido cargar los responsables." };
  return { ok: true as const, profiles: (data || []) as AdminProfile[] };
}

export async function getAdminLeadSummary() {
  const { supabase } = await requireStaff();
  const statuses = ["new", "contact_requested", "qualified", "travel_planned"] as const;
  const [totalResult, ...results] = await Promise.all([
    supabase.from("leads").select("id", { count: "exact", head: true }),
    ...statuses.map((status) => supabase.from("leads").select("id", { count: "exact", head: true }).eq("status", status)),
  ]);
  if (totalResult.error || results.some((result) => result.error)) return { ok: false as const, message: "No se han podido cargar los indicadores." };
  const [overdueResult, unassignedResult] = await Promise.all([
    supabase.from("leads").select("id", { count: "exact", head: true }).lt("next_action_at", new Date().toISOString()).not("next_action_at", "is", null).not("status", "in", "(completed,not_eligible,lost,cancelled)"),
    supabase.from("leads").select("id", { count: "exact", head: true }).is("assigned_to", null).not("status", "in", "(completed,not_eligible,lost,cancelled)"),
  ]);
  if (overdueResult.error || unassignedResult.error) return { ok: false as const, message: "No se han podido cargar los indicadores." };
  return { ok: true as const, summary: { total: totalResult.count || 0, newCount: results[0].count || 0, contactCount: results[1].count || 0, qualifiedCount: results[2].count || 0, travelCount: results[3].count || 0, overdueCount: overdueResult.count || 0, unassignedCount: unassignedResult.count || 0 } };
}
