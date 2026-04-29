# Codex App Goblin Build Output Fix

## Prompt Consumed

None. This was a direct maintenance request; no pending prompt was consumed or moved.

## Status

Completed.

## Problem

Codex app full-goblin automation can fail before implementation when Vite tries to delete or rewrite the normal `dist/assets` directory and Windows reports an `EPERM` file lock.

## Cause

The scheduled automation only needs to prove the app compiles and bundles, but it was using the same output directory as the normal developer build. If another process has `dist/assets` locked, validation can fail even though the source is valid and a normal terminal build may succeed.

## Files Changed

- `package.json`
- `docs/PROMPT_PIPELINE.md`
- `reports/runs/2026-04-28-codex-app-goblin-build-output-fix.md`

## Summary

Added a Codex app automation-safe build script that writes Vite output to `.goblin/dist/`, documented that scheduled Codex app validation should use it, and left the normal developer build unchanged.

## Validation Commands

- `npm run build:goblin`
- `npm run agent:check`
- `npm run build`

## Validation Result

Passed.

- `npm run build:goblin` passed and wrote Vite output to `.goblin/dist/`.
- `npm run agent:check` passed. It reported existing warnings that pending prompts contain manual/browser playtest language, which automation must treat as Brandon-only.
- `npm run build` passed and wrote normal developer output to `dist/`.

## Manual Playtest Notes

Manual playtest: Not performed; requires Brandon to run locally.

## Known Issues

None found in this maintenance patch.

## Risk Level

Low. The normal build script remains unchanged, and the new script writes only to ignored `.goblin/` output.

## Next Recommended Action

Retry the Codex app scheduled automation after updating its validation sequence to run `npm run build:goblin` before `npm run agent:check`. Keep manual terminal validation on `npm run build` unless the Codex app automation environment is being tested specifically.
