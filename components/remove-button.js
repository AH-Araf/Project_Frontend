"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

export function RemoveButton({ id, action, label = "Remove" }) {
  const router = useRouter();
  const [pending, start] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      className="text-sm text-clay disabled:opacity-50"
      onClick={() => {
        start(async () => {
          const result = await action(id);
          if (!result?.ok) {
            window.alert(result?.message || "Could not remove that record.");
            return;
          }
          router.refresh();
        });
      }}
    >
      {pending ? "Removing…" : label}
    </button>
  );
}
