"use client";

import Link from "next/link";
import { useEffect, useId } from "react";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { navbar } from "@/lib/content";
import { cn } from "@/lib/cn";

type MobileMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
};

/** Barra Phone de 60px; al abrirse pasa a fondo claro y despliega el menú (0.4s). */
export function MobileMenu({ open, onOpenChange, className }: MobileMenuProps) {
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && onOpenChange(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  const close = () => onOpenChange(false);

  return (
    <nav
      aria-label="Principal"
      className={cn("w-full transition-[background-color,box-shadow,color] duration-400 ease-menu", className)}
    >
      <div className="flex h-15 items-center justify-between px-5 py-4">
        <Link href="/" aria-label="IRYA, inicio" onClick={close}>
          <Logo className="w-16" />
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => onOpenChange(!open)}
          className={cn(
            "flex size-9 items-center justify-center rounded-[6px]",
            open ? "text-neutral-950" : "text-neutral-50",
          )}
        >
          {open ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
        </button>
      </div>

      {/* grid-rows 0fr → 1fr anima la altura del desplegable */}
      <div
        id={panelId}
        inert={!open}
        className={cn(
          "grid transition-[grid-template-rows] duration-400 ease-menu",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-4.5 px-5 pt-2 pb-6">
            <ul className="flex flex-col gap-3.5">
              {navbar.menu.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className="font-heading text-base font-medium tracking-[-0.03em] text-neutral-800 transition-colors hover:text-primary-700"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ButtonLink href={navbar.cta.href} onClick={close} size="sm" className="self-start">
              {navbar.cta.label}
            </ButtonLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
