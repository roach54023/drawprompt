"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import AuthNavWrapper from "@/components/auth/AuthNavWrapper";

const mainLinks = [
  { href: "/generate",                label: "Generate", hot: true },
  { href: "/ai-prompts",              label: "AI Prompts" },
  { href: "/gpt-image-2-prompts",     label: "GPT Image 2", hot: true },
  { href: "/how-to-use-gpt-image-2",  label: "Guide" },
  { href: "/gallery",                 label: "Gallery" },
];

const humanLinks = [
  { href: "/drawing-prompts",   label: "Drawing Prompts" },
  { href: "/generator",         label: "Generator" },
  { href: "/random",            label: "Random Prompt" },
  { href: "/daily-challenge",   label: "Daily Challenge" },
  { href: "/character",         label: "Character Prompts" },
  { href: "/anime",             label: "Anime Prompts" },
  { href: "/for-kids",          label: "For Kids" },
];

const moreLinks = {
  other: [
    { href: "/saved",           label: "Saved" },
  ],
};

const allMoreLinks = [...humanLinks, ...moreLinks.other];

export default function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const inMore = allMoreLinks.some((l) => pathname === l.href);

  const linkStyle = (active: boolean) => ({
    padding: "6px 14px",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: active ? 600 : 450,
    color: active ? "var(--text-primary)" : "var(--text-secondary)",
    textDecoration: "none" as const,
    transition: "color 0.15s, background 0.15s",
    whiteSpace: "nowrap" as const,
    display: "flex" as const,
    alignItems: "center" as const,
    gap: 6,
    letterSpacing: "0.01em",
    background: active ? "var(--bg-warm)" : "transparent",
  });

  const dropdownLinkStyle = (active: boolean) => ({
    display: "block" as const,
    padding: "8px 12px",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: active ? 600 : 400,
    color: active ? "var(--text-primary)" : "var(--text-secondary)",
    background: active ? "var(--bg-warm)" : "transparent",
    textDecoration: "none" as const,
    transition: "background 0.1s",
  });

  const sectionLabel = {
    fontSize: 10,
    fontWeight: 600,
    color: "var(--text-muted)",
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    padding: "8px 12px 6px",
  };

  return (
    <header
      style={{
        background: scrolled ? "rgba(248, 246, 241, 0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(1.2)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        position: "sticky",
        top: 0,
        zIndex: 50,
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: "var(--max-w)",
          margin: "0 auto",
          padding: "0 32px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
          }}
        >
          <span
            className="font-serif"
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.03em",
            }}
          >
            Draw<span style={{ color: "var(--accent)" }}>Prompt</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          style={{ display: "flex", alignItems: "center", gap: 2 }}
          className="hidden md:flex"
        >
          {mainLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} style={linkStyle(active)}>
                {link.label}
                {"hot" in link && link.hot && (
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      color: "#fff",
                      background: "var(--accent)",
                      padding: "2px 6px",
                      borderRadius: 4,
                      lineHeight: "13px",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                    }}
                  >
                    Hot
                  </span>
                )}
              </Link>
            );
          })}

          {/* More Tools dropdown */}
          <div ref={dropdownRef} style={{ position: "relative" }}>
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              style={{
                ...linkStyle(inMore),
                border: "none",
                cursor: "pointer",
              }}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              For Humans
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                style={{
                  transition: "transform 0.2s",
                  transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
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

            {dropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  right: 0,
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-md)",
                  padding: 6,
                  minWidth: 200,
                  boxShadow: "0 12px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
                  zIndex: 100,
                }}
              >
                <div style={sectionLabel}>Drawing Prompts</div>
                {humanLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setDropdownOpen(false)}
                    style={dropdownLinkStyle(pathname === link.href)}
                  >
                    {link.label}
                  </Link>
                ))}

                <div style={{ height: 1, background: "var(--border)", margin: "4px 8px" }} />

                <div style={sectionLabel}>Other</div>
                {moreLinks.other.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setDropdownOpen(false)}
                    style={dropdownLinkStyle(pathname === link.href)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* CTA */}
          <Link
            href="/pricing"
            style={{
              marginLeft: 12,
              padding: "7px 18px",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              color: "var(--bg)",
              background: "var(--text-primary)",
              textDecoration: "none",
              transition: "background 0.15s, box-shadow 0.15s",
              letterSpacing: "0.01em",
            }}
          >
            Pricing
          </Link>

          {/* Auth */}
          <div style={{ marginLeft: 12 }}>
            <AuthNavWrapper />
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
            padding: 8,
            color: "var(--text-primary)",
          }}
          aria-label="Menu"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {mobileOpen ? (
              <path
                d="M6 6L16 16M16 6L6 16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            ) : (
              <>
                <line x1="4" y1="7" x2="18" y2="7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="4" y1="11" x2="18" y2="11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="4" y1="15" x2="18" y2="15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            borderTop: "1px solid var(--border)",
            padding: "12px 20px 16px",
            background: "var(--surface)",
          }}
          className="md:hidden"
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: "var(--text-muted)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "8px 8px 6px",
            }}
          >
            AI Image Generation
          </div>
          {mainLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "10px 8px",
                  borderRadius: 8,
                  fontSize: 15,
                  fontWeight: active ? 600 : 400,
                  color: active ? "var(--text-primary)" : "var(--text-secondary)",
                  background: active ? "var(--bg-warm)" : "transparent",
                  textDecoration: "none",
                  marginBottom: 2,
                }}
              >
                {link.label}
                {"hot" in link && link.hot && (
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      color: "#fff",
                      background: "var(--accent)",
                      padding: "2px 6px",
                      borderRadius: 4,
                      lineHeight: "13px",
                    }}
                  >
                    Hot
                  </span>
                )}
              </Link>
            );
          })}

          <div style={{ height: 1, background: "var(--border)", margin: "8px 0" }} />

          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: "var(--text-muted)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "8px 8px 6px",
            }}
          >
            More Tools
          </div>
          {humanLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block",
                  padding: "10px 8px",
                  borderRadius: 8,
                  fontSize: 15,
                  fontWeight: active ? 600 : 400,
                  color: active ? "var(--text-primary)" : "var(--text-secondary)",
                  background: active ? "var(--bg-warm)" : "transparent",
                  textDecoration: "none",
                  marginBottom: 2,
                }}
              >
                {link.label}
              </Link>
            );
          })}

          <div style={{ height: 1, background: "var(--border)", margin: "8px 0" }} />

          <div style={{ display: "flex", gap: 8, padding: "8px 8px 0" }}>
            <Link
              href="/saved"
              onClick={() => setMobileOpen(false)}
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 500,
                color: "var(--text-secondary)",
                background: "var(--bg-warm)",
                textDecoration: "none",
              }}
            >
              Saved
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileOpen(false)}
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                color: "var(--bg)",
                background: "var(--text-primary)",
                textDecoration: "none",
              }}
            >
              Pricing
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
