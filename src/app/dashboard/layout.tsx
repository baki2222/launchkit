import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { PLANS } from "@/lib/plans";
import { signOut } from "../actions";
import { NavLink } from "./NavLink";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen md:grid md:grid-cols-[240px_1fr]">
      <aside className="border-b md:border-b-0 md:border-r border-stone-200 bg-white p-4 flex md:flex-col gap-4">
        <Link href="/" className="text-lg font-extrabold px-2">
          <span className="text-orange-600">▲</span> LaunchKit
        </Link>
        <nav className="flex md:flex-col gap-1 flex-1 overflow-x-auto">
          <NavLink href="/dashboard">Overview</NavLink>
          <NavLink href="/dashboard/billing">Billing</NavLink>
          <NavLink href="/dashboard/settings">Settings</NavLink>
          {session.role === "admin" && <NavLink href="/dashboard/admin">Admin</NavLink>}
        </nav>
        <div className="hidden md:block rounded-xl bg-stone-100 p-3">
          <p className="text-sm font-semibold truncate">{session.name}</p>
          <p className="text-xs text-stone-500 truncate">{session.email}</p>
          <p className="mt-2 inline-block rounded-full bg-orange-100 px-2 py-0.5 text-[11px] font-semibold text-orange-700">
            {PLANS[session.plan].name} plan
          </p>
          <form action={signOut}>
            <button className="mt-3 text-xs text-stone-500 hover:text-red-600">Sign out</button>
          </form>
        </div>
      </aside>
      <main className="p-4 md:p-8">{children}</main>
    </div>
  );
}
