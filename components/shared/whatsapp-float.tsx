"use client";
import { MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
export function WhatsappFloat() { const t = useTranslations("Home"); return <a href="https://wa.me/971500000000" target="_blank" rel="noreferrer" aria-label={t("secondaryCta")} className="fixed bottom-5 right-5 z-20 flex min-h-14 items-center gap-3 rounded-full bg-[#1f9d68] px-5 font-semibold text-white shadow-lg transition hover:-translate-y-1"><MessageCircle size={21} aria-hidden="true" /><span className="hidden sm:inline">WhatsApp</span></a>; }
