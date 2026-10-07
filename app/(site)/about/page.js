import { LEADERSHIP } from "@/lib/constants";
import { media } from "@/lib/media";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div>
      <section className="relative isolate min-h-[46vh] overflow-hidden bg-ink text-white">
        <img src={media("image/baiust.jpg")} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative mx-auto flex min-h-[46vh] max-w-6xl flex-col justify-end px-4 pb-12 pt-28 sm:px-6">
          <p className="text-xs uppercase tracking-[0.18em] text-white/75">The university</p>
          <h1 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight sm:text-6xl">My BAIUST</h1>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1fr]">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Departments</h2>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-mute">
            <li>Computer Science & Engineering — 21 faculty</li>
            <li>Electrical & Electronic Engineering — 17 faculty</li>
            <li>Civil Engineering — 17 faculty</li>
            <li>Business Administration — 21 faculty</li>
            <li>English — 15 faculty</li>
            <li>Law</li>
          </ul>
          <img src={media("scenes/lecture-hall.jpg")} alt="Lecture hall" className="mt-8 aspect-[16/10] w-full rounded-3xl object-cover" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {LEADERSHIP.map((person) => (
            <article key={person.role} className="overflow-hidden rounded-3xl bg-white">
              <img src={media(person.image)} alt={person.name} className="aspect-[4/5] w-full object-cover object-top" />
              <div className="p-4">
                <p className="text-[11px] uppercase tracking-[0.16em] text-moss">{person.role}</p>
                <h3 className="mt-2 font-semibold leading-snug">{person.name}</h3>
                <p className="mt-1 text-sm text-mute">{person.note}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
