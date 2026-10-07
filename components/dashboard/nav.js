"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut } from "@/lib/actions/auth";
import { media } from "@/lib/media";

const GROUPS = {
  student: [
    ["Study", [
      ["/dashboard", "Overview"],
      ["/dashboard/profile", "Profile"],
      ["/dashboard/courses", "Courses"],
      ["/dashboard/semester", "Semester"],
      ["/dashboard/enrollment", "Enrollment"],
      ["/dashboard/results", "Results"],
      ["/dashboard/transcript", "Transcript"],
      ["/dashboard/admit-card", "Admit card"],
    ]],
    ["Services", [
      ["/dashboard/transport", "Transport"],
      ["/dashboard/leave", "Leave"],
      ["/dashboard/documents", "Documents"],
      ["/dashboard/fees", "Fees"],
      ["/dashboard/calendar", "Calendar"],
      ["/dashboard/assistant", "Assistant"],
    ]],
  ],
  admin: [
    ["Desk", [
      ["/dashboard", "Overview"],
      ["/dashboard/admin/students", "Students"],
      ["/dashboard/admin/students/new", "New student"],
      ["/dashboard/admin/admissions", "Admissions"],
      ["/dashboard/admin/faculty", "Faculty"],
    ]],
    ["Records", [
      ["/dashboard/admin/notices", "Notices"],
      ["/dashboard/admin/gallery", "Gallery"],
      ["/dashboard/admin/certificates", "Certificates"],
      ["/dashboard/admin/results", "Results"],
      ["/dashboard/admin/courses", "Courses"],
      ["/dashboard/admin/assistant", "Assistant"],
    ]],
    ["Campus", [
      ["/dashboard/admin/transport", "Transport"],
      ["/dashboard/admin/transport-cards", "Bus cards"],
      ["/dashboard/admin/leave", "Leave"],
      ["/dashboard/admin/documents", "Documents"],
      ["/dashboard/admin/fees", "Fees"],
      ["/dashboard/admin/calendar", "Calendar"],
    ]],
  ],
};

function isActive(pathname, href) {
  if (href === "/dashboard") return pathname === href;
  if (href === "/dashboard/admin/students") {
    return pathname === href || /^\/dashboard\/admin\/students\/(?!new$).+/.test(pathname);
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DashNav({ role, name }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const groups = role === "admin" ? GROUPS.admin : GROUPS.student;

  return (
    <div className="no-print lg:sticky lg:top-0 lg:h-screen">
      <div className="sticky top-0 z-30 flex items-center justify-between bg-ink px-3 py-2 text-white lg:hidden">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold">
          <img src={media("Logo/logo.png")} alt="" className="h-7 w-6 object-contain" />
          BAIUST
        </Link>
        <button type="button" className="rounded-md border border-white/20 px-2 py-1 text-xs" onClick={() => setOpen((value) => !value)}>
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <aside className={`bg-ink text-white lg:flex lg:h-screen lg:flex-col ${open ? "block" : "hidden lg:flex"}`}>
        <div className="hidden items-center gap-2 px-3 py-3 lg:flex">
          <img src={media("Logo/logo.png")} alt="" className="h-8 w-7 object-contain" />
          <div>
            <Link href="/" className="text-sm font-semibold">BAIUST</Link>
            <p className="text-[10px] uppercase tracking-[0.14em] text-white/45">{role === "admin" ? "Registry" : "Student"}</p>
          </div>
        </div>
        <p className="truncate px-3 pb-1 text-xs text-white/70">{name}</p>
        <nav className="flex-1 overflow-y-auto px-2 pb-2">
          {groups.map(([title, links]) => (
            <div key={title} className="mb-1">
              <p className="px-2 pb-1 pt-2 text-[10px] uppercase tracking-[0.14em] text-white/35">{title}</p>
              {links.map(([href, label]) => {
                const active = isActive(pathname, href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-md px-2 py-1 text-[13px] ${active ? "bg-white text-ink" : "text-white/75 hover:bg-white/10 hover:text-white"}`}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
        <form action={signOut} className="px-2 pb-3">
          <button className="rounded-md px-2 py-1 text-[13px] text-white/70 hover:bg-white/10 hover:text-white">Sign out</button>
        </form>
      </aside>
    </div>
  );
}
