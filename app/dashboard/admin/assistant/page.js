import Link from "next/link";
import { DeskNoteButton, FixGpa, MarkSheetReader, NoticeDraft, RebuildIndexButton, RegistryAsk } from "@/components/dashboard/assistant";
import { loadDeskGaps } from "@/lib/desk";
import { hasGemini } from "@/lib/gemini";
import { guardAdmin } from "@/lib/guard";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Assistant" };

export const maxDuration = 120;

export default async function AdminAssistantPage() {
  await guardAdmin();
  const gaps = await loadDeskGaps();
  const supabase = await createClient();
  const index = await supabase.from("ai_chunks").select("id", { count: "exact", head: true });
  const indexed = index.error ? null : index.count || 0;

  return (
    <div>
      <h1 className="text-xl font-semibold tracking-tight">Assistant</h1>
      <p className="mt-1 text-xs text-mute">The local model answers first. Gemini answers when that model cannot. Rebuild the index after new records arrive so questions search the closest excerpts.</p>
      {!hasGemini() ? <p className="mt-3 text-xs text-mute">GEMINI_API_KEY is empty, so there is no fallback yet. The local model still answers.</p> : null}
      {gaps.error ? <p className="mt-3 text-sm text-clay">{gaps.error}</p> : null}

      <section className="mt-3 rounded-xl bg-paper p-3 ring-1 ring-black/5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-medium">Ask the registry</h2>
          <p className="text-[11px] text-mute">{indexed === null ? "Index table is missing." : `${indexed} records in the index`}</p>
        </div>
        <p className="mt-1 text-xs text-mute">A question retrieves the closest student, course, notice, fee, or calendar excerpts, then answers from those.</p>
        <div className="mt-2"><RegistryAsk /></div>
        <div className="mt-3"><RebuildIndexButton /></div>
      </section>

      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        <section className="rounded-xl bg-paper p-3 ring-1 ring-black/5">
          <h2 className="text-sm font-medium">Morning note</h2>
          <ul className="mt-2 space-y-1 text-xs text-mute">
            <li>{gaps.admissions} applications on file</li>
            <li>{gaps.pendingLeave} leave requests waiting</li>
            <li>{gaps.pendingDocuments} documents to prepare</li>
            <li>{gaps.unenrolled.length} registrations with no courses</li>
            <li>{gaps.mismatches.length} results whose GPA does not match the marks</li>
          </ul>
          <div className="mt-3"><DeskNoteButton /></div>
        </section>
        <section className="rounded-xl bg-paper p-3 ring-1 ring-black/5">
          <h2 className="text-sm font-medium">Draft a notice</h2>
          <div className="mt-2"><NoticeDraft /></div>
        </section>
        <section className="rounded-xl bg-paper p-3 ring-1 ring-black/5 lg:col-span-2">
          <h2 className="text-sm font-medium">Read a mark sheet</h2>
          <p className="mt-1 text-xs text-mute">Paste subject, credit, and marks. The GPA is calculated here from the same scale as every other result.</p>
          <div className="mt-2"><MarkSheetReader /></div>
        </section>
      </div>

      <section className="mt-4">
        <h2 className="text-sm font-medium">Registered, not enrolled</h2>
        <ul className="mt-1 divide-y divide-line border-y border-line text-xs">
          {gaps.unenrolled.length === 0 ? <li className="py-2 text-mute">Every registration has at least one course.</li> : null}
          {gaps.unenrolled.map((row) => (
            <li key={row.id} className="flex justify-between gap-3 py-2">
              <span>{row.name} · {row.student_id}</span>
              <span className="text-mute">{row.session} {row.year} · {row.level_term}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-4">
        <h2 className="text-sm font-medium">GPA check</h2>
        <ul className="mt-1 divide-y divide-line border-y border-line text-xs">
          {gaps.mismatches.length === 0 ? <li className="py-2 text-mute">Stored GPAs match the marks.</li> : null}
          {gaps.mismatches.map((row) => (
            <li key={row.id} className="flex flex-col gap-1 py-2 sm:flex-row sm:items-center sm:justify-between">
              <span>{row.student_id} · {row.session} {row.year} · stored {Number(row.gpa).toFixed(2)} · marks {row.expected.toFixed(2)}</span>
              <FixGpa id={row.id} />
            </li>
          ))}
        </ul>
        <Link href="/dashboard/admin/results" className="mt-2 inline-block text-xs text-moss">Open the result form</Link>
      </section>
    </div>
  );
}
