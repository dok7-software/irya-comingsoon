import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

const variants = {
  primary: "bg-lime text-ink hover:bg-lime-hover",
  secondary: "bg-white text-ink hover:bg-surface-alt",
  /** Blanco sobre fondos oscuros en mobile, lima desde desktop (según los mockups). */
  "primary-lg": "bg-white text-ink hover:bg-surface-alt lg:bg-lime lg:hover:bg-lime-hover",
} as const;

const sizes = {
  sm: "h-10.5 px-6 text-[0.9375rem] rounded-[10px]",
  md: "h-12 px-6 text-base rounded-lg",
  lg: "h-10.5 px-6 text-[0.9375rem] rounded-lg lg:h-13 lg:px-8 lg:text-[1.0625rem]",
} as const;

type ButtonStyleProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

export function buttonClasses({ variant = "primary", size = "lg" }: ButtonStyleProps = {}) {
  return cn(
    "inline-flex shrink-0 items-center justify-center gap-2 font-medium whitespace-nowrap",
    "transition duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime",
    "disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    sizes[size],
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> & ButtonStyleProps;

export function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
  return <Link className={cn(buttonClasses({ variant, size }), className)} {...props} />;
}

type ButtonProps = ComponentProps<"button"> & ButtonStyleProps;

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return (
    <button type={type} className={cn(buttonClasses({ variant, size }), className)} {...props} />
  );
}
