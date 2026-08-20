"use client";

import { MessageCircle, Send } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { trackEvent } from "@/lib/analytics/events";
import { getTelegramUrl } from "@/lib/contact/telegram";
import { getWhatsAppUrl } from "@/lib/contact/whatsapp";

export function WhatsappFloat() {
  const t = useTranslations("Home");
  const locale = useLocale();
  const whatsappUrl = getWhatsAppUrl({ locale, source: "floating_button" });
  const telegramUrl = getTelegramUrl({ locale, source: "floating_button" });
  const channel = whatsappUrl ? "whatsapp" : telegramUrl ? "telegram" : null;
  const url = whatsappUrl || telegramUrl;
  if (!url || !channel) return null;

  return <a href={url} onClick={() => trackEvent(channel === "whatsapp" ? "whatsapp_clicked" : "telegram_clicked", { source: "floating_button" })} target="_blank" rel="noreferrer" aria-label={channel === "whatsapp" ? t("secondaryCta") : "Telegram"} className="fixed bottom-5 right-5 z-30 flex min-h-14 items-center gap-3 rounded-full bg-success px-5 font-semibold text-white shadow-lg transition duration-base hover:-translate-y-1 sm:bottom-5">{channel === "whatsapp" ? <MessageCircle size={21} aria-hidden="true" /> : <Send size={21} aria-hidden="true" />}<span className="hidden sm:inline">{channel === "whatsapp" ? "WhatsApp" : "Telegram"}</span></a>;
}
