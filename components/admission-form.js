"use client";

import { applyForAdmission } from "@/lib/actions/people";
import { DEPARTMENTS } from "@/lib/constants";
import { Button, Field, Note, fieldClass } from "@/components/ui";
import { useAction } from "@/components/use-action";

export function AdmissionForm() {
  const { message, ok, pending, run } = useAction();

  return (
    <form
      className="grid gap-4 sm:grid-cols-2"
      onSubmit={(event) => {
        event.preventDefault();
        run(applyForAdmission, event.currentTarget);
      }}
    >
      <Field label="Full name" name="name" required />
      <Field label="Email" name="email" type="email" required />
      <Field label="Phone" name="phone" />
      <Field label="Age" name="age" />
      <Field label="Programme" name="subject" as="select" required>
        <select name="subject" required className={fieldClass}>
          <option value="">Select</option>
          {DEPARTMENTS.map((item) => (
            <option key={item.code} value={item.code}>{item.name}</option>
          ))}
        </select>
      </Field>
      <Field label="SSC / HSC board" name="board" />
      <Field label="SSC result" name="ssc_result" />
      <Field label="HSC result" name="hsc_result" />
      <div className="sm:col-span-2">
        <Field label="Address" name="address" />
      </div>
      <Field label="Transaction number" name="transaction_number" />
      <Field label="Transaction ID" name="transaction_id" />
      <div className="sm:col-span-2">
        <Field label="Photograph" name="photo" type="file" accept="image/*" />
      </div>
      <div className="sm:col-span-2 flex flex-col gap-3">
        <Note ok={ok}>{message}</Note>
        <Button disabled={pending}>{pending ? "Sending…" : "Submit application"}</Button>
      </div>
    </form>
  );
}
