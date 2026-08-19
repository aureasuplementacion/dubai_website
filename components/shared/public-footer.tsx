import Link from "next/link";

export function PublicFooter({ locale }: { locale: string }) {
  const isEnglish = locale === "en";
  return <footer className="border-t border-border bg-surface">
    <div className="container-shell grid gap-8 py-10 md:grid-cols-[1.3fr_.7fr_.7fr]">
      <div><Link href={`/${locale}`} className="font-display text-2xl text-sapphire">Aura <span className="text-champagne">Estética</span></Link><p className="mt-3 max-w-sm text-sm leading-6 text-muted">{isEnglish ? "Clear information and human coordination for your healthcare journey." : "Información clara y acompañamiento humano para tu viaje sanitario."}</p></div>
      <div><p className="text-xs font-bold uppercase tracking-[.18em] text-sapphire">{isEnglish ? "Explore" : "Explora"}</p><div className="mt-4 grid gap-2 text-sm text-muted"><Link href={`/${locale}/especialidades`} className="hover:text-sapphire">{isEnglish ? "Specialties" : "Especialidades"}</Link><Link href={`/${locale}/clinicas`} className="hover:text-sapphire">{isEnglish ? "Clinics" : "Clínicas"}</Link><Link href={`/${locale}/como-funciona`} className="hover:text-sapphire">{isEnglish ? "How it works" : "Cómo funciona"}</Link></div></div>
      <div><p className="text-xs font-bold uppercase tracking-[.18em] text-sapphire">{isEnglish ? "Contact" : "Contacto"}</p><div className="mt-4 grid gap-2 text-sm text-muted"><Link href={`/${locale}/reservar`} className="hover:text-sapphire">{isEnglish ? "Talk to an advisor" : "Hablar con un asesor"}</Link><Link href={`/${locale}/contacto`} className="hover:text-sapphire">WhatsApp / Email</Link></div></div>
    </div>
    <div className="border-t border-border"><div className="container-shell flex flex-wrap justify-between gap-3 py-5 text-xs text-muted"><span>© 2026 Aura Estética</span><span>{isEnglish ? "Information subject to clinical assessment." : "Información sujeta a valoración médica."}</span></div></div>
  </footer>;
}
