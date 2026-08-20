export const leadStatuses = [
  "new",
  "contact_requested",
  "called",
  "qualified",
  "awaiting_clinic_review",
  "proposal_sent",
  "travel_planned",
  "completed",
  "not_eligible",
  "lost",
  "cancelled",
] as const;

export type LeadStatus = (typeof leadStatuses)[number];

export const leadStatusLabels: Record<LeadStatus, string> = {
  new: "Nuevo",
  contact_requested: "Pendiente de contactar",
  called: "Atendido",
  qualified: "Cualificado",
  awaiting_clinic_review: "En valoración",
  proposal_sent: "Propuesta enviada",
  travel_planned: "Viaje planificado",
  completed: "Completado",
  not_eligible: "No apto",
  lost: "Sin respuesta / perdido",
  cancelled: "Cancelado",
};

export const leadStatusGroups: Record<LeadStatus, "entrada" | "seguimiento" | "proceso" | "cierre"> = {
  new: "entrada",
  contact_requested: "seguimiento",
  called: "seguimiento",
  qualified: "proceso",
  awaiting_clinic_review: "proceso",
  proposal_sent: "proceso",
  travel_planned: "proceso",
  completed: "cierre",
  not_eligible: "cierre",
  lost: "cierre",
  cancelled: "cierre",
};

export const leadStatusTones: Record<LeadStatus, "success" | "warning" | "danger" | "info" | "neutral"> = {
  new: "neutral",
  contact_requested: "warning",
  called: "info",
  qualified: "info",
  awaiting_clinic_review: "warning",
  proposal_sent: "info",
  travel_planned: "success",
  completed: "success",
  not_eligible: "danger",
  lost: "danger",
  cancelled: "danger",
};
