# Codex App Full Goblin Governor Report

Date: 2026-04-28

## Prompt Consumed

- None; direct local automation governor tooling requested by Brandon.

## Status

completed

## Summary

Added a one-shot local goblin tick command for Codex app Automations. The tick checks the repo, respects `.goblin/PAUSED`, validates `main`, stops when an `agent/*` PR is already open, delegates pending prompt work only through `npm run goblin:pr`, and can deterministically generate one new prompt when the queue is empty and `--generate-if-needed` is passed.

The command does not use the GitHub Codex Action, does not require `OPENAI_API_KEY`, does not run browser/manual playtests, does not consume prompts directly, and does not push or merge by default.

## Files Changed

- `scripts/local-goblin-tick.mjs`
- `package.json`
- `docs/PROMPT_PIPELINE.md`
- `reports/runs/2026-04-28-codex-app-full-goblin-governor.md`

## Validation Commands

```bash
node --check scripts/local-goblin-tick.mjs
npm run build
npm run agent:check
```

## Validation Result

Passed.

- `node --check scripts/local-goblin-tick.mjs` passed.
- `npm run build` passed.
- `npm run agent:check` passed. Existing manual/browser playtest wording warnings remain non-blocking.

## Manual Playtest Notes

Manual playtest: Not performed; requires Brandon to run locally.

## Known Issues

- Existing pending prompts still include manual/browser playtest wording that `npm run agent:check` reports as non-blocking warnings.
- Prompt generation is deterministic and conservative; it currently creates a shade/exposure zone prompt when the queue is empty and the docs contain the expected guidance.
- Generated prompts are local queue files and should be reviewed as part of the normal repo workflow.

## Risk Level

Medium. The change coordinates local git state, GitHub PR state, prompt generation, and the existing PR runner, but it remains a one-shot command and delegates prompt work through existing automation.

## Next Recommended Action

Review the governor tooling, then continue with the next normal prompt, `005-pace-modes.md`.
