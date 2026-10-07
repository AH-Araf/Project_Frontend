import { redirect } from "next/navigation";
import { NoticeBrief, StudentAsk } from "@/components/dashboard/assistant";
import { hasGemini } from "@/lib/gemini";
import { loadStudent } from "@/lib/guard";

export const metadata = { title: "Assistant" };
export const maxDuration = 120;

export default async function StudentAssistantPage() {
  const { session } = await loadStudent();
  if (session.profile?.role === "admin") redirect("/dashboard/admin/assistant");

  return (
    <div>
      <h1 className="text-xl font-semibold tracking-tight">Assistant</h1>
      <p className="mt-1 text-xs text-mute">Questions search your record, notices, courses, and the calendar. The local model answers first. Gemini answers when that model cannot.</p>
      {!hasGemini() ? <p className="mt-3 text-xs text-mute">GEMINI_API_KEY is empty, so there is no fallback yet.</p> : null}
      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        <section className="rounded-xl bg-paper p-3 ring-1 ring-black/5">
          <h2 className="text-sm font-medium">Your record</h2>
          <div className="mt-2"><StudentAsk /></div>
        </section>
        <section className="rounded-xl bg-paper p-3 ring-1 ring-black/5">
          <h2 className="text-sm font-medium">Notice briefing</h2>
          <p className="mt-1 text-xs text-mute">Retrieves the closest notices and calendar dates, then explains what to do.</p>
          <div className="mt-2"><NoticeBrief /></div>
        </section>
      </div>
    </div>
  );
}
