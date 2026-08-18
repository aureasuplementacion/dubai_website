import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getService, services } from "@/lib/catalog/data";

export function generateStaticParams() { return services.map((service) => ({ slug: service.slug })); }

export default async function ServiceDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const language = locale as "es" | "en";
  const t = await getTranslations("ServiceDetail");
  return <main className="container-shell py-16"><Link className="text-sm text-sapphire" href={`/${locale}/servicios`}>← {t("back")}</Link><div className="mt-12 grid gap-12 md:grid-cols-[.9fr_1.1fr] md:items-center"><div className="min-h-[420px] rounded-[2rem] bg-gradient-to-br from-champagne-light via-surface to-sapphire p-8"><div className="flex h-full min-h-[350px] items-end rounded-[1.5rem] border border-white/60 p-6"><p className="font-display text-3xl text-sapphire">Aura<br />Estética</p></div></div><div><p className="text-xs uppercase tracking-[.24em] text-champagne">{service.categoryLabel[language]}</p><h1 className="mt-4 font-display text-5xl leading-tight text-sapphire">{service.name[language]}</h1><p className="mt-6 text-lg leading-8 text-muted">{service.description[language]}</p><div className="mt-8 flex flex-wrap gap-3"><span className="rounded-full bg-champagne-light px-4 py-2 text-sm text-sapphire">{t("duration", { count: service.duration })}</span><span className="rounded-full bg-champagne-light px-4 py-2 text-sm text-sapphire">{t("referencePrice", { price: new Intl.NumberFormat(language, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(service.price) })}</span></div><Link className="mt-9 inline-flex min-h-12 items-center rounded-full bg-sapphire px-7 font-semibold text-white shadow-soft" href={`/${locale}/reservar?service=${service.slug}`}>{t("book")}</Link></div></div><section className="mt-20 border-t border-border pt-12"><h2 className="font-display text-3xl text-sapphire">{t("benefitsTitle")}</h2><ul className="mt-7 grid gap-4 md:grid-cols-3">{service.benefits[language].map((benefit) => <li key={benefit} className="rounded-2xl bg-surface p-5 text-muted">✓ {benefit}</li>)}</ul></section></main>;
}
