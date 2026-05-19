---
id: record-run-log
name: Record Run Log
version: 1.0.0
description: Stores minimal scheduled run information for dashboard reporting.
user_invocable: false
always: false
requires:
  bins: [bash, python3]
  env: [RUN_ID, PG_CONNECTION_STRING]
primary_env: PG_CONNECTION_STRING
input_path: /tmp/publish-fixed-twitter-post_${RUN_ID}.json
output_path: /tmp/record-run-log_${RUN_ID}.json
depends_on: [publish-fixed-twitter-post]
---

## Purpose

Store a short run log for bob, including status, timestamps, and the Twitter/X post ID when Twitter/X returns one.

## I/O Contract

- **Input:** `/tmp/publish-fixed-twitter-post_${RUN_ID}.json`, with `status`, `timestamp`, `twitter_post_id`, and `error_message`. Optional fields include `scheduled_at`, `started_at`, and `completed_at`.
- **Output:** `/tmp/record-run-log_${RUN_ID}.json`, with `status`, `timestamp`, and `twitter_post_id` when available.
- **DB Write:** `result_scheduled_run` via `data_writer.py` upsert on `scheduled_at`.

## Notes

This skill only stores run information. It does not post to Twitter/X or change the fixed greeting.
