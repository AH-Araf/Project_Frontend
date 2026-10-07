import Link from "next/link";
import { DEPARTMENTS } from "@/lib/constants";
import { media } from "@/lib/media";

export const metadata = { title: "Admission" };

export default function AdmissionPage() {
  return (
    <div>
      <section className="relative isolate min-h-[48vh] overflow-hidden bg-ink text-white">
        <img src={media("image/baiust.jpg")} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/20" />
        <div className="relative mx-auto flex min-h-[48vh] max-w-6xl flex-col justify-end px-4 pb-12 pt-28 sm:px-6">
          <p className="text-xs uppercase tracking-[0.18em] text-white/75">Spring session</p>
          <h1 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight sm:text-6xl">Admission is open.</h1>
          <p className="mt-3 max-w-lg text-sm text-white/85 sm:text-base">
            CSE, EEE, CE, BBA, LLB, and English. Send your results and the admission office will read the file.
          </p>
          <Link href="/admission/apply" className="mt-8 w-fit rounded-full bg-white px-5 py-3 text-sm font-medium text-ink">
            Apply now
          </Link>
        </div>
      </section>
      <div className="mx-auto flex max-w-6xl flex-wrap gap-2 px-4 py-10 sm:px-6">
        {DEPARTMENTS.map((item) => (
          <span key={item.code} className="rounded-full bg-white px-4 py-2 text-sm">{item.code} · {item.name}</span>
        ))}
      </div>
    </div>
  );
}
