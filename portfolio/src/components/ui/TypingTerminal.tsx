"use client";

import { motion } from "motion/react";
import { useEffect, useState, useRef } from "react";

interface TypingTerminalProps {
  lines: string[];
  speed?: number;
  className?: string;
}

export function TypingTerminal({
  lines,
  speed = 40,
  className = "",
}: TypingTerminalProps) {
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lineIndex >= lines.length) return;

    const currentLine = lines[lineIndex];

    const handleTyping = () => {
      if (charIndex < currentLine.length) {
        setCurrentText((prev) => prev + currentLine.charAt(charIndex));
        setCharIndex((prev) => prev + 1);
      } else {
        // Line finished typing
        setTimeout(() => {
          setCompletedLines((prev) => [...prev, currentLine]);
          setCurrentText("");
          setCharIndex(0);
          setLineIndex((prev) => prev + 1);
        }, 1000);
      }
    };

    const typingTimeout = setTimeout(handleTyping, speed);
    return () => clearTimeout(typingTimeout);
  }, [charIndex, lineIndex, lines, speed]);

  // Auto-scroll to bottom of terminal content
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [completedLines, currentText]);

  return (
    <div
      className={`w-full max-w-2xl bg-white/80 dark:bg-[#0d0d0d] backdrop-blur-md rounded-xl border border-gray-200 dark:border-white/5 shadow-2xl overflow-hidden font-mono transition-colors duration-300 ${className}`}
    >
      {/* Window Controls */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-100/50 dark:bg-white/5 border-b border-gray-200 dark:border-white/5">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400 opacity-80" />
          <div className="w-2.5 h-2.5 rounded-full bg-orange-400 opacity-80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400 opacity-80" />
        </div>
        <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest font-bold opacity-60 px-2">terminal</span>
        <div className="w-10" />
      </div>

      <div 
        ref={terminalRef}
        className="p-8 sm:p-12 min-h-[200px] max-h-[400px] overflow-y-auto scrollbar-none"
      >
        <div className="space-y-4 flex flex-col items-center justify-center min-h-full">
          {/* Completed Lines History (Centered) */}
          {completedLines.map((line, idx) => (
            <div key={idx} className="flex items-center justify-center text-lg sm:text-xl md:text-2xl text-center w-full">
              <span className="text-gray-900 dark:text-orange-50/90 font-bold tracking-tight">
                {line}
              </span>
            </div>
          ))}

          {/* Current Typing Line (Centered) */}
          {lineIndex < lines.length && (
            <div className="flex items-center justify-center text-lg sm:text-xl md:text-2xl text-center w-full relative">
              <span className="text-gray-900 dark:text-orange-50/90 font-bold tracking-tight whitespace-pre-wrap">
                {currentText}
              </span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="w-2 h-6 md:h-8 bg-orange-500 ml-2 inline-block align-middle shadow-[0_0_12px_rgba(249,115,22,0.6)]"
              />
            </div>
          )}
        </div>
      </div>

      {/* Subtle Bottom Accent */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
    </div>
  );
}
