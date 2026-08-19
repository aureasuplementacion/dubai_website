"use client";

import { useState } from "react";
import { BedDouble, Building2, CheckCircle2, ClipboardList, Plane, Stethoscope, Truck } from "lucide-react";

const steps = {
  es: [
    ["Primera conversación", "Un asesor entiende lo que quieres valorar y te explica qué información necesitas para empezar.", ClipboardList],
    ["Valoración y opciones", "Coordinamos la conversación con los centros disponibles; el equipo sanitario determina la indicación.", Stethoscope],
    ["Preparación del vuelo", "Ordenamos fechas, documentación, equipaje y horarios alrededor de la agenda confirmada.", Plane],
    ["Llegada y traslado", "Según la propuesta, un servicio puede recogerte en el aeropuerto y llevarte al hotel o al centro.", Truck],
    ["Hotel y estancia", "Presentamos alternativas de alojamiento por ubicación, categoría y duración, sujetas a disponibilidad.", BedDouble],
    ["Clínica y seguimiento", "El centro realiza la atención sanitaria y facilita las pautas de revisión y retorno acordadas.", Building2],
  ],
  en: [
    ["First conversation", "An advisor understands what you want to explore and explains what information you need to begin.", ClipboardList],
    ["Assessment and options", "We coordinate a conversation with available centres; the healthcare team decides suitability.", Stethoscope],
    ["Flight preparation", "We organise dates, documents, luggage and timings around the confirmed schedule.", Plane],
    ["Arrival and transfer", "Depending on the proposal, a service may collect you at the airport and take you to the hotel or centre.", Truck],
    ["Hotel and stay", "We present accommodation alternatives by location, category and duration, subject to availability.", BedDouble],
    ["Clinic and follow-up", "The centre provides healthcare and shares the agreed review and return guidance.", Building2],
  ],
} as const;

export function TravelTimeline({ locale }: { locale: string }) {
  const english = locale === "en";
  const items = steps[english ? "en" : "es"];
  const [active, setActive] = useState(0);
  const ActiveIcon = items[active][2];
  return <div className="mt-10 grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-start"><div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">{items.map(([title, , Icon], index) => <button key={title} type="button" onClick={() => setActive(index)} className={`group flex min-h-16 items-center gap-4 rounded-2xl border p-4 text-left transition ${active === index ? "border-sapphire bg-sapphire text-white shadow-soft" : "border-border bg-white text-sapphire hover:bg-surface"}`} aria-pressed={active === index}><span className={`grid size-10 shrink-0 place-items-center rounded-full ${active === index ? "bg-white/15" : "bg-champagne-light"}`}><Icon size={18} aria-hidden="true" /></span><span><span className="block text-xs font-bold uppercase tracking-[.16em] opacity-70">0{index + 1}</span><span className="mt-1 block font-semibold">{title}</span></span></button>)}</div><article className="min-h-[19rem] rounded-[2rem] bg-sapphire p-8 text-white shadow-soft md:p-10" aria-live="polite"><div className="grid size-14 place-items-center rounded-full bg-white/10"><ActiveIcon size={26} aria-hidden="true" /></div><p className="mt-8 text-sm font-bold uppercase tracking-[.18em] text-champagne-light">0{active + 1} / 0{items.length}</p><h3 className="mt-3 font-display text-4xl">{items[active][0]}</h3><p className="mt-5 max-w-xl text-lg leading-8 text-white/75">{items[active][1]}</p><div className="mt-8 flex items-center gap-2 text-sm text-white/60"><CheckCircle2 size={16} aria-hidden="true" />{english ? "Clear information at every stage" : "Información clara en cada etapa"}</div></article></div>;
}
