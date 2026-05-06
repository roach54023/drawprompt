# DrawPrompt 部署指南

> 技术栈：Next.js 16 + Turso + Cloudflare R2 + Vercel  
> 预计部署耗时：30~45 分钟（纯手动操作部分）

---

## 一、Agent 已完成的事项 ✅

以下工作已由 Agent 自动完成，**你无需操作**：

| # | 事项 | 说明 |
|---|------|------|
| 1 | `.gitignore` 添加 `local.db` | 防止本地开发数据库被提交 |
| 2 | `.env.example` 更新为 Turso 方案 | 移除旧的 D1 配置，使用 Turso URL + Token |
| 3 | `better-sqlite3` 移至 devDependencies | 避免 Vercel 部署时编译原生模块 |
| 4 | `next.config.ts` 添加 serverExternalPackages | 确保 webpack 不打包 better-sqlite3 |
| 5 | Turso 数据库初始化 | 8 张表已创建完毕（users, credits, generations 等） |
| 6 | API 路由迁移 | 从 execSync 改为 fetch()，兼容 Vercel Serverless |

---

## 二、你需要手动完成的事项 🔧

### 2.1 Cloudflare R2（图片存储）

**在哪操作**：https://dash.cloudflare.com → R2 Object Storage

1. **创建 Bucket**
   - 名称：`drawprompt-images`
   - 地区：Auto（或选 US East）

2. **开启公开访问**
   - Bucket Settings → Public Access → 开启
   - 或绑定自定义域名 `images.drawprompt.org`

3. **创建 API Token**
   - R2 → Manage R2 API Tokens → Create API token
   - 权限：Object Read & Write
   - 范围：限定到 `drawprompt-images` 这个 bucket
   - 记录：`Access Key ID`、`Secret Access Key`、`Account ID`

4. **记录以下值**：
   ```
   R2_BUCKET=drawprompt-images
   R2_ACCOUNT_ID=你的账户ID
   R2_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com
   R2_ACCESS_KEY_ID=刚创建的key
   R2_SECRET_ACCESS_KEY=刚创建的secret
   NEXT_PUBLIC_STORAGE_URL=https://images.drawprompt.org（或R2公开URL）
   ```

---

### 2.2 Cloudflare Turnstile（人机验证）

**在哪操作**：https://dash.cloudflare.com → Turnstile

1. 创建站点
   - 域名：`drawprompt.org`
   - Widget type：Managed（推荐）
   
2. **记录以下值**：
   ```
   NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x...
   TURNSTILE_SECRET_KEY=0x...
   ```

---

### 2.3 Google OAuth（用户登录）

**在哪操作**：https://console.cloud.google.com → APIs & Services → Credentials

1. 找到你已有的 OAuth 2.0 Client
2. **添加生产环境重定向 URI**：
   ```
   https://drawprompt.org/api/auth/callback/google
   ```
   （如果还没绑域名，先用 `https://your-app.vercel.app/api/auth/callback/google`）
3. 确保 `NEXT_PUBLIC_GOOGLE_CLIENT_ID` 和 `GOOGLE_SECRET_ID` 不变

---

### 2.4 PayPal（支付 - Sandbox → Production）

**在哪操作**：https://developer.paypal.com/dashboard

1. **创建 Live App**
   - My Apps & Credentials → Live → Create App
   - 记录 `Client ID` 和 `Secret`

2. **创建订阅计划（Live）**
   - Subscriptions → Create Plan
   - 按你的定价创建 Basic / Pro / Ultimate 计划
   - 记录每个计划的 Plan ID

3. **创建 Webhook（Live）**
   - Webhooks → Create Webhook
   - URL：`https://drawprompt.org/api/paypal/webhook`
   - 订阅事件：
     - `BILLING.SUBSCRIPTION.ACTIVATED`
     - `BILLING.SUBSCRIPTION.CANCELLED`
     - `BILLING.SUBSCRIPTION.EXPIRED`
     - `PAYMENT.SALE.COMPLETED`
   - 记录 `Webhook ID`

