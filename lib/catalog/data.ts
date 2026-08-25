export type Locale = "es" | "en";
export type ContentStatus = "draft" | "review" | "verified" | "published" | "archived";

export type SpecialtyOption = {
  slug: string;
  name: Record<Locale, string>;
  summary: Record<Locale, string>;
};

export type SpecialtyService = {
  slug: string;
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  options: SpecialtyOption[];
};

export type Specialty = {
  slug: string;
  name: Record<Locale, string>;
  shortDescription: Record<Locale, string>;
  description: Record<Locale, string>;
  services: SpecialtyService[];
};

const option = (slug: string, es: string, en: string, summaryEs: string, summaryEn: string): SpecialtyOption => ({ slug, name: { es, en }, summary: { es: summaryEs, en: summaryEn } });

export const specialties: Specialty[] = [
  {
    slug: "capilar",
    name: { es: "Capilar y cuero cabelludo", en: "Hair and scalp" },
    shortDescription: { es: "Restauración capilar para cabello, barba y cejas, con valoración profesional.", en: "Hair restoration for scalp, beard and eyebrows, with professional assessment." },
    description: { es: "Información y coordinación para explorar opciones capilares, conocer el proceso y preparar una conversación con el equipo clínico.", en: "Information and coordination to explore hair options, understand the process and prepare a conversation with the clinical team." },
    services: [
      { slug: "trasplante-capilar", name: { es: "Trasplante capilar", en: "Hair transplant" }, description: { es: "Opciones de restauración capilar sujetas a diagnóstico, diseño y valoración médica.", en: "Hair restoration options subject to diagnosis, design and medical assessment." }, options: [option("fue", "Técnica FUE", "FUE technique", "Información general sobre extracción e implantación folicular.", "General information about follicular extraction and implantation."), option("zafiro", "FUE zafiro", "Sapphire FUE", "Variante técnica que puede ofrecer el centro según valoración.", "A technical variant that may be offered after assessment."), option("dhi", "Implantación DHI", "DHI implantation", "Alternativa de implantación que debe valorar el equipo clínico.", "An implantation option to be assessed by the clinical team.")] },
      { slug: "trasplante-barba-cejas", name: { es: "Trasplante de barba y cejas", en: "Beard and eyebrow transplant" }, description: { es: "Restauración localizada para barba o cejas cuando el centro la ofrezca.", en: "Localised restoration for beard or eyebrows when offered by the clinic." }, options: [option("barba", "Restauración de barba", "Beard restoration", "Diseño y valoración de la zona a tratar.", "Design and assessment of the area to be treated."), option("cejas", "Restauración de cejas", "Eyebrow restoration", "Información sobre densidad, diseño y expectativas realistas.", "Information about density, design and realistic expectations.")] },
      { slug: "tratamientos-cuero-cabelludo", name: { es: "Cuidados del cuero cabelludo", en: "Scalp care" }, description: { es: "Opciones no quirúrgicas que pueden estar disponibles según el centro.", en: "Non-surgical options that may be available depending on the clinic." }, options: [option("prp-capilar", "PRP capilar", "Hair PRP", "Tratamiento sujeto a indicación y valoración profesional.", "Treatment subject to clinical indication and assessment."), option("mesoterapia-capilar", "Mesoterapia capilar", "Hair mesotherapy", "Información sobre alternativas ofrecidas por el centro.", "Information about alternatives offered by the clinic.")] },
    ],
  },
  {
    slug: "odontologia",
    name: { es: "Odontología", en: "Dentistry" },
    shortDescription: { es: "Tratamientos dentales coordinados con clínicas especializadas.", en: "Dental treatments coordinated with specialised clinics." },
    description: { es: "Desde una primera valoración hasta rehabilitaciones por fases, con información clara sobre pruebas, tiempos y seguimiento.", en: "From an initial assessment to phased rehabilitation, with clear information about tests, timelines and follow-up." },
    services: [
      { slug: "implantes-rehabilitacion", name: { es: "Implantes y rehabilitación dental", en: "Implants and dental rehabilitation" }, description: { es: "Soluciones dentales por fases después de un diagnóstico completo.", en: "Phased dental solutions after a complete diagnosis." }, options: [option("implantes", "Implantes dentales", "Dental implants", "Información sobre el proceso de valoración y planificación.", "Information about assessment and planning."), option("all-on-4", "Rehabilitación All-on-4 / All-on-6", "All-on-4 / All-on-6 rehabilitation", "Alternativas de rehabilitación completa sujetas a estudio.", "Full rehabilitation alternatives subject to assessment.")] },
      { slug: "estetica-dental", name: { es: "Estética dental", en: "Cosmetic dentistry" }, description: { es: "Opciones estéticas según la valoración odontológica y la salud oral.", en: "Aesthetic options according to dental assessment and oral health." }, options: [option("carillas", "Carillas dentales", "Dental veneers", "Información sobre materiales, diseño y proceso clínico.", "Information about materials, design and clinical process."), option("coronas", "Coronas y puentes", "Crowns and bridges", "Alternativas restauradoras que requieren estudio individual.", "Restorative alternatives requiring individual assessment."), option("blanqueamiento", "Blanqueamiento dental", "Teeth whitening", "Tratamiento sujeto a revisión del estado dental.", "Treatment subject to review of dental health.")] },
      { slug: "ortodoncia", name: { es: "Ortodoncia y alineación", en: "Orthodontics and alignment" }, description: { es: "Opciones para alinear la sonrisa con seguimiento profesional.", en: "Options to align the smile with professional follow-up." }, options: [option("alineadores", "Alineadores transparentes", "Clear aligners", "Planificación digital y seguimiento según el caso.", "Digital planning and follow-up according to the case."), option("ortodoncia-fija", "Ortodoncia fija", "Fixed orthodontics", "Alternativas convencionales valoradas por el especialista.", "Conventional alternatives assessed by the specialist.")] },
    ],
  },
  {
    slug: "estetica",
    name: { es: "Cirugía estética y corporal", en: "Aesthetic and body surgery" },
    shortDescription: { es: "Información y coordinación para decisiones estéticas importantes.", en: "Information and coordination for important aesthetic decisions." },
    description: { es: "Conoce opciones quirúrgicas, preparación, estancia y seguimiento antes de tomar una decisión.", en: "Learn about surgical options, preparation, stay and follow-up before making a decision." },
    services: [
      { slug: "cirugia-facial", name: { es: "Cirugía facial", en: "Facial surgery" }, description: { es: "Procedimientos faciales sujetos a exploración y valoración del cirujano.", en: "Facial procedures subject to examination and surgeon assessment." }, options: [option("rinoplastia", "Rinoplastia", "Rhinoplasty", "Información sobre la consulta y planificación quirúrgica.", "Information about consultation and surgical planning."), option("blefaroplastia", "Blefaroplastia", "Blepharoplasty", "Valoración de párpados y área periocular.", "Assessment of the eyelids and periocular area."), option("lifting-facial", "Lifting facial", "Facelift", "Opciones de rejuvenecimiento facial quirúrgico.", "Surgical facial rejuvenation options.")] },
      { slug: "cirugia-corporal", name: { es: "Cirugía corporal", en: "Body surgery" }, description: { es: "Opciones de remodelación corporal que requieren estudio clínico y plan de recuperación.", en: "Body contouring options requiring clinical assessment and a recovery plan." }, options: [option("liposuccion", "Liposucción", "Liposuction", "Información sobre remodelación corporal y recuperación.", "Information about body contouring and recovery."), option("abdominoplastia", "Abdominoplastia", "Abdominoplasty", "Valoración de abdomen, cicatrices y recuperación.", "Assessment of the abdomen, scarring and recovery."), option("lifting-corporal", "Lifting corporal", "Body lift", "Alternativas para exceso de piel según valoración.", "Options for excess skin subject to assessment.")] },
      { slug: "cirugia-mamaria", name: { es: "Cirugía mamaria", en: "Breast surgery" }, description: { es: "Aumento, reducción o elevación cuando el equipo médico lo considere adecuado.", en: "Augmentation, reduction or lift when considered appropriate by the medical team." }, options: [option("aumento-mamario", "Aumento mamario", "Breast augmentation", "Información sobre consulta, opciones y seguimiento.", "Information about consultation, options and follow-up."), option("reduccion-mamaria", "Reducción mamaria", "Breast reduction", "Valoración individual de objetivos y recuperación.", "Individual assessment of goals and recovery."), option("mastopexia", "Elevación mamaria", "Mastopexy", "Alternativa quirúrgica sujeta a estudio.", "Surgical option subject to assessment.")] },
    ],
  },
  {
    slug: "medicina-estetica",
    name: { es: "Medicina estética", en: "Aesthetic medicine" },
    shortDescription: { es: "Tratamientos ambulatorios para piel, rostro y armonización facial.", en: "Outpatient treatments for skin, face and facial harmonisation." },
    description: { es: "Explora opciones no quirúrgicas y conoce qué preguntas hacer antes de una valoración profesional.", en: "Explore non-surgical options and learn what to ask before a professional assessment." },
    services: [
      { slug: "armonizacion-facial", name: { es: "Armonización facial", en: "Facial harmonisation" }, description: { es: "Opciones inyectables y de contorno facial siempre sujetas a valoración.", en: "Injectable and facial contouring options always subject to assessment." }, options: [option("acido-hialuronico", "Ácido hialurónico", "Hyaluronic acid", "Información sobre usos estéticos y valoración de indicación.", "Information about aesthetic uses and suitability assessment."), option("toxina-botulinica", "Toxina botulínica", "Botulinum toxin", "Tratamiento que debe realizar un profesional cualificado.", "Treatment that must be performed by a qualified professional.")] },
      { slug: "calidad-cutanea", name: { es: "Calidad cutánea", en: "Skin quality" }, description: { es: "Opciones para textura, hidratación y aspecto de la piel según valoración.", en: "Options for skin texture, hydration and appearance after assessment." }, options: [option("peelings", "Peelings químicos", "Chemical peels", "Alternativas según tipo de piel y objetivo clínico.", "Options according to skin type and clinical goal."), option("microneedling", "Microneedling", "Microneedling", "Información sobre renovación cutánea y cuidados posteriores.", "Information about skin renewal and aftercare."), option("prp-facial", "PRP facial", "Facial PRP", "Tratamiento sujeto a indicación profesional.", "Treatment subject to professional indication.")] },
      { slug: "laser-piel", name: { es: "Láser y tecnologías de piel", en: "Laser and skin technologies" }, description: { es: "Tecnologías para manchas, cicatrices o textura que requieren valoración dermatológica.", en: "Technologies for pigmentation, scarring or texture requiring dermatological assessment." }, options: [option("laser-fraccionado", "Láser fraccionado", "Fractional laser", "Información sobre indicaciones y recuperación esperada.", "Information about indications and expected recovery."), option("tratamiento-manchas", "Tratamiento de manchas", "Pigmentation treatment", "Opciones que dependen del diagnóstico de la lesión.", "Options depending on diagnosis of the lesion.")] },
    ],
  },
  {
    slug: "bariatrica",
    name: { es: "Bariátrica y metabolismo", en: "Bariatric and metabolic care" },
    shortDescription: { es: "Un proceso de salud que empieza antes de viajar.", en: "A healthcare process that starts before you travel." },
    description: { es: "Coordinamos una primera orientación sobre opciones bariátricas, preparación y seguimiento disponible.", en: "We coordinate an initial conversation about bariatric options, preparation and available follow-up." },
    services: [
      { slug: "manga-gastrica", name: { es: "Manga gástrica", en: "Sleeve gastrectomy" }, description: { es: "Una opción que solo puede indicarse después de una evaluación clínica completa.", en: "An option that can only be recommended after a complete clinical assessment." }, options: [option("valoracion-manga", "Valoración de manga gástrica", "Sleeve assessment", "Información sobre pruebas, preparación y seguimiento.", "Information about tests, preparation and follow-up.")] },
      { slug: "bypass-gastrico", name: { es: "Bypass gástrico", en: "Gastric bypass" }, description: { es: "Información sobre alternativas quirúrgicas y seguimiento a largo plazo.", en: "Information about surgical alternatives and long-term follow-up." }, options: [option("bypass-roux-en-y", "Bypass Roux-en-Y", "Roux-en-Y bypass", "Descripción general del proceso sujeto a valoración.", "General process overview subject to assessment."), option("seguimiento-bariatrico", "Seguimiento nutricional", "Nutritional follow-up", "Coordinación del seguimiento que ofrezca el centro.", "Coordination of follow-up offered by the clinic.")] },
    ],
  },
  {
    slug: "fertilidad",
    name: { es: "Fertilidad y salud reproductiva", en: "Fertility and reproductive health" },
    shortDescription: { es: "Acompañamiento sensible para decisiones importantes.", en: "Sensitive support for important decisions." },
    description: { es: "Coordinamos una primera orientación con centros especializados en fertilidad y reproducción asistida.", en: "We coordinate an initial conversation with fertility and assisted reproduction specialists." },
    services: [
      { slug: "fecundacion-in-vitro", name: { es: "Fecundación in vitro", en: "In vitro fertilisation" }, description: { es: "Información sobre pruebas, alternativas, tiempos y normativa aplicable.", en: "Information about tests, options, timelines and applicable regulations." }, options: [option("fiv-ovulos-propios", "FIV con óvulos propios", "IVF with own eggs", "Orientación inicial sobre pruebas y coordinación.", "Initial guidance about tests and coordination."), option("ovodonacion", "Ovodonación", "Egg donation", "Información sujeta a requisitos del centro y normativa.", "Information subject to clinic requirements and regulations.")] },
      { slug: "preservacion-ovulos", name: { es: "Preservación de óvulos", en: "Egg preservation" }, description: { es: "Orientación inicial sujeta a valoración y requisitos del centro.", en: "Initial guidance subject to assessment and clinic requirements." }, options: [option("vitrificacion", "Vitrificación de óvulos", "Egg vitrification", "Información general sobre proceso y planificación.", "General information about process and planning."), option("reserva-ovarica", "Estudio de reserva ovárica", "Ovarian reserve assessment", "Pruebas que puede solicitar el equipo especializado.", "Tests that may be requested by the specialist team.")] },
    ],
  },
  {
    slug: "maxilofacial-otorrino",
    name: { es: "Maxilofacial y otorrinolaringología", en: "Maxillofacial and ENT" },
    shortDescription: { es: "Valoración especializada para funciones faciales, nasales y de oído, nariz y garganta.", en: "Specialist assessment for facial, nasal and ear, nose and throat concerns." },
    description: { es: "Conoce opciones de valoración y coordinación con equipos especializados, siempre sujetas a indicación clínica.", en: "Explore assessment and coordination options with specialist teams, always subject to clinical indication." },
    services: [
      { slug: "rinologia-funcional", name: { es: "Rinología funcional", en: "Functional rhinology" }, description: { es: "Estudio de opciones funcionales y estéticas de la nariz según valoración especializada.", en: "Assessment of functional and aesthetic nasal options by a specialist team." }, options: [option("septoplastia", "Septoplastia", "Septoplasty", "Información general sobre valoración de la función nasal.", "General information about nasal function assessment."), option("rinoplastia-funcional", "Rinoplastia funcional", "Functional rhinoplasty", "Alternativa sujeta a estudio y planificación clínica.", "An option subject to clinical assessment and planning.")] },
      { slug: "otoplastia", name: { es: "Otoplastia", en: "Otoplasty" }, description: { es: "Opciones de corrección de la forma o posición de las orejas tras valoración.", en: "Options to address ear shape or position after assessment." }, options: [option("correccion-orejas", "Corrección de orejas", "Ear correction", "Información sobre consulta, planificación y recuperación.", "Information about consultation, planning and recovery.")] },
    ],
  },
  {
    slug: "reconstructiva",
    name: { es: "Cirugía reconstructiva", en: "Reconstructive surgery" },
    shortDescription: { es: "Coordinación de consultas reconstructivas con equipos especializados.", en: "Coordination of reconstructive consultations with specialist teams." },
    description: { es: "Una primera orientación para entender qué documentación y valoración puede requerir cada caso.", en: "An initial conversation to understand what documentation and assessment each case may require." },
    services: [
      { slug: "reconstruccion-mamaria", name: { es: "Reconstrucción mamaria", en: "Breast reconstruction" }, description: { es: "Información orientativa sobre alternativas reconstructivas y etapas de valoración.", en: "General information about reconstructive alternatives and assessment stages." }, options: [option("reconstruccion-propia", "Reconstrucción con tejido propio", "Autologous reconstruction", "Alternativa que requiere estudio individualizado.", "An option requiring individual assessment."), option("reconstruccion-implante", "Reconstrucción con implante", "Implant reconstruction", "Información sobre alternativas que el equipo puede valorar.", "Information about options the team may assess.")] },
      { slug: "cicatrices-revision", name: { es: "Revisión de cicatrices", en: "Scar revision" }, description: { es: "Opciones de revisión que dependen del tipo de cicatriz y del criterio profesional.", en: "Revision options depending on scar type and professional assessment." }, options: [option("revision-quirurgica", "Revisión quirúrgica", "Surgical revision", "Valoración de posibilidades, límites y recuperación.", "Assessment of options, limitations and recovery."), option("tratamiento-cicatriz", "Tratamientos de cicatriz", "Scar treatments", "Alternativas no quirúrgicas según el centro.", "Non-surgical alternatives depending on the clinic.")] },
    ],
  },
];

export function getSpecialty(slug: string) { return specialties.find((specialty) => specialty.slug === slug); }
export function getSpecialtyService(specialtySlug: string, serviceSlug: string) { const specialty = getSpecialty(specialtySlug); const service = specialty?.services.find((item) => item.slug === serviceSlug); return service ? { ...service, specialty } : undefined; }
export const publishedSpecialtySlugs = ["capilar", "odontologia", "estetica", "bariatrica"] as const;
export const publishedSpecialties = specialties.filter((specialty) => publishedSpecialtySlugs.includes(specialty.slug as (typeof publishedSpecialtySlugs)[number]));
