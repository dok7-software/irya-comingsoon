import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ArrowUpRightIcon } from "./icons";

const light = "bg-neutral-50 text-neutral-950 hover:bg-primary-50";
const lime = "bg-lime text-deep-violet hover:bg-neutral-50";

const variants = {
  light,
  lime,
  /** Claro en Phone, lima desde Tablet (CTA de las cards de funciones). */
  "lime-tablet": cn(light, "tablet:bg-lime tablet:text-deep-violet tablet:hover:bg-neutral-50"),
  /** Claro (Primary/50) hasta Desktop, lima en Desktop (CTA final). */
  "lime-desktop": cn(
    "bg-primary-50 text-neutral-950 hover:bg-neutral-50",
    "desktop:bg-lime desktop:text-deep-violet",
  ),
} as const;

const sizes = {
  /** Botón grande compartido: caja base 188 × 44. */
  lg: "h-11 w-47 px-6.25 text-button font-medium",
  /** Botón pequeño de la navegación. */
  sm: "h-8.5 px-3.5 text-button-sm font-medium",
} as const;

type ButtonStyleProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

export function buttonClasses({ variant = "lime", size = "lg" }: ButtonStyleProps = {}) {
  return cn(
    "group inline-flex shrink-0 items-center justify-center overflow-clip whitespace-nowrap",
    "rounded-button border-2 border-transparent",
    "transition-[background-color,border-color,box-shadow,color] duration-400 ease-framer",
    "hover:border-neutral-950 hover:shadow-button",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime",
    variants[variant],
    sizes[size],
  );
}

/** Icono que entra desde fuera del botón solo en hover. */
function HoverIcon() {
  return (
    <span
      aria-hidden
      className="flex w-0 -translate-x-3 justify-end opacity-0 transition-all duration-400 ease-spring group-hover:ml-1.75 group-hover:w-4 group-hover:translate-x-0 group-hover:opacity-100"
    >
      <ArrowUpRightIcon className="size-4 shrink-0" />
    </span>
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> &
  ButtonStyleProps & { children: ReactNode; withIcon?: boolean };

export function ButtonLink({
  variant,
  size,
  withIcon = size !== "sm",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={cn(buttonClasses({ variant, size }), className)} {...props}>
      {children}
      {withIcon && <HoverIcon />}
    </Link>
  );
}
