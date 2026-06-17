import { PrismaClient, ContentStatus } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

// Construct DATABASE_URL dynamically for Prisma CLI seeding
const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || '5432';
const username = process.env.DB_USERNAME || 'postgres';
const password = process.env.DB_PASSWORD || '';
const database = process.env.DB_DATABASE || 'portfolio';
process.env.DATABASE_URL = `postgresql://${username}:${password}@${host}:${port}/${database}?schema=public`;

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Admin User
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@portfolio.dev' },
    update: {},
    create: {
      email: 'admin@portfolio.dev',
      password: adminPassword,
      firstName: 'Nuntawat',
      lastName: 'Seahuam',
      role: 'ADMIN',
      isEmailVerified: true,
    },
  });
  console.log(`  Admin user: ${admin.email}`);

  // Skills
  const skills = [
    // Backend
    { name: 'Node.js', category: 'Backend', icon: 'nodejs', proficiency: 90, order: 1, featured: true },
    { name: 'NestJS', category: 'Backend', icon: 'nestjs', proficiency: 85, order: 2, featured: true },
    { name: 'Go', category: 'Backend', icon: 'go', proficiency: 70, order: 3, featured: true },
    { name: 'Express.js', category: 'Backend', icon: 'express', proficiency: 85, order: 4 },
    // Frontend
    { name: 'React', category: 'Frontend', icon: 'react', proficiency: 85, order: 1, featured: true },
    { name: 'Next.js', category: 'Frontend', icon: 'nextjs', proficiency: 80, order: 2, featured: true },
    { name: 'TypeScript', category: 'Frontend', icon: 'typescript', proficiency: 90, order: 3, featured: true },
    { name: 'Tailwind CSS', category: 'Frontend', icon: 'tailwind', proficiency: 90, order: 4 },
    // Database
    { name: 'PostgreSQL', category: 'Database', icon: 'postgresql', proficiency: 85, order: 1, featured: true },
    { name: 'MongoDB', category: 'Database', icon: 'mongodb', proficiency: 75, order: 2 },
    { name: 'Redis', category: 'Database', icon: 'redis', proficiency: 70, order: 3 },
    { name: 'Prisma', category: 'Database', icon: 'prisma', proficiency: 85, order: 4 },
    // DevOps
    { name: 'Docker', category: 'DevOps', icon: 'docker', proficiency: 80, order: 1, featured: true },
    { name: 'Git', category: 'DevOps', icon: 'git', proficiency: 90, order: 2 },
    { name: 'Linux', category: 'DevOps', icon: 'linux', proficiency: 75, order: 3 },
    { name: 'CI/CD', category: 'DevOps', icon: 'cicd', proficiency: 70, order: 4 },
  ];

  for (const skill of skills) {
    await prisma.skill.upsert({
      where: { id: skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-') },
      update: skill,
      create: {
        ...skill,
        featured: skill.featured ?? false,
      },
    });
  }
  console.log(`  Skills: ${skills.length} seeded`);

  // Experiences
  const experiences = [
    {
      company: 'Freelance',
      position: 'Full Stack Developer',
      description: 'Building web applications for various clients using modern technologies like NestJS, Next.js, and PostgreSQL.',
      techStack: ['NestJS', 'Next.js', 'TypeScript', 'PostgreSQL', 'Docker'],
      startDate: new Date('2024-01-01'),
      current: true,
      order: 1,
    },
  ];

  for (const exp of experiences) {
    await prisma.experience.create({ data: exp });
  }
  console.log(`  Experiences: ${experiences.length} seeded`);

  // Project Tags
  const tags = [
    { name: 'Full Stack', slug: 'full-stack' },
    { name: 'Backend', slug: 'backend' },
    { name: 'Frontend', slug: 'frontend' },
    { name: 'API', slug: 'api' },
    { name: 'DevOps', slug: 'devops' },
    { name: 'Open Source', slug: 'open-source' },
  ];

  for (const tag of tags) {
    await prisma.projectTag.upsert({
      where: { slug: tag.slug },
      update: {},
      create: tag,
    });
  }
  console.log(`  Project tags: ${tags.length} seeded`);

  // Sample Projects
  const projects = [
    {
      title: 'Portfolio Platform',
      slug: 'portfolio-platform',
      description: 'A production-grade portfolio platform built with Next.js 16 and NestJS, featuring JWT auth, Prisma ORM, and a premium glassmorphism UI.',
      content: '## Overview\n\nThis portfolio platform showcases modern full-stack development practices...',
      techStack: ['Next.js', 'NestJS', 'Prisma', 'PostgreSQL', 'TypeScript', 'Tailwind CSS'],
      githubUrl: 'https://github.com/nuntawatt/Portfolio-NextJS',
      featured: true,
      status: ContentStatus.PUBLISHED,
      order: 1,
      authorId: admin.id,
    },
    {
      title: 'Face Attendance System',
      slug: 'face-attendance-system',
      description: 'An AI-powered attendance tracking system using facial recognition with real-time detection and admin dashboard.',
      content: '## Overview\n\nAutomated attendance tracking using computer vision...',
      techStack: ['Python', 'OpenCV', 'React', 'FastAPI', 'PostgreSQL'],
      githubUrl: 'https://github.com/nuntawatt/face-attendance-system',
      featured: true,
      status: ContentStatus.PUBLISHED,
      order: 2,
      authorId: admin.id,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: project,
    });
  }
  console.log(`  Projects: ${projects.length} seeded`);

  // Blog Categories
  const categories = [
    { name: 'Tutorial', slug: 'tutorial' },
    { name: 'DevOps', slug: 'devops' },
    { name: 'Backend', slug: 'backend' },
    { name: 'Frontend', slug: 'frontend' },
    { name: 'Career', slug: 'career' },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }
  console.log(`  Blog categories: ${categories.length} seeded`);

  // GitHub Profile
  await prisma.githubProfile.upsert({
    where: { username: 'nuntawatt' },
    update: {},
    create: {
      username: 'nuntawatt',
      data: {
        bio: 'Backend Engineer | Full Stack Developer',
        publicRepos: 15,
        followers: 10,
        following: 20,
      },
    },
  });
  console.log('  GitHub profile seeded');

  console.log('\nSeeding complete!');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
