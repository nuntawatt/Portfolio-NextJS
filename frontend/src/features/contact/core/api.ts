import { apiClient } from '@/shared/lib/api/api-client';
import { ContactPayload, ContactResponse } from './types';

// อ็อบเจกต์รวบรวม API สำหรับส่วนติดต่อ (Contact API)
export const contactApi = {
  // ฟังก์ชันสำหรับส่งข้อมูลแบบฟอร์มติดต่อ (ชื่อ, เรื่อง, ข้อความ) ไปยัง Backend
  submitForm: async (payload: ContactPayload): Promise<ContactResponse> => {
    const response = await apiClient.post<ContactResponse>('/contact', payload);
    return response.data;
  },
};
