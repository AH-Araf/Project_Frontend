import { redirect } from "next/navigation";
import { LEVELS, PROGRAMS } from "@/lib/constants";
import { loadStudent } from "@/lib/guard";
import { media } from "@/lib/media";

export const metadata = { title: "Courses" };

export default async function CoursesPage() {
  const { session, student } = await loadStudent();
  if (session.profile?.role === "admin") redirect("/dashboard");

  const program = PROGRAMS.find((item) => item.code === student?.department);

  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.16em] text-moss">Curriculum</p>
      <h1 className="text-xl font-semibold tracking-tight">{program?.name || "Programmes"}</h1>
      <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {PROGRAMS.map((item) => (
          <a
            key={item.code}
            href={media(item.pdf)}
            download
            className={`rounded-xl px-3 py-2 text-xs ring-1 ring-black/5 ${item.code === student?.department ? "bg-moss text-white" : "bg-paper hover:bg-sand"}`}
          >
            <span className="block text-sm font-medium">{item.code}</span>
            <span className={item.code === student?.department ? "text-white/80" : "text-mute"}>{item.name}</span>
          </a>
        ))}
      </div>
      <table className="mt-4 w-full text-left text-xs">
        <thead className="border-b border-line text-mute">
          <tr>
            <th className="py-1.5 font-normal">Level · term</th>
            <th className="py-1.5 font-normal">Credits</th>
          </tr>
        </thead>
        <tbody>
          {LEVELS.map((level) => (
            <tr key={level.term} className="border-b border-line">
              <td className="py-1.5">{level.term}</td>
              <td className="py-1.5">{level.credits}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
