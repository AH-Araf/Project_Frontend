import { notFound, redirect } from "next/navigation";
import { TransportApply } from "@/components/transport-apply";
import { queryOne } from "@/lib/data";
import { formatDate } from "@/lib/format";
import { loadStudent } from "@/lib/guard";

export const metadata = { title: "Transport application" };

export default async function TransportApplyPage({ params }) {
  const { session } = await loadStudent();
  if (session.profile?.role === "admin") redirect("/dashboard/admin/transport");
  const { id } = await params;
  const windowRow = await queryOne((supabase) =>
    supabase.from("transport_windows").select("*").eq("id", id).maybeSingle()
  );
  if (!windowRow.data || Array.isArray(windowRow.data)) notFound();

  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.18em] text-moss">Transport</p>
      <h1 className="mt-2 text-xl font-semibold tracking-tight">{windowRow.data.session} {windowRow.data.year}</h1>
      <p className="mt-3 text-sm text-mute">
        {formatDate(windowRow.data.start_date)} – {formatDate(windowRow.data.end_date)}
      </p>
      {windowRow.data.description ? <p className="mt-4 max-w-xl text-sm leading-relaxed">{windowRow.data.description}</p> : null}
      <TransportApply windowId={windowRow.data.id} />
    </div>
  );
}
