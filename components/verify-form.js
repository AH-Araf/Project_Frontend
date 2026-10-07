"use client";

import { useState, useTransition } from "react";
import { verifyCertificate } from "@/lib/actions/content";
import { DEPARTMENTS } from "@/lib/constants";
import { Button, Note, fieldClass } from "@/components/ui";

export function VerifyForm() {
  const [pending, start] = useTransition();
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);

  return (
    <div>
      <form
        className="grid gap-4 rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-black/5 sm:grid-cols-[1fr_1fr_auto] sm:items-end sm:p-7"
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          start(async () => {
            const response = await verifyCertificate(data);
            setResult(response.ok ? response : null);
            setMessage(response.ok ? "Record found." : response.message);
          });
        }}
      >
        <label className="block">
          <span className="mb-1.5 block text-[11px] uppercase tracking-[0.16em] text-mute">Department</span>
          <select name="department" required className={fieldClass} defaultValue="">
            <option value="" disabled>Select</option>
            {DEPARTMENTS.map((item) => (
              <option key={item.code} value={item.code}>{item.code}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[11px] uppercase tracking-[0.16em] text-mute">Student ID</span>
          <input name="student_id" required className={fieldClass} />
        </label>
        <Button disabled={pending}>{pending ? "Checking…" : "Verify"}</Button>
      </form>

      <div className="mt-4">
        <Note ok={Boolean(result)}>{message}</Note>
      </div>

      {result?.certificate ? (
        <article className="mt-8 grid gap-6 rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-black/5 sm:grid-cols-[1fr_180px] sm:p-7">
          <div className="space-y-2 text-sm">
            <h2 className="font-serif text-3xl">{result.certificate.student_name}</h2>
            <p>ID {result.certificate.student_id}</p>
            <p>{result.certificate.department} · {result.certificate.session || "Session not listed"}</p>
            <p>CGPA {result.certificate.cgpa || "—"}</p>
            {result.certificate.image_url ? (
              <img src={result.certificate.image_url} alt="Certificate" className="mt-4 max-h-80 w-full object-contain" />
            ) : null}
          </div>
          <div className="flex flex-col items-center justify-center gap-2 border border-line p-3">
            <img src={result.qr} alt="QR code for this certificate" className="h-40 w-40" />
            <p className="text-center text-xs text-mute">Scan for the recorded details</p>
          </div>
        </article>
      ) : null}
    </div>
  );
}
