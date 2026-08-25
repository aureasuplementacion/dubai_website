import Image from "next/image";
import { media } from "@/lib/media/registry";

const testimonials = {
  es: [
    { quote: "Desde la primera conversación entendí qué información necesitaba y cuáles eran los siguientes pasos.", name: "Nombre de ejemplo", detail: "Ejemplo temporal · No es un testimonio real", image: media.trust.call },
    { quote: "Me ayudó tener una persona de contacto para entender las opciones y hablar con el centro.", name: "Nombre de ejemplo", detail: "Ejemplo temporal · No es un testimonio real", image: media.trust.documents },
    { quote: "La información estaba explicada con calma y pude decidir sin sentir presión.", name: "Nombre de ejemplo", detail: "Ejemplo temporal · No es un testimonio real", image: media.partners.team },
  ],
  en: [
    { quote: "From the first conversation, I understood what information I needed and what the next steps were.", name: "Example name", detail: "Temporary example · Not a real patient testimonial", image: media.trust.call },
    { quote: "Having one contact person made it easier to understand the options and speak with the centre.", name: "Example name", detail: "Temporary example · Not a real patient testimonial", image: media.trust.documents },
    { quote: "The information was explained calmly, so I could decide without feeling pressured.", name: "Example name", detail: "Temporary example · Not a real patient testimonial", image: media.partners.team },
  ],
} as const;

export function Testimonials({ locale }: { locale: string }) {
  const english = locale === "en";
  const items = testimonials[english ? "en" : "es"];
  return <section className="bg-canvas py-24" aria-labelledby="testimonials-title"><div className="container-shell"><div className="max-w-2xl"><p className="eyebrow">{english ? "Patient perspective" : "La perspectiva del paciente"}</p><h2 id="testimonials-title" className="mt-4 font-display text-5xl font-semibold leading-[.98] text-sapphire">{english ? "Stories will live here when they are real." : "Aquí irán las historias cuando sean reales."}</h2><p className="mt-5 text-lg leading-8 text-muted">{english ? "These are temporary examples to define the section. They will be replaced by approved patient testimonials before publication." : "Estos son ejemplos provisionales para definir la sección. Se sustituirán por testimonios reales aprobados antes de publicar."}</p></div><div className="mt-10 grid gap-5 md:grid-cols-3">{items.map((item) => <article key={item.quote} className="overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-soft"><div className="relative h-48"><Image src={item.image.desktop} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" /></div><div className="p-7"><p className="font-display text-2xl leading-tight text-sapphire">“{item.quote}”</p><p className="mt-6 text-sm font-semibold text-sapphire">{item.name}</p><p className="mt-1 text-xs leading-5 text-muted">{item.detail}</p></div></article>)}</div></div></section>;
}
