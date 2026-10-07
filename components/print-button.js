"use client";

export function PrintButton({ label = "Print / save PDF" }) {
  return (
    <button type="button" onClick={() => window.print()} className="border border-ink/15 px-4 py-2.5 text-sm">
      {label}
    </button>
  );
}
