"use server";

import { revalidatePath } from "next/cache";
import { DEPARTMENTS, LEVELS } from "@/lib/constants";
import { getSession, requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

function fail(message) {
  return { ok: false, message };
}

function touch() {
  ["/dashboard", "/dashboard/enrollment", "/dashboard/admin/courses"].forEach((path) => revalidatePath(path));
}

export async function enrollInCourse(formData) {
  const session = await getSession();
  if (!session.user) return fail("Sign in required.");
  if (session.profile?.role === "admin") return fail("Open enrollment from a student account.");

  const courseId = String(formData.get("course_id") || "");
  const term = String(formData.get("session") || "");
  const year = String(formData.get("year") || "");
  if (!courseId || !term || !year) return fail("Choose a course and a registered term.");

  const supabase = await createClient();
  const { data: student } = await supabase.from("students").select("department").ilike("email", session.user.email).maybeSingle();
  if (!student) return fail("Your academic profile is not ready yet.");

  const { data: registration } = await supabase
    .from("semester_registrations")
    .select("credits, level_term")
    .eq("user_id", session.user.id)
    .eq("session", term)
    .eq("year", year)
    .maybeSingle();
  if (!registration) return fail("Register that semester before choosing courses.");

  const { data: course } = await supabase.from("courses").select("*").eq("id", courseId).maybeSingle();
  if (!course) return fail("That course is no longer offered.");
  if (course.department !== student.department) return fail("That course is listed for another department.");
  if (course.level_term !== registration.level_term) return fail(`This course is for level ${course.level_term}.`);

  const { data: current } = await supabase
    .from("enrollments")
    .select("course_id")
    .eq("user_id", session.user.id)
    .eq("session", term)
    .eq("year", year);
  const ids = (current || []).map((row) => row.course_id);
  const { data: taken } = ids.length
    ? await supabase.from("courses").select("credit").in("id", ids)
    : { data: [] };
  const used = (taken || []).reduce((sum, row) => sum + Number(row.credit), 0);
  if (used + Number(course.credit) > Number(registration.credits) + 0.001) {
    return fail(`That would pass the ${registration.credits} credits registered for ${term} ${year}.`);
  }

  const { error } = await supabase.from("enrollments").insert({
    user_id: session.user.id,
    course_id: course.id,
    session: term,
    year,
  });
  if (error) return fail(error.code === "23505" ? "You are already enrolled in that course." : error.message);
  touch();
  return { ok: true, message: `Enrolled in ${course.code}.` };
}

export async function dropEnrollment(formData) {
  const session = await getSession();
  if (!session.user) return fail("Sign in required.");
  const supabase = await createClient();
  const { error } = await supabase
    .from("enrollments")
    .delete()
    .eq("user_id", session.user.id)
    .eq("course_id", String(formData.get("course_id") || ""))
    .eq("session", String(formData.get("session") || ""))
    .eq("year", String(formData.get("year") || ""));
  if (error) return fail(error.message);
  touch();
  return { ok: true, message: "Course dropped." };
}

export async function addCourse(formData) {
  const session = await requireAdmin();
  if (session.error) return fail(session.error);
  const code = String(formData.get("code") || "").trim();
  const title = String(formData.get("title") || "").trim();
  const department = String(formData.get("department") || "");
  const level = String(formData.get("level_term") || "");
  const credit = Number(formData.get("credit"));
  if (!code || !title || !DEPARTMENTS.some((item) => item.code === department)) return fail("Code, title, and department are required.");
  if (!LEVELS.some((item) => item.term === level)) return fail("Choose a level and term.");
  if (!credit || credit <= 0) return fail("Credit must be greater than zero.");

  const supabase = await createClient();
  const { error } = await supabase.from("courses").insert({ code, title, department, credit, level_term: level });
  if (error) return fail(error.code === "23505" ? "That course code is already in the department." : error.message);
  touch();
  return { ok: true, message: "Course added to the catalogue." };
}

export async function deleteCourse(id) {
  const session = await requireAdmin();
  if (session.error) return fail(session.error);
  const supabase = await createClient();
  const { error } = await supabase.from("courses").delete().eq("id", id);
  if (error) return fail(error.message);
  touch();
  return { ok: true, message: "Course removed." };
}
