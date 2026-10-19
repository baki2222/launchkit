import { getSession } from "@/lib/session";
import { kpis, revenueSeries } from "@/lib/data";
import { Charts } from "./Charts";

export default async function Overview() {
  const session = await getSession();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold">Welcome back, {session?.name.split(" ")[0]}</h1>
        <p className="text-sm text-stone-500">Here&apos;s how your product is doing this month. (Sample data)</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis().map((k) => (
          <div key={k.label} className="rounded-2xl border border-stone-200 bg-white p-5">
            <p className="text-sm text-stone-500">{k.label}</p>
            <p className="mt-1 text-2xl font-extrabold">{k.value}</p>
            <p className={`mt-1 text-xs font-semibold ${(k.label === "Churn rate" ? -k.change : k.change) >= 0 ? "text-emerald-600" : "text-red-600"}`}>
              {k.change >= 0 ? "▲" : "▼"} {Math.abs(k.change).toFixed(1)}% vs last month
            </p>
          </div>
        ))}
      </div>

      <Charts data={revenueSeries()} />
    </div>
  );
}
