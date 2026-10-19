"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const active = usePathname() === href;
  return (
    <Link
      href={href}
      className={`rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap ${
        active ? "bg-stone-900 text-white" : "text-stone-600 hover:bg-stone-100"
      }`}
    >
      {children}
    </Link>
  );
}
