import { FacultyManager } from "@/components/admin/managers";
import { guardAdmin } from "@/lib/guard";
import { query } from "@/lib/data";

export const metadata = { title: "Faculty" };

export default async function ManageFacultyPage() {
  await guardAdmin();
  const faculty = await query((supabase) => supabase.from("faculty").select("*").order("created_at", { ascending: false }));

  return (
    <div>
      <h1 className="mb-3 text-xl font-semibold tracking-tight">Faculty</h1>
      <FacultyManager rows={faculty.data} />
    </div>
  );
}
