"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { specialties } from "@/lib/catalog/data";

const featuredSlugs = ["capilar", "odontologia", "estetica", "medicina-estetica", "bariatrica", "oftalmologia"];

export function SpecialtyCarousel({ locale }: { locale: string }) {
  const language = locale === "en" ? "en" : "es";
  const cards = featuredSlugs.map((slug) => specialties.find((specialty) => specialty.slug === slug)).filter(Boolean);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function updateActive() {
    const track = trackRef.current;
    const firstCard = track?.firstElementChild as HTMLElement | null;
    if (!track || !firstCard) return;
    setActive(Math.min(cards.length - 1, Math.round(track.scrollLeft / (firstCard.offsetWidth + 20))));
  }

  function move(direction: number) {
    const track = trackRef.current;
    const firstCard = track?.firstElementChild as HTMLElement | null;
    if (!track || !firstCard) return;
    track.scrollBy({ left: direction * (firstCard.offsetWidth + 20), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", updateActive, { passive: true });
    return () => track.removeEventListener("scroll", updateActive);
  });

  return <div className="mt-10" role="region" aria-roledescription="carousel" aria-label={language === "en" ? "Featured specialties" : "Especialidades destacadas"}>
    <div className="flex items-center justify-between gap-4"><p className="text-sm text-muted">{language === "en" ? "Explore six starting points" : "Explora seis puntos de partida"}</p><div className="flex gap-2"><button type="button" onClick={() => move(-1)} disabled={active === 0} className="grid size-11 place-items-center rounded-full border border-border text-sapphire transition hover:bg-surface disabled:opacity-40" aria-label={language === "en" ? "Previous specialties" : "Especialidades anteriores"}><ChevronLeft size={18} aria-hidden="true" /></button><button type="button" onClick={() => move(1)} disabled={active === cards.length - 1} className="grid size-11 place-items-center rounded-full border border-border text-sapphire transition hover:bg-surface disabled:opacity-40" aria-label={language === "en" ? "Next specialties" : "Siguientes especialidades"}><ChevronRight size={18} aria-hidden="true" /></button></div></div>
    <div ref={trackRef} className="mt-5 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" tabIndex={0}>{cards.map((specialty, index) => specialty && <article key={specialty.slug} className="group min-w-[85%] snap-start overflow-hidden rounded-[1.25rem] border border-border bg-white md:min-w-[calc((100%-1.25rem)/2)] lg:min-w-[calc((100%-2.5rem)/3)]" aria-label={`${index + 1} ${specialty.name[language]}`}><div className="relative h-48 overflow-hidden"><Image src="/images/aura-specialty-consultation.png" alt={specialty.name[language]} fill sizes="(max-width: 768px) 85vw, (max-width: 1024px) 45vw, 33vw" className={`object-cover transition duration-slow ease-standard group-hover:scale-105 ${index % 2 ? "object-[center_35%]" : "object-[center_65%]"}`} /><div className="absolute inset-0 bg-gradient-to-t from-sapphire/60 to-transparent" /></div><div className="p-6"><p className="eyebrow">Aura Estética</p><h3 className="mt-2 font-display text-2xl text-sapphire">{specialty.name[language]}</h3><p className="mt-3 text-sm leading-6 text-muted">{specialty.shortDescription[language]}</p><Link className="mt-5 inline-flex min-h-11 items-center font-semibold text-sapphire underline decoration-champagne underline-offset-4" href={`/${locale}/especialidades/${specialty.slug}`}>{language === "en" ? "Explore specialty" : "Conocer especialidad"}</Link></div></article>)}</div>
    <div className="mt-2 flex justify-center gap-2" aria-label={language === "en" ? "Carousel position" : "Posición del carrusel"}>{cards.map((specialty, index) => <button key={specialty?.slug} type="button" onClick={() => { const track = trackRef.current; const card = track?.children[index] as HTMLElement | undefined; card?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest", inline: "start" }); }} className={`size-2.5 rounded-full transition ${active === index ? "bg-sapphire" : "bg-border"}`} aria-label={`${index + 1}`} aria-current={active === index} />)}</div>
  </div>;
}
