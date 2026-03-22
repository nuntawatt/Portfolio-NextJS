import React from 'react';
import { Navbar } from '@/features/portfolio/components/Navbar';
import { Footer } from '@/features/portfolio/components/Footer';

function Shimmer({ className }: { className?: string }) {
  return (
    <div className={`animate-gradient bg-gray-200 dark:bg-white/5 ${className}`} />
  );
}

export default function Loading() {
  return (
    <div className="relative overflow-hidden w-full">
      <Navbar />

      <main className="flex flex-col w-full relative z-10 pt-10">
        
        {/* Exact Hero Section Skeleton */}
        <section className="pt-28 md:pt-36 pb-20 md:pb-28 lg:pb-36 overflow-hidden relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
              
              {/* Left Column - Text */}
              <div className="space-y-8 lg:space-y-10 z-10 order-2 lg:order-1 px-4 md:px-12 lg:px-0">
                <div className="space-y-5 lg:space-y-6 flex flex-col items-center lg:items-start">
                  <Shimmer className="w-32 h-5 lg:h-6 rounded-md" />
                  <Shimmer className="w-3/4 h-12 md:h-16 lg:h-20 rounded-xl" />
                  <Shimmer className="w-1/2 h-8 lg:h-10 rounded-lg" />
                  <Shimmer className="w-full max-w-lg h-24 lg:h-32 rounded-xl" />
                </div>
                
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4 lg:pt-2">
                  <Shimmer className="w-full sm:w-40 h-12 lg:h-14 rounded-full" />
                  <Shimmer className="w-full sm:w-40 h-12 lg:h-14 rounded-full" />
                </div>
                
                <div className="flex items-center justify-center lg:justify-start gap-6 pt-4 lg:pt-8">
                  <Shimmer className="w-10 h-10 lg:w-12 lg:h-12 rounded-full" />
                  <Shimmer className="w-10 h-10 lg:w-12 lg:h-12 rounded-full" />
                  <Shimmer className="w-10 h-10 lg:w-12 lg:h-12 rounded-full" />
                </div>
              </div>
              
              {/* Profile Image Skeleton */}
              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <Shimmer className="w-64 h-64 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px] rounded-full" />
              </div>

            </div>
          </div>
        </section>

        {/* exact About Section Skeleton */}
        <section className="py-16 md:py-20 bg-gray-50/50 dark:bg-black/20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16">
              <Shimmer className="w-48 h-10 mx-auto rounded-xl" />
              <Shimmer className="w-16 h-1 mx-auto mt-4 rounded-full" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="relative group">
                <Shimmer className="w-full aspect-square rounded-[2rem]" />
              </div>
              
              <div className="space-y-6">
                <Shimmer className="w-full h-8 rounded-lg" />
                <Shimmer className="w-full h-8 rounded-lg" />
                <Shimmer className="w-3/4 h-8 rounded-lg" />
                
                <div className="grid grid-cols-2 gap-4 pt-6">
                  <Shimmer className="h-24 rounded-2xl" />
                  <Shimmer className="h-24 rounded-2xl" />
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
