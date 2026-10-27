import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { features, featuresIntro } from "@/lib/content";
import { FeatureCard } from "./FeatureCard";

export function Features() {
  return (
    <section id="funciones" className="scroll-mt-24 bg-surface pt-14 pb-12 lg:pb-28">
      <Container>
        <Reveal>
          <SectionHeading {...featuresIntro} />
        </Reveal>

        <div className="mt-16 flex flex-col gap-8 sm:gap-12 lg:mt-32 lg:gap-40">
          {features.map((feature) => (
            <Reveal key={feature.id}>
              <FeatureCard feature={feature} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
