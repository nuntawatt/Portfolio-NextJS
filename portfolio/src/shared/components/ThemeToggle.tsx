'use client';

import { useTheme } from '../hooks/useTheme';
import { Switch } from '@/animation/components/switch';
import { Moon, Sun } from 'lucide-react';

// Fix the theme toggle
export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  const isDark = mounted ? theme === 'dark' : false;

  return (
    <div
      className={`flex items-center gap-x-2 bg-gray-100 dark:bg-neutral-900 px-3 py-2 rounded-full border border-gray-200 dark:border-white/10 transition-opacity duration-300 ${!mounted ? 'opacity-50' : 'opacity-100'}`}
      suppressHydrationWarning
    >
      <Sun className={`w-4 h-4 transition-colors duration-300 ease-out ${!isDark ? 'text-orange-500' : 'text-gray-400'}`} />
      <Switch
        checked={isDark}
        onCheckedChange={() => toggleTheme()}
        aria-label="Toggle theme"
        nativeButton={true}
      />
      <Moon className={`w-4 h-4 transition-colors duration-300 ease-out ${isDark ? 'text-purple-400' : 'text-gray-400'}`} />
    </div>
  );
}
