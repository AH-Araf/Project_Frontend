import Link from "next/link";
import { notFound } from "next/navigation";
import { PageBanner } from "@/components/site/banner";
import { isConfigured } from "@/lib/config";
import { queryOne } from "@/lib/data";
import { formatDate } from "@/lib/format";

export const metadata = { title: "Notice" };

export default async function NoticePage({ params }) {
  const { id } = await params;
  if (!isConfigured()) notFound();

  const notice = await queryOne((supabase) =>
    supabase.from("notices").select("*").eq("id", id).maybeSingle()
  );

  if (!notice.data) notFound();
  const row = notice.data;

  return (
    <div>
      <PageBanner
        eyebrow={`${row.category} · ${formatDate(row.notice_date)}`}
        title={row.title}
        image="home/banner/banner2.png"
      />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-10">
          {row.description ? <p className="whitespace-pre-wrap text-base leading-relaxed">{row.description}</p> : <p className="text-mute">No further detail was attached.</p>}
          {row.link ? (
            <a href={row.link} target="_blank" rel="noreferrer" className="mt-8 inline-block rounded-full bg-moss px-5 py-2.5 text-sm text-white">
              Open attachment
            </a>
          ) : null}
          <div className="mt-8">
            <Link href="/notices" className="text-sm text-moss">All notices</Link>
          </div>
        </div>
      </article>
    </div>
  );
}
