/**
 * DrawPrompts — 质量档位、会员等级、套餐定义
 * 所有业务常量集中管理
 */

export const QUALITY_CONFIG = {
  fast: {
    credits: 1,
    apiModel: "gpt-image-2",
    apiSize: "1024x1024",
    apiQuality: "low",
    minMembership: "free" as const,
    label: "Fast",
    description: "Quick generation, great for exploring ideas",
  },
  standard: {
    credits: 3,
    apiModel: "gpt-image-2",
    apiSize: "1024x1024",
    apiQuality: "medium",
    minMembership: "starter" as const,
    label: "Standard",
    description: "Clear and detailed, good for everyday use",
  },
  hd: {
    credits: 8,
    apiModel: "gpt-image-2",
    apiSize: "1024x1024",
    apiQuality: "high",
    minMembership: "pro" as const,
    label: "HD",
    description: "Sharp text rendering, poster-quality",
  },
  ultra: {
    credits: 12,
    apiModel: "gpt-image-2",
    apiSize: "1536x1024",
    apiQuality: "high",
    minMembership: "pro" as const,
    label: "Ultra",
    description: "Highest quality, wide format, commercial-grade",
  },
} as const;

export type QualityTier = keyof typeof QUALITY_CONFIG;

export const MEMBERSHIP_LEVEL = {
  free: 0,
  starter: 1,
  pro: 2,
  premium: 3,
} as const;

export type MembershipType = keyof typeof MEMBERSHIP_LEVEL;

export const DAILY_LIMITS = {
free: 5,
starter: 30,
pro: 50,
premium: 100,
} as const;

export const PLANS = {
  starter: { price: 5.90, credits: 100, days: 30, label: "Starter" },
  pro: { price: 14.90, credits: 300, days: 30, label: "Pro" },
  premium: { price: 29.90, credits: 800, days: 30, label: "Premium" },
} as const;

export type PlanType = keyof typeof PLANS;

/** 根据 prompt category 推荐质量档位 */
export const CATEGORY_QUALITY_RECOMMENDATION: Record<string, QualityTier> = {
  poster: "standard",
  "ui-design": "standard",
  infographic: "standard",
  photography: "fast",
  character: "fast",
  film: "fast",
  "photo-editing": "fast",
  game: "fast",
  product: "fast",
};

/** 判断用户会员等级是否允许使用某质量档位 */
export function canUseQuality(membership: MembershipType, quality: QualityTier): boolean {
  const requiredLevel = MEMBERSHIP_LEVEL[QUALITY_CONFIG[quality].minMembership];
  const userLevel = MEMBERSHIP_LEVEL[membership];
  return userLevel >= requiredLevel;
}

/** 获取用户可用的质量档位列表 */
export function getAllowedQualities(membership: MembershipType): QualityTier[] {
  return (Object.keys(QUALITY_CONFIG) as QualityTier[]).filter(q =>
    canUseQuality(membership, q)
  );
}

/** 获取有效的会员等级（考虑是否过期） */
export function getEffectiveMembership(
  membership: MembershipType,
  expiresAt: string | null
): MembershipType {
  if (membership === "free") return "free";
  if (!expiresAt) return "free";
  if (new Date(expiresAt) < new Date()) return "free";
  return membership;
}
