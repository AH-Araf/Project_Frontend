import Link from "next/link";
import { HomeHero } from "@/components/home-hero";
import { DataState } from "@/components/ui";
import { ALUMNI, CAMPUS_LIFE, FACILITIES, LEADERSHIP, PROGRAMS } from "@/lib/constants";
import { query } from "@/lib/data";
import { formatDate } from "@/lib/format";
import { media } from "@/lib/media";

export default async function HomePage() {
  const notices = await query((supabase) =>
    supabase.from("notices").select("id, title, category, notice_date").order("notice_date", { ascending: false }).limit(4)
  );
  const viceChancellor = LEADERSHIP.find((person) => person.role === "Vice Chancellor");

  return (
    <div>
      <HomeHero />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-moss">Why BAIUST</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">A campus built around student life.</h2>
            <p className="mt-4 text-sm leading-relaxed text-mute sm:text-base">
              Choosing BAIUST means a disciplined setting, close academic support, and outcome-based teaching aimed at graduates who can work. Library, halls, dining, and transport sit on the same campus.
            </p>
            <Link href="/about" className="mt-6 inline-block rounded-full bg-moss px-5 py-2.5 text-sm text-white">
              About the university
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {CAMPUS_LIFE.map((item) => (
              <figure key={item.title} className="group relative overflow-hidden rounded-2xl">
                <img src={media(item.image)} alt={item.title} className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-3 pt-8 text-xs font-medium text-white">{item.title}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="text-3xl font-semibold tracking-tight">Programmes</h2>
            <Link href="/faculty" className="text-sm text-moss">Faculty</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROGRAMS.map((program) => (
              <article key={program.code} className="group relative min-h-72 overflow-hidden rounded-3xl">
                <img src={media(program.image)} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />
                <div className="relative flex min-h-72 flex-col justify-end p-6 text-white">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/75">{program.code}</p>
                  <h3 className="mt-2 text-xl font-semibold leading-snug">{program.name}</h3>
                  <p className="mt-2 text-sm text-white/80">{program.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[280px_1fr] lg:py-20">
        <img src={media(viceChancellor.image)} alt={viceChancellor.name} className="aspect-[3/4] w-full rounded-3xl object-cover object-top" />
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-moss">Vice Chancellor</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">{viceChancellor.name}</h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/80">
            Welcome to our website. It is my privilege to serve as Vice-Chancellor. I am committed to sustaining academic excellence and the quality of student life at this university.
          </p>
        </div>
      </section>

      <section className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-3xl font-semibold tracking-tight">Leadership</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {LEADERSHIP.map((person) => (
              <article key={person.role} className="overflow-hidden rounded-3xl bg-white/5">
                <img src={media(person.image)} alt={person.name} className="aspect-[4/5] w-full object-cover object-top" />
                <div className="p-4">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-white/60">{person.role}</p>
                  <h3 className="mt-2 text-base font-medium leading-snug">{person.name}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight">Facilities</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FACILITIES.map((item) => (
            <article key={item.title} className="group relative min-h-64 overflow-hidden rounded-3xl">
              <img src={media(item.image)} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="relative flex min-h-64 flex-col justify-end p-6 text-white">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-sand/70">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-3xl font-semibold tracking-tight">Alumni</h2>
          <p className="mt-2 text-sm text-mute">Life after graduation, from recent graduates.</p>
          <div className="mt-8 flex gap-4 overflow-x-auto pb-2">
            {ALUMNI.map((person) => (
              <article key={person.name} className="w-56 shrink-0 rounded-3xl bg-white p-5">
                <img src={media(person.image)} alt="" className="h-20 w-20 rounded-full object-cover" />
                <h3 className="mt-4 text-base font-semibold">{person.name}</h3>
                <p className="mt-1 text-sm text-mute">{person.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-6 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl">
          <iframe
            className="aspect-video w-full"
            src="https://www.youtube.com/embed/8YWYxqaFPVo"
            title="BAIUST campus"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-moss">Campus film</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Walk through Cumilla.</h2>
          <p className="mt-3 text-sm leading-relaxed text-mute">
            Halls, classrooms, and the grounds at Syedpur, Adarsha Sadar.
          </p>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-3xl font-semibold tracking-tight">Latest notices</h2>
            <Link href="/notices" className="text-sm text-moss">All notices</Link>
          </div>
          <DataState configured={notices.configured} error={notices.error} empty={!notices.data.length} emptyText="No notices yet. The registry publishes them here.">
            <ul className="divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white">
              {notices.data.map((notice) => (
                <li key={notice.id}>
                  <Link href={`/notices/${notice.id}`} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-baseline sm:justify-between">
                    <span>{notice.title}</span>
                    <span className="text-sm text-mute">{notice.category} · {formatDate(notice.notice_date)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </DataState>
        </div>
      </section>
    </div>
  );
}
