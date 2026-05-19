# Step 3 of 5 — Skills

## Added Skills

| #    | Skill ID                  | Skill Name               | Mode   | Risk Level | Description                |
|------|---------------------------|--------------------------|--------|------------|----------------------------|
| S1   | `data-writer` | Data Writer | Auto | Low | Provision, write, and query the agent database schema via scripts/data_writer.py. Use for all PostgreSQL operations and any result-table persistence. |
| S2   | `result-query` | Result Query | Auto | Low | Read stored records from the agent result tables for inspection and follow-up questions. |
| S3   | `github-action` | GitHub Action | Auto | Low | Git branch + PR workflow for syncing agent changes to GitHub. Creates feature branches, commits changes, and opens pull requests against main. NEVER pushes to main directly. MANDATORY for every agent. |
| S4   | `publish-fixed-twitter-post` | Publish Fixed Twitter/X Post | Auto | Low | Posts the exact daily greeting to the connected Twitter/X account. |
| S5   | `record-run-log` | Record Run Log | Auto | Low | Stores minimal scheduled run information for dashboard reporting. |

## Skill Dependencies (Execution Order)

```
data-writer
result-query
github-action
publish-fixed-twitter-post
record-run-log ← depends on publish-fixed-twitter-post
```

## Execution Mode Summary

| Mode  | Count          |
|-------|----------------|
| HiTL  | 0              |
| Auto  | 5 |
