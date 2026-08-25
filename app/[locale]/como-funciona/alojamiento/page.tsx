import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { media } from "@/lib/media/registry";

const copy = {
  es: {
    title: "Información de alojamiento",
    intro: "The G Hotels Istanbul es un proveedor de alojamiento independiente que puede ser presentado como referencia. Aura no reserva, cobra ni garantiza este servicio.",
    services: ["Recepción y atención hotelera según el proveedor", "Opciones de restauración del establecimiento", "Espacios de bienestar sujetos a disponibilidad", "Ubicación, fechas, precio y condiciones confirmados directamente por el proveedor"],
    note: "No publicamos tipos de habitación ni presentamos una categoría estándar como garantía de calidad. Cualquier reserva o contratación se realiza directamente con el hotel o con la agencia autorizada responsable.",
    cta: "Solicitar información general",
  },
  en: {
    title: "Accommodation information",
    intro: "The G Hotels Istanbul is an independent accommodation provider that may be presented as a reference. Aura does not book, charge for or guarantee this service.",
    services: ["Reception and hotel support according to the provider", "Dining options at the property", "Wellness spaces subject to availability", "Location, dates, price and terms confirmed directly by the provider"],
    note: "We do not publish room types or present a standard category as a guarantee of quality. Any booking or contracting takes place directly with the hotel or the responsible authorised agency.",
    cta: "Request general information",
  },
} as const;

export default async function AccommodationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const english = locale === "en";
  const c = copy[english ? "en" : "es"];
  return <main><section className="bg-surface"><div className="container-shell"><Link className="inline-flex min-h-11 pt-12 text-sm font-semibold text-sapphire" href={`/${locale}/como-funciona`}>← {english ? "Back to the process" : "Volver al proceso"}</Link><div className="image-frame relative mt-10 min-h-[24rem] overflow-hidden shadow-soft md:min-h-[34rem]"><Image src={media.hotel.exterior.desktop} alt={media.hotel.exterior.alt[english ? "en" : "es"]} fill priority sizes="(max-width: 768px) 100vw, 1200px" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-deep/85 via-deep/10 to-transparent" /><div className="absolute bottom-8 left-8 right-8 text-white md:bottom-12 md:left-12 md:right-12"><p className="eyebrow eyebrow-on-dark">The G Hotels Istanbul</p><h1 className="mt-4 max-w-3xl font-display text-6xl font-semibold leading-[.95]">{c.title}</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">{c.intro}</p></div></div></div></section><section className="container-shell py-16 md:py-24"><section className="rounded-[1.75rem] border border-border bg-surface p-7 md:p-9"><p className="eyebrow">{english ? "Published hotel information" : "Información publicada del hotel"}</p><ul className="mt-5 grid gap-4 text-sm leading-6 text-muted md:grid-cols-2">{c.services.map((item) => <li key={item} className="border-t border-champagne pt-3">{item}</li>)}</ul></section><p className="mt-8 max-w-3xl text-sm leading-6 text-muted">{c.note}</p><ButtonLink className="mt-8" href={`/${locale}/reservar`}>{c.cta}</ButtonLink></section></main>;
}
