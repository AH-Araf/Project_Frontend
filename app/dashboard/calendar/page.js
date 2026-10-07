import { redirect } from "next/navigation";
import { formatDate } from "@/lib/format";
import { query } from "@/lib/data";
import { loadStudent } from "@/lib/guard";

export const metadata = { title: "Calendar" };

export default async function CalendarPage() {
  const { session } = await loadStudent();
  if (session.profile?.role === "admin") redirect("/dashboard/admin/calendar");
  const rows = await query((supabase) => supabase.from("calendar_events").select("*").order("event_date", { ascending: true }));
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = rows.data.filter((row) => String(row.event_date) >= today);
  const past = rows.data.filter((row) => String(row.event_date) < today);

  return (
    <div>
      <h1 className="text-xl font-semibold tracking-tight">Calendar</h1>
      <p className="mt-1 text-xs text-mute">Exams, holidays, registration, and office dates published by the registry.</p>
      {rows.error ? <p className="mt-3 text-sm text-clay">{rows.error}</p> : null}
      <EventList title="Coming up" rows={upcoming} empty="Nothing scheduled." />
      <EventList title="Earlier" rows={past} empty="No earlier dates." />
    </div>
  );
}

function EventList({ title, rows, empty }) {
  return (
    <section className="mt-4">
      <h2 className="text-[11px] uppercase tracking-[0.14em] text-mute">{title}</h2>
      <ul className="mt-1 divide-y divide-line border-y border-line">
        {rows.length === 0 ? <li className="py-2 text-xs text-mute">{empty}</li> : null}
        {rows.map((row) => (
          <li key={row.id} className="grid gap-1 py-2 text-xs sm:grid-cols-[8rem_6rem_1fr]">
            <span>{formatDate(row.event_date)}</span>
            <span className="text-moss">{row.category}</span>
            <span>
              <span className="font-medium">{row.title}</span>
              {row.detail ? <span className="text-mute"> · {row.detail}</span> : null}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
