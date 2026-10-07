-- Registry desk: leave, documents, fees, and the academic calendar.

create table if not exists public.leave_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  student_id text,
  name text,
  department text,
  kind text not null,
  start_date date not null,
  end_date date not null,
  reason text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  review_note text,
  created_at timestamptz not null default now()
);

create table if not exists public.document_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  student_id text,
  name text,
  department text,
  kind text not null,
  copies integer not null default 1,
  purpose text,
  status text not null default 'pending' check (status in ('pending', 'ready', 'collected', 'rejected')),
  review_note text,
  created_at timestamptz not null default now()
);

create table if not exists public.fees (
  id uuid primary key default gen_random_uuid(),
  student_email text not null,
  student_id text,
  name text,
  title text not null,
  session text,
  year text,
  amount numeric(10, 2) not null,
  paid numeric(10, 2) not null default 0,
  due_date date,
  created_at timestamptz not null default now()
);

create table if not exists public.calendar_events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  event_date date not null,
  detail text,
  created_at timestamptz not null default now()
);

create index if not exists leave_user_idx on public.leave_requests (user_id, created_at desc);
create index if not exists documents_user_idx on public.document_requests (user_id, created_at desc);
create index if not exists fees_email_idx on public.fees (student_email);
create index if not exists calendar_date_idx on public.calendar_events (event_date);

alter table public.leave_requests enable row level security;
alter table public.document_requests enable row level security;
alter table public.fees enable row level security;
alter table public.calendar_events enable row level security;

grant select, insert, update, delete on public.leave_requests to authenticated, service_role;
grant select, insert, update, delete on public.document_requests to authenticated, service_role;
grant select, insert, update, delete on public.fees to authenticated, service_role;
grant select, insert, update, delete on public.calendar_events to authenticated, service_role;

drop policy if exists "read leave" on public.leave_requests;
create policy "read leave" on public.leave_requests
  for select to authenticated
  using (user_id = auth.uid() or public.is_admin());
drop policy if exists "student requests leave" on public.leave_requests;
create policy "student requests leave" on public.leave_requests
  for insert to authenticated
  with check (user_id = auth.uid());
drop policy if exists "admin updates leave" on public.leave_requests;
create policy "admin updates leave" on public.leave_requests
  for update to authenticated
  using (public.is_admin()) with check (public.is_admin());
drop policy if exists "admin deletes leave" on public.leave_requests;
create policy "admin deletes leave" on public.leave_requests
  for delete to authenticated
  using (public.is_admin());

drop policy if exists "read documents" on public.document_requests;
create policy "read documents" on public.document_requests
  for select to authenticated
  using (user_id = auth.uid() or public.is_admin());
drop policy if exists "student requests documents" on public.document_requests;
create policy "student requests documents" on public.document_requests
  for insert to authenticated
  with check (user_id = auth.uid());
drop policy if exists "admin updates documents" on public.document_requests;
create policy "admin updates documents" on public.document_requests
  for update to authenticated
  using (public.is_admin()) with check (public.is_admin());
drop policy if exists "admin deletes documents" on public.document_requests;
create policy "admin deletes documents" on public.document_requests
  for delete to authenticated
  using (public.is_admin());

