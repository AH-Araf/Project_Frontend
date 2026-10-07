"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export function useAction() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [ok, setOk] = useState(false);
  const [pending, start] = useTransition();

  function run(action, form) {
    const data = form ? new FormData(form) : null;
    start(async () => {
      const result = data ? await action(data) : await action();
      setOk(Boolean(result?.ok));
      setMessage(result?.message || (result?.ok ? "Saved." : "Something went wrong."));
      if (result?.ok && form) form.reset();
      if (result?.ok) router.refresh();
      return result;
    });
  }

  return { message, ok, pending, run, setMessage, setOk };
}
