import { query } from "@/lib/data";
import { calculateGpa } from "@/lib/gpa";

export async function loadDeskGaps() {
  const [registrations, enrollments, results, admissions, leaves, documents] = await Promise.all([
    query((supabase) => supabase.from("semester_registrations").select("id, user_id, name, student_id, session, year, level_term")),
    query((supabase) => supabase.from("enrollments").select("user_id, session, year")),
    query((supabase) => supabase.from("results").select("id, student_id, student_email, session, year, gpa, subjects")),
    query((supabase) => supabase.from("admissions").select("id")),
    query((supabase) => supabase.from("leave_requests").select("id").eq("status", "pending")),
    query((supabase) => supabase.from("document_requests").select("id").eq("status", "pending")),
  ]);

  const covered = new Set((enrollments.data || []).map((row) => `${row.user_id}|${row.session}|${row.year}`));
  const unenrolled = (registrations.data || []).filter((row) => !covered.has(`${row.user_id}|${row.session}|${row.year}`));
  const mismatches = (results.data || []).filter((row) => {
    const expected = calculateGpa(row.subjects || []);
    return Math.abs(expected - Number(row.gpa)) > 0.02;
  }).map((row) => ({ ...row, expected: calculateGpa(row.subjects || []) }));

  return {
    unenrolled,
    mismatches,
    admissions: (admissions.data || []).length,
    pendingLeave: (leaves.data || []).length,
    pendingDocuments: (documents.data || []).length,
    error: registrations.error || enrollments.error || results.error,
  };
}
