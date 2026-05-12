/**
 * DrawPrompts — 图片生成类型定义
 */

export interface GenerateImageParams {
  prompt: string;
  model: string;
  size?: string;
  quality?: string;
}

export interface GenerateImageResult {
b64_json: string;
model_used: string;
used_fallback?: boolean;
}
