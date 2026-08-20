"use server";

import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { requireStaff } from "@/lib/auth/require-staff";

export type EditorialField = { id?: string; content_key: string; page: string; section: string; label: string; field_type: "text" | "textarea" | "richtext" | "url"; value_es: string | null; value_en: string | null; status: "draft" | "review" | "verified" | "published" | "archived"; sort_order: number };
export type EditorialMedia = { id?: string; media_key: string; page: string; label: string; path: string; alt_es: string | null; alt_en: string | null; status: EditorialField["status"]; sort_order: number };

async function audit(actorId: string, action: string, entityType: string, entityId: string, metadata: Record<string, unknown>) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL; const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("audit_not_configured");
  const service = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
  const result = await service.from("audit_logs").insert({ actor_id: actorId, action, entity_type: entityType, entity_id: entityId, metadata });
  if (result.error) throw new Error("audit_failed");
}

export async function getEditorialContent() {
  const { supabase } = await requireStaff();
  const [{ data: fields, error: fieldsError }, { data: media, error: mediaError }] = await Promise.all([supabase.from("site_content").select("id, content_key, page, section, label, field_type, value_es, value_en, status, sort_order").order("sort_order"), supabase.from("site_media").select("id, media_key, page, label, path, alt_es, alt_en, status, sort_order").order("sort_order")]);
  if (fieldsError || mediaError) return { ok: false as const, message: "La migración editorial aún no está aplicada en Supabase." };
  return { ok: true as const, fields: (fields || []) as EditorialField[], media: (media || []) as EditorialMedia[] };
}

export async function saveEditorialField(input: unknown) {
  const parsed = z.object({ id: z.string().uuid().nullable().optional(), contentKey: z.string().min(3).max(120), page: z.string().min(2).max(50), section: z.string().min(2).max(80), label: z.string().min(2).max(120), fieldType: z.enum(["text", "textarea", "richtext", "url"]), valueEs: z.string().max(10000), valueEn: z.string().max(10000), status: z.enum(["draft", "review", "verified", "published", "archived"]), sortOrder: z.number().int().min(0).max(9999) }).safeParse(input);
  if (!parsed.success) return { ok: false as const, message: "Revisa el texto y el estado del campo." };
  const { supabase, user } = await requireStaff(); const value = parsed.data; const payload = { content_key: value.contentKey, page: value.page, section: value.section, label: value.label, field_type: value.fieldType, value_es: value.valueEs || null, value_en: value.valueEn || null, status: value.status, sort_order: value.sortOrder, updated_by: user.id };
  const result = value.id ? await supabase.from("site_content").update(payload).eq("id", value.id).select("id").single() : await supabase.from("site_content").upsert(payload, { onConflict: "content_key" }).select("id").single();
  if (result.error || !result.data) return { ok: false as const, message: "No se ha podido guardar el campo editorial." };
  await audit(user.id, value.id ? "editorial_content_updated" : "editorial_content_created", "site_content", result.data.id, { contentKey: value.contentKey, status: value.status });
  return { ok: true as const };
}

export async function saveEditorialMedia(input: unknown) {
  const parsed = z.object({ id: z.string().uuid().nullable().optional(), mediaKey: z.string().min(3).max(120), page: z.string().min(2).max(50), label: z.string().min(2).max(120), path: z.string().min(1).max(500), altEs: z.string().max(300), altEn: z.string().max(300), status: z.enum(["draft", "review", "verified", "published", "archived"]), sortOrder: z.number().int().min(0).max(9999) }).safeParse(input);
  if (!parsed.success) return { ok: false as const, message: "Revisa la ruta de imagen y los textos alternativos." };
  const { supabase, user } = await requireStaff(); const value = parsed.data; const payload = { media_key: value.mediaKey, page: value.page, label: value.label, path: value.path, alt_es: value.altEs || null, alt_en: value.altEn || null, status: value.status, sort_order: value.sortOrder, updated_by: user.id };
  const result = value.id ? await supabase.from("site_media").update(payload).eq("id", value.id).select("id").single() : await supabase.from("site_media").upsert(payload, { onConflict: "media_key" }).select("id").single();
  if (result.error || !result.data) return { ok: false as const, message: "No se ha podido guardar la imagen." };
  await audit(user.id, "editorial_media_updated", "site_media", result.data.id, { mediaKey: value.mediaKey, status: value.status });
  return { ok: true as const };
}
