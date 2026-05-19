#!/usr/bin/env bash
set -euo pipefail

INPUT_FILE="${INPUT_FILE:-/tmp/publish-fixed-twitter-post_${RUN_ID}.json}"
OUTPUT_FILE="${OUTPUT_FILE:-/tmp/record-run-log_${RUN_ID}.json}"
PROJECT_ROOT="${PROJECT_ROOT:-$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)}"

python3 - "$INPUT_FILE" "$OUTPUT_FILE" "$PROJECT_ROOT" <<'PY'
import json, os, sys, uuid, datetime, subprocess, tempfile

input_file, output_file, project_root = sys.argv[1], sys.argv[2], sys.argv[3]

def now():
    return datetime.datetime.now(datetime.timezone.utc).isoformat()

with open(input_file, "r", encoding="utf-8") as f:
    data = json.load(f)
current = now()
scheduled_at = data.get("scheduled_at") or os.environ.get("SCHEDULED_AT") or current
started_at = data.get("started_at") or os.environ.get("STARTED_AT") or data.get("timestamp") or current
completed_at = data.get("completed_at") or current
record = {
    "id": data.get("id") or str(uuid.uuid5(uuid.NAMESPACE_URL, "bob:" + scheduled_at)),
    "scheduled_at": scheduled_at,
    "started_at": started_at,
    "completed_at": completed_at,
    "status": data.get("status", "failed"),
    "twitter_post_id": data.get("twitter_post_id"),
    "error_message": data.get("error_message"),
    "created_at": data.get("created_at") or current,
    "updated_at": current,
}
payload = {"table":"result_scheduled_run","conflict_columns":["scheduled_at"],"rows":[record]}
writer = os.path.join(project_root, "scripts", "data_writer.py")
with tempfile.NamedTemporaryFile("w", encoding="utf-8", delete=False) as tmp:
    json.dump(payload, tmp)
    tmp_path = tmp.name
try:
    subprocess.run(["python3", writer, tmp_path], check=True, env=os.environ.copy())
finally:
    try: os.unlink(tmp_path)
    except OSError: pass
os.makedirs(os.path.dirname(output_file) or ".", exist_ok=True)
out = {"status": record["status"], "timestamp": completed_at, "twitter_post_id": record["twitter_post_id"], "error_message": record["error_message"]}
with open(output_file, "w", encoding="utf-8") as f:
    json.dump(out, f, separators=(",", ":"))
    f.write("\n")
PY
