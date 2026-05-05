import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  BarChart3,
  Quote,
  Check,
} from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { SourceIcon } from "@/components/ui/source-icon";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      {/* Nav */}
      <nav className="sticky top-0 z-40 border-b border-zinc-200/60 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Logo />
          <div className="hidden items-center gap-8 text-sm text-zinc-600 md:flex">
            <a href="#features" className="hover:text-zinc-900 transition-colors">Features</a>
            <a href="#integrations" className="hover:text-zinc-900 transition-colors">Integrations</a>
            <a href="#pricing" className="hover:text-zinc-900 transition-colors">Pricing</a>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-zinc-800 hover:gap-2"
          >
            Open app <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-60" />
        <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-white via-white/80 to-transparent" />
        <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-20 md:pt-32">
          <div className="mx-auto max-w-3xl text-center animate-slide-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600 shadow-soft">
              <Sparkles className="h-3 w-3" />
              <span>RAG-powered enterprise search</span>
            </div>
            <h1 className="text-balance text-5xl font-semibold tracking-tight md:text-7xl">
              Your company&apos;s knowledge,{" "}
              <span className="gradient-text">searchable in seconds</span>.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-zinc-600 md:text-xl">
              Connect Notion, Drive, Slack, and Jira. Ask anything. Get answers
              with citations — never hallucinated, always sourced.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="group inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white shadow-elevated transition-all hover:scale-[1.02]"
              >
                Try the live demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
              >
                Learn more
              </a>
            </div>

            {/* Source pills */}
            <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
              <span className="text-xs uppercase tracking-wider text-zinc-400">
                Connects to
              </span>
              {(["notion", "drive", "slack", "jira", "confluence"] as const).map((s) => (
                <div
                  key={s}
                  className="flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700"
                >
                  <SourceIcon source={s} className="h-3.5 w-3.5" />
                  <span className="capitalize">{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual — fake search bar */}
          <div className="relative mx-auto mt-20 max-w-3xl animate-fade-in">
            <div className="rounded-2xl border border-zinc-200 bg-white p-2 shadow-elevated">
              <div className="rounded-xl bg-zinc-50 p-6">
                <div className="flex items-center gap-3 border-b border-zinc-200 pb-4">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse-soft" />
                  <span className="font-mono text-xs text-zinc-500">
                    omnisearch ~ asking the company
                  </span>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-6 w-6 shrink-0 rounded-full bg-zinc-200" />
                    <p className="text-sm text-zinc-700">
                      What&apos;s our remote work policy?
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Logo withText={false} size="sm" />
                    <div className="space-y-2 text-sm text-zinc-600">
                      <p>
                        Full-time employees can work remotely up to 4 days per
                        week. Engineers and designers may opt into fully remote
                        with manager approval. Core hours: 10am–3pm local.
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <span className="inline-flex items-center gap-1 rounded-md border border-zinc-200 bg-white px-2 py-0.5 text-[10px] font-medium text-zinc-600">
                          <SourceIcon source="drive" className="h-3 w-3" />
                          Employee Handbook
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-md border border-zinc-200 bg-white px-2 py-0.5 text-[10px] font-medium text-zinc-600">
                          <SourceIcon source="notion" className="h-3 w-3" />
                          People Wiki
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -inset-x-12 -bottom-8 h-16 bg-gradient-to-t from-white to-transparent" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-zinc-100 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-4xl font-semibold tracking-tight">
              Built for the way teams actually work
            </h2>
            <p className="mt-4 text-zinc-600">
              Stop digging through ten tools. Stop pinging busy coworkers.
              OmniSearch indexes everything and respects your permissions.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Sparkles,
                title: "Natural language",
                text: "Ask in plain English. No syntax, no filters, no boolean operators.",
              },
              {
                icon: Quote,
                title: "Cited answers",
                text: "Every response links back to source docs. Zero hallucinations.",
              },
              {
                icon: Shield,
                title: "Permissions aware",
                text: "Respects ACLs from each source. Interns can't see HR data.",
              },
              {
                icon: BarChart3,
                title: "Knowledge insights",
                text: "Discover what teammates search for — and where docs are missing.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-zinc-200 bg-white p-6 transition-all hover:shadow-soft hover:-translate-y-0.5"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-white">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="font-medium text-zinc-900">{f.title}</h3>
                <p className="mt-2 text-sm text-zinc-600">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations strip */}
      <section id="integrations" className="border-t border-zinc-100 bg-zinc-50/50 py-24">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-3xl font-semibold tracking-tight">
            One platform. Every source of truth.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-600">
            Real-time sync via webhooks. Vector embeddings refresh as your
            documents change.
          </p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { source: "notion" as const, label: "Notion", desc: "Wikis & docs" },
              { source: "drive" as const, label: "Google Drive", desc: "Files & sheets" },
              { source: "slack" as const, label: "Slack", desc: "Conversations" },
              { source: "jira" as const, label: "Jira", desc: "Issues & sprints" },
              { source: "confluence" as const, label: "Confluence", desc: "Runbooks & RFCs" },
            ].map((i) => (
              <div
                key={i.label}
                className="rounded-2xl border border-zinc-200 bg-white p-5 text-left"
              >
                <SourceIcon source={i.source} className="h-8 w-8 text-base" />
                <p className="mt-3 font-medium text-zinc-900">{i.label}</p>
                <p className="text-xs text-zinc-500">{i.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-zinc-100 py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-4xl font-semibold tracking-tight">
              Simple pricing, scales with your team
            </h2>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Starter",
                price: "$0",
                period: "/month",
                features: ["Up to 10 users", "1 connector", "100 queries/day", "Community support"],
                highlight: false,
              },
              {
                name: "Team",
                price: "$12",
                period: "/user/mo",
                features: ["Unlimited connectors", "Unlimited queries", "Permissions sync", "Priority support"],
                highlight: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "",
                features: ["SSO + SAML", "On-prem deployment", "SLA & dedicated CSM", "Custom integrations"],
                highlight: false,
              },
            ].map((p) => (
              <div
                key={p.name}
                className={`rounded-2xl border p-8 ${
                  p.highlight
                    ? "border-zinc-900 bg-zinc-900 text-white shadow-elevated"
                    : "border-zinc-200 bg-white"
                }`}
              >
                <h3 className="text-sm font-medium uppercase tracking-wider opacity-70">
                  {p.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-semibold">{p.price}</span>
                  <span className={p.highlight ? "text-zinc-400" : "text-zinc-500"}>{p.period}</span>
                </div>
                <ul className="mt-6 space-y-3 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <Check className={`h-4 w-4 ${p.highlight ? "text-emerald-400" : "text-emerald-600"}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/dashboard"
                  className={`mt-8 block rounded-full px-4 py-2.5 text-center text-sm font-medium transition-colors ${
                    p.highlight
                      ? "bg-white text-zinc-900 hover:bg-zinc-100"
                      : "border border-zinc-200 hover:bg-zinc-50"
                  }`}
                >
                  Try it free
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-zinc-100 bg-zinc-900 text-white">
        <div className="absolute inset-0 grid-pattern opacity-[0.03]" />
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center">
          <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            Stop wasting time hunting for answers.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            Start your free trial today. No credit card. Connect your first
            workspace in under 60 seconds.
          </p>
          <div className="mt-10">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-zinc-900 transition-transform hover:scale-[1.02]"
            >
              Try the live demo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-100 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-zinc-500 md:flex-row">
          <Logo />
          <p>© {new Date().getFullYear()} OmniSearch. Built with Next.js.</p>
        </div>
      </footer>
    </div>
  );
}
