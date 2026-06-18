'use client';

import React, { createContext, useEffect, useRef, useState } from 'react';

interface AudioContextType {
  playing: boolean;
  ready: boolean;
  volume: number;
  toggle: () => void;
  setVolume: (v: number) => void;
}

export const AudioContext = createContext<AudioContextType | undefined>(undefined);

const AUDIO_SRC = '/audio/theme.mp3';
const DEFAULT_VOLUME = 0.35;

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [volume, setVolumeState] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedVolume = localStorage.getItem('audio_volume');
      return savedVolume ? parseFloat(savedVolume) : DEFAULT_VOLUME;
    }
    return DEFAULT_VOLUME;
  });

  // Initialize audio only on mount to avoid SSR issues
  useEffect(() => {
    const savedPlaying = localStorage.getItem('audio_playing') === 'true';
    const savedVolume = localStorage.getItem('audio_volume');
    const initialVolume = savedVolume ? parseFloat(savedVolume) : DEFAULT_VOLUME;

    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.volume = initialVolume;
    
    const handleCanPlayThrough = () => setReady(true);
    audio.addEventListener('canplaythrough', handleCanPlayThrough);
    
    audioRef.current = audio;

    // Attempt to restore playback state if previously playing
    // Browsers might block this on first load without user interaction
    if (savedPlaying) {
      audio.play().then(() => {
        setPlaying(true);
      }).catch(() => {
        // Autoplay policy or missing file rejection — fail quietly, stay paused.
        setPlaying(false);
        localStorage.setItem('audio_playing', 'false');
      });
    }

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (playing) {
      audio.pause();
      setPlaying(false);
      localStorage.setItem('audio_playing', 'false');
    } else {
      audio.play().then(() => {
        setPlaying(true);
        localStorage.setItem('audio_playing', 'true');
      }).catch(() => {
        setPlaying(false);
        localStorage.setItem('audio_playing', 'false');
      });
    }
  };

  const setVolume = (v: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = v;
    }
    setVolumeState(v);
    localStorage.setItem('audio_volume', v.toString());
  };

  return (
    <AudioContext.Provider value={{ playing, ready, volume, toggle, setVolume }}>
      {children}
    </AudioContext.Provider>
  );
}
