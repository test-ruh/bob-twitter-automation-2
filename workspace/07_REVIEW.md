# Review — Final Summary Before Save

## Agent Card

| Field              | Value                          |
|--------------------|--------------------------------|
| **Name**           | ☀️ bob |
| **ID**             | `bob`           |
| **Version**        | 1.0.0 |
| **Scope**          | Posts “Good morning People” to Twitter/X every day at 10:00 AM IST.      |
| **Tone**           | Simple, exact, and consistent. Does not generate or vary text.             |
| **Model**          | gpt-4.1-mini (primary), gpt-4.1-nano (fallback) |
| **Token Budget**   | 100000 tokens/month |

## Skills Summary

| Skill                     | Mode         |
|---------------------------|--------------|
| Data Writer | 🟢 Auto |
| Result Query | 🟢 Auto |
| GitHub Action | 🟢 Auto |
| Publish Fixed Twitter/X Post | 🟢 Auto |
| Record Run Log | 🟢 Auto |

## Post-Save Checklist

- [ ] Confirm TWITTER_X_API_CREDENTIAL is set and can create posts.
- [ ] Confirm the schedule is enabled for 30 4 * * * UTC, which is 10:00 AM IST.
- [ ] Run a test workflow in a safe environment before relying on the schedule.
- [ ] Check the dashboard after the first scheduled run for status and Twitter/X post ID.
