import { createSupabaseServerClient } from "@/lib/supabase/server";
import { specialties as staticSpecialties, type Specialty } from "@/lib/catalog/data";

type DbSpecialty = { id: string; slug: string; name_es: string; name_en: string; short_description_es: string; short_description_en: string; description_es: string | null; description_en: string | null; status: string; sort_order: number };
type DbService = { id: string; specialty_id: string; slug: string; name_es: string; name_en: string; description_es: string | null; description_en: string | null; status: string; sort_order: number };
type DbOption = { specialty_service_id: string; slug: string; name_es: string; name_en: string; summary_es: string | null; summary_en: string | null; status: string; sort_order: number };

export async function getPublishedSpecialties(): Promise<Specialty[]> {
  try {
    const supabase = await createSupabaseServerClient();
    const [{ data: dbSpecialties, error: specialtyError }, { data: dbServices, error: serviceError }, { data: dbOptions, error: optionError }] = await Promise.all([
      supabase.from("specialties").select("id, slug, name_es, name_en, short_description_es, short_description_en, description_es, description_en, status, sort_order").eq("status", "published").order("sort_order"),
      supabase.from("specialty_services").select("id, specialty_id, slug, name_es, name_en, description_es, description_en, status, sort_order").eq("status", "published").order("sort_order"),
      supabase.from("specialty_service_options").select("specialty_service_id, slug, name_es, name_en, summary_es, summary_en, status, sort_order").eq("status", "published").order("sort_order"),
    ]);
    if (specialtyError || serviceError || optionError || !dbSpecialties?.length) return staticSpecialties.filter((specialty) => ["capilar", "odontologia", "estetica", "bariatrica", "oftalmologia"].includes(specialty.slug));
    const services = (dbServices || []) as DbService[];
    const options = (dbOptions || []) as DbOption[];
    return (dbSpecialties as DbSpecialty[]).map((specialty) => ({
      slug: specialty.slug,
      name: { es: specialty.name_es, en: specialty.name_en },
      shortDescription: { es: specialty.short_description_es, en: specialty.short_description_en },
      description: { es: specialty.description_es || specialty.short_description_es, en: specialty.description_en || specialty.short_description_en },
      services: services.filter((service) => service.specialty_id === specialty.id).map((service) => ({
        slug: service.slug,
        name: { es: service.name_es, en: service.name_en },
        description: { es: service.description_es || "", en: service.description_en || "" },
        options: options.filter((option) => option.specialty_service_id === service.id).map((option) => ({ slug: option.slug, name: { es: option.name_es, en: option.name_en }, summary: { es: option.summary_es || "", en: option.summary_en || "" } })),
      })),
    }));
  } catch {
    return staticSpecialties.filter((specialty) => ["capilar", "odontologia", "estetica", "bariatrica", "oftalmologia"].includes(specialty.slug));
  }
}

export async function getPublishedSpecialty(slug: string) {
  const specialties = await getPublishedSpecialties();
  return specialties.find((specialty) => specialty.slug === slug);
}

export async function getPublishedSpecialtyService(specialtySlug: string, serviceSlug: string) {
  const specialty = await getPublishedSpecialty(specialtySlug);
  const service = specialty?.services.find((item) => item.slug === serviceSlug);
  return service ? { ...service, specialty } : undefined;
}
