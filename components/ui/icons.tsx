import type { SVGProps } from "react";
import type { SocialNetwork } from "@/lib/content";

type IconProps = SVGProps<SVGSVGElement>;

/** Base estilo Lucide: 24 × 24, trazo 2. */
const base: IconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export function CheckCircleIcon(props: IconProps) {
  return (
    <svg {...base} strokeWidth={1.6} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.25 12.25 2.5 2.5 5-5.25" />
    </svg>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export function SpinnerIcon(props: IconProps) {
  return (
    <svg {...base} strokeWidth={2.5} {...props}>
      <path d="M12 3a9 9 0 1 0 9 9" />
    </svg>
  );
}

function FacebookIcon(props: IconProps) {
  return (
    <svg {...base} strokeWidth={1.8} {...props}>
      <path d="M16 3h-2.5A4.5 4.5 0 0 0 9 7.5V10H6.5v3.5H9V21h3.5v-7.5H15l.75-3.5H12.5V7.75c0-.7.55-1.25 1.25-1.25H16Z" />
    </svg>
  );
}

function InstagramIcon(props: IconProps) {
  return (
    <svg {...base} strokeWidth={1.8} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

function TikTokIcon(props: IconProps) {
  return (
    <svg {...base} strokeWidth={1.8} {...props}>
      <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M14 3c.5 3 2.5 4.75 5.5 5" />
    </svg>
  );
}

export const socialIcons: Record<SocialNetwork, (props: IconProps) => React.JSX.Element> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
};
