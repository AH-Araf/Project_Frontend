"use server";

import { revalidatePath } from "next/cache";
import { LEVELS, ROUTES } from "@/lib/constants";
import { calculateGpa } from "@/lib/gpa";
import { getSession, requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

function fail(message) {
  return { ok: false, message };
}

export async function registerSemester(formData) {
  const session = await getSession();
  if (!session.user) return fail("Sign in required.");

  const supabase = await createClient();
  const { data: student } = await supabase
    .from("students")
    .select("*")
    .eq("email", session.user.email)
    .maybeSingle();

  if (!student) return fail("Your academic profile is not ready yet. Ask the registry to create it.");

  const level = String(formData.get("level_term") || "");
  const term = LEVELS.find((item) => item.term === level);
  if (!term) return fail("Choose a level and term.");

  const { error } = await supabase.from("semester_registrations").insert({
    user_id: session.user.id,
    student_record_id: student.id,
    name: student.name,
    student_id: student.student_id,
    department: student.department,
    mobile: student.mobile,
    session: String(formData.get("session") || ""),
    year: String(formData.get("year") || ""),
    level_term: term.term,
    credits: term.credits,
  });

  if (error) {
    return fail(error.code === "23505" ? "You are already registered for that session." : error.message);
  }

  revalidatePath("/dashboard/semester");
  return { ok: true, message: `Registered for ${term.term} · ${term.credits} credits.` };
}

export async function openTransportWindow(formData) {
  const session = await requireAdmin();
  if (session.error) return fail(session.error);
  const supabase = await createClient();

  const { error } = await supabase.from("transport_windows").insert({
    session: String(formData.get("session") || ""),
    year: String(formData.get("year") || ""),
    start_date: String(formData.get("start_date") || "") || null,
    end_date: String(formData.get("end_date") || "") || null,
    description: String(formData.get("description") || "").trim(),
  });

  if (error) return fail(error.message);
  revalidatePath("/dashboard/admin/transport");
  revalidatePath("/dashboard/transport");
  return { ok: true, message: "Transport registration is open." };
}

export async function deleteTransportWindow(id) {
  const session = await requireAdmin();
  if (session.error) return fail(session.error);
  const supabase = await createClient();
  const { error } = await supabase.from("transport_windows").delete().eq("id", id);
  if (error) return fail(error.message);
  revalidatePath("/dashboard/admin/transport");
  revalidatePath("/dashboard/transport");
  return { ok: true, message: "Removed." };
}

export async function applyForTransport(formData) {
  const session = await getSession();
  if (!session.user) return fail("Sign in required.");

  const supabase = await createClient();
  const windowId = String(formData.get("window_id") || "");
  const pickup = String(formData.get("pickup_point") || "");
  const route = ROUTES.find((item) => item.name === pickup);
  if (!route) return fail("Choose a pickup point.");

  const [{ data: student }, { data: windowRow }] = await Promise.all([
    supabase.from("students").select("*").eq("email", session.user.email).maybeSingle(),
    supabase.from("transport_windows").select("*").eq("id", windowId).maybeSingle(),
  ]);

  if (!student) return fail("Your academic profile is not ready yet.");
  if (!windowRow) return fail("That transport window is no longer open.");

  const { error } = await supabase.from("transport_cards").insert({
    user_id: session.user.id,
    window_id: windowRow.id,
    session: windowRow.session,
    year: windowRow.year,
    start_date: windowRow.start_date,
    end_date: windowRow.end_date,
    pickup_point: route.name,
    fee: route.fee,
    applicant: {
      name: student.name,
      student_id: student.student_id,
      department: student.department,
      mobile: student.mobile,
      photo_url: student.photo_url,
      email: student.email,
    },
  });

  if (error) {
    return fail(error.code === "23505" ? "You already applied for this window." : error.message);
  }

  revalidatePath("/dashboard/transport");
  revalidatePath("/dashboard/admin/transport-cards");
  return { ok: true, message: "Transport card requested." };
}

export async function saveResult(formData) {
  const session = await requireAdmin();
  if (session.error) return fail(session.error);

  let subjects = [];
  try {
    subjects = JSON.parse(String(formData.get("subjects") || "[]"));
  } catch {
    return fail("Subject details could not be read.");
  }

  subjects = subjects
    .map((subject) => ({
      name: String(subject.name || "").trim(),
      credit: Number(subject.credit),
      marks: Number(subject.marks),
    }))
    .filter((subject) => subject.name);

  if (!subjects.length) return fail("Add at least one subject.");
  if (subjects.some((subject) => !subject.credit || Number.isNaN(subject.marks))) {
    return fail("Every subject needs a name, credit, and mark.");
  }

  const studentId = String(formData.get("student_id") || "").trim();
  const studentEmail = String(formData.get("student_email") || "").trim().toLowerCase();
  const term = String(formData.get("session") || "");
  const year = String(formData.get("year") || "");
  if (!studentId || !studentEmail || !term || !year) return fail("Student ID, email, session, and year are required.");

  const supabase = await createClient();
  const { error } = await supabase.from("results").insert({
    student_id: studentId,
    student_email: studentEmail,
    session: term,
    year,
    subjects,
    gpa: calculateGpa(subjects),
  });

  if (error) return fail(error.message);
  revalidatePath("/dashboard/admin/results");
  revalidatePath("/dashboard/results");
  revalidatePath("/dashboard/transcript");
  return { ok: true, message: "Result saved." };
}

export async function correctResultGpa(id) {
  const session = await requireAdmin();
  if (session.error) return fail(session.error);
  const supabase = await createClient();
  const { data: row } = await supabase.from("results").select("subjects").eq("id", id).maybeSingle();
  if (!row) return fail("That result is no longer on file.");
  const gpa = calculateGpa(row.subjects || []);
  const { error } = await supabase.from("results").update({ gpa }).eq("id", id);
  if (error) return fail(error.message);
  revalidatePath("/dashboard/admin/results");
  revalidatePath("/dashboard/admin/assistant");
  revalidatePath("/dashboard/results");
  revalidatePath("/dashboard/transcript");
  return { ok: true, message: `GPA set to ${gpa.toFixed(2)} from the stored marks.` };
}

export async function deleteResult(id) {
  const session = await requireAdmin();
  if (session.error) return fail(session.error);
  const supabase = await createClient();
  const { error } = await supabase.from("results").delete().eq("id", id);
  if (error) return fail(error.message);
  revalidatePath("/dashboard/admin/results");
  revalidatePath("/dashboard/results");
  revalidatePath("/dashboard/transcript");
  return { ok: true, message: "Removed." };
}
