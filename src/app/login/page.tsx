import Link from "next/link";
import { signInDemo } from "../actions";
import { SignInForm } from "./SignInForm";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;

  return (
    <div className="min-h-screen grid place-items-center px-4">
      <div className="w-full max-w-sm">
        <Link href="/" className="block text-center text-lg font-extrabold">
          <span className="text-orange-600">▲</span> LaunchKit
        </Link>
        <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h1 className="text-xl font-bold">Sign in</h1>
          <p className="mt-1 text-sm text-stone-500">Use the demo admin account, or sign in with any email.</p>

          <form action={signInDemo} className="mt-5">
            <button className="w-full rounded-lg bg-orange-600 py-2.5 font-semibold text-white hover:bg-orange-500">
              Continue with demo account
            </button>
          </form>

          <div className="my-5 flex items-center gap-3 text-xs text-stone-400">
            <div className="h-px flex-1 bg-stone-200" /> or <div className="h-px flex-1 bg-stone-200" />
          </div>

          <SignInForm next={next ?? "/dashboard"} />
        </div>
        <p className="mt-4 text-center text-xs text-stone-400">
          Demo auth: no passwords are stored. Production builds plug in Supabase Auth, Clerk, or Auth.js.
        </p>
      </div>
    </div>
  );
}
