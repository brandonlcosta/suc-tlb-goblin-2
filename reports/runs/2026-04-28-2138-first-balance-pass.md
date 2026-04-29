# Run Report: First Balance Pass

Date: 2026-04-28

## Prompt Consumed

- `prompts/pending/010-first-balance-pass.md`

## Status

completed

## Summary

Tuned Cal Street Heat Drop for a less brittle first balance. The descent is longer, pace speeds are lower, heat/hydration/quad rates are scaled for the longer route, braking has clearer heat and quad relief, cooling lasts longer, crew water/gels/calm effects are stronger, and the no-crew fast exit now carries centralized heat/hydration penalties. Trail scenery and markers now scale down the longer route so the finish is not stranded past the authored canyon geometry.

CLI-only balance estimates:

- Cautious/control-heavy with refill + ice finished in 02:37, max heat 72.0, lowest hydration 56.2, final quads 6.2.
- Steady/race-like with refill + ice finished in 01:30, max heat 79.3, lowest hydration 49.6, final quads 52.9.
- Reckless/send-heavy with no crew collapsed from heat at 00:22 around 48% progress, with heat 100.0 and quads 64.1.

## Files Changed

- `src/main.ts`
- `prompts/completed/010-first-balance-pass.md`
- `prompts/pending/010-first-balance-pass.md`
- `reports/runs/2026-04-28-2138-first-balance-pass.md`

## Validation Commands Run

```bash
npm run agent:check
node <inline CLI balance simulation>
npm run build
npm run build:goblin
```

## Validation Result

Required direct-main validation passed.

- Initial `npm run agent:check` passed before source edits.
- The inline CLI balance simulation produced one cautious finish, one steady finish, and one reckless Send heat collapse.
- `npm run build` failed before emitting output because Vite could not remove the existing ignored `dist/assets` directory: `EPERM, Permission denied`.
- Attempts to remove or move the ignored `dist` output were also denied by the local filesystem permissions in this session.
- `npm run build:goblin` passed.
- Final `npm run agent:check` passed after moving the prompt and writing this report.

## Manual Playtest Notes

Manual playtest: Not performed; requires Brandon to run locally.

## Known Issues

- Plain `npm run build` is currently blocked by local permissions on ignored generated output in `dist/assets`; the required wrapper-safe `npm run build:goblin` path passed.
- The three-run balance pass was estimated through CLI formulas only. Browser/manual feel, touch ergonomics, and visual readability still need Brandon's local review.

## Risk Level

Medium. The change only touches the single game source file and prompt ledger, but it retunes core pacing/resource constants and lengthens the route, so gameplay feel needs human review.

## Next Recommended Prompt

- `011-trail-zone-readability-markers.md`
