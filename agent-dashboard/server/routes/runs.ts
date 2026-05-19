import { Hono } from "hono";

import { sql } from "../db";
import type { ResultScheduledRun } from "../schema";

export const route = new Hono();
export const path = "/api";

route.get("/runs/recent", async (c) => {
  const limitParam = Number(c.req.query("limit") ?? "20");
  const limit = Number.isFinite(limitParam) ? Math.min(Math.max(limitParam, 1), 50) : 20;

  const rows = await sql<ResultScheduledRun[]>`
    SELECT *
    FROM result_scheduled_run
    ORDER BY scheduled_at DESC
    LIMIT ${limit}
  `;

  return c.json({ rows });
});
