import { createClient } from "@/lib/supabase/server";
import { hasGemini } from "@/lib/gemini";
import { EMBED_DIMS, embedLocal } from "@/lib/models.mjs";
import { shapeChunks } from "@/lib/shape-chunks.mjs";

const EMBED_MODEL = "gemini-embedding-001";

function normalize(values) {
  const norm = Math.sqrt(values.reduce((sum, value) => sum + value * value, 0));
  if (!norm) return values;
  return values.map((value) => value / norm);
}

async function embedGemini(texts, taskType) {
  if (!hasGemini()) {
    throw new Error("The local embedding model is unavailable, and GEMINI_API_KEY is not set.");
  }
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${EMBED_MODEL}:batchEmbedContents`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY,
      },
      body: JSON.stringify({
        requests: texts.map((text) => ({
          model: `models/${EMBED_MODEL}`,
          content: { parts: [{ text: text.slice(0, 6000) }] },
          taskType,
          outputDimensionality: EMBED_DIMS,
        })),
      }),
    }
  );
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload?.error?.message || "Could not embed the records.");
  }
  const embeddings = payload.embeddings || [];
  if (embeddings.length !== texts.length) {
    throw new Error("Gemini returned a different number of embeddings than records.");
  }
  return embeddings.map((item) => normalize(item.values));
}

async function embedWith(embedder, texts, taskType) {
  if (embedder === "gemini") return embedGemini(texts, taskType);
  return embedLocal(texts);
}

async function chooseEmbedder() {
  try {
    await embedLocal(["BAIUST registry"]);
    return "local";
  } catch (error) {
    if (!hasGemini()) throw error;
    return "gemini";
  }
}

async function activeEmbedder(supabase) {
  const { data, error } = await supabase.from("ai_settings").select("embedder").eq("id", 1).maybeSingle();
  if (error) throw new Error(error.message);
  return data?.embedder || "local";
}

export async function collectChunks(supabase) {
  const [students, registrations, enrollments, results, fees, leaves, documents, notices, courses, events, faculty, admissions] = await Promise.all([
    supabase.from("students").select("id, user_id, name, student_id, department, enrolled_semester, email, mobile"),
    supabase.from("semester_registrations").select("user_id, session, year, level_term, credits"),
    supabase.from("enrollments").select("user_id, session, year, courses(code, title, credit)"),
    supabase.from("results").select("student_email, session, year, gpa, subjects"),
    supabase.from("fees").select("student_email, title, session, year, amount, paid, due_date"),
    supabase.from("leave_requests").select("user_id, kind, start_date, end_date, reason, status"),
    supabase.from("document_requests").select("user_id, kind, copies, purpose, status"),
    supabase.from("notices").select("id, category, title, notice_date, description"),
    supabase.from("courses").select("id, code, title, department, credit, level_term"),
    supabase.from("calendar_events").select("id, title, category, event_date, detail"),
    supabase.from("faculty").select("id, name, designation, department, email, phone"),
    supabase.from("admissions").select("id, name, subject, ssc_result, hsc_result, board, phone, email"),
  ]);

  const failed = [students, registrations, enrollments, results, fees, leaves, documents, notices, courses, events, faculty, admissions].find((result) => result.error);
  if (failed?.error) throw new Error(failed.error.message);

  return shapeChunks({
    students: students.data,
    registrations: registrations.data,
    enrollments: enrollments.data,
    results: results.data,
    fees: fees.data,
    leaves: leaves.data,
    documents: documents.data,
    notices: notices.data,
    courses: courses.data,
    events: events.data,
    faculty: faculty.data,
    admissions: admissions.data,
  });
}


async function indexChunks(chunks, embedder) {
  if (!chunks.length) return { ok: true, message: "Nothing to index." };
  const vectors = [];
  for (let index = 0; index < chunks.length; index += 32) {
    const batch = chunks.slice(index, index + 32);
    const embedded = await embedWith(embedder, batch.map((chunk) => `${chunk.title}\n${chunk.content}`), "RETRIEVAL_DOCUMENT");
    vectors.push(...embedded);
  }

  const supabase = await createClient();
  const rows = chunks.map((chunk, index) => ({
    source: chunk.source,
    ref_id: chunk.ref_id,
    audience: chunk.audience,
    owner_email: chunk.owner_email,
    title: chunk.title,
    content: chunk.content,
    embedding: `[${vectors[index].join(",")}]`,
    updated_at: new Date().toISOString(),
  }));

  for (let index = 0; index < rows.length; index += 40) {
    const { error } = await supabase.from("ai_chunks").upsert(rows.slice(index, index + 40), { onConflict: "source,ref_id" });
    if (error) return { ok: false, message: error.message };
  }
  return { ok: true, message: `Indexed ${chunks.length} records.` };
}

export async function rebuildIndex() {
  const supabase = await createClient();
  let chunks;
  let embedder;
  try {
    chunks = await collectChunks(supabase);
    embedder = await chooseEmbedder();
  } catch (error) {
    return { ok: false, message: error.message };
  }

  const vectors = [];
  try {
    for (let index = 0; index < chunks.length; index += 32) {
      const batch = chunks.slice(index, index + 32);
      const embedded = await embedWith(embedder, batch.map((chunk) => `${chunk.title}\n${chunk.content}`), "RETRIEVAL_DOCUMENT");
      vectors.push(...embedded);
    }
  } catch (error) {
    return { ok: false, message: error.message };
  }

  const { error: clearError } = await supabase.from("ai_chunks").delete().neq("source", "");
  if (clearError) return { ok: false, message: clearError.message };

  for (let index = 0; index < chunks.length; index += 40) {
    const rows = chunks.slice(index, index + 40).map((chunk, offset) => ({
      source: chunk.source,
      ref_id: chunk.ref_id,
      audience: chunk.audience,
      owner_email: chunk.owner_email,
      title: chunk.title,
      content: chunk.content,
      embedding: `[${vectors[index + offset].join(",")}]`,
      updated_at: new Date().toISOString(),
    }));
    const { error } = await supabase.from("ai_chunks").insert(rows);
    if (error) return { ok: false, message: error.message };
  }

  const { error: settingsError } = await supabase.from("ai_settings").upsert({
    id: 1,
    embedder,
    updated_at: new Date().toISOString(),
  });
  if (settingsError) return { ok: false, message: settingsError.message };

  const source = embedder === "gemini" ? "Gemini embeddings" : "the local embedding model";
  return { ok: true, message: `Indexed ${chunks.length} records with ${source}. Questions search this index and send only the matches.` };
}

export async function refreshStudent(email) {
  const supabase = await createClient();
  try {
    const embedder = await activeEmbedder(supabase);
    const chunks = await collectChunks(supabase);
    const chunk = chunks.find((item) => item.source === "student" && item.owner_email === String(email || "").toLowerCase());
    if (!chunk) return { ok: false, message: "That student is not in the index source." };
    return await indexChunks([chunk], embedder);
  } catch (error) {
    return { ok: false, message: error.message };
  }
}

export async function indexNotice(notice) {
  if (!notice?.id) return { ok: false, message: "Notice was not added to the index." };
  try {
    const supabase = await createClient();
    const embedder = await activeEmbedder(supabase);
    return await indexChunks([{
      source: "notice",
      ref_id: notice.id,
      audience: "public",
      owner_email: null,
      title: notice.title,
      content: `Notice category ${notice.category}, date ${notice.notice_date}: ${notice.title}. ${notice.description || ""}`,
    }], embedder);
  } catch (error) {
    return { ok: false, message: error.message };
  }
}

export async function retrieve(question, matchCount = 8) {
  const supabase = await createClient();
  let vector;
  try {
    const embedder = await activeEmbedder(supabase);
    const [embedded] = await embedWith(embedder, [question], "RETRIEVAL_QUERY");
    vector = embedded;
  } catch (error) {
    return { ok: false, message: error.message };
  }

  const { data, error } = await supabase.rpc("match_chunks", {
    query_embedding: `[${vector.join(",")}]`,
    match_count: matchCount,
  });
  if (error) return { ok: false, message: error.message };
  return { ok: true, chunks: data || [] };
}

export function contextFrom(chunks) {
  if (!chunks.length) return "No matching records.";
  return chunks.map((chunk, index) => `[${index + 1}] ${chunk.title}\n${chunk.content}`).join("\n\n");
}
