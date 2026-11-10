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
    <ul className="flex flex-col gap-2.75">
      {items.map((item, index) => {
        const open = openIndex === index;
        const panelId = `${baseId}-${index}`;
        return (
          <li
            key={item.question}
            className="rounded-[10px] bg-neutral-50 shadow-[2px_2px_4px_0_rgb(0_0_0/0.25)]"
          >
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenIndex(open ? null : index)}
              className={cn(
                "flex w-full items-center justify-between gap-7.5 pt-8.75 pr-8.75 pl-5 text-left font-heading text-h4 leading-[1.2] font-medium tracking-[-0.06em] desktop:text-h4-lg",
                open ? "pb-5" : "pb-8.75",
              )}
            >
              {item.question}
              <ChevronDownSquareIcon
                className={cn(
                  "size-9.25 shrink-0 text-neutral-950 transition-transform duration-400 ease-menu",
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
                <p className="pr-8.75 pb-8.75 pl-5 text-body font-medium text-neutral-700">{item.answer}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
