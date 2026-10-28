"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { navbar } from "@/lib/content";
import { cn } from "@/lib/cn";
import { MobileMenu } from "./MobileMenu";
import { useNavState, type NavTheme } from "./useNavState";

/** Fondo de la barra y color del logo por variante (sin blur: el diseño no lo tiene). */
const barThemes: Record<NavTheme, string> = {
  frosted: "bg-frosted text-lime",
  light: "bg-neutral-50 text-deep-violet shadow-nav",
  dark: "bg-primary-700 text-lime shadow-nav",
};

export function Navbar() {
  const { theme, hidden } = useNavState();
  const [menuOpen, setMenuOpen] = useState(false);
  const activeTheme: NavTheme = menuOpen ? "light" : theme;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-7 flex justify-center tablet:py-2.5",
        "transition-transform duration-400 ease-spring",
        hidden && !menuOpen && "-translate-y-18.75",
      )}
    >
      {/* Desktop/Tablet: barra compacta de 510 × 54 (90% del ancho en Tablet) */}
      <nav
        aria-label="Principal"
        className={cn(
          "flex items-center rounded-[6px] px-5 py-2.5 transition-[background-color,box-shadow,color] duration-400 ease-framer max-tablet:hidden",
          "tablet:w-[90%] desktop:w-auto",
          barThemes[theme],
        )}
      >
        <div className="flex flex-1 items-center desktop:w-58.75 desktop:flex-none">
          <Link href="/" aria-label="IRYA, inicio" className="flex h-8.5 w-22.75 items-center">
            <Logo className="w-full" />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end desktop:w-58.75 desktop:flex-none">
          <ButtonLink href={navbar.cta.href} size="sm">
            {navbar.cta.label}
          </ButtonLink>
        </div>
      </nav>

      {/* Phone: barra completa de 60px con menú desplegable */}
      <MobileMenu
        open={menuOpen}
        onOpenChange={setMenuOpen}
        className={cn("tablet:hidden", barThemes[activeTheme])}
      />
    </header>
  );
}
