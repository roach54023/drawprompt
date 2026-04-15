"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

// 主导航（始终可见）
const mainLinks = [
  { href: "/",                label: "Generate" },
  { href: "/random",          label: "Random" },
  { href: "/daily-challenge", label: "Daily" },
  { href: "/gallery",         label: "Gallery" },
  { href: "/blog",            label: "Archive" },
  { href: "/saved",           label: "Saved" },
];

// Styles 下拉分组
const styleLinks = [
  { href: "/character", label: "Character" },
  { href: "/anime",     label: "Anime" },
  { href: "/for-kids",  label: "For Kids" },
  { href: "/oc",        label: "OC" },
  { href: "/custom",    label: "Custom" },
];

export default function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭下拉
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 当前是否在 Styles 子页
  const inStyles = styleLinks.some((l) => pathname === l.href);

  return (
    <header
      style={{
        background: "rgba(250,248,244,0.92)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--border)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "0 24px",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <span
            className="font-serif"
            style={{ fontSize: 17, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            DrawingPrompt
          </span>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: 1 }} className="hidden md:flex">
          {/* 主链接 */}
          {mainLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: "5px 10px",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: active ? 600 : 400,
                  color: active ? "var(--accent)" : "var(--text-secondary)",
                  background: active ? "var(--accent-pale)" : "transparent",
                  textDecoration: "none",
                  transition: "all 0.15s",
                  whiteSpace: "nowrap",
                }}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Styles 下拉 */}
          <div ref={dropdownRef} style={{ position: "relative" }}>
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                padding: "5px 10px",
                borderRadius: 10,
                fontSize: 13,
                fontWeight: inStyles ? 600 : 400,
                color: inStyles ? "var(--accent)" : "var(--text-secondary)",
                background: inStyles ? "var(--accent-pale)" : "transparent",
                border: "none",
                cursor: "pointer",
                transition: "all 0.15s",
                whiteSpace: "nowrap",
              }}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              Styles
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="currentColor"
                style={{
                  transition: "transform 0.15s",
                  transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                  opacity: 0.6,
                }}
              >
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* 下拉面板 */}
            {dropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  right: 0,
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  borderRadius: 14,
                  padding: "6px",
                  minWidth: 140,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                  zIndex: 100,
                }}
              >
                {styleLinks.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setDropdownOpen(false)}
                      style={{
                        display: "block",
                        padding: "8px 12px",
                        borderRadius: 9,
                        fontSize: 13,
                        fontWeight: active ? 600 : 400,
                        color: active ? "var(--accent)" : "var(--text-secondary)",
                        background: active ? "var(--accent-pale)" : "transparent",
                        textDecoration: "none",
                        transition: "background 0.1s",
                      }}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 6,
            color: "var(--text-secondary)",
          }}
          aria-label="Menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            {mobileOpen ? (
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            ) : (
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu — 全部平铺，分组显示 */}
      {mobileOpen && (
        <div
          style={{
            borderTop: "1px solid var(--border)",
            padding: "8px 16px 12px",
            background: "var(--bg)",
          }}
          className="md:hidden"
        >
          {/* 主链接 */}
          {mainLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block",
                  padding: "10px 12px",
                  borderRadius: 10,
                  fontSize: 15,
                  fontWeight: active ? 600 : 400,
                  color: active ? "var(--accent)" : "var(--text-secondary)",
                  background: active ? "var(--accent-pale)" : "transparent",
                  textDecoration: "none",
                  marginBottom: 2,
                }}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Styles 分组标题 */}
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "var(--text-secondary)",
              opacity: 0.5,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              padding: "10px 12px 4px",
            }}
          >
            Styles
          </div>

          {/* Styles 子链接 */}
          {styleLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block",
                  padding: "10px 12px",
                  borderRadius: 10,
                  fontSize: 15,
                  fontWeight: active ? 600 : 400,
                  color: active ? "var(--accent)" : "var(--text-secondary)",
                  background: active ? "var(--accent-pale)" : "transparent",
                  textDecoration: "none",
                  marginBottom: 2,
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
