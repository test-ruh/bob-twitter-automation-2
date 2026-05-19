/**
 * Reporting-only build for bob.
 *
 * This file intentionally exports no dashboard trigger routes. Bob's dashboard
 * reads stored run-log data only and cannot start posting or scheduled work from
 * the UI or API.
 */
import { Hono } from "hono";

const disabledRoutes = new Hono();

export default disabledRoutes;
