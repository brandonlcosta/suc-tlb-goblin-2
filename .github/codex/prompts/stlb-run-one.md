# STLB One-Prompt Worker

You are working in the `suc-the-long-burn` repo.

This is an automated GitHub Actions worker run. Stop after one prompt.

## Required Reading

Read these files before implementing:

- `GAME.md`
- `README.md`
- `ROADMAP.md`
- `docs/AI_DEVELOPMENT_RULES.md`
- `docs/MECHANICS_SPEC.md`
- `docs/VISUAL_STYLE_GUIDE.md`
- `docs/REPO_STRUCTURE.md`
- the oldest numbered file in `prompts/pending/`
- the most recent report in `reports/runs/`

## Task

Choose the oldest numbered pending prompt in `prompts/pending/`.

Consume exactly one pending prompt. Implement only that prompt. Do not skip ahead. Do not edit later pending prompts. Do not consume multiple prompts.

Use CLI validation only. Run:

```bash
npm run build
```

If validation succeeds, move the consumed prompt to `prompts/completed/`.

If validation fails or the prompt is blocked by scope, move the consumed prompt to `prompts/blocked/` and explain why in the run report.

Write a run report in `reports/runs/` with:

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

The manual playtest line must be exactly:

```txt
Manual playtest: Not performed; requires Brandon to run locally.
```

## Automation Rules

Do not open the browser.
Do not run interactive or manual UI playtests.
Do not require browser or manual playtesting.
Do not run `npm run agent:one`.
Do not run Codex recursively.

## Forbidden Scope

Do not:

- edit BC-OS
- push directly to `main`
- merge
- deploy
- add accounts
- add servers
- add Strava
- add GPX
- add multiplayer
- add external APIs

Stop after one prompt.
