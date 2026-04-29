# Run Report: Finish Line and Run Report

Date: 2026-04-29

## Prompt Consumed

- `prompts/pending/008-finish-line-and-run-report.md`

## Status

completed

## Summary

Added a terminal mission flow for Cal Street Heat Drop. The run now has a visible finish gate, stops cleanly at the finish, and opens a run report for both finished and failed attempts. The report shows result, elapsed time, max heat, lowest hydration, final quad damage, failure cause, crew choices, and a verdict line. Restart is available directly from the report.

Expanded failure handling beyond heat collapse to include dehydration collapse and quad damage collapse, using the same report path.

## Files Changed

- `index.html`
- `src/main.ts`
- `src/styles/base.css`
- `prompts/completed/008-finish-line-and-run-report.md`
- `prompts/pending/008-finish-line-and-run-report.md`
- `reports/runs/2026-04-29-2113-finish-line-and-run-report.md`

## Validation Commands Run

```bash
npm run agent:check
npm run build:goblin
```

## Validation Result

Required validation passed.

- Initial `npm run agent:check` passed before source edits.
- `npm run build:goblin` passed before moving the prompt.

## Manual Playtest Notes

Manual playtest: Not performed; requires Brandon to run locally.

## Known Issues

- Finish and failure report flows were validated by build only; Brandon still needs to manually finish once and fail once locally.
- Standard `npm run build` was not run in this worker pass because the direct-main wrapper required `npm run build:goblin`, and the previous run documented a local `dist/assets` permission issue with the standard build path.

## Risk Level

Medium. The change touches the terminal mission state and overlay UI, but it stays within the existing single-file game loop and passes the required wrapper build.

## Next Recommended Prompt

- `009-ps1-atmosphere-pass.md`
