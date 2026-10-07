import Link from "next/link";
import { deleteAdmission } from "@/lib/actions/people";
import { RemoveButton } from "@/components/remove-button";
import { query } from "@/lib/data";
import { guardAdmin } from "@/lib/guard";

export const metadata = { title: "Admissions" };

export default async function AdmissionsPage() {
  await guardAdmin();
  const admissions = await query((supabase) => supabase.from("admissions").select("*").order("created_at", { ascending: false }));
  const bySubject = admissions.data.reduce((map, row) => {
    const key = row.subject || "Unset";
    map[key] = (map[key] || 0) + 1;
    return map;
  }, {});

  return (
    <div>
      <h1 className="text-xl font-semibold tracking-tight">Admissions</h1>
      <p className="mt-3 text-sm text-mute">{admissions.data.length} applications</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {Object.entries(bySubject).map(([subject, count]) => (
          <span key={subject} className="border border-line px-3 py-1 text-sm">{subject} · {count}</span>
        ))}
      </div>
      <div className="mt-8 divide-y divide-line border-y border-line">
        {admissions.data.map((row) => (
          <div key={row.id} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Link href={`/dashboard/admin/admissions/${row.id}`} className="hover:underline">{row.name}</Link>
              <p className="text-sm text-mute">{row.subject} · {row.email} · {row.phone}</p>
            </div>
            <RemoveButton id={row.id} action={deleteAdmission} />
          </div>
        ))}
      </div>
    </div>
  );
}
