import Link from "next/link";

import type { Project } from "../types/portfolio.type";
import ProjectCard from "./ProjectCard";

type ProjectsPreviewSectionProps = {
  projects: Project[];
};

export default function ProjectsPreviewSection({ projects }: ProjectsPreviewSectionProps) {
  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-5xl px-6">
        <div className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-zinc-950">Projects</h2>
              <p className="text-sm leading-6 text-zinc-600 sm:text-base">
                A few recent things I&apos;ve built. More details on the projects page.
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex h-10 items-center justify-center rounded-md border border-black/10 px-4 text-sm font-medium text-zinc-950"
            >
              View All Projects
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
