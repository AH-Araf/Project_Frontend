import { isConfigured } from "@/lib/config";
import { createClient } from "@/lib/supabase/server";

export async function query(run) {
  if (!isConfigured()) return { data: [], configured: false, error: null };

  try {
    const supabase = await createClient();
    const { data, error } = await run(supabase);
    if (error) return { data: [], configured: true, error: error.message };
    return { data: data ?? [], configured: true, error: null };
  } catch (error) {
    return { data: [], configured: true, error: error.message || "Could not reach Supabase." };
  }
}

export async function queryOne(run) {
  const result = await query(run);
  const row = Array.isArray(result.data) ? result.data[0] ?? null : result.data;
  return { ...result, data: row };
}
