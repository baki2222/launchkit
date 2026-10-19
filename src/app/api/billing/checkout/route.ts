import Stripe from "stripe";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { PLANS } from "@/lib/plans";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.redirect(new URL("/login", req.url), 303);

  const form = await req.formData();
  const plan = String(form.get("plan"));
  if (plan !== "pro" && plan !== "team") {
    return NextResponse.json({ error: "Unknown plan" }, { status: 400 });
  }

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return NextResponse.json({ error: "Stripe is not configured" }, { status: 501 });

  const stripe = new Stripe(key);
  const origin = new URL(req.url).origin;
  const checkout = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: session.email,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: PLANS[plan].price * 100,
          recurring: { interval: "month" },
          product_data: { name: `LaunchKit ${PLANS[plan].name}` },
        },
      },
    ],
    metadata: { plan },
    success_url: `${origin}/api/billing/confirm?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/dashboard/billing?canceled=1`,
  });

  return NextResponse.redirect(checkout.url!, 303);
}
