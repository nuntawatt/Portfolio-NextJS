import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// การตั้งค่าสำหรับ NextAuth (NextAuth Configuration) เพื่อจัดการระบบ Authentication ผ่าน Credentials
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        token: { label: "Token", type: "text" },
        id: { label: "ID", type: "text" },
        email: { label: "Email", type: "text" },
        firstName: { label: "First Name", type: "text" },
        lastName: { label: "Last Name", type: "text" },
        avatar: { label: "Avatar", type: "text" },
      },
      // ฟังก์ชันสำหรับตรวจสอบสิทธิ์ (Authorize) และจัดรูปแบบข้อมูลผู้ใช้
      async authorize(credentials) {
        if (credentials?.token && credentials?.id && credentials?.email) {
          return {
            id: credentials.id,
            email: credentials.email,
            name: `${credentials.firstName || ''} ${credentials.lastName || ''}`.trim(),
            accessToken: credentials.token,
            image: credentials.avatar || null,
          };
        }
        return null;
      }
    })
  ],
  // คอลแบ็กฟังก์ชัน (Callbacks) จัดการเกี่ยวกับ JWT และเซสชัน (Session)
  callbacks: {
    async jwt({ token, user }) {
      // เมื่อเข้าสู่ระบบสำเร็จในครั้งแรก ให้เก็บข้อมูลสำคัญลงใน JWT Token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
        token.accessToken = (user as { accessToken?: string }).accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      // ส่งข้อมูลจาก JWT Token ไปยังออบเจกต์ Session ที่จะใช้งานในฝั่ง Client
      if (session.user) {
        (session.user as { id?: string }).id = token.id as string;
        (session.user as { accessToken?: string }).accessToken = token.accessToken as string;
        session.user.image = token.image as string || null;
      }
      return session;
    }
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_development_do_not_use_in_prod",
};

// สร้าง Route Handler ของ NextAuth สำหรับรองรับ HTTP Methods GET และ POST
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

