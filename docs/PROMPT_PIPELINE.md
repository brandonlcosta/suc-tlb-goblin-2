# Prompt Pipeline

This repo is designed for a small, repeatable loop: one prompt in, one focused implementation out, one report written.

## Normal Loop

1. Run `npm run agent:check`.
2. Pick the oldest numbered prompt in `prompts/pending/`.
3. Read the required project context.
4. Implement only that prompt.
5. Run `npm run build`.
6. Move the prompt to `prompts/completed/` when validation passes.
7. Move the prompt to `prompts/blocked/` when validation fails or the prompt is unsafe.
8. Write a structured run report in `reports/runs/`.
9. Run `npm run agent:check` again.
10. Recommend the next oldest pending prompt.

`npm run agent:one` is a guarded harness for this loop. It refuses to start from a dirty working tree, asks Codex to consume only the oldest pending prompt, runs validation, checks bookkeeping, and commits only after the safety checks pass.

## Required Context

Every implementation run should read:

- `GAME.md`
- `README.md`
- `ROADMAP.md`
- `docs/AI_DEVELOPMENT_RULES.md`
- `docs/REPO_STRUCTURE.md`
- `docs/BC_OS_INTEGRATION.md`
- the active prompt
- the most recent report in `reports/runs/`

## Queue Rules

- Consume exactly one prompt per run.
- Use the oldest numbered prompt from `prompts/pending/`.
- Prompt names must begin with a sortable number such as `001-`.
- Never skip ahead unless Brandon explicitly says to.
- Never edit later prompts while consuming the current prompt.

## Validation Rules

- `npm run build` must pass before a prompt is marked completed.
- If validation fails, move the prompt to `prompts/blocked/`.
- Manual browser playtesting is not required inside automated Codex runs.
- Run reports must say: `Manual playtest: Not performed; requires Brandon to run locally.`

## Report Rules

Every implementation run must create a report in `reports/runs/` with:

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

## Commit Safety

Automation must refuse to commit if:

- the working tree was dirty before the run
- no pending prompt exists
- more than one prompt was moved
- the consumed prompt remains in `prompts/pending/`
- no matching report was written
- `npm run build` fails
- files outside the expected repo scope were modified

Automation must not push, merge, deploy, rewrite history, or delete user work.

## BC-OS Boundary

BC-OS may:

- generate new pending prompts
- read run reports
- summarize progress
- recommend the next prompt

BC-OS should not directly edit STLB game source.

STLB owns:

- implementation
- validation
- prompt movement
- run reports
- source changes inside this repo

