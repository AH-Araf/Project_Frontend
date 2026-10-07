import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { query, queryOne } from "@/lib/data";

export async function guardAdmin() {
  const session = await getSession();
  if (!session.configured) return session;
  if (!session.user) redirect("/login");
  if (session.profile?.role !== "admin") redirect("/dashboard");
  return session;
}

export async function loadStudent() {
  const session = await getSession();
  if (!session.user) return { session, student: null, registrations: [], results: [] };

  const studentResult = await queryOne((supabase) =>
    supabase.from("students").select("*").ilike("email", session.user.email).maybeSingle()
  );

  const student = studentResult.data && !Array.isArray(studentResult.data) ? studentResult.data : null;

  const [registrations, results] = student
    ? await Promise.all([
        query((supabase) =>
          supabase.from("semester_registrations").select("*").eq("user_id", session.user.id).order("created_at", { ascending: false })
        ),
        query((supabase) =>
          supabase.from("results").select("*").ilike("student_email", session.user.email).order("year", { ascending: false })
        ),
      ])
    : [{ data: [] }, { data: [] }];

  return {
    session,
    student,
    registrations: registrations.data || [],
    results: results.data || [],
    error: studentResult.error,
  };
}
