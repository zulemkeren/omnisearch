"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, Plug, BarChart3, Settings, ArrowLeft } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/dashboard", label: "Chat", icon: MessageSquare, exact: true },
  { href: "/dashboard/connections", label: "Connections", icon: Plug },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-zinc-200 bg-zinc-50/50 px-4 py-5">
      <div className="px-2">
        <Logo />
      </div>

      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-1.5 px-2 text-xs text-zinc-500 transition-colors hover:text-zinc-900"
      >
        <ArrowLeft className="h-3 w-3" />
        Back to home
      </Link>

      <nav className="mt-8 flex-1 space-y-1">
        <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
          Workspace
        </p>
        {NAV.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors",
                active
                  ? "bg-white text-zinc-900 shadow-soft"
                  : "text-zinc-600 hover:bg-white hover:text-zinc-900"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Workspace switcher */}
      <div className="mt-auto space-y-2">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-zinc-600 transition-colors hover:bg-white hover:text-zinc-900"
        >
          <Settings className="h-4 w-4" />
          Settings
        </button>
        <div className="rounded-xl border border-zinc-200 bg-white p-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 text-xs font-semibold text-white">
              AC
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-xs font-medium text-zinc-900">Acme Corp</p>
              <p className="truncate text-[10px] text-zinc-500">312 active users</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
