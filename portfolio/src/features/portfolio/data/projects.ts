import type { Project } from "../types/portfolio.type";

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Project One",
    description: "Short description of the project and the problem it solves.",
    techStack: ["Next.js", "TypeScript", "Tailwind"],
  },
  {
    id: "project-2",
    title: "Project Two",
    description: "Short description of the project and the value it delivers.",
    techStack: ["Node.js", "PostgreSQL", "Docker"],
  },
  {
    id: "project-3",
    title: "Project Three",
    description: "Short description of the project with a clear outcome.",
    techStack: ["NestJS", "JWT", "Redis"],
  },
];

export const featuredProjects = projects.slice(0, 3);
