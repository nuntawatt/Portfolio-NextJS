import { AuthCallback } from '@/feature/auth/components/AuthCallback';

export const metadata = {
  title: 'Auth Callback - Morgorn Portfolio',
  description: 'Authentication callback page for handling OAuth responses.',
};

export default function AuthCallbackPage() {
  return <AuthCallback />;
}
