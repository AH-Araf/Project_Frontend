import Link from "next/link";
import { DEPARTMENTS, LEVELS } from "@/lib/constants";
import { balance, formatDate, money } from "@/lib/format";
import { calculateCgpa } from "@/lib/gpa";
import { query } from "@/lib/data";
import { loadStudent } from "@/lib/guard";

const PROGRAMME_CREDITS = LEVELS.reduce((sum, level) => sum + level.credits, 0);

function Tile({ href, label, value, hint }) {
  return (
    <Link href={href} className="rounded-lg bg-paper px-2.5 py-2 ring-1 ring-black/5 hover:bg-sand/60">
      <p className="text-lg font-semibold leading-none tracking-tight">{value}</p>
      <p className="mt-1 text-[11px] text-ink">{label}</p>
      {hint ? <p className="text-[10px] text-mute">{hint}</p> : null}
    </Link>
  );
}

function Block({ title, href, children }) {
  return (
    <section className="rounded-xl ring-1 ring-black/5">
      <div className="flex items-center justify-between border-b border-line px-3 py-1.5">
        <h2 className="text-xs font-medium">{title}</h2>
        {href ? <Link href={href} className="text-[11px] text-moss">Open</Link> : null}
      </div>
      <div className="px-3 py-2">{children}</div>
    </section>
  );
}

