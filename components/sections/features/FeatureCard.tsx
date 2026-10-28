import { ButtonLink } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { PhoneDevice } from "@/components/ui/PhoneDevice";
import type { Feature } from "@/lib/content";
import { cn } from "@/lib/cn";

/** Degradados radiales exactos: el primer panel usa una elipse distinta. */
const panelGradients = {
  first:
    "bg-[radial-gradient(107%_150%_at_0%_-15%,var(--color-primary-600)_0%,var(--color-primary-800)_100%)]",
  rest: "bg-[radial-gradient(108%_150%_at_-4.6%_-23.4%,var(--color-primary-600)_0%,var(--color-primary-800)_100%)]",
};

/** Anclaje inferior del teléfono en Phone (sale por debajo del panel y queda recortado). */
const phoneBottomOffsets = ["-bottom-50.5", "-bottom-53.5", "-bottom-45.25"] as const;

type FeatureCardProps = { feature: Feature; index: number };

/**
 * Panel de función.
 * Desktop: 1085 × 452, copy de 629px + teléfono inclinado de 280 × 580 que sobresale 64px.
 * Tablet: 100% × 480, teléfono recto a escala 0.7.
 * Phone: 780px de alto, columna centrada y teléfono recortado por abajo.
 */
export function FeatureCard({ feature, index }: FeatureCardProps) {
  const isFirst = index === 0;
  const deviceLeft = feature.deviceSide === "left";

  return (
    <article
      id={feature.id}
      className={cn(
        "relative flex h-195 w-full scroll-mt-24 flex-col items-center justify-start overflow-clip rounded-card px-4.5 py-7",
        isFirst ? "gap-16.25" : "gap-7",
        isFirst ? panelGradients.first : panelGradients.rest,
        "tablet:h-120 tablet:flex-row tablet:justify-center tablet:gap-16.5 tablet:overflow-visible tablet:p-0",
        deviceLeft ? "tablet:flex-row-reverse tablet:pr-10" : "tablet:pl-10",
        "desktop:h-113 desktop:w-271.25 desktop:pr-0 desktop:pl-0",
      )}
    >
      <div className="flex w-full flex-col justify-center gap-10 tablet:h-full tablet:w-auto tablet:min-w-0 tablet:flex-1 tablet:items-start tablet:justify-evenly tablet:gap-0 desktop:w-157.25 desktop:flex-none">
        <h3 className="text-center font-heading text-h2 font-semibold text-neutral-50 tablet:text-left desktop:text-h2-lg">
          {feature.title}
        </h3>

        <div className="flex w-full flex-col gap-10 text-primary-100">
          <p className={cn("text-body font-medium tablet:text-left", !isFirst && "text-center")}>
            {feature.description}
          </p>
          <CheckList items={feature.bullets} />
        </div>

        <div className="flex flex-col items-center gap-3 self-center tablet:flex-row tablet:gap-1.5 tablet:self-start">
          <ButtonLink href={feature.secondaryCta.href} variant="light" className="max-tablet:hidden">
            {feature.secondaryCta.label}
          </ButtonLink>
          <ButtonLink href={feature.primaryCta.href} variant="lime-tablet">
            {feature.primaryCta.label}
          </ButtonLink>
        </div>
      </div>

      {/* Phone: centrado y anclado bajo el panel · Tablet: escala 0.7 · Desktop: tamaño real e inclinado */}
      <PhoneDevice
        screen={feature.screen}
        tilt={feature.tilt}
        className={cn(
          "absolute left-1/2 -ml-35 scale-70",
          phoneBottomOffsets[index],
          "tablet:static tablet:ml-0 desktop:scale-100",
        )}
      />
    </article>
  );
}
