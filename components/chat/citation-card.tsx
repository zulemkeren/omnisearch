import { ExternalLink } from "lucide-react";
import type { Document } from "@/lib/mock-data";
import { SOURCE_META } from "@/lib/mock-data";
import { SourceIcon } from "@/components/ui/source-icon";
import { timeAgo } from "@/lib/utils";

interface CitationCardProps {
  doc: Document;
  index: number;
}

export function CitationCard({ doc, index }: CitationCardProps) {
  return (
    <a
      href={doc.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-2 rounded-xl border border-zinc-200 bg-white p-3 transition-all hover:border-zinc-300 hover:shadow-soft"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1.5">
          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-zinc-100 text-[9px] font-bold text-zinc-600">
            {index + 1}
          </span>
          <SourceIcon source={doc.source} className="h-3.5 w-3.5" />
          <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
            {SOURCE_META[doc.source].label}
          </span>
        </div>
        <ExternalLink className="h-3 w-3 text-zinc-400 opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      <p className="line-clamp-2 text-xs font-medium text-zinc-900">{doc.title}</p>
      <p className="line-clamp-2 text-[11px] leading-relaxed text-zinc-500">{doc.excerpt}</p>
      <p className="text-[10px] text-zinc-400">
        {doc.author} • {timeAgo(doc.updatedAt)}
      </p>
    </a>
  );
}
