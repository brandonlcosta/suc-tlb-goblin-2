# Local Full Goblin Mode

## Summary

Added a local one-command branch and PR automation script for the STLB prompt pipeline. The command delegates prompt implementation to the existing local `npm run agent:one` harness, then validates, commits any remaining validated changes, pushes an `agent/` branch, and opens a GitHub PR with `gh`.

No game feature prompt was consumed in this run.

## Files Changed

- `package.json`
- `scripts/local-goblin-pr.mjs`
- `docs/PROMPT_PIPELINE.md`
- `reports/runs/2026-04-28-local-full-goblin-mode.md`

## Validation Commands

- `npm run agent:check`
- `npm run build`
- `npm run agent:check`

## Validation Result

Passed.

- `npm run build` passed.
- `npm run agent:check` passed with expected non-blocking warnings about manual playtest language in pending prompts.

## Known Issues

- Full goblin mode itself was not executed in this run by request.
- The existing prompt ledger warning about manual playtest language in pending prompts is expected and non-blocking.

## Manual Playtest Notes

Manual playtest: Not performed; requires Brandon to run locally.

## Risk Level

Medium. The script is intentionally guarded, but it orchestrates git, local Codex, GitHub CLI, branch pushes, and PR creation.

## Next Recommended Action

Review the local automation changes, then continue with the next normal queued game prompt when ready.
