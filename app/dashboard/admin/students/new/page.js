import { StudentCreator } from "@/components/admin/managers";
import { guardAdmin } from "@/lib/guard";

export const metadata = { title: "New student" };

export default async function NewStudentPage() {
  await guardAdmin();
  return (
    <div>
      <h1 className="mb-3 text-xl font-semibold tracking-tight">New account</h1>
      <StudentCreator />
    </div>
  );
}
