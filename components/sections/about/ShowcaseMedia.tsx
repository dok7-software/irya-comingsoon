import Image from "next/image";
import type { CSSProperties } from "react";
import type { AboutFeature, LayerRect } from "@/lib/content";
import { cn } from "@/lib/cn";

/** Ancho de referencia del panel en Framer por breakpoint (las capas se centran respecto a él). */
const panelWidths = { phone: 350, tablet: 715, desktop: 425 } as const;
type Breakpoint = keyof typeof panelWidths;

/** Variables CSS de posición de una capa; `left` se ancla al centro para que el panel pueda estirarse. */
function layerVars(rect: Record<Breakpoint, LayerRect>) {
  const vars: Record<string, string> = {};
  for (const bp of Object.keys(panelWidths) as Breakpoint[]) {
    const [x, y, w, h] = rect[bp];
    const key = bp[0];
    vars[`--l-${key}`] = `calc(50% + ${x - panelWidths[bp] / 2}px)`;
    vars[`--t-${key}`] = `${y}px`;
    vars[`--w-${key}`] = `${w}px`;
    vars[`--h-${key}`] = `${h}px`;
  }
  return vars as CSSProperties;
}

const layerPosition = cn(
  "absolute top-(--t-p) left-(--l-p) h-(--h-p) w-(--w-p)",
  "tablet:top-(--t-t) tablet:left-(--l-t) tablet:h-(--h-t) tablet:w-(--w-t)",
  "desktop:top-(--t-d) desktop:left-(--l-d) desktop:h-(--h-d) desktop:w-(--w-d)",
);

type ShowcaseMediaProps = Pick<AboutFeature, "background" | "layers"> & { className?: string };

/**
 * Panel con las capas originales de Framer: fondo, pantalla, marco y tarjeta flotante.
 * Phone 350 × 445 · Tablet ancho completo × 380 · Desktop 425 × 402.
 */
export function ShowcaseMedia({ background, layers, className }: ShowcaseMediaProps) {
  return (
    <div
      className={cn(
        "relative h-111.25 w-full shrink-0 overflow-clip rounded-[10px] bg-primary-800 shadow-[6px_6px_8px_0_rgb(0_0_0/0.25)]",
        "tablet:h-95 desktop:h-100.5 desktop:w-106.25",
        className,
      )}
    >
      <Image src={background} alt="" fill sizes="(min-width: 1200px) 425px, 100vw" className="object-cover" />
      {layers.map((layer) => (
        <div
          key={layer.image.src}
          style={layerVars(layer.rect)}
          className={cn(layerPosition, layer.rounded && "overflow-clip rounded-[25px]")}
        >
          <Image
            src={layer.image.src}
            alt={layer.image.alt}
            fill
            sizes="(min-width: 810px) 720px, 431px"
            quality={90}
            className={layer.fit === "contain" ? "object-contain" : "object-cover"}
          />
        </div>
      ))}
    </div>
  );
}
