"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import AuthNavWrapper from "@/components/auth/AuthNavWrapper";

// ═══════════════════════════════════════════════════════════════════
//  SPECIALS CONFIG — 唯一需要维护的地方
//  每次新专题：往数组里加一条，过期后删掉或设 activeUntil 自动隐藏
//  专题页面本身永远保留，不影响 SEO 权重
// ═══════════════════════════════════════════════════════════════════
type Special = {
  href: string;
  label: string;
  emoji?: string;
  desc?: string;       // 下拉里的副标题，可选
  hot?: boolean;       // 显示 NEW 角标
  activeUntil?: string; // "YYYY-MM-DD"，不填则永久显示
};

const specials: Special[] = [
  // 示例：节日
  {
    href: "/mothers-day",
    label: "Mother's Day",
    emoji: "💐",
    desc: "4 poster templates for Mom",
    hot: false,
    activeUntil: "2026-05-11",
  },
  // 下次新专题直接加在这里，例如：
  // {
  //   href: "/fathers-day",
  //   label: "Father's Day",
  //   emoji: "👔",
  //   desc: "Prompt packs for Dad",
  //   hot: true,
  //   activeUntil: "2026-06-22",
  // },
];
// ═══════════════════════════════════════════════════════════════════

// 核心导航链接（稳定，不随专题变动）
const mainLinks = [
  { href: "/generate",            label: "Generate",    hot: true },
  { href: "/gpt-image-2-prompts", label: "GPT Image 2", hot: true },
  { href: "/blog",                label: "Blog"                   },
];

// More Tools 下拉
const humanLinks = [
  { href: "/drawing-prompts",  label: "Drawing Prompts"  },
  { href: "/generator",        label: "Generator"        },
  { href: "/random",           label: "Random Prompt"    },
  { href: "/daily-challenge",  label: "Daily Challenge"  },
  { href: "/character",        label: "Character Prompts"},
  { href: "/anime",            label: "Anime Prompts"    },
  { href: "/for-kids",         label: "For Kids"         },
];

const otherLinks = [
  { href: "/saved", label: "Saved" },
];

// ── HOT badge ──────────────────────────────────────────────────────
const HotBadge = () => (
  <span style={{
    fontSize: 9, fontWeight: 700, color: "#fff",
    background: "var(--accent)", padding: "2px 6px",
    borderRadius: 4, lineHeight: "13px",
    letterSpacing: "0.04em", textTransform: "uppercase" as const,
  }}>New</span>
);

