"use client";

import { useState } from "react";
import {
  addCertificate,
  addFaculty,
  addGalleryItem,
  addNotice,
  deleteCertificate,
  deleteFaculty,
  deleteGalleryItem,
  deleteNotice,
} from "@/lib/actions/content";
import { deleteResult, deleteTransportWindow, openTransportWindow, saveResult } from "@/lib/actions/academic";
import { createStaff, createStudent } from "@/lib/actions/people";
import { BLOOD_GROUPS, DEPARTMENTS, NOTICE_TYPES, SESSIONS, YEARS } from "@/lib/constants";
import { RemoveButton } from "@/components/remove-button";
import { Button, Note, Row, fieldClass } from "@/components/ui";
import { useAction } from "@/components/use-action";

function Form({ action, children, className = "grid gap-4" }) {
  const { message, ok, pending, run } = useAction();
  return (
    <form
      className={className}
      onSubmit={(event) => {
        event.preventDefault();
        run(action, event.currentTarget);
      }}
    >
      {children}
      <div className="flex flex-col gap-3 sm:col-span-2">
        <Note ok={ok}>{message}</Note>
        <Button disabled={pending} className="w-fit">{pending ? "Saving…" : "Save"}</Button>
      </div>
    </form>
  );
}

function Label({ children, className = "" }) {
  return <span className={`mb-1 block text-[11px] uppercase tracking-[0.14em] text-mute ${className}`}>{children}</span>;
}

export function FacultyManager({ rows }) {
  return (
    <div className="grid gap-12">
      <Form action={addFaculty} className="grid gap-4 sm:grid-cols-2">
        <label><Label>Name</Label><input name="name" required className={fieldClass} /></label>
        <label><Label>Department</Label>
          <select name="department" className={fieldClass}>{DEPARTMENTS.map((item) => <option key={item.code}>{item.code}</option>)}</select>
        </label>
        <label><Label>Designation</Label><input name="designation" className={fieldClass} /></label>
        <label><Label>Phone</Label><input name="phone" className={fieldClass} /></label>
        <label><Label>Email</Label><input name="email" type="email" className={fieldClass} /></label>
        <label><Label>Photograph</Label><input name="photo" type="file" accept="image/*" className={fieldClass} /></label>
        <label className="sm:col-span-2"><Label>Honours</Label><input name="education_bsc" className={fieldClass} /></label>
        <label className="sm:col-span-2"><Label>Masters</Label><input name="education_msc" className={fieldClass} /></label>
        <label className="sm:col-span-2"><Label>Doctorate</Label><input name="education_phd" className={fieldClass} /></label>
        <label><Label>Publication</Label><input name="publication_a" className={fieldClass} /></label>
        <label><Label>Publication</Label><input name="publication_b" className={fieldClass} /></label>
        <label className="sm:col-span-2"><Label>Publication</Label><input name="publication_c" className={fieldClass} /></label>
      </Form>
      <div>
        {rows.map((row) => (
          <Row key={row.id} title={row.name} meta={`${row.department}${row.designation ? ` · ${row.designation}` : ""}`}>
            <RemoveButton id={row.id} action={deleteFaculty} />
          </Row>
        ))}
      </div>
    </div>
  );
}

export function NoticeManager({ rows }) {
  return (
    <div className="grid gap-12">
      <Form action={addNotice} className="grid gap-4">
        <label><Label>Type</Label>
          <select name="category" className={fieldClass}>{NOTICE_TYPES.map((item) => <option key={item}>{item}</option>)}</select>
        </label>
        <label><Label>Title</Label><input name="title" required className={fieldClass} /></label>
        <label><Label>Date</Label><input name="notice_date" type="date" required className={fieldClass} /></label>
        <label><Label>Link</Label><input name="link" type="url" className={fieldClass} placeholder="https://" /></label>
        <label><Label>Description</Label><textarea name="description" className={`${fieldClass} min-h-28`} /></label>
      </Form>
      <div>
        {rows.map((row) => (
          <Row key={row.id} title={row.title} meta={`${row.category} · ${row.notice_date}`}>
            <RemoveButton id={row.id} action={deleteNotice} />
          </Row>
        ))}
      </div>
    </div>
  );
}

