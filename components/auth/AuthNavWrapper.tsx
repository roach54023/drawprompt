"use client";

/**
 * 认证状态导航栏包装器
 * 只有配置了 NEXT_PUBLIC_GOOGLE_CLIENT_ID 环境变量时才显示登录按钮
 * 不影响现有线上逻辑
 */
import LoginButton from "./LoginButton";

export default function AuthNavWrapper() {
  // 如果未配置 Google OAuth，不显示任何内容
  if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
    return null;
  }

  return <LoginButton />;
}
