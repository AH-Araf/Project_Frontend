-- Demo accounts and catalogue data.
-- Sign in at /login with:
--   admin@baiust.ac.bd    / Admin@123456
--   student@baiust.ac.bd  / Student@123456

-- ---------------------------------------------------------------------------
-- Accounts
-- ---------------------------------------------------------------------------

insert into auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
)
select
  '00000000-0000-0000-0000-000000000000',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'authenticated',
  'authenticated',
  'admin@baiust.ac.bd',
  extensions.crypt('Admin@123456', extensions.gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{"name":"Registry Office","role":"admin"}'::jsonb,
  now(),
  now(),
  '',
  '',
  '',
  ''
where not exists (
  select 1 from auth.users where email = 'admin@baiust.ac.bd'
);

insert into auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
)
select
  '00000000-0000-0000-0000-000000000000',
  'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
  'authenticated',
  'authenticated',
  'student@baiust.ac.bd',
  extensions.crypt('Student@123456', extensions.gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{"name":"Ayesha Rahman","role":"student"}'::jsonb,
  now(),
  now(),
  '',
  '',
  '',
  ''
where not exists (
  select 1 from auth.users where email = 'student@baiust.ac.bd'
);

insert into auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  provider_id,
  last_sign_in_at,
  created_at,
  updated_at
)
select
  id,
  id,
  jsonb_build_object('sub', id::text, 'email', email),
  'email',
  id::text,
  now(),
  now(),
  now()
from auth.users
where email in ('admin@baiust.ac.bd', 'student@baiust.ac.bd')
  and not exists (
    select 1 from auth.identities i where i.user_id = auth.users.id and i.provider = 'email'
  );

insert into public.profiles (id, name, email, role)
values
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Registry Office', 'admin@baiust.ac.bd', 'admin'),
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Ayesha Rahman', 'student@baiust.ac.bd', 'student')
on conflict (id) do update
set name = excluded.name,
    email = excluded.email,
    role = excluded.role;

-- ---------------------------------------------------------------------------
-- Student profile
-- ---------------------------------------------------------------------------

insert into public.students (
  user_id, name, student_id, department, enrolled_semester, email,
  religion, blood_group, nationality, mobile, gender,
  fathers_name, mothers_name, guardian, guardians_number, guardians_email,
  address, date_of_birth, photo_url
)
select
  'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
  'Ayesha Rahman',
  'CSE-2024-0142',
  'CSE',
  'Spring 2026',
  'student@baiust.ac.bd',
  'Islam',
  'B+',
  'Bangladeshi',
  '01711000042',
  'Female',
  'Abdul Rahman',
  'Salma Rahman',
  'Abdul Rahman',
  '01711000011',
  'guardian@example.com',
  'Adarsha Sadar, Cumilla',
  '2005-03-14',
  '/media/image/student.jpg'
where not exists (
  select 1 from public.students where email = 'student@baiust.ac.bd'
);

-- ---------------------------------------------------------------------------
-- Faculty, notices, gallery, admissions, certificates
-- ---------------------------------------------------------------------------

insert into public.faculty (name, designation, phone, email, education_bsc, education_msc, education_phd, department, publication_a, photo_url)
select * from (
  values
    ('Dr. Farhana Islam', 'Professor', '01710001001', 'farhana.islam@baiust.ac.bd', 'B.Sc. in CSE, BUET', 'M.Sc. in CSE, BUET', 'Ph.D. in Computer Science', 'CSE', 'Distributed systems for campus networks', '/media/home/sir1.png'),
    ('Md. Kamrul Hasan', 'Associate Professor', '01710001002', 'kamrul.hasan@baiust.ac.bd', 'B.Sc. in EEE, CUET', 'M.Sc. in EEE, BUET', null, 'EEE', 'Power electronics for rural grids', '/media/home/sir2.png'),
    ('Engr. Tanvir Ahmed', 'Assistant Professor', '01710001003', 'tanvir.ahmed@baiust.ac.bd', 'B.Sc. in Civil Engineering, CUET', 'M.Sc. in Structural Engineering', null, 'CE', 'Low-cost housing materials', '/media/home/sir3.png'),
    ('Nusrat Chowdhury', 'Assistant Professor', '01710001004', 'nusrat.chowdhury@baiust.ac.bd', 'BBA, University of Dhaka', 'MBA, University of Dhaka', null, 'BBA', 'Small-enterprise finance in Cumilla', '/media/home/sir4.png'),
    ('Advocate Laila Karim', 'Associate Professor', '01710001005', 'laila.karim@baiust.ac.bd', 'LL.B., University of Dhaka', 'LL.M., University of Dhaka', null, 'LLB', 'Clinical legal education', null),
    ('Sarah Ahmed', 'Lecturer', '01710001006', 'sarah.ahmed@baiust.ac.bd', 'B.A. in English, University of Dhaka', 'M.A. in English Literature', null, 'ENG', 'Writing instruction for engineers', null)
) as seed(name, designation, phone, email, education_bsc, education_msc, education_phd, department, publication_a, photo_url)
where not exists (select 1 from public.faculty f where f.email = seed.email);

