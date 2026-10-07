import { DocumentReply } from "@/components/dashboard/assistant";
import { DocumentReview } from "@/components/dashboard/office";
import { query } from "@/lib/data";
import { guardAdmin } from "@/lib/guard";

export const metadata = { title: "Documents" };
export const maxDuration = 120;

export default async function AdminDocumentsPage() {
  await guardAdmin();
  const rows = await query((supabase) => supabase.from("document_requests").select("*").order("created_at", { ascending: false }));
  const waiting = rows.data.filter((row) => row.status === "pending").length;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <h1 className="text-xl font-semibold tracking-tight">Documents</h1>
        <p className="text-xs text-mute">{waiting} to prepare</p>
      </div>
      {rows.error ? <p className="mt-3 text-sm text-clay">{rows.error}</p> : null}
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[46rem] text-left text-xs">
          <thead className="border-b border-line text-mute">
            <tr>
              <th className="py-1.5 font-normal">Student</th>
              <th className="py-1.5 font-normal">Document</th>
              <th className="py-1.5 font-normal">Purpose</th>
              <th className="py-1.5 font-normal">Desk</th>
            </tr>
          </thead>
          <tbody>
            {rows.data.length === 0 ? (
              <tr><td colSpan={4} className="py-3 text-mute">No document requests.</td></tr>
            ) : null}
            {rows.data.map((row) => (
              <tr key={row.id} className="border-b border-line align-top">
                <td className="py-2">
                  <p>{row.name}</p>
                  <p className="text-mute">{row.student_id} · {row.department}</p>
                </td>
                <td className="py-2">{row.kind} · {row.copies}</td>
                <td className="py-2">
                  <p>{row.purpose}</p>
                  {row.review_note ? <p className="text-mute">{row.review_note}</p> : null}
                </td>
                <td className="py-2">
                  <DocumentReview id={row.id} status={row.status} />
                  <DocumentReply id={row.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
