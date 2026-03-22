import Link from "next/link";

type ContactCtaSectionProps = {
  title?: string;
  description: string;
};

export default function ContactCtaSection({
  title = "Let&apos;s work together",
  description,
}: ContactCtaSectionProps) {
  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-5xl px-6">
        <div className="rounded-xl border border-black/10 bg-white p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-zinc-950">{title}</h2>
              <p className="max-w-2xl text-sm leading-6 text-zinc-600 sm:text-base">
                {description}
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex h-10 items-center justify-center rounded-md bg-black px-4 text-sm font-medium text-white"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
