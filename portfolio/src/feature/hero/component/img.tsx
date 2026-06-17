import Image from 'next/image';

export function ProfileImage() {
  return (
    <div className="relative flex justify-center lg:justify-end items-center mt-4 lg:mt-0 order-1 lg:order-2 w-full mx-auto max-w-[260px] md:max-w-sm lg:max-w-none">
      {/* Optimized Background Glow - Reduced intensity and blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] md:w-[320px] md:h-[320px] lg:w-[350px] lg:h-[350px] bg-orange-500 rounded-full blur-xl -z-10 pointer-events-none opacity-20 transition-all duration-300"></div>
      
      <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-[400px] xl:h-[400px] rounded-full p-1.5 lg:p-2 border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/20 z-10 shadow-sm transition-all duration-300">
        <div className="w-full h-full rounded-full bg-gray-100 dark:bg-neutral-900 overflow-hidden relative flex items-center justify-center">
          <Image 
            src="/images/profile.jpeg" 
            alt="Morgorn profile" 
            fill
            priority
            sizes="(max-w-768px) 224px, (max-w-1024px) 288px, (max-w-1200px) 320px, 400px"
            className="object-cover transition-transform duration-300 ease-out hover:scale-[1.02]"
          />
        </div>
      </div>

    </div>
  );
}
