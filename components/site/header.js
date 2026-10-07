"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut } from "@/lib/actions/auth";
import { media } from "@/lib/media";

const LINKS = [
  ["/faculty", "Faculty"],
  ["/notices", "Notices"],
  ["/admission", "Admission"],
  ["/gallery", "Gallery"],
  ["/verify", "Verify"],
  ["/about", "About"],
  ["/contact", "Contact"],
];

export function Header({ signedIn }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="no-print sticky top-0 z-40 border-b border-white/10 bg-ink/90 text-white backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <img src={media("Logo/logo.png")} alt="" className="h-10 w-9 object-contain" />
          <span className="text-sm font-semibold tracking-wide">BAIUST</span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {LINKS.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className={`text-sm ${pathname.startsWith(href) ? "text-white" : "text-white/70 hover:text-white"}`}
            >
              {label}
            </Link>
          ))}
          {signedIn ? (
            <>
              <Link href="/dashboard" className="text-sm text-white">Dashboard</Link>
              <form action={signOut}>
                <button className="text-sm text-white/70 hover:text-white">Sign out</button>
              </form>
            </>
          ) : (
            <Link href="/login" className="rounded-full bg-white px-4 py-2 text-sm font-medium text-ink">
              Sign in
            </Link>
          )}
        </nav>

        <button
          type="button"
          className="rounded-full border border-white/20 px-3 py-1.5 text-sm lg:hidden"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open ? (
        <nav className="border-t border-white/10 bg-ink px-4 py-4 lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col">
            {LINKS.map(([href, label]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} className="border-b border-white/10 py-3 text-base">
                {label}
              </Link>
            ))}
            {signedIn ? (
              <>
                <Link href="/dashboard" onClick={() => setOpen(false)} className="py-3 text-base">Dashboard</Link>
                <form action={signOut}>
                  <button className="py-3 text-base text-white/70">Sign out</button>
                </form>
              </>
            ) : (
              <Link href="/login" onClick={() => setOpen(false)} className="mt-4 rounded-full bg-white px-4 py-3 text-center text-sm font-medium text-ink">
                Sign in
              </Link>
            )}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
