import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contactCard, faqIntro, faqs } from "@/lib/content";
import { FaqAccordion } from "./FaqAccordion";

/**
 * FAQs de /conocenos.
 * Desktop: dos columnas de 426px separadas 26px; encabezado y tarjeta de contacto a la izquierda.
 * Phone: encabezado, tarjeta y preguntas en columna.
 */
export function Faq() {
  return (
    <section data-nav-theme="dark" data-nav-theme-phone="light" className="flex w-full justify-center px-4.5 pt-80 pb-34 tablet:px-5 tablet:py-24 desktop:px-0">
      <Reveal className="flex w-full flex-col gap-22 tablet:flex-row tablet:gap-6.5 desktop:w-213">
        <div className="flex flex-col justify-between gap-12.5 tablet:flex-1">
          <div className="tablet:px-6">
            <SectionHeading {...faqIntro} compact />
          </div>

          <div className="flex flex-col items-center gap-4 mx-3 rounded-[6px] tablet:mx-0 bg-[radial-gradient(108%_150%_at_-4.6%_-23.4%,var(--color-primary-600)_0%,var(--color-primary-800)_100%)] px-8 py-7 text-center shadow-button">
            <p className="font-heading text-h4 font-medium tracking-[-0.04em] text-neutral-50">
              {contactCard.title}
            </p>
            <p className="text-body font-medium text-primary-100">{contactCard.description}</p>
            <ButtonLink href={contactCard.cta.href} variant="light" size="sm" className="w-37">
              {contactCard.cta.label}
            </ButtonLink>
          </div>
        </div>

        <div className="tablet:flex-1">
          <FaqAccordion items={faqs} />
        </div>
      </Reveal>
    </section>
  );
}
