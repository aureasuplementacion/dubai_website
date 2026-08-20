import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { publishedSpecialties } from "@/lib/catalog/data";
import { getPublishedSpecialty } from "@/lib/catalog/server-data";
import { ButtonLink } from "@/components/ui/button";
import { Status } from "@/components/ui/status";

export function generateStaticParams() { return publishedSpecialties.map((specialty) => ({ slug: specialty.slug })); }

export default async function SpecialtyDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const specialty = await getPublishedSpecialty(slug);
  if (!specialty) notFound();
  const t = await getTranslations("Specialties");
  const language = locale as "es" | "en";
  const english = locale === "en";
  return <main className="container-shell py-16"><Link className="inline-flex min-h-11 items-center text-sm font-semibold text-sapphire" href={`/${locale}/especialidades`}>← {t("back")}</Link><div className="mt-12 grid gap-12 md:grid-cols-[.85fr_1.15fr] md:items-start"><div className="reveal rounded-[2rem] bg-sapphire p-8 text-white shadow-soft md:sticky md:top-28 md:p-10"><p className="eyebrow eyebrow-on-dark">Aura Estética</p><h1 className="mt-5 font-display text-5xl leading-tight">{specialty.name[language]}</h1><p className="mt-6 leading-8 text-white/75">{specialty.description[language]}</p><ButtonLink className="mt-8 bg-white text-sapphire hover:bg-champagne-light" href={`/${locale}/reservar?specialty=${specialty.slug}`}>{t("talkToAdvisor")}</ButtonLink></div><div><p className="eyebrow">{t("availableOptions")}</p><div className="mt-5 space-y-5">{specialty.services.map((service) => <article key={service.slug} className="rounded-[1.25rem] border border-border bg-white p-6 transition duration-base hover:shadow-soft"><div className="flex flex-wrap items-start justify-between gap-3"><h2 className="font-display text-2xl text-sapphire">{service.name[language]}</h2><Status tone="warning">{t("medicalAssessment")}</Status></div><p className="mt-3 leading-7 text-muted">{service.description[language]}</p><div className="mt-5 border-t border-border pt-5"><p className="text-xs font-bold uppercase tracking-[.16em] text-sapphire">{english ? "Specific options" : "Opciones específicas"}</p><div className="mt-3 space-y-3">{service.options.map((item) => <div key={item.slug} className="rounded-xl bg-surface p-4"><Link href={`/${locale}/especialidades/${specialty.slug}/${service.slug}`} className="font-semibold text-sapphire hover:text-sapphire-dark">{item.name[language]}</Link><p className="mt-1 text-sm leading-6 text-muted">{item.summary[language]}</p></div>)}</div></div></article>)}</div><section className="mt-12 rounded-[1.25rem] bg-surface p-7"><h2 className="font-display text-2xl text-sapphire">{t("processTitle")}</h2><p className="mt-3 leading-7 text-muted">{t("processDescription")}</p><ButtonLink className="mt-5" href={`/${locale}/como-funciona`}>{english ? "Start your journey" : "Empieza tu viaje"}</ButtonLink></section></div></div></main>;
}
