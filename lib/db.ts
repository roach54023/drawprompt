/**
 * DrawPrompts — 数据库访问层
 *
 * 双环境适配：
 * - 本地开发（next dev）：使用 better-sqlite3 直接读取 local.db
 * - 生产环境（Vercel）：使用 @libsql/client 连接 Turso
 *
 * 对外暴露统一的 D1-like API，server 层代码无需关心环境差异。
 */

import { createClient, type Client, type InStatement, type InValue } from "@libsql/client";

// ─── 类型定义（兼容 D1 API） ───

export interface D1Database {
  prepare(query: string): D1PreparedStatement;
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
  exec(query: string): Promise<{ count: number; duration: number }>;
}

export interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = unknown>(colName?: string): Promise<T | null>;
  run<T = unknown>(): Promise<D1Result<T>>;
  all<T = unknown>(): Promise<D1Result<T>>;
  raw<T = unknown>(): Promise<T[]>;
}

export interface D1Result<T = unknown> {
  results: T[];
  success: boolean;
  meta: {
    duration: number;
    changes: number;
    last_row_id: number;
    rows_read: number;
    rows_written: number;
  };
}

// ─── Turso/libSQL 适配器 ───

function createTursoDb(): D1Database {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url) {
    throw new Error("TURSO_DATABASE_URL environment variable is not set");
  }

  const client = createClient({
    url,
    authToken,
  });

  return {
    prepare(query: string): D1PreparedStatement {
      return createTursoStatement(client, query);
    },
    async batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]> {
      // 收集所有 statement 的 query 和 args，通过 Turso batch 执行
      const stmts = statements.map((s) => (s as TursoPreparedStatement)._getStmt() as InStatement);
      const results = await client.batch(stmts, "write");
      return results.map((r) => ({
        results: (r.rows as unknown as T[]) || [],
        success: true,
        meta: {
          duration: 0,
          changes: r.rowsAffected,
          last_row_id: Number(r.lastInsertRowid || 0),
          rows_read: r.rows.length,
          rows_written: r.rowsAffected,
        },
      }));
    },
    async exec(query: string) {
      await client.executeMultiple(query);
      return { count: 0, duration: 0 };
    },
  };
}

interface TursoPreparedStatement extends D1PreparedStatement {
  _getStmt(): { sql: string; args: unknown[] };
}

function createTursoStatement(client: Client, query: string): TursoPreparedStatement {
  let boundValues: InValue[] = [];

  const stmt: TursoPreparedStatement = {
    bind(...values: unknown[]): D1PreparedStatement {
      boundValues = values as InValue[];
      return stmt;
    },
    async first<T = unknown>(colName?: string): Promise<T | null> {
      const result = await client.execute({ sql: query, args: boundValues });
      if (result.rows.length === 0) return null;
      const row = result.rows[0];
      if (colName) return (row as Record<string, unknown>)[colName] as T;
      return row as unknown as T;
    },
    async run<T = unknown>(): Promise<D1Result<T>> {
      const result = await client.execute({ sql: query, args: boundValues });
      return {
        results: [] as T[],
        success: true,
        meta: {
          duration: 0,
          changes: result.rowsAffected,
          last_row_id: Number(result.lastInsertRowid || 0),
          rows_read: 0,
          rows_written: result.rowsAffected,
        },
      };
    },
    async all<T = unknown>(): Promise<D1Result<T>> {
      const result = await client.execute({ sql: query, args: boundValues });
      return {
        results: result.rows as unknown as T[],
        success: true,
        meta: {
          duration: 0,
          changes: 0,
          last_row_id: 0,
          rows_read: result.rows.length,
          rows_written: 0,
        },
      };
    },
    async raw<T = unknown>(): Promise<T[]> {
      const result = await client.execute({ sql: query, args: boundValues });
      // raw 返回数组形式的行
      return result.rows.map((row) => Object.values(row)) as unknown as T[];
    },
    _getStmt() {
      return { sql: query, args: boundValues };
    },
  };

  return stmt;
}

// ─── 本地开发：better-sqlite3 适配器 ───

function createLocalDb(): D1Database {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const Database = require("better-sqlite3");
  const path = require("path");

  const dbPath = path.join(process.cwd(), "local.db");
  const sqlite = new Database(dbPath);
  sqlite.pragma("journal_mode = WAL");
  sqlite.pragma("foreign_keys = ON");

  return {
    prepare(query: string): D1PreparedStatement {
      return createLocalStatement(sqlite, query);
    },
    async batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]> {
      const results: D1Result<T>[] = [];
      const transaction = sqlite.transaction(() => {
        for (const stmt of statements) {
          const result = (stmt as LocalPreparedStatement)._executeRun();
          results.push(result as D1Result<T>);
        }
      });
      transaction();
      return results;
    },
    async exec(query: string) {
      sqlite.exec(query);
      return { count: 0, duration: 0 };
    },
  };
}

interface LocalPreparedStatement extends D1PreparedStatement {
  _executeRun<T = unknown>(): D1Result<T>;
}

function createLocalStatement(sqlite: unknown, query: string): LocalPreparedStatement {
  let boundValues: unknown[] = [];

  const stmt: LocalPreparedStatement = {
    bind(...values: unknown[]): D1PreparedStatement {
      boundValues = values;
      return stmt;
    },
    async first<T = unknown>(colName?: string): Promise<T | null> {
      const db = sqlite as { prepare: (q: string) => { get: (...args: unknown[]) => Record<string, unknown> | undefined } };
      const prepared = db.prepare(query);
      const row = prepared.get(...boundValues);
      if (!row) return null;
      if (colName) return (row as Record<string, unknown>)[colName] as T;
      return row as T;
    },
    async run<T = unknown>(): Promise<D1Result<T>> {
      return stmt._executeRun();
    },
    async all<T = unknown>(): Promise<D1Result<T>> {
      const db = sqlite as { prepare: (q: string) => { all: (...args: unknown[]) => unknown[] } };
      const prepared = db.prepare(query);
      const rows = prepared.all(...boundValues);
      return {
        results: rows as T[],
        success: true,
        meta: { duration: 0, changes: 0, last_row_id: 0, rows_read: rows.length, rows_written: 0 },
      };
    },
    async raw<T = unknown>(): Promise<T[]> {
      const db = sqlite as { prepare: (q: string) => { raw: (...args: unknown[]) => unknown[] } };
      const prepared = db.prepare(query);
      const rows = prepared.raw(...boundValues);
      return rows as T[];
    },
    _executeRun<T = unknown>(): D1Result<T> {
      const db = sqlite as { prepare: (q: string) => { run: (...args: unknown[]) => { changes: number; lastInsertRowid: number } } };
      const prepared = db.prepare(query);
      const info = prepared.run(...boundValues);
      return {
        results: [] as T[],
        success: true,
        meta: {
          duration: 0,
          changes: info.changes,
          last_row_id: Number(info.lastInsertRowid),
          rows_read: 0,
          rows_written: info.changes,
        },
      };
    },
  };

  return stmt;
}

// ─── 统一入口 ───

let localDbInstance: D1Database | null = null;

/**
 * 获取数据库实例
 * 开发环境使用本地 SQLite（local.db），生产环境使用 Turso
 */
export function getDb(): D1Database {
  if (process.env.NODE_ENV === "development") {
    if (!localDbInstance) {
      localDbInstance = createLocalDb();
    }
    return localDbInstance;
  }
  // 生产环境使用 Turso（libsql client 内部有连接池）
  return createTursoDb();
}
