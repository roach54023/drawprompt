/**
 * DrawPrompts — NextAuth 认证路由
 * 支持 Google OAuth + Google One Tap
 * 参考 StickerShow 实现，适配 Next.js 16
 */
import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { checkAndSaveUser, getUserByEmail } from "@/servers/user";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET_ID!,
    }),
    // Google One Tap 登录（通过 Credentials Provider 验证 idToken）
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

        // 验证 Google idToken
        // 在 Cloudflare Workers 运行时，使用 fetch 验证而非 google-auth-library
        const tokenInfoRes = await fetch(
          `https://oauth2.googleapis.com/tokeninfo?id_token=${credentials.credential}`
        );

        if (!tokenInfoRes.ok) {
          throw new Error("Invalid Google token");
        }

        const payload = await tokenInfoRes.json();

        // 验证 audience
        if (payload.aud !== process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
          throw new Error("Token audience mismatch");
        }

        const { email, name, picture: image } = payload;
        if (!email) {
          throw new Error("Email not available");
        }

        await checkAndSaveUser(name || "", email, image || "", null);

        return { id: email, email, name, image };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: false,
  callbacks: {
    async signIn({ user }) {
      if (user?.email) {
        await checkAndSaveUser(
          user.name || "",
          user.email,
          user.image || "",
          null
        );
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async session({ session }) {
      if (session?.user?.email) {
        const dbUser = await getUserByEmail(session.user.email);
        if (dbUser.status === 1) {
          session.user = dbUser as typeof session.user;
        }
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

