import { Logo } from "@/components/brand/Logo";
import { EmailSignupForm } from "@/components/forms/EmailSignupForm";
import { socialIcons } from "@/components/ui/icons";
import { footer, socialLinks } from "@/lib/content";

/**
 * Footer inferior.
 * Desktop: 607px de alto, fila de 1200 × 333 con 80px entre columnas.
 * Tablet: fila de 436px con extremos separados. Phone: columna con padding 80/60/49.
 */
export function Footer() {
  return (
    <footer data-nav-theme="light" className="w-full overflow-clip bg-primary-50 desktop:h-151.75">
      <div className="flex flex-col gap-15 px-15 pt-20 pb-12.25 tablet:h-109 tablet:flex-row tablet:items-center tablet:justify-between tablet:gap-12 tablet:p-5 desktop:mx-auto desktop:h-83.25 desktop:w-300 desktop:justify-center desktop:gap-20 desktop:p-0">
        <div className="flex flex-col items-center gap-5 text-center tablet:flex-1">
          <Logo className="w-24.5 text-deep-violet desktop:w-32.5" />
          <p className="font-heading text-h4 font-medium desktop:text-h4-lg">{footer.tagline}</p>
          <ul className="flex gap-4">
            {socialLinks.map(({ network, label, href }) => {
              const Icon = socialIcons[network];
              return (
                <li key={network}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex size-10.5 items-center justify-center rounded-[5px] border-2 border-primary-700 text-primary-700 transition-colors duration-400 ease-framer hover:bg-primary-700 hover:text-neutral-50"
                  >
                    <Icon className="size-6" />
                  </a>
                </li>
              );
            })}
          </ul>
          <p className="text-body font-medium">{footer.copyright}</p>
        </div>

        <div className="flex w-full flex-col items-start gap-2.5 text-left tablet:w-auto tablet:flex-1 desktop:items-center desktop:text-center">
          <p className="font-heading text-h4 font-medium tablet:w-55 desktop:text-h4-lg">{footer.signupTitle}</p>
          <p className="text-body font-medium text-neutral-700 tablet:w-55 desktop:w-64.5">
            {footer.signupDescription}
          </p>
          <EmailSignupForm variant="footer" className="tablet:w-60" />
        </div>
      </div>
    </footer>
  );
}
