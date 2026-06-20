'use client';

import React from 'react';
import Image from 'next/image';
import { siteConfig } from '@/config/site';

interface LoadingCardProps {
  title?: string;
  subtitle?: string;
  className?: string;
  flat?: boolean;
}

export function LoadingCard({
  title = "Loading Portfolio...",
  subtitle = "Connecting to Morgorn",
  className = "",
  flat = false
}: LoadingCardProps) {
  return (
    <div 
      className={`relative flex flex-col items-center justify-center text-center space-y-6 ${
        flat 
          ? "w-full py-4" 
          : "p-8 rounded-3xl bg-white/80 dark:bg-[#111111]/85 border border-gray-100 dark:border-white/10 shadow-2xl backdrop-blur-xl max-w-sm w-full mx-auto"
      } ${className}`}
    >
      {/* Animated outer ring */}
      {!flat && <div className="absolute inset-0 rounded-3xl border border-orange-500/10 pointer-events-none" />}

      <div className="relative w-40 h-40 overflow-hidden rounded-2xl border border-gray-100 dark:border-white/5 bg-gray-100 dark:bg-zinc-800 shadow-md">
        <Image
          src={siteConfig.animations.loading}
          alt="Loading..."
          fill
          className="object-cover animate-in fade-in zoom-in-95 duration-300"
          priority
          unoptimized
        />
      </div>
      <div className="space-y-2 select-none">
        <h3 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white animate-pulse">
          {title}
        </h3>
        <p className="text-xs text-orange-500 dark:text-orange-400 font-mono font-medium tracking-wide">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

interface LoadingScreenProps extends LoadingCardProps {
  fullScreen?: boolean;
}

export function LoadingScreen({
  title,
  subtitle,
  fullScreen = true
}: LoadingScreenProps) {
  const card = <LoadingCard title={title} subtitle={subtitle} />;

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gray-50/50 dark:bg-[#0a0a0a]/50 backdrop-blur-md animate-in fade-in duration-300">
        {card}
      </div>
    );
  }

  return card;
}
