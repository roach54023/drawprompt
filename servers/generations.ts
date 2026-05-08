/**
 * DrawPrompts — 生成记录服务层（Cloudflare D1 版）
 */
import { getDb } from "@/lib/db";
import type { QualityTier } from "@/lib/qualityConfig";

/**
 * 创建生成记录（pending 状态）
 */
export async function createGeneration(params: {
  generationId: string;
  userId: string;
  promptSlug: string | null;
  promptText: string;
  quality: QualityTier;
  creditsCost: number;
  apiModel: string;
  apiSize: string | undefined;
}): Promise<void> {
  const db = getDb();
  await db
    .prepare(
      `INSERT INTO generations(generation_id, user_id, prompt_slug, prompt_text, quality, credits_cost, api_model, api_quality, status)
       VALUES(?, ?, ?, ?, ?, ?, ?, ?, 'pending')`
    )
    .bind(
      params.generationId,
      params.userId,
      params.promptSlug,
      params.promptText,
      params.quality,
      params.creditsCost,
      params.apiModel,
      params.apiSize ?? null
    )
    .run();
}

/**
 * 标记生成成功
 */
export async function markGenerationSuccess(
  generationId: string,
  imageUrl: string
): Promise<void> {
  const db = getDb();
  await db
    .prepare(
      `UPDATE generations SET status = 'success', image_url = ? WHERE generation_id = ?`
    )
    .bind(imageUrl, generationId)
    .run();
}

/**
 * 标记生成失败
 */
export async function markGenerationFailed(
  generationId: string,
  errorMessage: string
): Promise<void> {
  const db = getDb();
  await db
    .prepare(
      `UPDATE generations SET status = 'failed', error_message = ? WHERE generation_id = ?`
    )
    .bind(errorMessage, generationId)
    .run();
}

/**
 * 获取用户生成历史（分页）
 */
export async function getUserGenerations(
  userId: string,
  page: number = 1,
  limit: number = 20
) {
  const db = getDb();
  const offset = (page - 1) * limit;

  const [dataResult, countResult] = await Promise.all([
    db
      .prepare(
        `SELECT generation_id, prompt_slug, prompt_text, quality, credits_cost, image_url, status, error_message, created_at
         FROM generations
         WHERE user_id = ?
         ORDER BY created_at DESC
         LIMIT ? OFFSET ?`
      )
      .bind(userId, limit, offset)
      .all<Record<string, unknown>>(),
    db
      .prepare(
        `SELECT COUNT(*) as total FROM generations WHERE user_id = ?`
      )
      .bind(userId)
      .first<{ total: number }>(),
  ]);

  return {
    generations: dataResult.results.map((row) => ({
      generation_id: row.generation_id as string,
      prompt_slug: row.prompt_slug as string | null,
      prompt_text: row.prompt_text as string,
      quality: row.quality as string,
      credits_cost: row.credits_cost as number,
      image_url: row.image_url as string | null,
      status: row.status as string,
      error_message: row.error_message as string | null,
      created_at: row.created_at as string,
    })),
    total: countResult?.total ?? 0,
    page,
    limit,
  };
}
