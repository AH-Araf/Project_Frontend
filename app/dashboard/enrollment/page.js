import { redirect } from "next/navigation";
import { CourseAdvice } from "@/components/dashboard/assistant";
import { EnrollToggle } from "@/components/dashboard/enroll";
import { query } from "@/lib/data";
import { loadStudent } from "@/lib/guard";

export const metadata = { title: "Enrollment" };
export const maxDuration = 120;

export default async function EnrollmentPage() {
  const { session, student, registrations } = await loadStudent();
  if (session.profile?.role === "admin") redirect("/dashboard/admin/courses");

  const courses = student
    ? await query((supabase) => supabase.from("courses").select("*").eq("department", student.department).order("code"))
    : { data: [], error: null };
  const enrolled = session.user
    ? await query((supabase) => supabase.from("enrollments").select("course_id, session, year").eq("user_id", session.user.id))
    : { data: [] };

  const taken = new Set((enrolled.data || []).map((row) => `${row.course_id}|${row.session}|${row.year}`));

  return (
    <div>
      <h1 className="text-xl font-semibold tracking-tight">Enrollment</h1>
      <p className="mt-1 text-xs text-mute">Register the semester first. Courses stay inside that term’s credit limit and level.</p>
      <div className="mt-3"><CourseAdvice /></div>
      {!student ? <p className="mt-3 text-xs text-mute">A profile is required before you can enroll.</p> : null}
      {courses.error ? <p className="mt-3 text-sm text-clay">{courses.error}</p> : null}
      {registrations.length === 0 ? <p className="mt-3 text-xs text-mute">No semester registration yet.</p> : null}
      <div className="mt-3 space-y-4">
        {registrations.map((term) => {
          const offered = courses.data.filter((course) => course.level_term === term.level_term);
          const used = offered
            .filter((course) => taken.has(`${course.id}|${term.session}|${term.year}`))
            .reduce((sum, course) => sum + Number(course.credit), 0);
          return (
            <section key={term.id}>
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="text-sm font-medium">{term.session} {term.year} · Level {term.level_term}</h2>
                <p className="text-xs text-mute">{used} / {term.credits} credits</p>
              </div>
              <ul className="mt-1 divide-y divide-line border-y border-line">
                {offered.length === 0 ? <li className="py-2 text-xs text-mute">No courses published for this level.</li> : null}
                {offered.map((course) => {
                  const on = taken.has(`${course.id}|${term.session}|${term.year}`);
                  return (
                    <li key={course.id} className="flex flex-col gap-1 py-2 text-xs sm:flex-row sm:items-center sm:justify-between">
                      <span>
                        <span className="font-medium">{course.code}</span> {course.title}
                        <span className="text-mute"> · {course.credit}</span>
                      </span>
                      <EnrollToggle courseId={course.id} session={term.session} year={term.year} enrolled={on} />
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
