"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { fieldClass } from "@/components/ui";
import { formatDate } from "@/lib/format";

export function NoticeBrowser({ rows }) {
  const [term, setTerm] = useState("");
  const [date, setDate] = useState("");

  const visible = useMemo(() => {
    return rows.filter((notice) => {
      const matchesTerm = !term || notice.title.toLowerCase().includes(term.toLowerCase());
      const matchesDate = !date || String(notice.notice_date).slice(0, 10) === date;
      return matchesTerm && matchesDate;
    });
  }, [rows, term, date]);

  return (
    <div>
      <div className="mb-8 grid gap-3 sm:grid-cols-[1fr_12rem]">
        <input className={fieldClass} placeholder="Search titles" value={term} onChange={(event) => setTerm(event.target.value)} />
        <input className={fieldClass} type="date" value={date} onChange={(event) => setDate(event.target.value)} />
      </div>
      {visible.length === 0 ? (
        <p className="text-sm text-mute">Nothing matches that search.</p>
      ) : (
        <ul className="grid gap-3">
          {visible.map((notice) => (
            <li key={notice.id}>
              <Link href={`/notices/${notice.id}`} className="grid gap-1 rounded-3xl bg-white px-5 py-5 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 sm:grid-cols-[9rem_1fr] sm:items-center">
                <span className="text-sm text-moss">{formatDate(notice.notice_date)}</span>
                <span>
                  <span className="block font-medium">{notice.title}</span>
                  <span className="text-sm text-mute">{notice.category}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
