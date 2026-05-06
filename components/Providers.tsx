"use client";

/**
 * 全局 Provider 包装器
 * 始终包含 SessionProvider（它在无认证时也是安全的，不会报错）
 * UserProvider 只有在配置了认证时才真正获取用户数据
 */
import { AuthProvider } from "@/context/AuthProvider";
import { UserProvider } from "@/context/UserContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  // 始终提供 SessionProvider 包装（即使未配置 OAuth）
  // SessionProvider 在没有 [...nextauth] 路由时也不会报错，
  // 只是 session 始终为 null
  return (
    <AuthProvider>
      <UserProvider>
        {children}
      </UserProvider>
    </AuthProvider>
  );
}
