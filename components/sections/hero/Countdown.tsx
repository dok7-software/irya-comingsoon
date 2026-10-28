"use client";

import { Fragment, useEffect, useState } from "react";
import { countdownEndMessage, countdownLabels } from "@/lib/content";
import { cn } from "@/lib/cn";

type TimeLeft = Record<keyof typeof countdownLabels, number>;

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

function getTimeLeft(target: number): TimeLeft | "done" {
  const diff = target - Date.now();
  if (diff <= 0) return "done";
  return {
    days: Math.floor(diff / DAY),
    hours: Math.floor((diff % DAY) / HOUR),
    minutes: Math.floor((diff % HOUR) / MINUTE),
    seconds: Math.floor((diff % MINUTE) / SECOND),
  };
}

const pad = (value: number) => String(value).padStart(2, "0");
const units = Object.keys(countdownLabels) as Array<keyof TimeLeft>;

/**
 * Cuenta regresiva: números Inter 400 (38px; 22.4px en Phone por la escala 0.7),
 * etiquetas Manrope 500 en mayúsculas y barras de 1px entre unidades.
 */
export function Countdown({ target, className }: { target: string; className?: string }) {
  // null en el render del servidor para evitar desajustes de hidratación.
  const [timeLeft, setTimeLeft] = useState<TimeLeft | "done" | null>(null);

  useEffect(() => {
    // Sin offset en `target`: se interpreta en la zona horaria local del navegador.
    const targetTime = new Date(target).getTime();
    const tick = () => setTimeLeft(getTimeLeft(targetTime));
    tick();
    const interval = setInterval(tick, SECOND);
    return () => clearInterval(interval);
  }, [target]);

  if (timeLeft === "done") {
    return (
      <p className={cn("text-center font-heading text-h4 font-medium text-primary-700", className)}>
        {countdownEndMessage}
      </p>
    );
  }

  return (
    <dl
      className={cn(
        "flex w-full items-center justify-center gap-2.75 p-0.5 tablet:w-120 tablet:gap-4 tablet:p-0.75",
        className,
      )}
    >
      {units.map((unit, index) => {
        const value = timeLeft ? (unit === "days" ? String(timeLeft.days) : pad(timeLeft[unit])) : "--";
        return (
          <Fragment key={unit}>
            {index > 0 && (
              <span aria-hidden className="h-10.5 w-px shrink-0 bg-primary-700 tablet:h-14.5" />
            )}
            <div className="flex min-w-10.5 flex-[1_1_56px] flex-col-reverse items-center rounded-lg p-1.5 text-center tablet:min-w-15 tablet:flex-[1_1_80px] tablet:p-2">
              <dt className="mt-1.5 font-heading text-[0.6125rem] font-medium text-primary-700 uppercase tablet:mt-2 tablet:text-base">
                {countdownLabels[unit]}
              </dt>
              <dd className="h-[1.2em] overflow-hidden text-[1.4rem] leading-[1.2] text-neutral-950 tabular-nums tablet:text-[2.375rem]">
                {/* La key reinicia la animación de entrada vertical en cada cambio. */}
                <span key={value} className="block animate-[count-in_0.5s_var(--ease-framer)]">
                  {value}
                </span>
              </dd>
            </div>
          </Fragment>
        );
      })}
    </dl>
  );
}
