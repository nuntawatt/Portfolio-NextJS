import Link from "next/link";
import Image from "next/image";

import HeroStats from "./HeroStats";
import { IconGithub, IconLinkedIn, IconMail } from "./icons";
import SocialIconLink from "./SocialIconLink";

type HeroSectionProps = {
  name: string;
  role: string;
  description: string;
};

export default function HeroSection({ name, role, description }: HeroSectionProps) {
  return (
    <section className="py-10 sm:py-14">
      <div className="mx-auto w-full max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-zinc-950">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_55%)]" />

          <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-sm font-medium text-white/60">Hi, I&apos;m</p>
                <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                  {name}
                </h1>
                <p className="text-lg text-white/80 sm:text-xl">{role}</p>
                <p className="max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
                  {description}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-white px-4 text-sm font-medium text-zinc-950"
                >
                  View Projects
                </Link>
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-white/15 bg-transparent px-4 text-sm font-medium text-white"
                >
                  Contact Me
                </Link>
              </div>

              <div className="flex items-center gap-3">
                <SocialIconLink href="#" label="GitHub">
                  <IconGithub className="h-5 w-5" />
                </SocialIconLink>
                <SocialIconLink href="#" label="LinkedIn">
                  <IconLinkedIn className="h-5 w-5" />
                </SocialIconLink>
                <SocialIconLink href="#" label="Email">
                  <IconMail className="h-5 w-5" />
                </SocialIconLink>
              </div>

              <HeroStats
                stats={[
                  { value: "5+", label: "Years experience" },
                  { value: "20+", label: "Projects shipped" },
                  { value: "80+", label: "Happy clients" },
                ]}
              />
            </div>

            <div className="relative">
              <div className="mx-auto aspect-square w-full max-w-sm">
                <div className="relative h-full w-full overflow-hidden rounded-full border border-white/10 bg-white/5">
                  <Image
                    src="/images/profile.jpeg"
                    alt="Profile"
                    fill
                    sizes="(max-width: 1024px) 320px, 380px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
