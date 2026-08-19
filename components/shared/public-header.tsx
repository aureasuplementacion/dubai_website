"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { buttonClassName } from "@/components/ui/button";
import { specialties } from "@/lib/catalog/data";

export function PublicHeader({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false);
  const [specialtiesOpen, setSpecialtiesOpen] = useState(false);
  const pathname = usePathname();
  const english = locale === "en";
  const language = english ? "en" : "es";
  const nextLocale = english ? "es" : "en";
  const specialtyLabel = english ? "Specialties" : "Especialidades";
  const links = [
    { href: `/${locale}/clinicas`, label: english ? "Clinics & professionals" : "Clínicas y profesionales" },
    { href: `/${locale}/como-funciona`, label: english ? "How it works" : "Cómo funciona" },
  ];
  const close = () => { setOpen(false); setSpecialtiesOpen(false); };

  return <header className="sticky top-0 z-40 border-b border-border/80 bg-white/95 backdrop-blur">
    <div className="container-shell flex min-h-[4.5rem] items-center justify-between gap-5">
      <Link href={`/${locale}`} onClick={close} className="shrink-0 font-display text-xl tracking-wide text-sapphire sm:text-2xl" aria-label="Aura Estética, inicio">Aura <span className="text-champagne">Estética</span></Link>
      <nav className="hidden items-center gap-6 text-sm text-muted lg:flex" aria-label={english ? "Main navigation" : "Navegación principal"}>
        <div className="relative">
          <button type="button" onClick={() => setSpecialtiesOpen((value) => !value)} className={`inline-flex items-center gap-1.5 transition-colors hover:text-sapphire ${specialtiesOpen || pathname.startsWith(`/${locale}/especialidades`) ? "font-semibold text-sapphire" : ""}`} aria-expanded={specialtiesOpen} aria-controls="specialties-mega-menu">{specialtyLabel}<ChevronDown size={15} className={`transition-transform ${specialtiesOpen ? "rotate-180" : ""}`} aria-hidden="true" /></button>
          {specialtiesOpen && <div id="specialties-mega-menu" className="absolute left-1/2 top-[calc(100%+1.25rem)] max-h-[min(75vh,38rem)] w-[min(72rem,calc(100vw-2rem))] -translate-x-1/2 overflow-y-auto rounded-[1.5rem] border border-border bg-white p-6 shadow-soft" role="region" aria-label={specialtyLabel}>
            <div className="mb-5 flex items-end justify-between gap-4 border-b border-border pb-5"><div><p className="eyebrow">Aura Estética</p><p className="mt-2 font-display text-2xl text-sapphire">{english ? "Explore by specialty" : "Explora por especialidad"}</p></div><Link href={`/${locale}/especialidades`} onClick={close} className="text-sm font-semibold text-sapphire underline underline-offset-4">{english ? "View all" : "Ver todas"}</Link></div>
            <div className="grid gap-x-8 gap-y-7 md:grid-cols-2 xl:grid-cols-3">{specialties.map((specialty) => <div key={specialty.slug}><Link href={`/${locale}/especialidades/${specialty.slug}`} onClick={close} className="font-display text-xl text-sapphire hover:text-sapphire-dark">{specialty.name[language]}</Link><ul className="mt-3 space-y-2 border-l border-champagne pl-3">{specialty.services.map((service) => <li key={service.slug}><Link href={`/${locale}/especialidades/${specialty.slug}/${service.slug}`} onClick={close} className="text-sm font-semibold text-ink hover:text-sapphire">{service.name[language]}</Link><ul className="mt-1 space-y-1">{service.options.slice(0, 3).map((item) => <li key={item.slug}><Link href={`/${locale}/especialidades/${specialty.slug}/${service.slug}`} onClick={close} className="block text-xs text-muted hover:text-sapphire">{item.name[language]}</Link></li>)}</ul></li>)}</ul></div>)}</div>
          </div>}
        </div>
        {links.map((link) => <Link key={link.href} href={link.href} className={`transition-colors hover:text-sapphire ${pathname === link.href ? "font-semibold text-sapphire" : ""}`}>{link.label}</Link>)}
        <Link href={`/${nextLocale}${pathname.replace(/^\/[^/]+/, "")}`} className="rounded-full border border-border px-3 py-2 text-xs font-bold uppercase tracking-wider text-sapphire">{nextLocale}</Link>
        <Link href={`/${locale}/reservar`} className={buttonClassName("primary", "px-4 py-2")}>{english ? "Talk to an advisor" : "Hablar con un asesor"}</Link>
      </nav>
      <div className="flex items-center gap-2 lg:hidden"><Link href={`/${locale}/reservar`} className={buttonClassName("primary", "px-3 py-2 text-xs")}>{english ? "Talk to us" : "Hablar"}</Link><button type="button" onClick={() => setOpen((value) => !value)} className="inline-flex size-11 items-center justify-center rounded-full border border-border text-sapphire" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Cerrar menú" : "Abrir menú"}>{open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}</button></div>
    </div>
    {open && <nav id="mobile-navigation" className="border-t border-border bg-white px-5 py-4 lg:hidden" aria-label={english ? "Mobile navigation" : "Navegación móvil"}><div className="container-shell grid gap-1"><Link href={`/${locale}/especialidades`} onClick={close} className="rounded-xl px-3 py-3 text-sm font-semibold text-sapphire hover:bg-surface">{specialtyLabel}</Link><div className="rounded-2xl bg-surface p-2">{specialties.map((specialty) => <details key={specialty.slug} className="group"><summary className="flex cursor-pointer list-none items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold text-sapphire [&::-webkit-details-marker]:hidden">{specialty.name[language]}<ChevronDown size={16} className="transition-transform group-open:rotate-180" aria-hidden="true" /></summary><div className="space-y-2 px-3 pb-3">{specialty.services.map((service) => <div key={service.slug}><Link href={`/${locale}/especialidades/${specialty.slug}/${service.slug}`} onClick={close} className="block py-1 text-sm font-semibold text-ink">{service.name[language]}</Link><div className="space-y-1">{service.options.slice(0, 3).map((item) => <Link key={item.slug} href={`/${locale}/especialidades/${specialty.slug}/${service.slug}`} onClick={close} className="block py-0.5 text-xs text-muted">{item.name[language]}</Link>)}</div></div>)}</div></details>)}</div>{links.map((link) => <Link key={link.href} href={link.href} onClick={close} className="rounded-xl px-3 py-3 text-sm font-semibold text-sapphire hover:bg-surface">{link.label}</Link>)}<Link href={`/${locale}/contacto`} onClick={close} className="rounded-xl px-3 py-3 text-sm font-semibold text-sapphire hover:bg-surface">{english ? "Contact" : "Contacto"}</Link><Link href={`/${nextLocale}${pathname.replace(/^\/[^/]+/, "")}`} onClick={close} className="rounded-xl px-3 py-3 text-sm font-semibold text-muted hover:bg-surface">{english ? "Ver en español" : "View in English"}</Link></div></nav>}
  </header>;
}
