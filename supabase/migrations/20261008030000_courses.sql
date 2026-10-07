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
