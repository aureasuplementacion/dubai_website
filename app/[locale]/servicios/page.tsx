import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { CatalogBrowser } from "@/components/catalog/catalog-browser";

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("Services");
  return <main className="container-shell py-16"><Link className="text-sm text-sapphire" href={`/${locale}`}>← Aura Estética</Link><div className="mt-16 max-w-2xl"><p className="text-xs uppercase tracking-[.24em] text-champagne">Aura Estética</p><h1 className="mt-4 font-display text-5xl text-sapphire">{t("title")}</h1><p className="mt-4 text-lg leading-8 text-muted">{t("description")}</p></div><CatalogBrowser /></main>;
}
