/**
 * DrawPrompts — GPT Image API 封装
 * 支持中转站 baseURL，随时可通过环境变量切换
 */

const BASE_URL = process.env.OPENAI_API_BASE_URL || "https://api.openai.com";

export interface GenerateImageParams {
  prompt: string;
  model: string; // gpt-image-1-mini 或 gpt-image-1
  quality: string; // low / medium / high
  size?: string; // 默认 1024x1024
}

export interface GenerateImageResult {
  b64_json: string;
  model_used?: string;
}

/**
 * 调用 GPT Image API 生成图片
 * @returns base64 编码的图片数据
 */
export async function generateImage(
  params: GenerateImageParams
): Promise<GenerateImageResult> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY environment variable is not set");
  }

  const res = await fetch(`${BASE_URL}/v1/images/generations`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: params.model,
      prompt: params.prompt,
      n: 1,
      size: params.size || "1024x1024",
      quality: params.quality,
      output_format: "png",
    }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: { message: "Unknown error" } }));
    throw new Error(
      error.error?.message || `Image generation failed with status ${res.status}`
    );
  }

  const data = await res.json();
  return { b64_json: data.data[0].b64_json };
}
