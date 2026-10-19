# LaunchKit — SaaS starter

A SaaS starter with the pieces every product needs: authentication, Stripe subscriptions, an analytics dashboard, and a role-based admin panel.

**Stack:** Next.js 15 (App Router, Server Actions) · TypeScript · Tailwind CSS · Stripe · Recharts · jose (JWT)

## Features

- **Auth:** signed, HTTP-only JWT session cookies; routes protected in middleware and again on the server
- **Billing:** Stripe Checkout subscriptions. After checkout the session is verified with Stripe on the server before the plan changes
- **Dashboard:** MRR, signups, active customers, churn, and growth charts
- **Admin panel:** visible only to admins, guarded by middleware and the page itself
- **Settings:** profile updates through Server Actions with validation
- **Demo mode:** without Stripe keys, plan changes apply instantly so the whole app can be explored

## Run locally

```bash
npm install
cp .env.example .env.local   # set AUTH_SECRET; STRIPE_SECRET_KEY is optional (use a test key)
npm run dev
```

Click **Continue with demo account** to sign in as an admin.

## Going to production

- Replace demo sign-in with Supabase Auth, Clerk, or Auth.js (magic link / OAuth)
- Store users and subscriptions in Postgres (Supabase or Neon) with Prisma or Drizzle
- Add a Stripe webhook (`checkout.session.completed`, `customer.subscription.updated/deleted`) as the source of truth for plan status
