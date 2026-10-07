import { redirect } from "next/navigation";
import { balance, formatDate, money } from "@/lib/format";
import { query } from "@/lib/data";
import { loadStudent } from "@/lib/guard";

export const metadata = { title: "Fees" };

export default async function FeesPage() {
  const { session } = await loadStudent();
  if (session.profile?.role === "admin") redirect("/dashboard/admin/fees");
  const rows = session.user
    ? await query((supabase) => supabase.from("fees").select("*").ilike("student_email", session.user.email).order("due_date", { ascending: true }))
    : { data: [], error: null };
  const open = rows.data.reduce((sum, row) => sum + balance(row), 0);

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <h1 className="text-xl font-semibold tracking-tight">Fees</h1>
        <p className="text-xs text-mute">Outstanding {money(open)}</p>
      </div>
      <p className="mt-1 text-xs text-mute">The accounts office records payments. This ledger is what they have posted for you.</p>
      {rows.error ? <p className="mt-3 text-sm text-clay">{rows.error}</p> : null}
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[32rem] text-left text-xs">
          <thead className="border-b border-line text-mute">
            <tr>
              <th className="py-1.5 font-normal">Charge</th>
              <th className="py-1.5 font-normal">Term</th>
              <th className="py-1.5 font-normal">Due</th>
              <th className="py-1.5 font-normal">Amount</th>
              <th className="py-1.5 font-normal">Paid</th>
              <th className="py-1.5 font-normal">Balance</th>
            </tr>
          </thead>
          <tbody>
            {rows.data.length === 0 ? (
              <tr><td colSpan={6} className="py-3 text-mute">No fees posted yet.</td></tr>
            ) : null}
            {rows.data.map((row) => (
              <tr key={row.id} className="border-b border-line">
                <td className="py-2">{row.title}</td>
                <td className="py-2">{row.session} {row.year}</td>
                <td className="py-2">{formatDate(row.due_date)}</td>
                <td className="py-2">{money(row.amount)}</td>
                <td className="py-2">{money(row.paid)}</td>
                <td className={`py-2 ${balance(row) ? "text-clay" : "text-moss"}`}>{money(balance(row))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
