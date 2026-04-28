# Run Report: Heat and Hydration Bars

Date: 2026-04-28

## Prompt Consumed

- `prompts/pending/004-heat-and-hydration-bars.md`

## Status

completed

## Summary

Added core heat and hydration resources to the running state. Heat now rises while running, hydration drains over time, heat collapse ends the run, and restart resets both resources. The HUD now shows readable HEAT and HYD bars plus heat/hydration status messages.

The local `dist` directory was locked against Vite's cleanup step, so the existing build script now passes `--emptyOutDir=false` while keeping the required `npm run build` validation command.

## Files Changed

- `src/main.ts`
- `package.json`
- `prompts/completed/004-heat-and-hydration-bars.md`
- `prompts/pending/004-heat-and-hydration-bars.md`
- `reports/runs/2026-04-28-1628-heat-and-hydration-bars.md`

## Validation Commands Run

```bash
npm run agent:check
npm run build
npm run agent:check
```

## Validation Result

Passed.

- Initial `npm run agent:check` passed and confirmed prompt `004` was the oldest pending prompt.
- `npm run build` initially failed because Vite could not empty a locked generated `dist/assets` directory.
- After preserving the required command and adding `--emptyOutDir=false` to the build script, `npm run build` passed.
- Follow-up `npm run agent:check` passed and confirmed prompt `004` moved to completed.

## Manual Playtest Notes

Manual playtest: Not performed; requires Brandon to run locally.

## Known Issues

- No browser or manual UI playtest was run by automation.
- Existing pending prompts still contain manual/browser playtest language; the ledger reports this as non-blocking warnings.
- The game is intentionally harsh right now: with no pace, crew, or cooling mechanics yet, passive heat gain can end a run before later survival tools exist.

## Risk Level

Low. The change is limited to resource state, HUD rendering, heat failure, restart reset, one build-script flag, and prompt/report bookkeeping.

## Next Recommended Prompt

`prompts/pending/005-pace-modes.md`
