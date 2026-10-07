export const DEPARTMENTS = [
  { code: "CSE", name: "Computer Science & Engineering" },
  { code: "EEE", name: "Electrical & Electronic Engineering" },
  { code: "CE", name: "Civil Engineering" },
  { code: "BBA", name: "Business Administration" },
  { code: "LLB", name: "Law" },
  { code: "ENG", name: "English" },
];

export const NOTICE_TYPES = ["Exam", "Transport", "Hall", "Others"];
export const LEAVE_KINDS = ["Medical", "Personal", "Academic", "Hall"];
export const DOCUMENT_KINDS = ["Transcript", "Testimonial", "Provisional certificate", "Migration certificate"];
export const CALENDAR_KINDS = ["Exam", "Holiday", "Registration", "Office"];
export const SESSIONS = ["Spring", "Fall"];
export const YEARS = ["2024", "2025", "2026", "2027", "2028", "2029", "2030"];
export const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const LEVELS = [
  { term: "1 - 1", credits: 19.5 },
  { term: "1 - 2", credits: 20.5 },
  { term: "2 - 1", credits: 20.75 },
  { term: "2 - 2", credits: 18.75 },
  { term: "3 - 1", credits: 21 },
  { term: "3 - 2", credits: 22.5 },
  { term: "4 - 1", credits: 23 },
  { term: "4 - 2", credits: 24.75 },
];

export const ROUTES = [
  { name: "কান্দিরপাড়/ঈদ্গাহ — নোয়াপাড়া — আলেখার চর — ক্যাম্পাস", fee: 8500 },
  { name: "টমসম ব্রিজ — পদুয়ার বাজার বিশ্বরোড — আলেখার চর — ক্যাম্পাস", fee: 8500 },
  { name: "ঝাগুরঝুলি বিশ্বরোড — আলেখার চর — ক্যাম্পাস", fee: 5500 },
  { name: "MBA — ঈদগাহ সম্মুখ — পুলিশ লাইন — নোয়াপাড়া — ক্যাম্পাস", fee: 4000 },
  { name: "ক্যান্টেনম্যান্ট/টিপরা বাজার — ক্যাম্পাস", fee: 3500 },
];

export const PROGRAMS = [
  { code: "CSE", name: "Computer Science & Engineering", text: "Software, systems, and computing.", image: "scenes/cse-lab.jpg", pdf: "Courses/CSECourses.pdf" },
  { code: "EEE", name: "Electrical & Electronic Engineering", text: "Power, electronics, and communication.", image: "scenes/eee-lab.jpg", pdf: "Courses/EEECourses.pdf" },
  { code: "CE", name: "Civil Engineering", text: "Structures, materials, and the built environment.", image: "scenes/civil-studio.jpg", pdf: "Courses/CECourses.pdf" },
  { code: "BBA", name: "Business Administration", text: "Management, finance, and practice.", image: "scenes/business-seminar.jpg", pdf: "Courses/BBACourses.pdf" },
  { code: "LLB", name: "Law", text: "Legal study in the Bangladeshi context.", image: "scenes/law-library.jpg", pdf: "Courses/LLBCourses.pdf" },
  { code: "ENG", name: "English", text: "Language, literature, and writing.", image: "scenes/english-reading.jpg", pdf: "Courses/ENGCourses.pdf" },
];

export const FACILITIES = [
  { title: "Classrooms", text: "Rooms set up for lectures with shared display and audio.", image: "scenes/lecture-hall.jpg" },
  { title: "Residential halls", text: "On-campus housing for resident students.", image: "image/baiust.jpg" },
  { title: "Dining", text: "A central hall for everyday meals.", image: "scenes/dining-hall.jpg" },
  { title: "Laboratories", text: "Department labs for practical coursework.", image: "scenes/eee-lab.jpg" },
  { title: "Transport", text: "Bus routes for students who live off campus.", image: "home/Facilities/trasport.jpg" },
  { title: "Day care", text: "Childcare for students and faculty who need it.", image: "scenes/daycare.jpg" },
];

export const CAMPUS_LIFE = [
  { title: "Campus", image: "image/baiust.jpg" },
  { title: "Transport", image: "home/Facilities/trasport.jpg" },
  { title: "Library", image: "home/ChooseB/Library.png" },
  { title: "Cafeteria", image: "home/ChooseB/Cafeteria.png" },
  { title: "Residence", image: "scenes/residence.jpg" },
  { title: "Lecture", image: "scenes/lecture-hall.jpg" },
];

export const HERO_SLIDES = [
  "image/baiust.jpg",
  "home/banner/campus.png",
  "home/banner/banner2.png",
  "home/Facilities/trasport.jpg",
];

export const CAMPUS_GALLERY = [
  "Gallery/img1.JPG",
  "Gallery/img10.JPG",
  "Gallery/img11.JPG",
  "Gallery/img12.JPG",
  "Gallery/img13.JPG",
  "Gallery/img14.JPG",
  "home/1.jpg",
  "home/a.jpg",
  "home/b.jpg",
  "home/banner/banner1.jpg",
  "home/banner/banner7.jpg",
  "home/banner/banner9.png",
];

export const LEADERSHIP = [
  { role: "Chancellor", name: "Mohammed Shahabuddin", note: "President of the People's Republic of Bangladesh", image: "home/cheif/Mohammed Shahabuddin.png" },
  { role: "Chairman, Board of Trustees", name: "General S M Shafiuddin Ahmed", note: "SBP (BAR), OSP, ndu, psc, PhD", image: "home/cheif/smShafiuddin.jpg" },
  { role: "Member, Board of Trustees", name: "Major General Mohammad Jahangir Alam", note: "BSP, ndc, psc · GOC 33 Infantry Division, Cumilla Area", image: "home/cheif/Major General Mohammad Jahangir Alam.png" },
  { role: "Vice Chancellor", name: "Brigadier General Md Habibul Huq, psc, PhD", note: "Bangladesh Army International University of Science and Technology", image: "home/cheif/vc.jpg" },
];

export const ALUMNI = [
  { name: "Md. Ebrahim Khalil", role: "Assistant Software Engineer, ICT Wing, BAIUST", image: "home/Alumni/md-ebrahim-kholil.png" },
  { name: "Ismeat Rahman Sristy", role: "Business Development Executive, US Bangla Group", image: "home/Alumni/sristy.jpeg" },
  { name: "Mahadi Hasan Tamim", role: "Territory Manager, Robi Axiata Ltd", image: "home/Alumni/mehedi.jpeg" },
  { name: "Jubair Talha Hossain", role: "Assistant Officer, IFIC Bank PLC", image: "home/Alumni/jubayer.jpeg" },
  { name: "Mahamudul Hasan Shaon", role: "Account Management, foodpanda Bangladesh", image: "home/Alumni/shawon.jpeg" },
];

export const CAMPUS = {
  name: "Bangladesh Army International University of Science and Technology",
  short: "BAIUST",
  address: "Syedpur, Adarsha Sadar, Cumilla",
  phone: "+880 1756 436655",
  telephone: "02339334212",
  email: "info@baiust.ac.bd",
  map: "https://www.google.com/maps/search/?api=1&query=BAIUST+Cumilla",
};
