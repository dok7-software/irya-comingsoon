import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

/**
 * Fondo "cortina de luz" de los mockups: base violeta noche, halos lavanda
 * alargados en vertical y pliegues finos que dan la textura de cortina.
 */

type Glow = {
  /** Posición y tamaño en % del contenedor. */
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  delay?: number;
};

const presets: Record<"hero" | "cta", Glow[]> = {
  hero: [
    { x: -4, y: -30, w: 36, h: 100, color: "var(--color-lavender)" },
    { x: 10, y: -20, w: 18, h: 75, color: "#aa9df0", delay: -6 },
    { x: 28, y: 70, w: 46, h: 60, color: "#7f73c6", delay: -3 },
    { x: 44, y: 80, w: 14, h: 40, color: "#9286d6", delay: -10 },
    { x: 74, y: -20, w: 30, h: 90, color: "#4f4088", delay: -9 },
    { x: 84, y: 30, w: 22, h: 90, color: "#4c3e80", delay: -12 },
  ],
  cta: [
    { x: -10, y: -30, w: 44, h: 95, color: "#4c3f80" },
    { x: 14, y: -20, w: 14, h: 80, color: "#4a3d7d", delay: -5 },
    { x: 72, y: -20, w: 36, h: 100, color: "#4b3e7f", delay: -8 },
  ],
};

/** Pliegues verticales de la cortina (ancho en %, opacidad de la luz). */
const folds =
  "repeating-linear-gradient(90deg, rgb(255 255 255 / 0) 0%, rgb(255 255 255 / 0.14) 1.8%, rgb(255 255 255 / 0) 3.6%, rgb(10 6 30 / 0.22) 5%, rgb(255 255 255 / 0) 6.4%)";

type AuroraBackgroundProps = {
  variant?: keyof typeof presets;
  className?: string;
};

export function AuroraBackground({ variant = "hero", className }: AuroraBackgroundProps) {
  return (
    <div aria-hidden className={cn("absolute inset-0 overflow-hidden bg-night", className)}>
      {presets[variant].map((glow, index) => (
        <div
          key={index}
          className="absolute animate-aurora rounded-[50%] blur-3xl"
          style={
            {
              left: `${glow.x}%`,
              top: `${glow.y}%`,
              width: `${glow.w}%`,
              height: `${glow.h}%`,
              background: `radial-gradient(ellipse at center, ${glow.color} 0%, ${glow.color} 25%, transparent 70%)`,
              animationDelay: `${glow.delay ?? 0}s`,
            } satisfies CSSProperties
          }
        />
      ))}
      <div className="absolute inset-0 mix-blend-soft-light blur-[2px]" style={{ backgroundImage: folds }} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(29_23_54/0.15)_0%,transparent_30%,transparent_70%,rgb(29_23_54/0.35)_100%)]" />
    </div>
  );
}
