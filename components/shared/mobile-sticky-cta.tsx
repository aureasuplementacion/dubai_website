import Link from "next/link";

export function MobileStickyCta({ locale }: { locale: string }) {
  return <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-white/95 p-3 backdrop-blur md:hidden"><div className="container-shell"><Link href={`/${locale}/reservar`} className="flex min-h-11 items-center justify-center rounded-full bg-sapphire px-5 text-sm font-semibold text-white shadow-soft">{locale === "en" ? "Talk to an advisor" : "Hablar con un asesor"}</Link></div></div>;
}
