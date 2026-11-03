import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { aboutFeatures, aboutIntro, links } from "@/lib/content";
import { cn } from "@/lib/cn";
import { ShowcaseMedia } from "./ShowcaseMedia";

/**
 * Funcionalidades de /conocenos.
 * Desktop: columna de 800px con filas alternas (copy + panel de 333 × 314) separadas 60px.
 */
export function AboutFeatures() {
  return (
    <section
      data-nav-theme="dark"
      className="flex w-full flex-col items-center gap-15 px-5 pt-30 desktop:px-0"
    >
      <Reveal className="flex flex-col items-center gap-2 text-center">
        <Badge>{aboutIntro.badge}</Badge>
        <h1 className="font-heading text-h2 font-semibold desktop:text-h2-lg">{aboutIntro.title}</h1>
      </Reveal>

      <ol className="flex w-full flex-col gap-15 desktop:w-200">
        {aboutFeatures.map((feature, index) => (
          <li key={feature.id} id={feature.id}>
            <Reveal
              className={cn(
                "flex flex-col items-center gap-10 tablet:flex-row tablet:gap-16.75",
                feature.mediaSide === "left" && "tablet:flex-row-reverse",
              )}
            >
              <div className="flex flex-1 flex-col items-start gap-5">
                <span className="font-heading text-h2 font-medium text-neutral-950">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="font-heading text-h2 font-semibold">{feature.title}</h2>
                <p className="text-body font-medium text-neutral-700">{feature.description}</p>
                <ButtonLink href={links.appStore} variant="dark" size="sm" className="mt-1 w-37">
                  Download App
                </ButtonLink>
              </div>
              <ShowcaseMedia screen={feature.screen} crop={feature.crop} />
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
