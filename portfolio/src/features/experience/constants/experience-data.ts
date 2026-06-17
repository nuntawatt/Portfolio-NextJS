export interface Experience {
  period: string;
  type: 'internship' | 'project' | 'academic' | 'work';
  title: string;
  company: string;
  desc: string;
  tags: string[];
}

export const EXPERIENCES: Experience[] = [
  {
    period: '2026',
    type: 'work',
    title: 'Face Attendance System',
    company: 'Access Thai Intelligent Technology',
    desc: 'Developed an AI-based face recognition attendance system for automated attendance tracking. Implemented real-time face detection and recognition workflows using OpenCV and computer vision techniques. Designed backend APIs and database operations for attendance management and user records. Built responsive web interfaces and integrated real-time camera processing.',
    tags: ['Python', 'OpenCV', 'FastAPI', 'PostgreSQL', 'Docker', 'Minio'],
  },
  {
    period: '2026',
    type: 'internship',
    title: 'Intelligent Learning Platform',
    company: 'Woxa Corporation (Internship)',
    desc: 'Developed a microservices-based RESTful API backend using NestJS, PostgreSQL, Redis, Docker, and AWS for a gamified online learning platform. Integrated AI LLaMA 3 for automatic quiz generation and implemented WebSocket for real-time user activity tracking. Configured Google OAuth 2.0 for secure authentication.',
    tags: ['NestJS', 'PostgreSQL', 'Redis', 'Docker', 'CI/CD', 'APISIX', 'AWS'],
  },
  {
    period: '2025',
    type: 'internship',
    title: 'CCTV Monitoring System',
    company: 'NT Khon Kaen (Internship)',
    desc: 'Developed a real-time CCTV monitoring system for people detection and alert notifications. Implemented computer vision processing using YOLO and OpenCV for object detection workflows. Integrated RTSP streaming for real-time camera monitoring and analytics. Optimized detection performance for low-latency video processing.',
    tags: ['Python', 'OpenCV', 'YOLO', 'RTSP'],
  },
];
