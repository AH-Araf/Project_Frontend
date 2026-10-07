"use client";

import { addCourse, dropEnrollment, enrollInCourse } from "@/lib/actions/enrollment";
import { DEPARTMENTS, LEVELS } from "@/lib/constants";
import { Note, fieldClass } from "@/components/ui";
import { useAction } from "@/components/use-action";

const compact = `${fieldClass} rounded-lg px-2.5 py-1.5`;

export function EnrollToggle({ courseId, session, year, enrolled }) {
  const { message, ok, pending, run } = useAction();
  return (
    <form
      className="flex items-center gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        run(enrolled ? dropEnrollment : enrollInCourse, event.currentTarget);
      }}
    >
      <input type="hidden" name="course_id" value={courseId} />
      <input type="hidden" name="session" value={session} />
      <input type="hidden" name="year" value={year} />
      <button type="submit" disabled={pending} className={`rounded-lg px-2 py-1 text-xs disabled:opacity-50 ${enrolled ? "text-clay" : "bg-ink text-white"}`}>
        {pending ? "…" : enrolled ? "Drop" : "Enroll"}
      </button>
      {message ? <span className={`text-[11px] ${ok ? "text-moss" : "text-clay"}`}>{message}</span> : null}
    </form>
  );
}

export function CourseForm() {
  const { message, ok, pending, run } = useAction();
  return (
    <form
      className="grid gap-2 sm:grid-cols-3"
      onSubmit={(event) => {
        event.preventDefault();
        run(addCourse, event.currentTarget);
      }}
    >
      <input name="code" required placeholder="CSE 2101" className={compact} />
      <input name="title" required placeholder="Course title" className={`${compact} sm:col-span-2`} />
      <select name="department" className={compact}>
        {DEPARTMENTS.map((item) => <option key={item.code}>{item.code}</option>)}
      </select>
      <select name="level_term" className={compact}>
        {LEVELS.map((item) => <option key={item.term}>{item.term}</option>)}
      </select>
      <input name="credit" type="number" min="0.5" step="0.25" required placeholder="Credit" className={compact} />
      <div className="flex flex-wrap items-center gap-2 sm:col-span-3">
        <button type="submit" disabled={pending} className="rounded-lg bg-ink px-3 py-1.5 text-xs text-white disabled:opacity-50">
          {pending ? "Saving…" : "Add course"}
        </button>
        <Note ok={ok}>{message}</Note>
      </div>
    </form>
  );
}