drop policy if exists "read fees" on public.fees;
create policy "read fees" on public.fees
  for select to authenticated
  using (
    public.is_admin()
    or lower(student_email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
drop policy if exists "admin writes fees" on public.fees;
create policy "admin writes fees" on public.fees
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "read calendar" on public.calendar_events;
create policy "read calendar" on public.calendar_events
  for select to authenticated using (true);
drop policy if exists "admin writes calendar" on public.calendar_events;
create policy "admin writes calendar" on public.calendar_events
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

insert into public.leave_requests (user_id, student_id, name, department, kind, start_date, end_date, reason, status, review_note)
select p.id, s.student_id, s.name, s.department, 'Medical', date '2026-09-02', date '2026-09-04', 'Fever, advised rest.', 'approved', 'Noted by the department office.'
from public.profiles p
join public.students s on s.user_id = p.id
where p.email = 'student@baiust.ac.bd'
  and not exists (select 1 from public.leave_requests where reason = 'Fever, advised rest.');

insert into public.leave_requests (user_id, student_id, name, department, kind, start_date, end_date, reason, status)
select p.id, s.student_id, s.name, s.department, 'Personal', date '2026-10-18', date '2026-10-19', 'Family appointment in Cumilla city.', 'pending'
from public.profiles p
join public.students s on s.user_id = p.id
where p.email = 'student@baiust.ac.bd'
  and not exists (select 1 from public.leave_requests where reason = 'Family appointment in Cumilla city.');

insert into public.document_requests (user_id, student_id, name, department, kind, copies, purpose, status)
select p.id, s.student_id, s.name, s.department, 'Transcript', 1, 'Internship application.', 'pending'
from public.profiles p
join public.students s on s.user_id = p.id
where p.email = 'student@baiust.ac.bd'
  and not exists (select 1 from public.document_requests where purpose = 'Internship application.');

insert into public.document_requests (user_id, student_id, name, department, kind, copies, purpose, status, review_note)
select p.id, s.student_id, s.name, s.department, 'Testimonial', 2, 'Bank account.', 'ready', 'Collect from the registry counter.'
from public.profiles p
join public.students s on s.user_id = p.id
where p.email = 'student@baiust.ac.bd'
  and not exists (select 1 from public.document_requests where purpose = 'Bank account.');

insert into public.fees (student_email, student_id, name, title, session, year, amount, paid, due_date)
select 'student@baiust.ac.bd', 'CSE-2024-0142', 'Ayesha Rahman', 'Tuition', 'Fall', '2025', 45000, 45000, date '2025-09-15'
where not exists (
  select 1 from public.fees where student_email = 'student@baiust.ac.bd' and title = 'Tuition' and session = 'Fall' and year = '2025'
);

insert into public.fees (student_email, student_id, name, title, session, year, amount, paid, due_date)
select 'student@baiust.ac.bd', 'CSE-2024-0142', 'Ayesha Rahman', 'Tuition', 'Spring', '2026', 45000, 20000, date '2026-10-15'
where not exists (
  select 1 from public.fees where student_email = 'student@baiust.ac.bd' and title = 'Tuition' and session = 'Spring' and year = '2026'
);

insert into public.fees (student_email, student_id, name, title, session, year, amount, paid, due_date)
select 'student@baiust.ac.bd', 'CSE-2024-0142', 'Ayesha Rahman', 'Laboratory', 'Spring', '2026', 3500, 0, date '2026-10-20'
where not exists (
  select 1 from public.fees where student_email = 'student@baiust.ac.bd' and title = 'Laboratory' and year = '2026'
);

insert into public.fees (student_email, student_id, name, title, session, year, amount, paid, due_date)
select 'student@baiust.ac.bd', 'CSE-2024-0142', 'Ayesha Rahman', 'Transport', 'Fall', '2026', 3500, 3500, date '2026-09-10'
where not exists (
  select 1 from public.fees where student_email = 'student@baiust.ac.bd' and title = 'Transport' and year = '2026'
);

insert into public.calendar_events (title, category, event_date, detail)
select * from (
  values
    ('Office hours as usual', 'Office', date '2026-10-12', 'Admission desk open 9:00-16:00.'),
    ('Tuition due', 'Office', date '2026-10-15', 'Spring 2026 tuition balance.'),
    ('Midterm examinations begin', 'Exam', date '2026-10-20', 'Levels 1 and 2. Bring the admit card.'),
    ('Spring registration opens', 'Registration', date '2026-11-01', 'Semester registration for the next term.'),
    ('Victory Day', 'Holiday', date '2026-12-16', 'Campus offices closed.'),
    ('Fall results published', 'Exam', date '2027-01-05', 'Results appear on the student dashboard.')
) as seed(title, category, event_date, detail)
where not exists (select 1 from public.calendar_events e where e.title = seed.title);
