# Step 5 of 5 — Access

## User Access

### Authorized Teams

| Team               | Access Level | Members (approx) |
|--------------------|-------------|-------------------|
| Personal Twitter/X account operator | Owner | The person who connects the Twitter/X credential. |

### Restricted From

| Team / Role          | Reason                          |
|----------------------|---------------------------------|
| Anyone requesting extra Twitter/X actions | bob is limited to one fixed daily public post and run logging. |

## HiTL Approvers

| Skill                | Action                         | Approver             | Fallback Approver    |
|----------------------|--------------------------------|----------------------|----------------------|
| publish-fixed-twitter-post | Publish exact scheduled greeting | Not required for scheduled run | If the credential is missing or posting fails, record the failure in result_scheduled_run. |
| record-run-log | Store run status | Not required | Workflow should surface the storage failure in run output. |

## Model Configuration

| Field                | Value                          |
|----------------------|--------------------------------|
| **Primary Model**    | gpt-4.1-mini   |
| **Fallback Model**   | gpt-4.1-nano  |

## Token Budget

| Field                  | Value                  |
|------------------------|------------------------|
| **Monthly Budget**     | 100000 tokens |
| **Alert Threshold**    | 80000 tokens |
| **Auto-Pause on Limit**| Yes |

## Security & Permissions

| Permission                         | Allowed    |
|------------------------------------|------------|
| Create one public Twitter/X post with the fixed text on the schedule | ✅ |
| Write minimal run log records | ✅ |
| Generate or vary post content | ❌ |
| Reply, DM, like, follow, or create threads | ❌ |
| Manage multiple Twitter/X accounts | ❌ |
