import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contactCard, faqIntro, faqs } from "@/lib/content";
import { FaqAccordion } from "./FaqAccordion";

/**
 * FAQs de /conocenos.
 * Desktop: dos columnas de 426px separadas 26px; encabezado y tarjeta de contacto a la izquierda.
 */
export function Faq() {
  return (
    <section data-nav-theme="dark" className="flex w-full justify-center px-5 py-24 desktop:px-0">
      <Reveal className="flex w-full flex-col gap-10 tablet:flex-row tablet:gap-6.5 desktop:w-213">
        <div className="flex flex-col justify-between gap-10 tablet:flex-1">
          <div className="px-6">
            <SectionHeading {...faqIntro} compact />
          </div>

          <div className="flex flex-col items-center gap-4 rounded-[6px] bg-[radial-gradient(108%_150%_at_-4.6%_-23.4%,var(--color-primary-600)_0%,var(--color-primary-800)_100%)] px-8 py-7 text-center shadow-button">
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
