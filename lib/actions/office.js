"use server";

import { revalidatePath } from "next/cache";
import { CALENDAR_KINDS, DOCUMENT_KINDS, LEAVE_KINDS } from "@/lib/constants";
import { getSession, requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

function fail(message) {
  return { ok: false, message };
}

function touch() {
  [
    "/dashboard",
    "/dashboard/leave",
    "/dashboard/documents",
    "/dashboard/fees",
    "/dashboard/calendar",
    "/dashboard/admin/leave",
    "/dashboard/admin/documents",
    "/dashboard/admin/fees",
    "/dashboard/admin/calendar",
  ].forEach((path) => revalidatePath(path));
}

async function studentRow() {
  const session = await getSession();
  if (!session.user) return { error: "Sign in required." };
  if (session.profile?.role === "admin") return { error: "Open this from a student account." };
  const supabase = await createClient();
  const { data: student } = await supabase.from("students").select("*").ilike("email", session.user.email).maybeSingle();
  if (!student) return { error: "Your academic profile is not ready yet." };
  return { session, supabase, student };
}

export async function requestLeave(formData) {
  const loaded = await studentRow();
  if (loaded.error) return fail(loaded.error);
  const kind = String(formData.get("kind") || "");
  const start = String(formData.get("start_date") || "");
  const end = String(formData.get("end_date") || "");
  const reason = String(formData.get("reason") || "").trim();
  if (!LEAVE_KINDS.includes(kind) || !start || !end || !reason) return fail("Kind, dates, and a reason are required.");
  if (end < start) return fail("The end date has to be on or after the start date.");

  const { error } = await loaded.supabase.from("leave_requests").insert({
    user_id: loaded.session.user.id,
    student_id: loaded.student.student_id,
    name: loaded.student.name,
    department: loaded.student.department,
    kind,
    start_date: start,
    end_date: end,
    reason,
  });
  if (error) return fail(error.message);
  touch();
  return { ok: true, message: "Leave request sent to the registry." };
}

export async function reviewLeave(formData) {
  const session = await requireAdmin();
  if (session.error) return fail(session.error);
  const status = String(formData.get("status") || "");
  if (!["pending", "approved", "rejected"].includes(status)) return fail("Choose a status.");
  const supabase = await createClient();
  const { error } = await supabase
    .from("leave_requests")
    .update({ status, review_note: String(formData.get("review_note") || "").trim() })
    .eq("id", String(formData.get("id") || ""));
  if (error) return fail(error.message);
  touch();
  return { ok: true, message: "Leave updated." };
}

export async function requestDocument(formData) {
  const loaded = await studentRow();
  if (loaded.error) return fail(loaded.error);
  const kind = String(formData.get("kind") || "");
  const copies = Number(formData.get("copies") || 1);
  const purpose = String(formData.get("purpose") || "").trim();
  if (!DOCUMENT_KINDS.includes(kind) || !purpose) return fail("Choose a document and say what it is for.");
  if (!copies || copies < 1 || copies > 5) return fail("Copies must be between 1 and 5.");

  const { error } = await loaded.supabase.from("document_requests").insert({
    user_id: loaded.session.user.id,
    student_id: loaded.student.student_id,
    name: loaded.student.name,
    department: loaded.student.department,
    kind,
    copies,
    purpose,
  });
  if (error) return fail(error.message);
  touch();
  return { ok: true, message: "Document request sent to the registry." };
}

export async function reviewDocument(formData) {
  const session = await requireAdmin();
  if (session.error) return fail(session.error);
  const status = String(formData.get("status") || "");
  if (!["pending", "ready", "collected", "rejected"].includes(status)) return fail("Choose a status.");
  const supabase = await createClient();
  const { error } = await supabase
    .from("document_requests")
    .update({ status, review_note: String(formData.get("review_note") || "").trim() })
    .eq("id", String(formData.get("id") || ""));
  if (error) return fail(error.message);
  touch();
  return { ok: true, message: "Document request updated." };
}

export async function addFee(formData) {
  const session = await requireAdmin();
  if (session.error) return fail(session.error);
  const email = String(formData.get("student_email") || "").trim().toLowerCase();
  const title = String(formData.get("title") || "").trim();
  const amount = Number(formData.get("amount"));
  const paid = Number(formData.get("paid") || 0);
  if (!email || !title || !amount || amount < 0) return fail("Student email, title, and amount are required.");
  if (paid < 0 || paid > amount) return fail("Paid cannot be above the amount.");

  const supabase = await createClient();
  const { data: student } = await supabase.from("students").select("name, student_id, email").ilike("email", email).maybeSingle();
  if (!student) return fail("No student uses that email.");

  const { error } = await supabase.from("fees").insert({
    student_email: student.email,
    student_id: student.student_id,
    name: student.name,
    title,
    session: String(formData.get("session") || ""),
    year: String(formData.get("year") || ""),
    amount,
    paid,
    due_date: String(formData.get("due_date") || "") || null,
  });
  if (error) return fail(error.message);
  touch();
  return { ok: true, message: "Fee added." };
}

export async function recordPayment(formData) {
  const session = await requireAdmin();
  if (session.error) return fail(session.error);
  const paid = Number(formData.get("paid"));
  if (Number.isNaN(paid) || paid < 0) return fail("Enter the amount received.");
  const supabase = await createClient();
  const { data: fee } = await supabase.from("fees").select("amount").eq("id", String(formData.get("id") || "")).maybeSingle();
  if (!fee) return fail("That fee is no longer on the ledger.");
  if (paid > Number(fee.amount)) return fail("Paid cannot be above the amount due.");
  const { error } = await supabase.from("fees").update({ paid }).eq("id", String(formData.get("id") || ""));
  if (error) return fail(error.message);
  touch();
  return { ok: true, message: "Payment recorded." };
}

export async function deleteFee(id) {
  const session = await requireAdmin();
  if (session.error) return fail(session.error);
  const supabase = await createClient();
  const { error } = await supabase.from("fees").delete().eq("id", id);
  if (error) return fail(error.message);
  touch();
  return { ok: true, message: "Fee removed." };
}

export async function addEvent(formData) {
  const session = await requireAdmin();
  if (session.error) return fail(session.error);
  const title = String(formData.get("title") || "").trim();
  const category = String(formData.get("category") || "");
  const eventDate = String(formData.get("event_date") || "");
  if (!title || !CALENDAR_KINDS.includes(category) || !eventDate) return fail("Title, category, and date are required.");
  const supabase = await createClient();
  const { error } = await supabase.from("calendar_events").insert({
    title,
    category,
    event_date: eventDate,
    detail: String(formData.get("detail") || "").trim(),
  });
  if (error) return fail(error.message);
  touch();
  return { ok: true, message: "Date added to the calendar." };
}

export async function deleteEvent(id) {
  const session = await requireAdmin();
  if (session.error) return fail(session.error);
  const supabase = await createClient();
  const { error } = await supabase.from("calendar_events").delete().eq("id", id);
  if (error) return fail(error.message);
  touch();
  return { ok: true, message: "Date removed." };
}
