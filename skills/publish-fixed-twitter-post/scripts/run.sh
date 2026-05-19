#!/usr/bin/env bash
set -euo pipefail

INPUT_FILE="${INPUT_FILE:-/dev/stdin}"
OUTPUT_FILE="${OUTPUT_FILE:-/tmp/publish-fixed-twitter-post_${RUN_ID}.json}"

python3 - "$INPUT_FILE" "$OUTPUT_FILE" <<'PY'
import json, os, sys, urllib.request, urllib.error, datetime

input_file, output_file = sys.argv[1], sys.argv[2]
FIXED_MESSAGE = "Good morning People"

def now():
    return datetime.datetime.now(datetime.timezone.utc).isoformat()

def write(obj):
    os.makedirs(os.path.dirname(output_file) or ".", exist_ok=True)
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(obj, f, separators=(",", ":"))
        f.write("\n")

def read_input(path):
    if path == "/dev/stdin":
        raw = sys.stdin.read()
    else:
        with open(path, "r", encoding="utf-8") as f:
            raw = f.read()
    return json.loads(raw) if raw.strip() else {}

def redacted(body):
    text = (body or "")[:500]
    cred = os.environ.get("TWITTER_X_API_CREDENTIAL", "")
    if cred:
        text = text.replace(cred, "[redacted]")
    return text

try:
    data = read_input(input_file)
    message = data.get("message", FIXED_MESSAGE)
    if message != FIXED_MESSAGE:
        raise ValueError("Post text must be exactly Good morning People")
    cred_raw = os.environ["TWITTER_X_API_CREDENTIAL"]
    api_url = "https://api.x.com/2/tweets"
    auth = None
    try:
        cred = json.loads(cred_raw)
        api_url = cred.get("api_url", api_url)
        auth = cred.get("authorization_header") or ("Bearer " + cred["bearer_token"] if cred.get("bearer_token") else None)
    except json.JSONDecodeError:
        auth = "Bearer " + cred_raw
    if not auth:
        raise ValueError("Twitter/X credential is missing a bearer token")
    body = json.dumps({"text": FIXED_MESSAGE}).encode("utf-8")
    req = urllib.request.Request(api_url, data=body, method="POST", headers={"Authorization": auth, "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            code = resp.getcode()
            raw = resp.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as e:
        raw = e.read().decode("utf-8", "replace")
        raise RuntimeError(f"Twitter/X API returned HTTP {e.code}: {redacted(raw)}")
    if code < 200 or code >= 300:
        raise RuntimeError(f"Twitter/X API returned HTTP {code}: {redacted(raw)}")
    parsed = json.loads(raw) if raw.strip() else {}
    post_id = parsed.get("data", {}).get("id") or parsed.get("id")
    write({"status":"success","timestamp":now(),"twitter_post_id":post_id,"error_message":None})
except Exception as exc:
    error_message = str(exc)
    write({"status":"failed","timestamp":now(),"twitter_post_id":None,"error_message":error_message})
    print(f"publish-fixed-twitter-post failed: {error_message}", file=sys.stderr)
    # Expected Twitter/X posting failures, such as missing credentials,
    # API errors, rate limits, or rejected posts, are reported in the JSON
    # payload above. Exit successfully so the next workflow step can record
    # the failed attempt for dashboard visibility.
PY
