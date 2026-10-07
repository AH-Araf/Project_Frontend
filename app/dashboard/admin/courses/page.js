import { CourseForm } from "@/components/dashboard/enroll";
import { RemoveButton } from "@/components/remove-button";
import { deleteCourse } from "@/lib/actions/enrollment";
import { query } from "@/lib/data";
import { guardAdmin } from "@/lib/guard";

export const metadata = { title: "Courses" };

export default async function AdminCoursesPage() {
  await guardAdmin();
  const [courses, enrollments] = await Promise.all([
    query((supabase) => supabase.from("courses").select("*").order("department").order("level_term").order("code")),
    query((supabase) => supabase.from("enrollments").select("course_id")),
  ]);
  const counts = {};
  for (const row of enrollments.data) counts[row.course_id] = (counts[row.course_id] || 0) + 1;

  return (
    <div>
      <h1 className="text-xl font-semibold tracking-tight">Courses</h1>
      <p className="mt-1 text-xs text-mute">Students enroll after they register the matching level and term.</p>
      <div className="mt-3 rounded-xl bg-paper p-3 ring-1 ring-black/5">
        <CourseForm />
      </div>
      {courses.error ? <p className="mt-3 text-sm text-clay">{courses.error}</p> : null}
      <ul className="mt-3 divide-y divide-line border-y border-line">
        {courses.data.length === 0 ? <li className="py-2 text-xs text-mute">No courses yet.</li> : null}
        {courses.data.map((course) => (
          <li key={course.id} className="flex flex-col gap-1 py-2 text-xs sm:flex-row sm:items-center sm:justify-between">
            <span>
              <span className="font-medium">{course.department} · {course.code}</span> {course.title}
              <span className="text-mute"> · level {course.level_term} · {course.credit} cr · {counts[course.id] || 0} enrolled</span>
            </span>
            <RemoveButton id={course.id} action={deleteCourse} />
          </li>
        ))}
      </ul>
    </div>
  );
}
