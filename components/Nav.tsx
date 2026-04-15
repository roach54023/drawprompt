"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/",                label: "Generate" },
  { href: "/random",          label: "Random" },
  { href: "/daily-challenge", label: "Daily" },
  { href: "/character",       label: "Character" },
  { href: "/anime",           label: "Anime" },
  { href: "/for-kids",        label: "For Kids" },
  { href: "/oc",              label: "OC" },
  { href: "/custom",          label: "Custom" },
  { href: "/gallery",         label: "Gallery" },
  { href: "/blog",            label: "Archive" },
  { href: "/saved",           label: "Saved" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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
        <nav style={{ display: "flex", alignItems: "center", gap: 1, overflowX: "auto", scrollbarWidth: "none" }} className="hidden md:flex">
          {links.map((link) => {
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
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
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
            {open ? (
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            ) : (
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            borderTop: "1px solid var(--border)",
            padding: "8px 16px 12px",
            background: "var(--bg)",
          }}
          className="md:hidden"
        >
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
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
