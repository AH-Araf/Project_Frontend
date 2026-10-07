-- Extra registry data so every desk list has at least 25 rows.
-- Demo student logins: firstname.lastname style @baiust.ac.bd / Student@123456

with pw as (
  select extensions.crypt('Student@123456', extensions.gen_salt('bf')) as hash
)
insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
  raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
  confirmation_token, email_change, email_change_token_new, recovery_token
)
select
  '00000000-0000-0000-0000-000000000000',
  seed.id,
  'authenticated',
  'authenticated',
  seed.email,
  pw.hash,
  now(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  jsonb_build_object('name', seed.name, 'role', 'student'),
  now(), now(), '', '', '', ''
from pw
join (values
  ('10000000-0000-4000-8000-000000000001'::uuid, 'Nusrat Jahan', 'nusrat.jahan@baiust.ac.bd'),
  ('10000000-0000-4000-8000-000000000002'::uuid, 'Tanvir Ahmed', 'tanvir.ahmed@baiust.ac.bd'),
  ('10000000-0000-4000-8000-000000000003'::uuid, 'Farhana Islam', 'farhana.islam@baiust.ac.bd'),
  ('10000000-0000-4000-8000-000000000004'::uuid, 'Md. Rakib Hasan', 'rakib.hasan@baiust.ac.bd'),
  ('10000000-0000-4000-8000-000000000005'::uuid, 'Sumaiya Akter', 'sumaiya.akter@baiust.ac.bd'),
  ('10000000-0000-4000-8000-000000000006'::uuid, 'Mahmudul Hasan', 'mahmudul.hasan@baiust.ac.bd'),
  ('10000000-0000-4000-8000-000000000007'::uuid, 'Sadia Islam', 'sadia.islam@baiust.ac.bd'),
  ('10000000-0000-4000-8000-000000000008'::uuid, 'Imran Hossain', 'imran.hossain@baiust.ac.bd'),
  ('10000000-0000-4000-8000-000000000009'::uuid, 'Lamia Khan', 'lamia.khan@baiust.ac.bd'),
  ('10000000-0000-4000-8000-000000000010'::uuid, 'Arif Mahmud', 'arif.mahmud@baiust.ac.bd'),
  ('10000000-0000-4000-8000-000000000011'::uuid, 'Mehzabin Chowdhury', 'mehzabin.chowdhury@baiust.ac.bd'),
  ('10000000-0000-4000-8000-000000000012'::uuid, 'Fahim Rahman', 'fahim.rahman@baiust.ac.bd'),
  ('10000000-0000-4000-8000-000000000013'::uuid, 'Tasnim Ahmed', 'tasnim.ahmed@baiust.ac.bd'),
  ('10000000-0000-4000-8000-000000000014'::uuid, 'Shahriar Kabir', 'shahriar.kabir@baiust.ac.bd'),
  ('10000000-0000-4000-8000-000000000015'::uuid, 'Nabila Sultana', 'nabila.sultana@baiust.ac.bd'),
  ('10000000-0000-4000-8000-000000000016'::uuid, 'Omar Faruk', 'omar.faruk@baiust.ac.bd'),
  ('10000000-0000-4000-8000-000000000017'::uuid, 'Jannatul Ferdous', 'jannatul.ferdous@baiust.ac.bd'),
  ('10000000-0000-4000-8000-000000000018'::uuid, 'Rafsan Jamil', 'rafsan.jamil@baiust.ac.bd'),
  ('10000000-0000-4000-8000-000000000019'::uuid, 'Mitu Akter', 'mitu.akter@baiust.ac.bd'),
  ('10000000-0000-4000-8000-000000000020'::uuid, 'Hasan Mahmud', 'hasan.mahmud@baiust.ac.bd'),
  ('10000000-0000-4000-8000-000000000021'::uuid, 'Priya Das', 'priya.das@baiust.ac.bd'),
  ('10000000-0000-4000-8000-000000000022'::uuid, 'Sabbir Ahmed', 'sabbir.ahmed@baiust.ac.bd'),
  ('10000000-0000-4000-8000-000000000023'::uuid, 'Anika Rahman', 'anika.rahman@baiust.ac.bd'),
  ('10000000-0000-4000-8000-000000000024'::uuid, 'Zubayer Hossain', 'zubayer.hossain@baiust.ac.bd'),
  ('10000000-0000-4000-8000-000000000025'::uuid, 'Faria Islam', 'faria.islam@baiust.ac.bd')
) as seed(id, name, email) on true
where not exists (select 1 from auth.users u where u.email = seed.email);

insert into auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at)
select u.id, u.id, jsonb_build_object('sub', u.id::text, 'email', u.email), 'email', u.id::text, now(), now(), now()
from auth.users u
where u.email like '%@baiust.ac.bd'
  and not exists (select 1 from auth.identities i where i.user_id = u.id and i.provider = 'email');

insert into public.profiles (id, name, email, role)
select u.id, coalesce(u.raw_user_meta_data ->> 'name', split_part(u.email, '@', 1)), u.email, 'student'
from auth.users u
where u.email like '%@baiust.ac.bd' and u.email <> 'admin@baiust.ac.bd'
on conflict (id) do update set name = excluded.name, email = excluded.email;

insert into public.students (
  user_id, name, student_id, department, enrolled_semester, email, religion, blood_group, nationality,
  mobile, gender, fathers_name, mothers_name, guardian, guardians_number, guardians_email, address, date_of_birth, photo_url
)
select
  p.id, seed.name, seed.student_id, seed.department, 'Fall 2025', seed.email,
  'Islam', seed.blood, 'Bangladeshi', seed.mobile, seed.gender,
  seed.father, seed.mother, seed.father, seed.guardian_phone, seed.guardian_email,
  seed.address, seed.dob, seed.photo
