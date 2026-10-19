// Seeded sample metrics so the dashboard looks realistic without a database.

function seeded(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
}

const MONTHS = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];

export function revenueSeries() {
  const rand = seeded(42);
  let mrr = 4200;
  return MONTHS.map((month) => {
    mrr = Math.round(mrr * (1.06 + rand() * 0.08));
    return { month, mrr, signups: Math.round(mrr / 45 + rand() * 25) };
  });
}

export function kpis() {
  const series = revenueSeries();
  const last = series[series.length - 1];
  const prev = series[series.length - 2];
  return [
    { label: "MRR", value: `$${last.mrr.toLocaleString()}`, change: ((last.mrr - prev.mrr) / prev.mrr) * 100 },
    { label: "New signups", value: last.signups.toLocaleString(), change: ((last.signups - prev.signups) / prev.signups) * 100 },
    { label: "Active customers", value: Math.round(last.mrr / 27).toLocaleString(), change: 6.2 },
    { label: "Churn rate", value: "2.4%", change: -0.6 },
  ];
}

export const USERS = [
  { name: "Ava Thompson", email: "ava@northwind.example", plan: "team", status: "active", joined: "2026-02-11" },
  { name: "Liam Carter", email: "liam@brightpath.example", plan: "pro", status: "active", joined: "2026-03-02" },
  { name: "Noah Kim", email: "noah@pixelforge.example", plan: "pro", status: "past_due", joined: "2026-04-19" },
  { name: "Mia Rossi", email: "mia@acme.example", plan: "free", status: "active", joined: "2026-06-07" },
  { name: "Ethan Patel", email: "ethan@globex.example", plan: "team", status: "active", joined: "2026-07-23" },
  { name: "Sofia Nguyen", email: "sofia@initech.example", plan: "free", status: "canceled", joined: "2026-08-30" },
];
