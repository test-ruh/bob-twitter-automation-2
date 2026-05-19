# ☀️ bob

Posts “Good morning People” to Twitter/X every day at 10:00 AM IST.

## Quick Start

```bash
git clone git@github.com:${GITHUB_OWNER}/bob.git
cd bob

# 1. Configure
cp .env.example .env
# Edit .env with your credentials (see "Required Environment Variables" below)

# 2. One-shot setup: validates env, installs deps, provisions DB, registers cron
chmod +x setup.sh
./setup.sh
```

## Manual Setup (if you prefer step-by-step)

```bash
cp .env.example .env             # then edit it
set -a; source .env; set +a       # load vars into the current shell
bash check-environment.sh         # verify everything required is set
bash install-dependencies.sh      # pip install psycopg2-binary, pyyaml
python3 scripts/data_writer.py provision   # create tables in your schema
openclaw cron add --file cron/daily-morning-greeting.json
```

## Monitoring

Bob posts only on the daily schedule. Use these commands to check registration and review history without triggering a post.

```bash
openclaw cron list                # see registered scheduled jobs
openclaw cron runs                # see run history
python3 scripts/data_writer.py query --table result_scheduled_runs --limit 10
```

## Required Environment Variables

| Variable | Description |
|----------|-------------|
| `TWITTER_X_API_CREDENTIAL` | Twitter/X API credential |

## Skills

| Skill | Mode | Description |
|-------|------|-------------|
| `data-writer` | Auto | Provision, write, and query the agent database schema via scripts/data_writer.py. Use for all PostgreSQL operations and any result-table persistence. |
| `result-query` | User-invocable | Read stored records from the agent result tables for inspection and follow-up questions. |
| `github-action` | User-invocable | Git branch + PR workflow for syncing agent changes to GitHub. Creates feature branches, commits changes, and opens pull requests against main. NEVER pushes to main directly. MANDATORY for every agent. |
| `publish-fixed-twitter-post` | Auto | Posts the exact daily greeting to the connected Twitter/X account. |
| `record-run-log` | Auto | Stores minimal scheduled run information for dashboard reporting. |

## Scheduled Jobs

| Job Name | Schedule | Notes |
|----------|----------|-------|
| `daily-morning-greeting` | `30 4 * * *` | Timezone: UTC |


## Architecture

- **Runtime**: OpenClaw AI agent framework
- **Data Layer**: PostgreSQL via `scripts/data_writer.py`
- **Scheduling**: OpenClaw cron
- **Schema**: `org_{org_id}_a_bob`

## Directory Structure

```
bob/
├── README.md
├── openclaw.json
├── result-schema.yml
├── env-manifest.yml
├── .env.example
├── requirements.txt
├── .gitignore
├── check-environment.sh
├── install-dependencies.sh
├── test-workflow.sh
├── cron/
├── workflows/
├── scripts/
│   ├── data_writer.py
│   └── github_action.py
├── skills/
└── workspace/
    ├── SOUL.md
    ├── 01_IDENTITY.md
    ├── 02_RULES.md
    ├── 03_SKILLS.md
    ├── 04_TRIGGERS.md
    ├── 05_ACCESS.md
    ├── 06_WORKFLOW.md
    └── 07_REVIEW.md
```
