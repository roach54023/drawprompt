/**
 * GET /api/generate/status?id=<generation_id>
 * Polling endpoint — returns the current status of a generation.
 * Designed to be called every 2-3 s from the client while status === "pending".
 */
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserByEmail } from "@/servers/user";
import { getGeneration } from "@/servers/generations";

export async function GET(request: NextRequest) {
  try {
    // Auth (with dev bypass support)
    let userId: string;
    const devBypass = process.env.NODE_ENV === "development" && request.headers.get("x-dev-bypass");

    if (devBypass) {
      const user = await getUserByEmail(devBypass);
      if (user.status === 0) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      userId = user.user_id;
    } else {
      const session = await getServerSession(authOptions);
      if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      userId = (session.user as { user_id?: string }).user_id || "";
      if (!userId) {
        const user = await getUserByEmail(session.user.email);
        if (user.status === 0) {
          return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        userId = user.user_id;
      }
    }

    // Read generation_id from query
    const generationId = request.nextUrl.searchParams.get("id");
    if (!generationId) {
      return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
    }

    const gen = await getGeneration(generationId);
    if (!gen) {
      return NextResponse.json({ error: "Generation not found" }, { status: 404 });
    }

    // Ensure user can only query their own generations
    if (gen.user_id !== userId) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({
      generation_id: gen.generation_id,
      status: gen.status,
      image_url: gen.image_url,
      error_message: gen.error_message,
      credits_cost: gen.credits_cost,
    });
  } catch (error) {
    console.error("[GET /api/generate/status] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
