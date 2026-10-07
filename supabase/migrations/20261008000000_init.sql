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
