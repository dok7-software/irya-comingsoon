import { Logo } from "@/components/brand/Logo";
import { EmailSignupForm } from "@/components/forms/EmailSignupForm";
import { Container } from "@/components/ui/Container";
import { socialIcons } from "@/components/ui/icons";
import { footer, socialLinks } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-surface-alt pt-20 pb-16 text-ink sm:pt-21 sm:pb-24">
      <Container
        width="narrow"
        className="flex flex-col items-center gap-18 md:flex-row md:items-start md:justify-between"
      >
        <div className="flex flex-col items-center text-center">
          <Logo className="h-8 sm:h-16" />
          <p className="mt-3 font-display text-lg tracking-[-0.02em] sm:text-xl">{footer.tagline}</p>
          <ul className="mt-5 flex gap-5 sm:gap-6">
            {socialLinks.map(({ network, label, href }) => {
              const Icon = socialIcons[network];
              return (
                <li key={network}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex size-10 items-center justify-center rounded-md border border-ink transition-colors hover:bg-ink hover:text-surface-alt sm:size-12.5"
                  >
                    <Icon className="size-6 sm:size-7" />
                  </a>
                </li>
              );
            })}
          </ul>
          <p className="mt-5 text-[0.9375rem] sm:mt-9">{footer.copyright}</p>
        </div>

        {/* En mobile el bloque se centra pero su texto va alineado a la izquierda. */}
        <div className="flex w-full max-w-64 flex-col text-left sm:max-w-72 sm:items-center sm:text-center">
          <p className="font-display text-lg tracking-[-0.02em] sm:text-[1.375rem]">{footer.signupTitle}</p>
          <p className="mt-1 text-[0.9375rem] leading-snug text-ink-muted sm:mt-2 sm:text-base">
            {footer.signupDescription}
          </p>
          <EmailSignupForm layout="stacked" className="mt-4 sm:mt-5" />
        </div>
      </Container>
    </footer>
  );
}
