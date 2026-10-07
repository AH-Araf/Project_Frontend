import { redirect } from "next/navigation";
import { gradeFromMarks } from "@/lib/gpa";
import { loadStudent } from "@/lib/guard";

export const metadata = { title: "Results" };

export default async function ResultsPage() {
  const { session, results } = await loadStudent();
  if (session.profile?.role === "admin") redirect("/dashboard/admin/results");

  return (
    <div>
      <h1 className="text-xl font-semibold tracking-tight">Results</h1>
      {results.length === 0 ? <p className="mt-6 text-sm text-mute">No results published for your email yet.</p> : null}
      <div className="mt-8 space-y-8">
        {results.map((result) => (
          <section key={result.id}>
            <h2 className="text-sm text-mute">{result.session} {result.year}</h2>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[28rem] text-left text-sm">
                <thead className="border-b border-line text-mute">
                  <tr>
                    <th className="py-2 font-normal">Subject</th>
                    <th className="py-2 font-normal">Credit</th>
                    <th className="py-2 font-normal">Marks</th>
                    <th className="py-2 font-normal">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {(result.subjects || []).map((subject) => (
                    <tr key={subject.name} className="border-b border-line">
                      <td className="py-3">{subject.name}</td>
                      <td className="py-3">{subject.credit}</td>
                      <td className="py-3">{subject.marks}</td>
                      <td className="py-3">{gradeFromMarks(subject.marks).letter}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm">GPA {Number(result.gpa).toFixed(2)}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
