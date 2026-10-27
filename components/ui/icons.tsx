import type { SVGProps } from "react";
import type { SocialNetwork } from "@/lib/content";

type IconProps = SVGProps<SVGSVGElement>;

const base: IconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export function CheckCircleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.25 12.25 2.5 2.5 5-5.25" />
    </svg>
  );
}

function FacebookIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M14.5 7.5H16V4.5h-2c-2.2 0-3.5 1.4-3.5 3.6v2.4H8.5v3h2V20h3v-6.5h2.2l.5-3h-2.7V8.4c0-.6.4-.9 1-.9Z" />
    </svg>
  );
}

function InstagramIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.75" y="3.75" width="16.5" height="16.5" rx="4.5" />
      <circle cx="12" cy="12" r="3.75" />
      <circle cx="16.9" cy="7.1" r="0.6" fill="currentColor" />
    </svg>
  );
}

function TikTokIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M13.5 3.75v11.5a3 3 0 1 1-3-3" />
      <path d="M13.5 3.75c.4 2.6 2.1 4.2 4.75 4.4" />
    </svg>
  );
}

export const socialIcons: Record<SocialNetwork, (props: IconProps) => React.JSX.Element> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
};
