import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { specialties } from "@/lib/catalog/data";
import { getPublishedSpecialty, getPublishedSpecialtyService } from "@/lib/catalog/server-data";
import { ButtonLink } from "@/components/ui/button";
import { Status } from "@/components/ui/status";

export function generateStaticParams() {
  return specialties.flatMap((specialty) => specialty.services.map((service) => ({ slug: specialty.slug, serviceSlug: service.slug })));
}

export default async function TreatmentDetailPage({ params }: { params: Promise<{ locale: string; slug: string; serviceSlug: string }> }) {
  const { locale, slug, serviceSlug } = await params;
  const specialty = await getPublishedSpecialty(slug);
  const treatment = await getPublishedSpecialtyService(slug, serviceSlug);
  if (!specialty || !treatment) notFound();
  const t = await getTranslations("Specialties");
  const language = locale as "es" | "en";

  return <main className="container-shell py-16">
    <div className="flex flex-wrap items-center gap-2 text-sm text-muted"><Link href={`/${locale}/especialidades`} className="font-semibold text-sapphire hover:text-sapphire-dark">{locale === "en" ? "Specialties" : "Especialidades"}</Link><span aria-hidden="true">/</span><Link href={`/${locale}/especialidades/${specialty.slug}`} className="font-semibold text-sapphire hover:text-sapphire-dark">{specialty.name[language]}</Link><span aria-hidden="true">/</span><span>{treatment.name[language]}</span></div>
    <div className="mt-10 grid gap-12 md:grid-cols-[.8fr_1.2fr] md:items-start">
      <div className="reveal rounded-[2rem] bg-sapphire p-8 text-white shadow-soft md:sticky md:top-28 md:p-10"><p className="eyebrow eyebrow-on-dark">{specialty.name[language]}</p><h1 className="mt-5 font-display text-5xl leading-tight">{treatment.name[language]}</h1><p className="mt-6 leading-8 text-white/75">{treatment.description[language]}</p><ButtonLink className="mt-8 bg-white text-sapphire hover:bg-champagne-light" href={`/${locale}/reservar?specialty=${specialty.slug}`}>{t("talkToAdvisor")}</ButtonLink></div>
      <div><p className="eyebrow">{locale === "en" ? "What you can explore" : "Qué puedes explorar"}</p><p className="mt-4 max-w-2xl text-lg leading-8 text-muted">{locale === "en" ? "Understand the main options linked to this treatment before speaking with an advisor and the responsible clinical team." : "Conoce las principales opciones relacionadas con este tratamiento antes de hablar con un asesor y con el equipo clínico responsable."}</p><div className="mt-7 space-y-4">{treatment.options.map((item) => <article key={item.slug} className="rounded-[1.25rem] border border-border bg-white p-6 transition duration-base hover:shadow-soft"><div className="flex flex-wrap items-start justify-between gap-3"><h2 className="font-display text-2xl text-sapphire">{item.name[language]}</h2><Status tone="warning">{t("medicalAssessment")}</Status></div><p className="mt-3 leading-7 text-muted">{item.summary[language]}</p></article>)}</div><section className="mt-10 rounded-[1.25rem] bg-surface p-7"><h2 className="font-display text-2xl text-sapphire">{t("processTitle")}</h2><p className="mt-3 leading-7 text-muted">{t("processDescription")}</p></section></div>
    </div>
  </main>;
}
