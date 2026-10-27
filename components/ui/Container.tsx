import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

const widths = {
  /** Ancho de las cards de funciones (1296px en el frame de 1440). */
  wide: "max-w-[81rem]",
  /** Ancho del bloque del footer. */
  narrow: "max-w-[66.25rem]",
} as const;

type ContainerProps = ComponentProps<"div"> & { width?: keyof typeof widths };

export function Container({ width = "wide", className, ...props }: ContainerProps) {
  return <div className={cn("mx-auto w-full px-4 sm:px-6", widths[width], className)} {...props} />;
}
