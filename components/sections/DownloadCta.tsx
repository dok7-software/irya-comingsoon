import { LogoMark } from "@/components/brand/Logo";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { ButtonLink } from "@/components/ui/Button";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { Reveal } from "@/components/ui/Reveal";
import { downloadCta, mockups } from "@/lib/content";

export function DownloadCta() {
  return (
    <section
      id="descargar"
      className="relative isolate flex flex-col items-center overflow-hidden px-4 pt-15 text-center sm:pt-32"
    >
      <AuroraBackground variant="cta" className="-z-10" />

      <Reveal className="flex flex-col items-center">
        <LogoMark className="size-16 sm:size-25" />
        <h2 className="mt-4 font-display text-display-sm font-medium text-white sm:mt-5 sm:text-display">
          {downloadCta.title.map((line) => (
            <span key={line} className="block sm:inline">
              {line}{" "}
            </span>
          ))}
        </h2>
        <ButtonLink href={downloadCta.cta.href} variant="primary-lg" className="mt-6 w-48 sm:w-61">
          {downloadCta.cta.label}
        </ButtonLink>
      </Reveal>

      {/* Mockup distinto por breakpoint, como en los diseños mobile y desktop. */}
      <Reveal delay={150} className="mt-24 w-68 sm:hidden">
        <PhoneMockup mockup={mockups.tripConfirmed} sizes="272px" />
      </Reveal>
      <Reveal delay={150} className="mt-30 hidden w-full max-w-[31.4rem] sm:block">
        <PhoneMockup mockup={mockups.signup} sizes="502px" />
      </Reveal>
    </section>
  );
}
