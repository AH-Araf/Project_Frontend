import Link from "next/link";
import { redirect } from "next/navigation";
import { SemesterForm } from "@/components/semester-form";
import { loadStudent } from "@/lib/guard";

export const metadata = { title: "Semester registration" };

export default async function SemesterPage() {
  const { session, student, registrations } = await loadStudent();
  if (session.profile?.role === "admin") redirect("/dashboard");

  return (
    <div>
      <h1 className="text-xl font-semibold tracking-tight">Semester</h1>
      <p className="mt-3 max-w-xl text-sm text-mute">
        {student ? `${student.name} · ${student.student_id}` : "A profile is required before you can register."}
      </p>
      <div className="mt-8">{student ? <SemesterForm /> : null}</div>
      <p className="mt-4 text-xs text-mute">After a term is registered, choose its courses on <Link href="/dashboard/enrollment" className="text-moss">Enrollment</Link>.</p>
      <h2 className="mt-8 text-sm font-medium">Previous registrations</h2>
      <ul className="mt-4 divide-y divide-line border-y border-line">
        {registrations.length === 0 ? <li className="py-4 text-sm text-mute">None yet.</li> : null}
        {registrations.map((row) => (
          <li key={row.id} className="flex flex-col gap-1 py-4 text-sm sm:flex-row sm:justify-between">
            <span>{row.session} {row.year} · Level {row.level_term}</span>
            <span className="text-mute">{row.credits} credits</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