from public.profiles p
join (values
  ('nusrat.jahan@baiust.ac.bd', 'Nusrat Jahan', 'CSE-2024-1001', 'CSE', 'Female', 'A+', '01711000001', 'Father of Nusrat Jahan', 'Mother of Nusrat Jahan', '01812000001', 'guardian1@example.com', 'Cumilla', '2004-01-15', '/media/image/student.jpg'),
  ('tanvir.ahmed@baiust.ac.bd', 'Tanvir Ahmed', 'EEE-2024-1002', 'EEE', 'Male', 'B+', '01711000002', 'Father of Tanvir Ahmed', 'Mother of Tanvir Ahmed', '01812000002', 'guardian2@example.com', 'Cumilla', '2004-02-15', '/media/home/sir1.png'),
  ('farhana.islam@baiust.ac.bd', 'Farhana Islam', 'CE-2024-1003', 'CE', 'Female', 'O+', '01711000003', 'Father of Farhana Islam', 'Mother of Farhana Islam', '01812000003', 'guardian3@example.com', 'Cumilla', '2004-03-15', '/media/home/sir2.png'),
  ('rakib.hasan@baiust.ac.bd', 'Md. Rakib Hasan', 'BBA-2024-1004', 'BBA', 'Male', 'AB+', '01711000004', 'Father of Md. Rakib Hasan', 'Mother of Md. Rakib Hasan', '01812000004', 'guardian4@example.com', 'Cumilla', '2004-04-15', '/media/home/sir3.png'),
  ('sumaiya.akter@baiust.ac.bd', 'Sumaiya Akter', 'LLB-2024-1005', 'LLB', 'Female', 'A-', '01711000005', 'Father of Sumaiya Akter', 'Mother of Sumaiya Akter', '01812000005', 'guardian5@example.com', 'Cumilla', '2004-05-15', '/media/home/sir4.png'),
  ('mahmudul.hasan@baiust.ac.bd', 'Mahmudul Hasan', 'ENG-2024-1006', 'ENG', 'Male', 'O-', '01711000006', 'Father of Mahmudul Hasan', 'Mother of Mahmudul Hasan', '01812000006', 'guardian6@example.com', 'Cumilla', '2004-06-15', '/media/image/student.jpg'),
  ('sadia.islam@baiust.ac.bd', 'Sadia Islam', 'CSE-2024-1007', 'CSE', 'Female', 'A+', '01711000007', 'Father of Sadia Islam', 'Mother of Sadia Islam', '01812000007', 'guardian7@example.com', 'Cumilla', '2004-07-15', '/media/home/sir1.png'),
  ('imran.hossain@baiust.ac.bd', 'Imran Hossain', 'EEE-2024-1008', 'EEE', 'Male', 'B+', '01711000008', 'Father of Imran Hossain', 'Mother of Imran Hossain', '01812000008', 'guardian8@example.com', 'Cumilla', '2004-08-15', '/media/home/sir2.png'),
  ('lamia.khan@baiust.ac.bd', 'Lamia Khan', 'CE-2024-1009', 'CE', 'Female', 'O+', '01711000009', 'Father of Lamia Khan', 'Mother of Lamia Khan', '01812000009', 'guardian9@example.com', 'Cumilla', '2004-09-15', '/media/home/sir3.png'),
  ('arif.mahmud@baiust.ac.bd', 'Arif Mahmud', 'BBA-2024-1010', 'BBA', 'Male', 'AB+', '01711000010', 'Father of Arif Mahmud', 'Mother of Arif Mahmud', '01812000010', 'guardian10@example.com', 'Cumilla', '2004-10-15', '/media/home/sir4.png'),
  ('mehzabin.chowdhury@baiust.ac.bd', 'Mehzabin Chowdhury', 'LLB-2024-1011', 'LLB', 'Female', 'A-', '01711000011', 'Father of Mehzabin Chowdhury', 'Mother of Mehzabin Chowdhury', '01812000011', 'guardian11@example.com', 'Cumilla', '2004-11-15', '/media/image/student.jpg'),
  ('fahim.rahman@baiust.ac.bd', 'Fahim Rahman', 'ENG-2024-1012', 'ENG', 'Male', 'O-', '01711000012', 'Father of Fahim Rahman', 'Mother of Fahim Rahman', '01812000012', 'guardian12@example.com', 'Cumilla', '2004-12-15', '/media/home/sir1.png'),
  ('tasnim.ahmed@baiust.ac.bd', 'Tasnim Ahmed', 'CSE-2024-1013', 'CSE', 'Female', 'A+', '01711000013', 'Father of Tasnim Ahmed', 'Mother of Tasnim Ahmed', '01812000013', 'guardian13@example.com', 'Cumilla', '2004-01-15', '/media/home/sir2.png'),
  ('shahriar.kabir@baiust.ac.bd', 'Shahriar Kabir', 'EEE-2024-1014', 'EEE', 'Male', 'B+', '01711000014', 'Father of Shahriar Kabir', 'Mother of Shahriar Kabir', '01812000014', 'guardian14@example.com', 'Cumilla', '2004-02-15', '/media/home/sir3.png'),
  ('nabila.sultana@baiust.ac.bd', 'Nabila Sultana', 'CE-2024-1015', 'CE', 'Female', 'O+', '01711000015', 'Father of Nabila Sultana', 'Mother of Nabila Sultana', '01812000015', 'guardian15@example.com', 'Cumilla', '2004-03-15', '/media/home/sir4.png'),
  ('omar.faruk@baiust.ac.bd', 'Omar Faruk', 'BBA-2024-1016', 'BBA', 'Male', 'AB+', '01711000016', 'Father of Omar Faruk', 'Mother of Omar Faruk', '01812000016', 'guardian16@example.com', 'Cumilla', '2004-04-15', '/media/image/student.jpg'),
  ('jannatul.ferdous@baiust.ac.bd', 'Jannatul Ferdous', 'LLB-2024-1017', 'LLB', 'Female', 'A-', '01711000017', 'Father of Jannatul Ferdous', 'Mother of Jannatul Ferdous', '01812000017', 'guardian17@example.com', 'Cumilla', '2004-05-15', '/media/home/sir1.png'),
  ('rafsan.jamil@baiust.ac.bd', 'Rafsan Jamil', 'ENG-2024-1018', 'ENG', 'Male', 'O-', '01711000018', 'Father of Rafsan Jamil', 'Mother of Rafsan Jamil', '01812000018', 'guardian18@example.com', 'Cumilla', '2004-06-15', '/media/home/sir2.png'),
  ('mitu.akter@baiust.ac.bd', 'Mitu Akter', 'CSE-2024-1019', 'CSE', 'Female', 'A+', '01711000019', 'Father of Mitu Akter', 'Mother of Mitu Akter', '01812000019', 'guardian19@example.com', 'Cumilla', '2004-07-15', '/media/home/sir3.png'),
  ('hasan.mahmud@baiust.ac.bd', 'Hasan Mahmud', 'EEE-2024-1020', 'EEE', 'Male', 'B+', '01711000020', 'Father of Hasan Mahmud', 'Mother of Hasan Mahmud', '01812000020', 'guardian20@example.com', 'Cumilla', '2004-08-15', '/media/home/sir4.png'),
  ('priya.das@baiust.ac.bd', 'Priya Das', 'CE-2024-1021', 'CE', 'Female', 'O+', '01711000021', 'Father of Priya Das', 'Mother of Priya Das', '01812000021', 'guardian21@example.com', 'Cumilla', '2004-09-15', '/media/image/student.jpg'),
  ('sabbir.ahmed@baiust.ac.bd', 'Sabbir Ahmed', 'BBA-2024-1022', 'BBA', 'Male', 'AB+', '01711000022', 'Father of Sabbir Ahmed', 'Mother of Sabbir Ahmed', '01812000022', 'guardian22@example.com', 'Cumilla', '2004-10-15', '/media/home/sir1.png'),
  ('anika.rahman@baiust.ac.bd', 'Anika Rahman', 'LLB-2024-1023', 'LLB', 'Female', 'A-', '01711000023', 'Father of Anika Rahman', 'Mother of Anika Rahman', '01812000023', 'guardian23@example.com', 'Cumilla', '2004-11-15', '/media/home/sir2.png'),
  ('zubayer.hossain@baiust.ac.bd', 'Zubayer Hossain', 'ENG-2024-1024', 'ENG', 'Male', 'O-', '01711000024', 'Father of Zubayer Hossain', 'Mother of Zubayer Hossain', '01812000024', 'guardian24@example.com', 'Cumilla', '2004-12-15', '/media/home/sir3.png'),
  ('faria.islam@baiust.ac.bd', 'Faria Islam', 'CSE-2024-1025', 'CSE', 'Female', 'A+', '01711000025', 'Father of Faria Islam', 'Mother of Faria Islam', '01812000025', 'guardian25@example.com', 'Cumilla', '2004-01-15', '/media/home/sir4.png')
) as seed(email, name, student_id, department, gender, blood, mobile, father, mother, guardian_phone, guardian_email, address, dob, photo)
  on p.email = seed.email
where not exists (select 1 from public.students s where s.email = seed.email);

