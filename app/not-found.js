import Link from "next/link";
import { media } from "@/lib/media";

export default function NotFound() {
  return (
    <div className="relative isolate flex min-h-screen items-end overflow-hidden bg-ink text-white">
      <img src={media("scenes/residence.jpg")} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative px-6 pb-16 sm:px-12">
        <p className="text-xs uppercase tracking-[0.18em] text-white/70">404</p>
        <h1 className="mt-3 max-w-lg text-4xl font-semibold tracking-tight sm:text-6xl">This page is not on the campus map.</h1>
        <Link href="/" className="mt-8 inline-block rounded-full bg-white px-5 py-3 text-sm font-medium text-ink">Back home</Link>
      </div>
    </div>
  );
}
