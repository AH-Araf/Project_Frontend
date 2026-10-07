import { redirect } from "next/navigation";
import { loadStudent } from "@/lib/guard";

export const metadata = { title: "Profile" };

const FIELDS = [
  ["student_id", "Student ID"],
  ["department", "Department"],
  ["enrolled_semester", "Enrolled semester"],
  ["email", "Email"],
  ["mobile", "Mobile"],
  ["gender", "Gender"],
  ["date_of_birth", "Date of birth"],
  ["blood_group", "Blood group"],
  ["religion", "Religion"],
  ["nationality", "Nationality"],
  ["fathers_name", "Father"],
  ["mothers_name", "Mother"],
  ["guardian", "Guardian"],
  ["guardians_number", "Guardian phone"],
  ["guardians_email", "Guardian email"],
  ["address", "Address"],
];

export default async function ProfilePage() {
  const { session, student } = await loadStudent();
  if (session.profile?.role === "admin") redirect("/dashboard");
  if (!student) {
    return <p className="text-sm text-mute">The registry has not created your profile yet.</p>;
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        {student.photo_url ? (
          <img src={student.photo_url} alt="" className="h-16 w-14 rounded-lg object-cover" />
        ) : null}
        <div>
          <p className="text-[10px] uppercase tracking-[0.16em] text-moss">{student.department}</p>
          <h1 className="text-xl font-semibold tracking-tight">{student.name}</h1>
          <p className="text-xs text-mute">{student.student_id}</p>
        </div>
      </div>
      <dl className="mt-3 grid gap-px overflow-hidden rounded-xl bg-line sm:grid-cols-2 lg:grid-cols-3">
        {FIELDS.map(([key, label]) => (
          <div key={key} className="bg-white px-3 py-2">
            <dt className="text-[10px] uppercase tracking-[0.12em] text-mute">{label}</dt>
            <dd className="text-sm">{student[key] || "—"}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