insert into public.faculty (name, designation, phone, email, education_bsc, education_msc, department, publication_a, photo_url)
select seed.name, seed.designation, seed.phone, seed.email, seed.bsc, seed.msc, seed.department, seed.paper, seed.photo
from (values
  ('Dr. Shafiqul Islam', 'Professor', '01613000000', 'dr.shafiqul.islam@baiust.ac.bd', 'B.Sc., CSE', 'M.Sc., CSE', 'CSE', 'Campus study note 1', '/media/image/student.jpg'),
  ('Nadia Karim', 'Associate Professor', '01613000001', 'nadia.karim@baiust.ac.bd', 'B.Sc., CSE', 'M.Sc., CSE', 'CSE', 'Campus study note 2', '/media/home/sir1.png'),
  ('Engr. Rashedul Haque', 'Assistant Professor', '01613000002', 'engr.rashedul.haque@baiust.ac.bd', 'B.Sc., EEE', 'M.Sc., EEE', 'EEE', 'Campus study note 3', '/media/home/sir2.png'),
  ('Dr. Selina Begum', 'Professor', '01613000003', 'dr.selina.begum@baiust.ac.bd', 'B.Sc., EEE', 'M.Sc., EEE', 'EEE', 'Campus study note 4', '/media/home/sir3.png'),
  ('Kamrun Nahar', 'Lecturer', '01613000004', 'kamrun.nahar@baiust.ac.bd', 'B.Sc., EEE', 'M.Sc., EEE', 'EEE', 'Campus study note 5', '/media/home/sir4.png'),
  ('Engr. Aminul Islam', 'Associate Professor', '01613000005', 'engr.aminul.islam@baiust.ac.bd', 'B.Sc., CE', 'M.Sc., CE', 'CE', 'Campus study note 6', '/media/image/student.jpg'),
  ('Dr. Habib Rahman', 'Professor', '01613000006', 'dr.habib.rahman@baiust.ac.bd', 'B.Sc., CE', 'M.Sc., CE', 'CE', 'Campus study note 7', '/media/home/sir1.png'),
  ('Farzana Yasmin', 'Assistant Professor', '01613000007', 'farzana.yasmin@baiust.ac.bd', 'B.Sc., CE', 'M.Sc., CE', 'CE', 'Campus study note 8', '/media/home/sir2.png'),
  ('Md. Sohel Rana', 'Lecturer', '01613000008', 'sohel.rana@baiust.ac.bd', 'B.Sc., CE', 'M.Sc., CE', 'CE', 'Campus study note 9', '/media/home/sir3.png'),
  ('Dr. Nasreen Akter', 'Professor', '01613000009', 'dr.nasreen.akter@baiust.ac.bd', 'B.Sc., BBA', 'M.Sc., BBA', 'BBA', 'Campus study note 10', '/media/home/sir4.png'),
  ('Tarek Aziz', 'Associate Professor', '01613000010', 'tarek.aziz@baiust.ac.bd', 'B.Sc., BBA', 'M.Sc., BBA', 'BBA', 'Campus study note 11', '/media/image/student.jpg'),
  ('Maliha Chowdhury', 'Assistant Professor', '01613000011', 'maliha.chowdhury@baiust.ac.bd', 'B.Sc., BBA', 'M.Sc., BBA', 'BBA', 'Campus study note 12', '/media/home/sir1.png'),
  ('Rafiqul Islam', 'Lecturer', '01613000012', 'rafiqul.islam@baiust.ac.bd', 'B.Sc., BBA', 'M.Sc., BBA', 'BBA', 'Campus study note 13', '/media/home/sir2.png'),
  ('Barrister Nayeem', 'Professor', '01613000013', 'barrister.nayeem@baiust.ac.bd', 'B.Sc., LLB', 'M.Sc., LLB', 'LLB', 'Campus study note 14', '/media/home/sir3.png'),
  ('Shirin Sultana', 'Associate Professor', '01613000014', 'shirin.sultana@baiust.ac.bd', 'B.Sc., LLB', 'M.Sc., LLB', 'LLB', 'Campus study note 15', '/media/home/sir4.png'),
  ('Adnan Kabir', 'Assistant Professor', '01613000015', 'adnan.kabir@baiust.ac.bd', 'B.Sc., LLB', 'M.Sc., LLB', 'LLB', 'Campus study note 16', '/media/image/student.jpg'),
  ('Lamia Noor', 'Lecturer', '01613000016', 'lamia.noor@baiust.ac.bd', 'B.Sc., LLB', 'M.Sc., LLB', 'LLB', 'Campus study note 17', '/media/home/sir1.png'),
  ('Dr. Helena Gomes', 'Professor', '01613000017', 'dr.helena.gomes@baiust.ac.bd', 'B.Sc., ENG', 'M.Sc., ENG', 'ENG', 'Campus study note 18', '/media/home/sir2.png'),
  ('Sajib Mahmud', 'Associate Professor', '01613000018', 'sajib.mahmud@baiust.ac.bd', 'B.Sc., ENG', 'M.Sc., ENG', 'ENG', 'Campus study note 19', '/media/home/sir3.png'),
  ('Tanha Rahman', 'Assistant Professor', '01613000019', 'tanha.rahman@baiust.ac.bd', 'B.Sc., ENG', 'M.Sc., ENG', 'ENG', 'Campus study note 20', '/media/home/sir4.png'),
  ('Dr. Anwar Hossain', 'Professor', '01613000020', 'dr.anwar.hossain@baiust.ac.bd', 'B.Sc., CSE', 'M.Sc., CSE', 'CSE', 'Campus study note 21', '/media/image/student.jpg'),
  ('Mithila Sen', 'Lecturer', '01613000021', 'mithila.sen@baiust.ac.bd', 'B.Sc., CSE', 'M.Sc., CSE', 'CSE', 'Campus study note 22', '/media/home/sir1.png'),
  ('Engr. Polash Mia', 'Assistant Professor', '01613000022', 'engr.polash.mia@baiust.ac.bd', 'B.Sc., EEE', 'M.Sc., EEE', 'EEE', 'Campus study note 23', '/media/home/sir2.png'),
  ('Dr. Rumana Parvin', 'Associate Professor', '01613000023', 'dr.rumana.parvin@baiust.ac.bd', 'B.Sc., CE', 'M.Sc., CE', 'CE', 'Campus study note 24', '/media/home/sir3.png'),
  ('Fahmid Hassan', 'Lecturer', '01613000024', 'fahmid.hassan@baiust.ac.bd', 'B.Sc., BBA', 'M.Sc., BBA', 'BBA', 'Campus study note 25', '/media/home/sir4.png')
) as seed(name, designation, phone, email, bsc, msc, department, paper, photo)
where not exists (select 1 from public.faculty f where f.email = seed.email);