export function GalleryManager({ rows }) {
  return (
    <div className="grid gap-12">
      <Form action={addGalleryItem} className="grid gap-4">
        <label><Label>Title</Label><input name="title" className={fieldClass} /></label>
        <label><Label>Description</Label><textarea name="description" className={`${fieldClass} min-h-24`} /></label>
        <label><Label>Image</Label><input name="photo" type="file" accept="image/*" required className={fieldClass} /></label>
      </Form>
      <div className="grid gap-4 sm:grid-cols-2">
        {rows.map((row) => (
          <figure key={row.id} className="border border-line bg-white">
            <img src={row.image_url} alt="" className="h-48 w-full object-cover" />
            <figcaption className="flex items-center justify-between px-3 py-3 text-sm">
              <span>{row.title || "Untitled"}</span>
              <RemoveButton id={row.id} action={deleteGalleryItem} />
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export function CertificateManager({ rows }) {
  return (
    <div className="grid gap-12">
      <Form action={addCertificate} className="grid gap-4 sm:grid-cols-2">
        <label><Label>Student name</Label><input name="student_name" required className={fieldClass} /></label>
        <label><Label>Student ID</Label><input name="student_id" required className={fieldClass} /></label>
        <label><Label>Department</Label>
          <select name="department" className={fieldClass}>{DEPARTMENTS.map((item) => <option key={item.code}>{item.code}</option>)}</select>
        </label>
        <label><Label>Session</Label><input name="session" className={fieldClass} placeholder="Spring 2024" /></label>
        <label><Label>CGPA</Label><input name="cgpa" className={fieldClass} /></label>
        <label><Label>Scan</Label><input name="photo" type="file" accept="image/*" className={fieldClass} /></label>
      </Form>
      <div>
        {rows.map((row) => (
          <Row key={row.id} title={row.student_name} meta={`${row.student_id} · ${row.department} · CGPA ${row.cgpa || "—"}`}>
            <RemoveButton id={row.id} action={deleteCertificate} />
          </Row>
        ))}
      </div>
    </div>
  );
}

export function TransportWindowManager({ rows }) {
  return (
    <div className="grid gap-12">
      <Form action={openTransportWindow} className="grid gap-4 sm:grid-cols-2">
        <label><Label>Session</Label>
          <select name="session" className={fieldClass}>{SESSIONS.map((item) => <option key={item}>{item}</option>)}</select>
        </label>
        <label><Label>Year</Label>
          <select name="year" className={fieldClass}>{YEARS.map((item) => <option key={item}>{item}</option>)}</select>
        </label>
        <label><Label>Opens</Label><input name="start_date" type="date" className={fieldClass} /></label>
        <label><Label>Closes</Label><input name="end_date" type="date" className={fieldClass} /></label>
        <label className="sm:col-span-2"><Label>Note</Label><textarea name="description" className={`${fieldClass} min-h-24`} /></label>
      </Form>
      <div>
        {rows.map((row) => (
          <Row key={row.id} title={`${row.session} ${row.year}`} meta={`${row.start_date || "—"} → ${row.end_date || "—"}`}>
            <RemoveButton id={row.id} action={deleteTransportWindow} />
          </Row>
        ))}
      </div>
    </div>
  );
}

export function ResultEditor({ rows }) {
  const { message, ok, pending, run } = useAction();
  const [count, setCount] = useState(1);

  return (
    <div className="grid gap-12">
      <form
        className="grid gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          const form = event.currentTarget;
          const data = new FormData(form);
          const subjects = Array.from({ length: count }, (_, index) => ({
            name: data.get(`name_${index}`),
            credit: data.get(`credit_${index}`),
            marks: data.get(`marks_${index}`),
          }));
          data.set("subjects", JSON.stringify(subjects));
          run(async () => saveResult(data));
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label><Label>Student ID</Label><input name="student_id" required className={fieldClass} /></label>
          <label><Label>Student email</Label><input name="student_email" type="email" required className={fieldClass} /></label>
          <label><Label>Session</Label>
            <select name="session" className={fieldClass}>{SESSIONS.map((item) => <option key={item}>{item}</option>)}</select>
          </label>
          <label><Label>Year</Label>
            <select name="year" className={fieldClass}>{YEARS.map((item) => <option key={item}>{item}</option>)}</select>
          </label>
        </div>
        <label className="max-w-xs">
          <Label>Subjects</Label>
          <select className={fieldClass} value={count} onChange={(event) => setCount(Number(event.target.value))}>
            {Array.from({ length: 10 }, (_, index) => <option key={index + 1} value={index + 1}>{index + 1}</option>)}
          </select>
        </label>
        {Array.from({ length: count }, (_, index) => (
          <div key={index} className="grid gap-2 sm:grid-cols-[1fr_6rem_6rem]">
            <input name={`name_${index}`} placeholder="Subject" className={fieldClass} />
            <input name={`credit_${index}`} type="number" step="0.25" min="0" placeholder="Credit" className={fieldClass} />
            <input name={`marks_${index}`} type="number" min="0" max="100" placeholder="Marks" className={fieldClass} />
          </div>
        ))}
        <Note ok={ok}>{message}</Note>
        <Button disabled={pending} className="w-fit">{pending ? "Saving…" : "Save result"}</Button>
      </form>
      <div>
        {rows.map((row) => (
          <Row key={row.id} title={`${row.student_id} · ${row.session} ${row.year}`} meta={`GPA ${Number(row.gpa).toFixed(2)} · ${row.student_email}`}>
            <RemoveButton id={row.id} action={deleteResult} />
          </Row>
        ))}
      </div>
    </div>
  );
}

export function StudentCreator() {
  return (
    <div className="grid gap-8">
      <section>
        <h2 className="text-sm font-medium">Student</h2>
        <p className="mt-1 mb-3 text-xs text-mute">Creates a login and the academic profile together.</p>
        <Form action={createStudent} className="grid gap-x-3 gap-y-2 sm:grid-cols-2">
          <label><Label>Name</Label><input name="name" required className={fieldClass} /></label>
          <label><Label>Email</Label><input name="email" type="email" required className={fieldClass} /></label>
          <label><Label>Temporary password</Label><input name="password" type="password" required minLength={6} className={fieldClass} /></label>
          <label><Label>Student ID</Label><input name="student_id" required className={fieldClass} /></label>
          <label><Label>Department</Label>
            <select name="department" className={fieldClass}>{DEPARTMENTS.map((item) => <option key={item.code}>{item.code}</option>)}</select>
          </label>
          <label><Label>Enrolled semester</Label><input name="enrolled_semester" className={fieldClass} placeholder="Spring 2026" /></label>
          <label><Label>Gender</Label>
            <select name="gender" className={fieldClass}><option value="">—</option><option>Male</option><option>Female</option></select>
          </label>
          <label><Label>Blood group</Label>
            <select name="blood_group" className={fieldClass}><option value="">—</option>{BLOOD_GROUPS.map((item) => <option key={item}>{item}</option>)}</select>
          </label>
          <label><Label>Mobile</Label><input name="mobile" className={fieldClass} /></label>
          <label><Label>Date of birth</Label><input name="date_of_birth" className={fieldClass} placeholder="YYYY-MM-DD" /></label>
          <label><Label>Religion</Label><input name="religion" className={fieldClass} /></label>
          <label><Label>Nationality</Label><input name="nationality" className={fieldClass} /></label>
          <label><Label>Father</Label><input name="fathers_name" className={fieldClass} /></label>
          <label><Label>Mother</Label><input name="mothers_name" className={fieldClass} /></label>
          <label><Label>Guardian</Label><input name="guardian" className={fieldClass} /></label>
          <label><Label>Guardian phone</Label><input name="guardians_number" className={fieldClass} /></label>
          <label><Label>Guardian email</Label><input name="guardians_email" type="email" className={fieldClass} /></label>
          <label className="sm:col-span-2"><Label>Address</Label><input name="address" className={fieldClass} /></label>
          <label className="sm:col-span-2"><Label>Photograph</Label><input name="photo" type="file" accept="image/*" className={fieldClass} /></label>
        </Form>
      </section>
      <section>
        <h2 className="text-sm font-medium">Staff account</h2>
        <p className="mt-1 mb-3 text-xs text-mute">Another registry login. It does not create a student profile.</p>
        <Form action={createStaff} className="grid max-w-xl gap-y-2">
          <label><Label>Name</Label><input name="name" required className={fieldClass} /></label>
          <label><Label>Email</Label><input name="email" type="email" required className={fieldClass} /></label>
          <label><Label>Password</Label><input name="password" type="password" required minLength={6} className={fieldClass} /></label>
        </Form>
      </section>
    </div>
  );
}
