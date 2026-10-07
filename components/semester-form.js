"use client";

import { registerSemester } from "@/lib/actions/academic";
import { LEVELS, SESSIONS, YEARS } from "@/lib/constants";
import { Button, Note, fieldClass } from "@/components/ui";
import { useAction } from "@/components/use-action";
import { useState } from "react";

export function SemesterForm() {
  const { message, ok, pending, run } = useAction();
  const [credits, setCredits] = useState(LEVELS[0].credits);

  return (
    <form
      className="grid gap-4 border border-line bg-white p-5 sm:grid-cols-2"
      onSubmit={(event) => {
        event.preventDefault();
        run(registerSemester, event.currentTarget);
      }}
    >
      <label className="block">
        <span className="mb-1.5 block text-[11px] uppercase tracking-[0.16em] text-mute">Session</span>
        <select name="session" className={fieldClass}>
          {SESSIONS.map((item) => <option key={item}>{item}</option>)}
        </select>
      </label>
      <label className="block">
        <span className="mb-1.5 block text-[11px] uppercase tracking-[0.16em] text-mute">Year</span>
        <select name="year" className={fieldClass}>
          {YEARS.map((item) => <option key={item}>{item}</option>)}
        </select>
      </label>
      <label className="block sm:col-span-2">
        <span className="mb-1.5 block text-[11px] uppercase tracking-[0.16em] text-mute">Level and term</span>
        <select
          name="level_term"
          className={fieldClass}
          defaultValue={LEVELS[0].term}
          onChange={(event) => {
            const match = LEVELS.find((item) => item.term === event.target.value);
            setCredits(match?.credits || 0);
          }}
        >
          {LEVELS.map((item) => <option key={item.term} value={item.term}>{item.term}</option>)}
        </select>
      </label>
      <p className="text-sm text-mute sm:col-span-2">Credit load for this term: {credits}</p>
      <div className="sm:col-span-2 flex flex-col gap-3">
        <Note ok={ok}>{message}</Note>
        <Button disabled={pending}>{pending ? "Saving…" : "Register"}</Button>
      </div>
    </form>
  );
}
