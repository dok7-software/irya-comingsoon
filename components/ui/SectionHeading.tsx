import { cn } from "@/lib/cn";
import { Badge } from "./Badge";

type SectionHeadingProps = {
  badge: string;
  title: string;
  description: string;
  /** Sin el salto a H2 grande en Desktop (bloques en columna, p. ej. FAQs). */
  compact?: boolean;
};

export function SectionHeading({ badge, title, description, compact = false }: SectionHeadingProps) {
  return (
    <div className="flex w-full flex-col items-center gap-5 text-center">
      <div className="flex flex-col items-center gap-2">
        <Badge>{badge}</Badge>
        <h2 className={cn("font-heading text-h2 font-semibold", !compact && "desktop:text-h2-lg")}>{title}</h2>
      </div>
      <p className="text-body font-medium text-neutral-700">{description}</p>
    </div>
  );
}
