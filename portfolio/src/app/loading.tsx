import Image from 'next/image';
import { siteConfig } from '@/config/site';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gray-50/50 dark:bg-[#0a0a0a]/50 backdrop-blur-md">
      <div className="relative p-8 rounded-3xl bg-white/80 dark:bg-zinc-900/80 border border-gray-100 dark:border-white/10 shadow-2xl backdrop-blur-xl max-w-sm w-full mx-4 flex flex-col items-center justify-center text-center space-y-6">
        {/* Animated outer ring */}
        <div className="absolute inset-0 rounded-3xl border border-orange-500/10 pointer-events-none" />

        <div className="relative w-48 h-48 overflow-hidden rounded-2xl border border-gray-100 dark:border-white/5 bg-gray-100 dark:bg-zinc-800">
          <Image
            src={siteConfig.animations.loading}
            alt="Loading..."
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>
        <div className="space-y-2 select-none">
          <h3 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white animate-pulse">
            Loading Portfolio...
          </h3>
          <p className="text-xs text-orange-500 dark:text-orange-400 font-mono font-medium tracking-wide">
            Connecting to Morgorn
          </p>
        </div>
      </div>
    </div>
  );
}

