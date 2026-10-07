const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatDate(value) {
  if (!value) return "—";
  const [year, month, day] = String(value).slice(0, 10).split("-");
  if (!year || !month || !day) return String(value);
  return `${Number(day)} ${MONTHS[Number(month) - 1] || month} ${year}`;
}

export function money(value) {
  const amount = Number(value || 0);
  return `৳${amount.toLocaleString("en-BD")}`;
}

export function balance(row) {
  return Math.max(0, Number(row.amount || 0) - Number(row.paid || 0));
}
