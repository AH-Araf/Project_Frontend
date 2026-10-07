import { CAMPUS } from "@/lib/constants";
import { media } from "@/lib/media";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div>
      <section className="relative isolate min-h-[42vh] overflow-hidden bg-ink text-white">
        <img src={media("home/banner/campus.png")} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative mx-auto flex min-h-[42vh] max-w-6xl flex-col justify-end px-4 pb-12 pt-28 sm:px-6">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">BAIUST</h1>
          <p className="mt-3 max-w-lg text-sm text-white/85 sm:text-base">{CAMPUS.address}</p>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-semibold">Reach the campus</h2>
          <dl className="mt-6 space-y-4 text-sm">
            {[
              ["Mobile", CAMPUS.phone],
              ["Telephone", CAMPUS.telephone],
              ["Email", CAMPUS.email],
              ["Address", CAMPUS.address],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-mute">{label}</dt>
                <dd className="mt-1 text-base">{value}</dd>
              </div>
            ))}
          </dl>
          <a href={CAMPUS.map} target="_blank" rel="noreferrer" className="mt-8 inline-block rounded-full bg-moss px-5 py-2.5 text-sm text-white">
            Open in maps
          </a>
        </div>
        <img src={media("map/map.png")} alt="Map to BAIUST" className="h-full min-h-72 w-full rounded-3xl object-cover" />
      </div>
    </div>
  );
}
