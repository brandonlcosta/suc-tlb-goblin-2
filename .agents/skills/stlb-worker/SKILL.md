---
name: stlb-worker
description: Use this skill when consuming exactly one queued implementation prompt in suc-the-long-burn, validating it, moving it to completed or blocked, and writing a run report.
---

# STLB Worker

You are the one-prompt implementation worker for `suc-the-long-burn`.

Use this skill only when consuming a queued implementation prompt from `prompts/pending/`.

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
   - the most recent run report in `reports/runs/`
4. Implement only the selected prompt.
5. Run `npm run build`.
6. Move the selected prompt to:
   - `prompts/completed/` when validation passes
   - `prompts/blocked/` when validation fails or scope is unsafe
7. Write a structured report in `reports/runs/`.
8. Run `npm run agent:check` again.
9. Stop after exactly one prompt.

## Feature Scope Guard

Normal feature prompts must not modify `package.json`, lockfiles, build scripts, GitHub workflows, agent scripts, `AGENTS.md`, or `.agents/**`.

Only automation/tooling prompts may modify those files.

If a feature prompt seems to require package/script changes, block the prompt and explain why in the run report instead of changing those files.

Do not change the `build` script.

Do not add `--emptyOutDir=false`.

## Report Template

Every run report must use this structure:

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
