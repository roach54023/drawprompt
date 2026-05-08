/**
 * DrawPrompts — GET /api/user/credits
 * 获取积分流水明细（分页）
 */
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserByEmail } from "@/servers/user";
import { getCreditTransactions } from "@/servers/credits";


export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 优先从 session token 中获取 user_id
    let userId = (session.user as { user_id?: string }).user_id;
    if (!userId) {
      const user = await getUserByEmail(session.user.email);
      if (user.status === 0) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      userId = user.user_id;
    }

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "20", 10)));

    const result = await getCreditTransactions(userId, page, limit);

    return NextResponse.json(result);
  } catch (error) {
    console.error("[GET /api/user/credits] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
