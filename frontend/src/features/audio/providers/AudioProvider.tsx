'use client';

import React, { createContext, useCallback, useEffect, useRef, useState, useMemo } from 'react';

// AudioContextType: โครงสร้างชนิดข้อมูลสำหรับการควบคุมระบบเสียง
interface AudioContextType {
  playing: boolean;
  ready: boolean;
  volume: number;
  toggle: () => void;
  setVolume: (v: number) => void;
}

// AudioContext: คอนเทกซ์สำหรับแบ่งปันสถานะและการควบคุมเสียงภายในแอปพลิเคชัน
export const AudioContext = createContext<AudioContextType | undefined>(undefined);

const AUDIO_SRC = '/audio/music.mp3';
const DEFAULT_VOLUME = 0.35;

// AudioProvider: คอมโพเนนต์ครอบเพื่อให้บริการจัดการและควบคุมระบบเสียง
export function AudioProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  // audioRef: อ้างอิงถึงออบเจกต์ Audio ในระดับเบราว์เซอร์เพื่อหลีกเลี่ยงการสร้างใหม่ทุกครั้งที่เรนเดอร์
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // playing: สถานะการเล่นเสียงเพลง (จริง/เท็จ)
  const [playing, setPlaying] = useState(false);
  // ready: สถานะความพร้อมใช้งานของออบเจกต์ Audio
  const [ready, setReady] = useState(false);
  // volume: สถานะระดับเสียง ดึงค่าล่าสุดจาก localStorage หรือใช้ค่าเริ่มต้น
  const [volumeValue, setVolumeValue] = useState(() => {
    if (globalThis.window !== undefined) {
      const savedVolume = localStorage.getItem('audio_volume');
      return savedVolume ? Number.parseFloat(savedVolume) : DEFAULT_VOLUME;
    }
    return DEFAULT_VOLUME;
  });

  // getOrInitAudio: ฟังก์ชันสร้างหรือดึงออบเจกต์ Audio ในแบบ Lazy loading เพื่อหลีกเลี่ยงการสร้างทรัพยากรที่ไม่จำเป็น
  const getOrInitAudio = useCallback((initialVol = volumeValue) => {
    if (audioRef.current) return audioRef.current;
    if (globalThis.window === undefined) return null;

    const audio = new Audio(AUDIO_SRC);
    audio.preload = 'none'; // ป้องกันการแอบโหลดไฟล์เสียงขนาด 5.1MB ในเบื้องหลัง เพื่อปรับปรุงคะแนนประสิทธิภาพ Lighthouse
    audio.loop = true;
    audio.volume = initialVol;
    
    audioRef.current = audio;
    return audio;
  }, [volumeValue]);

  // คืนค่าสถานะการเล่นและการตั้งค่าระดับเสียงเมื่อโหลดคอมโพเนนต์ครั้งแรก
  useEffect(() => {
    const savedPlaying = localStorage.getItem('audio_playing') === 'true';
    const savedVolume = localStorage.getItem('audio_volume');
    const initialVolume = savedVolume ? Number.parseFloat(savedVolume) : DEFAULT_VOLUME;

    if (savedPlaying) {
      const audio = getOrInitAudio(initialVolume);
      if (audio) {
        audio.play().then(() => {
          setPlaying(true);
          setReady(true); // ตั้งค่าความพร้อมใช้งานเมื่อเล่นเพลงสำเร็จ
        }).catch(() => {
          // หากเบราว์เซอร์บล็อกการเล่นอัตโนมัติ ให้ปิดสถานะการเล่น
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

  // toggle: ฟังก์ชันสลับสถานะการเล่นและหยุดเล่นเสียงเพลง
  const toggle = useCallback(() => {
    if (globalThis.window === undefined) return;
    
    let audio = audioRef.current;
    if (!audio) {
      audio = getOrInitAudio(volumeValue);
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
  }, [playing, volumeValue, getOrInitAudio]);

  // setVolume: ฟังก์ชันปรับระดับความดังของเสียง (0.0 ถึง 1.0)
  const setVolume = useCallback((v: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = v;
    } else {
      getOrInitAudio(v);
      setReady(true);
    }
    setVolumeValue(v);
    localStorage.setItem('audio_volume', v.toString());
  }, [getOrInitAudio]);

  // Memoize context value to prevent unnecessary re-renders of consumers
  const contextValue = useMemo(() => ({
    playing,
    ready,
    volume: volumeValue,
    toggle,
    setVolume
  }), [playing, ready, volumeValue, toggle, setVolume]);

  return (
    <AudioContext.Provider value={contextValue}>
      {children}
    </AudioContext.Provider>
  );
}
