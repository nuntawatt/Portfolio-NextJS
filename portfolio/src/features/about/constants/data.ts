import type { StatItem, SkillItem, ExperienceItem } from '../types/about';

export const STATS: StatItem[] = [
    { value: 6, suffix: '+', label: 'Projects Built', iconKey: 'Rocket' },
    { value: 3, suffix: '', label: 'Tech Stacks', iconKey: 'Layers' },
    { value: 40, suffix: '%', label: 'Efficiency Gained', iconKey: 'TrendingUp' },
    { value: 3, suffix: '', label: 'Languages', iconKey: 'Globe' },
];

export const SKILLS: SkillItem[] = [
    // Frontend
    { label: 'HTML5', level: 5 },
    { label: 'CSS3', level: 5 },
    { label: 'JavaScript', level: 5 },
    { label: 'TypeScript', level: 4 },
    { label: 'React', level: 5 },
    { label: 'Next.js', level: 5 },
    { label: 'Vite', level: 4 },
    { label: 'Tailwind CSS', level: 5 },
    { label: 'Bootstrap', level: 4 },
    // Backend
    { label: 'Node.js', level: 4 },
    { label: 'Express', level: 4 },
    { label: 'RESTful API', level: 4 },
    { label: 'WebSocket', level: 3 },
    { label: 'gRPC', level: 3 },
    // Database & Cloud
    { label: 'MongoDB', level: 3 },
    { label: 'PostgreSQL', level: 3 },
    { label: 'MySQL', level: 4 },
    { label: 'Firebase', level: 3 },
    { label: 'Google Cloud', level: 3 },
    // Tools
    { label: 'GitHub', level: 5 },
    { label: 'Visual Studio Code', level: 5 },
    { label: 'Figma', level: 4 },
    { label: 'Postman', level: 4 },
];

export const EXPERIENCES: ExperienceItem[] = [
    {
        period: '2025',
        type: 'internship',
        title: 'People Detection System',
        company: 'NT Khon Kaen — Internship',
        desc: 'Built a real-time people-detection pipeline with YOLOv5 and Python consuming live RTSP streams from CCTV cameras. Designed the monitoring UI using Tailwind CSS.',
        tags: ['YOLOv5', 'Python', 'RTSP', 'Tailwind CSS'],
    },
    {
        period: '2024',
        type: 'project',
        title: 'Shopping Cart System',
        company: 'Personal Project',
        desc: 'Responsive shopping cart built with Next.js featuring real-time cart updates, optimised state management, and a consistent UX across all viewport sizes.',
        tags: ['Next.js', 'React', 'State Management'],
    },
    {
        period: '2024',
        type: 'project',
        title: 'Weather Forecast Application',
        company: 'Personal Project',
        desc: 'React application consuming the OpenWeather API with search functionality, HTML5 Geolocation, and a fully responsive layout for mobile and desktop.',
        tags: ['React', 'OpenWeather API', 'Geolocation'],
    },
    {
        period: '2023',
        type: 'project',
        title: 'Student Activity Registration',
        company: 'Academic Project',
        desc: 'Web platform with PHP, MySQL, and Bootstrap that centralised event registrations and provided an admin dashboard, improving registration efficiency by 40%.',
        tags: ['PHP', 'MySQL', 'Bootstrap'],
    },
    {
        period: '2023',
        type: 'project',
        title: 'E-commerce Platform & Admin Dashboard',
        company: 'Academic Project',
        desc: 'Full-stack PHP/MySQL IT-product store with secure payment flow, inventory management, order tracking, and a dedicated admin control panel.',
        tags: ['PHP', 'MySQL', 'Admin Dashboard'],
    },
    {
        period: '2023',
        type: 'project',
        title: 'Restaurant Seat Reservation System',
        company: 'Academic Project',
        desc: 'C# desktop application that streamlined seating management, reduced overbooking incidents, and enforced role-based access for staff and customers.',
        tags: ['C#', 'Role-based Access'],
    },
];

export const PARTICLE_COLORS = [
    'rgba(249,115,22,0.9)',
    'rgba(234,88,12,0.7)',
    'rgba(253,186,116,0.5)',
    'rgba(255,237,213,0.3)',
] as const;