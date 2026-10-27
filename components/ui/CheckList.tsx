import { cn } from "@/lib/cn";
import { CheckCircleIcon } from "./icons";

type CheckListProps = { items: string[]; className?: string };

export function CheckList({ items, className }: CheckListProps) {
  return (
    <ul className={cn("space-y-2 lg:space-y-2.5", className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-[0.9375rem] leading-snug lg:items-center lg:gap-3 lg:text-body">
          <CheckCircleIcon className="size-5 shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  );
}
