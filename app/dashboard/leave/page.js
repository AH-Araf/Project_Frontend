import { redirect } from "next/navigation";
import { LeaveForm } from "@/components/dashboard/office";
import { formatDate } from "@/lib/format";
import { query } from "@/lib/data";
import { loadStudent } from "@/lib/guard";

export const metadata = { title: "Leave" };

export default async function LeavePage() {
  const { session, student } = await loadStudent();
  if (session.profile?.role === "admin") redirect("/dashboard/admin/leave");
  const rows = session.user
    ? await query((supabase) => supabase.from("leave_requests").select("*").eq("user_id", session.user.id).order("created_at", { ascending: false }))
    : { data: [], error: null };

  return (
    <div>
      <h1 className="text-xl font-semibold tracking-tight">Leave</h1>
      <p className="mt-1 text-xs text-mute">Medical, personal, academic, and hall leave go to the registry.</p>
      <div className="mt-3 rounded-xl bg-paper p-3 ring-1 ring-black/5">
        {student ? <LeaveForm /> : <p className="text-xs text-mute">A profile is required before you can request leave.</p>}
      </div>
      {rows.error ? <p className="mt-3 text-sm text-clay">{rows.error}</p> : null}
      <ul className="mt-3 divide-y divide-line border-y border-line">
        {rows.data.length === 0 ? <li className="py-3 text-xs text-mute">No requests yet.</li> : null}
        {rows.data.map((row) => (
          <li key={row.id} className="grid gap-1 py-2 text-xs sm:grid-cols-[7rem_1fr_5rem]">
            <span className="text-mute">{formatDate(row.start_date)} – {formatDate(row.end_date)}</span>
            <span>
              <span className="font-medium">{row.kind}. </span>
              {row.reason}
              {row.review_note ? <span className="block text-mute">{row.review_note}</span> : null}
            </span>
            <span className={row.status === "approved" ? "text-moss" : row.status === "rejected" ? "text-clay" : ""}>{row.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