insert into public.notices (category, title, notice_date, description)
select * from (
  values
    ('Exam', 'Spring 2026 midterm schedule', date '2026-10-01', 'Midterm examinations for levels 1 and 2 begin on 20 October 2026. Admit cards are available from the student dashboard.'),
    ('Transport', 'Fall 2026 bus registration is open', date '2026-09-28', 'Students who travel from Cumilla city can apply for a transport card before 31 December 2026.'),
    ('Hall', 'Residential hall allocation', date '2026-09-15', 'New residents should collect hall keys from the provost office with their student ID.'),
    ('Others', 'Campus remains open on 12 October', date '2026-10-05', 'Classes and office hours continue as usual. The admission desk is open from 9:00 to 16:00.')
) as seed(category, title, notice_date, description)
where not exists (select 1 from public.notices n where n.title = seed.title);

insert into public.gallery (title, description, image_url)
select * from (
  values
    ('Main building', 'The academic building at Syedpur.', '/media/image/baiust.jpg'),
    ('Campus from above', 'Aerial view of the Cumilla campus.', '/media/home/banner/campus.png'),
    ('Transport', 'University buses on the campus road.', '/media/home/Facilities/trasport.jpg'),
    ('Library', 'Reading space in the campus library.', '/media/home/ChooseB/Library.png')
) as seed(title, description, image_url)
where not exists (select 1 from public.gallery g where g.title = seed.title);

insert into public.admissions (
  name, age, phone, email, address, ssc_result, hsc_result, subject, board, transaction_number, transaction_id, photo_url
)
select
  'Rafiul Hasan',
  '19',
  '01819000123',
  'rafiul.hasan@example.com',
  'Kandirpar, Cumilla',
  '5.00',
  '5.00',
  'CSE',
  'Cumilla',
  '01700001111',
  'TXN-BAIUST-1001',
  '/media/image/student.jpg'
where not exists (
  select 1 from public.admissions where email = 'rafiul.hasan@example.com'
);

insert into public.certificates (student_name, student_id, session, cgpa, department, image_url)
values ('Ayesha Rahman', 'CSE-2024-0142', '2024-2028', '3.70', 'CSE', null)
on conflict (department, student_id) do nothing;

-- ---------------------------------------------------------------------------
-- Results, registration, transport
-- ---------------------------------------------------------------------------

insert into public.results (student_id, student_email, session, year, subjects, gpa)
select
  'CSE-2024-0142',
  'student@baiust.ac.bd',
  'Fall',
  '2025',
  '[
    {"name":"Structured Programming","credit":3,"marks":82},
    {"name":"Discrete Mathematics","credit":3,"marks":76},
    {"name":"Physics","credit":3,"marks":71},
    {"name":"English","credit":2,"marks":68}
  ]'::jsonb,
  3.66
where not exists (
  select 1 from public.results
  where student_email = 'student@baiust.ac.bd' and session = 'Fall' and year = '2025'
);

insert into public.results (student_id, student_email, session, year, subjects, gpa)
select
  'CSE-2024-0142',
  'student@baiust.ac.bd',
  'Spring',
  '2026',
  '[
    {"name":"Data Structures","credit":3,"marks":85},
    {"name":"Object Oriented Programming","credit":3,"marks":78},
    {"name":"Electronic Devices","credit":3,"marks":74}
  ]'::jsonb,
  3.75
where not exists (
  select 1 from public.results
  where student_email = 'student@baiust.ac.bd' and session = 'Spring' and year = '2026'
);

insert into public.semester_registrations (
  user_id, student_record_id, name, student_id, department, mobile, session, year, level_term, credits
)
select
  'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
  s.id,
  s.name,
  s.student_id,
  s.department,
  s.mobile,
  'Fall',
  '2025',
  '1 - 1',
  19.5
from public.students s
where s.email = 'student@baiust.ac.bd'
  and not exists (
    select 1 from public.semester_registrations r
    where r.user_id = 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22' and r.session = 'Fall' and r.year = '2025'
  );

insert into public.semester_registrations (
  user_id, student_record_id, name, student_id, department, mobile, session, year, level_term, credits
)
select
  'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
  s.id,
  s.name,
  s.student_id,
  s.department,
  s.mobile,
  'Spring',
  '2026',
  '1 - 2',
  20.5
from public.students s
where s.email = 'student@baiust.ac.bd'
  and not exists (
    select 1 from public.semester_registrations r
    where r.user_id = 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22' and r.session = 'Spring' and r.year = '2026'
  );

insert into public.transport_windows (session, year, start_date, end_date, description)
select 'Fall', '2026', date '2026-09-01', date '2026-12-31', 'City and cantonment routes for the Fall term.'
where not exists (
  select 1 from public.transport_windows
  where session = 'Fall' and year = '2026'
);

insert into public.transport_cards (
  user_id, window_id, session, year, start_date, end_date, pickup_point, fee, applicant
)
select
  'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
  w.id,
  w.session,
  w.year,
  w.start_date,
  w.end_date,
  'ক্যান্টেনম্যান্ট/টিপরা বাজার — ক্যাম্পাস',
  3500,
  jsonb_build_object(
    'name', s.name,
    'student_id', s.student_id,
    'department', s.department,
    'mobile', s.mobile,
    'photo_url', s.photo_url,
    'email', s.email
  )
from public.transport_windows w
join public.students s on s.email = 'student@baiust.ac.bd'
where w.session = 'Fall' and w.year = '2026'
  and not exists (
    select 1 from public.transport_cards c
    where c.user_id = 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22' and c.window_id = w.id
  );
