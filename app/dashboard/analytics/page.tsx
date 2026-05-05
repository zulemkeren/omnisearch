import { TrendingUp, Users, Clock, MessageSquare, AlertTriangle } from "lucide-react";
import { ANALYTICS, SOURCE_META, type Source } from "@/lib/mock-data";
import { SourceIcon } from "@/components/ui/source-icon";
import { formatNumber, cn } from "@/lib/utils";

export default function AnalyticsPage() {
  const maxQueries = Math.max(...ANALYTICS.weeklyTrend.map((d) => d.queries));

  return (
    <div className="flex h-full flex-col">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-zinc-100 px-6">
        <div>
          <h1 className="text-sm font-medium text-zinc-900">Analytics</h1>
          <p className="text-[11px] text-zinc-500">
            What your team is searching for
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse-soft" />
          Live · last 7 days
        </div>
      </header>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="mx-auto max-w-6xl px-6 py-8">
          {/* KPIs */}
          <div className="grid gap-4 md:grid-cols-4">
            <KPI
              icon={MessageSquare}
              label="Total queries"
              value={formatNumber(ANALYTICS.totalQueries)}
              delta={`+${ANALYTICS.weeklyGrowth}%`}
              positive
            />
            <KPI
              icon={Users}
              label="Active users"
              value={ANALYTICS.activeUsers.toString()}
              delta="+12.4%"
              positive
            />
            <KPI
              icon={Clock}
              label="Avg response"
              value={`${ANALYTICS.avgResponseTime}s`}
              delta="-0.3s"
              positive
            />
            <KPI
              icon={TrendingUp}
              label="Citation rate"
              value="94%"
              delta="+2.1%"
              positive
            />
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {/* Weekly trend */}
            <div className="lg:col-span-2 rounded-2xl border border-zinc-200 bg-white p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-medium text-zinc-900">Query volume</h2>
                  <p className="text-[11px] text-zinc-500">Last 7 days</p>
                </div>
              </div>
              <div className="flex h-48 items-end gap-3">
                {ANALYTICS.weeklyTrend.map((d) => {
                  const heightPct = (d.queries / maxQueries) * 100;
                  return (
                    <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                      <div className="relative w-full flex-1 flex items-end">
                        <div
                          className="w-full rounded-t-md bg-gradient-to-t from-zinc-900 to-zinc-700 transition-all hover:from-zinc-800 hover:to-zinc-600"
                          style={{ height: `${heightPct}%` }}
                          title={`${d.queries} queries`}
                        />
                      </div>
                      <span className="text-[10px] uppercase tracking-wider text-zinc-500">{d.day}</span>
                      <span className="text-[10px] tabular-nums text-zinc-400">{formatNumber(d.queries)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Source breakdown */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6">
              <h2 className="text-sm font-medium text-zinc-900">Sources used</h2>
              <p className="text-[11px] text-zinc-500">By citation count</p>
              <div className="mt-6 space-y-4">
                {ANALYTICS.sourceBreakdown.map((s) => (
                  <div key={s.source}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <SourceIcon source={s.source as Source} className="h-4 w-4" />
                        <span className="text-xs font-medium text-zinc-900">
                          {SOURCE_META[s.source as Source].label}
                        </span>
                      </div>
                      <span className="text-xs tabular-nums text-zinc-500">{s.percentage}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100">
                      <div
                        className="h-full rounded-full bg-zinc-900"
                        style={{ width: `${s.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {/* Top queries */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6">
              <h2 className="text-sm font-medium text-zinc-900">Top queries</h2>
              <p className="text-[11px] text-zinc-500">Most asked, last 7 days</p>
              <div className="mt-5 space-y-1">
                {ANALYTICS.topQueries.map((q, i) => (
                  <div
                    key={q.query}
                    className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-zinc-50"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-zinc-100 text-[10px] font-bold text-zinc-600">
                      {i + 1}
                    </span>
                    <p className="flex-1 truncate text-sm text-zinc-700">{q.query}</p>
                    <span className="text-xs tabular-nums text-zinc-500">
                      {q.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Knowledge gaps */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <h2 className="text-sm font-medium text-zinc-900">Knowledge gaps</h2>
              </div>
              <p className="text-[11px] text-zinc-500">
                Topics employees ask about but no docs exist
              </p>
              <div className="mt-5 space-y-3">
                {ANALYTICS.knowledgeGaps.map((g) => (
                  <div
                    key={g.topic}
                    className="flex items-center justify-between rounded-xl border border-amber-100 bg-amber-50/50 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-zinc-900">{g.topic}</p>
                      <p className="text-[11px] text-zinc-500">
                        {g.searches} searches, no confident answer
                      </p>
                    </div>
                    <button
                      type="button"
                      className="rounded-md border border-amber-200 bg-white px-2.5 py-1 text-[11px] font-medium text-amber-700 transition-colors hover:bg-amber-100"
                    >
                      Notify owner
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KPI({
  icon: Icon,
  label,
  value,
  delta,
  positive,
}: {
  icon: typeof TrendingUp;
  label: string;
  value: string;
  delta: string;
  positive?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700">
          <Icon className="h-4 w-4" />
        </span>
        <span
          className={cn(
            "text-[10px] font-semibold tabular-nums",
            positive ? "text-emerald-600" : "text-red-600"
          )}
        >
          {delta}
        </span>
      </div>
      <p className="mt-3 text-[11px] uppercase tracking-wider text-zinc-500">{label}</p>
      <p className="mt-1 text-3xl font-semibold tracking-tight text-zinc-900">{value}</p>
    </div>
  );
}
