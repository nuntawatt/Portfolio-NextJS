import { AuthContainer } from '@/features/auth';

export const metadata = {
  title: 'Authentication — Morgorn Portfolio',
  description: 'Sign in or create an account to access the full portfolio experience.',
};

export default function AuthPage() {
  return (
    <main className="min-h-screen flex overflow-hidden relative">
      {/* ── Left branding panel (hidden on mobile) ── */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a] overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-orange-500/20 rounded-full blur-[120px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-orange-600/15 rounded-full blur-[100px] animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-400/10 rounded-full blur-[150px] pointer-events-none" />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: [
              'linear-gradient(rgba(249,115,22,0.05) 1px, transparent 1px)',
              'linear-gradient(90deg, rgba(249,115,22,0.05) 1px, transparent 1px)',
            ].join(', '),
            backgroundSize: '40px 40px',
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-md px-12 text-center">
          {/* Logo */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-2xl shadow-orange-500/40 mb-8">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m18 16 4-4-4-4" />
              <path d="m6 8-4 4 4 4" />
              <path d="m14.5 4-5 16" />
            </svg>
          </div>

          <h1 className="text-4xl font-black text-white mb-4 tracking-tight">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              Morgorn
            </span>
          </h1>

          <p className="text-gray-400 text-base leading-relaxed mb-10">
            Full-stack developer portfolio showcasing scalable backend services, modern frontend applications, and creative solutions.
          </p>

          {/* Feature highlights */}
          <div className="space-y-4 text-left">
            {[
              { text: 'Explore real-world projects and case studies' },
              { text: 'Connect and collaborate on exciting ideas' },
              { text: 'Track your favorite projects and updates' },
            ].map((feature) => (
              <div key={feature.text} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <span className="text-sm text-gray-300">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Bottom quote */}
          <div className="mt-12 pt-8 border-t border-white/[0.06]">
            <p className="text-sm text-gray-500 italic">
              &ldquo;Clean architecture, performance, and code that is maintainable long after handoff.&rdquo;
            </p>
            <p className="text-xs text-orange-500/70 mt-2 font-semibold">Nuntawat Sae-Huam</p>
          </div>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-b from-gray-50/50 to-white dark:from-[#0a0a0a] dark:to-[#0a0a0a] relative">
        {/* Subtle background orbs */}
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-orange-500/5 dark:bg-orange-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/5 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

        <div className="w-full max-w-md px-6 sm:px-8 py-12 relative z-10">
          {/* Mobile logo (visible only on small screens) */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/30 mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m18 16 4-4-4-4" />
                <path d="m6 8-4 4 4 4" />
                <path d="m14.5 4-5 16" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Morgorn <span className="text-orange-500">Portfolio</span>
            </h2>
          </div>

          <AuthContainer />
        </div>
      </div>
    </main>
  );
}
