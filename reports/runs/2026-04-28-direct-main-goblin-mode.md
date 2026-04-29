# Run Report: Direct-Main Goblin Mode

Date: 2026-04-28

## Summary

Added a sandbox-only direct-main automation path through `npm run goblin:main`. The command refuses dirty starts, syncs `main`, runs the existing one-prompt worker in explicit direct-main mode, validates with `build:goblin` and `agent:check`, verifies prompt movement and a matching fresh run report, commits directly to `main`, and pushes `origin main`.

No prompt was consumed and no game feature work was implemented during this tooling run.

## Files Changed

- `scripts/goblin-main.mjs`
- `scripts/auto-run-one.mjs`
- `package.json`
- `docs/PROMPT_PIPELINE.md`
- `reports/runs/2026-04-28-direct-main-goblin-mode.md`

## Validation Commands

```bash
node --check scripts/goblin-main.mjs
node --check scripts/auto-run-one.mjs
npm run build:goblin
npm run agent:check
```

## Validation Result

Passed.

- `node --check scripts/goblin-main.mjs` passed.
- `node --check scripts/auto-run-one.mjs` passed.
- `npm run build:goblin` passed and wrote output under `.goblin/dist/`.
- `npm run agent:check` passed with existing warnings that pending prompt playtest language is Brandon-only.

## Risks

- This mode intentionally pushes directly to `main`, so it is only appropriate for the sandbox experiment.
- A bad run should be repaired with a revert commit instead of history rewriting.
- The command depends on the local Codex CLI availability used by `npm run agent:one`.

## Next Recommended Action

After validation passes, Brandon can run `npm run goblin:main` from a clean `main` worktree when ready to consume exactly one prompt directly on `main`.
