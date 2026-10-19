import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { USERS } from "@/lib/data";

const STATUS: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-800",
  past_due: "bg-amber-100 text-amber-800",
  canceled: "bg-stone-200 text-stone-600",
};

export default async function Admin() {
  const session = await getSession();
  // Middleware also guards this route; checking here keeps the page safe on its own.
  if (session?.role !== "admin") redirect("/dashboard");

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-extrabold">Admin</h1>
        <p className="text-sm text-stone-500">All customers and their subscription status. (Sample data)</p>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 text-left text-stone-500">
            <tr>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Plan</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody>
            {USERS.map((u) => (
              <tr key={u.email} className="border-t border-stone-100">
                <td className="px-4 py-3">
                  <p className="font-semibold">{u.name}</p>
                  <p className="text-xs text-stone-500">{u.email}</p>
                </td>
                <td className="px-4 py-3 capitalize">{u.plan}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${STATUS[u.status]}`}>{u.status.replace("_", " ")}</span>
                </td>
                <td className="px-4 py-3 text-stone-500">{u.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
