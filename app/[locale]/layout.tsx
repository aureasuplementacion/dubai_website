import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/config";
import { WhatsappFloat } from "@/components/shared/whatsapp-float";
import { PublicHeader } from "@/components/shared/public-header";
import { PublicFooter } from "@/components/shared/public-footer";
import { MobileStickyCta } from "@/components/shared/mobile-sticky-cta";
import { SiteChatbot } from "@/components/shared/site-chatbot";
import "../globals.css";
export function generateStaticParams() { return locales.map((locale) => ({ locale })); }
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> { const { locale } = await params; const t = await getTranslations({ locale, namespace: "Metadata" }); return { title: t("title"), description: t("description") }; }
export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) { const { locale } = await params; if (!locales.includes(locale as Locale)) notFound(); return <NextIntlClientProvider locale={locale} messages={await getMessages()}><PublicHeader locale={locale} />{children}<PublicFooter locale={locale} /><MobileStickyCta locale={locale} /><WhatsappFloat /><SiteChatbot locale={locale} /></NextIntlClientProvider>; }
