import type { Project, SkillGroup } from "../types/portfolio.type";
import { projects } from "../data/projects";
import { skillGroups } from "../data/skills";

export async function getProjects(): Promise<Project[]> {
  return projects;
}

export async function getSkillGroups(): Promise<SkillGroup[]> {
  return skillGroups;
}
