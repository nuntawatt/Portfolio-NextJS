'use client';

import { Play, Pause } from 'lucide-react';
import { useAudio } from '../hooks/use-audio';
import { useTranslation } from '@/shared/providers/LanguageProvider';

export function AudioToggle() {
  const { playing, ready, toggle } = useAudio();
  const { t } = useTranslation();

  return (
    <>
      <style>{`
        @keyframes audio-bar {
          0%, 100% { transform: scaleY(0.35); }
          50%      { transform: scaleY(1); }
        }
        .audio-bar {
          width: 2.5px;
          border-radius: 1px;
          background: currentColor;
          transform-origin: center;
        }
        .audio-bar--playing {
          animation: audio-bar 0.9s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .audio-bar--playing { animation: none; transform: scaleY(0.7); }
        }
      `}</style>

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? (t('audio.pause_label') as string) : (t('audio.play_label') as string)}
        aria-pressed={playing}
        title={ready ? undefined : (t('audio.theme_song') as string)}
        className="relative flex items-center justify-center w-10 h-10 rounded-full
                   bg-gray-100 dark:bg-neutral-900 border border-gray-200 dark:border-white/10
                   text-muted-foreground hover:text-foreground
                   transition-colors duration-300 ease-out active:scale-95
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60"
      >
        {playing ? (
          <span className="flex items-center justify-center">
            <Pause className="w-[18px] h-[18px] transition-transform duration-300 absolute opacity-0" strokeWidth={1.75} fill="currentColor" />
            <span className="flex items-end gap-[2.5px] h-[14px]" aria-hidden="true">
              <span className="audio-bar audio-bar--playing h-2" style={{ animationDelay: '0ms' }} />
              <span className="audio-bar audio-bar--playing h-[14px]" style={{ animationDelay: '150ms' }} />
              <span className="audio-bar audio-bar--playing h-2.5" style={{ animationDelay: '300ms' }} />
            </span>
          </span>
        ) : (
          <Play className="w-[18px] h-[18px] translate-x-[1px] transition-transform duration-300" strokeWidth={1.75} fill="currentColor" />
        )}
      </button>
    </>
  );
}
