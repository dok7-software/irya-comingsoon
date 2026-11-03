import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contactCard, faqIntro, faqs } from "@/lib/content";
import { FaqAccordion } from "./FaqAccordion";

/**
 * FAQs de /conocenos (medidas del proyecto Framer).
 * Desktop: dos columnas de 543px separadas 34px, centradas en vertical; encabezado y tarjeta a la izquierda.
 * Tablet (márgenes de 24px) y Phone (márgenes de 40px): encabezado, tarjeta y preguntas en columna.
 */
export function Faq() {
  return (
    <section
      data-nav-theme="dark"
      data-nav-theme-phone="light"
      className="flex w-full justify-center px-10 pt-25 pb-30 tablet:px-6 tablet:pt-30 desktop:px-0"
    >
      <Reveal className="flex w-full flex-col gap-8.75 tablet:gap-7.5 desktop:w-280 desktop:flex-row desktop:items-center desktop:gap-8.5">
        <div className="flex flex-col gap-15 tablet:gap-7.5 desktop:flex-1 desktop:gap-18.5">
          <div className="mx-auto w-full max-w-103">
            <SectionHeading {...faqIntro} />
          </div>

          <div className="flex flex-col items-center gap-3.5 rounded-[10px] bg-[radial-gradient(108%_150%_at_-4.6%_-23.4%,var(--color-primary-600)_0%,var(--color-primary-800)_100%)] p-10 text-center shadow-[1px_1px_6px_0_var(--color-primary-400)] tablet:px-8.75 tablet:py-7.5 desktop:px-13.75">
            <p className="font-heading text-[1.48rem] leading-[1.2] font-medium tracking-[-0.06em] text-neutral-50 desktop:text-[1.85rem]">
              {contactCard.title}
            </p>
            <p className="text-body font-medium text-primary-100">{contactCard.description}</p>
            <ButtonLink href={contactCard.cta.href} variant="light">
              {contactCard.cta.label}
            </ButtonLink>
          </div>
        </div>

        <div className="desktop:flex-1">
          <FaqAccordion items={faqs} />
        </div>
      </Reveal>
    </section>
  );
}
