import { Badge } from "./Badge";

type SectionHeadingProps = {
  badge: string;
  title: string;
  description: string;
};

export function SectionHeading({ badge, title, description }: SectionHeadingProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <Badge size="sm">{badge}</Badge>
      <h2 className="mt-3 max-w-[22rem] font-display text-display-sm font-medium text-ink sm:max-w-none sm:text-display">
        {title}
      </h2>
      <p className="mt-3 max-w-[65rem] text-[0.9375rem] leading-snug text-ink-muted sm:mt-4 sm:text-base">
        {description}
      </p>
    </div>
  );
}
