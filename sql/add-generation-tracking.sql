-- 给 generations 表增加生成追踪字段
-- used_fallback: 是否使用了备用令牌（Default 分组）
-- duration_ms:   生成耗时（毫秒）

ALTER TABLE generations ADD COLUMN used_fallback INTEGER DEFAULT 0;
ALTER TABLE generations ADD COLUMN duration_ms INTEGER;
