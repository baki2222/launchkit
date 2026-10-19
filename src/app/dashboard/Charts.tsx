"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Point = { month: string; mrr: number; signups: number };

export function Charts({ data }: { data: Point[] }) {
  return (
    <div className="grid gap-4 xl:grid-cols-[2fr_1fr]">
      <div className="rounded-2xl border border-stone-200 bg-white p-5">
        <p className="font-bold">Monthly recurring revenue</p>
        <p className="text-xs text-stone-500">Last 12 months</p>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ left: 8, right: 8 }}>
              <defs>
                <linearGradient id="mrr" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ea580c" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#ea580c" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#e7e5e4" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="#78716c" />
              <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="#78716c" tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v) => [`$${Number(v).toLocaleString()}`, "MRR"]} />
              <Area type="monotone" dataKey="mrr" stroke="#ea580c" strokeWidth={2.5} fill="url(#mrr)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="rounded-2xl border border-stone-200 bg-white p-5">
        <p className="font-bold">New signups</p>
        <p className="text-xs text-stone-500">Per month</p>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.slice(-6)}>
              <CartesianGrid stroke="#e7e5e4" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="#78716c" />
              <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="#78716c" width={32} />
              <Tooltip formatter={(v) => [v, "Signups"]} />
              <Bar dataKey="signups" fill="#1c1917" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
