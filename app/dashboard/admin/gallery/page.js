import { GalleryManager } from "@/components/admin/managers";
import { query } from "@/lib/data";
import { guardAdmin } from "@/lib/guard";

export const metadata = { title: "Gallery" };

export default async function ManageGalleryPage() {
  await guardAdmin();
  const gallery = await query((supabase) => supabase.from("gallery").select("*").order("created_at", { ascending: false }));

  return (
    <div>
      <h1 className="mb-3 text-xl font-semibold tracking-tight">Gallery</h1>
      <GalleryManager rows={gallery.data} />
    </div>
  );
}
