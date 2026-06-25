import { z } from 'zod';

// Schema สำหรับตรวจสอบข้อมูลตอนสมัครสมาชิก (Sign Up Validation) พร้อมเปรียบเทียบรหัสผ่านทั้งสองช่อง
export const signUpSchema = z.object({
    firstName: z.string().min(2, 'auth.validation.firstname_min'),
    lastName: z.string().min(2, 'auth.validation.lastname_min'),
    email: z.string().min(1, 'auth.validation.email_required').email('auth.validation.email_invalid'),
    password: z.string().min(6, 'auth.validation.password_min'),
    confirmPassword: z.string().min(1, 'auth.validation.confirm_password_required'),
    agreeToTerms: z.boolean().refine((val) => val === true, 'auth.validation.terms_required'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "auth.validation.password_mismatch",
    path: ["confirmPassword"],
});

// ประเภทข้อมูล (Type) สำหรับการลงทะเบียน ที่แปลงจาก Zod Schema
export type SignUpData = z.infer<typeof signUpSchema>;
