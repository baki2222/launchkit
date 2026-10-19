"use server";

import { redirect } from "next/navigation";
import { clearSession, getSession, setSession, type Plan } from "@/lib/session";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type FormState = { error?: string; ok?: string };

/**
 * Demo sign-in: no passwords are stored. A real deployment swaps this for
 * Supabase Auth, Clerk, or Auth.js (magic link / OAuth).
 */
export async function signIn(_: FormState, form: FormData): Promise<FormState> {
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const name = String(form.get("name") ?? "").trim() || email.split("@")[0];
  const next = String(form.get("next") ?? "/dashboard");
  if (!EMAIL.test(email)) return { error: "Please enter a valid email address." };

  await setSession({ email, name, plan: "free", role: "member" });
  redirect(next.startsWith("/dashboard") ? next : "/dashboard");
}

export async function signInDemo() {
  await setSession({ email: "demo@launchkit.dev", name: "Demo Admin", plan: "pro", role: "admin" });
  redirect("/dashboard");
}

export async function signOut() {
  await clearSession();
  redirect("/");
}

export async function updateProfile(_: FormState, form: FormData): Promise<FormState> {
  const session = await getSession();
  if (!session) redirect("/login");
  const name = String(form.get("name") ?? "").trim();
  if (name.length < 2) return { error: "Name must be at least 2 characters." };
  await setSession({ ...session, name });
  return { ok: "Profile saved." };
}

/** Plan change used in demo mode (no Stripe key) and after a verified Stripe checkout. */
export async function demoChangePlan(form: FormData) {
  const session = await getSession();
  if (!session) redirect("/login");
  const plan = String(form.get("plan")) as Plan;
  if (["free", "pro", "team"].includes(plan)) await setSession({ ...session, plan });
  redirect("/dashboard/billing?updated=1");
}
