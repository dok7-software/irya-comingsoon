import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeProps = {
  children: ReactNode;
  size?: "sm" | "md";
  className?: string;
};

export function Badge({ children, size = "md", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-chip font-medium text-ink",
        size === "md" ? "h-9.5 px-4 text-[0.9375rem]" : "h-8.5 px-4 text-sm",
        className,
      )}
    >
      <span aria-hidden className="size-2 rounded-full bg-ink" />
      {children}
    </span>
  );
}
