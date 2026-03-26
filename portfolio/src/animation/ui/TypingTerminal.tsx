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
      className={`w-full max-w-2xl bg-[#0d0d0d] rounded-xl border border-white/10 shadow-2xl overflow-hidden font-mono ${className}`}
    >
      {/* Window Controls */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white/5 border-b border-white/5">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400 opacity-80" />
          <div className="w-2.5 h-2.5 rounded-full bg-orange-400 opacity-80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400 opacity-80" />
        </div>
        <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold opacity-60 px-2">terminal</span>
        <div className="w-10" />
      </div>

      <div 
        ref={terminalRef}
        className="p-5 sm:p-6 min-h-[160px] max-h-[400px] overflow-y-auto scrollbar-none"
      >
        <div className="space-y-1 flex flex-col items-start min-h-full">
          {/* Completed Lines History */}
          {completedLines.map((line, idx) => (
            <div key={idx} className="flex items-start text-xs sm:text-sm font-medium font-mono w-full">
              <span className="text-gray-600 mr-3 select-none opacity-40 min-w-[1.5rem] text-right">{idx + 1}</span>
              <span className="text-gray-200 break-all leading-normal">
                {formatCode(line)}
              </span>
            </div>
          ))}
 
          {/* Current Typing Line */}
          {lineIndex < lines.length && (
            <div className="flex items-start text-xs sm:text-sm font-medium font-mono w-full relative">
              <span className="text-gray-600 mr-3 select-none opacity-40 min-w-[1.5rem] text-right">{lineIndex + 1}</span>
              <span className="text-gray-200 break-all leading-normal">
                {formatCode(currentText)}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  className="w-1.5 h-3.5 sm:h-4 bg-orange-500 ml-1 inline-block align-middle shadow-[0_0_8px_rgba(249,115,22,0.6)]"
                />
              </span>
            </div>
          )}
        </div>
      </div>
 
      {/* Subtle Bottom Accent */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
    </div>
  );
}

// Simple helper to add subtle syntax coloring
function formatCode(text: string) {
  // Handle empty or small strings
  if (!text) return text;

  // Highlight comments
  if (text.startsWith('//')) {
    return <span className="text-gray-500 italic">{text}</span>;
  }

  // Highlight 'import'
  if (text.startsWith('import')) {
    return (
      <>
        <span className="text-purple-400">import</span>{' '}
        <span className="text-gray-200">{text.substring(7)}</span>
      </>
    );
  }

  // Highlight 'const'
  if (text.startsWith('const')) {
    const remaining = text.substring(6); // everything after 'const '
    if (remaining.includes('=')) {
      const parts = remaining.split('=');
      const varName = parts[0];
      const value = parts.slice(1).join('=');
      return (
        <>
          <span className="text-blue-400">const</span>{' '}
          <span className="text-purple-400">{varName}</span>
          <span className="text-gray-400">=</span>
          <span className="text-orange-400">{value}</span>
        </>
      );
    }
  }

  // Highlight 'console.log'
  if (text.trim().startsWith('console.log')) {
    const content = text.substring(text.indexOf('console.log') + 11);
    return (
      <>
        <span className="text-yellow-400">console</span>
        <span className="text-gray-400">.</span>
        <span className="text-blue-400">log</span>
        <span className="text-gray-300">{content}</span>
      </>
    );
  }

  // Terminal actions (like Fetching..., Loading...)
  if (text.includes('...')) {
    return <span className="text-green-500 font-bold">{text}</span>;
  }

  return text;
}
