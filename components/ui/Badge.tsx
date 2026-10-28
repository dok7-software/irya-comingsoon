import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeProps = { children: ReactNode; className?: string };

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.25 rounded-badge border border-neutral-200 bg-primary-100",
        "px-2.25 pt-1.75 pb-1.25 text-eyebrow font-medium text-primary-700",
        className,
      )}
    >
      <span aria-hidden className="relative grid size-3.75 place-items-center">
        <span className="absolute size-2 animate-pulse-dot rounded-full bg-primary-700" />
        <span className="relative size-[7.714px] rounded-full bg-primary-700" />
      </span>
      {children}
    </span>
  );
}
