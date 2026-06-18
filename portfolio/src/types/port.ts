export type Project = {
  id: string;
  title: string;
  description: string;
  techStack: string[];
};

export type Skill = {
  id: string;
  name: string;
};

export type SkillGroup = {
  id: string;
  title: string;
  skills: Skill[];
};
