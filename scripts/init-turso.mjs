/**
 * 初始化 Turso 数据库 — 执行 init.sql + add-subscriptions.sql
 * Usage: node scripts/init-turso.mjs
 */
import { createClient } from "@libsql/client";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
  console.error("Error: TURSO_DATABASE_URL and TURSO_AUTH_TOKEN must be set in .env.local");
  process.exit(1);
}

const client = createClient({ url, authToken });

async function run() {
  console.log("Connecting to Turso:", url);

  // Read SQL files
  const initSql = readFileSync(join(root, "sql/init.sql"), "utf-8");
  const subsSql = readFileSync(join(root, "sql/add-subscriptions.sql"), "utf-8");

  console.log("\n[1/2] Executing init.sql...");
  await client.executeMultiple(initSql);
  console.log("✓ init.sql executed successfully");

  console.log("\n[2/2] Executing add-subscriptions.sql...");
  await client.executeMultiple(subsSql);
  console.log("✓ add-subscriptions.sql executed successfully");

  // Verify tables
  const tables = await client.execute("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name");
  console.log("\n✓ Tables created:");
  for (const row of tables.rows) {
    console.log(`  - ${row.name}`);
  }

  console.log("\nDone! Turso database is ready.");
}

run().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
