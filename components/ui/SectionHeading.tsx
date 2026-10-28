import { Badge } from "./Badge";

type SectionHeadingProps = {
  badge: string;
  title: string;
  description: string;
};

export function SectionHeading({ badge, title, description }: SectionHeadingProps) {
  return (
    <div className="flex w-full flex-col items-center gap-5 text-center">
      <div className="flex flex-col items-center gap-2">
        <Badge>{badge}</Badge>
        <h2 className="font-heading text-h2 font-semibold desktop:text-h2-lg">{title}</h2>
      </div>
      <p className="text-body font-medium text-neutral-700">{description}</p>
    </div>
  );
}
