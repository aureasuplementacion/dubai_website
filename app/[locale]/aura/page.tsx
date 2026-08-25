import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";

const copy = {
  es: {
    eyebrow: "La forma Aura",
    title: "Seguridad, claridad y una experiencia bien coordinada.",
    intro: "Aura Estética nace para que valorar un tratamiento internacional resulte más sencillo. Te acompañamos desde España, coordinamos la parte práctica del viaje y te ponemos en contacto con el centro sanitario responsable.",
    blocks: [
      ["Qué hacemos", "Escuchamos qué estás buscando, resolvemos tus primeras dudas, facilitamos el contacto con centros seleccionados y coordinamos los elementos prácticos de tu viaje: fechas, alojamiento y transporte según la propuesta confirmada."],
      ["Qué decide el centro sanitario", "El hospital y su equipo médico realizan la valoración clínica, explican las alternativas, riesgos y requisitos, y deciden si un tratamiento es adecuado. El contrato sanitario, el procedimiento y el seguimiento médico corresponden al centro."],
      ["Qué significa coordinar tu viaje", "Aura puede organizar contigo la logística de desplazamiento y transporte, confirmar horarios y ayudarte a mantener toda la información ordenada. Cada servicio se confirma por escrito, con sus condiciones y proveedor responsable."],
      ["Una experiencia pensada para decidir bien", "No queremos que viajes con dudas. Por eso te explicamos el proceso, las inclusiones y los siguientes pasos con un asesor humano, sin sustituir nunca la conversación clínica que debes tener con el hospital."],
    ],
    dataTitle: "Privacidad y protección de datos",
    dataText: "Solo pedimos la información necesaria para responder a tu solicitud y coordinar el contacto y el viaje. No envíes diagnósticos, informes ni fotografías clínicas por el formulario, chatbot o canales sociales. Antes de compartir datos con el centro o proveedores recibirás la información sobre la finalidad, destinatarios, conservación y derechos.",
    legalTitle: "Información legal y límites de responsabilidad",
    legalText: "Aura es una empresa de intermediación y coordinación. No es un hospital, no presta asistencia sanitaria, no diagnostica, no indica tratamientos y no garantiza resultados clínicos. La asistencia, el tratamiento, la historia clínica, el consentimiento informado y el seguimiento médico pertenecen al centro sanitario contratado. Aura sí responde de sus propias obligaciones de información, coordinación, contratación y protección de datos.",
    cta: "Hablar con un asesor",
  },
  en: {
    eyebrow: "The Aura approach",
    title: "Confidence, clarity and a carefully coordinated experience.",
    intro: "Aura Estética makes exploring international treatment easier. We support you from Spain, coordinate the practical side of your journey and connect you with the responsible healthcare centre.",
    blocks: [
      ["What we do", "We listen to what you are looking for, answer your first questions, facilitate contact with selected centres and coordinate the practical elements of your journey: dates, accommodation and transport according to the confirmed proposal."],
      ["What the healthcare centre decides", "The hospital and its medical team assess your case, explain options, risks and requirements, and decide whether treatment is suitable. The healthcare contract, procedure and medical follow-up belong to the centre."],
      ["What coordinating your journey means", "Aura can organise the travel logistics and transport with you, confirm timings and help keep the information in order. Every service is confirmed in writing with its terms and responsible provider."],
      ["An experience designed for good decisions", "We do not want you to travel with unanswered questions. We explain the process, inclusions and next steps with a human advisor, while never replacing the clinical conversation you must have with the hospital."],
    ],
    dataTitle: "Privacy and data protection",
    dataText: "We only ask for the information needed to answer your request and coordinate contact and travel. Do not send diagnoses, reports or clinical photographs through the form, chatbot or social channels. Before sharing data with the centre or providers, you will receive information about purpose, recipients, retention and your rights.",
    legalTitle: "Legal information and responsibility limits",
    legalText: "Aura is a referral and coordination company. We are not a hospital, do not provide healthcare, diagnose, recommend treatment or guarantee clinical outcomes. Healthcare, treatment, medical records, informed consent and medical follow-up belong to the contracted healthcare centre. Aura remains responsible for its own information, coordination, contracting and data-protection obligations.",
    cta: "Talk to an advisor",
  },
} as const;

export default async function AuraPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const english = locale === "en";
  const c = copy[english ? "en" : "es"];
  return <main><section className="bg-deep text-white"><div className="container-shell grid gap-10 py-16 md:grid-cols-[.8fr_1.2fr] md:items-end md:py-24"><div><Link className="inline-flex min-h-11 items-center text-sm font-semibold text-white/70 hover:text-white" href={`/${locale}`}>← Aura Estética</Link><p className="eyebrow eyebrow-on-dark mt-14">{c.eyebrow}</p><h1 className="mt-4 max-w-3xl font-display text-6xl font-semibold leading-[.95] md:text-7xl">{c.title}</h1></div><p className="max-w-xl text-lg leading-8 text-white/70">{c.intro}</p></div></section><section className="container-shell py-16 md:py-24"><div className="grid gap-5 md:grid-cols-2">{c.blocks.map(([title, text]) => <article key={title} className="rounded-[1.75rem] border border-border bg-canvas p-7 shadow-soft md:p-9"><p className="eyebrow">Aura Estética</p><h2 className="mt-4 font-display text-3xl font-semibold text-sapphire">{title}</h2><p className="mt-4 leading-8 text-muted">{text}</p></article>)}</div><div className="mt-5 grid gap-5 md:grid-cols-2"><article className="rounded-[1.75rem] bg-surface p-7 md:p-9"><p className="eyebrow">{c.dataTitle}</p><p className="mt-4 leading-8 text-muted">{c.dataText}</p></article><article className="rounded-[1.75rem] bg-sapphire p-7 text-white md:p-9"><p className="eyebrow eyebrow-on-dark">{c.legalTitle}</p><p className="mt-4 leading-8 text-white/75">{c.legalText}</p></article></div><div className="mt-12 flex flex-wrap items-center justify-between gap-5 rounded-[2rem] border border-border bg-canvas p-7 md:p-9"><p className="max-w-2xl font-display text-3xl font-semibold text-sapphire">{english ? "Ready to take the next step with clarity?" : "¿Listo para dar el siguiente paso con claridad?"}</p><ButtonLink href={`/${locale}/reservar`}>{c.cta}</ButtonLink></div></section></main>;
}
