import { EventForm } from "@/components/dashboard/office";
import { RemoveButton } from "@/components/remove-button";
import { deleteEvent } from "@/lib/actions/office";
import { formatDate } from "@/lib/format";
import { query } from "@/lib/data";
import { guardAdmin } from "@/lib/guard";

export const metadata = { title: "Calendar" };

export default async function AdminCalendarPage() {
  await guardAdmin();
  const rows = await query((supabase) => supabase.from("calendar_events").select("*").order("event_date", { ascending: true }));

  return (
    <div>
      <h1 className="text-xl font-semibold tracking-tight">Calendar</h1>
      <div className="mt-3 rounded-xl bg-paper p-3 ring-1 ring-black/5">
        <EventForm />
      </div>
      {rows.error ? <p className="mt-3 text-sm text-clay">{rows.error}</p> : null}
      <ul className="mt-3 divide-y divide-line border-y border-line">
        {rows.data.length === 0 ? <li className="py-3 text-xs text-mute">No dates yet.</li> : null}
        {rows.data.map((row) => (
          <li key={row.id} className="flex flex-col gap-1 py-2 text-xs sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium">{row.title}</p>
              <p className="text-mute">{formatDate(row.event_date)} · {row.category}{row.detail ? ` · ${row.detail}` : ""}</p>
            </div>
            <RemoveButton id={row.id} action={deleteEvent} />
          </li>
        ))}
      </ul>
    </div>
  );
}
