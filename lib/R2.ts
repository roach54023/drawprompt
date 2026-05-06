/**
 * DrawPrompts — Cloudflare R2 图片上传
 * 使用 @aws-sdk/client-s3 v3（轻量，兼容 Cloudflare Pages 25MB bundle 限制）
 */
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

let s3Client: S3Client | null = null;

function getS3Client(): S3Client {
  if (!s3Client) {
    s3Client = new S3Client({
      region: "auto",
      endpoint: process.env.R2_ENDPOINT!,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
      },
    });
  }
  return s3Client;
}

/**
 * 上传 base64 图片到 R2
 * @param base64Data - 不带 data:xxx;base64, 前缀的纯 base64 字符串
 * @param fileName - 文件名（如 "abc123.png"）
 * @returns 公开访问的图片 URL
 */
export async function uploadToR2(
  base64Data: string,
  fileName: string
): Promise<string> {
  const client = getS3Client();

  // 将 base64 转为 Uint8Array（兼容 Workers 运行时，不依赖 Node.js Buffer）
  const binaryString = atob(base64Data);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  const key = `generations/${fileName}`;

  await client.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET!,
      Key: key,
      Body: bytes,
      ContentType: "image/png",
    })
  );

  return `${process.env.NEXT_PUBLIC_STORAGE_URL}/${key}`;
}
