import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type ButtonTone = "primary" | "secondary" | "ghost" | "danger";

const toneClasses: Record<ButtonTone, string> = {
  primary: "bg-sapphire text-white shadow-soft hover:bg-sapphire-dark hover:-translate-y-0.5",
  secondary: "border border-sapphire bg-transparent text-sapphire hover:bg-surface",
  ghost: "text-sapphire underline decoration-champagne decoration-2 underline-offset-8 hover:text-sapphire-dark",
  danger: "bg-danger text-white hover:brightness-95",
};

const baseClasses = "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition duration-base ease-standard focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

export function buttonClassName(tone: ButtonTone = "primary", className = "") {
  return `${baseClasses} ${toneClasses[tone]} ${className}`.trim();
}

export function Button({ tone = "primary", className, children, ...props }: ComponentProps<"button"> & { tone?: ButtonTone; children: ReactNode }) {
  return <button className={buttonClassName(tone, className)} {...props}>{children}</button>;
}

export function ButtonLink({ tone = "primary", className, children, ...props }: ComponentProps<typeof Link> & { tone?: ButtonTone; children: ReactNode }) {
  return <Link className={buttonClassName(tone, className)} {...props}>{children}</Link>;
}
