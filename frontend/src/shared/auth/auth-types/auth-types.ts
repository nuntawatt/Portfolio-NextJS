// อินเทอร์เฟสระบุรูปแบบข้อมูลผู้ใช้หลังจากล็อกอินสำเร็จ
export interface AuthUser {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    token: string;
    avatar?: string;
}

// อินเทอร์เฟสการตอบกลับจาก API ของการยืนยันตัวตน (Authentication Response)
export interface AuthResponse {
    user: AuthUser;
    message: string;
}
