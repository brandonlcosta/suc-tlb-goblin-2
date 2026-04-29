# Prompt 010 â€” First Balance Pass

## Goal

Tune Cal Street Heat Drop so it is playable and not instantly broken.

## Files / Directories to Inspect

- `GAME.md`
- `docs/MECHANICS_SPEC.md`
- `docs/PLAYTEST_CHECKLIST.md`
- `src/`
- latest run reports, if available

## Implementation Scope

- Adjust heat gain.
- Adjust hydration drain.
- Adjust quad damage.
- Adjust pace effects.
- Adjust braking benefit.
- Adjust cooling strength.
- Adjust crew effects.
- Adjust mission length if needed.
- Centralize tuning constants if not already centralized.

## Out of Scope

- No second mission.
- No new resource system.
- No big refactor.
- No graphics overhaul.

## Acceptance Criteria

- Cautious play can finish.
- Reckless Send play can fail.
- Braking/control feels useful.
- Crew choices matter.
- Cooling matters.
- Tuning values are easy to find.
- Build passes.

## Validation Command

```bash
npm run build
```

## Playtest Note

Play three runs:
1. cautious/control-heavy
2. steady/race-like
3. reckless/send-heavy

Write what happened in the run report.
