import type { StatItem } from '../types/about';

// STATS: ข้อมูลสถิติต่างๆ สำหรับการ์ดแสดงผลสถิติในส่วนประวัติ (เช่น จำนวนโปรเจกต์, ภาษา, เทคโนโลยี)
export const STATS: StatItem[] = [
    { value: 7, suffix: '+', label: 'Projects Built', labelKey: 'about.stats.projects', iconKey: 'Rocket' },
    { value: 15, suffix: '+', label: 'Core Technologies', labelKey: 'about.stats.tech', iconKey: 'Layers' },
    { value: 2, suffix: '', label: 'Internships', labelKey: 'about.stats.internships', iconKey: 'TrendingUp' },
    { value: 4, suffix: '+', label: 'Programming Languages', labelKey: 'about.stats.languages', iconKey: 'Globe' },
];

// PARTICLE_COLORS: ชุดสีที่ใช้สำหรับอนุภาค (Particles) ในส่วนพื้นหลังแบบเคลื่อนไหว
export const PARTICLE_COLORS = [
    'rgba(249,115,22,0.9)',
    'rgba(234,88,12,0.7)',
    'rgba(253,186,116,0.5)',
    'rgba(255,237,213,0.3)',
] as const;