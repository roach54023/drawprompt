"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useUser } from "@/context/UserContext";

export default function LoginButton() {
  const { data: session, status } = useSession();
  const { userData } = useUser();

  if (status === "loading") {
    return (
      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#e0ddd8" }} />
    );
  }

  if (!session) {
    return (
      <button
        onClick={() => signIn("google")}
        style={{
          background: "#2d2926",
          color: "#fff",
          border: "none",
          padding: "8px 16px",
          borderRadius: 8,
          fontSize: 13,
          fontWeight: 500,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Sign In
      </button>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {/* 会员徽章 */}
      {userData && userData.membership.is_active && userData.membership.plan !== "free" && (
        <a
          href="/pricing"
          style={{
            background: "linear-gradient(135deg, #c8a77a, #a08050)",
            padding: "4px 10px",
            borderRadius: 12,
            fontSize: 11,
            fontWeight: 600,
            color: "#fff",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 4,
            letterSpacing: "0.02em",
          }}
        >
          ★ {userData.membership.plan.charAt(0).toUpperCase() + userData.membership.plan.slice(1)}
        </a>
      )}
      {/* 积分徽章 */}
      {userData && (
        <a
          href="/dashboard"
          style={{
            background: "#f0ede8",
            padding: "4px 10px",
            borderRadius: 12,
            fontSize: 12,
            fontWeight: 600,
            color: "#6b5b4e",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          ⚡ {userData.credits.balance}
        </a>
      )}
      {/* 用户头像 */}
      <div style={{ position: "relative" }}>
        <button
          onClick={() => signOut()}
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
            padding: 0,
          }}
          title="Sign Out"
        >
          {session.user?.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || "User"}
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                border: "2px solid #e0ddd8",
              }}
            />
          ) : (
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "#c8a77a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                color: "#fff",
                fontWeight: 600,
              }}
            >
              {(session.user?.name || "U")[0].toUpperCase()}
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
