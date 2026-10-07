"use client";

import { addEvent, addFee, recordPayment, requestDocument, requestLeave, reviewDocument, reviewLeave } from "@/lib/actions/office";
import { CALENDAR_KINDS, DOCUMENT_KINDS, LEAVE_KINDS, SESSIONS, YEARS } from "@/lib/constants";
import { Note, fieldClass } from "@/components/ui";
import { useAction } from "@/components/use-action";

const compact = `${fieldClass} rounded-lg px-2.5 py-1.5`;

function Submit({ pending, label }) {
  return (
    <button type="submit" disabled={pending} className="rounded-lg bg-ink px-3 py-1.5 text-xs text-white disabled:opacity-50">
      {pending ? "Saving…" : label}
    </button>
  );
}

export function LeaveForm() {
  const { message, ok, pending, run } = useAction();
  return (
    <form
      className="grid gap-2 sm:grid-cols-4"
      onSubmit={(event) => {
        event.preventDefault();
        run(requestLeave, event.currentTarget);
      }}
    >
      <select name="kind" className={compact}>
        {LEAVE_KINDS.map((item) => <option key={item}>{item}</option>)}
      </select>
      <input name="start_date" type="date" required className={compact} />
      <input name="end_date" type="date" required className={compact} />
      <input name="reason" required placeholder="Reason" className={compact} />
      <div className="flex flex-wrap items-center gap-2 sm:col-span-4">
        <Submit pending={pending} label="Request leave" />
        <Note ok={ok}>{message}</Note>
      </div>
    </form>
  );
}

export function DocumentForm() {
  const { message, ok, pending, run } = useAction();
  return (
    <form
      className="grid gap-2 sm:grid-cols-4"
      onSubmit={(event) => {
        event.preventDefault();
        run(requestDocument, event.currentTarget);
      }}
    >
      <select name="kind" className={compact}>
        {DOCUMENT_KINDS.map((item) => <option key={item}>{item}</option>)}
      </select>
      <input name="copies" type="number" min="1" max="5" defaultValue="1" required className={compact} />
      <input name="purpose" required placeholder="Purpose" className={`${compact} sm:col-span-2`} />
      <div className="flex flex-wrap items-center gap-2 sm:col-span-4">
        <Submit pending={pending} label="Request document" />
        <Note ok={ok}>{message}</Note>
      </div>
    </form>
  );
}

export function StatusForm({ action, id, options, status }) {
  const { message, ok, pending, run } = useAction();
  return (
    <form
      className="flex flex-wrap items-center gap-1"
      onSubmit={(event) => {
        event.preventDefault();
        run(action, event.currentTarget);
      }}
    >
      <input type="hidden" name="id" value={id} />
      <select name="status" className="rounded-lg border border-line bg-white px-2 py-1 text-xs" defaultValue={status || options[0]}>
        {options.map((item) => <option key={item}>{item}</option>)}
      </select>
      <input name="review_note" placeholder="Note" className="w-24 rounded-lg border border-line px-2 py-1 text-xs" />
      <button type="submit" disabled={pending} className="rounded-lg bg-ink px-2 py-1 text-xs text-white disabled:opacity-50">
        {pending ? "…" : "Save"}
      </button>
      {message ? <span className={`text-[11px] ${ok ? "text-moss" : "text-clay"}`}>{message}</span> : null}
    </form>
  );
}

export function LeaveReview({ id, status }) {
  return <StatusForm action={reviewLeave} id={id} status={status} options={["pending", "approved", "rejected"]} />;
}

export function DocumentReview({ id, status }) {
  return <StatusForm action={reviewDocument} id={id} status={status} options={["pending", "ready", "collected", "rejected"]} />;
}

export function FeeForm() {
  const { message, ok, pending, run } = useAction();
  return (
    <form
      className="grid gap-2 sm:grid-cols-3"
      onSubmit={(event) => {
        event.preventDefault();
        run(addFee, event.currentTarget);
      }}
    >
      <input name="student_email" type="email" required placeholder="Student email" className={compact} />
      <input name="title" required placeholder="Tuition, lab, hall…" className={compact} />
      <input name="amount" type="number" min="1" step="0.01" required placeholder="Amount" className={compact} />
      <select name="session" className={compact}>
        {SESSIONS.map((item) => <option key={item}>{item}</option>)}
      </select>
      <select name="year" className={compact}>
        {YEARS.map((item) => <option key={item}>{item}</option>)}
      </select>
      <input name="due_date" type="date" className={compact} />
      <input name="paid" type="number" min="0" step="0.01" defaultValue="0" placeholder="Already paid" className={compact} />
      <div className="flex flex-wrap items-center gap-2 sm:col-span-2">
        <Submit pending={pending} label="Add fee" />
        <Note ok={ok}>{message}</Note>
      </div>
    </form>
  );
}

export function PaymentForm({ id, paid }) {
  const { message, ok, pending, run } = useAction();
  return (
    <form
      className="flex flex-wrap items-center gap-1"
      onSubmit={(event) => {
        event.preventDefault();
        run(recordPayment, event.currentTarget);
      }}
    >
      <input type="hidden" name="id" value={id} />
      <input name="paid" type="number" min="0" step="0.01" defaultValue={paid} className="w-24 rounded-lg border border-line px-2 py-1 text-xs" />
      <button type="submit" disabled={pending} className="rounded-lg bg-ink px-2 py-1 text-xs text-white disabled:opacity-50">
        {pending ? "…" : "Record"}
      </button>
      {message ? <span className={`text-[11px] ${ok ? "text-moss" : "text-clay"}`}>{message}</span> : null}
    </form>
  );
}

export function EventForm() {
  const { message, ok, pending, run } = useAction();
  return (
    <form
      className="grid gap-2 sm:grid-cols-4"
      onSubmit={(event) => {
        event.preventDefault();
        run(addEvent, event.currentTarget);
      }}
    >
      <input name="title" required placeholder="Title" className={`${compact} sm:col-span-2`} />
      <select name="category" className={compact}>
        {CALENDAR_KINDS.map((item) => <option key={item}>{item}</option>)}
      </select>
      <input name="event_date" type="date" required className={compact} />
      <input name="detail" placeholder="Detail" className={`${compact} sm:col-span-3`} />
      <div className="flex items-center">
        <Submit pending={pending} label="Add date" />
      </div>
      <div className="sm:col-span-4">
        <Note ok={ok}>{message}</Note>
      </div>
    </form>
  );
}
