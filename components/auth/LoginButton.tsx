"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useUser } from "@/context/UserContext";
import { useState, useRef, useEffect } from "react";

export default function LoginButton() {
  const { data: session, status } = useSession();
  const { userData } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭菜单
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const planLabel = userData?.membership?.plan && userData.membership.plan !== "free"
    ? userData.membership.plan.charAt(0).toUpperCase() + userData.membership.plan.slice(1)
    : null;

  return (
    <div ref={menuRef} style={{ position: "relative" }}>
      {/* 头像按钮 */}
      <button
        onClick={() => setMenuOpen((v) => !v)}
        style={{
          border: "none",
          background: "none",
          cursor: "pointer",
          padding: 0,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
        aria-haspopup="true"
        aria-expanded={menuOpen}
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
        {/* 小箭头 */}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          style={{
            transition: "transform 0.2s",
            transform: menuOpen ? "rotate(180deg)" : "rotate(0deg)",
            opacity: 0.5,
          }}
        >
          <path
            d="M2 3.5L5 6.5L8 3.5"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* 下拉菜单 */}
      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            background: "#fff",
            border: "1px solid #e8e5e0",
            borderRadius: 12,
            padding: 8,
            minWidth: 220,
            boxShadow: "0 12px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
            zIndex: 200,
          }}
        >
          {/* 用户信息 */}
          <div style={{ padding: "8px 12px 12px", borderBottom: "1px solid #f0ede8" }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1714" }}>
              {session.user?.name || "User"}
            </div>
            <div style={{ fontSize: 12, color: "#8a7e72", marginTop: 2 }}>
              {session.user?.email}
            </div>
          </div>

          {/* 积分和会员 */}
          {userData && (
            <div style={{ padding: "8px 4px", borderBottom: "1px solid #f0ede8" }}>
              <a
                href="/dashboard"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 8px",
                  borderRadius: 8,
                  textDecoration: "none",
                  color: "#1a1714",
                  fontSize: 13,
                  transition: "background 0.1s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#f8f6f1")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <span>⚡</span>
                <span style={{ fontWeight: 500 }}>Credits</span>
                <span style={{ marginLeft: "auto", fontWeight: 600, color: "#6b5b4e" }}>
                  {userData.credits.balance}
                </span>
              </a>

              {planLabel && (
                <a
                  href="/pricing"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 8px",
                    borderRadius: 8,
                    textDecoration: "none",
                    color: "#1a1714",
                    fontSize: 13,
                    transition: "background 0.1s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f8f6f1")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <span>★</span>
                  <span style={{ fontWeight: 500 }}>{planLabel} Plan</span>
                  <span
                    style={{
                      marginLeft: "auto",
                      fontSize: 10,
                      fontWeight: 600,
                      color: "#fff",
                      background: "linear-gradient(135deg, #c8a77a, #a08050)",
                      padding: "2px 8px",
                      borderRadius: 8,
                    }}
                  >
                    Active
                  </span>
                </a>
              )}

              {!planLabel && (
                <a
                  href="/pricing"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 8px",
                    borderRadius: 8,
                    textDecoration: "none",
                    color: "#1a1714",
                    fontSize: 13,
                    transition: "background 0.1s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f8f6f1")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <span>✨</span>
                  <span style={{ fontWeight: 500 }}>Upgrade Plan</span>
                </a>
              )}
            </div>
          )}

          {/* 菜单项 */}
          <div style={{ padding: "8px 4px" }}>
            <a
              href="/dashboard"
              onClick={() => setMenuOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 8px",
                borderRadius: 8,
                textDecoration: "none",
                color: "#1a1714",
                fontSize: 13,
                transition: "background 0.1s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#f8f6f1")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <span style={{ opacity: 0.7 }}>📊</span>
              <span>Dashboard</span>
            </a>

            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to sign out?")) {
                  signOut();
                }
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 8px",
                borderRadius: 8,
                border: "none",
                background: "none",
                color: "#c0392b",
                fontSize: 13,
                cursor: "pointer",
                width: "100%",
                textAlign: "left",
                transition: "background 0.1s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#fdf2f2")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <span style={{ opacity: 0.7 }}>🚪</span>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
