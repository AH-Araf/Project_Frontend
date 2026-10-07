import { NoticeBrowser } from "@/components/notice-browser";
import { PageBanner } from "@/components/site/banner";
import { DataState } from "@/components/ui";
import { query } from "@/lib/data";

export const metadata = { title: "Notices" };

export default async function NoticesPage() {
  const notices = await query((supabase) =>
    supabase.from("notices").select("*").order("notice_date", { ascending: false })
  );

  return (
    <div>
      <PageBanner
        image="home/banner/campus.png"
        eyebrow="Registry"
        title="Notices"
        lede="Exams, transport, halls, and general announcements."
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <DataState configured={notices.configured} error={notices.error} empty={!notices.data.length} emptyText="No notices published.">
          <NoticeBrowser rows={notices.data} />
        </DataState>
      </div>
    </div>
  );
}
