export type MediaAsset = {
  desktop: string;
  mobile?: string;
  alt: { es: string; en: string };
  role: "hero" | "specialty" | "partner" | "hotel" | "transport" | "journey" | "trust" | "social";
  status: "representative" | "verified";
};

export const media = {
  hero: {
    consultation: { desktop: "/images/hero/aura-hero-consultation.webp", mobile: "/images/hero/aura-hero-consultation-mobile.webp", alt: { es: "Conversación de orientación con Aura Estética", en: "Guidance conversation with Aura Estética" }, role: "hero", status: "representative" },
  },
  specialties: {
    capilar: { desktop: "/images/specialties/hair-restoration.webp", mobile: "/images/specialties/hair-restoration-mobile.webp", alt: { es: "Orientación sobre restauración capilar", en: "Hair restoration guidance" }, role: "specialty", status: "representative" },
    odontologia: { desktop: "/images/specialties/dental-smile.webp", mobile: "/images/specialties/dental-smile-mobile.webp", alt: { es: "Orientación sobre salud y estética dental", en: "Dental health and aesthetic guidance" }, role: "specialty", status: "representative" },
    estetica: { desktop: "/images/specialties/aesthetic-surgery.webp", mobile: "/images/specialties/aesthetic-surgery-mobile.webp", alt: { es: "Información sobre cirugía estética y corporal", en: "Aesthetic and body surgery information" }, role: "specialty", status: "representative" },
    "medicina-estetica": { desktop: "/images/specialties/medical-aesthetics.webp", mobile: "/images/specialties/medical-aesthetics-mobile.webp", alt: { es: "Información sobre medicina estética", en: "Aesthetic medicine information" }, role: "specialty", status: "representative" },
    bariatrica: { desktop: "/images/specialties/obesity-metabolism.webp", mobile: "/images/specialties/obesity-metabolism-mobile.webp", alt: { es: "Información sobre metabolismo y cirugía bariátrica", en: "Metabolic and bariatric care information" }, role: "specialty", status: "representative" },
    oftalmologia: { desktop: "/images/specialties/vision-eye-care.webp", mobile: "/images/specialties/vision-eye-care-mobile.webp", alt: { es: "Orientación sobre cuidado visual", en: "Vision care guidance" }, role: "specialty", status: "representative" },
    fertilidad: { desktop: "/images/specialties/aura-specialty-consultation.webp", mobile: "/images/specialties/aura-specialty-consultation-mobile.webp", alt: { es: "Conversación de orientación especializada", en: "Specialist guidance conversation" }, role: "specialty", status: "representative" },
    "maxilofacial-otorrino": { desktop: "/images/specialties/aura-specialty-consultation.webp", mobile: "/images/specialties/aura-specialty-consultation-mobile.webp", alt: { es: "Orientación maxilofacial y otorrinolaringológica", en: "Maxillofacial and ENT guidance" }, role: "specialty", status: "representative" },
    reconstructiva: { desktop: "/images/specialties/aura-specialty-consultation.webp", mobile: "/images/specialties/aura-specialty-consultation-mobile.webp", alt: { es: "Orientación sobre cirugía reconstructiva", en: "Reconstructive surgery guidance" }, role: "specialty", status: "representative" },
  },
  partners: {
    exterior: { desktop: "/images/partners/bht-clinic-exterior.webp", mobile: "/images/partners/bht-clinic-exterior-mobile.webp", alt: { es: "Exterior representativo de BHT CLINIC", en: "Representative exterior of BHT CLINIC" }, role: "partner", status: "verified" },
    international: { desktop: "/images/partners/bht-clinic-international.webp", mobile: "/images/partners/bht-clinic-international-mobile.webp", alt: { es: "Entorno internacional representativo de BHT CLINIC", en: "Representative international setting of BHT CLINIC" }, role: "partner", status: "verified" },
    team: { desktop: "/images/partners/bht-clinic-care-team.webp", mobile: "/images/partners/bht-clinic-care-team-mobile.webp", alt: { es: "Equipo de atención representativo", en: "Representative care team" }, role: "partner", status: "representative" },
  },
  hotel: {
    exterior: { desktop: "/images/hotel/the-g-hotels-exterior.webp", mobile: "/images/hotel/the-g-hotels-exterior-mobile.webp", alt: { es: "Exterior representativo de The G Hotels Istanbul", en: "Representative exterior of The G Hotels Istanbul" }, role: "hotel", status: "verified" },
    room: { desktop: "/images/hotel/the-g-hotels-room.webp", mobile: "/images/hotel/the-g-hotels-room-mobile.webp", alt: { es: "Habitación representativa del hotel", en: "Representative hotel room" }, role: "hotel", status: "representative" },
    dining: { desktop: "/images/hotel/the-g-hotels-dining.webp", mobile: "/images/hotel/the-g-hotels-dining-mobile.webp", alt: { es: "Espacio gastronómico representativo del hotel", en: "Representative hotel dining space" }, role: "hotel", status: "representative" },
    wellness: { desktop: "/images/hotel/the-g-hotels-wellness.webp", mobile: "/images/hotel/the-g-hotels-wellness-mobile.webp", alt: { es: "Espacio de bienestar representativo", en: "Representative wellness space" }, role: "hotel", status: "representative" },
  },
  transport: {
    private: { desktop: "/images/transport/hotel-transfer.webp", mobile: "/images/transport/hotel-transfer-mobile.webp", alt: { es: "Vehículo privado de lujo representativo", en: "Representative private luxury vehicle" }, role: "transport", status: "representative" },
    airport: { desktop: "/images/transport/airport-pickup.webp", mobile: "/images/transport/airport-pickup-mobile.webp", alt: { es: "Recogida representativa en el aeropuerto", en: "Representative airport pickup" }, role: "transport", status: "representative" },
    hotel: { desktop: "/images/transport/hotel-transfer.webp", mobile: "/images/transport/hotel-transfer-mobile.webp", alt: { es: "Traslado representativo entre hotel y centro", en: "Representative hotel-to-centre transfer" }, role: "transport", status: "representative" },
  },
  trust: {
    call: { desktop: "/images/trust/aura-advisor-call.webp", mobile: "/images/trust/aura-advisor-call-mobile.webp", alt: { es: "Asesoría inicial con Aura Estética", en: "Initial guidance with Aura Estética" }, role: "trust", status: "representative" },
    documents: { desktop: "/images/trust/document-coordination.webp", mobile: "/images/trust/document-coordination-mobile.webp", alt: { es: "Coordinación documental del viaje", en: "Travel document coordination" }, role: "trust", status: "representative" },
  },
} satisfies Record<string, Record<string, MediaAsset>>;

export type MediaKey = keyof typeof media;

export const specialtyMedia: Record<string, MediaAsset> = media.specialties;
