import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { navbar } from "@/lib/content";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-2 z-50 flex justify-center px-2 sm:top-3.5 sm:px-4">
      <nav
        aria-label="Principal"
        className="relative flex h-11 w-full max-w-[38.125rem] items-center justify-between rounded-lg bg-[#363261]/70 pr-1.5 pl-4 shadow-[0_10px_30px_-12px_rgb(12_8_30/0.5)] backdrop-blur-md sm:h-16 sm:rounded-[10px] sm:pr-6 sm:pl-8"
      >
        <Link href="/" aria-label="IRYA, inicio" className="text-lime">
          <Logo className="h-6 sm:h-7.5" />
        </Link>
        <ButtonLink href={navbar.cta.href} size="sm" className="w-40.5 max-sm:hidden">
          {navbar.cta.label}
        </ButtonLink>
        <MobileMenu />
      </nav>
    </header>
  );
}
