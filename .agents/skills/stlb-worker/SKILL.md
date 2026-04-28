# STLB Worker

Use this skill when consuming a queued implementation prompt in `suc-the-long-burn`.

## Workflow

1. Run `npm run agent:check`.
2. Select the oldest numbered prompt in `prompts/pending/`.
3. Read the required project context:
   - `GAME.md`
   - `README.md`
   - `ROADMAP.md`
   - `docs/AI_DEVELOPMENT_RULES.md`
   - `docs/REPO_STRUCTURE.md`
   - `docs/BC_OS_INTEGRATION.md`
   - the selected prompt
   - the most recent run report
4. Implement only the selected prompt.
5. Run `npm run build`.
6. Move the selected prompt to:
   - `prompts/completed/` when validation passes
   - `prompts/blocked/` when validation fails or scope is unsafe
7. Write a structured report in `reports/runs/`.
8. Run `npm run agent:check` again.

## Report Template

```md
# Run Report: <short title>

Date: YYYY-MM-DD

## Prompt Consumed

- `prompts/pending/NNN-short-name.md`

## Status

completed | blocked

## Summary

<what changed>

## Files Changed

- `<path>`

## Validation Commands Run

```bash
npm run build
```

## Validation Result

Passed | Failed: <reason>

## Manual Playtest Notes

Manual playtest: Not performed; requires Brandon to run locally.

## Known Issues

- <honest notes, or None>

## Risk Level

Low | Medium | High

## Next Recommended Prompt

- `prompts/pending/NNN-next.md`
```

## Hard Stops

Stop and block the prompt if it asks for BC-OS edits, accounts, servers, Strava, GPX, multiplayer, real external APIs, deployment, multiple prompt consumption, or an interactive browser session inside automation.

