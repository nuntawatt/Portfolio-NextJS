import axios from 'axios';

// ดึง Base URL ของ API จาก Environment Variable หรือใช้ค่า Default ของ Localhost
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// สร้าง Axios Instance สำหรับจัดการ HTTP Requests ของแอปพลิเคชัน
export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // For cookie-based refresh tokens if needed
});

// Request Interceptor: ตรวจสอบและแนบ JWT Token ไปกับ Authorization Header ก่อนส่ง Request เสมอ
apiClient.interceptors.request.use(
  (config) => {
    if (globalThis.window !== undefined) {
      const token = localStorage.getItem('auth_token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: จัดการกับการตอบกลับ (Response) และ Error ในระดับ Global
apiClient.interceptors.response.use(
  (response) => {
    // Return the response data wrapped inside the standard NestJS wrapper { success, data, message }
    return response;
  },
  (error) => {
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      // จัดการเมื่อ Token หมดอายุหรือไม่ได้รับอนุญาต (Unauthorized) โดยการลบ Token ออก
      if (globalThis.window !== undefined) {
        localStorage.removeItem('auth_token');
        // Optional: Trigger logout or redirect to login page if we have a state store
      }
    }

    // ดึงข้อความแสดงข้อผิดพลาดจาก Backend API (รองรับรูปแบบ NestJS Exception Filters)
    const message = error.response?.data?.message || 'Something went wrong';
    return Promise.reject(new Error(Array.isArray(message) ? message[0] : message));
  }
);

