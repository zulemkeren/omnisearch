"use client";

import { ArrowUp, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  autoFocus?: boolean;
}

export function ChatInput({ value, onChange, onSubmit, disabled, autoFocus }: ChatInputProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  // auto-resize
  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.height = "auto";
    ref.current.style.height = Math.min(ref.current.scrollHeight, 200) + "px";
  }, [value]);

  useEffect(() => {
    if (autoFocus) ref.current?.focus();
  }, [autoFocus]);

  return (
    <div className="relative">
      <div
        className={cn(
          "rounded-2xl border bg-white shadow-soft transition-all",
          disabled
            ? "border-zinc-200"
            : "border-zinc-200 focus-within:border-zinc-400 focus-within:shadow-elevated"
        )}
      >
        <textarea
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (!disabled && value.trim()) onSubmit();
            }
          }}
          placeholder="Ask anything about your company..."
          rows={1}
          className="w-full resize-none rounded-2xl bg-transparent px-5 py-4 pr-14 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none scrollbar-thin"
          disabled={disabled}
        />
        <button
          type="button"
          onClick={onSubmit}
          disabled={disabled || !value.trim()}
          className={cn(
            "absolute bottom-2.5 right-2.5 flex h-9 w-9 items-center justify-center rounded-xl transition-all",
            value.trim() && !disabled
              ? "bg-zinc-900 text-white hover:bg-zinc-800"
              : "bg-zinc-100 text-zinc-400 cursor-not-allowed"
          )}
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>
      <p className="mt-2 px-1 text-[11px] text-zinc-400">
        <Sparkles className="mr-1 inline h-3 w-3" />
        Answers are sourced from your connected workspaces.
      </p>
    </div>
  );
}
