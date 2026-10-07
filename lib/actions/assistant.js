"use server";

import { revalidatePath } from "next/cache";
import { NOTICE_TYPES, SESSIONS } from "@/lib/constants";
import { loadDeskGaps } from "@/lib/desk";
import { complete } from "@/lib/ai";
import { readJson } from "@/lib/gemini";
import { contextFrom, indexNotice, rebuildIndex, refreshStudent, retrieve } from "@/lib/rag";
import { calculateGpa } from "@/lib/gpa";
import { getSession, requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

function fail(message) {
  return { ok: false, message };
}

function spoken(result) {
  if (!result.ok) return fail(result.message);
  const via = result.via === "gemini" ? "Gemini" : "local model";
  return { ok: true, message: `${result.text}\n\n(${via})` };
}

export async function askStudentAssistant(formData) {
  const session = await getSession();
  if (!session.user) return fail("Sign in required.");
  if (session.profile?.role === "admin") return fail("Open the registry assistant from a staff account.");
  const question = String(formData.get("question") || "").trim();
  if (question.length < 4) return fail("Ask a question about your record.");

  const found = await retrieve(question, 8);
  if (!found.ok) return fail(found.message);
  if (!found.chunks.length) {
    return fail("Nothing in the index matched. Ask the registry to rebuild the assistant index if your record was added recently.");
  }

  const answer = await complete(
    `You are the BAIUST student desk in Cumilla. You are shown only the retrieved excerpts, not the full database. Answer only from those excerpts. If they do not contain the fact, say it is not in the records you were shown. Do not invent grades, fees, or dates. Keep the answer under 120 words.\n\nEXCERPTS:\n${contextFrom(found.chunks)}\n\nQUESTION:\n${question}`
  );
  return spoken(answer);
}

export async function draftNotice(formData) {
  const session = await requireAdmin();
  if (session.error) return fail(session.error);
  const instruction = String(formData.get("instruction") || "").trim();
  if (instruction.length < 8) return fail("Say what the notice should announce.");

  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Dhaka" });
  const found = await retrieve(instruction, 4);
  const examples = found.ok ? found.chunks.filter((chunk) => chunk.source === "notice").slice(0, 3) : [];
  const answer = await complete(
    `Write one notice for Bangladesh Army International University of Science and Technology.\nReturn JSON only: {"category":"Exam|Transport|Hall|Others","title":"string","description":"string","notice_date":"YYYY-MM-DD"}\nToday is ${today}. Use one of these categories only: ${NOTICE_TYPES.join(", ")}.\nMatch the tone of the retrieved notices when any are shown. Do not copy them.\n\nRETRIEVED NOTICES:\n${examples.length ? contextFrom(examples) : "None."}\n\nInstruction: ${instruction}`,
    { json: true }
  );
  if (!answer.ok) return fail(answer.message);

  let notice;
  try {
    notice = readJson(answer.text);
  } catch {
    return fail("The draft could not be read. Try a shorter instruction.");
  }

  const category = NOTICE_TYPES.includes(notice.category) ? notice.category : "Others";
  const title = String(notice.title || "").trim();
  const description = String(notice.description || "").trim();
  const noticeDate = /^\d{4}-\d{2}-\d{2}$/.test(String(notice.notice_date || "")) ? notice.notice_date : today;
  if (!title || !description) return fail("The draft was missing a title or text.");

  const supabase = await createClient();
  const { data: posted, error } = await supabase.from("notices").insert({
    category,
    title,
    description,
    notice_date: noticeDate,
  }).select("id, category, title, description, notice_date").single();
  if (error) return fail(error.message);
  await indexNotice(posted);
  revalidatePath("/dashboard/admin/notices");
  revalidatePath("/dashboard/admin/assistant");
  revalidatePath("/notices");
  revalidatePath("/dashboard");
  return { ok: true, message: `Notice posted: ${title}` };
}

export async function readMarkSheet(formData) {
  const session = await requireAdmin();
  if (session.error) return fail(session.error);
  const studentId = String(formData.get("student_id") || "").trim();
  const studentEmail = String(formData.get("student_email") || "").trim().toLowerCase();
  const term = String(formData.get("session") || "");
  const year = String(formData.get("year") || "");
  const sheet = String(formData.get("sheet") || "").trim();
  if (!studentId || !studentEmail || !SESSIONS.includes(term) || !year) return fail("Student, session, and year are required.");
  if (sheet.length < 8) return fail("Paste the mark sheet.");

  const answer = await complete(
    `Extract subject results from the mark sheet. Return JSON only: {"subjects":[{"name":"string","credit":number,"marks":number}]}\nMarks are out of 100. Do not invent a subject that is not written in the sheet. If credit is missing, use 3.\n\nSHEET:\n${sheet.slice(0, 4000)}`,
    { json: true }
  );
  if (!answer.ok) return fail(answer.message);

  let parsed;
  try {
    parsed = readJson(answer.text);
  } catch {
    return fail("The mark sheet could not be read. Use lines like: Subject, credit, marks.");
  }

  const subjects = (Array.isArray(parsed.subjects) ? parsed.subjects : [])
    .map((subject) => ({
      name: String(subject.name || "").trim(),
      credit: Number(subject.credit),
      marks: Number(subject.marks),
    }))
    .filter((subject) => subject.name);

  if (!subjects.length) return fail("No subjects were found in that sheet.");
  if (subjects.some((subject) => !subject.credit || Number.isNaN(subject.marks) || subject.marks < 0 || subject.marks > 100)) {
    return fail("Each subject needs a credit and a mark from 0 to 100.");
  }

  const supabase = await createClient();
  const { data: student } = await supabase.from("students").select("student_id, email").ilike("email", studentEmail).maybeSingle();
  if (!student) return fail("No student uses that email.");

  const { error } = await supabase.from("results").insert({
    student_id: student.student_id || studentId,
    student_email: student.email,
    session: term,
    year,
    subjects,
    gpa: calculateGpa(subjects),
  });
  if (error) return fail(error.message);
  const indexed = await refreshStudent(student.email);
  revalidatePath("/dashboard/admin/results");
  revalidatePath("/dashboard/results");
  revalidatePath("/dashboard/transcript");
  revalidatePath("/dashboard/admin/assistant");
  const indexNote = indexed.ok ? " The assistant index includes this result." : "";
  return { ok: true, message: `Result saved. GPA ${calculateGpa(subjects).toFixed(2)} from ${subjects.length} subjects.${indexNote}` };
}

export async function summarizeAdmission(formData) {
  const session = await requireAdmin();
  if (session.error) return fail(session.error);
  const id = String(formData.get("id") || "");
  const supabase = await createClient();
  const { data: row } = await supabase.from("admissions").select("name, age, phone, email, address, ssc_result, hsc_result, subject, board, transaction_number, transaction_id").eq("id", id).maybeSingle();
  if (!row) return fail("That application is no longer here.");

  const answer = await complete(
    `Write a registry note of at most 80 words on this BAIUST admission file. Say whether the file looks complete and what the office should check next. Do not invent scores or documents that are not in the file.\n\nFILE:\n${JSON.stringify(row)}`
  );
  return spoken(answer);
}

export async function writeDeskNote() {
  const session = await requireAdmin();
  if (session.error) return fail(session.error);
  const gaps = await loadDeskGaps();
  const facts = {
    applications: gaps.admissions,
    pendingLeave: gaps.pendingLeave,
    pendingDocuments: gaps.pendingDocuments,
    registeredWithoutCourses: gaps.unenrolled.length,
    registeredWithoutCoursesSample: gaps.unenrolled.slice(0, 8).map((row) => `${row.name} ${row.session} ${row.year} level ${row.level_term}`),
    gpaMismatches: gaps.mismatches.length,
    gpaMismatchSample: gaps.mismatches.slice(0, 8).map((row) => `${row.student_id} ${row.session} ${row.year} stored ${row.gpa} calculated ${row.expected}`),
  };
  const answer = await complete(
    `Write a morning note of at most 110 words for the BAIUST registry in Cumilla. Use only these facts. Counts are the full totals. Each sample list holds at most 8 names, so do not treat a sample as everyone in that queue. Do not invent counts or names. Mention the queues that are not empty.\n\nFACTS:\n${JSON.stringify(facts)}`
  );
  return spoken(answer);
}

export async function askRegistry(formData) {
  const session = await requireAdmin();
  if (session.error) return fail(session.error);
  const question = String(formData.get("question") || "").trim();
  if (question.length < 4) return fail("Ask about a student, course, notice, or date.");

  const found = await retrieve(question, 8);
  if (!found.ok) return fail(found.message);
  if (!found.chunks.length) {
    return fail("Nothing in the index matched. Rebuild the index, then ask again.");
  }

  const answer = await complete(
    `You are the BAIUST registry assistant. You are shown only the retrieved excerpts from a larger set of student and campus records. Answer only from those excerpts. If a person or fact is missing, say they were not in the retrieved records. Do not invent counts for the whole university. Keep the answer under 140 words.\n\nEXCERPTS:\n${contextFrom(found.chunks)}\n\nQUESTION:\n${question}`
  );
  return spoken(answer);
}

export async function rebuildAssistantIndex() {
  const session = await requireAdmin();
  if (session.error) return fail(session.error);
  const result = await rebuildIndex();
  if (result.ok) revalidatePath("/dashboard/admin/assistant");
  return result;
}

export async function adviseEnrollment() {
  const session = await getSession();
  if (!session.user) return fail("Sign in required.");
  if (session.profile?.role === "admin") return fail("Open enrollment from a student account.");

  const supabase = await createClient();
  const [{ data: student }, { data: regs }] = await Promise.all([
    supabase.from("students").select("name, department, email").ilike("email", session.user.email).maybeSingle(),
    supabase.from("semester_registrations").select("session, year, level_term, credits").eq("user_id", session.user.id),
  ]);
  if (!student) return fail("A student profile is required.");
  if (!regs?.length) return fail("Register a semester before asking for a course suggestion.");

  const latest = [...regs].sort((a, b) => String(b.year).localeCompare(String(a.year)))[0];
  const found = await retrieve(`${student.department} courses level ${latest.level_term} ${student.name} enrollment`, 8);
  if (!found.ok) return fail(found.message);
  if (!found.chunks.length) return fail("The course index is empty. Ask the registry to rebuild it.");

  const facts = regs.map((row) => `${row.session} ${row.year} level ${row.level_term}, credit cap ${row.credits}`).join("; ");
  return spoken(await complete(
    `Suggest courses this student can still enroll. Use only courses in the excerpts for ${student.department}, level ${latest.level_term}. Stay inside the credit cap. Skip a course the student excerpt already lists as enrolled. Under 90 words.\n\nREGISTRATIONS:\n${facts}\n\nEXCERPTS:\n${contextFrom(found.chunks)}`
  ));
}

export async function briefNotices(formData) {
  const session = await getSession();
  if (!session.user) return fail("Sign in required.");
  if (session.profile?.role === "admin") return fail("Open the student assistant.");
  const topic = String(formData.get("topic") || "").trim();
  if (topic.length < 3) return fail("Say which notice or date you want explained.");

  const found = await retrieve(`${topic} notice calendar exam registration`, 6);
  if (!found.ok) return fail(found.message);
  const excerpts = (found.chunks || []).filter((chunk) => chunk.source === "notice" || chunk.source === "calendar");
  if (!excerpts.length) return fail("No notice or calendar entry matched. Rebuild the index if new notices were posted.");

  return spoken(await complete(
    `Explain what a BAIUST student should do about this topic. Use only the excerpts. Give a short checklist. Do not invent dates. Under 100 words.\n\nEXCERPTS:\n${contextFrom(excerpts)}\n\nTOPIC:\n${topic}`
  ));
}

export async function recommendLeave(formData) {
  const session = await requireAdmin();
  if (session.error) return fail(session.error);
  const id = String(formData.get("id") || "");
  const supabase = await createClient();
  const { data: row } = await supabase.from("leave_requests").select("name, student_id, department, kind, start_date, end_date, reason, status").eq("id", id).maybeSingle();
  if (!row) return fail("That leave request is no longer here.");

  const found = await retrieve(`${row.name} ${row.student_id} ${row.department} enrollment results`, 4);
  if (!found.ok) return fail(found.message);

  return spoken(await complete(
    `Recommend whether the registry should approve this leave, ask for a document, or wait. Use the request and the excerpts. Do not say the leave is already decided. Under 70 words.\n\nREQUEST:\n${JSON.stringify(row)}\n\nEXCERPTS:\n${contextFrom(found.chunks || [])}`
  ));
}

export async function draftFeeReminders() {
  const session = await requireAdmin();
  if (session.error) return fail(session.error);
  const supabase = await createClient();
  const { data, error } = await supabase.from("fees").select("name, student_id, title, session, year, amount, paid, due_date").order("due_date");
  if (error) return fail(error.message);
  const open = (data || []).filter((row) => Number(row.amount) > Number(row.paid)).slice(0, 8);
  if (!open.length) return fail("Every posted fee is cleared.");

  const lines = open.map((row) => {
    const due = Number(row.amount) - Number(row.paid);
    return `${row.name} (${row.student_id}) owes ${due} on ${row.title}, ${row.session} ${row.year}, due ${row.due_date || "unspecified"}`;
  });
  return spoken(await complete(
    `Write one reminder line per student for the BAIUST registry. Use only these balances. Do not add students who are not listed.\n\n${lines.join("\n")}`
  ));
}

export async function draftDocumentReply(formData) {
  const session = await requireAdmin();
  if (session.error) return fail(session.error);
  const id = String(formData.get("id") || "");
  const supabase = await createClient();
  const { data: row } = await supabase.from("document_requests").select("name, student_id, department, kind, copies, purpose, status").eq("id", id).maybeSingle();
  if (!row) return fail("That document request is no longer here.");

  const found = await retrieve(`${row.name} ${row.student_id} documents results fees`, 4);
  if (!found.ok) return fail(found.message);

  return spoken(await complete(
    `Draft a 60 word reply to the student about this document request. Say the current status from the request. Mention what to bring or when to collect only if the excerpts support it. Do not mark the document ready unless the request status is ready.\n\nREQUEST:\n${JSON.stringify(row)}\n\nEXCERPTS:\n${contextFrom(found.chunks || [])}`
  ));
}
