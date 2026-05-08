/**
 * DrawPrompts — NextAuth 认证路由
 * 支持 Google OAuth + Google One Tap
 *
 * 关键设计：
 * 1. 显式 JWT session strategy（不依赖数据库存 session）
 * 2. jwt callback 中保存用户信息（避免 session callback 每次都查 DB）
 * 3. session callback 中仅从 token 读取，不查数据库
 * 4. signIn callback 中保存/更新用户到数据库（只在登录时查一次 DB）
 * 5. maxDuration = 60 防止 Vercel 超时
 */
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { checkAndSaveUser, getUserByEmail } from "@/servers/user";

export const maxDuration = 60;

export const authOptions: NextAuthOptions = {
  providers: [
    {
      // 手动配置 Google OAuth，跳过 OIDC 自动发现
      id: "google",
      name: "Google",
      type: "oauth",
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET_ID!,
      authorization: {
        url: "https://accounts.google.com/o/oauth2/v2/auth",
        params: {
          scope: "openid email profile",
          response_type: "code",
        },
      },
      token: "https://oauth2.googleapis.com/token",
      userinfo: "https://openidconnect.googleapis.com/v1/userinfo",
      issuer: "https://accounts.google.com",
      jwks_endpoint: "https://www.googleapis.com/oauth2/v3/certs",
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    },
    // Google One Tap 登录
    CredentialsProvider({
      id: "googleonetap",
      name: "google-one-tap",
      credentials: {
        credential: { type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.credential) {
          throw new Error("No credential provided");
        }

        const idToken = credentials.credential;

        // 验证 Google idToken：优先 tokeninfo API，fallback 本地 JWT decode
        let payload: Record<string, string>;

        try {
          const tokenInfoRes = await fetch(
            `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`,
            { signal: AbortSignal.timeout(8000) }
          );

          if (!tokenInfoRes.ok) {
            throw new Error("tokeninfo returned non-OK");
          }

          payload = await tokenInfoRes.json();
        } catch {
          // Fallback: 本地 base64 解码 JWT payload
          const parts = idToken.split(".");
          if (parts.length !== 3) {
            throw new Error("Invalid token format");
          }
          const base64Url = parts[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const jsonPayload = Buffer.from(base64, "base64").toString("utf-8");
          payload = JSON.parse(jsonPayload);
        }

        // 验证 audience
        if (payload.aud !== process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
          throw new Error("Token audience mismatch");
        }

        // 验证 issuer
        if (
          payload.iss !== "accounts.google.com" &&
          payload.iss !== "https://accounts.google.com"
        ) {
          throw new Error("Token issuer mismatch");
        }

        // 验证未过期
        const now = Math.floor(Date.now() / 1000);
        if (payload.exp && Number(payload.exp) < now) {
          throw new Error("Token expired");
        }

        const { email, name, picture: image } = payload;
        if (!email) {
          throw new Error("Email not available");
        }

        // 保存用户到数据库
        await checkAndSaveUser(name || "", email, image || "", null);

        return { id: email, email, name, image };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",

  // 显式 JWT session：不依赖数据库存 session，token 自包含用户信息
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 天
  },

  callbacks: {
    /**
     * signIn: 登录时保存/更新用户到数据库（仅触发一次）
     */
    async signIn({ user }) {
      if (user?.email) {
        try {
          await checkAndSaveUser(
            user.name || "",
            user.email,
            user.image || "",
            null
          );
        } catch (err) {
          console.error("[Auth] checkAndSaveUser failed:", err);
          // 不阻止登录，数据库暂时不可用也让用户能登录
        }
      }
      return true;
    },

    /**
     * jwt: 登录时把用户信息写入 JWT token（后续请求直接从 token 读取）
     */
    async jwt({ token, user }) {
      if (user) {
        // 首次登录，从 user 对象获取信息
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;

        // 查询数据库获取 user_id（存入 token 避免后续重复查询）
        if (user.email) {
          try {
            const dbUser = await getUserByEmail(user.email);
            if (dbUser.status === 1) {
              token.user_id = dbUser.user_id;
            }
          } catch (err) {
            console.error("[Auth] getUserByEmail in jwt callback failed:", err);
          }
        }
      }
      return token;
    },

    /**
     * session: 从 JWT token 构建 session（不查数据库！）
     * 这确保了即使数据库暂时不可用，session 仍然有效
     */
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          email: token.email as string,
          name: token.name as string,
          image: token.picture as string,
          // 扩展字段
          user_id: token.user_id as string,
        } as typeof session.user;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
