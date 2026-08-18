import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { BookingForm } from "@/components/booking/booking-form";
import { getService } from "@/lib/catalog/data";

export default async function BookingPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ service?: string }> }) {
  const { locale } = await params;
  const { service: serviceSlug } = await searchParams;
  const t = await getTranslations("Booking");
  const service = serviceSlug ? getService(serviceSlug) : undefined;
  return <main className="container-shell py-16"><Link className="text-sm text-sapphire" href={`/${locale}/servicios`}>← {t("backHome")}</Link><div className="mt-14 grid gap-12 md:grid-cols-[.7fr_1.3fr] md:items-start"><div><p className="text-xs uppercase tracking-[.24em] text-champagne">{t("eyebrow")}</p><h1 className="mt-4 font-display text-5xl leading-tight text-sapphire">{t("title")}</h1><p className="mt-5 text-lg leading-8 text-muted">{t("description")}</p>{service && <div className="mt-8 rounded-2xl bg-champagne-light p-5"><p className="text-xs uppercase tracking-wider text-champagne">{t("service")}</p><p className="mt-2 font-display text-2xl text-sapphire">{service.name[locale as "es" | "en"]}</p></div>}</div><BookingForm defaultService={service?.slug} /></div></main>;
}
