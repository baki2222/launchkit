import Stripe from "stripe";
import { NextResponse } from "next/server";
import { getSession, setSession, type Plan } from "@/lib/session";

/**
 * Stripe redirects here after checkout. We verify the session with Stripe
 * before upgrading the plan. In production a webhook
 * (checkout.session.completed / customer.subscription.*) is the source of truth.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("session_id");
  const session = await getSession();
  const key = process.env.STRIPE_SECRET_KEY;
  if (!session || !id || !key) return NextResponse.redirect(new URL("/dashboard/billing", req.url));

  const stripe = new Stripe(key);
  const checkout = await stripe.checkout.sessions.retrieve(id);
  const plan = checkout.metadata?.plan as Plan | undefined;

  if (checkout.status === "complete" && checkout.customer_details?.email?.toLowerCase() === session.email && plan) {
    await setSession({ ...session, plan });
    return NextResponse.redirect(new URL("/dashboard/billing?updated=1", req.url));
  }
  return NextResponse.redirect(new URL("/dashboard/billing?canceled=1", req.url));
}
