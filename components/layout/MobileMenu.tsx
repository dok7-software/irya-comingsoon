"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { navbar } from "@/lib/content";
import { cn } from "@/lib/cn";

/** Botón hamburguesa + panel desplegable (solo mobile). */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setOpen((value) => !value)}
        className="relative flex size-10 items-center justify-center text-white"
      >
        {[-6, 0, 6].map((offset, index) => (
          <span
            key={offset}
            className={cn(
              "absolute h-0.5 w-5.5 rounded-full bg-current transition duration-300",
              open && index === 1 && "opacity-0",
              open && index === 0 && "rotate-45",
              open && index === 2 && "-rotate-45",
            )}
            style={{ translate: open ? "0 0" : `0 ${offset}px` }}
          />
        ))}
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full mt-2 rounded-lg bg-night/95 p-4 shadow-card backdrop-blur-md"
      >
        <ul className="flex flex-col">
          {navbar.menu.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={close}
                className="block rounded-md px-2 py-3 text-base text-white/90 hover:bg-white/10"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <ButtonLink href={navbar.cta.href} onClick={close} size="md" className="mt-3 w-full">
          {navbar.cta.label}
        </ButtonLink>
      </div>
    </div>
  );
}
