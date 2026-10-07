"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HERO_SLIDES } from "@/lib/constants";
import { media } from "@/lib/media";

export function HomeHero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative isolate min-h-[78vh] overflow-hidden bg-ink text-white sm:min-h-[86vh]">
      {HERO_SLIDES.map((slide, slideIndex) => (
        <img
          key={slide}
          src={media(slide)}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${slideIndex === index ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/20" />

      <div className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:min-h-[86vh] sm:px-6 sm:pb-20">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/80">Cumilla, Bangladesh</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
          Bangladesh Army International University of Science and Technology
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
          A residential campus for engineering, business, law, and English. Study, live, and graduate from one place.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/admission" className="rounded-full bg-white px-5 py-3 text-center text-sm font-medium text-ink">
            Apply for admission
          </Link>
          <Link href="/gallery" className="rounded-full border border-white/40 px-5 py-3 text-center text-sm text-white">
            See the campus
          </Link>
        </div>
        <div className="mt-8 flex gap-2">
          {HERO_SLIDES.map((slide, slideIndex) => (
            <button
              key={slide}
              type="button"
              aria-label={`Show campus photo ${slideIndex + 1}`}
              onClick={() => setIndex(slideIndex)}
              className={`h-1.5 rounded-full transition-all ${slideIndex === index ? "w-8 bg-white" : "w-3 bg-white/45"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
