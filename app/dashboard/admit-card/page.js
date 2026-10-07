import { redirect } from "next/navigation";
import { PrintButton } from "@/components/print-button";
import { loadStudent } from "@/lib/guard";

export const metadata = { title: "Admit card" };

export default async function AdmitCardPage() {
  const { session, student, registrations } = await loadStudent();
  if (session.profile?.role === "admin") redirect("/dashboard");
  const latest = registrations[0];

  return (
    <div>
      <div className="no-print mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">Admit card</h1>
        <PrintButton label="Print card" />
      </div>
      {!student ? <p className="text-sm text-mute">Your profile is required before a card can be issued.</p> : (
        <article className="max-w-xl border border-ink bg-white p-6 sm:p-8">
          <p className="text-[11px] uppercase tracking-[0.18em] text-moss">BAIUST · Term final</p>
          <h2 className="mt-3 font-serif text-3xl">{latest ? `${latest.session} ${latest.year}` : "Current term"}</h2>
          <div className="mt-6 flex gap-5">
            {student.photo_url ? <img src={student.photo_url} alt="" className="h-28 w-24 object-cover" /> : null}
            <dl className="space-y-1 text-sm">
              <div><span className="text-mute">Name </span>{student.name}</div>
              <div><span className="text-mute">ID </span>{student.student_id}</div>
              <div><span className="text-mute">Department </span>{student.department}</div>
              {latest ? <div><span className="text-mute">Level </span>{latest.level_term}</div> : null}
            </dl>
          </div>
        </article>
      )}
    </div>
  );
}
