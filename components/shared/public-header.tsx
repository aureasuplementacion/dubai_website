"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { buttonClassName } from "@/components/ui/button";
import { publishedSpecialties } from "@/lib/catalog/data";

export function PublicHeader({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false);
  const [specialtiesOpen, setSpecialtiesOpen] = useState(false);
  const pathname = usePathname();
  const english = locale === "en";
  const language = english ? "en" : "es";
  const nextLocale = english ? "es" : "en";
  const close = () => { setOpen(false); setSpecialtiesOpen(false); };
  const links = [
    { href: `/${locale}/clinicas`, label: english ? "Clinics & professionals" : "Clínicas y profesionales" },
    { href: `/${locale}/como-funciona`, label: english ? "Your journey" : "Tu viaje" },
    { href: `/${locale}/aura`, label: english ? "The Aura approach" : "Cómo funciona Aura" },
  ];

  return <header className="sticky top-0 z-40 border-b border-border/70 bg-canvas/90 backdrop-blur-xl">
    <div className="container-shell flex min-h-[5.25rem] items-center justify-between gap-5">
      <Link href={`/${locale}`} onClick={close} className="group flex items-center gap-3" aria-label="Aura Estética">
        <span className="grid size-9 place-items-center rounded-full border border-champagne text-xs font-bold tracking-tight text-sapphire transition group-hover:bg-champagne-light">AE</span>
        <span className="font-display text-[1.75rem] font-semibold leading-none tracking-tight text-sapphire">Aura <span className="text-champagne">Estética</span></span>
      </Link>
      <nav className="hidden items-center gap-7 text-[.78rem] font-semibold tracking-wide text-muted lg:flex">
        <div className="relative">
          <button type="button" onClick={() => setSpecialtiesOpen((value) => !value)} className="inline-flex min-h-11 items-center gap-1.5 transition hover:text-sapphire" aria-expanded={specialtiesOpen}>
            {english ? "Specialties" : "Especialidades"}<ChevronDown size={15} className={`transition ${specialtiesOpen ? "rotate-180" : ""}`} />
          </button>
          {specialtiesOpen && <div className="absolute left-1/2 top-[calc(100%+1rem)] max-h-[min(75vh,38rem)] w-[min(72rem,calc(100vw-2rem))] -translate-x-1/2 overflow-y-auto rounded-[1.75rem] border border-border bg-canvas p-7 shadow-soft">
            <div className="mb-6 flex items-end justify-between gap-5 border-b border-border pb-5"><div><p className="eyebrow">Aura Estética</p><p className="mt-2 font-display text-3xl text-sapphire">{english ? "Explore with context" : "Explora con contexto"}</p></div><Link href={`/${locale}/especialidades`} onClick={close} className="text-sm font-semibold text-sapphire underline decoration-champagne underline-offset-4">{english ? "View all" : "Ver todas"}</Link></div>
            <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">{publishedSpecialties.map((specialty) => <div key={specialty.slug}><Link href={`/${locale}/especialidades/${specialty.slug}`} onClick={close} className="font-display text-[1.45rem] font-semibold text-sapphire hover:text-champagne">{specialty.name[language]}</Link><ul className="mt-3 space-y-2 border-l border-champagne pl-3">{specialty.services.map((service) => <li key={service.slug}><Link href={`/${locale}/especialidades/${specialty.slug}/${service.slug}`} onClick={close} className="text-sm font-medium text-ink hover:text-sapphire">{service.name[language]}</Link></li>)}</ul></div>)}</div>
          </div>}
        </div>
        {links.map((link) => <Link key={link.href} href={link.href} className={`min-h-11 inline-flex items-center transition ${pathname === link.href ? "text-sapphire" : "hover:text-sapphire"}`}>{link.label}</Link>)}
        <Link href={`/${nextLocale}${pathname.replace(/^\/[^/]+/, "")}`} className="inline-flex min-h-11 items-center rounded-full border border-border px-3 text-[.7rem] font-bold uppercase tracking-[.16em] text-sapphire">{nextLocale}</Link>
        <Link href={`/${locale}/reservar`} className={buttonClassName("primary", "px-5 py-3")}>{english ? "Talk to an advisor" : "Hablar con un asesor"}</Link>
      </nav>
      <div className="flex items-center gap-2 lg:hidden"><Link href={`/${locale}/reservar`} className={buttonClassName("primary", "px-3 py-2 text-xs")}>{english ? "Talk to us" : "Hablar"}</Link><button type="button" onClick={() => setOpen((value) => !value)} className="inline-flex size-11 items-center justify-center rounded-full border border-border text-sapphire" aria-expanded={open} aria-label={english ? "Open menu" : "Abrir menú"}>{open ? <X size={20} /> : <Menu size={20} />}</button></div>
    </div>
    {open && <nav className="border-t border-border bg-canvas px-5 py-5 lg:hidden"><div className="container-shell grid gap-1"><Link href={`/${locale}/especialidades`} onClick={close} className="rounded-xl px-3 py-3 font-semibold text-sapphire">{english ? "Specialties" : "Especialidades"}</Link><Link href={`/${locale}/clinicas`} onClick={close} className="rounded-xl px-3 py-3 font-semibold text-sapphire">{english ? "Clinics & professionals" : "Clínicas y profesionales"}</Link><Link href={`/${locale}/como-funciona`} onClick={close} className="rounded-xl px-3 py-3 font-semibold text-sapphire">{english ? "Your journey" : "Tu viaje"}</Link><Link href={`/${locale}/aura`} onClick={close} className="rounded-xl px-3 py-3 font-semibold text-sapphire">{english ? "The Aura approach" : "Cómo funciona Aura"}</Link><Link href={`/${nextLocale}${pathname.replace(/^\/[^/]+/, "")}`} onClick={close} className="mt-3 rounded-xl border border-border px-3 py-3 text-sm font-bold uppercase tracking-[.16em] text-sapphire">{nextLocale}</Link></div></nav>}
  </header>;
}
