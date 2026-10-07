import { PageBanner } from "@/components/site/banner";
import { CAMPUS_GALLERY } from "@/lib/constants";
import { query } from "@/lib/data";
import { media } from "@/lib/media";

export const metadata = { title: "Gallery" };

export default async function GalleryPage() {
  const gallery = await query((supabase) =>
    supabase.from("gallery").select("*").order("created_at", { ascending: false })
  );
  const uploaded = gallery.configured && !gallery.error ? gallery.data : [];

  return (
    <div>
      <PageBanner
        image="scenes/residence.jpg"
        eyebrow="Campus"
        title="Gallery"
        lede="Campus photographs, plus images the registry adds in Supabase."
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {gallery.error ? <p className="mb-6 text-sm text-clay">{gallery.error}</p> : null}
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {uploaded.map((item) => (
            <figure key={item.id} className="mb-4 break-inside-avoid overflow-hidden rounded-3xl bg-white shadow-sm">
              <img src={item.image_url} alt={item.title || ""} className="w-full object-cover" />
              {item.title || item.description ? (
                <figcaption className="px-4 py-3 text-sm">
                  <p className="font-medium">{item.title}</p>
                  {item.description ? <p className="mt-1 text-mute">{item.description}</p> : null}
                </figcaption>
              ) : null}
            </figure>
          ))}
          {CAMPUS_GALLERY.map((path) => (
            <figure key={path} className="mb-4 break-inside-avoid overflow-hidden rounded-3xl shadow-sm">
              <img src={media(path)} alt="BAIUST campus" className="w-full object-cover" />
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
