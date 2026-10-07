import Link from "next/link";
import { AdmissionBrief } from "@/components/dashboard/assistant";
import { notFound } from "next/navigation";
import { PrintButton } from "@/components/print-button";
import { queryOne } from "@/lib/data";
import { guardAdmin } from "@/lib/guard";

export const metadata = { title: "Application" };

export default async function AdmissionDetailPage({ params }) {
  await guardAdmin();
  const { id } = await params;
  const admission = await queryOne((supabase) => supabase.from("admissions").select("*").eq("id", id).maybeSingle());
  if (!admission.data || Array.isArray(admission.data)) notFound();
  const row = admission.data;

  const fields = [
    ["Programme", row.subject],
    ["Email", row.email],
    ["Phone", row.phone],
    ["Age", row.age],
    ["Address", row.address],
    ["SSC", row.ssc_result],
    ["HSC", row.hsc_result],
    ["Board", row.board],
    ["Transaction number", row.transaction_number],
    ["Transaction ID", row.transaction_id],
  ];

  return (
    <div>
      <div className="no-print flex items-center justify-between">
        <Link href="/dashboard/admin/admissions" className="text-sm text-mute">All applications</Link>
        <PrintButton />
      </div>
      <div className="mt-6 flex flex-col gap-5 sm:flex-row">
        {row.photo_url ? <img src={row.photo_url} alt="" className="h-36 w-28 object-cover" /> : null}
        <h1 className="text-xl font-semibold tracking-tight">{row.name}</h1>
      </div>
      <dl className="mt-8 divide-y divide-line border-y border-line">
        {fields.map(([label, value]) => (
          <div key={label} className="grid gap-1 py-3 text-sm sm:grid-cols-[12rem_1fr]">
            <dt className="text-mute">{label}</dt>
            <dd>{value || "—"}</dd>
          </div>
        ))}
      </dl>
      <div className="no-print">
        <AdmissionBrief id={row.id} />
      </div>
    </div>
  );
}
