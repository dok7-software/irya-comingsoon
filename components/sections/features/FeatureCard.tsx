import { ButtonLink } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import type { Feature } from "@/lib/content";
import { cn } from "@/lib/cn";

/**
 * Card oscura con texto + mockup. En desktop el teléfono sobresale por arriba
 * de la card y queda cortado en su borde inferior; en mobile se apila debajo del texto.
 */
export function FeatureCard({ feature }: { feature: Feature }) {
  const mockupLeft = feature.mockupSide === "left";

  return (
    <article
      id={feature.id}
      className={cn(
        // En desktop todas las cards miden lo mismo y el texto se centra verticalmente.
        "relative flex scroll-mt-32 flex-col rounded-xl text-white lg:min-h-[33.8rem] lg:justify-center",
        mockupLeft
          ? "bg-[linear-gradient(100deg,#3a2f66_0%,#2a2250_45%,var(--color-night)_100%)]"
          : "bg-[linear-gradient(115deg,var(--color-plum)_0%,#2c2453_55%,var(--color-night)_100%)]",
      )}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-xl px-5 pt-8 sm:px-8 sm:pt-12 lg:mx-0 lg:max-w-none lg:py-8",
          mockupLeft ? "lg:pr-17 lg:pl-120" : "lg:pr-120 lg:pl-17",
        )}
      >
        <h3 className="mx-auto max-w-[45rem] text-center font-display text-display-sm font-medium lg:mx-0 lg:text-left lg:text-display">
          {feature.title}
        </h3>
        <p className="mt-6 max-w-[46.5rem] text-[0.9375rem] leading-[1.45] text-white/90 lg:mt-8 lg:text-body">
          {feature.description}
        </p>
        <CheckList items={feature.bullets} className="mt-7 lg:mt-9" />
        <div className="mt-9 flex flex-wrap justify-center gap-2 lg:mt-12 lg:justify-start">
          <ButtonLink
            href={feature.secondaryCta.href}
            variant="secondary"
            className="w-56 max-lg:hidden"
          >
            {feature.secondaryCta.label}
          </ButtonLink>
          <ButtonLink href={feature.primaryCta.href} variant="primary-lg" className="w-45 lg:w-56">
            {feature.primaryCta.label}
          </ButtonLink>
        </div>
      </div>

      {/* clip-path recorta solo el borde inferior: el teléfono puede sobresalir por arriba. */}
      <div
        className={cn(
          "mx-auto mt-9 w-48 [clip-path:inset(-100%_-100%_0_-100%)] sm:w-64",
          "lg:absolute lg:bottom-0 lg:mt-0 lg:w-[24.5rem]",
          mockupLeft ? "lg:left-8" : "lg:right-8",
        )}
      >
        <PhoneMockup mockup={feature.mockup} sizes="(min-width: 1024px) 392px, (min-width: 640px) 256px, 192px" />
      </div>
    </article>
  );
}
