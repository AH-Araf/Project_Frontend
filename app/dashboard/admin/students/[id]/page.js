import Link from "next/link";
import { notFound } from "next/navigation";
import { queryOne } from "@/lib/data";
import { guardAdmin } from "@/lib/guard";

export const metadata = { title: "Student" };

export default async function StudentDetailPage({ params }) {
  await guardAdmin();
  const { id } = await params;
  const student = await queryOne((supabase) => supabase.from("students").select("*").eq("id", id).maybeSingle());
  if (!student.data || Array.isArray(student.data)) notFound();
  const row = student.data;

  const fields = Object.entries({
    "Student ID": row.student_id,
    Department: row.department,
    Email: row.email,
    Mobile: row.mobile,
    Semester: row.enrolled_semester,
    Gender: row.gender,
    "Date of birth": row.date_of_birth,
    "Blood group": row.blood_group,
    Religion: row.religion,
    Nationality: row.nationality,
    Father: row.fathers_name,
    Mother: row.mothers_name,
    Guardian: row.guardian,
    "Guardian phone": row.guardians_number,
    "Guardian email": row.guardians_email,
    Address: row.address,
  });

  return (
    <div>
      <Link href="/dashboard/admin/students" className="text-sm text-mute">All students</Link>
      <div className="mt-4 flex flex-col gap-5 sm:flex-row">
        {row.photo_url ? <img src={row.photo_url} alt="" className="h-36 w-28 object-cover" /> : null}
        <h1 className="text-xl font-semibold tracking-tight">{row.name}</h1>
      </div>
      <dl className="mt-8 divide-y divide-line border-y border-line">
        {fields.map(([label, value]) => (
          <div key={label} className="grid gap-1 py-3 text-sm sm:grid-cols-[12rem_1fr]">
            <dt className="text-mute">{label}</dt>
            <dd>{value || "—"}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
