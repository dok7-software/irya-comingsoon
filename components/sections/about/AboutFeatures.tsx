import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { aboutFeatures, aboutIntro, links } from "@/lib/content";
import { cn } from "@/lib/cn";
import { ShowcaseMedia } from "./ShowcaseMedia";

/**
 * Funcionalidades de /conocenos (medidas del proyecto Framer).
 * Desktop: filas de 1025px (copy de 525 + 75 + panel de 425 × 402) separadas 80px.
 * Tablet/Phone: copy arriba (15px más adentro que el panel), panel debajo a 75px, filas a 95px.
 */
export function AboutFeatures() {
  return (
    <section
      data-nav-theme="dark"
      data-nav-theme-phone="light"
      className="flex w-full flex-col items-center gap-38.75 px-5 pt-42.5 tablet:px-10 tablet:pt-37.5 desktop:gap-34.75 desktop:px-0"
    >
      <Reveal className="flex flex-col items-center gap-2.5 text-center">
        <Badge>{aboutIntro.badge}</Badge>
        <h1 className="font-heading text-[3rem] leading-[0.9] font-semibold tracking-[-0.04em] desktop:text-[4.5rem]">
          {aboutIntro.title}
        </h1>
      </Reveal>

      <ol className="flex w-full flex-col gap-23.75 desktop:w-256.25 desktop:gap-20">
        {aboutFeatures.map((feature, index) => (
          <li key={feature.id} id={feature.id}>
            <Reveal
              className={cn(
                "flex flex-col gap-18.75 desktop:flex-row desktop:items-center",
                feature.mediaSide === "left" && "desktop:flex-row-reverse",
              )}
            >
              <div className="flex flex-col items-start gap-5 px-3.75 desktop:w-131.25 desktop:px-0">
                <span className="font-heading text-h2 font-semibold text-primary-700 desktop:text-h2-lg">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="font-heading text-h2 font-semibold desktop:text-h2-lg">{feature.title}</h2>
                <p className="text-base leading-[1.1] tracking-[-0.02em] text-neutral-700">{feature.description}</p>
                <ButtonLink href={links.aboutPage} variant="dark">
                  Conócenos
                </ButtonLink>
              </div>
              <ShowcaseMedia background={feature.background} layers={feature.layers} />
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
