# Codex App No-gh Mode

## Problem

Codex app Automations could inspect GitHub through the GitHub connector, but `npm run goblin:tick -- --generate-if-needed` failed before implementation when the local script tried to spawn `gh --version`.

## Cause

The local full goblin scripts always assumed terminal-mode GitHub CLI access. In Codex app automation, GitHub awareness belongs to the app prompt and connector, while the repo scripts need to stay focused on local repo work.

## Files Changed

- `scripts/local-goblin-tick.mjs`
- `scripts/local-goblin-pr.mjs`
- `package.json`
- `docs/PROMPT_PIPELINE.md`
- `reports/runs/2026-04-28-codex-app-no-gh-mode.md`

## Validation Commands

- `npm run agent:check`
- `node --check scripts/local-goblin-tick.mjs`
- `node --check scripts/local-goblin-pr.mjs`
- `npm run build`
- `npm run agent:check`

## Validation Result

Passed. `npm run agent:check` still reports the expected Brandon-only manual playtest warnings for queued prompts, and the ledger is OK.

## Manual Playtest Notes

Manual playtest: Not performed; requires Brandon to run locally.

## Known Issues

- `--codex-app --auto-merge` does not merge locally because Codex app mode intentionally avoids `gh`; auto-merge requires connector support or normal terminal mode.

## Risk Level

Low to medium. The change is limited to automation scripts and docs, but it touches the local branch and PR workflow.

## Next Recommended Action

Retry the Codex app automation with `npm run goblin:tick:codex` after the GitHub connector confirms no open `agent/*` PRs.
