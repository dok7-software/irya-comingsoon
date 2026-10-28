"use client";

import { useEffect, useState } from "react";

export type NavTheme = "frosted" | "light" | "dark";

/** Altura a la que se comprueba qué sección queda bajo la barra. */
const PROBE_Y = 37;
/** Margen de scroll antes de ocultar la barra al bajar. */
const HIDE_AFTER_PX = 120;

/**
 * Estado de la navegación según el scroll:
 * - `theme`: variante según la sección (`data-nav-theme`) que queda bajo la barra.
 * - `hidden`: la barra sube 75px al desplazarse hacia abajo y vuelve al subir.
 */
export function useNavState() {
  const [theme, setTheme] = useState<NavTheme>("frosted");
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const sections = document.querySelectorAll<HTMLElement>("[data-nav-theme]");
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= PROBE_Y && rect.bottom > PROBE_Y) {
          setTheme(section.dataset.navTheme as NavTheme);
          break;
        }
      }
      if (Math.abs(y - lastY) > 4) {
        setHidden(y > lastY && y > HIDE_AFTER_PX);
        lastY = y;
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
    };
  }, []);

  return { theme, hidden };
}
