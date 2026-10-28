import Image from "next/image";
import { cn } from "@/lib/cn";

/** Posiciones horizontales del diseño (px); el último avatar queda encima. */
const OFFSETS = ["left-6", "left-3.25", "left-1"] as const;

type AvatarStackProps = {
  avatars: ReadonlyArray<{ src: string; alt: string }>;
  className?: string;
};

export function AvatarStack({ avatars, className }: AvatarStackProps) {
  return (
    <div className={cn("relative h-9 w-15 shrink-0", className)}>
      {avatars.map((avatar, index) => (
        <Image
          key={avatar.src}
          src={avatar.src}
          alt={avatar.alt}
          width={72}
          height={72}
          className={cn(
            "absolute top-0 size-9 rounded-full border-3 border-neutral-50 object-cover",
            OFFSETS[index],
          )}
        />
      ))}
    </div>
  );
}
