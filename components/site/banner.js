import { media } from "@/lib/media";

export function PageBanner({ image = "image/baiust.jpg", eyebrow, title, lede }) {
  return (
    <section className="relative isolate min-h-[46vh] overflow-hidden bg-ink text-white">
      <img src={media(image)} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/25" />
      <div className="relative mx-auto flex min-h-[46vh] max-w-6xl flex-col justify-end px-4 pb-12 pt-28 sm:px-6 sm:pb-16">
        {eyebrow ? <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/75">{eyebrow}</p> : null}
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">{title}</h1>
        {lede ? <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:text-lg">{lede}</p> : null}
      </div>
    </section>
  );
}
