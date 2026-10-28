import { cn } from "@/lib/cn";

/**
 * Wordmark y símbolo oficiales de IRYA (SVG del proyecto Framer).
 * Usan `currentColor`, así que el color se controla con clases `text-*`.
 */

const WORDMARK_PATH =
  "M121.01 24.83c-12.82 0-20.06 6.48-20.06 16.96v.61c0 10.18 7.24 16.65 20.06 16.65s19.49-6.48 19.49-16.65v-.61c0-10.48-6.96-16.96-19.49-16.96m152.91 27.32c-48.39 0-64.52 11.52-64.52 44.8v85.51h24.32V96.95c0-19.97 10.25-24.57 44.29-24.57 8.19 0 22.53.25 34.3.77v-19.2c-12.54-1.28-25.09-1.79-38.4-1.79Zm170.5 2.3v74.5c0 24.84-10.49 35.58-34.56 35.58s-34.31-10.75-34.31-35.58v-74.5h-22.53v75.53c0 37.89 16.13 54.79 51.21 54.79 18.69 0 30.72-4.87 38.4-14.85h1.79v11.78c0 23.04-11.01 33.28-40.19 33.28-11.52 0-26.37-1.54-38.14-3.84v19.45c14.08 3.08 26.88 4.61 39.94 4.61 43.78 0 60.93-18.95 60.93-59.4V54.45h-22.53Zm121.4-2.3c-14.62 0-28.5 2.05-43.37 5.89V77.5c14.12-3.33 28.99-5.12 41.63-5.12 25.53 0 35.44 6.91 35.44 29.44v3.33c-15.36-1.03-26.51-1.28-32.71-1.28-41.88 0-58.98 12.29-58.98 40.2s16.6 40.71 48.08 40.71c20.32 0 33.46-5.12 42.13-15.62h1.49v13.31h22.06v-74.25c0-40.19-15.86-56.06-55.76-56.06Zm33.7 76.8c0 24.06-12.88 36.1-39.4 36.1-21.06 0-30.23-6.4-30.23-20.99 0-15.87 10.9-22.27 38.17-22.27 7.19 0 20.08.51 31.47 1.28v5.89Zm-466.36-3.28-.09-54.68h-24.51c-1.04 20.88-13.66 31.83-39.33 33.19v21.68c16.86 1.13 31.93-1.41 39.41-6.33v19.67c0 41.08 43.51 44.07 60.06 43.13v-21.94c-24.92-.42-35.54-8.28-35.54-34.72";

const SYMBOL_PATH =
  "M250.44 97.15c-21.61 0-33.82 10.92-33.82 28.59v1.03c0 17.15 12.21 28.07 33.82 28.07s32.86-10.92 32.86-28.07v-1.03c0-17.67-11.73-28.59-32.86-28.59m20.49 169.98-.16-92.17h-41.31c-1.75 35.19-23.02 53.65-66.29 55.94v36.53c28.42 1.9 53.83-2.38 66.43-10.67v33.16c0 69.25 73.33 74.29 101.24 72.7v-36.97c-42-.7-59.91-13.96-59.91-58.52";

type LogoProps = { className?: string; title?: string };

export function Logo({ className, title = "irya" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 690.81 260.03"
      role="img"
      aria-label={title}
      className={cn("h-auto", className)}
      fill="currentColor"
    >
      <path d={WORDMARK_PATH} />
    </svg>
  );
}

/** Símbolo "i" dentro de su caja clara (CTA final). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "flex items-center justify-center overflow-clip rounded-[5px] bg-neutral-50 text-deep-violet",
        className,
      )}
    >
      <svg viewBox="0 0 494 460" aria-hidden className="size-[69px] shrink-0" fill="currentColor">
        <path d={SYMBOL_PATH} />
      </svg>
    </span>
  );
}
