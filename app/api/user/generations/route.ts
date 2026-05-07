/**
 * GET /api/user/generations — 获取用户生成历史
 * 支持分页：?page=1&limit=20
 */
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserByEmail } from "@/servers/user";
import { getUserGenerations } from "@/servers/generations";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await getUserByEmail(session.user.email);
    if (user.status === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "20")));

    const result = await getUserGenerations(user.user_id, page, limit);

    return NextResponse.json(result);
  } catch (error) {
    console.error("[GET /api/user/generations] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
