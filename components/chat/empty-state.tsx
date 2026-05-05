"use client";

import { Sparkles } from "lucide-react";
import { Logo } from "@/components/ui/logo";

interface EmptyStateProps {
  onPick: (q: string) => void;
}

const SUGGESTIONS = [
  {
    title: "What is our remote work policy?",
    hint: "HR · Policy",
  },
  {
    title: "Summarize the Q4 engineering roadmap",
    hint: "Engineering · Planning",
  },
  {
    title: "How do I set up my dev environment?",
    hint: "Onboarding · Engineering",
  },
  {
    title: "Show me the on-call runbook for payments",
    hint: "Runbook · Payments",
  },
];

export function EmptyState({ onPick }: EmptyStateProps) {
  return (
    <div className="mx-auto flex h-full max-w-2xl flex-col items-center justify-center px-6 py-12 text-center">
      <div className="mb-4">
        <Logo withText={false} size="lg" />
      </div>
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
        Ask anything about Acme Corp.
      </h1>
      <p className="mt-2 text-sm text-zinc-500">
        <Sparkles className="mr-1 inline h-3.5 w-3.5" />
        Indexed across Notion, Drive, Slack, Jira, and Confluence.
      </p>

      <div className="mt-10 grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s.title}
            type="button"
            onClick={() => onPick(s.title)}
            className="group rounded-xl border border-zinc-200 bg-white p-4 text-left transition-all hover:border-zinc-300 hover:shadow-soft"
          >
            <p className="text-sm font-medium text-zinc-900 group-hover:text-zinc-950">
              {s.title}
            </p>
            <p className="mt-1 text-[11px] uppercase tracking-wider text-zinc-400">
              {s.hint}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
