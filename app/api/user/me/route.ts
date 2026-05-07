/**
 * DrawPrompts — GET /api/user/me
 * 获取当前用户信息 + 积分余额 + 会员状态
 */
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserCredits, getTodayGenerationCount } from "@/servers/credits";
import { getUserByEmail } from "@/servers/user";
import {
  getEffectiveMembership,
  getAllowedQualities,
  DAILY_LIMITS,
  type MembershipType,
} from "@/lib/qualityConfig";


export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await getUserByEmail(session.user.email);
    if (user.status === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const credits = await getUserCredits(user.user_id);
    if (!credits) {
      return NextResponse.json({ error: "Credits not found" }, { status: 404 });
    }

    const effectiveMembership = getEffectiveMembership(
      credits.membership,
      credits.membership_expires_at
    );
    const dailyLimit = DAILY_LIMITS[effectiveMembership];
    const todayCount = await getTodayGenerationCount(user.user_id);

    return NextResponse.json({
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      image: user.image,
      credits: {
        balance: credits.balance,
        total_purchased: credits.total_purchased,
        total_consumed: credits.total_consumed,
      },
      membership: {
        plan: effectiveMembership,
        raw_plan: credits.membership,
        expires_at: credits.membership_expires_at,
        is_active: effectiveMembership !== "free",
        daily_limit: dailyLimit,
        daily_remaining: Math.max(0, dailyLimit - todayCount),
        allowed_qualities: getAllowedQualities(effectiveMembership),
      },
    });
  } catch (error) {
    console.error("[GET /api/user/me] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