export default function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen]       = useState(false);
  const [moreOpen, setMoreOpen]           = useState(false);
  const [specialsOpen, setSpecialsOpen]   = useState(false);
  const [isMobile, setIsMobile]           = useState(false);
  const [scrolled, setScrolled]           = useState(false);
  const moreRef     = useRef<HTMLDivElement>(null);
  const specialsRef = useRef<HTMLDivElement>(null);

  // 响应式断点
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // 点外关闭下拉
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
      if (specialsRef.current && !specialsRef.current.contains(e.target as Node)) setSpecialsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // 滚动毛玻璃
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 移动端菜单打开时锁定 body 滚动
  useEffect(() => {
    document.body.classList.toggle("menu-open", mobileOpen);
    return () => document.body.classList.remove("menu-open");
  }, [mobileOpen]);

  // 过滤出当前有效的专题（未过期）
  const today = new Date().toISOString().slice(0, 10);
  const activeSpecials = specials.filter(s => !s.activeUntil || today <= s.activeUntil);
  const hasSpecials = activeSpecials.length > 0;
  const inSpecials = activeSpecials.some(s => pathname === s.href);
  const inMore = [...humanLinks, ...otherLinks].some(l => pathname === l.href);

  // ── 样式工具 ──────────────────────────────────────────────────────
  const navLink = (active: boolean) => ({
    padding: "6px 12px", borderRadius: 8, fontSize: 13,
    fontWeight: active ? 600 : 450,
    color: active ? "var(--text-primary)" : "var(--text-secondary)",
    textDecoration: "none" as const,
    transition: "color 0.15s, background 0.15s",
    whiteSpace: "nowrap" as const,
    display: "flex" as const, alignItems: "center" as const, gap: 6,
    background: active ? "var(--bg-warm)" : "transparent",
  });

  const dropLink = (active: boolean) => ({
    display: "flex" as const, alignItems: "center" as const, gap: 8,
    padding: "8px 12px", borderRadius: 8, fontSize: 13,
    fontWeight: active ? 600 : 400,
    color: active ? "var(--text-primary)" : "var(--text-secondary)",
    background: active ? "var(--bg-warm)" : "transparent",
    textDecoration: "none" as const, transition: "background 0.1s",
  });

  const dropPanel = {
    position: "absolute" as const, top: "calc(100% + 8px)", right: 0,
    background: "var(--surface)", border: "1px solid var(--border)",
    borderRadius: "var(--radius-md)", padding: 6, minWidth: 210,
    boxShadow: "0 12px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
    zIndex: 100,
  };

  const sectionLabel = {
    fontSize: 10, fontWeight: 600, color: "var(--text-muted)",
    letterSpacing: "0.08em", textTransform: "uppercase" as const,
    padding: "8px 12px 4px",
  };

  const chevron = (open: boolean) => (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
      style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)", opacity: 0.5 }}>
      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const dropBtn = (active: boolean, open: boolean) => ({
    ...navLink(active), border: "none" as const, cursor: "pointer" as const,
    background: (active || open) ? "var(--bg-warm)" : "transparent",
  });

  return (
    <header style={{
      background: scrolled ? "rgba(248,246,241,0.88)" : "transparent",
      backdropFilter: scrolled ? "blur(20px) saturate(1.2)" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      position: "sticky", top: 0, zIndex: 50,
      transition: "all 0.3s ease", width: "100%", maxWidth: "100vw",
    }}>
      <div style={{
        maxWidth: "var(--max-w)", margin: "0 auto",
        padding: "0 16px", height: 56,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>

        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <span className="font-serif" style={{ fontSize: 20, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.03em" }}>
            Draw<span style={{ color: "var(--accent)" }}>Prompt</span>
          </span>
        </Link>

        {/* ── Desktop nav ─────────────────────────────────────────── */}
        <nav style={{ display: isMobile ? "none" : "flex", alignItems: "center", gap: 2 }}>

          {/* Core links */}
          {mainLinks.map(link => (
            <Link key={link.href} href={link.href} style={navLink(pathname === link.href)}>
              {link.label}
              {link.hot && <HotBadge />}
            </Link>
          ))}

          {/* Specials 下拉 — 有有效专题才显示 */}
          {hasSpecials && (
            <div ref={specialsRef} style={{ position: "relative" }}>
              <button onClick={() => { setSpecialsOpen(v => !v); setMoreOpen(false); }}
                style={dropBtn(inSpecials, specialsOpen)}
                aria-haspopup="true" aria-expanded={specialsOpen}>
                ✦ Specials
                {chevron(specialsOpen)}
              </button>
              {specialsOpen && (
                <div style={dropPanel}>
                  {activeSpecials.map(s => (
                    <Link key={s.href} href={s.href}
                      onClick={() => setSpecialsOpen(false)}
                      style={dropLink(pathname === s.href)}>
                      {s.emoji && <span style={{ fontSize: 15 }}>{s.emoji}</span>}
                      <span style={{ flex: 1 }}>
                        <span style={{ display: "block", fontWeight: 500 }}>{s.label}</span>
                        {s.desc && <span style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 400 }}>{s.desc}</span>}
                      </span>
                      {s.hot && <HotBadge />}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* More Tools 下拉 */}
          <div ref={moreRef} style={{ position: "relative" }}>
            <button onClick={() => { setMoreOpen(v => !v); setSpecialsOpen(false); }}
              style={dropBtn(inMore, moreOpen)}
              aria-haspopup="true" aria-expanded={moreOpen}>
              More Tools
              {chevron(moreOpen)}
            </button>
            {moreOpen && (
              <div style={dropPanel}>
                <div style={sectionLabel}>Drawing Prompts</div>
                {humanLinks.map(link => (
                  <Link key={link.href} href={link.href}
                    onClick={() => setMoreOpen(false)}
                    style={dropLink(pathname === link.href)}>
                    {link.label}
                  </Link>
                ))}
                <div style={{ height: 1, background: "var(--border)", margin: "4px 8px" }} />
                <div style={sectionLabel}>Other</div>
                {otherLinks.map(link => (
                  <Link key={link.href} href={link.href}
                    onClick={() => setMoreOpen(false)}
                    style={dropLink(pathname === link.href)}>
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Pricing CTA */}
          <Link href="/pricing" style={{
            marginLeft: 10, padding: "7px 16px", borderRadius: 8,
            fontSize: 13, fontWeight: 600, color: "var(--bg)",
            background: "var(--text-primary)", textDecoration: "none",
            transition: "background 0.15s",
          }}>Pricing</Link>

          <div style={{ marginLeft: 8 }}><AuthNavWrapper /></div>
        </nav>

        {/* ── Mobile hamburger ────────────────────────────────────── */}
        <button onClick={() => setMobileOpen(!mobileOpen)} style={{
          display: isMobile ? "block" : "none",
          background: "none", border: "none", cursor: "pointer",
          padding: 8, color: "var(--text-primary)",
        }} aria-label="Menu">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {mobileOpen
              ? <path d="M6 6L16 16M16 6L6 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              : <>
                  <line x1="4" y1="7"  x2="18" y2="7"  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="4" y1="11" x2="18" y2="11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="4" y1="15" x2="18" y2="15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </>
            }
          </svg>
        </button>
      </div>

      {/* ── Mobile drawer ───────────────────────────────────────────── */}
      {mobileOpen && isMobile && (
        <div style={{ position: "fixed", inset: 0, zIndex: 49, display: "flex", flexDirection: "column" }}>
          {/* Backdrop */}
          <div onClick={() => setMobileOpen(false)} style={{
            position: "absolute", inset: 0,
            background: "rgba(26,23,20,0.45)", backdropFilter: "blur(2px)",
          }} />

          {/* Panel */}
          <div style={{
            position: "relative", background: "var(--surface)",
            width: "100%", maxHeight: "90dvh", overflowY: "auto",
            paddingBottom: 24, boxShadow: "0 8px 40px rgba(26,23,20,0.18)",
            animation: "mobileDrawerIn 0.22s cubic-bezier(0.22,1,0.36,1) both",
          }}>
            {/* Drawer header */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "0 16px", height: 56, borderBottom: "1px solid var(--border)",
            }}>
              <Link href="/" onClick={() => setMobileOpen(false)} style={{ textDecoration: "none" }}>
                <span className="font-serif" style={{ fontSize: 20, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.03em" }}>
                  Draw<span style={{ color: "var(--accent)" }}>Prompt</span>
                </span>
              </Link>
              <button onClick={() => setMobileOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", padding: 8, color: "var(--text-primary)" }} aria-label="Close">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M6 6L16 16M16 6L6 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div style={{ padding: "8px 12px" }}>

              {/* Specials section — 有才显示 */}
              {hasSpecials && (
                <>
                  <div style={{ fontSize: 10, fontWeight: 600, color: "var(--accent)", letterSpacing: "0.08em", textTransform: "uppercase", padding: "12px 8px 4px" }}>
                    ✦ Specials
                  </div>
                  {activeSpecials.map(s => (
                    <Link key={s.href} href={s.href} onClick={() => setMobileOpen(false)} style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "10px 10px", borderRadius: 10,
                      color: pathname === s.href ? "var(--text-primary)" : "var(--text-secondary)",
                      background: pathname === s.href ? "var(--bg-warm)" : "transparent",
                      textDecoration: "none", marginBottom: 2,
                    }}>
                      {s.emoji && <span style={{ fontSize: 18, lineHeight: 1 }}>{s.emoji}</span>}
                      <span style={{ flex: 1 }}>
                        <span style={{ display: "block", fontSize: 14, fontWeight: 500 }}>{s.label}</span>
                        {s.desc && <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{s.desc}</span>}
                      </span>
                      {s.hot && <HotBadge />}
                    </Link>
                  ))}
                  <div style={{ height: 1, background: "var(--border)", margin: "6px 4px 0" }} />
                </>
              )}

              {/* Core links */}
              <div style={{ fontSize: 10, fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", padding: "12px 8px 4px" }}>
                AI Image Generation
              </div>
              {mainLinks.map(link => (
                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "11px 10px", borderRadius: 10, fontSize: 15,
                  fontWeight: pathname === link.href ? 600 : 400,
                  color: pathname === link.href ? "var(--text-primary)" : "var(--text-secondary)",
                  background: pathname === link.href ? "var(--bg-warm)" : "transparent",
                  textDecoration: "none", marginBottom: 2,
                }}>
                  {link.label}
                  {link.hot && <HotBadge />}
                </Link>
              ))}

              <div style={{ height: 1, background: "var(--border)", margin: "8px 4px" }} />

              {/* More Tools */}
              <div style={{ fontSize: 10, fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", padding: "8px 8px 4px" }}>
                More Tools
              </div>
              {humanLinks.map(link => (
                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} style={{
                  display: "block", padding: "11px 10px", borderRadius: 10, fontSize: 15,
                  fontWeight: pathname === link.href ? 600 : 400,
                  color: pathname === link.href ? "var(--text-primary)" : "var(--text-secondary)",
                  background: pathname === link.href ? "var(--bg-warm)" : "transparent",
                  textDecoration: "none", marginBottom: 2,
                }}>
                  {link.label}
                </Link>
              ))}

              <div style={{ height: 1, background: "var(--border)", margin: "8px 4px" }} />

              {/* Bottom actions */}
              <div style={{ display: "flex", gap: 8, padding: "10px 8px 0" }}>
                <Link href="/saved" onClick={() => setMobileOpen(false)} style={{ flex: 1, textAlign: "center", padding: "10px 16px", borderRadius: 10, fontSize: 14, fontWeight: 500, color: "var(--text-secondary)", background: "var(--bg-warm)", textDecoration: "none" }}>
                  Saved
                </Link>
                <Link href="/pricing" onClick={() => setMobileOpen(false)} style={{ flex: 1, textAlign: "center", padding: "10px 16px", borderRadius: 10, fontSize: 14, fontWeight: 600, color: "var(--bg)", background: "var(--text-primary)", textDecoration: "none" }}>
                  Pricing
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
