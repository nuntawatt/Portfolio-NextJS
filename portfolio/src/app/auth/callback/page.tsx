import { AuthCallback } from '@/feature/auth';

export const metadata = {
  title: 'Auth Callback',
  description: 'Authentication callback page for handling OAuth responses.',
};

export default function AuthCallbackPage() {
  return <AuthCallback />;
}
