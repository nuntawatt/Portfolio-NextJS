import Link from "next/link";

type AboutPreviewSectionProps = {
  title?: string;
  description: string;
};

export default function AboutPreviewSection({
  title = "About",
  description,
}: AboutPreviewSectionProps) {
  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-5xl px-6">
        <div className="rounded-xl border border-black/10 bg-white p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-zinc-950">{title}</h2>
              <p className="max-w-2xl text-sm leading-6 text-zinc-600 sm:text-base">
                {description}
              </p>
            </div>
            <Link
              href="/about"
              className="inline-flex h-10 items-center justify-center rounded-md border border-black/10 px-4 text-sm font-medium text-zinc-950"
            >
              Learn more
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
