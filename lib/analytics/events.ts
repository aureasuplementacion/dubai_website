export const analyticsEvents = ["specialty_viewed", "clinic_viewed", "professional_viewed", "lead_started", "lead_submitted", "call_requested", "whatsapp_clicked"] as const;
export type AnalyticsEvent = (typeof analyticsEvents)[number];

export function trackEvent(event: AnalyticsEvent, props?: Record<string, string>) {
  if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("plausible", { detail: { event, props } }));
}
