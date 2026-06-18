import type { StatItem, ExperienceItem } from '../types/about';

export const STATS: StatItem[] = [
    { value: 6, suffix: '+', label: 'Projects Built', labelKey: 'about.stats.projects', iconKey: 'Rocket' },
    { value: 3, suffix: '', label: 'Tech Stacks', labelKey: 'about.stats.tech', iconKey: 'Layers' },
    { value: 40, suffix: '%', label: 'Efficiency Gained', labelKey: 'about.stats.efficiency', iconKey: 'TrendingUp' },
    { value: 3, suffix: '', label: 'Languages', labelKey: 'about.stats.languages', iconKey: 'Globe' },
];

export const EXPERIENCES: ExperienceItem[] = [
    {
        period: '2026',
        type: 'project',
        title: 'Face Attendance System',
        company: 'Access Thai Intelligent Technology',
        desc: 'Developed an AI-based face recognition attendance system for automated attendance tracking. Implemented real-time face detection/recognition workflows using OpenCV and computer vision. Designed backend APIs and database operations.',
        tags: ['Python', 'OpenCV', 'FastAPI', 'PostgreSQL', 'Docker', 'Minio'],
    },
    {
        period: '2026',
        type: 'internship',
        title: 'Intelligent Learning Platform',
        company: 'Woxa Corporation - Internship',
        desc: 'Developed a microservices-based RESTful API backend using NestJS, PostgreSQL, Redis, Docker, and AWS for an online learning platform. Integrated AI LLaMA 3 for automatic quiz generation and implemented WebSocket for real-time tracking.',
        tags: ['NestJS', 'PostgreSQL', 'Redis', 'Docker', 'CI/CD', 'APISIX', 'AWS'],
    },
    {
        period: '2025',
        type: 'internship',
        title: 'CCTV Monitoring System',
        company: 'NT Khon Kaen - Internship',
        desc: 'Developed a real-time CCTV monitoring system for people detection and alert notifications. Implemented computer vision processing using YOLO and OpenCV for object detection workflows. Integrated RTSP streaming.',
        tags: ['Python', 'OpenCV', 'YOLO', 'RTSP'],
    },
];

export const PARTICLE_COLORS = [
    'rgba(249,115,22,0.9)',
    'rgba(234,88,12,0.7)',
    'rgba(253,186,116,0.5)',
    'rgba(255,237,213,0.3)',
] as const;