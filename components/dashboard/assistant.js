"use client";

import { adviseEnrollment, askRegistry, askStudentAssistant, briefNotices, draftDocumentReply, draftFeeReminders, draftNotice, readMarkSheet, rebuildAssistantIndex, recommendLeave, summarizeAdmission, writeDeskNote } from "@/lib/actions/assistant";
import { correctResultGpa } from "@/lib/actions/academic";
import { SESSIONS, YEARS } from "@/lib/constants";
import { fieldClass } from "@/components/ui";
import { useAction } from "@/components/use-action";

const compact = `${fieldClass} rounded-lg px-2.5 py-1.5`;

function Ask({ action, children, label }) {
  const { message, ok, pending, run } = useAction();
  return (
    <form
      className="grid gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        run(action, event.currentTarget);
      }}
    >
      {children}
      <div className="flex flex-wrap items-center gap-2">
        <button type="submit" disabled={pending} className="rounded-lg bg-ink px-3 py-1.5 text-xs text-white disabled:opacity-50">
          {pending ? "Working…" : label}
        </button>
      </div>
      {message ? <p className={`text-xs leading-relaxed ${ok ? "text-ink" : "text-clay"}`}>{message}</p> : null}
    </form>
  );
}

export function StudentAsk() {
  return (
    <Ask action={askStudentAssistant} label="Ask">
      <textarea name="question" required rows={3} placeholder="What is my CGPA, and which Spring 2026 courses am I still missing?" className={compact} />
    </Ask>
  );
}

export function CourseAdvice() {
  const { message, ok, pending, run } = useAction();
  return (
    <div>
      <button type="button" disabled={pending} onClick={() => run(adviseEnrollment)} className="rounded-lg bg-ink px-3 py-1.5 text-xs text-white disabled:opacity-50">
        {pending ? "Reading the catalogue…" : "Suggest courses"}
      </button>
      {message ? <p className={`mt-2 text-xs leading-relaxed ${ok ? "text-ink" : "text-clay"}`}>{message}</p> : null}
    </div>
  );
}

export function NoticeBrief() {
  return (
    <Ask action={briefNotices} label="Explain">
      <textarea name="topic" required rows={2} placeholder="What should I do about the midterm notice?" className={compact} />
    </Ask>
  );
}

export function LeaveSuggest({ id }) {
  const { message, ok, pending, run } = useAction();
  return (
    <form
      className="mt-1"
      onSubmit={(event) => {
        event.preventDefault();
        run(recommendLeave, event.currentTarget);
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" disabled={pending} className="rounded-lg border border-line bg-white px-2 py-1 text-[11px] disabled:opacity-50">
        {pending ? "Reading…" : "Suggest a decision"}
      </button>
      {message ? <p className={`mt-1 max-w-[16rem] text-[11px] leading-relaxed ${ok ? "text-ink" : "text-clay"}`}>{message}</p> : null}
    </form>
  );
}

export function FeeReminders() {
  const { message, ok, pending, run } = useAction();
  return (
    <div className="mt-3">
      <button type="button" disabled={pending} onClick={() => run(draftFeeReminders)} className="rounded-lg bg-ink px-3 py-1.5 text-xs text-white disabled:opacity-50">
        {pending ? "Writing…" : "Draft fee reminders"}
      </button>
      {message ? <p className={`mt-2 whitespace-pre-wrap text-xs leading-relaxed ${ok ? "text-ink" : "text-clay"}`}>{message}</p> : null}
    </div>
  );
}

export function DocumentReply({ id }) {
  const { message, ok, pending, run } = useAction();
  return (
    <form
      className="mt-1"
      onSubmit={(event) => {
        event.preventDefault();
        run(draftDocumentReply, event.currentTarget);
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" disabled={pending} className="rounded-lg border border-line bg-white px-2 py-1 text-[11px] disabled:opacity-50">
        {pending ? "Writing…" : "Draft a reply"}
      </button>
      {message ? <p className={`mt-1 max-w-[16rem] text-[11px] leading-relaxed ${ok ? "text-ink" : "text-clay"}`}>{message}</p> : null}
    </form>
  );
}

export function RegistryAsk() {
  return (
    <Ask action={askRegistry} label="Ask the registry">
      <textarea name="question" required rows={3} placeholder="What does Nusrat Jahan still owe, and which courses is she enrolled in?" className={compact} />
    </Ask>
  );
}

export function RebuildIndexButton() {
  const { message, ok, pending, run } = useAction();
  return (
    <div>
      <button type="button" disabled={pending} onClick={() => run(rebuildAssistantIndex)} className="rounded-lg bg-ink px-3 py-1.5 text-xs text-white disabled:opacity-50">
        {pending ? "Indexing…" : "Rebuild index"}
      </button>
      {message ? <p className={`mt-2 text-xs leading-relaxed ${ok ? "text-ink" : "text-clay"}`}>{message}</p> : null}
    </div>
  );
}

export function NoticeDraft() {
  return (
    <Ask action={draftNotice} label="Draft and post">
      <textarea name="instruction" required rows={3} placeholder="Midterm for levels 1 and 2 starts 20 October. Students need admit cards." className={compact} />
    </Ask>
  );
}

export function MarkSheetReader() {
  return (
    <Ask action={readMarkSheet} label="Read sheet and save">
      <div className="grid gap-2 sm:grid-cols-2">
        <input name="student_id" required placeholder="Student ID" className={compact} />
        <input name="student_email" type="email" required placeholder="Student email" className={compact} />
        <select name="session" className={compact}>{SESSIONS.map((item) => <option key={item}>{item}</option>)}</select>
        <select name="year" className={compact}>{YEARS.map((item) => <option key={item}>{item}</option>)}</select>
      </div>
      <textarea name="sheet" required rows={4} placeholder={"Data Structures, 3 credit, 85\nObject Oriented Programming, 3, 78"} className={compact} />
    </Ask>
  );
}

export function DeskNoteButton() {
  const { message, ok, pending, run } = useAction();
  return (
    <div>
      <button type="button" disabled={pending} onClick={() => run(writeDeskNote)} className="rounded-lg bg-ink px-3 py-1.5 text-xs text-white disabled:opacity-50">
        {pending ? "Writing…" : "Write morning note"}
      </button>
      {message ? <p className={`mt-2 text-xs leading-relaxed ${ok ? "text-ink" : "text-clay"}`}>{message}</p> : null}
    </div>
  );
}

export function AdmissionBrief({ id }) {
  const { message, ok, pending, run } = useAction();
  return (
    <form
      className="mt-4"
      onSubmit={(event) => {
        event.preventDefault();
        run(summarizeAdmission, event.currentTarget);
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" disabled={pending} className="rounded-lg bg-ink px-3 py-1.5 text-xs text-white disabled:opacity-50">
        {pending ? "Reading…" : "Write a file note"}
      </button>
      {message ? <p className={`mt-2 text-xs leading-relaxed ${ok ? "text-ink" : "text-clay"}`}>{message}</p> : null}
    </form>
  );
}

export function FixGpa({ id }) {
  const { message, ok, pending, run } = useAction();
  return (
    <form
      className="inline"
      onSubmit={(event) => {
        event.preventDefault();
        run(() => correctResultGpa(id));
      }}
    >
      <button type="submit" disabled={pending} className="rounded-lg bg-ink px-2 py-1 text-xs text-white disabled:opacity-50">
        {pending ? "…" : "Correct GPA"}
      </button>
      {message ? <span className={`ml-2 text-[11px] ${ok ? "text-moss" : "text-clay"}`}>{message}</span> : null}
    </form>
  );
}
