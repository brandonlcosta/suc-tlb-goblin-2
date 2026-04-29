# Local Goblin NPM Spawn Fix

## Prompt Consumed

- None. This was a direct local goblin script maintenance request; no pending prompt was consumed.

## Status

completed

## Summary

Patched local goblin command execution helpers so `npm` and `npx` resolve to `process.execPath` plus `npm-cli.js` instead of spawning `npm.cmd` or `npx.cmd` on Windows. Kept command logging and non-npm command behavior unchanged.

## Files Changed

- `scripts/local-goblin-pr.mjs`
- `scripts/local-goblin-tick.mjs`
- `scripts/local-goblin-watch.mjs`
- `scripts/auto-run-one.mjs`
- `reports/runs/2026-04-28-local-goblin-npm-spawn-fix.md`

## Validation Commands Run

- `node --check scripts/local-goblin-pr.mjs`
- `node --check scripts/local-goblin-tick.mjs`
- `node --check scripts/local-goblin-watch.mjs`
- `node --check scripts/auto-run-one.mjs`
- `npm run build:goblin`
- `npm run agent:check`

## Validation Result

Passed. `npm run agent:check` reported ledger OK and emitted existing warnings that pending prompts contain manual/browser playtest language for Brandon-only handling.

## Manual Playtest Notes

Manual playtest: Not performed; requires Brandon to run locally.

## Known Issues

- None for this maintenance patch.

## Risk Level

Low. The change is limited to local automation command resolution and preserves existing arguments, cwd, stdio, capture, and error handling behavior.

## Next Recommended Prompt

Resume the normal queue with `prompts/pending/006-ice-and-cooling-system.md` when ready.
