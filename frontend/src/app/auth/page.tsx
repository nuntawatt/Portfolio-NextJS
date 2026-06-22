import { redirect } from 'next/navigation';

// หน้าเพจหลักของ /auth ทำหน้าที่เปลี่ยนเส้นทาง (Redirect) ไปยังหน้าเข้าสู่ระบบ (/auth/signin) อัตโนมัติ
export default function AuthPage() {
  redirect('/auth/signin');
}

