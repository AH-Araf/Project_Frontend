import { isConfigured } from "@/lib/config";
import { createClient } from "@/lib/supabase/server";

export async function getSession() {
  if (!isConfigured()) return { user: null, profile: null, configured: false };

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { user: null, profile: null, configured: true };

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  return { user, profile, configured: true };
}

export async function requireAdmin() {
  const session = await getSession();
  if (!session.configured) return { ...session, error: "Add your Supabase keys in .env first." };
  if (!session.user) return { ...session, error: "Sign in required." };
  if (session.profile?.role !== "admin") return { ...session, error: "Only staff can do that." };
  return { ...session, error: null };
}
