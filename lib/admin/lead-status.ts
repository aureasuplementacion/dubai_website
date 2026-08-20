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
  contact_requested: "Contacto solicitado",
  called: "Llamada realizada",
  qualified: "Cualificado",
  awaiting_clinic_review: "Revisión clínica",
  proposal_sent: "Propuesta enviada",
  travel_planned: "Viaje planificado",
  completed: "Completado",
  not_eligible: "No elegible",
  lost: "Perdido",
  cancelled: "Cancelado",
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
