import React from 'react';
import Image from 'next/image';
import { StatsCard } from './StatsCard';

export function ProfileImage() {
  return (
    <div className="relative flex justify-center lg:justify-end items-center mt-12 lg:mt-0 order-1 lg:order-2 w-full mx-auto md:max-w-md lg:max-w-none">
      {/* Optimized Background Glow - Reduced intensity and blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[350px] md:h-[350px] bg-orange-500 rounded-full blur-xl -z-10 pointer-events-none opacity-20"></div>
      
      <div className="relative w-64 h-64 md:w-80 md:h-80 xl:w-[400px] xl:h-[400px] rounded-full p-2 border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/20 z-10 shadow-sm">
        <div className="w-full h-full rounded-full bg-gray-100 dark:bg-neutral-900 overflow-hidden relative flex items-center justify-center">
          <Image 
            src="/images/profile.jpeg" 
            alt="Morgorn profile" 
            fill
            priority
            sizes="(max-w-768px) 256px, (max-w-1200px) 320px, 400px"
            className="object-cover transition-transform duration-300 ease-out hover:scale-[1.02]"
          />
        </div>
      </div>

      {/* Put back the mini badges, but keeping them completely static with NO hover animations */}
      {/* <StatsCard 
        value="1" 
        label={<>Years<br/>Experience</>} 
        className="absolute -bottom-4 -left-2 md:-bottom-4 md:-left-4 lg:-left-12 max-w-[180px] md:max-w-[220px] z-20 m-0 transition-none" 
      /> */}
      
      {/* Secondary mini float - No hovers */}
     
    </div>
  );
}
