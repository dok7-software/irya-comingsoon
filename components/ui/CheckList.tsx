import { cn } from "@/lib/cn";
import { CheckCircleIcon } from "./icons";

type CheckListProps = { items: string[]; className?: string };

export function CheckList({ items, className }: CheckListProps) {
  return (
    <ul className={cn("flex flex-col gap-2.5", className)}>
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2.5 text-body-mono">
          <CheckCircleIcon className="size-5.5 shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  );
}
