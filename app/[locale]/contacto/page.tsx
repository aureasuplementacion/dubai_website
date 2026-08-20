import Image from "next/image";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import { ButtonLink } from "@/components/ui/button";
import { media } from "@/lib/media/registry";
import { getWhatsAppUrl } from "@/lib/contact/whatsapp";
import { getTelegramUrl } from "@/lib/contact/telegram";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const currentLocale = await getLocale();
  const english = locale === "en";
  const copy = english ? { title: "A conversation should feel clear from the beginning.", description: "If you have a question or prefer to speak directly, send us a message and an advisor will guide the next step.", whatsapp: "Message us on WhatsApp" } : { title: "Una conversación debe sentirse clara desde el principio.", description: "Si tienes una pregunta o prefieres hablar directamente, escríbenos y un asesor te orientará sobre el siguiente paso.", whatsapp: "Escribir por WhatsApp" };
  const whatsapp = getWhatsAppUrl({ locale: currentLocale, source: "contact_page" });
  const telegram = !whatsapp ? getTelegramUrl({ locale: currentLocale, source: "contact_page" }) : null;
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

  return <main><section className="bg-surface"><div className="container-shell grid gap-10 py-16 md:grid-cols-[.85fr_1.15fr] md:items-center md:py-24"><div><Link className="inline-flex min-h-11 items-center text-sm font-semibold text-sapphire" href={`/${locale}`}>← Aura Estética</Link><p className="eyebrow mt-14">Aura Estética</p><h1 className="mt-4 max-w-2xl font-display text-6xl font-semibold leading-[.95] text-sapphire">{copy.title}</h1><p className="mt-6 max-w-xl text-lg leading-8 text-muted">{copy.description}</p></div><div className="image-frame relative min-h-[24rem] shadow-soft md:min-h-[32rem]"><Image src={media.trust.call.desktop} alt={media.trust.call.alt[english ? "en" : "es"]} fill priority sizes="(max-width: 768px) 100vw, 55vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-deep/75 to-transparent" /><p className="absolute bottom-7 left-7 font-display text-3xl font-semibold text-white">{english ? "Start with a human conversation." : "Empieza con una conversación humana."}</p></div></div></section><section className="container-shell py-16 md:py-24"><div className="grid gap-5 md:grid-cols-2">{(whatsapp || telegram) && <a href={whatsapp || telegram || "#"} target="_blank" rel="noreferrer" className="rounded-[1.75rem] bg-deep p-8 text-white shadow-soft transition hover:-translate-y-1"><p className="eyebrow eyebrow-on-dark">{whatsapp ? "WhatsApp" : "Telegram"}</p><p className="mt-4 font-display text-3xl font-semibold">{whatsapp ? copy.whatsapp : english ? "Message us on Telegram" : "Escribir por Telegram"}</p><p className="mt-3 text-sm leading-6 text-white/65">{english ? "A direct channel for your first questions." : "Un canal directo para tus primeras preguntas."}</p></a>}{contactEmail && <a href={`mailto:${contactEmail}`} className="rounded-[1.75rem] border border-border bg-canvas p-8 text-sapphire transition hover:-translate-y-1 hover:shadow-soft"><p className="eyebrow">Email</p><p className="mt-4 break-all font-display text-3xl font-semibold">{contactEmail}</p><p className="mt-3 text-sm leading-6 text-muted">{english ? "Send us the context you would like us to understand." : "Cuéntanos el contexto que te gustaría que entendiéramos."}</p></a>}</div><ButtonLink className="mt-10" href={`/${locale}/reservar`}>{english ? "Request a call" : "Solicitar una llamada"}</ButtonLink></section></main>;
}
