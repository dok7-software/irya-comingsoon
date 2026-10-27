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
      className="relative isolate flex min-h-svh items-center justify-center px-5 pt-21 pb-12 sm:px-4 sm:pt-24 sm:pb-16"
    >
      <AuroraBackground variant="hero" className="-z-10" />

      <div className="w-full max-w-[39.7rem] animate-fade-up rounded-[14px] bg-surface px-7 pt-6 pb-9 text-center shadow-card sm:px-10 sm:pt-7 sm:pb-11">
        <Badge>{hero.badge}</Badge>

        <h1 className="mt-4 font-display text-[2.375rem] leading-[1.1] font-medium tracking-[-0.045em] text-ink sm:text-display">
          {hero.title.map((line) => (
            <span key={line} className="sm:block">
              {line}{" "}
            </span>
          ))}
        </h1>

        <p className="mx-auto mt-3 max-w-[32rem] text-base leading-snug text-ink-muted sm:text-body sm:leading-snug">
          {hero.description}
        </p>

        <EmailSignupForm className="mt-8 sm:mt-11" />

        <div className="mt-8 flex items-center gap-3 text-left sm:justify-center">
          <AvatarStack avatars={waitlistAvatars} className="shrink-0" />
          <p className="text-base text-ink-muted sm:text-body">{hero.waitlist}</p>
        </div>

        <Countdown target={site.launchDate} className="mt-10 sm:mt-14" />
      </div>
    </section>
  );
}
