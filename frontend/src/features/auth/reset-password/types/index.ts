import { z } from 'zod';

// Schema สำหรับตรวจสอบข้อมูลรหัสผ่านใหม่ที่พิมพ์เข้ามา (ความยาวอย่างน้อย 6 ตัวอักษร และต้องตรงกัน)
export const resetPasswordSchema = z.object({
  password: z.string().min(6, 'auth.validation.password_min'),
  confirmPassword: z.string().min(1, 'auth.validation.confirm_password_required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "auth.validation.password_mismatch",
  path: ["confirmPassword"],
});

// ประเภทข้อมูลสำหรับส่งไปรีเซ็ตรหัสผ่าน
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
