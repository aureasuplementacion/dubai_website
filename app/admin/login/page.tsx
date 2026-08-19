import { LoginForm } from "./login-form";

export default function AdminLoginPage() {
  return <main className="surface-grid grid min-h-screen place-items-center bg-surface p-6"><section className="w-full max-w-md rounded-[2rem] border border-border bg-white p-8 shadow-soft md:p-10"><p className="eyebrow">Aura Estética</p><h1 className="mt-4 font-display text-4xl text-sapphire">Acceso administrativo</h1><p className="mt-3 text-sm leading-6 text-muted">Acceso privado para el equipo invitado. Si necesitas una cuenta, solicita una invitación al administrador.</p><LoginForm /></section></main>;
}
