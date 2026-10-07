import { NoticeManager } from "@/components/admin/managers";
import { query } from "@/lib/data";
import { guardAdmin } from "@/lib/guard";

export const metadata = { title: "Notices" };

export default async function ManageNoticesPage() {
  await guardAdmin();
  const notices = await query((supabase) => supabase.from("notices").select("*").order("notice_date", { ascending: false }));

  return (
    <div>
      <h1 className="mb-3 text-xl font-semibold tracking-tight">Notices</h1>
      <NoticeManager rows={notices.data} />
    </div>
  );
}
