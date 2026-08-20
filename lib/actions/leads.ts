"use server";

import { headers } from "next/headers";
import { leadSchema } from "@/lib/validations";
import { rateLimit } from "@/lib/security/rate-limit";

export type LeadActionResult = { ok: true; reference: string } | { ok: false; message: string; fieldErrors?: Record<string, string[]> };

function createReference() { return `AURA-${crypto.randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase()}`; }

async function supabaseRequest(path: string, init: RequestInit = {}) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return fetch(`${url}/rest/v1/${path}`, { ...init, headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", ...(init.headers || {}) }, cache: "no-store" });
}

async function sendNotifications(input: { reference: string; name: string; email: string; phone: string; specialty: string; message?: string; locale: "es" | "en" }) {
  const notificationEmail = process.env.ADMIN_NOTIFICATION_EMAIL;
  const resendKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  if (!resendKey || !fromEmail || !notificationEmail) return;
  const isEnglish = input.locale === "en";
  const internalText = isEnglish ? `New Aura call request\n\nReference: ${input.reference}\nName: ${input.name}\nEmail: ${input.email}\nPhone: ${input.phone}\nSpecialty: ${input.specialty}\nMessage: ${input.message || "-"}\n\nPlease review this request and contact the person as soon as possible.` : `Nueva solicitud de llamada Aura\n\nReferencia: ${input.reference}\nNombre: ${input.name}\nEmail: ${input.email}\nTeléfono: ${input.phone}\nEspecialidad: ${input.specialty}\nMensaje: ${input.message || "-"}\n\nRevisa esta solicitud y contacta con la persona lo antes posible.`;
  const customerText = isEnglish ? `Hello, ${input.name}.\n\nThank you for contacting Aura Estética.\n\nWe have received your call request with reference ${input.reference}. One of our advisors will review your request and contact you as soon as possible to answer your questions and explain the next steps.\n\nThis request is for information only and does not confirm a treatment, date or availability.\n\nWarm regards,\nThe Aura Estética team` : `Hola, ${input.name}:\n\nGracias por escribir a Aura Estética.\n\nHemos recibido correctamente tu solicitud de llamada con la referencia ${input.reference}. Uno de nuestros asesores revisará la información y se pondrá en contacto contigo lo antes posible para resolver tus dudas y explicarte los siguientes pasos.\n\nEsta solicitud es únicamente informativa y no confirma ningún tratamiento, fecha ni disponibilidad.\n\nUn saludo,\nEl equipo de Aura Estética`;
  const messages = [
    { to: notificationEmail, subject: `Nuevo lead ${input.reference}`, text: internalText, kind: "internal" },
    { to: input.email, subject: isEnglish ? `Aura request ${input.reference}` : `Solicitud Aura ${input.reference}`, text: customerText, kind: "customer" },
  ];
  const results = await Promise.allSettled(messages.map(async (message) => {
    const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: fromEmail, to: [message.to], subject: message.subject, text: message.text }) });
    if (!response.ok) throw new Error(`resend_${response.status}`);
    return message.kind;
  }));
  const failed = results.flatMap((result, index) => result.status === "rejected" ? [messages[index].kind] : []);
  if (failed.length) console.error("Aura email notification failure", { reference: input.reference, failed });
}

export async function submitLead(formData: FormData): Promise<LeadActionResult> {
  const requestHeaders = await headers();
  const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || requestHeaders.get("x-real-ip") || "unknown";
  const limit = await rateLimit(`lead:${ip}`, 5, 600);
  if (!limit.allowed) return { ok: false, message: "rate_limit" };

  const parsed = leadSchema.safeParse({ specialty: formData.get("specialty"), name: formData.get("name"), phone: formData.get("phone"), email: formData.get("email"), companion: formData.get("companion") === "on", message: formData.get("message") || undefined, consent: formData.get("consent") === "on", honeypot: formData.get("website") || "", locale: formData.get("locale") || "es", source: formData.get("source") || "website" });
  if (!parsed.success) return { ok: false, message: "validation", fieldErrors: parsed.error.flatten().fieldErrors };
  const input = parsed.data;
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return { ok: false, message: "persistence" };
  const leadReference = createReference();
  const specialtyResponse = await supabaseRequest(`specialties?slug=eq.${encodeURIComponent(input.specialty)}&status=eq.published&select=id`);
  const specialtyRows = specialtyResponse?.ok ? await specialtyResponse.json() as Array<{ id: string }> : [];
  const payload = { reference: leadReference, customer_name: input.name, customer_phone: input.phone, customer_email: input.email, specialty_id: specialtyRows[0]?.id || null, companion: input.companion, message: input.message || null, consent_contact: input.consent, locale: input.locale, source: input.source, status: "new" };
  const leadResponse = await supabaseRequest("leads", { method: "POST", headers: { Prefer: "return=representation" }, body: JSON.stringify(payload) });
  if (leadResponse && !leadResponse.ok) return { ok: false, message: "persistence" };
  if (leadResponse?.ok) {
    const rows = await leadResponse.json() as Array<{ id: string }>;
    if (rows[0]?.id) await supabaseRequest("lead_events", { method: "POST", body: JSON.stringify({ lead_id: rows[0].id, event_type: "lead_created", metadata: { source: input.source, locale: input.locale } }) });
  }
  await sendNotifications({ reference: leadReference, name: input.name, email: input.email, phone: input.phone, specialty: input.specialty, message: input.message, locale: input.locale });
  return { ok: true, reference: leadReference };
}
