import type { Project } from "../types/portfolio.type";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-lg border border-black/10 p-4">
      <div className="font-medium">{project.title}</div>
      <div className="text-sm text-zinc-600">{project.description}</div>
      <div className="mt-3 flex flex-wrap gap-2">
        {project.techStack.map((t) => (
          <span key={t} className="rounded-full border border-black/10 px-2 py-0.5 text-xs text-zinc-700">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
