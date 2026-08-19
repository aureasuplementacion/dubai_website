"use client";

import { MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export function WhatsappFloat() {
  const t = useTranslations("Home");
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  if (!number) return null;
  return <a href={`https://wa.me/${number.replace(/[^\d]/g, "")}`} target="_blank" rel="noreferrer" aria-label={t("secondaryCta")} className="fixed bottom-5 right-5 z-30 flex min-h-14 items-center gap-3 rounded-full bg-success px-5 font-semibold text-white shadow-lg transition duration-base hover:-translate-y-1 sm:bottom-5"><MessageCircle size={21} aria-hidden="true" /><span className="hidden sm:inline">WhatsApp</span></a>;
}
