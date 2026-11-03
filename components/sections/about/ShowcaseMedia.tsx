import Image from "next/image";
import type { AboutFeature } from "@/lib/content";
import { cn } from "@/lib/cn";

/** Posición del teléfono para que el panel recorte la parte que no se ve. */
const cropPositions: Record<AboutFeature["crop"], string> = {
  top: "top-8",
  bottom: "bottom-16",
};

type ShowcaseMediaProps = Pick<AboutFeature, "screen" | "crop"> & { className?: string };

/**
 * Panel de 333 × 314 con el teléfono recortado.
 * Placeholder hasta tener las imágenes compuestas de Framer (ver `AboutFeature.screen`).
 */
export function ShowcaseMedia({ screen, crop, className }: ShowcaseMediaProps) {
  return (
    <div
      className={cn(
        "relative h-78.5 w-full max-w-83.25 shrink-0 overflow-clip rounded-[6px] shadow-hero",
        "bg-[radial-gradient(108%_150%_at_-4.6%_-23.4%,var(--color-primary-600)_0%,var(--color-primary-800)_100%)]",
        className,
      )}
    >
      <div
        className={cn(
          "absolute left-1/2 w-57.5 -translate-x-1/2 rounded-[38px] bg-neutral-950 p-1.75 shadow-phone",
          cropPositions[crop],
        )}
      >
        <Image
          src={screen.src}
          alt={screen.alt}
          width={screen.width}
          height={screen.height}
          sizes="216px"
          quality={90}
          className="h-auto w-full rounded-[31px]"
        />
        <span aria-hidden className="absolute top-3.5 left-1/2 h-5 w-18 -translate-x-1/2 rounded-full bg-neutral-950" />
      </div>
    </div>
  );
}
