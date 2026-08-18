import { z } from "zod";
export const localeSchema = z.enum(["es", "en"]);
export const provisionalContactSchema = z.object({ email: z.string().email(), name: z.string().min(2) });

export const bookingSchema = z.object({
  service: z.string().min(1),
  date: z.string().min(1),
  time: z.string().min(1),
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(7).max(30),
  email: z.string().email().max(160),
  transport: z.boolean(),
  message: z.string().max(2000).optional(),
  consent: z.boolean().refine((value) => value, "Consent is required"),
  honeypot: z.string().max(0).optional(),
});
export type BookingInput = z.infer<typeof bookingSchema>;
