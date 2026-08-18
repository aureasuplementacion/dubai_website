import { z } from "zod";
export const localeSchema = z.enum(["es", "en"]);
export const provisionalContactSchema = z.object({ email: z.string().email(), name: z.string().min(2) });
