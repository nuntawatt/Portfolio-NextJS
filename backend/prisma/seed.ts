import { PrismaClient } from '@prisma/client';
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
