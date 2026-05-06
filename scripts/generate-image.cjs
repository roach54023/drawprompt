/**
 * 独立 Node.js 脚本：调用图片生成 API
 * 完全脱离 Next.js/Turbopack 运行时，避免 TLS 兼容问题
 *
 * 用法: node scripts/generate-image.cjs <input.json>
 * input.json 格式:
 *   文生图: { url, body, apiKey }
 *   图片编辑: { url, body, apiKey, mode: "edit", imageBase64: "..." }
 * 输出: JSON 到 stdout { status, data }
 */
const https = require('https');
const crypto = require('crypto');
const fs = require('fs');

const inputPath = process.argv[2];
if (!inputPath) {
  process.stderr.write('Usage: node generate-image.cjs <input.json>\n');
  process.exit(1);
}

const input = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
const { url, body, apiKey, mode, imageBase64 } = input;

const parsed = new URL(url);

/**
 * 发送 JSON 请求（文生图）
 */
function sendJsonRequest() {
  const bodyStr = typeof body === 'string' ? body : JSON.stringify(body);

  const options = {
    hostname: parsed.hostname,
    port: 443,
    path: parsed.pathname,
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(bodyStr),
    },
  };

  const req = https.request(options, (res) => {
    const chunks = [];
    res.on('data', (c) => chunks.push(c));
    res.on('end', () => {
      const output = JSON.stringify({
        status: res.statusCode,
        data: Buffer.concat(chunks).toString('utf-8'),
      });
      process.stdout.write(output);
    });
  });

  req.on('error', (err) => {
    const output = JSON.stringify({
      status: 0,
      data: JSON.stringify({ error: { message: err.message } }),
    });
    process.stdout.write(output);
    process.exit(0);
  });

  req.setTimeout(360000, () => {
    req.destroy();
    const output = JSON.stringify({
      status: 0,
      data: JSON.stringify({ error: { message: 'Request timeout (360s)' } }),
    });
    process.stdout.write(output);
  });

  req.write(bodyStr);
  req.end();
}

/**
 * 发送 multipart/form-data 请求（图片编辑）
 */
function sendMultipartRequest() {
  const boundary = '----FormBoundary' + crypto.randomBytes(16).toString('hex');
  const params = typeof body === 'string' ? JSON.parse(body) : body;

  // 构建 multipart body parts
  const parts = [];

  // 文本字段
  const textFields = ['model', 'prompt', 'size', 'quality', 'output_format', 'n', 'response_format'];
  for (const field of textFields) {
    if (params[field] !== undefined && params[field] !== null) {
      parts.push(
        `--${boundary}\r\n` +
        `Content-Disposition: form-data; name="${field}"\r\n\r\n` +
        `${params[field]}\r\n`
      );
    }
  }

  // 图片文件字段（base64 解码为二进制）
  const imgBuffer = Buffer.from(imageBase64, 'base64');
  // 检测图片格式
  let imgExt = 'png';
  let imgMime = 'image/png';
  if (imgBuffer[0] === 0xFF && imgBuffer[1] === 0xD8) {
    imgExt = 'jpg';
    imgMime = 'image/jpeg';
  } else if (imgBuffer.slice(0, 4).toString() === 'RIFF' && imgBuffer.slice(8, 12).toString() === 'WEBP') {
    imgExt = 'webp';
    imgMime = 'image/webp';
  }

  const imgHeader = `--${boundary}\r\n` +
    `Content-Disposition: form-data; name="image[]"; filename="reference.${imgExt}"\r\n` +
    `Content-Type: ${imgMime}\r\n\r\n`;
  const imgFooter = `\r\n`;

  // 结束标记
  const ending = `--${boundary}--\r\n`;

  // 计算总长度
  const textPart = parts.join('');
  const textBuffer = Buffer.from(textPart, 'utf-8');
  const imgHeaderBuffer = Buffer.from(imgHeader, 'utf-8');
  const imgFooterBuffer = Buffer.from(imgFooter, 'utf-8');
  const endingBuffer = Buffer.from(ending, 'utf-8');

  const totalLength = textBuffer.length + imgHeaderBuffer.length + imgBuffer.length + imgFooterBuffer.length + endingBuffer.length;

  const options = {
    hostname: parsed.hostname,
    port: 443,
    path: parsed.pathname,
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': `multipart/form-data; boundary=${boundary}`,
      'Content-Length': totalLength,
    },
  };

  const req = https.request(options, (res) => {
    const chunks = [];
    res.on('data', (c) => chunks.push(c));
    res.on('end', () => {
      const output = JSON.stringify({
        status: res.statusCode,
        data: Buffer.concat(chunks).toString('utf-8'),
      });
      process.stdout.write(output);
    });
  });

  req.on('error', (err) => {
    const output = JSON.stringify({
      status: 0,
      data: JSON.stringify({ error: { message: err.message } }),
    });
    process.stdout.write(output);
    process.exit(0);
  });

  req.setTimeout(360000, () => {
    req.destroy();
    const output = JSON.stringify({
      status: 0,
      data: JSON.stringify({ error: { message: 'Request timeout (360s)' } }),
    });
    process.stdout.write(output);
  });

  // 写入数据
  req.write(textBuffer);
  req.write(imgHeaderBuffer);
  req.write(imgBuffer);
  req.write(imgFooterBuffer);
  req.write(endingBuffer);
  req.end();
}

// 根据 mode 选择请求方式
if (mode === 'edit') {
  sendMultipartRequest();
} else {
  sendJsonRequest();
}
