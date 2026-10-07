import Link from "next/link";
import { CAMPUS } from "@/lib/constants";
import { media } from "@/lib/media";

export function Footer() {
  return (
    <footer className="no-print mt-16 bg-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <img src={media("Logo/logo.png")} alt="" className="h-12 w-11 object-contain" />
            <p className="text-lg font-semibold">BAIUST</p>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">{CAMPUS.name}</p>
        </div>
        <div className="text-sm leading-7 text-white/75">
          <p>{CAMPUS.address}</p>
          <p>{CAMPUS.phone}</p>
          <p>{CAMPUS.telephone}</p>
          <a className="text-white" href={`mailto:${CAMPUS.email}`}>{CAMPUS.email}</a>
        </div>
        <div className="flex flex-col gap-2 text-sm text-white/80">
          <Link href="/admission" className="hover:text-white">Admission</Link>
          <Link href="/notices" className="hover:text-white">Notices</Link>
          <Link href="/verify" className="hover:text-white">Certificate verification</Link>
          <Link href="/gallery" className="hover:text-white">Gallery</Link>
          <a href="https://drive.google.com/file/d/1eafym5wCUU4iPJxMUYIHIjlZsbD8Jk0O/view" target="_blank" rel="noreferrer" className="hover:text-white">
            Academic calendar
          </a>
        </div>
      </div>
    </footer>
  );
}