insert into public.notices (category, title, notice_date, description)
select seed.category, seed.title, seed.notice_date::date, seed.description
from (values
  ('Exam', 'Level 1 class test routine', '2026-09-01', 'Level 1 class test routine. Posted for students and the registry.'),
  ('Exam', 'Level 2 class test routine', '2026-09-02', 'Level 2 class test routine. Posted for students and the registry.'),
  ('Exam', 'Level 3 class test routine', '2026-09-03', 'Level 3 class test routine. Posted for students and the registry.'),
  ('Exam', 'Level 4 class test routine', '2026-09-04', 'Level 4 class test routine. Posted for students and the registry.'),
  ('Exam', 'Make-up examination notice', '2026-09-05', 'Make-up examination notice. Posted for students and the registry.'),
  ('Exam', 'Admit card collection window', '2026-09-06', 'Admit card collection window. Posted for students and the registry.'),
  ('Transport', 'Route change for cantonment buses', '2026-09-07', 'Route change for cantonment buses. Posted for students and the registry.'),
  ('Transport', 'Extra bus on Thursday', '2026-09-08', 'Extra bus on Thursday. Posted for students and the registry.'),
  ('Transport', 'Transport fee receipt reminder', '2026-09-09', 'Transport fee receipt reminder. Posted for students and the registry.'),
  ('Transport', 'Weekend bus schedule', '2026-09-10', 'Weekend bus schedule. Posted for students and the registry.'),
  ('Hall', 'Hall seat allotment, block A', '2026-09-11', 'Hall seat allotment, block A. Posted for students and the registry.'),
  ('Hall', 'Hall seat allotment, block B', '2026-09-12', 'Hall seat allotment, block B. Posted for students and the registry.'),
  ('Hall', 'Guest room booking rules', '2026-09-13', 'Guest room booking rules. Posted for students and the registry.'),
  ('Hall', 'Hall closing during vacation', '2026-09-14', 'Hall closing during vacation. Posted for students and the registry.'),
  ('Hall', 'Provost office hours', '2026-09-15', 'Provost office hours. Posted for students and the registry.'),
  ('Others', 'Library extended hours', '2026-09-16', 'Library extended hours. Posted for students and the registry.'),
  ('Others', 'Career talk with alumni', '2026-09-17', 'Career talk with alumni. Posted for students and the registry.'),
  ('Others', 'Blood donation camp', '2026-09-18', 'Blood donation camp. Posted for students and the registry.'),
  ('Others', 'Campus cleanliness drive', '2026-09-19', 'Campus cleanliness drive. Posted for students and the registry.'),
  ('Others', 'Student club registration', '2026-09-20', 'Student club registration. Posted for students and the registry.'),
  ('Exam', 'Lab viva schedule, CSE', '2026-09-21', 'Lab viva schedule, CSE. Posted for students and the registry.'),
  ('Exam', 'Lab viva schedule, EEE', '2026-09-22', 'Lab viva schedule, EEE. Posted for students and the registry.'),
  ('Transport', 'Pickup point update, Kandirpar', '2026-09-23', 'Pickup point update, Kandirpar. Posted for students and the registry.'),
  ('Hall', 'Mess menu for October', '2026-09-24', 'Mess menu for October. Posted for students and the registry.'),
  ('Others', 'ID card reissue desk', '2026-09-25', 'ID card reissue desk. Posted for students and the registry.')
) as seed(category, title, notice_date, description)
where not exists (select 1 from public.notices n where n.title = seed.title);

insert into public.gallery (title, description, image_url)
select seed.title, seed.description, seed.image_url
from (values
  ('Morning on the academic road', 'Campus photograph from the BAIUST collection.', '/media/image/baiust.jpg'),
  ('Front lawn', 'Campus photograph from the BAIUST collection.', '/media/home/1.jpg'),
  ('Lecture block', 'Campus photograph from the BAIUST collection.', '/media/home/a.jpg'),
  ('Courtyard', 'Campus photograph from the BAIUST collection.', '/media/home/b.jpg'),
  ('Aerial campus', 'Campus photograph from the BAIUST collection.', '/media/home/banner/campus.png'),
  ('Gate approach', 'Campus photograph from the BAIUST collection.', '/media/home/banner/banner1.jpg'),
  ('West block', 'Campus photograph from the BAIUST collection.', '/media/home/banner/banner7.jpg'),
  ('Evening campus', 'Campus photograph from the BAIUST collection.', '/media/home/banner/banner9.png'),
  ('University buses', 'Campus photograph from the BAIUST collection.', '/media/home/Facilities/trasport.jpg'),
  ('Library reading room', 'Campus photograph from the BAIUST collection.', '/media/home/ChooseB/Library.png'),
  ('Cafeteria', 'Campus photograph from the BAIUST collection.', '/media/home/ChooseB/Cafeteria.png'),
  ('CSE laboratory', 'Campus photograph from the BAIUST collection.', '/media/scenes/cse-lab.jpg'),
  ('EEE laboratory', 'Campus photograph from the BAIUST collection.', '/media/scenes/eee-lab.jpg'),
  ('Civil studio', 'Campus photograph from the BAIUST collection.', '/media/scenes/civil-studio.jpg'),
  ('Seminar room', 'Campus photograph from the BAIUST collection.', '/media/scenes/business-seminar.jpg'),
  ('Law reading room', 'Campus photograph from the BAIUST collection.', '/media/scenes/law-library.jpg'),
  ('English seminar', 'Campus photograph from the BAIUST collection.', '/media/scenes/english-reading.jpg'),
  ('Lecture hall', 'Campus photograph from the BAIUST collection.', '/media/scenes/lecture-hall.jpg'),
  ('Dining hall', 'Campus photograph from the BAIUST collection.', '/media/scenes/dining-hall.jpg'),
  ('Residence', 'Campus photograph from the BAIUST collection.', '/media/scenes/residence.jpg'),
  ('Day care', 'Campus photograph from the BAIUST collection.', '/media/scenes/daycare.jpg'),
  ('Gallery walk 1', 'Campus photograph from the BAIUST collection.', '/media/Gallery/img1.JPG'),
  ('Gallery walk 2', 'Campus photograph from the BAIUST collection.', '/media/Gallery/img10.JPG'),
  ('Gallery walk 3', 'Campus photograph from the BAIUST collection.', '/media/Gallery/img11.JPG'),
  ('Gallery walk 4', 'Campus photograph from the BAIUST collection.', '/media/Gallery/img12.JPG')
) as seed(title, description, image_url)
where not exists (select 1 from public.gallery g where g.title = seed.title);

