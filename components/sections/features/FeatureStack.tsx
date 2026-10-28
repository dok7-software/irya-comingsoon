"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Recorrido de tarjetas adherentes (solo Desktop): cada historia queda fija arriba
 * y la siguiente la cubre. Mientras la siguiente avanza hacia el centro de la
 * pantalla, la anterior reduce su escala hasta el valor del diseño.
 */

/** Escala final de cada tarjeta cuando la siguiente la cubre (la última no cambia). */
const STACK_SCALES = [0.2, 0.4];

const DESKTOP_QUERY = "(min-width: 75rem)";

export function FeatureStack({ children }: { children: ReactNode }) {
  const pathRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const media = window.matchMedia(DESKTOP_QUERY);
    const stories = Array.from(path.querySelectorAll<HTMLElement>("[data-story]"));
    let frame = 0;

    const update = () => {
      frame = 0;
      stories.forEach((story, index) => {
        const next = stories[index + 1];
        const target = STACK_SCALES[index];
        if (!media.matches || !next || target === undefined) {
          story.style.removeProperty("--stack-scale");
          return;
        }
        // 0 cuando la siguiente asoma por abajo · 1 cuando su panel llega al centro de la pantalla.
        const top = next.getBoundingClientRect().top;
        const progress = Math.min(Math.max(1 - top / (window.innerHeight / 2), 0), 1);
        story.style.setProperty("--stack-scale", String(1 - (1 - target) * progress));
      });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    media.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      media.removeEventListener("change", schedule);
    };
  }, []);

  return (
    <div
      ref={pathRef}
      className="mt-15.25 flex w-full flex-col items-center gap-15 tablet:mt-15 tablet:gap-12.5 desktop:mt-0 desktop:w-300"
    >
      {children}
    </div>
  );
}
