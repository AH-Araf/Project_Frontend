import Link from "next/link";
import { redirect } from "next/navigation";
import { query } from "@/lib/data";
import { formatDate } from "@/lib/format";
import { loadStudent } from "@/lib/guard";

export const metadata = { title: "Transport" };

export default async function TransportPage() {
  const { session } = await loadStudent();
  if (session.profile?.role === "admin") redirect("/dashboard/admin/transport");

  const windows = await query((supabase) =>
    supabase.from("transport_windows").select("*").order("created_at", { ascending: false })
  );
  const cards = session.user
    ? await query((supabase) =>
        supabase.from("transport_cards").select("*").eq("user_id", session.user.id).order("created_at", { ascending: false })
      )
    : { data: [] };

  return (
    <div>
      <h1 className="text-xl font-semibold tracking-tight">Transport</h1>
      <p className="mt-3 text-sm text-mute">Open registration windows from the registry.</p>
      <ul className="mt-8 divide-y divide-line border-y border-line">
        {windows.data.length === 0 ? <li className="py-4 text-sm text-mute">No window is open.</li> : null}
        {windows.data.map((row) => (
          <li key={row.id} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p>{row.session} {row.year}</p>
              <p className="text-sm text-mute">{formatDate(row.start_date)} – {formatDate(row.end_date)}</p>
            </div>
            <Link href={`/dashboard/transport/${row.id}`} className="text-sm text-moss">Apply</Link>
          </li>
        ))}
      </ul>
      <h2 className="mt-12 font-serif text-2xl">Your cards</h2>
      <ul className="mt-4 divide-y divide-line border-y border-line">
        {cards.data.length === 0 ? <li className="py-4 text-sm text-mute">None yet.</li> : null}
        {cards.data.map((card) => (
          <li key={card.id} className="py-4 text-sm">
            <p>{card.session} {card.year}</p>
            <p className="text-mute">{card.pickup_point}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
