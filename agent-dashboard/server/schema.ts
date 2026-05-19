// server/schema.ts — AUTO-GENERATED from .openclaw/result-schema.yml.
// Do not edit by hand. Re-run scaffold_agent_dashboard to regenerate.
//
// One TypeScript type per result_* table the agent declares + a ResultTables
// index. Platform-injected columns (created_at, updated_at, run_id, org_id,
// agent_id) are appended after agent-declared columns.

/** Minimal run log for bob's scheduled Twitter/X posting attempts. */
export type ResultScheduledRun = {
  /** Unique run log record ID. */
  id: string;
  /** Platform workflow run identifier. */
  run_id: string | null;
  /** Timestamp when the result row was written. */
  computed_at: string | null;
  /** Scheduled execution time. */
  scheduled_at: string;
  /** Actual run start time. */
  started_at: string;
  /** Run completion time. */
  completed_at: string | null;
  /** Scheduled run status. */
  status: string;
  /** Twitter/X post ID if available. */
  twitter_post_id: string | null;
  /** Failure details visible in the dashboard. */
  error_message: string | null;
  /** Record creation timestamp. */
  created_at: string;
  /** Record update timestamp. */
  updated_at: string;
  /** Org id (platform-managed). */
  org_id: string | null;
  /** Agent id (platform-managed). */
  agent_id: string | null;
};

export type ResultTables = {
  result_scheduled_run: ResultScheduledRun;
};
