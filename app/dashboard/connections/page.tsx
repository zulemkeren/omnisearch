import { CheckCircle2, RefreshCw, AlertCircle, Plus } from "lucide-react";
import { CONNECTIONS } from "@/lib/mock-data";
import { SourceIcon } from "@/components/ui/source-icon";
import { formatNumber, timeAgo, cn } from "@/lib/utils";

const STATUS_STYLES: Record<string, { color: string; icon: typeof CheckCircle2; label: string }> = {
  connected: { color: "text-emerald-600", icon: CheckCircle2, label: "Connected" },
  syncing: { color: "text-amber-600", icon: RefreshCw, label: "Syncing" },
  error: { color: "text-red-600", icon: AlertCircle, label: "Error" },
  disconnected: { color: "text-zinc-400", icon: AlertCircle, label: "Disconnected" },
};

export default function ConnectionsPage() {
  const totalDocs = CONNECTIONS.reduce((sum, c) => sum + c.documentCount, 0);

  return (
    <div className="flex h-full flex-col">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-zinc-100 px-6">
        <div>
          <h1 className="text-sm font-medium text-zinc-900">Connections</h1>
          <p className="text-[11px] text-zinc-500">
            Manage data sources synced into your knowledge base
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-zinc-800"
        >
          <Plus className="h-3 w-3" />
          Add connection
        </button>
      </header>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="mx-auto max-w-5xl px-6 py-8">
          {/* Summary */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <SummaryCard label="Active connections" value={CONNECTIONS.filter((c) => c.status === "connected").length.toString()} />
            <SummaryCard label="Documents indexed" value={formatNumber(totalDocs)} />
            <SummaryCard label="Last sync" value="2 min ago" />
          </div>

          {/* Connection rows */}
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
            <div className="grid grid-cols-12 gap-4 border-b border-zinc-100 bg-zinc-50/50 px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              <div className="col-span-4">Source</div>
              <div className="col-span-3">Status</div>
              <div className="col-span-2 text-right">Documents</div>
              <div className="col-span-3 text-right">Last sync</div>
            </div>
            {CONNECTIONS.map((c) => {
              const Status = STATUS_STYLES[c.status];
              return (
                <div
                  key={c.source}
                  className="grid grid-cols-12 items-center gap-4 border-b border-zinc-100 px-5 py-4 last:border-0 transition-colors hover:bg-zinc-50/50"
                >
                  <div className="col-span-4 flex items-center gap-3">
                    <SourceIcon source={c.source} className="h-9 w-9 text-sm" />
                    <div>
                      <p className="text-sm font-medium text-zinc-900">{c.name}</p>
                      <p className="text-[11px] text-zinc-500">{c.description}</p>
                    </div>
                  </div>
                  <div className="col-span-3">
                    <span className={cn("inline-flex items-center gap-1.5 text-xs font-medium", Status.color)}>
                      <Status.icon className={cn("h-3.5 w-3.5", c.status === "syncing" && "animate-spin")} />
                      {Status.label}
                    </span>
                  </div>
                  <div className="col-span-2 text-right text-sm font-medium tabular-nums text-zinc-900">
                    {formatNumber(c.documentCount)}
                  </div>
                  <div className="col-span-3 text-right text-xs text-zinc-500">
                    {timeAgo(c.lastSync)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Coming soon */}
          <div className="mt-8">
            <h2 className="mb-3 text-sm font-medium text-zinc-900">Coming soon</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {["GitHub", "Linear", "Salesforce", "Zendesk"].map((name) => (
                <div
                  key={name}
                  className="rounded-xl border border-dashed border-zinc-200 bg-white/50 p-4"
                >
                  <p className="text-sm font-medium text-zinc-700">{name}</p>
                  <p className="mt-1 text-[11px] text-zinc-400">Available Q1 2026</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5">
      <p className="text-[11px] uppercase tracking-wider text-zinc-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">{value}</p>
    </div>
  );
}
