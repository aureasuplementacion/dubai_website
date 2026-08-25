import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { media } from "@/lib/media/registry";

const copy = {
  es: {
    title: "Una estancia coordinada para tu viaje",
    intro: "The G Hotels Istanbul es una opción de alojamiento que puede formar parte del itinerario confirmado. La disponibilidad, las condiciones y el precio se revisan por escrito antes de viajar.",
    services: ["Recepción y atención hotelera", "Opciones de restauración", "Espacios de bienestar", "Ubicación y fechas sujetas a disponibilidad"],
    note: "No publicamos tipos de habitación ni presentamos una categoría estándar como garantía de calidad. El alojamiento concreto se confirma según disponibilidad, necesidades del viaje y propuesta final.",
    cta: "Hablar con un asesor",
  },
  en: {
    title: "A stay coordinated around your journey",
    intro: "The G Hotels Istanbul is an accommodation option that may form part of the confirmed itinerary. Availability, conditions and price are reviewed in writing before travel.",
    services: ["Reception and hotel support", "Dining options", "Wellness spaces", "Location and dates subject to availability"],
    note: "We do not publish room types or present a standard category as a guarantee of quality. The specific accommodation is confirmed according to availability, journey needs and the final proposal.",
    cta: "Talk to an advisor",
  },
} as const;

export default async function AccommodationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const english = locale === "en";
  const c = copy[english ? "en" : "es"];
  return <main><section className="bg-surface"><div className="container-shell"><Link className="inline-flex min-h-11 pt-12 text-sm font-semibold text-sapphire" href={`/${locale}/como-funciona`}>← {english ? "Back to your journey" : "Volver a tu viaje"}</Link><div className="image-frame relative mt-10 min-h-[24rem] overflow-hidden shadow-soft md:min-h-[34rem]"><Image src={media.hotel.exterior.desktop} alt={media.hotel.exterior.alt[english ? "en" : "es"]} fill priority sizes="(max-width: 768px) 100vw, 1200px" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-deep/85 via-deep/10 to-transparent" /><div className="absolute bottom-8 left-8 right-8 text-white md:bottom-12 md:left-12 md:right-12"><p className="eyebrow eyebrow-on-dark">The G Hotels Istanbul</p><h1 className="mt-4 max-w-3xl font-display text-6xl font-semibold leading-[.95]">{c.title}</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">{c.intro}</p></div></div></div></section><section className="container-shell py-16 md:py-24"><section className="rounded-[1.75rem] border border-border bg-surface p-7 md:p-9"><p className="eyebrow">{english ? "Published hotel services" : "Servicios publicados del hotel"}</p><ul className="mt-5 grid gap-4 text-sm leading-6 text-muted md:grid-cols-2">{c.services.map((item) => <li key={item} className="border-t border-champagne pt-3">{item}</li>)}</ul></section><p className="mt-8 max-w-3xl text-sm leading-6 text-muted">{c.note}</p><ButtonLink className="mt-8" href={`/${locale}/reservar`}>{c.cta}</ButtonLink></section></main>;
}
