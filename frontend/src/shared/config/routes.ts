// กำหนดเส้นทาง (Routes) ทั้งหมดของแอปพลิเคชัน
export const routes = {
  home: "/#home",
  about: "/#about",
  skills: "/#skills",
  contact: "/contact",
  auth: {
    signin: "/auth/signin",
    signup: "/auth/signup",
    forgotPassword: "/auth/forgotPassword",
    resetPassword: "/auth/resetPassword",
    verifyEmail: "/auth/verifyEmail",
  },
} as const;

