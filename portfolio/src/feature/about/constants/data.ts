import type { StatItem } from '../types/about';

export const STATS: StatItem[] = [
    { value: 7, suffix: '+', label: 'Projects Built', labelKey: 'about.stats.projects', iconKey: 'Rocket' },
    { value: 15, suffix: '+', label: 'Core Technologies', labelKey: 'about.stats.tech', iconKey: 'Layers' },
    { value: 2, suffix: '', label: 'Internships', labelKey: 'about.stats.internships', iconKey: 'TrendingUp' },
    { value: 4, suffix: '+', label: 'Programming Languages', labelKey: 'about.stats.languages', iconKey: 'Globe' },
];

export const PARTICLE_COLORS = [
    'rgba(249,115,22,0.9)',
    'rgba(234,88,12,0.7)',
    'rgba(253,186,116,0.5)',
    'rgba(255,237,213,0.3)',
] as const;