-- DrawPrompts 数据库初始化脚本
-- 兼容 Cloudflare D1 (SQLite)

-- ============================================
-- 1. user_info — 用户表
-- ============================================
CREATE TABLE IF NOT EXISTS user_info (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id       TEXT NOT NULL UNIQUE,
  name          TEXT,
  email         TEXT NOT NULL UNIQUE,
  image         TEXT,
  last_login_ip TEXT,
  created_at    TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ============================================
-- 2. user_credits — 用户积分余额表
-- ============================================
CREATE TABLE IF NOT EXISTS user_credits (
  id                      INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id                 TEXT NOT NULL UNIQUE,
  balance                 INTEGER NOT NULL DEFAULT 0,
  total_purchased         INTEGER NOT NULL DEFAULT 0,
  total_consumed          INTEGER NOT NULL DEFAULT 0,
  membership              TEXT DEFAULT 'free',
  membership_expires_at   TEXT,
  created_at              TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at              TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES user_info(user_id)
);

-- ============================================
-- 3. orders — 订单表
-- ============================================
CREATE TABLE IF NOT EXISTS orders (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id        TEXT NOT NULL UNIQUE,
  user_id         TEXT NOT NULL,
  plan            TEXT NOT NULL CHECK (plan IN ('starter', 'pro', 'premium')),
  amount_usd      REAL NOT NULL,
  credits_granted INTEGER NOT NULL,
  membership_days INTEGER NOT NULL DEFAULT 30,
  payment_channel TEXT DEFAULT 'paypal',
  payment_id      TEXT,
  status          TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'refunded', 'cancelled')),
  created_at      TEXT NOT NULL DEFAULT (datetime('now')),
  paid_at         TEXT,
  updated_at      TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES user_info(user_id)
);

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_payment_id ON orders(payment_id);

-- ============================================
-- 4. credit_transactions — 积分流水表
-- ============================================
CREATE TABLE IF NOT EXISTS credit_transactions (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id         TEXT NOT NULL,
  type            TEXT NOT NULL CHECK (type IN ('recharge', 'consume', 'refund', 'gift')),
  amount          INTEGER NOT NULL,
  balance_before  INTEGER NOT NULL,
  balance_after   INTEGER NOT NULL,
  order_id        TEXT,
  generation_id   TEXT,
  description     TEXT,
  created_at      TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES user_info(user_id)
);

CREATE INDEX IF NOT EXISTS idx_credit_tx_user_id ON credit_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_credit_tx_created_at ON credit_transactions(created_at);

-- ============================================
-- 5. generations — 图片生成记录表
-- ============================================
CREATE TABLE IF NOT EXISTS generations (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  generation_id   TEXT NOT NULL UNIQUE,
  user_id         TEXT NOT NULL,
  prompt_slug     TEXT,
  prompt_text     TEXT NOT NULL,
  quality         TEXT NOT NULL CHECK (quality IN ('fast', 'standard', 'hd', 'ultra')),
  credits_cost    INTEGER NOT NULL,
  api_model       TEXT,
  api_quality     TEXT,
  image_url       TEXT,
  status          TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed')),
  error_message   TEXT,
  created_at      TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES user_info(user_id)
);

CREATE INDEX IF NOT EXISTS idx_generations_user_id ON generations(user_id);
CREATE INDEX IF NOT EXISTS idx_generations_created_at ON generations(created_at);