insert into public.admissions (name, age, phone, email, address, ssc_result, hsc_result, subject, board, transaction_number, transaction_id, photo_url)
select seed.name, seed.age, seed.phone, seed.email, seed.address, seed.ssc, seed.hsc, seed.subject, seed.board, seed.txn_no, seed.txn_id, seed.photo
from (values
  ('Nusrat Jahan', '18', '01914000000', 'nusrat.jahan.apply@example.com', 'Cumilla', '5.00', '5.00', 'CSE', 'Cumilla', '01750000000', 'TXN-BAIUST-2000', '/media/image/student.jpg'),
  ('Tanvir Ahmed', '19', '01914000001', 'tanvir.ahmed.apply@example.com', 'Cumilla', '4.83', '4.92', 'EEE', 'Dhaka', '01750000001', 'TXN-BAIUST-2001', '/media/home/sir1.png'),
  ('Farhana Islam', '20', '01914000002', 'farhana.islam.apply@example.com', 'Cumilla', '4.83', '5.00', 'CE', 'Chattogram', '01750000002', 'TXN-BAIUST-2002', '/media/home/sir2.png'),
  ('Md. Rakib Hasan', '21', '01914000003', 'rakib.hasan.apply@example.com', 'Cumilla', '5.00', '4.92', 'BBA', 'Cumilla', '01750000003', 'TXN-BAIUST-2003', '/media/home/sir3.png'),
  ('Sumaiya Akter', '18', '01914000004', 'sumaiya.akter.apply@example.com', 'Cumilla', '4.83', '5.00', 'LLB', 'Dhaka', '01750000004', 'TXN-BAIUST-2004', '/media/home/sir4.png'),
  ('Mahmudul Hasan', '19', '01914000005', 'mahmudul.hasan.apply@example.com', 'Cumilla', '4.83', '4.92', 'ENG', 'Chattogram', '01750000005', 'TXN-BAIUST-2005', '/media/image/student.jpg'),
  ('Sadia Islam', '20', '01914000006', 'sadia.islam.apply@example.com', 'Cumilla', '5.00', '5.00', 'CSE', 'Cumilla', '01750000006', 'TXN-BAIUST-2006', '/media/home/sir1.png'),
  ('Imran Hossain', '21', '01914000007', 'imran.hossain.apply@example.com', 'Cumilla', '4.83', '4.92', 'EEE', 'Dhaka', '01750000007', 'TXN-BAIUST-2007', '/media/home/sir2.png'),
  ('Lamia Khan', '18', '01914000008', 'lamia.khan.apply@example.com', 'Cumilla', '4.83', '5.00', 'CE', 'Chattogram', '01750000008', 'TXN-BAIUST-2008', '/media/home/sir3.png'),
  ('Arif Mahmud', '19', '01914000009', 'arif.mahmud.apply@example.com', 'Cumilla', '5.00', '4.92', 'BBA', 'Cumilla', '01750000009', 'TXN-BAIUST-2009', '/media/home/sir4.png'),
  ('Mehzabin Chowdhury', '20', '01914000010', 'mehzabin.chowdhury.apply@example.com', 'Cumilla', '4.83', '5.00', 'LLB', 'Dhaka', '01750000010', 'TXN-BAIUST-2010', '/media/image/student.jpg'),
  ('Fahim Rahman', '21', '01914000011', 'fahim.rahman.apply@example.com', 'Cumilla', '4.83', '4.92', 'ENG', 'Chattogram', '01750000011', 'TXN-BAIUST-2011', '/media/home/sir1.png'),
  ('Tasnim Ahmed', '18', '01914000012', 'tasnim.ahmed.apply@example.com', 'Cumilla', '5.00', '5.00', 'CSE', 'Cumilla', '01750000012', 'TXN-BAIUST-2012', '/media/home/sir2.png'),
  ('Shahriar Kabir', '19', '01914000013', 'shahriar.kabir.apply@example.com', 'Cumilla', '4.83', '4.92', 'EEE', 'Dhaka', '01750000013', 'TXN-BAIUST-2013', '/media/home/sir3.png'),
  ('Nabila Sultana', '20', '01914000014', 'nabila.sultana.apply@example.com', 'Cumilla', '4.83', '5.00', 'CE', 'Chattogram', '01750000014', 'TXN-BAIUST-2014', '/media/home/sir4.png'),
  ('Omar Faruk', '21', '01914000015', 'omar.faruk.apply@example.com', 'Cumilla', '5.00', '4.92', 'BBA', 'Cumilla', '01750000015', 'TXN-BAIUST-2015', '/media/image/student.jpg'),
  ('Jannatul Ferdous', '18', '01914000016', 'jannatul.ferdous.apply@example.com', 'Cumilla', '4.83', '5.00', 'LLB', 'Dhaka', '01750000016', 'TXN-BAIUST-2016', '/media/home/sir1.png'),
  ('Rafsan Jamil', '19', '01914000017', 'rafsan.jamil.apply@example.com', 'Cumilla', '4.83', '4.92', 'ENG', 'Chattogram', '01750000017', 'TXN-BAIUST-2017', '/media/home/sir2.png'),
  ('Mitu Akter', '20', '01914000018', 'mitu.akter.apply@example.com', 'Cumilla', '5.00', '5.00', 'CSE', 'Cumilla', '01750000018', 'TXN-BAIUST-2018', '/media/home/sir3.png'),
  ('Hasan Mahmud', '21', '01914000019', 'hasan.mahmud.apply@example.com', 'Cumilla', '4.83', '4.92', 'EEE', 'Dhaka', '01750000019', 'TXN-BAIUST-2019', '/media/home/sir4.png'),
  ('Priya Das', '18', '01914000020', 'priya.das.apply@example.com', 'Cumilla', '4.83', '5.00', 'CE', 'Chattogram', '01750000020', 'TXN-BAIUST-2020', '/media/image/student.jpg'),
  ('Sabbir Ahmed', '19', '01914000021', 'sabbir.ahmed.apply@example.com', 'Cumilla', '5.00', '4.92', 'BBA', 'Cumilla', '01750000021', 'TXN-BAIUST-2021', '/media/home/sir1.png'),
  ('Anika Rahman', '20', '01914000022', 'anika.rahman.apply@example.com', 'Cumilla', '4.83', '5.00', 'LLB', 'Dhaka', '01750000022', 'TXN-BAIUST-2022', '/media/home/sir2.png'),
  ('Zubayer Hossain', '21', '01914000023', 'zubayer.hossain.apply@example.com', 'Cumilla', '4.83', '4.92', 'ENG', 'Chattogram', '01750000023', 'TXN-BAIUST-2023', '/media/home/sir3.png'),
  ('Faria Islam', '18', '01914000024', 'faria.islam.apply@example.com', 'Cumilla', '5.00', '5.00', 'CSE', 'Cumilla', '01750000024', 'TXN-BAIUST-2024', '/media/home/sir4.png')
) as seed(name, age, phone, email, address, ssc, hsc, subject, board, txn_no, txn_id, photo)
where not exists (select 1 from public.admissions a where a.email = seed.email);

insert into public.certificates (student_name, student_id, session, cgpa, department)
select s.name, s.student_id, '2024-2028', '3.70', s.department
from public.students s
where not exists (
  select 1 from public.certificates c where c.department = s.department and c.student_id = s.student_id
);

insert into public.results (student_id, student_email, session, year, subjects, gpa)
select s.student_id, s.email, 'Fall', '2025',
  jsonb_build_array(
    jsonb_build_object('name', 'Core I', 'credit', 3, 'marks', 82),
    jsonb_build_object('name', 'Core II', 'credit', 3, 'marks', 76),
    jsonb_build_object('name', 'Core III', 'credit', 3, 'marks', 71)
  ),
  3.75
from public.students s
where not exists (
  select 1 from public.results r where r.student_email = s.email and r.session = 'Fall' and r.year = '2025'
);

insert into public.semester_registrations (user_id, student_record_id, name, student_id, department, mobile, session, year, level_term, credits)
select s.user_id, s.id, s.name, s.student_id, s.department, s.mobile, 'Fall', '2025', '1 - 1', 19.5
from public.students s
where s.user_id is not null
  and not exists (
    select 1 from public.semester_registrations r
    where r.user_id = s.user_id and r.session = 'Fall' and r.year = '2025'
  );

