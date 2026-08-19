"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function LogoutButton() {
  const router = useRouter();
  return <Button tone="secondary" onClick={async () => { await createSupabaseBrowserClient().auth.signOut(); router.replace("/admin/login"); router.refresh(); }}>Cerrar sesión</Button>;
}
