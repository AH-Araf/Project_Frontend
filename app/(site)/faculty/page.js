import { FacultyList } from "@/components/faculty-list";
import { PageBanner } from "@/components/site/banner";
import { DataState } from "@/components/ui";
import { query } from "@/lib/data";

export const metadata = { title: "Faculty" };

export default async function FacultyPage() {
  const faculty = await query((supabase) =>
    supabase.from("faculty").select("*").order("name")
  );

  return (
    <div>
      <PageBanner
        image="scenes/lecture-hall.jpg"
        eyebrow="People"
        title="Faculty"
        lede="Teachers listed by department. The registry keeps this directory up to date."
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <DataState configured={faculty.configured} error={faculty.error} empty={!faculty.data.length} emptyText="No faculty records yet.">
          <FacultyList rows={faculty.data} />
        </DataState>
      </div>
    </div>
  );
}
