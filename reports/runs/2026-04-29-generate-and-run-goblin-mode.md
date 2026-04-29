# Run Report: Generate-And-Run Goblin Mode

Date: 2026-04-29

## Prompt Consumed

- None. This was a tooling run for the prompt-generation and direct-main automation path.

## Status

completed

## Summary

Added `npm run goblin:generate-and-run`, a guarded direct-main automation path that generates one queue prompt, verifies the generator only touched allowed prompt-generation files, commits and pushes the generated prompt/report, then runs exactly one `npm run goblin:main` step.

The command supports `--only-if-queue-low`, which exits cleanly without generating or running `goblin:main` when more than 3 pending prompts already exist.

No prompt was consumed during this tooling run, and no game feature was implemented.

## Files Changed

- `package.json`
- `scripts/goblin-generate-and-run.mjs`
- `docs/PROMPT_GENERATION.md`
- `docs/PROMPT_PIPELINE.md`
- `reports/runs/2026-04-29-generate-and-run-goblin-mode.md`

## Validation Commands Run

```bash
node --check scripts/goblin-generate-and-run.mjs
npm run agent:check
```

## Validation Result

Passed.

- `node --check scripts/goblin-generate-and-run.mjs` passed.
- `npm run agent:check` passed with existing manual-playtest-language warnings for pending prompts `008` through `011`.

## Manual Playtest Notes

Manual playtest: Not performed; requires Brandon to run locally.

## Known Issues

- `npm run goblin:generate-and-run` was not executed in this run by request.
- `npm run goblin:main` was not executed in this run by request.
- `npm run agent:one` was not executed in this run by request.
- The combined command intentionally runs `goblin:main` against the oldest pending prompt, so the newly generated prompt may remain queued behind older prompts.

## Risks

Medium. This adds an automatic commit, push, and direct-main build step path. The wrapper has strict preflight and generator-scope checks, but it should remain sandbox-only automation.

## Next Recommended Action

After reviewing these tooling changes, run or schedule:

```bash
npm run goblin:generate-and-run -- --only-if-queue-low
```
