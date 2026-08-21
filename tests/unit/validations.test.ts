import { describe, expect, it } from "vitest";
import { leadSchema } from "@/lib/validations";
import { leadStatusGroups } from "@/lib/admin/lead-status";
import { getWhatsAppNumber } from "@/lib/contact/whatsapp";

const validLead = {
  specialty: "capilar",
  name: "Test Aura",
  phone: "+34600000000",
  email: "test-aura@example.com",
  companion: false,
  consent: true,
  honeypot: "",
  locale: "es",
  source: "TEST-AURA",
};

describe("leadSchema", () => {
  it("acepta un lead válido y aplica valores por defecto", () => {
    const result = leadSchema.parse({ ...validLead, locale: undefined, source: undefined });
    expect(result.locale).toBe("es");
    expect(result.source).toBe("website");
  });

  it("rechaza el consentimiento ausente", () => {
    const result = leadSchema.safeParse({ ...validLead, consent: false });
    expect(result.success).toBe(false);
  });

  it("rechaza contenido en el honeypot", () => {
    const result = leadSchema.safeParse({ ...validLead, honeypot: "bot-value" });
    expect(result.success).toBe(false);
  });

  it("rechaza email y teléfono inválidos", () => {
    const result = leadSchema.safeParse({ ...validLead, email: "not-an-email", phone: "123" });
    expect(result.success).toBe(false);
  });

  it("mantiene las agrupaciones operativas del CRM", () => {
    expect(leadStatusGroups.new).toBe("entrada");
    expect(leadStatusGroups.qualified).toBe("proceso");
    expect(leadStatusGroups.completed).toBe("cierre");
  });

  it("rechaza el número provisional de WhatsApp", () => {
    expect(getWhatsAppNumber("971 500 000 000")).toBeNull();
    expect(getWhatsAppNumber("+34 600 123 456")).toBe("34600123456");
  });
});
