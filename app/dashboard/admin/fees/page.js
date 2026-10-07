import { FeeReminders } from "@/components/dashboard/assistant";
import { FeeForm, PaymentForm } from "@/components/dashboard/office";
import { RemoveButton } from "@/components/remove-button";
import { deleteFee } from "@/lib/actions/office";
import { balance, formatDate, money } from "@/lib/format";
import { query } from "@/lib/data";
import { guardAdmin } from "@/lib/guard";

export const metadata = { title: "Fees" };
export const maxDuration = 120;

export default async function AdminFeesPage() {
  await guardAdmin();
  const rows = await query((supabase) => supabase.from("fees").select("*").order("due_date", { ascending: true }));
  const open = rows.data.reduce((sum, row) => sum + balance(row), 0);

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <h1 className="text-xl font-semibold tracking-tight">Fees</h1>
        <p className="text-xs text-mute">Outstanding {money(open)}</p>
      </div>
      <div className="mt-3 rounded-xl bg-paper p-3 ring-1 ring-black/5">
        <FeeForm />
        <FeeReminders />
      </div>
      {rows.error ? <p className="mt-3 text-sm text-clay">{rows.error}</p> : null}
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[48rem] text-left text-xs">
          <thead className="border-b border-line text-mute">
            <tr>
              <th className="py-1.5 font-normal">Student</th>
              <th className="py-1.5 font-normal">Charge</th>
              <th className="py-1.5 font-normal">Due</th>
              <th className="py-1.5 font-normal">Balance</th>
              <th className="py-1.5 font-normal">Received</th>
              <th className="py-1.5 font-normal" />
            </tr>
          </thead>
          <tbody>
            {rows.data.length === 0 ? (
              <tr><td colSpan={6} className="py-3 text-mute">No fees posted.</td></tr>
            ) : null}
            {rows.data.map((row) => (
              <tr key={row.id} className="border-b border-line align-top">
                <td className="py-2">
                  <p>{row.name}</p>
                  <p className="text-mute">{row.student_id}</p>
                </td>
                <td className="py-2">
                  <p>{row.title}</p>
                  <p className="text-mute">{row.session} {row.year} · {money(row.amount)}</p>
                </td>
                <td className="py-2">{formatDate(row.due_date)}</td>
                <td className={`py-2 ${balance(row) ? "text-clay" : "text-moss"}`}>{money(balance(row))}</td>
                <td className="py-2"><PaymentForm id={row.id} paid={Number(row.paid)} /></td>
                <td className="py-2"><RemoveButton id={row.id} action={deleteFee} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
