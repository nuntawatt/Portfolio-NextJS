import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    endpoints: {
      login: "/api/auth/login",
      register: "/api/auth/register",
    },
  });
}

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
