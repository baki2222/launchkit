import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { PLANS } from "@/lib/plans";
import type { Plan } from "@/lib/jwt";
import { demoChangePlan } from "../../actions";

export default async function Billing({ searchParams }: { searchParams: Promise<{ updated?: string; canceled?: string }> }) {
  const session = await getSession();
  if (!session) redirect("/login");
  const params = await searchParams;
  const stripeEnabled = Boolean(process.env.STRIPE_SECRET_KEY);

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-extrabold">Billing</h1>
        <p className="text-sm text-stone-500">
          You&apos;re on the <strong>{PLANS[session.plan].name}</strong> plan.
          {!stripeEnabled && " Demo mode: plan changes apply instantly without payment."}
        </p>
      </div>

      {params.updated && (
        <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-800">Your plan was updated.</p>
      )}
      {params.canceled && (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-800">Checkout was canceled. No charge was made.</p>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        {(Object.keys(PLANS) as Plan[]).map((id) => {
          const p = PLANS[id];
          const current = id === session.plan;
          // Paid upgrades go through Stripe Checkout when it's configured.
          const viaStripe = stripeEnabled && id !== "free";
          return (
            <div key={id} className={`rounded-2xl border bg-white p-6 ${current ? "border-orange-500 ring-4 ring-orange-100" : "border-stone-200"}`}>
              <p className="font-bold">{p.name}</p>
              <p className="mt-1 text-3xl font-extrabold">
                ${p.price}
                <span className="text-sm font-medium text-stone-500">/mo</span>
              </p>
              <ul className="mt-4 space-y-1.5 text-sm text-stone-600">
                {p.features.map((f) => (
                  <li key={f}>✓ {f}</li>
                ))}
              </ul>
              <form action={viaStripe ? "/api/billing/checkout" : demoChangePlan} method={viaStripe ? "POST" : undefined} className="mt-6">
                <input type="hidden" name="plan" value={id} />
                <button
                  disabled={current}
                  className="w-full rounded-lg bg-stone-900 py-2 text-sm font-semibold text-white hover:bg-stone-700 disabled:bg-stone-200 disabled:text-stone-500"
                >
                  {current ? "Current plan" : p.price > PLANS[session.plan].price ? `Upgrade to ${p.name}` : `Switch to ${p.name}`}
                </button>
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
}
