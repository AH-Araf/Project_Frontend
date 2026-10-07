"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { deleteStudent } from "@/lib/actions/people";
import { RemoveButton } from "@/components/remove-button";
import { fieldClass } from "@/components/ui";

export function StudentSearch({ rows }) {
  const [term, setTerm] = useState("");
  const visible = useMemo(() => {
    const query = term.trim().toLowerCase();
    if (!query) return rows;
    return rows.filter((row) =>
      [row.name, row.student_id, row.email, row.department].join(" ").toLowerCase().includes(query)
    );
  }, [rows, term]);

  return (
    <div>
      <input className={`${fieldClass} mb-6 max-w-md`} placeholder="Search name, ID, email" value={term} onChange={(event) => setTerm(event.target.value)} />
      <div className="divide-y divide-line border-y border-line">
        {visible.length === 0 ? <p className="py-4 text-sm text-mute">No students match.</p> : null}
        {visible.map((row) => (
          <div key={row.id} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Link href={`/dashboard/admin/students/${row.id}`} className="hover:underline">{row.name}</Link>
              <p className="text-sm text-mute">{row.student_id} · {row.department} · {row.email}</p>
            </div>
            <RemoveButton id={row.id} action={deleteStudent} />
          </div>
        ))}
      </div>
    </div>
  );
}
