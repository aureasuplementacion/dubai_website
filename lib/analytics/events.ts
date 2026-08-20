export const analyticsEvents = ["specialty_viewed", "clinic_viewed", "professional_viewed", "lead_started", "lead_submitted", "lead_confirmation_viewed", "call_requested", "chat_opened", "chat_handoff", "whatsapp_clicked", "telegram_clicked"] as const;
export type AnalyticsEvent = (typeof analyticsEvents)[number];

export function trackEvent(event: AnalyticsEvent, props?: Record<string, string>) {
  if (typeof window === "undefined") return;
  const plausible = (window as Window & { plausible?: (name: string, options?: { props?: Record<string, string> }) => void }).plausible;
  plausible?.(event, props ? { props } : undefined);
  window.dispatchEvent(new CustomEvent("plausible", { detail: { event, props } }));
}
