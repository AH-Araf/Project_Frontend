"use client";

import { signIn } from "@/lib/actions/auth";
import { Button, Field, Note } from "@/components/ui";
import { useAction } from "@/components/use-action";

export function LoginForm({ next = "/dashboard" }) {
  const { message, ok, pending, run } = useAction();

  return (
    <form
      className="grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        run(signIn, event.currentTarget);
      }}
    >
      <input type="hidden" name="next" value={next} />
      <Field label="Email" name="email" type="email" required autoComplete="email" placeholder="name@baiust.ac.bd" />
      <Field label="Password" name="password" type="password" required autoComplete="current-password" placeholder="Your password" />
      <Note ok={ok}>{message}</Note>
      <Button disabled={pending} className="mt-2 w-full">{pending ? "Signing in…" : "Sign in"}</Button>
    </form>
  );
}
