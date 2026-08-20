"use client";

import { useActionState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { submitLead, type LeadActionResult } from "@/lib/actions/leads";
import { publishedSpecialties } from "@/lib/catalog/data";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics/events";

const initialState: LeadActionResult | null = null;

export function BookingForm({ defaultSpecialty, defaultClinic }: { defaultSpecialty?: string; defaultClinic?: string }) {
  const locale = useLocale();
  const t = useTranslations("Lead");
  const [state, action, pending] = useActionState((_previous: LeadActionResult | null, formData: FormData) => submitLead(formData), initialState);
  useEffect(() => { trackEvent("lead_started", { source: defaultClinic ? `clinic:${defaultClinic}` : "website" }); }, [defaultClinic]);
  useEffect(() => { if (state?.ok) { trackEvent("lead_submitted"); trackEvent("lead_confirmation_viewed"); } }, [state]);
  if (state?.ok) return <div className="rounded-[2rem] border border-success/20 bg-success/5 p-8 shadow-soft"><p className="eyebrow text-success">{t("successEyebrow")}</p><h2 className="mt-3 font-display text-3xl text-sapphire">{t("successTitle")}</h2><p className="mt-3 text-muted">{t("successDescription", { reference: state.reference })}</p></div>;
  const fieldClass = "mt-2 min-h-12 w-full rounded-xl border border-border bg-white px-4 text-ink transition duration-fast focus:border-sapphire focus:ring-2 focus:ring-champagne/40";
  const isEnglish = locale === "en";
  return <form action={action} className="rounded-[2rem] border border-border bg-white p-6 shadow-soft md:p-10"><input type="hidden" name="locale" value={locale} /><input type="hidden" name="source" value={defaultClinic ? `clinic:${defaultClinic}` : "website"} /><input type="hidden" name="clinic" value={defaultClinic || ""} /><div className="grid gap-7 md:grid-cols-2">
    <div><label htmlFor="specialty" className="text-sm font-semibold text-ink">{t("specialty")}</label><select id="specialty" name="specialty" defaultValue={defaultSpecialty || ""} className={fieldClass}><option value="">{t("chooseSpecialty")}</option>{publishedSpecialties.map((specialty) => <option key={specialty.slug} value={specialty.slug}>{specialty.name[locale as "es" | "en"]}</option>)}</select></div>
    <div><label htmlFor="name" className="text-sm font-semibold text-ink">{t("name")}</label><input id="name" name="name" autoComplete="name" className={fieldClass} /></div>
    <div><label htmlFor="phone" className="text-sm font-semibold text-ink">{t("phone")}</label><input id="phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} /></div>
    <div><label htmlFor="email" className="text-sm font-semibold text-ink">{t("email")}</label><input id="email" name="email" type="email" autoComplete="email" className={fieldClass} /></div>
    <div className="md:col-span-2"><label htmlFor="message" className="text-sm font-semibold text-ink">{t("message")}</label><textarea id="message" name="message" rows={4} placeholder={t("messagePlaceholder")} className={`${fieldClass} py-3`} /><p className="mt-2 text-xs text-muted">{t("messageHelp")}</p></div>
  </div><label className="mt-6 flex items-start gap-3 text-sm leading-6 text-muted"><input type="checkbox" name="companion" className="mt-1 size-4 accent-sapphire" />{t("companion")}</label><label className="mt-4 flex items-start gap-3 text-sm leading-6 text-muted"><input type="checkbox" name="consent" required className="mt-1 size-4 accent-sapphire" />{t("consent")}</label><input aria-hidden="true" tabIndex={-1} autoComplete="off" name="website" className="absolute -left-[9999px] h-px w-px" />{state && !state.ok && <p className="mt-4 text-sm text-danger" aria-live="polite">{t("error")}</p>}<div className="mt-8 flex flex-wrap items-center gap-5"><Button type="submit" disabled={pending}>{pending ? "…" : t("submit")}</Button><p className="text-sm text-muted">{isEnglish ? "An advisor will contact you after reviewing your request." : "Un asesor se pondrá en contacto contigo después de revisar tu solicitud."}</p></div></form>;
}
