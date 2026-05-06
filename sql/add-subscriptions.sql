-- DrawPrompts — 订阅表 migration
-- 用于支持 PayPal 自动续费订阅

-- ============================================
-- subscriptions — 用户订阅记录
-- ============================================
CREATE TABLE IF NOT EXISTS subscriptions (
  id                    INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id               TEXT NOT NULL,
  paypal_subscription_id TEXT NOT NULL UNIQUE,
  plan                  TEXT NOT NULL CHECK (plan IN ('starter', 'pro', 'premium')),
  status                TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'cancelled', 'suspended', 'expired')),
  credits_per_cycle     INTEGER NOT NULL,
  price_usd             REAL NOT NULL,
  current_period_start  TEXT,
  current_period_end    TEXT,
  cancelled_at          TEXT,
  created_at            TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at            TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES user_info(user_id)
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_paypal_id ON subscriptions(paypal_subscription_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);

-- ============================================
-- subscription_payments — 订阅周期付款记录
-- 每次自动扣费成功后记录（用于幂等检查和审计）
-- ============================================
CREATE TABLE IF NOT EXISTS subscription_payments (
  id                    INTEGER PRIMARY KEY AUTOINCREMENT,
  subscription_id       TEXT NOT NULL,
  paypal_payment_id     TEXT NOT NULL UNIQUE,
  amount_usd            REAL NOT NULL,
  credits_granted       INTEGER NOT NULL,
  billing_period_start  TEXT,
  billing_period_end    TEXT,
  created_at            TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (subscription_id) REFERENCES subscriptions(paypal_subscription_id)
);

CREATE INDEX IF NOT EXISTS idx_sub_payments_subscription ON subscription_payments(subscription_id);
CREATE INDEX IF NOT EXISTS idx_sub_payments_paypal_id ON subscription_payments(paypal_payment_id);
