import type { Project, Skill } from "../types/portfolio.type";
import { projects } from "../data/projects";
import { skills } from "../data/skills";

export async function getProjects(): Promise<Project[]> {
  return projects;
}

export async function getSkills(): Promise<Skill[]> {
  return skills;
}
