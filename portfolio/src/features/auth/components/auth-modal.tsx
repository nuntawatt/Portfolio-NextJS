'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { AuthContainer } from '../containers/auth-container';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Press ESC to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 ease-out"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-md animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
        {/* Close Button floating over the corner of the container */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white bg-gray-100/50 dark:bg-black/20 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
        
        <AuthContainer />
      </div>
    </div>
  );
}
