import * as Joi from 'joi';

/**
 * ตัวตรวจสอบความถูกต้องของไฟล์ .env (Joi Validation Schema)
 * หน้าที่ของไฟล์นี้คือเช็คว่าเราลืมใส่ค่าใน .env ก่อนที่เซิร์ฟเวอร์จะรันหรือไม่
 * (ถ้าลืมใส่ ระบบจะแจ้ง Error ตั้งแต่ตอน Start Server เลย)
 */
export const validationSchema = Joi.object({
  // ==========================================
  // ตั้งค่าพื้นฐานของโปรเจกต์
  // ==========================================
  PORT: Joi.number().required(),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .required(),
  FRONTEND_URL: Joi.string().uri().required(),
  API_URL: Joi.string().uri().optional(),

  // ==========================================
  // ตั้งค่าฐานข้อมูล (Prisma)
  // ==========================================
  // บังคับให้ต้องมี DATABASE_URL เพื่อเชื่อมต่อ Postgres
  DATABASE_URL: Joi.string().required(),

  // ==========================================
  // ความปลอดภัย (JWT)
  // ==========================================
  JWT_SECRET: Joi.string().required().min(8),
  JWT_REFRESH_SECRET: Joi.string().required().min(8),
  JWT_ACCESS_EXPIRES_IN: Joi.string().required(),
  JWT_REFRESH_EXPIRES_IN: Joi.string().required(),

  // ==========================================
  // อีเมล (Resend)
  // ==========================================
  RESEND_API_KEY: Joi.string().required(),
  MAIL_FROM: Joi.string().required(),

  // ==========================================
  // ระบบล็อกอินด้วย Google OAuth
  // ==========================================
  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_CLIENT_SECRET: Joi.string().required(),
  GOOGLE_CALLBACK_URL: Joi.string().uri().required(),

  // ==========================================
  // ระบบล็อกอินด้วย GitHub OAuth
  // ==========================================
  GITHUB_CLIENT_ID: Joi.string().required(),
  GITHUB_CLIENT_SECRET: Joi.string().required(),
  GITHUB_CALLBACK_URL: Joi.string().uri().required(),

  // ==========================================
  // สตอเรจเก็บไฟล์ (MinIO / Supabase S3)
  // ==========================================
  MINIO_ENDPOINT: Joi.string().required(),
  MINIO_PORT: Joi.number().required(),
  MINIO_USE_SSL: Joi.boolean().required(),
  MINIO_ACCESS_KEY: Joi.string().required(),
  MINIO_SECRET_KEY: Joi.string().required(),
  MINIO_BUCKET_NAME: Joi.string().required(),
  MINIO_PUBLIC_URL: Joi.string().uri().optional(), // อาจจะไม่มีกรณีใช้ MinIO ธรรมดา

  // ==========================================
  // ตั้งค่า Redis (ถ้ามีใช้งาน)
  // ==========================================
  REDIS_HOST: Joi.string().optional(),
  REDIS_PORT: Joi.number().optional(),
});
