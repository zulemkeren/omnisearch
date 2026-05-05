import type { Source } from "@/lib/mock-data";

interface SourceIconProps {
  source: Source;
  className?: string;
}

// Minimalist monochrome glyphs — letterform-style, fits the SaaS aesthetic
export function SourceIcon({ source, className = "h-4 w-4" }: SourceIconProps) {
  const map: Record<Source, { letter: string; bg: string; fg: string }> = {
    notion: { letter: "N", bg: "bg-zinc-900", fg: "text-white" },
    drive: { letter: "D", bg: "bg-blue-600", fg: "text-white" },
    slack: { letter: "S", bg: "bg-purple-600", fg: "text-white" },
    jira: { letter: "J", bg: "bg-sky-600", fg: "text-white" },
    confluence: { letter: "C", bg: "bg-indigo-600", fg: "text-white" },
  };
  const m = map[source];
  return (
    <span
      className={`${m.bg} ${m.fg} ${className} inline-flex items-center justify-center rounded-[5px] text-[10px] font-bold leading-none`}
    >
      {m.letter}
    </span>
  );
}
