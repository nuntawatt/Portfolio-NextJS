import { z } from 'zod';

// ========== Schemas ==========
// Schema สำหรับตรวจสอบข้อมูลตอนเข้าสู่ระบบ (Sign In Validation)
export const signInSchema = z.object({
    email: z.string().min(1, 'auth.validation.email_required').email('auth.validation.email_invalid'),
    password: z.string().min(1, 'auth.validation.password_required').min(6, 'auth.validation.password_min'),
    rememberMe: z.boolean().optional(),
});

// Schema สำหรับตรวจสอบข้อมูลตอนสมัครสมาชิก (Sign Up Validation) พร้อมเปรียบเทียบรหัสผ่านทั้งสองช่อง
export const signUpSchema = z.object({
    firstName: z.string().min(2, 'auth.validation.firstname_min'),
    lastName: z.string().min(2, 'auth.validation.lastname_min'),
    email: z.string().min(1, 'auth.validation.email_required').email('auth.validation.email_invalid'),
    password: z.string().min(6, 'auth.validation.password_min'),
    confirmPassword: z.string().min(1, 'auth.validation.confirm_password_required'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "auth.validation.password_mismatch",
    path: ["confirmPassword"],
});

// ========== Types ==========
// ประเภทข้อมูล (Type) สำหรับการเข้าสู่ระบบ ที่แปลงจาก Zod Schema
export type SignInData = z.infer<typeof signInSchema>;
// ประเภทข้อมูล (Type) สำหรับการลงทะเบียน ที่แปลงจาก Zod Schema
export type SignUpData = z.infer<typeof signUpSchema>;

// อินเทอร์เฟสระบุรูปแบบข้อมูลผู้ใช้หลังจากล็อกอินสำเร็จ
export interface AuthUser {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    token: string;
    avatar?: string;
}

// อินเทอร์เฟสการตอบกลับจาก API ของการยืนยันตัวตน (Authentication Response)
export interface AuthResponse {
    user: AuthUser;
    message: string;
}
