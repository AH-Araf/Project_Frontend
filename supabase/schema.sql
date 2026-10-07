-- BAIUST schema
-- Run this whole file once in the Supabase SQL editor (fresh project).
--
-- Then:
-- 1. Authentication → Users → Add user (email + password, auto-confirm).
-- 2. Run: update public.profiles set role = 'admin' where email = 'your-email';
-- 3. Fill .env with the project URL, anon key, and service_role key.
-- 4. Restart the Next.js dev server.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null,
  email text not null unique,
  role text not null default 'student' check (role in ('admin', 'student')),
  created_at timestamptz not null default now()
);

create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references public.profiles (id) on delete set null,
  name text not null,
  student_id text not null unique,
  department text not null,
  enrolled_semester text,
  email text not null unique,
  religion text,
  blood_group text,
  nationality text,
  mobile text,
  gender text,
  fathers_name text,
  mothers_name text,
  guardian text,
  guardians_number text,
  guardians_email text,
  address text,
  date_of_birth text,
  photo_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.faculty (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  designation text,
  phone text,
  email text,
  education_bsc text,
  education_msc text,
  education_phd text,
  department text not null,
  publication_a text,
  publication_b text,
  publication_c text,
  photo_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.gallery (
  id uuid primary key default gen_random_uuid(),
  title text,
  description text,
  image_url text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.notices (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  title text not null,
  notice_date date not null default current_date,
  link text,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.admissions (
  id uuid primary key default gen_random_uuid(),
  photo_url text,
  name text not null,
  age text,
  phone text,
  email text,
  address text,
  ssc_result text,
  hsc_result text,
  subject text,
  board text,
  transaction_number text,
  transaction_id text,
  created_at timestamptz not null default now()
);

create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  student_name text not null,
  student_id text not null,
  session text,
  cgpa text,
  department text not null,
  image_url text,
  created_at timestamptz not null default now(),
  unique (department, student_id)
);

create table if not exists public.results (
  id uuid primary key default gen_random_uuid(),
  student_id text not null,
  student_email text not null,
  session text not null,
  year text not null,
  subjects jsonb not null default '[]'::jsonb,
  gpa numeric(4, 2) not null,
  created_at timestamptz not null default now()
);

create table if not exists public.semester_registrations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  student_record_id uuid references public.students (id) on delete set null,
  name text,
  student_id text,
  department text,
  mobile text,
  session text not null,
  year text not null,
  level_term text not null,
  credits numeric(5, 2) not null default 0,
  created_at timestamptz not null default now(),
  unique (user_id, session, year)
);

create table if not exists public.transport_windows (
  id uuid primary key default gen_random_uuid(),
  session text not null,
  year text not null,
  start_date date,
  end_date date,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.transport_cards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  window_id uuid references public.transport_windows (id) on delete set null,
  session text,
  year text,
  start_date date,
  end_date date,
  pickup_point text not null,
  fee numeric(10, 2) not null default 0,
  applicant jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (user_id, window_id)
);

create index if not exists students_email_idx on public.students (email);
create index if not exists results_email_idx on public.results (student_email);
create index if not exists notices_date_idx on public.notices (notice_date desc);
create index if not exists faculty_department_idx on public.faculty (department);

-- ---------------------------------------------------------------------------
-- Auth profile
-- ---------------------------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1)),
    new.email,
    case
      when new.raw_user_meta_data ->> 'role' = 'admin' then 'admin'
      else 'student'
    end
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- ---------------------------------------------------------------------------
-- Access
-- ---------------------------------------------------------------------------

alter table public.profiles enable row level security;
alter table public.students enable row level security;
alter table public.faculty enable row level security;
alter table public.gallery enable row level security;
alter table public.notices enable row level security;
alter table public.admissions enable row level security;
alter table public.certificates enable row level security;
alter table public.results enable row level security;
alter table public.semester_registrations enable row level security;
alter table public.transport_windows enable row level security;
alter table public.transport_cards enable row level security;

grant execute on function public.is_admin() to anon, authenticated, service_role;
grant execute on function public.handle_new_user() to postgres, service_role;

grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on all tables in schema public to anon, authenticated, service_role;

-- profiles
drop policy if exists "read own profile" on public.profiles;
create policy "read own profile" on public.profiles
  for select to authenticated
  using (id = auth.uid() or public.is_admin());

drop policy if exists "admin updates profiles" on public.profiles;
create policy "admin updates profiles" on public.profiles
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- students
drop policy if exists "read students" on public.students;
create policy "read students" on public.students
  for select to authenticated
  using (
    public.is_admin()
    or lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );

drop policy if exists "admin writes students" on public.students;
create policy "admin writes students" on public.students
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- public catalogues
drop policy if exists "public read faculty" on public.faculty;
create policy "public read faculty" on public.faculty
  for select to anon, authenticated using (true);
