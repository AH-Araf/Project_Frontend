"use server";

import { redirect } from "next/navigation";
import { isConfigured } from "@/lib/config";
import { createClient } from "@/lib/supabase/server";

export async function signIn(formData) {
  if (!isConfigured()) return { ok: false, message: "Add your Supabase keys in .env, then try again." };
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const next = String(formData.get("next") || "/dashboard");

  if (!email || !password) return { ok: false, message: "Enter your email and password." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { ok: false, message: "Those details were not recognised." };

  redirect(next.startsWith("/") ? next : "/dashboard");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
