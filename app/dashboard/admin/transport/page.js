import { TransportWindowManager } from "@/components/admin/managers";
import { query } from "@/lib/data";
import { guardAdmin } from "@/lib/guard";

export const metadata = { title: "Transport windows" };

export default async function ManageTransportPage() {
  await guardAdmin();
  const windows = await query((supabase) => supabase.from("transport_windows").select("*").order("created_at", { ascending: false }));

  return (
    <div>
      <h1 className="mb-3 text-xl font-semibold tracking-tight">Transport windows</h1>
      <TransportWindowManager rows={windows.data} />
    </div>
  );
}
