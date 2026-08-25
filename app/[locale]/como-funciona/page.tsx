import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { media } from "@/lib/media/registry";

const copy = {
  es: {
    eyebrow: "Tu proceso, paso a paso",
    title: "Información clara antes de decidir.",
    intro: "Aura Estética facilita una primera conversación y el contacto con centros sanitarios y proveedores independientes en Turquía. No presta asistencia médica ni vende paquetes de viaje.",
    steps: [
      ["01", "Cuéntanos tu área de interés", "Indicas qué especialidad quieres conocer, sin enviar diagnósticos, informes, fotografías ni otra información clínica sensible.", "/images/journey/journey-arrival.webp"],
      ["02", "Te explicamos el siguiente paso", "Un asesor de Aura resuelve dudas generales y te explica cómo funciona el contacto con el proveedor correspondiente.", "/images/journey/journey-hospital.webp"],
      ["03", "Contacto con el proveedor", "Si procede, facilitamos tus datos mínimos de contacto al centro o proveedor independiente, con la información previa correspondiente.", media.trust.documents.desktop],
      ["04", "Contratación directa", "Cualquier tratamiento, alojamiento, transporte o vuelo se contrata directamente con el proveedor responsable, según sus propias condiciones.", "/images/journey/journey-flight.webp"],
      ["05", "El equipo sanitario decide", "El centro sanitario realiza su propia valoración y decide la idoneidad, el plan, los riesgos y el seguimiento clínico.", media.transport.airport.desktop],
      ["06", "Proveedores independientes", "Hotel, transporte y asistencia sanitaria son servicios independientes de Aura. Su disponibilidad, precio y condiciones los confirma cada proveedor.", media.hotel.exterior.desktop],
      ["07", "Información posterior", "Aura puede ayudarte a mantener el canal de contacto, pero no presta seguimiento médico ni responde de la asistencia del centro.", "/images/journey/journey-return.webp"],
    ],
    note: "Aura no diagnostica, no recomienda tratamientos, no garantiza resultados y no responde de los servicios prestados por terceros.",
    cta: "Solicitar contacto",
  },
  en: {
    eyebrow: "Your process, step by step",
    title: "Clear information before you decide.",
    intro: "Aura Estética facilitates an initial conversation and contact with independent healthcare centres and providers in Türkiye. We do not provide healthcare or sell travel packages.",
    steps: [
      ["01", "Tell us your area of interest", "Choose the specialty you would like to explore without sending diagnoses, reports, photographs or other sensitive clinical information.", "/images/journey/journey-arrival.webp"],
      ["02", "We explain the next step", "An Aura advisor answers general questions and explains how contact with the relevant provider works.", "/images/journey/journey-hospital.webp"],
      ["03", "Contact the provider", "Where appropriate, we facilitate sharing your minimum contact details with the independent centre or provider, with the relevant information provided in advance.", media.trust.documents.desktop],
      ["04", "Contract directly", "Any treatment, accommodation, transport or flight is contracted directly with the responsible provider under its own terms.", "/images/journey/journey-flight.webp"],
      ["05", "The healthcare team decides", "The centre performs its own assessment and decides suitability, planning, risks and clinical follow-up.", media.transport.airport.desktop],
      ["06", "Independent providers", "Hotel, transport and healthcare are services independent from Aura. Each provider confirms its own availability, price and terms.", media.hotel.exterior.desktop],
      ["07", "Information afterwards", "Aura may help you keep the contact channel open, but does not provide medical follow-up or the centre's healthcare.", "/images/journey/journey-return.webp"],
    ],
    note: "Aura does not diagnose, recommend treatment, guarantee outcomes or provide third-party services.",
    cta: "Request contact",
  },
} as const;

export default async function ProcessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const english = locale === "en";
  const c = copy[english ? "en" : "es"];
  return <main><section className="bg-deep text-white"><div className="container-shell grid gap-10 py-16 md:grid-cols-[.9fr_1.1fr] md:items-end md:py-24"><div><Link className="inline-flex min-h-11 items-center text-sm font-semibold text-white/70 hover:text-white" href={`/${locale}`}>← Aura Estética</Link><p className="eyebrow eyebrow-on-dark mt-14">{c.eyebrow}</p><h1 className="mt-4 max-w-3xl font-display text-6xl font-semibold leading-[.95] md:text-7xl">{c.title}</h1></div><p className="max-w-xl text-lg leading-8 text-white/70">{c.intro}</p></div></section><section className="container-shell py-16 md:py-24"><div className="space-y-5">{c.steps.map(([number, title, text, image], index) => <article key={number} className="grid overflow-hidden rounded-[2rem] border border-border bg-canvas shadow-soft md:grid-cols-[.86fr_1.14fr]"><div className={`relative min-h-[15rem] md:min-h-[20rem] ${index % 2 ? "md:order-2" : ""}`}><Image src={image} alt="" fill sizes="(max-width: 768px) 100vw, 45vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-deep/65 to-transparent" /><span className="absolute left-6 top-6 grid size-11 place-items-center rounded-full border border-white/30 bg-deep/20 text-xs font-bold text-white backdrop-blur">{number}</span></div><div className="flex flex-col justify-center p-7 md:p-10"><p className="eyebrow">{english ? "Process stage" : "Etapa del proceso"}</p><h2 className="mt-3 font-display text-4xl font-semibold leading-none text-sapphire">{title}</h2><p className="mt-4 max-w-xl leading-8 text-muted">{text}</p></div></article>)}</div><div className="mt-12 grid gap-5 md:grid-cols-3"><Link href={`/${locale}/como-funciona/alojamiento`} className="rounded-[1.75rem] border border-border bg-surface p-7 transition hover:-translate-y-1 hover:shadow-soft"><p className="eyebrow">{english ? "Independent provider" : "Proveedor independiente"}</p><h2 className="mt-3 font-display text-3xl font-semibold text-sapphire">The G Hotels Istanbul</h2><p className="mt-3 text-sm leading-6 text-muted">{english ? "Published hotel information. Contracting and conditions belong to the hotel or responsible agency." : "Información publicada del hotel. La contratación y las condiciones corresponden al hotel o agencia responsable."}</p></Link><Link href={`/${locale}/como-funciona/transporte`} className="rounded-[1.75rem] border border-border bg-surface p-7 transition hover:-translate-y-1 hover:shadow-soft"><p className="eyebrow">{english ? "Independent provider" : "Proveedor independiente"}</p><h2 className="mt-3 font-display text-3xl font-semibold text-sapphire">{english ? "Transport information" : "Información de transporte"}</h2><p className="mt-3 text-sm leading-6 text-muted">{english ? "A transfer option may be available directly from the responsible provider." : "El proveedor responsable puede ofrecer una opción de traslado directamente."}</p></Link><Link href={`/${locale}/clinicas/bht-clinic`} className="rounded-[1.75rem] border border-border bg-surface p-7 transition hover:-translate-y-1 hover:shadow-soft"><p className="eyebrow">{english ? "Healthcare provider" : "Proveedor sanitario"}</p><h2 className="mt-3 font-display text-3xl font-semibold text-sapphire">BHT CLINIC</h2><p className="mt-3 text-sm leading-6 text-muted">{english ? "Published centre information. Healthcare is provided by the centre, not Aura." : "Información publicada del centro. La asistencia la presta el centro, no Aura."}</p></Link></div><p className="mt-8 text-sm leading-6 text-muted">{c.note}</p><ButtonLink className="mt-8" href={`/${locale}/reservar`}>{c.cta}</ButtonLink></section></main>;
}
