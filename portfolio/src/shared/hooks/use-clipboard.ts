import { useState, useCallback } from 'react';

// คัสตอมฮุกสำหรับจัดการคัดลอกข้อความไปยังคลิปบอร์ด (Clipboard)
export function useClipboard(timeout = 2000) {
  // สถานะแจ้งเตือนว่าทำการคัดลอกข้อความสำเร็จแล้วหรือไม่
  const [copied, setCopied] = useState(false);

  // ฟังก์ชันสำหรับดำเนินการคัดลอกข้อความไปยังคลิปบอร์ด
  const copyToClipboard = useCallback((text: string) => {
    if (!navigator?.clipboard) return;
    
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), timeout);
    });
  }, [timeout]);

  return { copied, copyToClipboard };
}
