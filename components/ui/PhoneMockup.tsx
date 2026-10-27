import Image from "next/image";
import type { Mockup } from "@/lib/content";
import { cn } from "@/lib/cn";

type PhoneMockupProps = {
  mockup: Mockup;
  /** Valor `sizes` de next/image según el ancho renderizado. */
  sizes: string;
  preload?: boolean;
  className?: string;
};

export function PhoneMockup({ mockup, sizes, preload, className }: PhoneMockupProps) {
  return (
    <Image
      src={mockup.src}
      alt={mockup.alt}
      width={mockup.width}
      height={mockup.height}
      sizes={sizes}
      preload={preload}
      className={cn("h-auto w-full select-none drop-shadow-[0_30px_40px_rgb(12_8_30/0.35)]", className)}
      draggable={false}
    />
  );
}
