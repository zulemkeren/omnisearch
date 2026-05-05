import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  withText?: boolean;
}

export function Logo({ className, size = "md", withText = true }: LogoProps) {
  const sizes = {
    sm: { box: "h-6 w-6", text: "text-base" },
    md: { box: "h-8 w-8", text: "text-lg" },
    lg: { box: "h-10 w-10", text: "text-xl" },
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "relative flex items-center justify-center rounded-lg bg-zinc-900 text-white",
          sizes[size].box
        )}
      >
        {/* concentric search/orbit glyph */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-[60%] w-[60%]"
        >
          <circle cx="11" cy="11" r="6" />
          <circle cx="11" cy="11" r="2.5" />
          <line x1="16" y1="16" x2="20" y2="20" />
        </svg>
      </div>
      {withText && (
        <span className={cn("font-semibold tracking-tight text-zinc-900", sizes[size].text)}>
          OmniSearch
        </span>
      )}
    </div>
  );
}
