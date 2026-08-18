"use server";

import { bookingSchema } from "@/lib/validations";

export type BookingActionResult = { ok: true; reference: string; data: { service: string; date: string; time: string; name: string; email: string } } | { ok: false; message: string; fieldErrors?: Record<string, string[]> };

export async function submitBooking(formData: FormData): Promise<BookingActionResult> {
  const parsed = bookingSchema.safeParse({
    service: formData.get("service"), date: formData.get("date"), time: formData.get("time"), name: formData.get("name"), phone: formData.get("phone"), email: formData.get("email"), transport: formData.get("transport") === "on", message: formData.get("message") || undefined, consent: formData.get("consent") === "on", honeypot: formData.get("website") || "",
  });
  if (!parsed.success) return { ok: false, message: "validation", fieldErrors: parsed.error.flatten().fieldErrors };
  const attachments = formData.getAll("attachments").filter((value): value is File => value instanceof File && value.size > 0);
  if (attachments.length > 5 || attachments.some((file) => file.size > 10 * 1024 * 1024 || !["image/jpeg", "image/png", "image/webp", "application/pdf"].includes(file.type))) return { ok: false, message: "attachments" };
  return { ok: true, reference: `AURA-${crypto.randomUUID().slice(0, 8).toUpperCase()}`, data: { service: parsed.data.service, date: parsed.data.date, time: parsed.data.time, name: parsed.data.name, email: parsed.data.email } };
}
