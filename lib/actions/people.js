"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { uploadMedia } from "@/lib/storage";

function fail(message) {
  return { ok: false, message };
}

export async function applyForAdmission(formData) {
  const admin = createAdminClient();
  if (!admin) return fail("Add SUPABASE_SERVICE_ROLE_KEY in .env so public applications can be saved.");

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const subject = String(formData.get("subject") || "").trim();
  if (!name || !email || !subject) return fail("Name, email, and programme are required.");

  const photo = await uploadMedia(admin, formData.get("photo"), "admissions");
  if (photo.error) return fail(photo.error);

  const { error } = await admin.from("admissions").insert({
    photo_url: photo.url,
    name,
    age: String(formData.get("age") || "").trim(),
    phone: String(formData.get("phone") || "").trim(),
    email,
    address: String(formData.get("address") || "").trim(),
    ssc_result: String(formData.get("ssc_result") || "").trim(),
    hsc_result: String(formData.get("hsc_result") || "").trim(),
    subject,
    board: String(formData.get("board") || "").trim(),
    transaction_number: String(formData.get("transaction_number") || "").trim(),
    transaction_id: String(formData.get("transaction_id") || "").trim(),
  });

  if (error) return fail(error.message);
  revalidatePath("/dashboard/admin/admissions");
  return { ok: true, message: "Application received. The admission office will review it." };
}

export async function deleteAdmission(id) {
  const session = await requireAdmin();
  if (session.error) return fail(session.error);
  const supabase = await createClient();
  const { error } = await supabase.from("admissions").delete().eq("id", id);
  if (error) return fail(error.message);
  revalidatePath("/dashboard/admin/admissions");
  return { ok: true, message: "Removed." };
}

export async function createStudent(formData) {
  const session = await requireAdmin();
  if (session.error) return fail(session.error);

  const admin = createAdminClient();
  if (!admin) return fail("Add SUPABASE_SERVICE_ROLE_KEY in .env. It is required to create login accounts.");

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const studentId = String(formData.get("student_id") || "").trim();
  const department = String(formData.get("department") || "").trim();

  if (!name || !email || !studentId || !department) return fail("Name, email, student ID, and department are required.");
  if (password.length < 6) return fail("Password must be at least 6 characters.");

  const photo = await uploadMedia(admin, formData.get("photo"), "students");
  if (photo.error) return fail(photo.error);

  const { data: created, error: authError } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name, role: "student" },
  });

  if (authError) return fail(authError.message);

  const { error } = await admin.from("students").insert({
    user_id: created.user.id,
    name,
    student_id: studentId,
    department,
    enrolled_semester: String(formData.get("enrolled_semester") || "").trim(),
    email,
    religion: String(formData.get("religion") || "").trim(),
    blood_group: String(formData.get("blood_group") || "").trim(),
    nationality: String(formData.get("nationality") || "").trim(),
    mobile: String(formData.get("mobile") || "").trim(),
    gender: String(formData.get("gender") || "").trim(),
    fathers_name: String(formData.get("fathers_name") || "").trim(),
    mothers_name: String(formData.get("mothers_name") || "").trim(),
    guardian: String(formData.get("guardian") || "").trim(),
    guardians_number: String(formData.get("guardians_number") || "").trim(),
    guardians_email: String(formData.get("guardians_email") || "").trim(),
    address: String(formData.get("address") || "").trim(),
    date_of_birth: String(formData.get("date_of_birth") || "").trim(),
    photo_url: photo.url,
  });

  if (error) return fail(error.code === "23505" ? "That email or student ID is already in use." : error.message);

  revalidatePath("/dashboard/admin/students");
  return { ok: true, message: "Student account and profile created." };
}

export async function createStaff(formData) {
  const session = await requireAdmin();
  if (session.error) return fail(session.error);
  const admin = createAdminClient();
  if (!admin) return fail("Add SUPABASE_SERVICE_ROLE_KEY in .env.");

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  if (!name || !email) return fail("Name and email are required.");
  if (password.length < 6) return fail("Password must be at least 6 characters.");

  const { error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name, role: "admin" },
  });

  if (error) return fail(error.message);
  return { ok: true, message: "Staff account created. They can sign in from the login page." };
}

export async function deleteStudent(id) {
  const session = await requireAdmin();
  if (session.error) return fail(session.error);
  const admin = createAdminClient();
  const supabase = admin || (await createClient());

  const { data: student } = await supabase.from("students").select("user_id").eq("id", id).maybeSingle();
  const { error } = await supabase.from("students").delete().eq("id", id);
  if (error) return fail(error.message);

  if (admin && student?.user_id) {
    await admin.auth.admin.deleteUser(student.user_id);
  }

  revalidatePath("/dashboard/admin/students");
  return { ok: true, message: "Student removed." };
}
