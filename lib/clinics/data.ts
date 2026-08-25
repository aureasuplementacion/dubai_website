import type { Locale } from "@/lib/catalog/data";

export type ClinicProfessional = {
  slug: string;
  name: string;
  role: Record<Locale, string>;
  specialties: string[];
  languages: string[];
  bio: Record<Locale, string>;
};

export type Clinic = {
  slug: string;
  name: string;
  city: "Estambul";
  cityLabel: Record<Locale, string>;
  description: Record<Locale, string>;
  specialties: string[];
  languages: string[];
  internationalUnit: boolean;
  interpreter: boolean;
  facilities: Record<Locale, string[]>;
  included: Record<Locale, string[]>;
  followUp: Record<Locale, string>;
  lastVerified: string;
  professionals: ClinicProfessional[];
  address: string;
  website: string;
  phone: string;
  accreditations: string[];
};

export const bhtClinic: Clinic = {
  slug: "bht-clinic",
  name: "BHT CLINIC Istanbul Tema Hospital",
  city: "Estambul",
  cityLabel: { es: "Estambul", en: "Istanbul" },
  description: {
    es: "Hospital privado de referencia en Estambul con atención internacional y coordinación para pacientes que viajan desde España.",
    en: "A private hospital in Istanbul with international patient support and coordination for people travelling from Spain.",
  },
  specialties: ["estetica", "bariatrica", "odontologia", "capilar"],
  languages: ["Español", "Inglés", "Turco"],
  internationalUnit: true,
  interpreter: true,
  facilities: {
    es: ["Hospital de 55.000 m² y 19 plantas", "20 quirófanos y unidades de cuidados intensivos", "Unidad de pacientes internacionales", "Más de 100 médicos y más de 1.000 profesionales"],
    en: ["55,000 m² hospital across 19 floors", "20 operating rooms and intensive care units", "International patient centre", "More than 100 doctors and 1,000 staff members"],
  },
  included: {
    es: ["Coordinador internacional", "Interpretación y comunicación con el centro", "Opciones de hotel y traslado privado según propuesta", "Apoyo 24/7 durante el proceso, según el servicio contratado"],
    en: ["International coordinator", "Interpretation and communication with the centre", "Hotel and private transfer options according to the proposal", "24/7 support during the process, according to the contracted service"],
  },
  followUp: {
    es: "La valoración, el diagnóstico, la indicación y el seguimiento clínico corresponden al equipo sanitario responsable.",
    en: "Assessment, diagnosis, treatment indication and clinical follow-up belong to the responsible healthcare team.",
  },
  lastVerified: "2026-08-19",
  address: "Atakent Mahallesi, 4. Cadde, No:4/1, Küçükçekmece, Estambul, Turquía",
  website: "https://international.bhtclinic.com.tr/lang/es",
  phone: "+90 212 404 44 44",
  accreditations: ["JCI", "TEMOS", "TÜSKA Gold", "LEED Gold"],
  professionals: [],
};

export const verifiedClinics = [bhtClinic];
export const clinicCities = [bhtClinic.city];
export const clinicSpecialties = bhtClinic.specialties;
export function getClinic(slug: string) { return verifiedClinics.find((clinic) => clinic.slug === slug); }

// Kept only to provide a controlled redirect from the former prototype routes.
export const legacyClinicSlugs = ["bosporus-aesthetic-center", "golden-horn-dental", "istanbul-hair-institute", "antalya-wellness-hospital", "marmara-reproductive-center"];
