# Local Goblin Watcher Report

Date: 2026-04-28

## Prompt Consumed

- None; direct local watcher tooling requested by Brandon.

## Status

completed

## Summary

Added a local watcher command that polls GitHub through `gh`, records the latest handled merged `agent/*` PR in `.goblin/state.json`, validates `main`, and starts the next prompt only by delegating to `npm run goblin:pr`.

The watcher does not call `npm run agent:one` directly, does not run `npm run goblin:pr` during this implementation, does not require `OPENAI_API_KEY`, and does not use the GitHub Codex Action.

## Files Changed

- `scripts/local-goblin-watch.mjs`
- `package.json`
- `.gitignore`
- `docs/PROMPT_PIPELINE.md`
- `reports/runs/2026-04-28-local-goblin-watcher.md`

## Validation Commands

```bash
node --check scripts/local-goblin-watch.mjs
npm run build
npm run agent:check
```

## Validation Result

Passed.

- `node --check scripts/local-goblin-watch.mjs` passed.
- `npm run build` passed.
- `npm run agent:check` initially failed because this report referenced the pending prompt with a queue path, which made the ledger treat this tooling report as a prompt-consumption report. The report wording was corrected, then `npm run agent:check` was rerun.

## Manual Playtest Notes

Manual playtest: Not performed; requires Brandon to run locally.

## Known Issues

- Existing pending prompts still include manual/browser playtest wording that `npm run agent:check` reports as non-blocking warnings.
- The watcher is local and only runs while Brandon's machine and terminal process remain awake.

## Risk Level

Medium. The change is limited to local automation tooling, but it coordinates git, GitHub PR state, and the existing prompt runner.

## Next Recommended Action

Run the next normal prompt, `005-pace-modes.md`, through the reviewed prompt pipeline after this watcher tooling is reviewed.
