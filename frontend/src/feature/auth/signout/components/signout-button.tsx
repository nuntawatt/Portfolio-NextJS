'use client';

import React from 'react';
import { useSignOut } from '../hooks/use-signout';

// ไอคอนปุ่ม Sign Out สไตล์ Pixel Art
function PixelSignOutIcon({ className }: { className?: string }) {
  const width = 12;
  const height = 11;
  const grid = [
    "bbbbbbb.....",
    "b.....b.....",
    "b.....b...a.",
    "b.....b..aa.",
    "b.....baaaaa",
    "b.....aaaaaa",
    "b.....baaaaa",
    "b.....b..aa.",
    "b.....b...a.",
    "b.....b.....",
    "bbbbbbb....."
  ];

  const colors: Record<string, string> = {
    'b': '#ef4444', // Red border/arrow body color
    'a': '#ef4444',
  };

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      shapeRendering="crispEdges"
    >
      {grid.map((row, y) =>
        row.split('').map((char, x) => {
          const color = colors[char];
          if (!color) return null;
          return (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width={1}
              height={1}
              fill={color}
            />
          );
        })
      )}
    </svg>
  );
}

interface SignOutButtonProps {
  variant?: 'desktop' | 'mobile';
  onSignOut?: () => void;
}

// คอมโพเนนต์ปุ่มออกจากระบบ (Sign Out Button)
export function SignOutButton({ variant = 'desktop', onSignOut }: SignOutButtonProps) {
  const { signOut, isLoading } = useSignOut();

  const handleSignOutClick = async () => {
    onSignOut?.();
    await signOut();
  };

  if (variant === 'mobile') {
    return (
      <button
        onClick={handleSignOutClick}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-3 px-3 py-2.5 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-500/10 rounded transition-colors duration-200 cursor-pointer border border-dashed border-red-500/20 hover:border-red-500/40 disabled:opacity-50"
      >
        <PixelSignOutIcon className="w-4 h-[12px]" />
        <span>{isLoading ? 'Signing Out...' : 'Sign Out'}</span>
      </button>
    );
  }

  return (
    <button
      role="menuitem"
      onClick={handleSignOutClick}
      disabled={isLoading}
      className="w-full flex items-center justify-start gap-3 px-3 py-2 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-500/10 rounded transition-colors duration-200 cursor-pointer disabled:opacity-50"
    >
      <PixelSignOutIcon className="w-4 h-[12px]" />
      <span>{isLoading ? 'Signing Out...' : 'Sign Out'}</span>
    </button>
  );
}
