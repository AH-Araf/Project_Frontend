import { redirect } from "next/navigation";
import { PrintButton } from "@/components/print-button";
import { calculateCgpa, gradeFromMarks } from "@/lib/gpa";
import { loadStudent } from "@/lib/guard";

export const metadata = { title: "Transcript" };

export default async function TranscriptPage() {
  const { session, student, results } = await loadStudent();
  if (session.profile?.role === "admin") redirect("/dashboard");
  const ordered = [...results].sort((a, b) => String(a.year).localeCompare(String(b.year)) || String(a.session).localeCompare(String(b.session)));

  return (
    <div>
      <div className="no-print flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold tracking-tight">Transcript</h1>
        <PrintButton />
      </div>
      <article className="mt-8 border border-line bg-white p-6 sm:p-10">
        <p className="text-[11px] uppercase tracking-[0.18em] text-moss">BAIUST</p>
        <h2 className="mt-2 font-serif text-3xl">Academic transcript</h2>
        <p className="mt-4 text-sm">{student?.name || session.profile?.name}</p>
        <p className="text-sm text-mute">{student ? `${student.student_id} · ${student.department}` : session.user?.email}</p>
        <div className="mt-8 space-y-6">
          {ordered.length === 0 ? <p className="text-sm text-mute">No semester results yet.</p> : null}
          {ordered.map((result) => (
            <section key={result.id}>
              <h3 className="text-sm">{result.session} {result.year} · GPA {Number(result.gpa).toFixed(2)}</h3>
              <ul className="mt-2 text-sm text-mute">
                {(result.subjects || []).map((subject) => (
                  <li key={subject.name}>{subject.name} · {gradeFromMarks(subject.marks).letter}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <p className="mt-8 border-t border-line pt-4 font-serif text-2xl">CGPA {calculateCgpa(ordered).toFixed(2)}</p>
      </article>
    </div>
  );
}
