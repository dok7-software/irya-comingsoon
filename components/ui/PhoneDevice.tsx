"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { DeviceTilt, Screen } from "@/lib/content";
import { cn } from "@/lib/cn";

/**
 * Teléfono 3D en HTML/CSS (réplica del componente de Framer):
 * cuerpo 280 × 580, pantalla con inset de 10px, 33px de grosor construido con planos,
 * marco "Space Black", reflejo al 65 % y sombra "Realistic Multi".
 * La inclinación base solo se aplica en Desktop; en Tablet/Phone el teléfono va recto.
 */

const DEPTH_PX = 33;
const DEPTH_LAYERS = 11;
/** Intensidad de la inclinación con el ratón (grados). */
const MOUSE_TILT = 3;
/** Desplazamiento vertical inicial de la animación de entrada. */
const ENTER_OFFSET_PX = 277;

const DESKTOP_HOVER_QUERY = "(min-width: 75rem) and (hover: hover) and (pointer: fine)";

type PhoneDeviceProps = {
  screen: Screen;
  tilt: DeviceTilt;
  className?: string;
};

export function PhoneDevice({ screen, tilt, className }: PhoneDeviceProps) {
  const slotRef = useRef<HTMLDivElement>(null);
  const deviceRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);

  // Entrada: sube 277px hasta su posición al entrar en pantalla (una sola vez).
  useEffect(() => {
    const slot = slotRef.current;
    if (!slot) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setEntered(true);
        observer.disconnect();
      }
    });
    observer.observe(slot);
    return () => observer.disconnect();
  }, []);

  // Inclinación sutil siguiendo el puntero (solo Desktop con ratón).
  useEffect(() => {
    const device = deviceRef.current;
    const media = window.matchMedia(DESKTOP_HOVER_QUERY);
    if (!device) return;

    let frame = 0;
    const onPointerMove = (event: PointerEvent) => {
      if (!media.matches) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = device.getBoundingClientRect();
        const dx = (event.clientX - (rect.left + rect.width / 2)) / window.innerWidth;
        const dy = (event.clientY - (rect.top + rect.height / 2)) / window.innerHeight;
        device.style.setProperty("--mouse-x", `${(dx * MOUSE_TILT * 2).toFixed(2)}deg`);
        device.style.setProperty("--mouse-y", `${(-dy * MOUSE_TILT * 2).toFixed(2)}deg`);
        device.style.setProperty("--shine-x", `${(-dx * 40).toFixed(1)}px`);
      });
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  const tiltVars = {
    "--tilt-x": `${tilt.x}deg`,
    "--tilt-y": `${tilt.y}deg`,
    "--tilt-z": `${tilt.z}deg`,
    "--enter-y": entered ? "0px" : `${ENTER_OFFSET_PX}px`,
  } as CSSProperties;

  return (
    <div
      ref={slotRef}
      style={tiltVars}
      className={cn(
        "h-145 w-70 shrink-0 perspective-[800px]",
        "translate-y-(--enter-y) transition-transform duration-700 ease-[cubic-bezier(0.2,0.9,0.3,1)]",
        className,
      )}
    >
      <div
        ref={deviceRef}
        className={cn(
          "relative size-full transform-3d transition-transform duration-300 ease-out",
          "desktop:transform-[rotateX(calc(var(--tilt-x)+var(--mouse-y,0deg)))_rotateY(calc(var(--tilt-y)+var(--mouse-x,0deg)))_rotateZ(var(--tilt-z))]",
        )}
      >
        {/* Grosor: planos apilados hacia atrás, como el componente original. */}
        {Array.from({ length: DEPTH_LAYERS }, (_, index) => {
          const depth = ((index + 1) * DEPTH_PX) / DEPTH_LAYERS;
          return (
            <div
              key={index}
              aria-hidden
              className={cn(
                "absolute inset-0 rounded-[42px] bg-[#16161a]",
                index === DEPTH_LAYERS - 1 && "shadow-phone",
              )}
              style={{ transform: `translateZ(-${depth}px)` }}
            />
          );
        })}

        {/* Cuerpo frontal "Space Black" */}
        <div className="absolute inset-0 rounded-[42px] bg-[linear-gradient(145deg,#3a3a40_0%,#1c1c20_45%,#0f0f12_100%)] shadow-[inset_0_0_0_1.5px_rgb(255_255_255/0.12),inset_0_0_0_4px_#0b0b0d]">
          {/* Botones laterales */}
          <span aria-hidden className="absolute top-27 -left-0.75 h-7 w-0.75 rounded-l bg-[#2c2c31]" />
          <span aria-hidden className="absolute top-38 -left-0.75 h-12 w-0.75 rounded-l bg-[#2c2c31]" />
          <span aria-hidden className="absolute top-51 -left-0.75 h-12 w-0.75 rounded-l bg-[#2c2c31]" />
          <span aria-hidden className="absolute top-36 -right-0.75 h-18 w-0.75 rounded-r bg-[#2c2c31]" />

          {/* Pantalla: recorte "cover" anclado arriba y al centro */}
          <div className="absolute inset-2.5 overflow-hidden rounded-[32px] bg-black">
            <Image
              src={screen.src}
              alt={screen.alt}
              fill
              sizes="280px"
              quality={90}
              className="object-cover object-top select-none"
              draggable={false}
            />
            {/* Dynamic Island */}
            <span aria-hidden className="absolute top-2.5 left-1/2 h-6.5 w-21 -translate-x-1/2 rounded-full bg-black" />
            {/* Reflejo dinámico (intensidad 65 %) */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgb(255_255_255/0.28)_0%,rgb(255_255_255/0.06)_32%,transparent_48%,transparent_72%,rgb(255_255_255/0.08)_100%)] opacity-65 mix-blend-screen transition-transform duration-300 ease-out desktop:translate-x-(--shine-x)"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
