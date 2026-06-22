import { NextResponse } from "next/server";

// คืนค่ารายการ Endpoint สำหรับ Authentication ทั้งหมดที่มีให้บริการ (เมื่อร้องขอผ่าน HTTP GET)
export async function GET() {
  return NextResponse.json({
    ok: true,
    endpoints: {
      login: "/api/auth/login",
      register: "/api/auth/register",
    },
  });
}

// คืนค่าข้อความแจ้งเตือนและสถานะ 405 Method Not Allowed (เมื่อร้องขอผ่าน HTTP POST มายัง Root Path นี้)
export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      message: "Use /api/auth/login or /api/auth/register",
      endpoints: {
        login: "/api/auth/login",
        register: "/api/auth/register",
      },
    },
    { status: 405 }
  );
}

