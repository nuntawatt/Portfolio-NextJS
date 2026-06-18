import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
      },
      async authorize(credentials) {
        if (credentials?.token && credentials?.id && credentials?.email) {
          // ตรวจสอบข้อมูลผู้ใช้ที่ได้รับจาก credentials และส่งกลับข้อมูลผู้ใช้ที่ถูกต้อง
          // สามารถปรับแต่งการตรวจสอบนี้ตามความต้องการ เช่น การตรวจสอบกับฐานข้อมูลหรือ API ภายนอก
          return {
            id: credentials.id,
            email: credentials.email,
            name: `${credentials.firstName || ''} ${credentials.lastName || ''}`.trim(),
            accessToken: credentials.token,
          };
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.accessToken = (user as { accessToken?: string }).accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      if (session.user) {
        (session.user as { id?: string }).id = token.id as string;
        (session.user as { accessToken?: string }).accessToken = token.accessToken as string;
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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
