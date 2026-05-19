---
id: publish-fixed-twitter-post
name: Publish Fixed Twitter/X Post
version: 1.0.0
description: Posts the exact daily greeting to the connected Twitter/X account.
user_invocable: false
always: false
requires:
  bins: [bash, python3]
  env: [TWITTER_X_API_CREDENTIAL, RUN_ID]
primary_env: TWITTER_X_API_CREDENTIAL
input_path: /dev/stdin
output_path: /tmp/publish-fixed-twitter-post_${RUN_ID}.json
depends_on: []
---

## Purpose

Publish exactly `Good morning People` as one public Twitter/X post during the scheduled run. The skill does not create replies, direct messages, likes, follows, threads, or generated text.

## I/O Contract

- **Input:** `/dev/stdin` or `INPUT_FILE`, with JSON that may include `message`, `scheduled_at`, and run context. The message must be exactly `Good morning People`.
- **Output:** `/tmp/publish-fixed-twitter-post_${RUN_ID}.json`, with `status`, `timestamp`, `twitter_post_id`, and `error_message`.
- **DB Write:** none.

## Notes

Set `TWITTER_X_API_CREDENTIAL` to a Twitter/X credential that can create posts. A plain bearer token is accepted. A JSON value with `bearer_token`, `api_url`, or `authorization_header` is also accepted.
