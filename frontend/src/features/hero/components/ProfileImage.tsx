'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';

// ProfileImage: คอมโพเนนต์แสดงรูปภาพโปรไฟล์ในกรอบวงกลม พร้อมพื้นหลังเรืองแสงสีส้มและอนิเมชันซูมเมื่อชี้เมาส์
export function ProfileImage() {
  // Accessibility: skip animations if user prefers reduced motion
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative flex justify-center lg:justify-end items-center mt-4 lg:mt-0 order-1 lg:order-2 w-full mx-auto max-w-[260px] md:max-w-sm lg:max-w-none">
      {/* Optimized Background Glow - Reduced intensity and blur */}
      <motion.div
        animate={
          prefersReducedMotion
            ? {}
            : { opacity: [0.15, 0.25, 0.15] }
        }
        transition={
          prefersReducedMotion
            ? {}
            : { duration: 4, ease: 'easeInOut', repeat: Infinity }
        }
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] md:w-[320px] md:h-[320px] lg:w-[350px] lg:h-[350px] bg-orange-500 rounded-full blur-xl -z-10 pointer-events-none opacity-20 transition-all duration-300"
      ></motion.div>
      
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={
          prefersReducedMotion
            ? {}
            : { delay: 0.3, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }
        }
      >
        <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-[400px] xl:h-[400px] rounded-full bg-gray-100 dark:bg-neutral-900 overflow-hidden z-10 shadow-sm transition-all duration-300">
          <Image 
            src="/images/profile.jpeg" 
            alt="Morgorn profile" 
            fill
            priority
            sizes="(max-width: 768px) 224px, (max-width: 1024px) 288px, (max-width: 1200px) 320px, 400px"
            className="object-cover transition-transform duration-300 ease-out hover:scale-[1.02]"
          />
        </div>
      </motion.div>

    </div>
  );
}
