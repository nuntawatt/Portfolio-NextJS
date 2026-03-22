import type { Project } from "../types/portfolio.type";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-lg border border-black/10 p-4">
      <div className="font-medium">{project.title}</div>
      <div className="text-sm text-zinc-600">{project.description}</div>
    </div>
  );
}
