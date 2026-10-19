"use client";

import { useActionState } from "react";
import { signIn, type FormState } from "../actions";

export function SignInForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(signIn, {});

  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="next" value={next} />
      <label className="block">
        <span className="text-sm font-medium">Name</span>
        <input name="name" className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-orange-500" />
      </label>
      <label className="block">
        <span className="text-sm font-medium">Email</span>
        <input
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-orange-500"
        />
      </label>
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      <button
        disabled={pending}
        className="w-full rounded-lg border border-stone-900 py-2.5 font-semibold hover:bg-stone-900 hover:text-white disabled:opacity-50"
      >
        {pending ? "Signing in…" : "Sign in with email"}
      </button>
    </form>
  );
}
