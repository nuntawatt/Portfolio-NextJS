'use client';

import { useTheme } from '../hooks/useTheme';
import { useState } from 'react';

// Color map:
// . : transparent
// o : primary orange
// d : shadow dark orange
// w : white
// b : dark charcoal
// r : rosy cheek blush
// p : nightcap purple
// y : cap yellow

const AWAKE_GRID = [
  "....o....o....",
  "...ooo..ooo...",
  "..oooooooooo..",
  ".oooooooooooo.",
  "oowwoooowwoooo",
  "owwboowwbooooo",
  "ooodooodoooood",
  "oobrroobrroood",
  "ooobbbbbbooood",
  ".ooodddddddod.",
  "..ooddddddod..",
  "....dddddd...."
];

const SLEEPY_GRID = [
  ".....yy.......",
  "....pppp......",
  "...pppppp.....",
  "..ppoooooo....",
  ".ppooooooooo..",
  "ppooooooooooo.",
  "poobboooobbooo",
  "oooodoooodoooo",
  "ooodooodoooood",
  "oooodbbbbdoood",
  ".ooodddddddod.",
  "..ooddddddod..",
  "....dddddd...."
];

// คอมโพเนนต์แสดงมาสคอตสไตล์ Pixel-art จากตารางกริดที่กำหนด
function PixelMascot({ grid }: Readonly<{ grid: string[] }>) {
  const width = 14;
  const height = 12;

  const colors: Record<string, string> = {
    'o': '#f97316', // primary orange accent
    'd': '#ea580c', // shadow orange
    'w': '#ffffff', // eye white
    'b': '#1e293b', // charcoal
    'r': '#f43f5e', // rosy blush
    'p': '#a855f7', // cap purple
    'y': '#facc15', // cap yellow
  };

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-full"
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

// คอมโพเนนต์แสดงก้อนเมฆสไตล์ Pixel-art สำหรับพื้นหลังปุ่มตอนกลางวัน (Light Mode)
function PixelCloud({ className }: Readonly<{ className?: string }>) {
  const grid = [
    "...www....",
    "..wwwww...",
    ".wwwwwww..",
    "wwwwwwwww.",
    "wwwwwwwwww"
  ];
  return (
    <svg
      viewBox="0 0 10 5"
      className={className}
      shapeRendering="crispEdges"
    >
      {grid.map((row, y) =>
        row.split('').map((char, x) => {
          if (char !== 'w') return null;
          return (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width={1}
              height={1}
              fill="#ffffff"
              fillOpacity={0.85}
            />
          );
        })
      )}
    </svg>
  );
}

// คอมโพเนนต์แสดงดาวสไตล์ Pixel-art สำหรับพื้นหลังปุ่มตอนกลางคืน (Dark Mode)
function PixelStar({ className }: Readonly<{ className?: string }>) {
  const grid = [
    ".y.",
    "yyy",
    ".y."
  ];
  return (
    <svg
      viewBox="0 0 3 3"
      className={className}
      shapeRendering="crispEdges"
    >
      {grid.map((row, y) =>
        row.split('').map((char, x) => {
          if (char !== 'y') return null;
          return (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width={1}
              height={1}
              fill="#facc15"
            />
          );
        })
      )}
    </svg>
  );
}

// คอมโพเนนต์ปุ่มสลับธีม (Theme Toggle) สำหรับสลับระหว่างโหมดมืด (Dark Mode) และโหมดสว่าง (Light Mode)
export function ThemeToggle() {
  // ดึงค่าธีม ฟังก์ชันสลับธีม และตรวจสอบสถานะเมาท์ของคอมโพเนนต์
  const { theme, toggleTheme, mounted } = useTheme();
  // Status to check if mouse is hovering over the toggle button
  const [hovered, setHovered] = useState(false);

  if (!mounted) {
    return (
      <div className="w-[64px] h-[32px] rounded-full bg-gray-200 dark:bg-neutral-800 opacity-50 animate-pulse" />
    );
  }

  const isDark = theme === 'dark';

  return (
    <div className="relative inline-flex items-center">
      {/* Dynamic Keyframes and Animations injected inline */}
      <style>{`
        @keyframes pixel-wobble {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-1px) rotate(-3deg); }
          75% { transform: translateY(-1px) rotate(3deg); }
        }
        @keyframes cloud-float {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(3px); }
        }
        @keyframes star-twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        .animate-wobble {
          animation: pixel-wobble 0.6s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: cloud-float 4s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: cloud-float 2.5s ease-in-out infinite;
        }
        .animate-twinkle-1 {
          animation: star-twinkle 1.5s ease-in-out infinite;
        }
        .animate-twinkle-2 {
          animation: star-twinkle 2s ease-in-out infinite 0.5s;
        }
        .animate-twinkle-3 {
          animation: star-twinkle 1.8s ease-in-out infinite 1s;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-wobble, .animate-float-slow, .animate-float-fast, .animate-twinkle-1, .animate-twinkle-2, .animate-twinkle-3 {
            animation: none !important;
            transition: none !important;
          }
          .theme-toggle-track, .theme-toggle-thumb {
            transition: none !important;
          }
        }
      `}</style>

      <button
        role="switch"
        aria-checked={isDark}
        aria-label="Toggle theme"
        onClick={() => toggleTheme()}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`relative w-[64px] h-[32px] rounded-full border-2 overflow-hidden transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50 
          ${isDark 
            ? 'bg-gradient-to-r from-slate-900 via-[#0f172a] to-violet-950 border-[#1e293b]' 
            : 'bg-gradient-to-r from-blue-300 via-sky-200 to-amber-200 border-white/60 shadow-inner'
          }`}
      >
        {/* Track decorations (Clouds / Stars) */}
        {isDark ? (
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            {/* Star 1 */}
            <PixelStar className="absolute top-[5px] left-[10px] w-[5px] h-[5px] text-yellow-400 animate-twinkle-1" />
            {/* Star 2 */}
            <PixelStar className="absolute bottom-[6px] left-[26px] w-[4px] h-[4px] text-yellow-400 animate-twinkle-2" />
            {/* Star 3 */}
            <PixelStar className="absolute top-[6px] right-[10px] w-[5px] h-[5px] text-yellow-400 animate-twinkle-3" />
          </div>
        ) : (
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            {/* Cloud 1 */}
            <PixelCloud className="absolute top-[4px] left-[6px] w-[14px] h-[7px] text-white animate-float-slow" />
            {/* Cloud 2 */}
            <PixelCloud className="absolute bottom-[4px] right-[8px] w-[16px] h-[8px] text-white animate-float-fast" />
          </div>
        )}

        {/* Slime Mascot Thumb */}
        <div
          className="absolute top-[1px] left-[1px] w-[26px] h-[26px] flex items-center justify-center transition-transform duration-[380ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)]"
          style={{
            transform: isDark ? 'translate3d(32px, 0, 0)' : 'translate3d(0, 0, 0)',
          }}
        >
          <div className={`w-[24px] h-[22px] transition-transform duration-200 ${hovered ? 'animate-wobble' : ''}`}>
            {isDark ? (
              <PixelMascot grid={SLEEPY_GRID} />
            ) : (
              <PixelMascot grid={AWAKE_GRID} />
            )}
          </div>
        </div>
      </button>
    </div>
  );
}
