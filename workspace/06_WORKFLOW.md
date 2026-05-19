# Workflow — End-to-End Process Flow

Executed by the [Lobster runtime](https://github.com/openclaw/lobster) via `lobster run workflows/main.yaml`.
Steps run **sequentially** in the order shown below.

## Workflow Steps

1. **provision-schema** → `run: python3 scripts/data_writer.py provision` (timeout_ms=30000)
2. **publish** → skill `publish-fixed-twitter-post` (stdin={"message":"Good morning People"}, timeout_ms=600000)
3. **record** → skill `record-run-log` (stdin=${steps.publish.output}, timeout_ms=600000)

## Diagram

```
provision-schema → publish → record
```