4. **记录以下值**：
   ```
   NEXT_PUBLIC_PAYPAL_CLIENT_ID=Live的Client ID
   PAYPAL_SECRET=Live的Secret
   PAYPAL_WEBHOOK_ID=刚创建的webhook ID
   PAYPAL_MODE=live
   ```

---

### 2.5 生成 NEXTAUTH_SECRET

在终端运行：
```bash
openssl rand -base64 32
```
记录输出值，这是你的 `NEXTAUTH_SECRET`。

---

### 2.6 Vercel 环境变量配置

**在哪操作**：https://vercel.com → 你的项目 → Settings → Environment Variables

需要添加以下所有变量（Environment 选 Production）：

```env
# 站点
NEXT_PUBLIC_SITE_URL=https://drawprompt.org

# 数据库（Turso）
TURSO_DATABASE_URL=libsql://drawprompt-roach54023.aws-us-east-1.turso.io
TURSO_AUTH_TOKEN=你的token

# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=（你已有的）
GOOGLE_SECRET_ID=（你已有的）
NEXTAUTH_URL=https://drawprompt.org
NEXTAUTH_SECRET=（上面生成的）

# PayPal
NEXT_PUBLIC_PAYPAL_CLIENT_ID=（Live的）
PAYPAL_SECRET=（Live的）
PAYPAL_WEBHOOK_ID=（Live的）
PAYPAL_MODE=live

# GPT Image API
OPENAI_API_KEY=（你的API易key）
OPENAI_API_BASE_URL=https://api.apiyi.com

# Cloudflare R2
R2_BUCKET=drawprompt-images
R2_ACCOUNT_ID=（你的）
R2_ENDPOINT=https://xxx.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=（你的）
R2_SECRET_ACCESS_KEY=（你的）
NEXT_PUBLIC_STORAGE_URL=https://images.drawprompt.org

# 业务
FREE_CREDITS=1

# Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=（你的）
TURNSTILE_SECRET_KEY=（你的）
```

---

### 2.7 域名绑定

**在哪操作**：Vercel → 你的项目 → Settings → Domains

1. 添加 `drawprompt.org`
2. 按 Vercel 提示去你的域名注册商添加 DNS 记录（通常是 CNAME 指向 `cname.vercel-dns.com`）
3. 等待 SSL 证书签发（通常 1-5 分钟）

**R2 自定义域名**（可选）：
- Cloudflare DNS 添加 `images.drawprompt.org` → CNAME 到 R2 bucket URL

---

## 三、部署流程

所有环境变量配好后：

1. **推送代码到 GitHub**
   ```bash
   git add .
   git commit -m "ready for production"
   git push origin main
   ```

2. **Vercel 自动构建部署**
   - 如果已连接 GitHub 仓库，push 后自动触发
   - 如果未连接，在 Vercel Dashboard Import 你的 repo

3. **验证部署**
   - 访问 `https://drawprompt.org`
   - 测试 Google 登录
   - 测试生成图片
   - 测试 PayPal 支付

---

## 四、部署后需要让 Agent 做的事（可选）

部署上线后如果遇到问题，可以让 Agent 帮你：

| 事项 | 说明 |
|------|------|
| PayPal 订阅计划 ID 写入代码 | 把 Live Plan ID 更新到前端 pricing 组件 |
| CORS 配置调试 | 如果 R2 图片跨域访问有问题 |
| Turso 数据库备份脚本 | 定期导出数据 |
| 监控与告警 | 设置 Vercel Analytics 或 Sentry |

---

## 五、成本概览（月度）

| 服务 | 免费额度 | 预计费用 |
|------|----------|----------|
| Vercel（Hobby） | 100GB 带宽、无限部署 | $0 |
| Turso | 9GB 存储、500M 行读取 | $0 |
| Cloudflare R2 | 10GB 存储、10M 读 | $0（初期） |
| Turnstile | 无限制 | $0 |
| Google OAuth | 免费 | $0 |
| API易（GPT-image） | 按量付费 | 看用量 |
| PayPal | 交易手续费 2.9%+0.3 | 按收入 |

**基础运行成本：$0/月**（不含 API 调用费用）
