import { AuthContainer } from '@/features/auth';

export const metadata = {
  title: 'Authentication | Morgorn',
  description: 'Sign in or create an account.',
};

export default function AuthPage() {
  return (
    <main className="min-h-screen pt-28 pb-16 flex items-center justify-center bg-gray-50/50 dark:bg-black/50 overflow-hidden relative">
      <div className="w-full max-w-md px-4 sm:px-0 relative z-10">
        <AuthContainer />
      </div>
      
      {/* Optional decorative background elements for the auth page */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 dark:bg-orange-500/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
    </main>
  );
}