drop policy if exists "admin writes faculty" on public.faculty;
create policy "admin writes faculty" on public.faculty
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public read gallery" on public.gallery;
create policy "public read gallery" on public.gallery
  for select to anon, authenticated using (true);
drop policy if exists "admin writes gallery" on public.gallery;
create policy "admin writes gallery" on public.gallery
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public read notices" on public.notices;
create policy "public read notices" on public.notices
  for select to anon, authenticated using (true);
drop policy if exists "admin writes notices" on public.notices;
create policy "admin writes notices" on public.notices
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public read certificates" on public.certificates;
create policy "public read certificates" on public.certificates
  for select to anon, authenticated using (true);
drop policy if exists "admin writes certificates" on public.certificates;
create policy "admin writes certificates" on public.certificates
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- admissions: written by the server with the service role. Staff can read.
drop policy if exists "admin reads admissions" on public.admissions;
create policy "admin reads admissions" on public.admissions
  for select to authenticated using (public.is_admin());
drop policy if exists "admin deletes admissions" on public.admissions;
create policy "admin deletes admissions" on public.admissions
  for delete to authenticated using (public.is_admin());

-- results
drop policy if exists "read results" on public.results;
create policy "read results" on public.results
  for select to authenticated
  using (
    public.is_admin()
    or lower(student_email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
drop policy if exists "admin writes results" on public.results;
create policy "admin writes results" on public.results
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- semester registration
drop policy if exists "read registrations" on public.semester_registrations;
create policy "read registrations" on public.semester_registrations
  for select to authenticated
  using (user_id = auth.uid() or public.is_admin());
drop policy if exists "student inserts registration" on public.semester_registrations;
create policy "student inserts registration" on public.semester_registrations
  for insert to authenticated
  with check (user_id = auth.uid());

-- transport
drop policy if exists "read transport windows" on public.transport_windows;
create policy "read transport windows" on public.transport_windows
  for select to authenticated using (true);
drop policy if exists "admin writes transport windows" on public.transport_windows;
create policy "admin writes transport windows" on public.transport_windows
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "read transport cards" on public.transport_cards;
create policy "read transport cards" on public.transport_cards
  for select to authenticated
  using (user_id = auth.uid() or public.is_admin());
drop policy if exists "student inserts transport card" on public.transport_cards;
create policy "student inserts transport card" on public.transport_cards
  for insert to authenticated
  with check (user_id = auth.uid());

-- ---------------------------------------------------------------------------
-- Storage
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = true;

drop policy if exists "public read media" on storage.objects;
create policy "public read media" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'media');

drop policy if exists "admin upload media" on storage.objects;
create policy "admin upload media" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'media' and public.is_admin());

drop policy if exists "admin delete media" on storage.objects;
create policy "admin delete media" on storage.objects
  for delete to authenticated
  using (bucket_id = 'media' and public.is_admin());


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


-- Course catalogue and enrollment, tied to a semester registration.

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  code text not null,
  title text not null,
  department text not null,
  credit numeric(4, 2) not null,
  level_term text not null,
  created_at timestamptz not null default now(),
  unique (department, code)
);

create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  course_id uuid not null references public.courses (id) on delete cascade,
  session text not null,
  year text not null,
  created_at timestamptz not null default now(),
  unique (user_id, course_id, session, year)
);

create index if not exists courses_department_idx on public.courses (department, level_term);
create index if not exists enrollments_user_idx on public.enrollments (user_id, session, year);

alter table public.courses enable row level security;
alter table public.enrollments enable row level security;

grant select, insert, update, delete on public.courses to authenticated, service_role;
grant select, insert, update, delete on public.enrollments to authenticated, service_role;

drop policy if exists "read courses" on public.courses;
create policy "read courses" on public.courses
  for select to authenticated using (true);
drop policy if exists "admin writes courses" on public.courses;
create policy "admin writes courses" on public.courses
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "read enrollments" on public.enrollments;
create policy "read enrollments" on public.enrollments
  for select to authenticated
  using (user_id = auth.uid() or public.is_admin());
drop policy if exists "student enrolls" on public.enrollments;
create policy "student enrolls" on public.enrollments
  for insert to authenticated
  with check (user_id = auth.uid());
drop policy if exists "drop enrollment" on public.enrollments;
create policy "drop enrollment" on public.enrollments
  for delete to authenticated
  using (user_id = auth.uid() or public.is_admin());

