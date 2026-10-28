import { EmailSignupForm } from "@/components/forms/EmailSignupForm";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { Badge } from "@/components/ui/Badge";
import { hero, site, waitlistAvatars } from "@/lib/content";
import { AvatarStack } from "./AvatarStack";
import { Countdown } from "./Countdown";

export function Hero() {
  return (
    <section
      id="registro"
      data-nav-theme="frosted"
      className="relative isolate flex h-svh min-h-200 w-full items-center justify-center overflow-clip"
    >
      <AuroraBackground variant="hero" className="-z-10" />

      {/* Tarjeta: 340px y padding 30 en Phone; ancho por contenido (530px) y padding 25 desde Tablet */}
      <div className="flex w-85 max-w-[calc(100%-30px)] flex-col items-center gap-10 rounded-card bg-neutral-50 p-7.5 shadow-hero tablet:w-auto tablet:max-w-none tablet:p-6.25">
        <div className="flex w-full flex-col items-center gap-5 tablet:w-[463px]">
          <Badge>{hero.badge}</Badge>
          <div className="flex w-full flex-col gap-3.75 text-center">
            <h1 className="font-heading text-h2 font-semibold desktop:text-h2-lg">{hero.title}</h1>
            <p className="text-body-mono text-neutral-700">{hero.description}</p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-7.5 tablet:w-[463px]">
          <EmailSignupForm />
          <div className="flex items-center justify-center gap-2.5 tablet:h-6.25">
            <AvatarStack avatars={waitlistAvatars} />
            <p className="text-body font-medium text-neutral-700">{hero.waitlist}</p>
          </div>
        </div>

        <Countdown target={site.launchDate} />
      </div>
    </section>
  );
}
