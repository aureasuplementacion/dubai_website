import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { BookingForm } from "@/components/booking/booking-form";
import { getSpecialty } from "@/lib/catalog/data";
import { getClinic } from "@/lib/clinics/data";

export default async function LeadPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ specialty?: string; clinic?: string }> }) {
  const { locale } = await params;
  const { specialty: specialtySlug, clinic: clinicSlug } = await searchParams;
  const t = await getTranslations("Lead");
  const specialty = specialtySlug ? getSpecialty(specialtySlug) : undefined;
  const clinic = clinicSlug ? getClinic(clinicSlug) : undefined;
  return <main className="container-shell py-16"><Link className="inline-flex min-h-11 items-center text-sm font-semibold text-sapphire" href={`/${locale}`}>← {t("backHome")}</Link><div className="mt-12 grid gap-12 md:grid-cols-[.7fr_1.3fr] md:items-start"><div className="reveal"><p className="eyebrow">{t("eyebrow")}</p><h1 className="mt-4 font-display text-5xl leading-tight text-sapphire">{t("title")}</h1><p className="mt-5 text-lg leading-8 text-muted">{t("description")}</p>{specialty && <div className="mt-8 rounded-[1.25rem] bg-champagne-light p-5"><p className="eyebrow">{t("selectedSpecialty")}</p><p className="mt-2 font-display text-2xl text-sapphire">{specialty.name[locale as "es" | "en"]}</p></div>}{clinic && <div className="mt-4 rounded-[1.25rem] bg-champagne-light p-5"><p className="eyebrow">{locale === "en" ? "Selected clinic" : "Clínica seleccionada"}</p><p className="mt-2 font-display text-2xl text-sapphire">{clinic.name}</p></div>}<div className="mt-8 rounded-[1.25rem] border border-border bg-surface p-5 text-sm leading-6 text-muted">{t("privacyNote")}</div></div><BookingForm defaultSpecialty={specialty?.slug} defaultClinic={clinic?.slug} /></div></main>;
}
