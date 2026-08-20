export type WhatsAppContext = {
  locale?: string;
  specialty?: string;
  source?: string;
};

const PLACEHOLDER_NUMBER = "971500000000";

export function getWhatsAppNumber(value = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER) {
  const digits = value?.replace(/\D/g, "") || "";
  if (digits.length < 8 || digits.length > 15 || digits === PLACEHOLDER_NUMBER) return null;
  return digits;
}

export function getWhatsAppUrl(context: WhatsAppContext = {}) {
  const number = getWhatsAppNumber();
  if (!number) return null;

  const english = context.locale === "en";
  const specialty = context.specialty ? ` ${context.specialty}` : "";
  const source = context.source ? ` (${context.source})` : "";
  const message = english
    ? `Hello, I would like to speak with an Aura advisor about${specialty}.${source}`
    : `Hola, me gustaría hablar con un asesor de Aura sobre${specialty}.${source}`;

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
