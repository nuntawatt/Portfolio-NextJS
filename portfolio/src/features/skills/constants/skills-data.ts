export interface Skill {
  name: string;
  level: number; // 0 to 100
}

export interface SkillGroup {
  title: string;
  iconName: 'Monitor' | 'Cpu' | 'Database' | 'Wrench' | 'Users' | 'Palette';
  skills: Skill[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Frontend',
    iconName: 'Monitor',
    skills: [
      { name: 'Next.js', level: 90 },
      { name: 'React.js', level: 92 },
      { name: 'TypeScript', level: 88 },
      { name: 'JavaScript', level: 90 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'HTML5 & CSS3', level: 95 },
    ],
  },
  {
    title: 'Backend',
    iconName: 'Cpu',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'NestJS', level: 92 },
      { name: 'FastAPI', level: 85 },
      { name: 'Go', level: 80 },
    ],
  },
  {
    title: 'Database',
    iconName: 'Database',
    skills: [
      { name: 'PostgreSQL', level: 88 },
      { name: 'MongoDB', level: 85 },
      { name: 'Redis (caching)', level: 80 },
    ],
  },
  {
    title: 'DevOps & Cloud',
    iconName: 'Wrench',
    skills: [
      { name: 'Docker', level: 85 },
      { name: 'CI/CD (GitHub Actions)', level: 82 },
      { name: 'APISIX', level: 78 },
      { name: 'Nginx & Portainer', level: 80 },
      { name: 'AWS & Cloudflare', level: 80 },
    ],
  },
  {
    title: 'Tools & Workflow',
    iconName: 'Palette',
    skills: [
      { name: 'Git & GitHub', level: 90 },
      { name: 'Postman', level: 88 },
      { name: 'VS Code', level: 95 },
      { name: 'Figma', level: 80 },
    ],
  },
];
