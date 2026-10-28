import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { features, featuresIntro } from "@/lib/content";
import { FeatureCard } from "./FeatureCard";
import { FeatureStack } from "./FeatureStack";

export function Features() {
  return (
    <section
      id="funciones"
      data-nav-theme="light"
      className="flex w-full scroll-mt-20 flex-col items-center bg-neutral-50 px-3.75 py-10 tablet:px-5 desktop:px-0"
    >
      <Reveal className="w-full">
        <SectionHeading {...featuresIntro} />
      </Reveal>

      <FeatureStack>
        {features.map((feature, index) => (
          // Desktop: historia de 562px (110px superiores de aire) fija arriba durante el scroll.
          <div
            key={feature.id}
            data-story
            className="relative flex w-full flex-col items-center justify-end desktop:sticky desktop:top-0 desktop:h-140.5 desktop:overflow-clip desktop:pt-27.5"
          >
            <Reveal className="w-full scale-[var(--stack-scale,1)] desktop:w-auto">
              <FeatureCard feature={feature} index={index} />
            </Reveal>
          </div>
        ))}
      </FeatureStack>
    </section>
  );
}
