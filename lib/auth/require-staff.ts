import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function requireStaff() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const { data: profile } = await supabase.from("profiles").select("id, full_name, email, role, is_active").eq("id", user.id).maybeSingle();
  if (!profile?.is_active || !["admin", "manager"].includes(profile.role)) {
    await supabase.auth.signOut();
    redirect("/admin/login?error=unauthorized");
  }
  return { supabase, user, profile };
}
