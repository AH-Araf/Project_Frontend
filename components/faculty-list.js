"use client";

import { useMemo, useState } from "react";
import { DEPARTMENTS } from "@/lib/constants";

export function FacultyList({ rows }) {
  const [department, setDepartment] = useState("All");
  const visible = useMemo(
    () => (department === "All" ? rows : rows.filter((row) => row.department === department)),
    [rows, department]
  );

  return (
    <div>
      <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
        {["All", ...DEPARTMENTS.map((item) => item.code)].map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => setDepartment(code)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm ${department === code ? "bg-moss text-white" : "bg-white text-mute ring-1 ring-black/5"}`}
          >
            {code}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="text-sm text-mute">No faculty listed for this department yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {visible.map((person) => (
            <article key={person.id} className="overflow-hidden rounded-3xl bg-white p-5">
              <div className="flex gap-4">
                {person.photo_url ? (
                  <img src={person.photo_url} alt="" className="h-28 w-24 rounded-2xl object-cover" />
                ) : (
                  <div className="flex h-24 w-20 items-center justify-center bg-sand text-xs text-mute">Photo</div>
                )}
                <div>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-moss">{person.department}</p>
                  <h2 className="mt-1 font-serif text-2xl leading-tight">{person.name}</h2>
                  <p className="mt-1 text-sm text-mute">{person.designation}</p>
                </div>
              </div>
              <dl className="mt-4 space-y-1 text-sm text-mute">
                {person.email ? <div>{person.email}</div> : null}
                {person.phone ? <div>{person.phone}</div> : null}
              </dl>
              <div className="mt-4 space-y-2 text-sm leading-relaxed">
                {person.education_bsc ? <p><span className="text-mute">Honours. </span>{person.education_bsc}</p> : null}
                {person.education_msc ? <p><span className="text-mute">Masters. </span>{person.education_msc}</p> : null}
                {person.education_phd ? <p><span className="text-mute">Doctorate. </span>{person.education_phd}</p> : null}
                {[person.publication_a, person.publication_b, person.publication_c].filter(Boolean).length ? (
                  <p><span className="text-mute">Publications. </span>{[person.publication_a, person.publication_b, person.publication_c].filter(Boolean).join(" · ")}</p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
