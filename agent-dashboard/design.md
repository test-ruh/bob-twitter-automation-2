# Agent Dashboard — bob

## Agent

- **ID:** bob
- **Name:** bob
- **Description:** Posts “Good morning People” to Twitter/X every day at 10:00 AM IST.
- **Mode:** Reporting-only. The dashboard shows stored run-log data and does not include manual posting, cron-run controls, or on-demand workflow buttons.

## Tabs

### Overview

The Overview tab is bob’s primary operator surface. It shows the fixed post text, daily 10:00 AM IST schedule, latest scheduled run, recent success/failure counts, the latest Twitter/X post ID, and a table of recent `result_scheduled_run` rows. The table surfaces scheduled time, status, completion time, Twitter/X post IDs, and stored failure details so the operator can verify whether the daily greeting posted and diagnose credential/API/rate-limit failures.

### Reporting-only notice

The platform sidebar’s reserved entry renders a reporting-only notice for bob. It deliberately provides no manual posting controls and directs the operator back to the Overview report for stored outcomes.

## Triggers

- Daily morning greeting — scheduled trigger only, every day at 10:00 AM IST (`30 4 * * *` UTC), publishing exactly `Good morning People`.
- No dashboard-invoked triggers are exposed. Manual posting, cron-run buttons, and on-demand workflow dispatch are intentionally absent.

## Sidebar additions

None.

## Server endpoints

- `GET /api/runs/recent?limit=<n>` — returns recent rows from `result_scheduled_run` for the Overview run-log table.

## v2 Deferrals

None.
