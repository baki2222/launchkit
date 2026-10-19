import type { Plan } from "./jwt";

export const PLANS: Record<Plan, { name: string; price: number; features: string[] }> = {
  free: { name: "Free", price: 0, features: ["1 project", "1,000 events / month", "Community support"] },
  pro: { name: "Pro", price: 19, features: ["10 projects", "100,000 events / month", "Email support", "API access"] },
  team: {
    name: "Team",
    price: 49,
    features: ["Unlimited projects", "1M events / month", "Priority support", "SSO & audit log", "5 seats included"],
  },
};
