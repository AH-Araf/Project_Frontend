import Link from "next/link";
import { ResultEditor } from "@/components/admin/managers";
import { query } from "@/lib/data";
import { guardAdmin } from "@/lib/guard";

export const metadata = { title: "Results" };

export default async function ManageResultsPage() {
  await guardAdmin();
  const results = await query((supabase) => supabase.from("results").select("*").order("created_at", { ascending: false }));

  return (
    <div>
      <h1 className="mb-3 text-xl font-semibold tracking-tight">Results</h1>
      <p className="mb-3 max-w-xl text-xs text-mute">GPA is calculated from marks and credits: 80 and above is 4.00, then 3.75, 3.50, 3.25, 3.00, 2.75, 2.50, 2.25, 2.00, and 0 below 40. A pasted sheet can be read on the <Link href="/dashboard/admin/assistant" className="text-moss">assistant</Link>.</p>
      <ResultEditor rows={results.data} />
    </div>
  );
}
