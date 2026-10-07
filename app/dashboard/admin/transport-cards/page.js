import { query } from "@/lib/data";
import { money } from "@/lib/format";
import { guardAdmin } from "@/lib/guard";

export const metadata = { title: "Transport cards" };

export default async function TransportCardsPage() {
  await guardAdmin();
  const cards = await query((supabase) => supabase.from("transport_cards").select("*").order("created_at", { ascending: false }));

  return (
    <div>
      <h1 className="text-xl font-semibold tracking-tight">Transport cards</h1>
      <div className="mt-8 divide-y divide-line border-y border-line">
        {cards.data.length === 0 ? <p className="py-4 text-sm text-mute">No cards yet.</p> : null}
        {cards.data.map((card) => (
          <article key={card.id} className="grid gap-2 py-4 text-sm sm:grid-cols-[1fr_1fr]">
            <div>
              <p>{card.applicant?.name || "Student"}</p>
              <p className="text-mute">{card.applicant?.student_id} · {card.applicant?.department}</p>
              <p className="text-mute">{card.applicant?.mobile}</p>
            </div>
            <div>
              <p>{card.session} {card.year}</p>
              <p className="text-mute">{card.pickup_point}</p>
              <p>{money(card.fee)}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