insert into public.courses (code, title, department, credit, level_term)
select seed.code, seed.title, seed.department, seed.credit, seed.level_term
from (values
  ('EEE 1101', 'Electrical Circuits I', 'EEE', 3, '1 - 1'),
  ('EEE 1102', 'Electrical Circuits I Lab', 'EEE', 1.5, '1 - 1'),
  ('EEE 1201', 'Electronic Devices I', 'EEE', 3, '1 - 2'),
  ('EEE 1202', 'Electronic Devices I Lab', 'EEE', 1.5, '1 - 2'),
  ('CE 1101', 'Engineering Mechanics', 'CE', 3, '1 - 1'),
  ('CE 1102', 'Engineering Drawing', 'CE', 1.5, '1 - 1'),
  ('CE 1201', 'Surveying', 'CE', 3, '1 - 2'),
  ('CE 1202', 'Surveying Fieldwork', 'CE', 1.5, '1 - 2'),
  ('BBA 1101', 'Principles of Management', 'BBA', 3, '1 - 1'),
  ('BBA 1102', 'Financial Accounting', 'BBA', 3, '1 - 1'),
  ('BBA 1201', 'Microeconomics', 'BBA', 3, '1 - 2'),
  ('BBA 1202', 'Business Communication', 'BBA', 3, '1 - 2'),
  ('LLB 1101', 'Jurisprudence', 'LLB', 3, '1 - 1'),
  ('LLB 1102', 'Law of Contract', 'LLB', 3, '1 - 1'),
  ('LLB 1201', 'Constitutional Law', 'LLB', 3, '1 - 2'),
  ('LLB 1202', 'Muslim Law', 'LLB', 3, '1 - 2'),
  ('ENG 1101', 'Introduction to Literature', 'ENG', 3, '1 - 1'),
  ('ENG 1102', 'Remedial Grammar', 'ENG', 3, '1 - 1'),
  ('ENG 1201', 'Poetry', 'ENG', 3, '1 - 2'),
  ('ENG 1202', 'Academic Writing', 'ENG', 3, '1 - 2')
) as seed(code, title, department, credit, level_term)
where not exists (
  select 1 from public.courses c where c.department = seed.department and c.code = seed.code
);

insert into public.enrollments (user_id, course_id, session, year)
select s.user_id, c.id, 'Fall', '2025'
from public.students s
join lateral (
  select id from public.courses
  where department = s.department and level_term = '1 - 1'
  order by code
  limit 1
) c on true
where s.user_id is not null
  and not exists (
    select 1 from public.enrollments e
    where e.user_id = s.user_id and e.course_id = c.id and e.session = 'Fall' and e.year = '2025'
  );

insert into public.transport_windows (session, year, start_date, end_date, description)
select 'Fall', '2026', date '2026-09-01', date '2026-12-31', seed.description
from (values
  ('City route window 01'),
  ('City route window 02'),
  ('City route window 03'),
  ('City route window 04'),
  ('City route window 05'),
  ('City route window 06'),
  ('City route window 07'),
  ('City route window 08'),
  ('City route window 09'),
  ('City route window 10'),
  ('City route window 11'),
  ('City route window 12'),
  ('City route window 13'),
  ('City route window 14'),
  ('City route window 15'),
  ('City route window 16'),
  ('City route window 17'),
  ('City route window 18'),
  ('City route window 19'),
  ('City route window 20'),
  ('City route window 21'),
  ('City route window 22'),
  ('City route window 23'),
  ('City route window 24'),
  ('City route window 25')
) as seed(description)
where not exists (select 1 from public.transport_windows w where w.description = seed.description);

insert into public.transport_cards (user_id, window_id, session, year, start_date, end_date, pickup_point, fee, applicant)
select s.user_id, w.id, w.session, w.year, w.start_date, w.end_date, seed.pickup, seed.fee,
  jsonb_build_object('name', s.name, 'student_id', s.student_id, 'department', s.department, 'mobile', s.mobile, 'photo_url', s.photo_url, 'email', s.email)
from public.students s
join (values
  ('nusrat.jahan@baiust.ac.bd', 'City route window 01', 'কান্দিরপাড়/ঈদ্গাহ — নোয়াপাড়া — আলেখার চর — ক্যাম্পাস', 8500),
  ('tanvir.ahmed@baiust.ac.bd', 'City route window 02', 'টমসম ব্রিজ — পদুয়ার বাজার বিশ্বরোড — আলেখার চর — ক্যাম্পাস', 8500),
  ('farhana.islam@baiust.ac.bd', 'City route window 03', 'ঝাগুরঝুলি বিশ্বরোড — আলেখার চর — ক্যাম্পাস', 5500),
  ('rakib.hasan@baiust.ac.bd', 'City route window 04', 'MBA — ঈদগাহ সম্মুখ — পুলিশ লাইন — নোয়াপাড়া — ক্যাম্পাস', 4000),
  ('sumaiya.akter@baiust.ac.bd', 'City route window 05', 'ক্যান্টেনম্যান্ট/টিপরা বাজার — ক্যাম্পাস', 3500),
  ('mahmudul.hasan@baiust.ac.bd', 'City route window 06', 'কান্দিরপাড়/ঈদ্গাহ — নোয়াপাড়া — আলেখার চর — ক্যাম্পাস', 8500),
  ('sadia.islam@baiust.ac.bd', 'City route window 07', 'টমসম ব্রিজ — পদুয়ার বাজার বিশ্বরোড — আলেখার চর — ক্যাম্পাস', 8500),
  ('imran.hossain@baiust.ac.bd', 'City route window 08', 'ঝাগুরঝুলি বিশ্বরোড — আলেখার চর — ক্যাম্পাস', 5500),
  ('lamia.khan@baiust.ac.bd', 'City route window 09', 'MBA — ঈদগাহ সম্মুখ — পুলিশ লাইন — নোয়াপাড়া — ক্যাম্পাস', 4000),
  ('arif.mahmud@baiust.ac.bd', 'City route window 10', 'ক্যান্টেনম্যান্ট/টিপরা বাজার — ক্যাম্পাস', 3500),
  ('mehzabin.chowdhury@baiust.ac.bd', 'City route window 11', 'কান্দিরপাড়/ঈদ্গাহ — নোয়াপাড়া — আলেখার চর — ক্যাম্পাস', 8500),
  ('fahim.rahman@baiust.ac.bd', 'City route window 12', 'টমসম ব্রিজ — পদুয়ার বাজার বিশ্বরোড — আলেখার চর — ক্যাম্পাস', 8500),
  ('tasnim.ahmed@baiust.ac.bd', 'City route window 13', 'ঝাগুরঝুলি বিশ্বরোড — আলেখার চর — ক্যাম্পাস', 5500),
  ('shahriar.kabir@baiust.ac.bd', 'City route window 14', 'MBA — ঈদগাহ সম্মুখ — পুলিশ লাইন — নোয়াপাড়া — ক্যাম্পাস', 4000),
  ('nabila.sultana@baiust.ac.bd', 'City route window 15', 'ক্যান্টেনম্যান্ট/টিপরা বাজার — ক্যাম্পাস', 3500),
  ('omar.faruk@baiust.ac.bd', 'City route window 16', 'কান্দিরপাড়/ঈদ্গাহ — নোয়াপাড়া — আলেখার চর — ক্যাম্পাস', 8500),
  ('jannatul.ferdous@baiust.ac.bd', 'City route window 17', 'টমসম ব্রিজ — পদুয়ার বাজার বিশ্বরোড — আলেখার চর — ক্যাম্পাস', 8500),
  ('rafsan.jamil@baiust.ac.bd', 'City route window 18', 'ঝাগুরঝুলি বিশ্বরোড — আলেখার চর — ক্যাম্পাস', 5500),
  ('mitu.akter@baiust.ac.bd', 'City route window 19', 'MBA — ঈদগাহ সম্মুখ — পুলিশ লাইন — নোয়াপাড়া — ক্যাম্পাস', 4000),
  ('hasan.mahmud@baiust.ac.bd', 'City route window 20', 'ক্যান্টেনম্যান্ট/টিপরা বাজার — ক্যাম্পাস', 3500),
  ('priya.das@baiust.ac.bd', 'City route window 21', 'কান্দিরপাড়/ঈদ্গাহ — নোয়াপাড়া — আলেখার চর — ক্যাম্পাস', 8500),
  ('sabbir.ahmed@baiust.ac.bd', 'City route window 22', 'টমসম ব্রিজ — পদুয়ার বাজার বিশ্বরোড — আলেখার চর — ক্যাম্পাস', 8500),
  ('anika.rahman@baiust.ac.bd', 'City route window 23', 'ঝাগুরঝুলি বিশ্বরোড — আলেখার চর — ক্যাম্পাস', 5500),
  ('zubayer.hossain@baiust.ac.bd', 'City route window 24', 'MBA — ঈদগাহ সম্মুখ — পুলিশ লাইন — নোয়াপাড়া — ক্যাম্পাস', 4000),
  ('faria.islam@baiust.ac.bd', 'City route window 25', 'ক্যান্টেনম্যান্ট/টিপরা বাজার — ক্যাম্পাস', 3500)
) as seed(email, window_name, pickup, fee) on seed.email = s.email
join public.transport_windows w on w.description = seed.window_name
where not exists (
  select 1 from public.transport_cards c where c.user_id = s.user_id and c.window_id = w.id
);

