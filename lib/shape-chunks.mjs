function line(label, value) {
  if (value === undefined || value === null || value === "") return "";
  return `${label}: ${value}`;
}

function byUser(rows) {
  const map = new Map();
  for (const row of rows || []) {
    const list = map.get(row.user_id) || [];
    list.push(row);
    map.set(row.user_id, list);
  }
  return map;
}

function byEmail(rows) {
  const map = new Map();
  for (const row of rows || []) {
    const key = String(row.student_email || "").toLowerCase();
    const list = map.get(key) || [];
    list.push(row);
    map.set(key, list);
  }
  return map;
}

export function shapeChunks({ students, registrations, enrollments, results, fees, leaves, documents, notices, courses, events, faculty, admissions }) {
  const registrationMap = byUser(registrations);
  const enrollmentMap = byUser(enrollments);
  const leaveMap = byUser(leaves);
  const documentMap = byUser(documents);
  const resultMap = byEmail(results);
  const feeMap = byEmail(fees);

  const chunks = [
    {
      source: "policy",
      ref_id: "gpa",
      audience: "public",
      owner_email: null,
      title: "GPA scale",
      content: "BAIUST calculates GPA from marks and credits. 80 and above is 4.00, 75 is 3.75, 70 is 3.50, 65 is 3.25, 60 is 3.00, 55 is 2.75, 50 is 2.50, 45 is 2.25, 40 is 2.00, and below 40 is 0.",
    },
    {
      source: "policy",
      ref_id: "enrollment",
      audience: "public",
      owner_email: null,
      title: "Enrollment rule",
      content: "A student registers a semester first, then enrolls in courses for that same level and term. Enrolled credits cannot pass the credits on the semester registration.",
    },
  ];

  for (const student of students || []) {
    const email = String(student.email || "").toLowerCase();
    const regs = (registrationMap.get(student.user_id) || [])
      .map((row) => `${row.session} ${row.year} level ${row.level_term}, ${row.credits} credits`)
      .join("; ");
    const coursesTaken = (enrollmentMap.get(student.user_id) || [])
      .map((row) => `${row.session} ${row.year}: ${row.courses?.code || "course"} ${row.courses?.title || ""} (${row.courses?.credit || ""} credit)`)
      .join("; ");
    const resultText = (resultMap.get(email) || [])
      .map((row) => {
        const subjects = (row.subjects || []).map((subject) => `${subject.name} ${subject.marks}/${subject.credit}`).join(", ");
        return `${row.session} ${row.year} GPA ${row.gpa}${subjects ? ` (${subjects})` : ""}`;
      })
      .join("; ");
    const feeText = (feeMap.get(email) || [])
      .map((row) => `${row.title} ${row.session} ${row.year} amount ${row.amount} paid ${row.paid} due ${row.due_date || "unspecified"}`)
      .join("; ");
    const leaveText = (leaveMap.get(student.user_id) || [])
      .map((row) => `${row.kind} ${row.start_date} to ${row.end_date} ${row.status}. ${row.reason || ""}`)
      .join("; ");
    const documentText = (documentMap.get(student.user_id) || [])
      .map((row) => `${row.kind} x${row.copies} ${row.status}. ${row.purpose || ""}`)
      .join("; ");

    chunks.push({
      source: "student",
      ref_id: student.id,
      audience: "student",
      owner_email: email,
      title: `${student.name} · ${student.student_id}`,
      content: [
        line("Student", student.name),
        line("ID", student.student_id),
        line("Department", student.department),
        line("Enrolled semester", student.enrolled_semester),
        line("Email", email),
        line("Mobile", student.mobile),
        line("Semester registrations", regs),
        line("Enrolled courses", coursesTaken),
        line("Results", resultText),
        line("Fees", feeText),
        line("Leave", leaveText),
        line("Documents", documentText),
      ].filter(Boolean).join("\n"),
    });
  }

  for (const notice of notices || []) {
    chunks.push({
      source: "notice",
      ref_id: notice.id,
      audience: "public",
      owner_email: null,
      title: notice.title,
      content: `Notice category ${notice.category}, date ${notice.notice_date}: ${notice.title}. ${notice.description || ""}`,
    });
  }

  for (const course of courses || []) {
    chunks.push({
      source: "course",
      ref_id: course.id,
      audience: "public",
      owner_email: null,
      title: `${course.code} ${course.title}`,
      content: `Course ${course.code} ${course.title}. Department ${course.department}. Level ${course.level_term}. Credit ${course.credit}.`,
    });
  }

  for (const event of events || []) {
    chunks.push({
      source: "calendar",
      ref_id: event.id,
      audience: "public",
      owner_email: null,
      title: event.title,
      content: `Calendar ${event.event_date}, category ${event.category}: ${event.title}. ${event.detail || ""}`,
    });
  }

  for (const person of faculty || []) {
    chunks.push({
      source: "faculty",
      ref_id: person.id,
      audience: "public",
      owner_email: null,
      title: person.name,
      content: `Faculty ${person.name}, ${person.designation || "staff"}, department ${person.department}. Email ${person.email || "not listed"}. Phone ${person.phone || "not listed"}.`,
    });
  }

  for (const application of admissions || []) {
    chunks.push({
      source: "admission",
      ref_id: application.id,
      audience: "staff",
      owner_email: null,
      title: `Application · ${application.name}`,
      content: `Admission application for ${application.name}, programme ${application.subject}. SSC ${application.ssc_result || "missing"}, HSC ${application.hsc_result || "missing"}, board ${application.board || "missing"}. Phone ${application.phone || "missing"}. Email ${application.email || "missing"}.`,
    });
  }

  return chunks;
}
