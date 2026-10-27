"use client";

import { useEffect, useState } from "react";
import { countdownLabels } from "@/lib/content";
import { cn } from "@/lib/cn";

type TimeLeft = Record<keyof typeof countdownLabels, number>;

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

function getTimeLeft(target: number): TimeLeft {
  const diff = Math.max(target - Date.now(), 0);
  return {
    days: Math.floor(diff / DAY),
    hours: Math.floor((diff % DAY) / HOUR),
    minutes: Math.floor((diff % HOUR) / MINUTE),
    seconds: Math.floor((diff % MINUTE) / SECOND),
  };
}

const pad = (value: number) => String(value).padStart(2, "0");

export function Countdown({ target, className }: { target: string; className?: string }) {
  // null en el render del servidor para evitar desajustes de hidratación.
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const targetTime = new Date(target).getTime();
    const tick = () => setTimeLeft(getTimeLeft(targetTime));
    tick();
    const interval = setInterval(tick, SECOND);
    return () => clearInterval(interval);
  }, [target]);

  const units = Object.keys(countdownLabels) as Array<keyof TimeLeft>;

  return (
    <dl className={cn("grid grid-cols-4", className)} aria-live="off">
      {units.map((unit, index) => (
        <div
          key={unit}
          className={cn(
            "flex flex-col-reverse items-center gap-2",
            index > 0 && "border-l border-ink/80",
          )}
        >
          <dt className="text-[0.625rem] tracking-wide uppercase sm:text-[0.9375rem] sm:tracking-normal">
            {countdownLabels[unit]}
          </dt>
          <dd className="text-[1.75rem] leading-none font-light tabular-nums sm:text-[2.75rem]">
            {timeLeft ? (unit === "days" ? timeLeft.days : pad(timeLeft[unit])) : "--"}
          </dd>
        </div>
      ))}
    </dl>
  );
}
