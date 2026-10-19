"use client";

import { useActionState } from "react";
import { updateProfile, type FormState } from "../../actions";

export function ProfileForm({ name, email }: { name: string; email: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(updateProfile, {});

  return (
    <form action={action} className="space-y-4">
      <label className="block">
        <span className="text-sm font-medium">Display name</span>
        <input
          name="name"
          defaultValue={name}
          className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-orange-500"
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium">Email</span>
        <input value={email} disabled className="mt-1 w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-stone-500" />
      </label>
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state.ok && <p className="text-sm text-emerald-700">{state.ok}</p>}
      <button disabled={pending} className="rounded-lg bg-stone-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">
        {pending ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}
