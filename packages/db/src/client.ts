import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

if (!process.env.POSTGRES_URL) {
  throw new Error("POSTGRES_URL is not set");
}

// Ensure the client and db are reused across hot reloads (in dev)
// or reused across requests (in serverless environments)
const globalForDb = global as unknown as {
  sql?: ReturnType<typeof postgres>;
  db?: ReturnType<typeof drizzle>;
};

export const sql =
  globalForDb.sql ??
  postgres(process.env.POSTGRES_URL, {
    max: 25, // optional, keep it small if using serverless
  });

if (!globalForDb.sql) globalForDb.sql = sql;

export const db = drizzle(sql, { schema });

if (!globalForDb.db) globalForDb.db = db;