export default async function DashboardHome() {
  const { session, student, results, registrations } = await loadStudent();
  if (!session.configured) return null;

  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });

  if (session.profile?.role === "admin") {
    const [students, admissionCount, admissions, noticeCount, notices, faculty, certificates, resultRows, cards, leaves, documents, fees, events] = await Promise.all([
      query((supabase) => supabase.from("students").select("id, department")),
      query((supabase) => supabase.from("admissions").select("id")),
      query((supabase) => supabase.from("admissions").select("id, name, subject").order("created_at", { ascending: false }).limit(5)),
      query((supabase) => supabase.from("notices").select("id")),
      query((supabase) => supabase.from("notices").select("id, title, category, notice_date").order("notice_date", { ascending: false }).limit(4)),
      query((supabase) => supabase.from("faculty").select("id")),
      query((supabase) => supabase.from("certificates").select("id")),
      query((supabase) => supabase.from("results").select("id")),
      query((supabase) => supabase.from("transport_cards").select("id")),
      query((supabase) => supabase.from("leave_requests").select("id, name, kind, status").eq("status", "pending").order("created_at", { ascending: false }).limit(5)),
      query((supabase) => supabase.from("document_requests").select("id, name, kind, status").eq("status", "pending").order("created_at", { ascending: false }).limit(5)),
      query((supabase) => supabase.from("fees").select("amount, paid")),
      query((supabase) => supabase.from("calendar_events").select("id, title, category, event_date").gte("event_date", new Date().toISOString().slice(0, 10)).order("event_date", { ascending: true }).limit(4)),
    ]);

    const outstanding = fees.data.reduce((sum, row) => sum + balance(row), 0);
    const counts = Object.fromEntries(DEPARTMENTS.map((item) => [item.code, 0]));
    for (const row of students.data) counts[row.department] = (counts[row.department] || 0) + 1;
    const peak = Math.max(1, ...Object.values(counts));

    return (
      <div>
        <div className="flex items-baseline justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.16em] text-moss">Registry desk</p>
            <h1 className="text-xl font-semibold tracking-tight">{session.profile?.name || "Staff"}</h1>
          </div>
          <p className="text-xs text-mute">{today}</p>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-8">
          <Tile href="/dashboard/admin/students" label="Students" value={students.data.length} />
          <Tile href="/dashboard/admin/admissions" label="Applications" value={admissionCount.data.length} />
          <Tile href="/dashboard/admin/faculty" label="Faculty" value={faculty.data.length} />
          <Tile href="/dashboard/admin/notices" label="Notices" value={noticeCount.data.length} />
          <Tile href="/dashboard/admin/certificates" label="Certificates" value={certificates.data.length} />
          <Tile href="/dashboard/admin/results" label="Results" value={resultRows.data.length} />
          <Tile href="/dashboard/admin/transport-cards" label="Bus cards" value={cards.data.length} />
          <Tile href="/dashboard/admin/fees" label="Outstanding" value={money(outstanding)} />
        </div>

        <div className="mt-3 grid gap-2 lg:grid-cols-[minmax(0,1.3fr)_minmax(16rem,0.7fr)]">
          <div className="grid gap-2">
            <Block title="Departments" href="/dashboard/admin/students">
              <ul className="space-y-1.5">
                {DEPARTMENTS.map((item) => (
                  <li key={item.code} className="grid grid-cols-[2.5rem_1fr_1.5rem] items-center gap-2 text-xs">
                    <span>{item.code}</span>
                    <span className="h-1.5 overflow-hidden rounded-full bg-sand">
                      <span className="block h-full rounded-full bg-moss" style={{ width: `${(counts[item.code] / peak) * 100}%` }} />
                    </span>
                    <span className="text-right text-mute">{counts[item.code] || 0}</span>
                  </li>
                ))}
              </ul>
            </Block>
            <Block title="Latest applications" href="/dashboard/admin/admissions">
              <ul className="divide-y divide-line text-xs">
                {admissions.data.length === 0 ? <li className="py-1 text-mute">None waiting.</li> : null}
                {admissions.data.map((row) => (
                  <li key={row.id} className="flex justify-between gap-3 py-1.5">
                    <span>{row.name}</span>
                    <span className="text-mute">{row.subject}</span>
                  </li>
                ))}
              </ul>
            </Block>
            <div className="grid gap-2 sm:grid-cols-2">
              <Block title="Leave to review" href="/dashboard/admin/leave">
                <Queue rows={leaves.data} empty="Clear." render={(row) => `${row.name} · ${row.kind}`} />
              </Block>
              <Block title="Documents to prepare" href="/dashboard/admin/documents">
                <Queue rows={documents.data} empty="Clear." render={(row) => `${row.name} · ${row.kind}`} />
              </Block>
            </div>
          </div>

          <div className="grid gap-2">
            <Block title="Do next">
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  ["/dashboard/admin/students/new", "Add student"],
                  ["/dashboard/admin/admissions", "Applications"],
                  ["/dashboard/admin/notices", "Post notice"],
                  ["/dashboard/admin/results", "Enter result"],
                  ["/dashboard/admin/courses", "Course catalogue"],
                  ["/dashboard/admin/assistant", "Assistant"],
                  ["/dashboard/admin/certificates", "Certificate"],
                  ["/dashboard/admin/faculty", "Faculty"],
                  ["/dashboard/admin/gallery", "Gallery"],
                  ["/dashboard/admin/transport", "Open bus window"],
                  ["/dashboard/admin/fees", "Post a fee"],
                  ["/dashboard/admin/calendar", "Add a date"],
                  ["/dashboard/admin/leave", "Leave queue"],
                  ["/dashboard/admin/documents", "Documents"],
                ].map(([href, label]) => (
                  <Link key={href} href={href} className="rounded-md bg-paper px-2 py-1.5 text-[11px] hover:bg-sand">
                    {label}
                  </Link>
                ))}
              </div>
            </Block>
            <Block title="Coming up" href="/dashboard/admin/calendar">
              <Queue rows={events.data} empty="No dates ahead." render={(row) => `${formatDate(row.event_date)} · ${row.title}`} />
            </Block>
            <Block title="Recent notices" href="/dashboard/admin/notices">
              <Queue rows={notices.data} empty="No notices." render={(row) => `${row.category} · ${row.title}`} />
            </Block>
          </div>
        </div>
      </div>
    );
  }

  const [notices, events, leaves, documents, fees, cards] = await Promise.all([
    query((supabase) => supabase.from("notices").select("id, title, category, notice_date").order("notice_date", { ascending: false }).limit(4)),
    query((supabase) => supabase.from("calendar_events").select("id, title, category, event_date").gte("event_date", new Date().toISOString().slice(0, 10)).order("event_date", { ascending: true }).limit(4)),
    session.user ? query((supabase) => supabase.from("leave_requests").select("id, status").eq("user_id", session.user.id)) : { data: [] },
    session.user ? query((supabase) => supabase.from("document_requests").select("id, status").eq("user_id", session.user.id)) : { data: [] },
    session.user ? query((supabase) => supabase.from("fees").select("amount, paid").ilike("student_email", session.user.email)) : { data: [] },
    session.user ? query((supabase) => supabase.from("transport_cards").select("id").eq("user_id", session.user.id)) : { data: [] },
  ]);

  const earned = registrations.reduce((sum, row) => sum + Number(row.credits || 0), 0);
  const outstanding = fees.data.reduce((sum, row) => sum + balance(row), 0);
  const pendingLeave = leaves.data.filter((row) => row.status === "pending").length;
  const readyDocs = documents.data.filter((row) => row.status === "ready").length;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.16em] text-moss">{student?.department || "Student"}</p>
          <h1 className="text-xl font-semibold tracking-tight">{student?.name || session.profile?.name || "Welcome"}</h1>
        </div>
        <p className="text-xs text-mute">{today}</p>
      </div>
      <p className="mt-1 text-xs text-mute">
        {student ? `${student.student_id} · ${student.enrolled_semester || "Enrolled"}` : "The registry has not created your profile yet."}
      </p>

      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6">
        <Tile href="/dashboard/results" label="CGPA" value={results.length ? calculateCgpa(results).toFixed(2) : "—"} />
        <Tile href="/dashboard/semester" label="Credits" value={earned || "—"} hint={`of ${PROGRAMME_CREDITS}`} />
        <Tile href="/dashboard/fees" label="To pay" value={money(outstanding)} />
        <Tile href="/dashboard/leave" label="Leave open" value={pendingLeave} />
        <Tile href="/dashboard/documents" label="Ready to collect" value={readyDocs} />
        <Tile href="/dashboard/transport" label="Bus cards" value={cards.data.length} />
      </div>

      <div className="mt-3 grid gap-2 lg:grid-cols-[minmax(0,1.15fr)_minmax(15rem,0.85fr)]">
        <div className="grid gap-2">
          <Block title="Credit progress" href="/dashboard/courses">
            <div className="h-1.5 overflow-hidden rounded-full bg-sand">
              <div className="h-full rounded-full bg-moss" style={{ width: `${Math.min(100, (earned / PROGRAMME_CREDITS) * 100)}%` }} />
            </div>
            <p className="mt-1.5 text-[11px] text-mute">{earned} credits registered · {results.length} result {results.length === 1 ? "sheet" : "sheets"}</p>
            <ul className="mt-2 grid grid-cols-2 gap-1 text-[11px] sm:grid-cols-4">
              {registrations.slice(0, 4).map((row) => (
                <li key={row.id} className="rounded-md bg-paper px-2 py-1">{row.session} {row.year} · {row.level_term}</li>
              ))}
            </ul>
          </Block>
          <Block title="Notices" href="/notices">
            <Queue rows={notices.data} empty="No notices." render={(row) => `${formatDate(row.notice_date)} · ${row.title}`} />
          </Block>
          <Block title="Calendar" href="/dashboard/calendar">
            <Queue rows={events.data} empty="Nothing scheduled." render={(row) => `${formatDate(row.event_date)} · ${row.title}`} />
          </Block>
        </div>
        <Block title="Your desk">
          <div className="grid grid-cols-2 gap-1.5">
            {[
              ["/dashboard/profile", "Profile"],
              ["/dashboard/courses", "Course list"],
              ["/dashboard/semester", "Register term"],
              ["/dashboard/enrollment", "Enroll courses"],
              ["/dashboard/assistant", "Ask assistant"],
              ["/dashboard/results", "Results"],
              ["/dashboard/transcript", "Transcript"],
              ["/dashboard/admit-card", "Admit card"],
              ["/dashboard/transport", "Bus card"],
              ["/dashboard/leave", "Request leave"],
              ["/dashboard/documents", "Request document"],
              ["/dashboard/fees", "Fee ledger"],
              ["/dashboard/calendar", "Dates"],
              ["/notices", "All notices"],
            ].map(([href, label]) => (
              <Link key={href} href={href} className="rounded-md bg-paper px-2 py-1.5 text-[11px] hover:bg-sand">
                {label}
              </Link>
            ))}
          </div>
        </Block>
      </div>
    </div>
  );
}

function Queue({ rows, empty, render }) {
  if (!rows?.length) return <p className="text-xs text-mute">{empty}</p>;
  return (
    <ul className="space-y-1 text-xs">
      {rows.map((row) => (
        <li key={row.id} className="truncate">{render(row)}</li>
      ))}
    </ul>
  );
}
