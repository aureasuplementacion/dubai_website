"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setLoading(true);
    try { const result = await createSupabaseBrowserClient().auth.signInWithPassword({ email, password }); if (result.error) throw result.error; router.push("/admin/dashboard"); router.refresh(); }
    catch { setError("No se ha podido iniciar sesión. Comprueba tus credenciales o contacta con el administrador."); }
    finally { setLoading(false); }
  }
  return <form onSubmit={handleSubmit} className="mt-8 space-y-4">
    <label className="block text-sm font-medium text-sapphire">Email<input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-xl border border-border px-4 py-3" /></label>
    <label className="block text-sm font-medium text-sapphire">Contraseña<input required type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-border px-4 py-3" /></label>
    {error ? <p role="alert" className="text-sm text-red-700">{error}</p> : null}
    <Button type="submit" disabled={loading} className="w-full">{loading ? "Comprobando…" : "Entrar"}</Button>
  </form>;
}
