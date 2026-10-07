import Link from "next/link";
import { StudentSearch } from "@/components/student-search";
import { query } from "@/lib/data";
import { guardAdmin } from "@/lib/guard";

export const metadata = { title: "Students" };

export default async function StudentsPage() {
  await guardAdmin();
  const students = await query((supabase) => supabase.from("students").select("*").order("created_at", { ascending: false }));

  return (
    <div>
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="text-xl font-semibold tracking-tight">Students</h1>
        <Link href="/dashboard/admin/students/new" className="text-sm text-moss">New student</Link>
      </div>
      <StudentSearch rows={students.data} />
    </div>
  );
}
