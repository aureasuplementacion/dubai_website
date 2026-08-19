import type { ReactNode } from "react";

type StatusTone = "success" | "warning" | "danger" | "info" | "neutral";

const tones: Record<StatusTone, string> = {
  success: "border-success/20 bg-success/10 text-success",
  warning: "border-warning/20 bg-champagne-light text-warning",
  danger: "border-danger/20 bg-danger/10 text-danger",
  info: "border-info/20 bg-info/10 text-info",
  neutral: "border-border bg-surface text-muted",
};

export function Status({ tone = "neutral", children }: { tone?: StatusTone; children: ReactNode }) {
  return <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[.12em] ${tones[tone]}`}>{children}</span>;
}
