const SCALE = [
  [80, 4, "A+"],
  [75, 3.75, "A"],
  [70, 3.5, "A-"],
  [65, 3.25, "B+"],
  [60, 3, "B"],
  [55, 2.75, "B-"],
  [50, 2.5, "C+"],
  [45, 2.25, "C"],
  [40, 2, "D"],
];

export function gradeFromMarks(marks) {
  const score = Number(marks);
  for (const [min, point, letter] of SCALE) {
    if (score >= min) return { point, letter };
  }
  return { point: 0, letter: "F" };
}

export function calculateGpa(subjects) {
  let credits = 0;
  let points = 0;
  for (const subject of subjects) {
    const credit = Number(subject.credit);
    if (!credit) continue;
    credits += credit;
    points += gradeFromMarks(subject.marks).point * credit;
  }
  if (!credits) return 0;
  return Math.round((points / credits) * 100) / 100;
}

export function calculateCgpa(results) {
  let credits = 0;
  let points = 0;
  for (const result of results) {
    const subjectCredits = (result.subjects || []).reduce(
      (sum, subject) => sum + Number(subject.credit || 0),
      0
    );
    if (!subjectCredits) continue;
    credits += subjectCredits;
    points += Number(result.gpa) * subjectCredits;
  }
  if (credits) return Math.round((points / credits) * 100) / 100;
  if (!results.length) return 0;
  const average = results.reduce((sum, result) => sum + Number(result.gpa), 0) / results.length;
  return Math.round(average * 100) / 100;
}
