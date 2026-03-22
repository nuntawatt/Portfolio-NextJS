import Link from "next/link";

import type { ReactNode } from "react";

type SocialIconLinkProps = {
  href: string;
  label: string;
  children: ReactNode;
};

export default function SocialIconLink({ href, label, children }: SocialIconLinkProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 backdrop-blur transition hover:bg-white/10 hover:text-white"
    >
      {children}
    </Link>
  );
}
