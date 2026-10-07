"use server";

import { revalidatePath } from "next/cache";
import { isConfigured } from "@/lib/config";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { uploadMedia } from "@/lib/storage";

async function asAdmin() {
  const session = await requireAdmin();
  if (session.error) return { session, supabase: null };
  return { session, supabase: await createClient() };
}

function fail(message) {
  return { ok: false, message };
}

export async function addFaculty(formData) {
  const { session, supabase } = await asAdmin();
  if (session.error) return fail(session.error);

  const photo = await uploadMedia(supabase, formData.get("photo"), "faculty");
  if (photo.error) return fail(photo.error);

  const { error } = await supabase.from("faculty").insert({
    name: String(formData.get("name") || "").trim(),
    designation: String(formData.get("designation") || "").trim(),
    phone: String(formData.get("phone") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    education_bsc: String(formData.get("education_bsc") || "").trim(),
    education_msc: String(formData.get("education_msc") || "").trim(),
    education_phd: String(formData.get("education_phd") || "").trim(),
    department: String(formData.get("department") || "").trim(),
    publication_a: String(formData.get("publication_a") || "").trim(),
    publication_b: String(formData.get("publication_b") || "").trim(),
    publication_c: String(formData.get("publication_c") || "").trim(),
    photo_url: photo.url,
  });

  if (error) return fail(error.message);
  revalidatePath("/faculty");
  revalidatePath("/dashboard/admin/faculty");
  return { ok: true, message: "Faculty member added." };
}

export async function deleteFaculty(id) {
  const { session, supabase } = await asAdmin();
  if (session.error) return fail(session.error);
  const { error } = await supabase.from("faculty").delete().eq("id", id);
  if (error) return fail(error.message);
  revalidatePath("/faculty");
  revalidatePath("/dashboard/admin/faculty");
  return { ok: true, message: "Removed." };
}

export async function addGalleryItem(formData) {
  const { session, supabase } = await asAdmin();
  if (session.error) return fail(session.error);

  const photo = await uploadMedia(supabase, formData.get("photo"), "gallery");
  if (photo.error) return fail(photo.error);
  if (!photo.url) return fail("Choose an image.");

  const { error } = await supabase.from("gallery").insert({
    title: String(formData.get("title") || "").trim(),
    description: String(formData.get("description") || "").trim(),
    image_url: photo.url,
  });

  if (error) return fail(error.message);
  revalidatePath("/gallery");
  revalidatePath("/dashboard/admin/gallery");
  return { ok: true, message: "Image added." };
}

export async function deleteGalleryItem(id) {
  const { session, supabase } = await asAdmin();
  if (session.error) return fail(session.error);
  const { error } = await supabase.from("gallery").delete().eq("id", id);
  if (error) return fail(error.message);
  revalidatePath("/gallery");
  revalidatePath("/dashboard/admin/gallery");
  return { ok: true, message: "Removed." };
}

export async function addNotice(formData) {
  const { session, supabase } = await asAdmin();
  if (session.error) return fail(session.error);

  const title = String(formData.get("title") || "").trim();
  if (!title) return fail("A title is required.");

  const { error } = await supabase.from("notices").insert({
    category: String(formData.get("category") || "Others"),
    title,
    notice_date: String(formData.get("notice_date") || new Date().toISOString().slice(0, 10)),
    link: String(formData.get("link") || "").trim() || null,
    description: String(formData.get("description") || "").trim(),
  });

  if (error) return fail(error.message);
  revalidatePath("/notices");
  revalidatePath("/");
  revalidatePath("/dashboard/admin/notices");
  return { ok: true, message: "Notice published." };
}

export async function deleteNotice(id) {
  const { session, supabase } = await asAdmin();
  if (session.error) return fail(session.error);
  const { error } = await supabase.from("notices").delete().eq("id", id);
  if (error) return fail(error.message);
  revalidatePath("/notices");
  revalidatePath("/");
  revalidatePath("/dashboard/admin/notices");
  return { ok: true, message: "Removed." };
}

export async function addCertificate(formData) {
  const { session, supabase } = await asAdmin();
  if (session.error) return fail(session.error);

  const photo = await uploadMedia(supabase, formData.get("photo"), "certificates");
  if (photo.error) return fail(photo.error);

  const studentId = String(formData.get("student_id") || "").trim();
  const department = String(formData.get("department") || "").trim();
  const studentName = String(formData.get("student_name") || "").trim();
  if (!studentName || !studentId || !department) return fail("Name, ID, and department are required.");

  const { error } = await supabase.from("certificates").insert({
    student_name: studentName,
    student_id: studentId,
    session: String(formData.get("session") || "").trim(),
    cgpa: String(formData.get("cgpa") || "").trim(),
    department,
    image_url: photo.url,
  });

  if (error) return fail(error.code === "23505" ? "A certificate for that ID and department already exists." : error.message);
  revalidatePath("/dashboard/admin/certificates");
  return { ok: true, message: "Certificate recorded." };
}

export async function deleteCertificate(id) {
  const { session, supabase } = await asAdmin();
  if (session.error) return fail(session.error);
  const { error } = await supabase.from("certificates").delete().eq("id", id);
  if (error) return fail(error.message);
  revalidatePath("/dashboard/admin/certificates");
  return { ok: true, message: "Removed." };
}

export async function verifyCertificate(formData) {
  if (!isConfigured()) return { ok: false, message: "Add your Supabase keys in .env before verifying certificates." };
  const department = String(formData.get("department") || "").trim();
  const studentId = String(formData.get("student_id") || "").trim();
  if (!department || !studentId) return { ok: false, message: "Choose a department and enter a student ID." };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .eq("department", department)
    .eq("student_id", studentId)
    .maybeSingle();

  if (error) return { ok: false, message: error.message };
  if (!data) return { ok: false, message: "No certificate matches that department and ID." };

  const QRCode = (await import("qrcode")).default;
  const summary = `BAIUST certificate\n${data.student_name}\n${data.student_id}\n${data.department}\n${data.session || ""}\nCGPA ${data.cgpa || "—"}`;
  const qr = await QRCode.toDataURL(summary, { margin: 1, width: 180 });
  return { ok: true, certificate: data, qr };
}
