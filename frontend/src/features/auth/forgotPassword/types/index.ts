import { z } from 'zod';

// Schema สำหรับตรวจสอบข้อมูลเมื่อยื่นขอลืมรหัสผ่าน (ตรวจความถูกต้องของอีเมล)
export const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'auth.validation.email_required').email('auth.validation.email_invalid'),
});

// ประเภทข้อมูลสำหรับแบบฟอร์มลืมรหัสผ่าน
export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
