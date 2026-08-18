export const analyticsEvents = ["catalog_viewed", "service_viewed", "booking_started", "booking_submitted", "booking_confirmed", "whatsapp_clicked"] as const;
export type AnalyticsEvent = (typeof analyticsEvents)[number];

export function trackEvent(event: AnalyticsEvent, props?: Record<string, string>) {
  if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("plausible", { detail: { event, props } }));
}
