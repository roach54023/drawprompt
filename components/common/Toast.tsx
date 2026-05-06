"use client";

import { useEffect, useState } from "react";

export interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
  onClose: () => void;
  /** 可选：显示积分变化 */
  creditsDelta?: number;
}

export default function Toast({
  message,
  type = "success",
  duration = 4000,
  onClose,
  creditsDelta,
}: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // 入场动画
    requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // 等退场动画完成再移除
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor =
    type === "success" ? "#1a7a3a" : type === "error" ? "#c0392b" : "#2d6bcf";
  const icon = type === "success" ? "✓" : type === "error" ? "✗" : "ℹ";

  return (
    <div
      style={{
        position: "fixed",
        top: 24,
        left: "50%",
        transform: `translateX(-50%) translateY(${visible ? "0" : "-20px"})`,
        opacity: visible ? 1 : 0,
        transition: "all 0.3s ease",
        zIndex: 10000,
        background: bgColor,
        color: "#fff",
        padding: "14px 28px",
        borderRadius: 12,
        boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
        display: "flex",
        alignItems: "center",
        gap: 12,
        fontSize: 15,
        fontWeight: 500,
        maxWidth: "90vw",
      }}
    >
      <span
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        {icon}
      </span>
      <div>
        <div>{message}</div>
        {creditsDelta !== undefined && creditsDelta > 0 && (
          <div
            style={{
              fontSize: 13,
              opacity: 0.9,
              marginTop: 2,
              fontWeight: 400,
            }}
          >
            +{creditsDelta} credits added to your account
          </div>
        )}
      </div>
    </div>
  );
}
