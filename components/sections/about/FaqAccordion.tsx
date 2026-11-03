"use client";

import { useId, useState } from "react";
import { ChevronDownSquareIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

type FaqAccordionProps = {
  items: { question: string; answer: string }[];
};

/** Lista de preguntas; solo una abierta a la vez (0.4s, misma curva que el menú). */
export function FaqAccordion({ items }: FaqAccordionProps) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <ul className="flex flex-col gap-2">
      {items.map((item, index) => {
        const open = openIndex === index;
        const panelId = `${baseId}-${index}`;
        return (
          <li
            key={item.question}
            className="rounded-[6px] border border-neutral-200 bg-neutral-50 shadow-[4px_4px_0_0_var(--color-neutral-200)]"
          >
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenIndex(open ? null : index)}
              className="flex min-h-21.25 w-full items-center justify-between gap-4 px-5 text-left font-heading text-[1.125rem] font-medium tracking-[-0.04em]"
            >
              {item.question}
              <ChevronDownSquareIcon
                className={cn(
                  "size-6 shrink-0 text-neutral-800 transition-transform duration-400 ease-menu",
                  open && "rotate-180",
                )}
              />
            </button>
            <div
              id={panelId}
              inert={!open}
              className={cn(
                "grid transition-[grid-template-rows] duration-400 ease-menu",
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-body font-medium text-neutral-700">{item.answer}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