insert into public.leave_requests (user_id, student_id, name, department, kind, start_date, end_date, reason, status)
select s.user_id, s.student_id, s.name, s.department, seed.kind, seed.start_date::date, seed.end_date::date, seed.reason, seed.status
from public.students s
join (values
  ('nusrat.jahan@baiust.ac.bd', 'Medical', '2026-10-01', '2026-10-02', 'Leave request 1 for a short absence.', 'pending'),
  ('tanvir.ahmed@baiust.ac.bd', 'Personal', '2026-10-02', '2026-10-03', 'Leave request 2 for a short absence.', 'approved'),
  ('farhana.islam@baiust.ac.bd', 'Academic', '2026-10-03', '2026-10-04', 'Leave request 3 for a short absence.', 'rejected'),
  ('rakib.hasan@baiust.ac.bd', 'Hall', '2026-10-04', '2026-10-05', 'Leave request 4 for a short absence.', 'pending'),
  ('sumaiya.akter@baiust.ac.bd', 'Medical', '2026-10-05', '2026-10-06', 'Leave request 5 for a short absence.', 'approved'),
  ('mahmudul.hasan@baiust.ac.bd', 'Personal', '2026-10-06', '2026-10-07', 'Leave request 6 for a short absence.', 'rejected'),
  ('sadia.islam@baiust.ac.bd', 'Academic', '2026-10-07', '2026-10-08', 'Leave request 7 for a short absence.', 'pending'),
  ('imran.hossain@baiust.ac.bd', 'Hall', '2026-10-08', '2026-10-09', 'Leave request 8 for a short absence.', 'approved'),
  ('lamia.khan@baiust.ac.bd', 'Medical', '2026-10-09', '2026-10-10', 'Leave request 9 for a short absence.', 'rejected'),
  ('arif.mahmud@baiust.ac.bd', 'Personal', '2026-10-10', '2026-10-11', 'Leave request 10 for a short absence.', 'pending'),
  ('mehzabin.chowdhury@baiust.ac.bd', 'Academic', '2026-10-11', '2026-10-12', 'Leave request 11 for a short absence.', 'approved'),
  ('fahim.rahman@baiust.ac.bd', 'Hall', '2026-10-12', '2026-10-13', 'Leave request 12 for a short absence.', 'rejected'),
  ('tasnim.ahmed@baiust.ac.bd', 'Medical', '2026-10-13', '2026-10-14', 'Leave request 13 for a short absence.', 'pending'),
  ('shahriar.kabir@baiust.ac.bd', 'Personal', '2026-10-14', '2026-10-15', 'Leave request 14 for a short absence.', 'approved'),
  ('nabila.sultana@baiust.ac.bd', 'Academic', '2026-10-15', '2026-10-16', 'Leave request 15 for a short absence.', 'rejected'),
  ('omar.faruk@baiust.ac.bd', 'Hall', '2026-10-16', '2026-10-17', 'Leave request 16 for a short absence.', 'pending'),
  ('jannatul.ferdous@baiust.ac.bd', 'Medical', '2026-10-17', '2026-10-18', 'Leave request 17 for a short absence.', 'approved'),
  ('rafsan.jamil@baiust.ac.bd', 'Personal', '2026-10-18', '2026-10-19', 'Leave request 18 for a short absence.', 'rejected'),
  ('mitu.akter@baiust.ac.bd', 'Academic', '2026-10-19', '2026-10-20', 'Leave request 19 for a short absence.', 'pending'),
  ('hasan.mahmud@baiust.ac.bd', 'Hall', '2026-10-20', '2026-10-21', 'Leave request 20 for a short absence.', 'approved'),
  ('priya.das@baiust.ac.bd', 'Medical', '2026-10-01', '2026-10-02', 'Leave request 21 for a short absence.', 'rejected'),
  ('sabbir.ahmed@baiust.ac.bd', 'Personal', '2026-10-02', '2026-10-03', 'Leave request 22 for a short absence.', 'pending'),
  ('anika.rahman@baiust.ac.bd', 'Academic', '2026-10-03', '2026-10-04', 'Leave request 23 for a short absence.', 'approved'),
  ('zubayer.hossain@baiust.ac.bd', 'Hall', '2026-10-04', '2026-10-05', 'Leave request 24 for a short absence.', 'rejected'),
  ('faria.islam@baiust.ac.bd', 'Medical', '2026-10-05', '2026-10-06', 'Leave request 25 for a short absence.', 'pending')
) as seed(email, kind, start_date, end_date, reason, status) on seed.email = s.email
where s.user_id is not null
  and not exists (select 1 from public.leave_requests l where l.reason = seed.reason);

insert into public.document_requests (user_id, student_id, name, department, kind, copies, purpose, status)
select s.user_id, s.student_id, s.name, s.department, seed.kind, seed.copies, seed.purpose, seed.status
from public.students s
join (values
  ('nusrat.jahan@baiust.ac.bd', 'Transcript', 1, 'Document request 1 for an application.', 'pending'),
  ('tanvir.ahmed@baiust.ac.bd', 'Testimonial', 2, 'Document request 2 for an application.', 'ready'),
  ('farhana.islam@baiust.ac.bd', 'Provisional certificate', 3, 'Document request 3 for an application.', 'collected'),
  ('rakib.hasan@baiust.ac.bd', 'Migration certificate', 1, 'Document request 4 for an application.', 'rejected'),
  ('sumaiya.akter@baiust.ac.bd', 'Transcript', 2, 'Document request 5 for an application.', 'pending'),
  ('mahmudul.hasan@baiust.ac.bd', 'Testimonial', 3, 'Document request 6 for an application.', 'ready'),
  ('sadia.islam@baiust.ac.bd', 'Provisional certificate', 1, 'Document request 7 for an application.', 'collected'),
  ('imran.hossain@baiust.ac.bd', 'Migration certificate', 2, 'Document request 8 for an application.', 'rejected'),
  ('lamia.khan@baiust.ac.bd', 'Transcript', 3, 'Document request 9 for an application.', 'pending'),
  ('arif.mahmud@baiust.ac.bd', 'Testimonial', 1, 'Document request 10 for an application.', 'ready'),
  ('mehzabin.chowdhury@baiust.ac.bd', 'Provisional certificate', 2, 'Document request 11 for an application.', 'collected'),
  ('fahim.rahman@baiust.ac.bd', 'Migration certificate', 3, 'Document request 12 for an application.', 'rejected'),
  ('tasnim.ahmed@baiust.ac.bd', 'Transcript', 1, 'Document request 13 for an application.', 'pending'),
  ('shahriar.kabir@baiust.ac.bd', 'Testimonial', 2, 'Document request 14 for an application.', 'ready'),
  ('nabila.sultana@baiust.ac.bd', 'Provisional certificate', 3, 'Document request 15 for an application.', 'collected'),
  ('omar.faruk@baiust.ac.bd', 'Migration certificate', 1, 'Document request 16 for an application.', 'rejected'),
  ('jannatul.ferdous@baiust.ac.bd', 'Transcript', 2, 'Document request 17 for an application.', 'pending'),
  ('rafsan.jamil@baiust.ac.bd', 'Testimonial', 3, 'Document request 18 for an application.', 'ready'),
  ('mitu.akter@baiust.ac.bd', 'Provisional certificate', 1, 'Document request 19 for an application.', 'collected'),
  ('hasan.mahmud@baiust.ac.bd', 'Migration certificate', 2, 'Document request 20 for an application.', 'rejected'),
  ('priya.das@baiust.ac.bd', 'Transcript', 3, 'Document request 21 for an application.', 'pending'),
  ('sabbir.ahmed@baiust.ac.bd', 'Testimonial', 1, 'Document request 22 for an application.', 'ready'),
  ('anika.rahman@baiust.ac.bd', 'Provisional certificate', 2, 'Document request 23 for an application.', 'collected'),
  ('zubayer.hossain@baiust.ac.bd', 'Migration certificate', 3, 'Document request 24 for an application.', 'rejected'),
  ('faria.islam@baiust.ac.bd', 'Transcript', 1, 'Document request 25 for an application.', 'pending')
) as seed(email, kind, copies, purpose, status) on seed.email = s.email
where s.user_id is not null
  and not exists (select 1 from public.document_requests d where d.purpose = seed.purpose);

