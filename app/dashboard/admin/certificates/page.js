import { CertificateManager } from "@/components/admin/managers";
import { query } from "@/lib/data";
import { guardAdmin } from "@/lib/guard";

export const metadata = { title: "Certificates" };

export default async function ManageCertificatesPage() {
  await guardAdmin();
  const certificates = await query((supabase) => supabase.from("certificates").select("*").order("created_at", { ascending: false }));

  return (
    <div>
      <h1 className="mb-3 text-xl font-semibold tracking-tight">Certificates</h1>
      <CertificateManager rows={certificates.data} />
    </div>
  );
}
