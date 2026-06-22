// อินเทอร์เฟสระบุโครงสร้างข้อมูลที่ต้องส่งไปยัง API ในการส่งข้อความติดต่อ (Contact Payload)
export interface ContactPayload {
  name: string;
  subject: string;
  message: string;
}

// อินเทอร์เฟสระบุโครงสร้างการตอบกลับที่ได้รับจาก API ของระบบติดต่อ (Contact Response)
export interface ContactResponse {
  success: boolean;
  message?: string;
}
