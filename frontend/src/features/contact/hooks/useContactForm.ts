import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { contactApi } from '../core/api';

// Custom Hook สำหรับประมวลผลและการจัดการสถานะในแบบฟอร์มติดต่อสอบถาม (Contact Form)
export function useContactForm() {
  // ดึงข้อมูลการเข้าสู่ระบบ (Session) และสถานะเซสชัน
  const { data: session, status } = useSession();
  
  // สถานะสำหรับเก็บค่าในช่องป้อนข้อมูลของฟอร์ม (ชื่อ, เรื่อง, ข้อความ)
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  // สถานะสำหรับตรวจวัดการส่งข้อมูล ข้อความสำเร็จ หรือเกิดข้อผิดพลาดในการส่ง API
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState<boolean | null>(null);
  const [sendError, setSendError] = useState<string | null>(null);



  // ฟังก์ชันส่งข้อมูลผ่าน API เมื่อกดยื่นฟอร์ม
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userEmail = session?.user?.email;
    if (!name || !userEmail || !subject || !message) return;

    setIsSending(true);
    setSendError(null);

    try {
      await contactApi.submitForm({
        name,
        subject,
        message,
      });

      setSendSuccess(true);
      setSubject('');
      setMessage('');
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : 'contact.error_fallback';
      setSendError(errMsg);
    } finally {
      setIsSending(false);
    }
  };

  // ฟังก์ชันรีเซ็ตค่าสถานะผลการส่งเพื่อเปลี่ยนหน้ากลับไปกรอกฟอร์มใหม่ได้
  const resetSuccess = () => setSendSuccess(null);

  return {
    formData: { name, subject, message },
    formActions: { setName, setSubject, setMessage },
    formState: { isSending, sendSuccess, sendError },
    sessionState: { session, status },
    handleSubmit,
    resetSuccess,
  };
}
