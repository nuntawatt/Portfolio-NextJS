'use client';

import React, { createContext, useCallback, useEffect, useRef, useState } from 'react';

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

  // Helper to lazily initialize the Audio object (pure: no synchronous React state updates)
  const getOrInitAudio = useCallback((initialVol = volume) => {
    if (audioRef.current) return audioRef.current;
    if (typeof window === 'undefined') return null;

    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.volume = initialVol;
    
    audioRef.current = audio;
    return audio;
  }, [volume]);

  // Restore playback state dynamically on mount if previously playing
  useEffect(() => {
    const savedPlaying = localStorage.getItem('audio_playing') === 'true';
    const savedVolume = localStorage.getItem('audio_volume');
    const initialVolume = savedVolume ? parseFloat(savedVolume) : DEFAULT_VOLUME;

    if (savedPlaying) {
      const audio = getOrInitAudio(initialVolume);
      if (audio) {
        audio.play().then(() => {
          setPlaying(true);
          setReady(true); // Async setState within a promise resolve is safe
        }).catch(() => {
          // Autoplay block or error - fail silently and stay paused
          setPlaying(false);
          localStorage.setItem('audio_playing', 'false');
        });
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [getOrInitAudio]);

  const toggle = () => {
    if (typeof window === 'undefined') return;
    
    let audio = audioRef.current;
    if (!audio) {
      audio = getOrInitAudio(volume);
      setReady(true);
    }
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
    let audio = audioRef.current;
    if (!audio) {
      audio = getOrInitAudio(v);
      setReady(true);
    } else {
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
