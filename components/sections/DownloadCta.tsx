import Image from "next/image";
import { LogoMark } from "@/components/brand/Logo";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { downloadCta, phoneFrame, screens, type Screen } from "@/lib/content";
import { cn } from "@/lib/cn";

type PhoneLayerProps = {
  screen: Screen;
  /** Clases de posición y tamaño de la pantalla y del marco (anclados al borde superior). */
  screenClassName: string;
  frameClassName: string;
  sizes: string;
  className?: string;
};

/** Pantalla + marco rasterizado, centrados y recortados por el borde inferior de la sección. */
function PhoneLayer({ screen, screenClassName, frameClassName, sizes, className }: PhoneLayerProps) {
  return (
    <div className={cn("pointer-events-none absolute inset-x-0 top-0", className)}>
      <div className={cn("absolute left-1/2 -translate-x-1/2 overflow-hidden", screenClassName)}>
        <Image src={screen.src} alt={screen.alt} fill sizes={sizes} quality={90} className="object-cover" />
      </div>
      <Image
        src={phoneFrame.src}
        alt=""
        width={phoneFrame.width}
        height={phoneFrame.height}
        sizes={sizes}
        quality={90}
        className={cn("absolute left-1/2 max-w-none -translate-x-1/2", frameClassName)}
      />
    </div>
  );
}

/** CTA visual del footer: 746px en Phone, 701px desde Tablet. */
export function DownloadCta() {
  return (
    <section
      id="descargar"
      data-nav-theme="dark"
      className="relative isolate flex h-186.5 w-full flex-col items-center overflow-clip pt-16 tablet:h-175.25 tablet:pt-27.5"
    >
      <AuroraBackground variant="cta" className="-z-10" />

      <Reveal className="relative z-10 flex flex-col items-center gap-2.5 px-4">
        <LogoMark className="size-16 tablet:size-20.75" />
        <div className="flex flex-col items-center gap-5">
          <h2 className="text-center font-heading text-h2 font-semibold text-neutral-50 desktop:text-h2-lg">
            {downloadCta.title}
          </h2>
          <ButtonLink href={downloadCta.cta.href} variant="lime-desktop" className="w-51.25">
            {downloadCta.cta.label}
          </ButtonLink>
        </div>
      </Reveal>

      {/* Phone: confirmación de viaje · Tablet/Desktop: pantalla de registro */}
      <PhoneLayer
        className="tablet:hidden"
        screen={screens.tripConfirmed}
        screenClassName="top-108.75 h-167 w-77.25"
        frameClassName="top-105.25 h-158.25 w-78.25"
        sizes="313px"
      />
      <PhoneLayer
        className="max-tablet:hidden"
        screen={screens.signup}
        screenClassName="top-109.75 h-207.25 w-95.75 rounded-t-[52px]"
        frameClassName="top-104.5 h-214.5 w-106"
        sizes="424px"
      />
    </section>
  );
}