insert into public.fees (student_email, student_id, name, title, session, year, amount, paid, due_date)
select s.email, s.student_id, s.name, seed.title, 'Fall', '2025', seed.amount, seed.paid, seed.due_date::date
from public.students s
join (values
  ('nusrat.jahan@baiust.ac.bd', 'Tuition', 8000, 8000, '2026-10-01'),
  ('tanvir.ahmed@baiust.ac.bd', 'Laboratory', 9500, 4750, '2026-10-02'),
  ('farhana.islam@baiust.ac.bd', 'Hall', 11000, 5500, '2026-10-03'),
  ('rakib.hasan@baiust.ac.bd', 'Library', 12500, 12500, '2026-10-04'),
  ('sumaiya.akter@baiust.ac.bd', 'Activity', 14000, 7000, '2026-10-05'),
  ('mahmudul.hasan@baiust.ac.bd', 'Tuition', 8000, 4000, '2026-10-06'),
  ('sadia.islam@baiust.ac.bd', 'Laboratory', 9500, 9500, '2026-10-07'),
  ('imran.hossain@baiust.ac.bd', 'Hall', 11000, 5500, '2026-10-08'),
  ('lamia.khan@baiust.ac.bd', 'Library', 12500, 6250, '2026-10-09'),
  ('arif.mahmud@baiust.ac.bd', 'Activity', 14000, 14000, '2026-10-10'),
  ('mehzabin.chowdhury@baiust.ac.bd', 'Tuition', 8000, 4000, '2026-10-11'),
  ('fahim.rahman@baiust.ac.bd', 'Laboratory', 9500, 4750, '2026-10-12'),
  ('tasnim.ahmed@baiust.ac.bd', 'Hall', 11000, 11000, '2026-10-13'),
  ('shahriar.kabir@baiust.ac.bd', 'Library', 12500, 6250, '2026-10-14'),
  ('nabila.sultana@baiust.ac.bd', 'Activity', 14000, 7000, '2026-10-15'),
  ('omar.faruk@baiust.ac.bd', 'Tuition', 8000, 8000, '2026-10-16'),
  ('jannatul.ferdous@baiust.ac.bd', 'Laboratory', 9500, 4750, '2026-10-17'),
  ('rafsan.jamil@baiust.ac.bd', 'Hall', 11000, 5500, '2026-10-18'),
  ('mitu.akter@baiust.ac.bd', 'Library', 12500, 12500, '2026-10-19'),
  ('hasan.mahmud@baiust.ac.bd', 'Activity', 14000, 7000, '2026-10-20'),
  ('priya.das@baiust.ac.bd', 'Tuition', 8000, 4000, '2026-10-21'),
  ('sabbir.ahmed@baiust.ac.bd', 'Laboratory', 9500, 9500, '2026-10-22'),
  ('anika.rahman@baiust.ac.bd', 'Hall', 11000, 5500, '2026-10-23'),
  ('zubayer.hossain@baiust.ac.bd', 'Library', 12500, 6250, '2026-10-24'),
  ('faria.islam@baiust.ac.bd', 'Activity', 14000, 14000, '2026-10-25')
) as seed(email, title, amount, paid, due_date) on seed.email = s.email
where not exists (
  select 1 from public.fees f where f.student_email = s.email and f.title = seed.title and f.session = 'Fall' and f.year = '2025'
);

insert into public.calendar_events (title, category, event_date, detail)
select seed.title, seed.category, seed.event_date::date, seed.detail
from (values
  ('Class test week, level 1', 'Exam', '2026-10-21', 'Published by the registry.'),
  ('Class test week, level 2', 'Exam', '2026-10-22', 'Published by the registry.'),
  ('Class test week, level 3', 'Exam', '2026-10-23', 'Published by the registry.'),
  ('Class test week, level 4', 'Exam', '2026-10-26', 'Published by the registry.'),
  ('Lab viva, CSE', 'Exam', '2026-10-27', 'Published by the registry.'),
  ('Lab viva, EEE', 'Exam', '2026-10-28', 'Published by the registry.'),
  ('Make-up exam applications close', 'Exam', '2026-10-29', 'Published by the registry.'),
  ('Result review window', 'Exam', '2026-11-03', 'Published by the registry.'),
  ('Semester drop deadline', 'Registration', '2026-11-05', 'Published by the registry.'),
  ('Add-drop closes', 'Registration', '2026-11-08', 'Published by the registry.'),
  ('Course enrollment closes', 'Registration', '2026-11-10', 'Published by the registry.'),
  ('Hall fee deadline', 'Office', '2026-10-18', 'Published by the registry.'),
  ('Library late hours begin', 'Office', '2026-10-19', 'Published by the registry.'),
  ('ID card reissue day', 'Office', '2026-10-24', 'Published by the registry.'),
  ('Accounts counter, Saturday', 'Office', '2026-10-25', 'Published by the registry.'),
  ('Career seminar', 'Office', '2026-11-12', 'Published by the registry.'),
  ('Alumni meetup', 'Office', '2026-11-15', 'Published by the registry.'),
  ('Blood donation camp', 'Office', '2026-11-18', 'Published by the registry.'),
  ('Club fair', 'Office', '2026-11-20', 'Published by the registry.'),
  ('Shab-e-Barat holiday', 'Holiday', '2026-02-04', 'Published by the registry.'),
  ('Eid holiday notice posted', 'Holiday', '2026-03-20', 'Published by the registry.'),
  ('Independence Day observed', 'Holiday', '2026-03-26', 'Published by the registry.'),
  ('Pohela Boishakh', 'Holiday', '2026-04-14', 'Published by the registry.'),
  ('Winter break begins', 'Holiday', '2026-12-20', 'Published by the registry.'),
  ('Classes resume', 'Registration', '2027-01-08', 'Published by the registry.')
) as seed(title, category, event_date, detail)
where not exists (select 1 from public.calendar_events e where e.title = seed.title);
