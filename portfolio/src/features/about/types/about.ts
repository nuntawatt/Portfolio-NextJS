export interface StatItem {
    value: number;
    suffix: string;
    label: string;
    iconKey: string;
}

export interface SkillItem {
    label: string;
    level: 1 | 2 | 3 | 4 | 5;
}

export type ExperienceType = 'internship' | 'project';

export interface ExperienceItem {
    period: string;
    type: ExperienceType;
    title: string;
    company: string;
    desc: string;
    tags: string[];
}

export interface ParticleData {
    x: number;
    y: number;
    z: number;
    vx: number;
    vy: number;
    vz: number;
    size: number;
    opacity: number;
    colorIdx: number;
}