# STLB Agent Instructions

This repo is a one-prompt-at-a-time game experiment. Treat the prompt queue as the source of work and the reports folder as the ledger.

## Before Working

Read, in this order:

1. `GAME.md`
2. `README.md`
3. `ROADMAP.md`
4. `docs/AI_DEVELOPMENT_RULES.md`
5. `docs/REPO_STRUCTURE.md`
6. `docs/BC_OS_INTEGRATION.md`
7. the oldest numbered file in `prompts/pending/`
8. the most recent report in `reports/runs/`

Run `npm run agent:check` before implementing a queued prompt. If it fails, fix bookkeeping before touching game source.

## Queue Rules

- Consume exactly one prompt per run.
- Pick the oldest numbered prompt in `prompts/pending/`.
- Do not skip ahead unless Brandon explicitly says to.
- Do not edit later prompts while consuming the current prompt.
- After success, move the consumed prompt to `prompts/completed/`.
- After failed validation or unclear scope, move it to `prompts/blocked/` and explain why in the run report.

## Scope Boundaries

Do not:

- edit BC-OS
- push, merge, deploy, or rewrite history
- add accounts, servers, multiplayer, Strava, GPX, real maps, or real external APIs
- consume multiple prompts
- run an interactive browser session during automation
- require manual browser playtesting for a Codex automation run

Manual playtesting belongs to Brandon. Automated reports should say:

```txt
Manual playtest: Not performed; requires Brandon to run locally.
```

## Validation

`npm run build` must pass before a prompt can be marked completed or committed.

Every implementation run must write a report in `reports/runs/` with:

- prompt consumed
- status: completed or blocked
- summary
- files changed
- validation commands run
- validation result
- manual playtest notes
- known issues
- risk level
- next recommended prompt

