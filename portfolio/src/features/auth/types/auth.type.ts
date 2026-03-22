import { z } from 'zod';
import { signInSchema, signUpSchema } from '../schemas/auth.schema';

export type SignInData = z.infer<typeof signInSchema>;
export type SignUpData = z.infer<typeof signUpSchema>;

export interface AuthUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  token: string;
}

export interface AuthResponse {
  user: AuthUser;
  message: string;
}
