"use client";
import Link from "next/link";
import { useLocale } from "next-intl";
export function LanguageSwitcher() { const locale = useLocale(); const nextLocale = locale === "es" ? "en" : "es"; return <Link href={`/${nextLocale}`} className="fixed left-5 top-5 z-30 rounded-full border border-border bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-wider text-sapphire shadow-sm backdrop-blur" aria-label={locale === "es" ? "Switch to English" : "Cambiar a español"}>{nextLocale}</Link>; }
