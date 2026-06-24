import { z } from 'zod';

// Schema สำหรับตรวจสอบข้อมูลตอนเข้าสู่ระบบ (Sign In Validation)
export const signInSchema = z.object({
    email: z.string().min(1, 'auth.validation.email_required').email('auth.validation.email_invalid'),
    password: z.string().min(1, 'auth.validation.password_required').min(6, 'auth.validation.password_min'),
    rememberMe: z.boolean().optional(),
});

// ประเภทข้อมูล (Type) สำหรับการเข้าสู่ระบบ ที่แปลงจาก Zod Schema
export type SignInData = z.infer<typeof signInSchema>;
