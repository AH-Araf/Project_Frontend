import { redirect } from "next/navigation";
import { DashNav } from "@/components/dashboard/nav";
import { getSession } from "@/lib/auth";

export const metadata = { title: "Dashboard" };

export default async function DashboardLayout({ children }) {
  const { user, profile, configured } = await getSession();

  if (configured && !user) redirect("/login");

  const role = profile?.role === "admin" ? "admin" : "student";
  const name = profile?.name || user?.email || "Guest";

  return (
    <div className="min-h-screen bg-[#eef3ef] lg:grid lg:grid-cols-[12.75rem_minmax(0,1fr)]">
      <DashNav role={configured && user ? role : "student"} name={name} />
      <main className="min-w-0 px-2 py-2 sm:px-3 sm:py-3">
        <div className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/5 sm:p-4">
          {!configured ? (
            <p className="mb-6 border border-line bg-white px-4 py-3 text-sm text-mute">
              Add the Supabase URL and anon key in .env, run supabase/schema.sql, then reload.
            </p>
          ) : null}
          {children}
        </div>
      </main>
    </div>
  );
}
