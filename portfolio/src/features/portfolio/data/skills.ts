import type { SkillGroup } from "../types/portfolio.type";

export const skillGroups: SkillGroup[] = [
  {
    id: "backend",
    title: "Backend",
    skills: [
      { id: "nodejs", name: "Node.js" },
      { id: "nest", name: "NestJS" },
      { id: "postgres", name: "PostgreSQL" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    skills: [
      { id: "next", name: "Next.js" },
      { id: "react", name: "React" },
      { id: "ts", name: "TypeScript" },
      { id: "tailwind", name: "Tailwind CSS" },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    skills: [
      { id: "git", name: "Git" },
      { id: "docker", name: "Docker" },
      { id: "linux", name: "Linux" },
    ],
  },
];
