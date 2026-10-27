import Image from "next/image";
import { cn } from "@/lib/cn";

type AvatarStackProps = {
  avatars: ReadonlyArray<{ src: string; alt: string }>;
  className?: string;
};

export function AvatarStack({ avatars, className }: AvatarStackProps) {
  return (
    <div className={cn("flex -space-x-3.5", className)}>
      {avatars.map((avatar) => (
        <Image
          key={avatar.src}
          src={avatar.src}
          alt={avatar.alt}
          width={36}
          height={36}
          className="size-9 rounded-full object-cover ring-2 ring-surface"
        />
      ))}
    </div>
  );
}
