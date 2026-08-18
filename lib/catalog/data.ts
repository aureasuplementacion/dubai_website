export type Service = {
  slug: string;
  category: "faciales" | "corporales" | "cuidado-personal";
  categoryLabel: { es: string; en: string };
  name: { es: string; en: string };
  description: { es: string; en: string };
  benefits: { es: string[]; en: string[] };
  duration: number;
  price: number;
};

export const services: Service[] = [
  { slug: "ritual-facial-luminoso", category: "faciales", categoryLabel: { es: "Tratamientos faciales", en: "Facial treatments" }, name: { es: "Ritual facial luminoso", en: "Luminous facial ritual" }, description: { es: "Una experiencia serena para cuidar y revitalizar tu piel.", en: "A calm experience to care for and revitalise your skin." }, benefits: { es: ["Piel más suave", "Momento de relajación", "Atención personalizada"], en: ["Softer-looking skin", "A moment to relax", "Personalised care"] }, duration: 60, price: 95 },
  { slug: "masaje-bienestar", category: "cuidado-personal", categoryLabel: { es: "Cuidado personal", en: "Personal care" }, name: { es: "Masaje bienestar", en: "Wellbeing massage" }, description: { es: "Un espacio para bajar el ritmo y reconectar contigo.", en: "A space to slow down and reconnect with yourself." }, benefits: { es: ["Relajación profunda", "Ritmo personalizado", "Ambiente sereno"], en: ["Deep relaxation", "Personalised pace", "A calm setting"] }, duration: 50, price: 80 },
  { slug: "experiencia-corporal", category: "corporales", categoryLabel: { es: "Tratamientos corporales", en: "Body treatments" }, name: { es: "Experiencia corporal", en: "Body experience" }, description: { es: "Tratamiento corporal pensado para acompañar tu bienestar.", en: "A body treatment designed to support your wellbeing." }, benefits: { es: ["Cuidado integral", "Sensación de ligereza", "Tiempo para ti"], en: ["Whole-body care", "A lighter feeling", "Time for yourself"] }, duration: 75, price: 120 },
  { slug: "cuidado-de-manos", category: "cuidado-personal", categoryLabel: { es: "Cuidado personal", en: "Personal care" }, name: { es: "Cuidado de manos", en: "Hand care ritual" }, description: { es: "Un ritual delicado para cuidar cada detalle.", en: "A delicate ritual for every little detail." }, benefits: { es: ["Hidratación", "Acabado cuidado", "Pausa consciente"], en: ["Hydration", "A cared-for finish", "A mindful pause"] }, duration: 40, price: 55 },
];

export function getService(slug: string) { return services.find((service) => service.slug === slug); }
