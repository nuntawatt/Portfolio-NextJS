import { useContext } from 'react';
import { AudioContext } from '../providers/AudioProvider';

// useAudio: Hook สำหรับดึงข้อมูลสถานะและฟังก์ชันสำหรับควบคุมระบบเสียงจาก AudioContext
export function useAudio() {
  // เรียกใช้งาน AudioContext
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
