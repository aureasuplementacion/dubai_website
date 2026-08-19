import { z } from "zod";

export const localeSchema = z.enum(["es", "en"]);
export const provisionalContactSchema = z.object({ email: z.string().email(), name: z.string().min(2) });

export const leadSchema = z.object({
  specialty: z.string().trim().min(1).max(80),
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(7).max(30),
  email: z.string().trim().email().max(160),
  companion: z.boolean(),
  message: z.string().trim().max(2000).optional(),
  consent: z.boolean().refine((value) => value, "Consent is required"),
  honeypot: z.string().max(0).optional(),
  locale: z.enum(["es", "en"]).default("es"),
  source: z.string().trim().max(80).default("website"),
});

export type LeadInput = z.infer<typeof leadSchema>;