insert into public.courses (code, title, department, credit, level_term)
select * from (
  values
    ('CSE 1101', 'Structured Programming', 'CSE', 3.00, '1 - 1'),
    ('CSE 1102', 'Structured Programming Lab', 'CSE', 1.50, '1 - 1'),
    ('MATH 1101', 'Discrete Mathematics', 'CSE', 3.00, '1 - 1'),
    ('PHY 1101', 'Physics', 'CSE', 3.00, '1 - 1'),
    ('ENG 1101', 'English', 'CSE', 2.00, '1 - 1'),
    ('CSE 1103', 'Electrical Circuits', 'CSE', 3.00, '1 - 1'),
    ('CSE 1104', 'Electrical Circuits Lab', 'CSE', 1.50, '1 - 1'),
    ('MATH 1103', 'Differential Calculus', 'CSE', 2.50, '1 - 1'),
    ('CSE 1201', 'Data Structures', 'CSE', 3.00, '1 - 2'),
    ('CSE 1202', 'Data Structures Lab', 'CSE', 1.50, '1 - 2'),
    ('CSE 1203', 'Object Oriented Programming', 'CSE', 3.00, '1 - 2'),
    ('CSE 1204', 'Object Oriented Programming Lab', 'CSE', 1.50, '1 - 2'),
    ('EEE 1201', 'Electronic Devices', 'CSE', 3.00, '1 - 2'),
    ('MATH 1201', 'Linear Algebra', 'CSE', 3.00, '1 - 2'),
    ('ENG 1201', 'Technical Writing', 'CSE', 2.00, '1 - 2'),
    ('CSE 1205', 'Discrete Mathematics II', 'CSE', 3.50, '1 - 2')
) as seed(code, title, department, credit, level_term)
where not exists (
  select 1 from public.courses c where c.department = seed.department and c.code = seed.code
);

insert into public.enrollments (user_id, course_id, session, year)
select p.id, c.id, 'Fall', '2025'
from public.profiles p
join public.courses c on c.department = 'CSE' and c.level_term = '1 - 1'
where p.email = 'student@baiust.ac.bd'
  and not exists (
    select 1 from public.enrollments e
    where e.user_id = p.id and e.course_id = c.id and e.session = 'Fall' and e.year = '2025'
  );

insert into public.enrollments (user_id, course_id, session, year)
select p.id, c.id, 'Spring', '2026'
from public.profiles p
join public.courses c on c.department = 'CSE' and c.code in ('CSE 1201', 'CSE 1203', 'EEE 1201')
where p.email = 'student@baiust.ac.bd'
  and not exists (
    select 1 from public.enrollments e
    where e.user_id = p.id and e.course_id = c.id and e.session = 'Spring' and e.year = '2026'
  );


-- Retrieval index for the assistant. Embeddings are 384-dimensional and normalized.

create extension if not exists vector with schema extensions;

create table if not exists public.ai_chunks (
  id uuid primary key default gen_random_uuid(),
  source text not null,
  ref_id text not null,
  audience text not null check (audience in ('public', 'staff', 'student')),
  owner_email text,
  title text not null,
  content text not null,
  embedding extensions.vector(384) not null,
  updated_at timestamptz not null default now(),
  unique (source, ref_id)
);

create index if not exists ai_chunks_embedding_idx
  on public.ai_chunks
  using hnsw (embedding extensions.vector_cosine_ops);

alter table public.ai_chunks enable row level security;

grant select, insert, update, delete on public.ai_chunks to authenticated, service_role;

drop policy if exists "admin reads chunks" on public.ai_chunks;
create policy "admin reads chunks" on public.ai_chunks
  for select to authenticated
  using (public.is_admin());

drop policy if exists "admin writes chunks" on public.ai_chunks;
create policy "admin writes chunks" on public.ai_chunks
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create table if not exists public.ai_settings (
  id integer primary key check (id = 1),
  embedder text not null check (embedder in ('local', 'gemini')),
  updated_at timestamptz not null default now()
);

alter table public.ai_settings enable row level security;

grant select, insert, update, delete on public.ai_settings to authenticated, service_role;

drop policy if exists "read embedder" on public.ai_settings;
create policy "read embedder" on public.ai_settings
  for select to authenticated using (true);

drop policy if exists "admin writes embedder" on public.ai_settings;
create policy "admin writes embedder" on public.ai_settings
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create or replace function public.match_chunks(
  query_embedding extensions.vector(384),
  match_count integer default 8
)
returns table (
  source text,
  title text,
  content text,
  similarity double precision
)
language sql
stable
security definer
set search_path = public, extensions
as $$
  select
    chunks.source,
    chunks.title,
    chunks.content,
    1 - (chunks.embedding <=> query_embedding) as similarity
  from public.ai_chunks as chunks
  where public.is_admin()
    or chunks.audience = 'public'
    or (
      chunks.audience = 'student'
      and lower(chunks.owner_email) = lower(coalesce(auth.jwt() ->> 'email', ''))
    )
  order by chunks.embedding <=> query_embedding
  limit least(greatest(match_count, 1), 12);
$$;

grant execute on function public.match_chunks(extensions.vector, integer) to authenticated, service_role;
