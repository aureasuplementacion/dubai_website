"use server";

import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { requireStaff } from "@/lib/auth/require-staff";

const contentStatus = z.enum(["draft", "review", "verified", "published", "archived"]);
const id = z.string().uuid();

export type ContentStatus = "draft" | "review" | "verified" | "published" | "archived";
export type ContentSpecialty = { id: string; slug: string; name_es: string; name_en: string; short_description_es: string; short_description_en: string; description_es: string | null; description_en: string | null; status: ContentStatus; sort_order: number };
export type ContentService = { id: string; specialty_id: string; slug: string; name_es: string; name_en: string; description_es: string | null; description_en: string | null; status: ContentStatus; sort_order: number };
export type ContentOption = { id: string; specialty_service_id: string; slug: string; name_es: string; name_en: string; summary_es: string | null; summary_en: string | null; status: ContentStatus; sort_order: number };

const specialtyInput = z.object({ id: id.nullable().optional(), slug: z.string().trim().min(2).max(80).regex(/^[a-z0-9-]+$/), nameEs: z.string().trim().min(2).max(120), nameEn: z.string().trim().min(2).max(120), shortEs: z.string().trim().min(2).max(300), shortEn: z.string().trim().min(2).max(300), descriptionEs: z.string().trim().max(2000).nullable(), descriptionEn: z.string().trim().max(2000).nullable(), status: contentStatus, sortOrder: z.number().int().min(0).max(9999) });
const serviceInput = z.object({ id: id.nullable().optional(), specialtyId: id, slug: z.string().trim().min(2).max(80).regex(/^[a-z0-9-]+$/), nameEs: z.string().trim().min(2).max(120), nameEn: z.string().trim().min(2).max(120), descriptionEs: z.string().trim().max(2000).nullable(), descriptionEn: z.string().trim().max(2000).nullable(), status: contentStatus, sortOrder: z.number().int().min(0).max(9999) });
const optionInput = z.object({ id: id.nullable().optional(), serviceId: id, slug: z.string().trim().min(2).max(80).regex(/^[a-z0-9-]+$/), nameEs: z.string().trim().min(2).max(120), nameEn: z.string().trim().min(2).max(120), summaryEs: z.string().trim().max(1000).nullable(), summaryEn: z.string().trim().max(1000).nullable(), status: contentStatus, sortOrder: z.number().int().min(0).max(9999) });

async function audit(actorId: string, action: string, entityType: string, entityId: string, metadata: Record<string, unknown>) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL; const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("audit_not_configured");
  const service = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
  const result = await service.from("audit_logs").insert({ actor_id: actorId, action, entity_type: entityType, entity_id: entityId, metadata });
  if (result.error) throw new Error("audit_failed");
}

export async function getContentCatalog() {
  const { supabase } = await requireStaff();
  const [{ data: specialties, error: specialtiesError }, { data: services, error: servicesError }, { data: options, error: optionsError }] = await Promise.all([
    supabase.from("specialties").select("id, slug, name_es, name_en, short_description_es, short_description_en, description_es, description_en, status, sort_order").order("sort_order"),
    supabase.from("specialty_services").select("id, specialty_id, slug, name_es, name_en, description_es, description_en, status, sort_order").order("sort_order"),
    supabase.from("specialty_service_options").select("id, specialty_service_id, slug, name_es, name_en, summary_es, summary_en, status, sort_order").order("sort_order"),
  ]);
  if (specialtiesError || servicesError || optionsError) return { ok: false as const, message: "No se ha podido cargar el catálogo. Comprueba que la migración de contenido esté aplicada." };
  return { ok: true as const, specialties: (specialties || []) as ContentSpecialty[], services: (services || []) as ContentService[], options: (options || []) as ContentOption[] };
}

export async function saveSpecialty(input: unknown) {
  const parsed = specialtyInput.safeParse(input); if (!parsed.success) return { ok: false as const, message: "Revisa los campos de la especialidad." };
  const { supabase, user } = await requireStaff(); const value = parsed.data; const payload = { slug: value.slug, name_es: value.nameEs, name_en: value.nameEn, short_description_es: value.shortEs, short_description_en: value.shortEn, description_es: value.descriptionEs || null, description_en: value.descriptionEn || null, status: value.status, sort_order: value.sortOrder };
  const result = value.id ? await supabase.from("specialties").update(payload).eq("id", value.id).select("id").single() : await supabase.from("specialties").insert(payload).select("id").single();
  if (result.error || !result.data) return { ok: false as const, message: "No se ha podido guardar la especialidad." };
  await audit(user.id, value.id ? "specialty_updated" : "specialty_created", "specialty", result.data.id, { status: value.status });
  return { ok: true as const, id: result.data.id };
}

export async function saveService(input: unknown) {
  const parsed = serviceInput.safeParse(input); if (!parsed.success) return { ok: false as const, message: "Revisa los campos del tratamiento." };
  const { supabase, user } = await requireStaff(); const value = parsed.data; const payload = { specialty_id: value.specialtyId, slug: value.slug, name_es: value.nameEs, name_en: value.nameEn, description_es: value.descriptionEs || null, description_en: value.descriptionEn || null, status: value.status, sort_order: value.sortOrder };
  const result = value.id ? await supabase.from("specialty_services").update(payload).eq("id", value.id).select("id").single() : await supabase.from("specialty_services").insert(payload).select("id").single();
  if (result.error || !result.data) return { ok: false as const, message: "No se ha podido guardar el tratamiento." };
  await audit(user.id, value.id ? "service_updated" : "service_created", "specialty_service", result.data.id, { specialtyId: value.specialtyId, status: value.status });
  return { ok: true as const, id: result.data.id };
}

export async function saveOption(input: unknown) {
  const parsed = optionInput.safeParse(input); if (!parsed.success) return { ok: false as const, message: "Revisa los campos de la subcategoría." };
  const { supabase, user } = await requireStaff(); const value = parsed.data; const payload = { specialty_service_id: value.serviceId, slug: value.slug, name_es: value.nameEs, name_en: value.nameEn, summary_es: value.summaryEs || null, summary_en: value.summaryEn || null, status: value.status, sort_order: value.sortOrder };
  const result = value.id ? await supabase.from("specialty_service_options").update(payload).eq("id", value.id).select("id").single() : await supabase.from("specialty_service_options").insert(payload).select("id").single();
  if (result.error || !result.data) return { ok: false as const, message: "No se ha podido guardar la subcategoría. Aplica antes la migración de opciones." };
  await audit(user.id, value.id ? "option_updated" : "option_created", "specialty_service_option", result.data.id, { serviceId: value.serviceId, status: value.status });
  return { ok: true as const, id: result.data.id };
}
