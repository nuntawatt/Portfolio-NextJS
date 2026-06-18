import React from 'react';
import { Card } from '@/shared/components/Card';

interface StatsCardProps {
  value: string;
  label: React.ReactNode;
  className?: string;
}

export function StatsCard({ value, label, className = '' }: StatsCardProps) {
  return (
    <Card className={`p-4 md:p-5 flex items-center gap-3 md:gap-4 !bg-white/80 dark:!bg-white/5 ${className}`}>
      <div className="text-3xl md:text-4xl font-bold text-orange-500 leading-none drop-shadow-sm">{value}</div>
      <div className="text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-snug font-medium transition-colors">
        {label}
      </div>
    </Card>
  );
}
