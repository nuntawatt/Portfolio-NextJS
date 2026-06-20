import { z } from 'zod';

// ========== Schemas ==========
export const signInSchema = z.object({
    email: z.string().min(1, 'auth.validation.email_required').email('auth.validation.email_invalid'),
    password: z.string().min(1, 'auth.validation.password_required').min(6, 'auth.validation.password_min'),
    rememberMe: z.boolean().optional(),
});

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
export type SignInData = z.infer<typeof signInSchema>;
export type SignUpData = z.infer<typeof signUpSchema>;

export interface AuthUser {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    token: string;
    avatar?: string;
}

export interface AuthResponse {
    user: AuthUser;
    message: string;
}
