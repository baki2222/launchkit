import Link from "next/link";
import { PLANS } from "@/lib/plans";
import { getSession } from "@/lib/session";

const FEATURES = [
  { title: "Authentication", body: "Signed, HTTP-only session cookies and route protection in middleware." },
  { title: "Stripe subscriptions", body: "Checkout, plan upgrades, and server-side verification of every payment." },
  { title: "Analytics dashboard", body: "MRR, signups, churn, and growth charts your customers understand at a glance." },
  { title: "Admin panel", body: "Role-based access, user list, plan and billing status in one place." },
];

export default async function Landing() {
  const session = await getSession();

  return (
    <div>
      <nav className="mx-auto max-w-6xl px-4 py-5 flex items-center justify-between">
        <span className="text-lg font-extrabold tracking-tight">
          <span className="text-orange-600">▲</span> LaunchKit
        </span>
        <Link
          href={session ? "/dashboard" : "/login"}
          className="rounded-full bg-stone-900 px-4 py-2 text-sm font-semibold text-white hover:bg-stone-700"
        >
          {session ? "Open dashboard" : "Sign in"}
        </Link>
      </nav>

      <section className="mx-auto max-w-6xl px-4 pt-16 pb-20 text-center">
        <p className="inline-block rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
          Next.js 15 · TypeScript · Stripe
        </p>
        <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.05]">
          Ship your SaaS
          <br />
          in days, not months.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-stone-600">
          Auth, subscriptions, a real analytics dashboard, and an admin panel — wired together and ready for your product.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/login" className="rounded-full bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-500">
            Try the live demo
          </Link>
          <a
            href="https://github.com/baki2222/launchkit"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-stone-300 px-6 py-3 font-semibold hover:border-stone-900"
          >
            View source
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f) => (
          <div key={f.title} className="rounded-2xl border border-stone-200 bg-white p-5">
            <h3 className="font-bold">{f.title}</h3>
            <p className="mt-2 text-sm text-stone-600">{f.body}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl font-extrabold text-center">Simple pricing</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {Object.entries(PLANS).map(([id, p]) => (
            <div
              key={id}
              className={`rounded-2xl border p-6 bg-white ${id === "pro" ? "border-orange-500 ring-4 ring-orange-100" : "border-stone-200"}`}
            >
              <p className="font-bold">{p.name}</p>
              <p className="mt-2 text-4xl font-extrabold">
                ${p.price}
                <span className="text-base font-medium text-stone-500">/mo</span>
              </p>
              <ul className="mt-5 space-y-2 text-sm text-stone-600">
                {p.features.map((f) => (
                  <li key={f}>✓ {f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-stone-200 py-8 text-center text-sm text-stone-500">
        LaunchKit is a portfolio demo. Sample data only.
      </footer>
    </div>
  );
}
