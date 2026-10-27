import { cn } from "@/lib/cn";

/**
 * Wordmark "irya" redibujado como SVG a partir de los mockups.
 * PLACEHOLDER: reemplazar los trazos por el SVG oficial de la marca cuando esté disponible.
 * Usa `currentColor`, así que el color se controla con clases `text-*`.
 */
const STROKE = 22;

function IGlyph() {
  return (
    <>
      <circle cx="110" cy="82" r="14" fill="currentColor" />
      <path d="M66 150 105 124v58q0 23 23 23h24" />
    </>
  );
}

type LogoProps = { className?: string; title?: string };

export function Logo({ className, title = "irya" }: LogoProps) {
  return (
    <svg
      viewBox="55 64 510 192"
      role="img"
      aria-label={title}
      className={cn("h-8 w-auto", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={STROKE}
    >
      <IGlyph />
      <path d="M200 205V95m0 45q0-40 40-40h38" />
      <path d="M330 95v65q0 35 37 35t38-35m0-65v120q0 30-35 30h-40" />
      <circle cx="500" cy="152" r="45" />
      <path d="M550 97v108" />
    </svg>
  );
}

/** Isotipo: la "i" de la marca dentro de un cuadrado redondeado (app icon). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-25 items-center justify-center rounded-lg bg-surface text-ink shadow-card",
        className,
      )}
    >
      <svg
        viewBox="50 56 116 164"
        aria-hidden
        className="h-[45%] w-auto"
        fill="none"
        stroke="currentColor"
        strokeWidth={STROKE}
      >
        <IGlyph />
      </svg>
    </span>
  );
}
